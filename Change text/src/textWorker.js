import * as actions from './allFunctions.js';

self.onmessage = (e) => {
  const { action, text } = e.data;
  const { params } = e.data;
  const startTime = performance.now();

  let result = text;

  if (action === 'replaceLogic' && params) {
    result = actions.replaceLogic(text, params);
  }

  if (action === 'allLettersToUpperCase') result = actions.allLettersToUpperCase(text);
  if (action === 'allLettersToLowerCase') result = actions.allLetersToLowerCase(text);
  if (action === 'firstLetterBig') result = actions.firstLetterBig(text);
  if (action === 'plusBeforeWord') result = actions.plusBeforeWord(text);
  if (action === 'removePlusBeforeWord') result = actions.removePlusBeforeWord(text);
  if (action === 'addQoutes') result = actions.addQoutes(text);
  if (action === 'addSquads') result = actions.addSquads(text);
  if (action === 'addMinus') result = actions.addMinus(text);
  if (action === 'addMinusAndSqauds') result = actions.addMinusAndSqauds(text);
  if (action === 'addMinusAndQuotes') result = actions.addMinusAndQuotes(text);
  if (action === 'removeSpace') result = actions.removeSpace(text);
  if (action === 'removePartPhrase') result = actions.removePartPhrase(text);
  if (action === 'replaceProbils') result = actions.replaceProbils(text);
  if (action === 'removesSpecialSymbols') result = actions.removesSpecialSymbols(text);
  if (action === 'exchangeSpecialSymbolsOnProbils') result = actions.exchangeSpecialSymbolsOnProbils(text);

  const endTime = performance.now();
  
  self.postMessage({ 
    result, 
    duration: endTime - startTime, 
  });
};
