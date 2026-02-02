export const plusBeforeWord = (text) => {
  return text.split('\n').map(string => {
    const words = string.split(' ').map(word => `+${word}`);

    return words.join(' ');
  }).join('\n');
};
