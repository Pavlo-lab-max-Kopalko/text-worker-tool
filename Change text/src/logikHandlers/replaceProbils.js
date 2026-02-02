export const replaceProbils = (text) => {
  const newText = text.split('\n').map(line => {
    const words = line.split(' ').map(word => {
      console.log(word);

      let newWord = '';

      for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
          newWord += '_';
        } else {
          newWord += word[i];
        }
      }

      return newWord;
    })

    return words.join('_');
  })

  return newText.join('\n');
};
