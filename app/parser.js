module.exports = buffer => {
  const sBuff = buffer.toString();
  const [_, __, cmd, ...args] = sBuff.split('\r\n');
  return [cmd, args];
};
