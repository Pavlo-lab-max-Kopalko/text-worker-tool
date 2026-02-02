export const allLetersToLowerCase = (text) => {
  return text.
    split('\n').
    map(word => word.toLowerCase()).
    join('\n');
}