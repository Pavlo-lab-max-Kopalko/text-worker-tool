export const addSquads = (text) => {
  const newText = text.split('\n').map(word => `[${word}]`);

  return newText.join('\n');
};
