const jwt = require('jsonwebtoken');

// Defina no Netlify UI como variável de ambiente
// e
const SECRET = process.env.JWT_SECRET;
const USER = 'novoucliente';
const PASS = 'cliente32commes+';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { username, password } = JSON.parse(event.body);
  if (username === USER && password === PASS) {
    const token = jwt.sign({ sub: USER }, SECRET, { expiresIn: '4h' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  }
  return { statusCode: 401, body: 'Credenciais inválidas' };
};
