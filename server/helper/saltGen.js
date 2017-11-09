function alphabetSalt(){
  let alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
      salt='';
  for (var i=0; i<9; i++){
    salt+=(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
  }
  return salt;
}

module.exports = alphabetSalt;
