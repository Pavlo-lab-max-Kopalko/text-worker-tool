export const removePartPhrase = (text) => {
  const newText = text.split('\n').map(string => {
    console.log(string);
    const words = string.split('-');
    console.log(words);

    return words[0];
  });

  return newText.join('\n');
};
