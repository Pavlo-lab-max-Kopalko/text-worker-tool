export const firstLetterBig = (text) => {
  const newText = text.split('\n').map(string => {
    const words = string.split(' ').map(word => {
      let newWord = '';
      const hasLetter = (str) => /\p{L}/u.test(str);

      for (let i = 0; i < word.length; i++) {
        if (!hasLetter(newWord)) {
          newWord += word[i].toUpperCase();

          console.log(newWord);
        } else {
          newWord += word[i];
        }
      }

      return newWord;
    })

    return words.join(' ');
  });

  return newText.join('\n');
}
