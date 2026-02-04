import { useState } from 'react';
import './App.css';

function App() {
  const savedText = localStorage.getItem('text_draft') || '';
  const [text, setText] = useState(savedText);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [metrics, setMetrics] = useState({});

  const handleChange = (e) => {
    setText(e);
    setHistory([]);
    setHistoryIndex(0);
  };

  const writeHistory = () => {
    setHistory(prev => {
      let updatedHistory = [...prev, text.split('\n')];

      if (updatedHistory.length > 10) {
        updatedHistory = updatedHistory.slice(1);
      }

      setHistoryIndex(updatedHistory.length - 1);

      return updatedHistory;
    });
  }

  const handleReplaceSubmit = (e) => {
    e.preventDefault();
    writeHistory();

    if (!findText) return;

    const worker = new Worker(new URL('./textWorker.js', import.meta.url), { type: 'module' });

    worker.postMessage({
      action: 'replaceLogic',
      text: text,
      params: { findText, replaceText }
    });

    worker.onmessage = (e) => {
      const { result, duration } = e.data;

      if (result !== text) {
        writeHistory(result);
        setText(result);
        setMetrics(prev => ({ ...prev, time: duration }));
      }

      worker.terminate();
    };
  };

  const handleAction = (actionType) => {
    const worker = new Worker(new URL('./textWorker.js', import.meta.url), { type: 'module' });

    worker.postMessage({ action: actionType, text: text });

    worker.onmessage = (e) => {
      const { result, duration } = e.data;

      if (result !== text) {
        setText(result);
        writeHistory(result);
        setMetrics(duration);
        localStorage.setItem('text_draft', result);
      }

      worker.terminate();
    };
  };

  const onUndo = () => {
    setHistoryIndex(currentIndex => currentIndex - 1);
    setText(history[historyIndex].join('\n'));
  };

  const onRedo = () => {
    setHistoryIndex(currentIndex => currentIndex + 1);
    setText(history[historyIndex].join('\n'));
  };

  return (
    <>
      <div className='allContent'>
        <textarea
          name="textfield"
          id="textfield"
          cols="40"
          rows="32"
          onChange={e => handleChange(e.target.value)}
          value={text}
        />

        <div className='button-wrapper'>
          <div>{`Metrics: ${metrics}` }</div>
          <button className='button' onClick={() => handleAction('allLettersToUpperCase')}>Усі великі літери</button>
          <button className='button' onClick={() => handleAction('allLettersToLowerCase')}>Усі малі літери</button>
          <button className='button' onClick={() => handleAction('firstLetterBig')}>Кожне слово з великої літери</button>
          <button className='button' onClick={() => handleAction('plusBeforeWord')}>Додати + перед кожним словом</button>
          <button className='button' onClick={() => handleAction('removePlusBeforeWord')}>Видалити + перед кожним словом</button>
          <button className='button' onClick={() => handleAction('addQoutes')}>Додати лапки навколо рядка</button>
          <button className='button' onClick={() => handleAction('addSquads')}>Додати квадратні дужки навколо рядка</button>
          <button className='button' onClick={() => handleAction('addMinus')}>Додати - на початок рядка</button>
          <button className='button' onClick={() => handleAction('addMinusAndSqauds')}>-[...] на початку (тире + квадратні дужки)</button>
          <button className='button' onClick={() => handleAction('addMinusAndQuotes')}>-"..." на початку (тире + лапки)</button>
          <button className='button' onClick={() => handleAction('removeSpace')}>Видалити зайві пробіли</button>
          <button className='button' onClick={() => handleAction('removeSpace')}>Видалити табуляцію</button>
          <button className='button' onClick={() => handleAction('removePartPhrase')}>Видалити все праворуч після підрядка " -" (пробіл+дефіс), включно з дефісом</button>
          <button className='button' onClick={() => handleAction('replaceProbils')}>Замінити пробіли на _</button>
          <button className='button' onClick={() => handleAction('removesSpecialSymbols')}>
            {`Видалити спецсимволи: () \\ ~ ! @ # $ % ^ & * _ = + [ ] \\ { } | ; ' : " , / < > ? \``}
          </button>
          <button className='button' onClick={() => handleAction('exchangeSpecialSymbolsOnProbils')}>Замінити спецсимволи на пробіли (ті самі символи → пробіл)</button>

          <form onSubmit={e => handleReplaceSubmit(e)} className="replace-form">
            <input
              type="text"
              placeholder="Що знайти..."
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Чим замінити..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />

            <button type="submit">Замінити все</button>
          </form>

          <button disabled={historyIndex <= 0} onClick={() => onUndo()}>Undo</button>
          <button
            disabled={historyIndex >= history.length - 1}
            onClick={() => onRedo()}
          >
            Redo
          </button>
        </div>
      </div>
    </>
  )
}

export default App
