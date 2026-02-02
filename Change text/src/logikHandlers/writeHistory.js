export const writeHistory = (setHistory, text) => {
  setHistory(prev => {
    let updatedHistory = [...prev, text.split('\n')];

    if (updatedHistory.length > 10) {
      updatedHistory = updatedHistory.slice(1);
    }

    return updatedHistory;
  });
}


