export const removesSpecialSymbols = (text) => {
  const newText = text.split('\n').map(line => {
    const words = line.split(' ').map(word => word.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g, ''));

    return words.join(' ');
  })

  return newText.join('\n');
};
