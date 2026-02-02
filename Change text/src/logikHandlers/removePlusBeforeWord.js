export const removePlusBeforeWord = (text) => {
  const newText = text.split('\n').map(string => {
    const words = string.split(' ').map(word => {
      let newWorld = '';

      console.log(word);

      for (let i = 0; i < word.length; i++) {
        if (word[0] === '+' && i === 0) {
          continue;
        }

        newWorld += word[i];
      }

      return newWorld;
    })

    return words.join(' ');
  });

  return newText.join('\n');
};
