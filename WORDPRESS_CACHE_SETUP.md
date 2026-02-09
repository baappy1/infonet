# WordPress Cache Setup Guide

## Problem
Content changes in WordPress are not immediately reflected on your Vercel frontend because WordPress/DigitalOcean is caching the GraphQL endpoint.

## Solution: Exclude GraphQL from Caching

You **MUST** exclude the GraphQL endpoint from all caching layers on your WordPress server.

### Step 1: Check What Cache Plugin You're Using

Log into WordPress admin and check **Plugins → Installed Plugins** for any of these:
- **LiteSpeed Cache**
- **WP Rocket**
- **W3 Total Cache**
- **WP Super Cache**
- **SG Optimizer** (SiteGround)
- **NitroPack**
- Any other "Performance" or "Cache" plugin

### Step 2: Exclude GraphQL in Cache Plugin

#### For LiteSpeed Cache:
1. Go to **LiteSpeed Cache → Cache → Excludes**
2. Under **"Do Not Cache URIs"**, add:
   ```
   /graphql
   /wordpress/infonet/graphql
   ```
3. Click **Save Changes**
4. Go to **LiteSpeed Cache → Toolbox → Purge** → Click **Purge All**

#### For WP Rocket:
1. Go to **WP Rocket → Advanced Rules**
2. Under **"Never Cache URLs"**, add:
   ```
   /graphql
   /wordpress/infonet/graphql
   ```
3. Click **Save Changes**
4. Go to **WP Rocket → Dashboard** → Click **Clear and preload cache**

#### For W3 Total Cache:
1. Go to **Performance → Page Cache**
2. Under **"Never cache the following pages"**, add:
   ```
   /graphql
   /wordpress/infonet/graphql
   ```
3. Click **Save all settings**
4. Go to **Performance → Dashboard** → Click **Empty all caches**

#### For WP Super Cache:
1. Go to **Settings → WP Super Cache**
2. Under **"Accepted filenames & rejected URIs"**, add:
   ```
   /graphql
   /wordpress/infonet/graphql
   ```
3. Click **Update Status**
4. Go to **Settings → WP Super Cache** → Click **Delete Cache**

### Step 3: Check Server-Level Caching (DigitalOcean)

If you're using DigitalOcean App Platform or a Droplet:

#### For Nginx (if you have SSH access):
Add this to your Nginx config:

```nginx
location ~ /graphql {
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0";
    proxy_cache_bypass 1;
    proxy_no_cache 1;
}
```

Then reload Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

#### For Apache (if you have SSH access):
Add this to your `.htaccess` or Apache config:

```apache
<LocationMatch "/graphql">
    Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
</LocationMatch>
```

### Step 4: Check CDN/Cloudflare (if applicable)

If you're using Cloudflare or another CDN:

1. Go to **Cloudflare Dashboard → Rules → Page Rules**
2. Create a new rule:
   - **URL**: `*graphql*`
   - **Cache Level**: Bypass
   - **Save**

### Step 5: Test

1. Update a blog post in WordPress
2. Open GraphQL endpoint directly in browser:
   ```
   https://staging.hellonotionhive.com/wordpress/infonet/graphql
   ```
3. Run a test query - if you see OLD data, caching is still active
4. If you see NEW data, caching is disabled ✅

## Verify WordPress Webhook is Working

1. Update a post in WordPress
2. Check WordPress error logs (usually in `wp-content/debug.log`)
3. Look for: `"Revalidation successful for: ..."`
4. Or check Vercel function logs:
   - Go to Vercel Dashboard → Your Project → Functions
   - Look for `/api/revalidate` calls

## Manual Test

Test the revalidation endpoint manually:

```bash
curl -X POST "https://infonet-three.vercel.app/api/revalidate?secret=12345678&path=/blog/test-post&tag=cms"
```

Should return:
```json
{
  "revalidated": true,
  "tag": "cms",
  "path": "/blog/test-post",
  "now": 1234567890
}
```

## Still Not Working?

If content still doesn't update after excluding GraphQL from cache:

1. **Check WordPress PHP object cache** (Redis/Memcached) - flush it
2. **Check database query cache** - disable if possible
3. **Check if WordPress is using a reverse proxy** - exclude GraphQL there too
4. **Contact your hosting provider** (DigitalOcean) to exclude `/graphql` from their CDN/cache

## Quick Test Script

Run this to test your setup:

```bash
node scripts/test-revalidation.js
```

This will test both the revalidation endpoint and GraphQL endpoint.
