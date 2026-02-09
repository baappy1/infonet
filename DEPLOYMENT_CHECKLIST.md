# Deployment Checklist

## ✅ Before Testing - Make Sure These Are Done

### 1. Commit and Push All Changes
```bash
git add .
git commit -m "Fix caching issues and add revalidation endpoint"
git push origin main
```

### 2. Wait for Vercel Deployment
- Go to: https://vercel.com → Your Project → Deployments
- Wait for the latest deployment to finish (should show "Ready" ✅)
- Check build logs for any errors

### 3. Set Environment Variables in Vercel
**CRITICAL**: Set these in Vercel AFTER deployment

1. Go to: https://vercel.com → Your Project → **Settings** → **Environment Variables**
2. Add these variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `REVALIDATE_SECRET` | `12345678` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://infonet-three.vercel.app` | Production, Preview |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `https://staging.hellonotionhive.com/wordpress/infonet` | Production, Preview |

3. Click **Save**
4. **Redeploy** (or wait for next deployment)

### 4. Verify Route is Deployed
After deployment, test the route directly:

```bash
# Your frontend: https://infonet-three.vercel.app
# Your WordPress: https://staging.hellonotionhive.com/wordpress/infonet/

curl -X POST "https://infonet-three.vercel.app/api/revalidate?secret=12345678&path=/blog&tag=cms"
```

**Expected Response** (if working):
```json
{
  "revalidated": true,
  "tag": "cms",
  "path": "/blog",
  "commonPathsRevalidated": ["/", "/blog", "/industries", "/service"],
  "now": 1234567890
}
```

**If you get HTML/error**:
- Route might not be deployed yet
- Check Vercel deployment logs
- Make sure `app/api/revalidate/route.js` exists

## Common Issues

### Issue: "The deploy..." HTML response
**Cause**: Route not deployed or deployment failed

**Fix**:
1. Check Vercel deployment logs
2. Make sure `app/api/revalidate/route.js` is committed
3. Redeploy

### Issue: 401 Unauthorized
**Cause**: `REVALIDATE_SECRET` not set or doesn't match

**Fix**:
1. Add `REVALIDATE_SECRET=12345678` to Vercel environment variables
2. Redeploy

### Issue: Route returns 404
**Cause**: Route file not found

**Fix**:
1. Verify `app/api/revalidate/route.js` exists
2. Check file is committed to git
3. Redeploy

## Test After Deployment

Run the test script:
```bash
npm run test:revalidate
```

Both tests should pass:
- ✅ Revalidation Endpoint: PASS
- ✅ GraphQL Endpoint: PASS

## Next Steps After Deployment

1. ✅ Test revalidation endpoint (should work)
2. ✅ Set up WordPress webhook (see WordPress code)
3. ✅ Exclude GraphQL from WordPress cache (see WORDPRESS_CACHE_SETUP.md)
4. ✅ Test: Update WordPress → Check if content updates immediately
