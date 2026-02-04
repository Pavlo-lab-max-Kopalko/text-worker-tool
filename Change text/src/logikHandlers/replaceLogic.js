export const replaceLogic = (text, params) => {
  const { findText, replaceText } = params;

  if (!findText) return text;

  try {
    const regex = new RegExp(findText, 'gm');
    return text.replace(regex, replaceText);
  } catch {
    return text.replaceAll(findText, replaceText);
  }
};
