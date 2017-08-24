const generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: Date.now()
  };
};


module.exports = {
  generateMessage
}
