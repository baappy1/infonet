# Troubleshooting: Content Not Updating

## Quick Checklist ✅

### 1. Frontend (Vercel) - Already Fixed ✅
- [x] All pages have `dynamic = "force-dynamic"`
- [x] All pages have `revalidate = 0`
- [x] Apollo Client cache disabled
- [x] GraphQL requests have cache-busting headers
- [x] Revalidation endpoint created at `/api/revalidate`

### 2. Environment Variables - CHECK THIS ⚠️
- [ ] `REVALIDATE_SECRET=12345678` is set in **Vercel Dashboard**
  - Go to: Vercel → Your Project → Settings → Environment Variables
  - Add: `REVALIDATE_SECRET` = `12345678`
  - **Redeploy after adding**

### 3. WordPress Webhook - CHECK THIS ⚠️
- [ ] WordPress `functions.php` has the webhook code
- [ ] WordPress theme option `url` is set to: `https://infonet-three.vercel.app`
- [ ] Test: Update a post → Check WordPress error logs for "Revalidation successful"

### 4. WordPress Caching - THIS IS LIKELY THE PROBLEM ⚠️⚠️⚠️
- [ ] GraphQL endpoint excluded from cache plugin
- [ ] GraphQL endpoint excluded from server/CDN cache
- [ ] Cache cleared after making changes

## Test Your Setup

### Test 1: Revalidation Endpoint
```bash
npm run test:revalidate
```

Or manually:
```bash
curl -X POST "https://infonet-three.vercel.app/api/revalidate?secret=12345678&path=/blog/test&tag=cms"
```

Expected response:
```json
{
  "revalidated": true,
  "tag": "cms",
  "path": "/blog/test",
  "now": 1234567890
}
```

### Test 2: GraphQL Endpoint (Check for Caching)
1. Update a post in WordPress
2. Open browser: `https://staging.hellonotionhive.com/wordpress/infonet/graphql`
3. Run this query:
```graphql
{
  posts(first: 1) {
    nodes {
      title
      date
      content
    }
  }
}
```
4. **If you see OLD data** → WordPress is caching GraphQL ❌
5. **If you see NEW data** → WordPress caching is disabled ✅

### Test 3: WordPress Webhook
1. Update a post in WordPress
2. Check WordPress error logs: `wp-content/debug.log`
3. Look for: `"Revalidation successful for: ..."`
4. If not found, webhook isn't firing

## Most Common Issues

### Issue 1: WordPress Caching GraphQL
**Symptom**: GraphQL returns old data even after updating WordPress

**Solution**: 
- Exclude `/graphql` from ALL cache plugins
- See `WORDPRESS_CACHE_SETUP.md` for detailed instructions

### Issue 2: Webhook Not Firing
**Symptom**: No "Revalidation successful" in WordPress logs

**Solution**:
- Check WordPress `functions.php` has the webhook code
- Check WordPress theme option `url` is correct
- Check WordPress can reach Vercel (no firewall blocking)

### Issue 3: REVALIDATE_SECRET Not Set
**Symptom**: Revalidation endpoint returns 401

**Solution**:
- Add `REVALIDATE_SECRET=12345678` to Vercel environment variables
- Redeploy

### Issue 4: Vercel Still Caching
**Symptom**: Content updates but only after waiting

**Solution**:
- All pages already have `dynamic = "force-dynamic"` ✅
- If still caching, check Vercel Edge Network settings

## Step-by-Step Debugging

1. **Test GraphQL directly** (see Test 2 above)
   - If OLD data → WordPress caching issue
   - If NEW data → Continue to step 2

2. **Test revalidation endpoint** (see Test 1 above)
   - If 401 → REVALIDATE_SECRET not set
   - If 200 → Continue to step 3

3. **Check WordPress webhook logs**
   - If no logs → Webhook not firing
   - If logs show success → Continue to step 4

4. **Hard refresh browser** (Cmd+Shift+R / Ctrl+Shift+R)
   - If still old → Browser cache (unlikely)
   - If new → Problem solved!

## Still Not Working?

If all tests pass but content still doesn't update:

1. **Check Vercel deployment logs** - Is the site actually redeploying?
2. **Check browser console** - Any errors?
3. **Try incognito/private window** - Rules out browser cache
4. **Check WordPress PHP version** - Should be 8.0+
5. **Contact DigitalOcean support** - Ask them to exclude `/graphql` from their CDN

## Need Help?

Share these details:
1. Result of `npm run test:revalidate`
2. Result of GraphQL test (Test 2)
3. WordPress error logs (if any)
4. Which cache plugin you're using
