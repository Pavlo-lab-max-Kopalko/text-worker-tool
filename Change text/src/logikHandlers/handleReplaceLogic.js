export const handleReplaceLogic = (text, params) => {
  const { findText, replaceText } = params;
  
  if (!findText) return text;

  try {
    // Прапорці 'g' та 'm' для глобальної заміни та багаторядковості
    const regex = new RegExp(findText, 'gm');
    return text.replace(regex, replaceText);
  } catch {
    // Якщо RegExp зламався, робимо звичайну заміну рядка
    return text.replaceAll(findText, replaceText);
  }
};
