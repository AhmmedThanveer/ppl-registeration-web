const https = require('https');
const url = 'https://script.google.com/macros/s/AKfycbwhb0B2Jv7Cio4okqKkIcwDsWamppKMQlGDU75R5x9Q3XHLCrJqNa8ueXbSDtSSDo4JiQ/exec';
const data = JSON.stringify({ name:'test', email:'test@example.com', phone:'9999999999', position:'Forward', bloodGroup:'O+', photoName:'p.jpg', aadharName:'a.jpg', paymentName:'pay.jpg' });
const u = new URL(url);
const options = {
  method: 'POST',
  hostname: u.hostname,
  path: u.pathname + u.search,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};
const req = https.request(options, res => {
  console.log('status', res.statusCode);
  res.on('data', chunk => process.stdout.write(chunk));
  res.on('end', () => process.stdout.write('\n'));
});
req.on('error', e => console.error('error', e.message));
req.write(data);
req.end();
