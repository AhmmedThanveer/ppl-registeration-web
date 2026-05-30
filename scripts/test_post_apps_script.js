const https = require('https');
const data = JSON.stringify({ test: 'hello' });
const options = {
  method: 'POST',
  hostname: 'script.google.com',
  path: '/macros/s/AKfycbxax4JRQ8w03QkXDSrrhQVf8YVA73KZdoYXCd_L4tMMZZF5UMSaKEltjcYMqkKWt5Ut/exec',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = https.request(options, (res) => {
  console.log('status', res.statusCode);
  res.setEncoding('utf8');
  res.on('data', (chunk) => process.stdout.write(chunk));
  res.on('end', () => process.stdout.write('\n'));
});

req.on('error', (e) => {
  console.error('error', e.message);
});

req.write(data);
req.end();
