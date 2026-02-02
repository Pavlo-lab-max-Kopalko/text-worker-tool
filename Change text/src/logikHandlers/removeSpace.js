export const removeSpace = (text) => {
  const newText = text.split('\n').map(string => {

    const words = string.split(/\s+/).map(word => {
      return word.trim();
    })

    return words.join(' ');
  });

  return newText.join('\n');
};
