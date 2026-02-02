export const allLettersToUpperCase = (text) => {
  return text
    .split('\n')
    .map(line => line.toUpperCase())
    .join('\n');
};
