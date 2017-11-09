const crypto = require('crypto');
function encrypt(password) {
  const hash = crypto.createHmac('sha256', process.env.SALT_KEY)
             .update(password)
             .digest('hex');
             return hash;
}

module.exports = encrypt;
