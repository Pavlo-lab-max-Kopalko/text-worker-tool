export const exchangeSpecialSymbolsOnProbils = (text) => {
  const newText = text.split('\n').map(line => {
    const words = line.split(' ').map(word => {
      return word.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g, ' ');
    })

    return words.join(' ');
  })

  return newText.join('\n');
};
