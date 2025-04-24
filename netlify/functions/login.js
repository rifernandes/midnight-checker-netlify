const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const USER   = 'novoucliente';
const PASS   = 'cliente32commes+';

exports.handler = async (event) => {
  console.log('RAW BODY →', event.body);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { username, password } = payload;
  if (username === USER && password === PASS) {
    const token = jwt.sign({ sub: USER }, SECRET, { expiresIn: '4h' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  }

  return { statusCode: 401, body: 'Credenciais inválidas' };
};
