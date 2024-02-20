module.exports = buffer => {
  const sBuff = buffer.toString();
  const [a, b, cmd, c, args] = sBuff.split('\r\n');
  return [cmd, args];
};
