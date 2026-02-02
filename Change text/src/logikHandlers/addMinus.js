export const addMinus = (text) => {
  const newText = text.split('\n').map(string => `-${string}`);

  return newText.join('\n');
};
