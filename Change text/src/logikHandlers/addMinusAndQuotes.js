export const addMinusAndQuotes = (text) => {
  const newText = text.split('\n').map(word => `-"${word}"`);

  return newText.join('\n');
};
