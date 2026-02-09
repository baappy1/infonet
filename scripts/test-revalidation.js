/**
 * Test script to verify revalidation endpoint is working
 * Run: node scripts/test-revalidation.js
 */

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || '12345678';
const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://infonet-three.vercel.app';

async function testRevalidation(path = '/', tag = 'cms') {
  const url = `${FRONTEND_URL}/api/revalidate?secret=${REVALIDATE_SECRET}&path=${encodeURIComponent(path)}&tag=${tag}`;
  
  console.log('\n🧪 Testing Revalidation Endpoint...');
  console.log(`📍 URL: ${url}`);
  console.log(`🔑 Secret: ${REVALIDATE_SECRET}`);
  console.log(`📂 Path: ${path}`);
  console.log(`🏷️  Tag: ${tag}\n`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.log('❌ ERROR! Response is not valid JSON.');
      console.log('📊 Response Status:', response.status);
      console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));
      console.log('📊 Response Text (first 500 chars):', responseText.substring(0, 500));
      console.log('\n💡 This usually means:');
      console.log('   1. The route hasn\'t been deployed to Vercel yet');
      console.log('   2. Vercel is showing a deployment/error page');
      console.log('   3. The route file has an error');
      return false;
    }
    
    if (response.ok) {
      console.log('✅ SUCCESS! Revalidation endpoint is working.');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ FAILED! Revalidation endpoint returned an error.');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
      console.log(`🔢 Status: ${response.status}`);
      if (response.status === 401) {
        console.log('\n💡 Status 401 means: REVALIDATE_SECRET doesn\'t match');
        console.log('   Check: Vercel → Settings → Environment Variables');
      }
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR! Could not reach revalidation endpoint.');
    console.log('📊 Error:', error.message);
    return false;
  }
}

async function testGraphQL() {
  const GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL 
    ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`
    : 'https://staging.hellonotionhive.com/wordpress/infonet/graphql';

  console.log('\n🧪 Testing GraphQL Endpoint...');
  console.log(`📍 URL: ${GRAPHQL_URL}\n`);

  const query = `
    query TestQuery {
      posts(first: 1) {
        nodes {
          id
          title
          date
        }
      }
    }
  `;

  try {
    const response = await fetch(`${GRAPHQL_URL}?_t=${Date.now()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    if (response.ok && !data.errors) {
      console.log('✅ SUCCESS! GraphQL endpoint is accessible.');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ FAILED! GraphQL endpoint returned an error.');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.log('❌ ERROR! Could not reach GraphQL endpoint.');
    console.log('📊 Error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Revalidation & GraphQL Tests...\n');
  console.log('='.repeat(60));

  const revalidateResult = await testRevalidation('/blog', 'cms');
  const graphqlResult = await testGraphQL();

  console.log('\n' + '='.repeat(60));
  console.log('\n📋 Test Summary:');
  console.log(`   Revalidation Endpoint: ${revalidateResult ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   GraphQL Endpoint: ${graphqlResult ? '✅ PASS' : '❌ FAIL'}`);

  if (revalidateResult && graphqlResult) {
    console.log('\n🎉 All tests passed! Your setup looks good.');
    console.log('\n💡 Next Steps:');
    console.log('   1. Make sure REVALIDATE_SECRET is set in Vercel environment variables');
    console.log('   2. Update a post in WordPress and check if webhook is called');
    console.log('   3. Check WordPress/DigitalOcean cache settings to exclude /graphql');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

runTests();
