import { useState } from 'react';
import './App.css';

function App() {
  const savedText = localStorage.getItem('text_draft') || '';
  console.log(savedText);
  const [text, setText] = useState(savedText);

  const [history, setHistory] = useState([]);

  const [historyIndex, setHistoryIndex] = useState(history.length);
  console.log(history);

  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [metrics, setMetrics] = useState({});

  console.log(metrics);

  const handleChange = (e) => {
    setText(e);
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

  // const allLetersToUpperCase = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => word.toUpperCase());

  //   setText(newText.join('\n'));
  // }

  // const allLetersToLowerCase = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => word.toLowerCase());

  //   setText(newText.join('\n'));
  // }

  // const firstLetterBig = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => {
  //     const words = string.split(' ').map(word => {
  //       let newWord = '';
  //       const hasLetter = (str) => /\p{L}/u.test(str);

  //       for (let i = 0; i < word.length; i++) {
  //         if (!hasLetter(newWord)) {
  //           newWord += word[i].toUpperCase();

  //           console.log(newWord);
  //         } else {
  //           newWord += word[i];
  //         }
  //       }

  //       return newWord;
  //     })

  //     return words.join(' ');
  //   });

  //   setText(newText.join('\n'));
  // }

  // console.log(history);

  // const plusBeforeWord = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => {
  //     const words = string.split(' ').map(word => `+${word}`);

  //     return words.join(' ');
  //   });

  //   setText(newText.join('\n'));
  // };

  // const removePlusBeforeWord = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => {
  //     const words = string.split(' ').map(word => {
  //       let newWorld = '';

  //       console.log(word);

  //       for (let i = 0; i < word.length; i++) {
  //         if (word[0] === '+' && i === 0) {
  //           continue;
  //         }

  //         newWorld += word[i];
  //       }

  //       return newWorld;
  //     })

  //     return words.join(' ');
  //   });

  //   setText(newText.join('\n'));
  // }

  // const addQoutes = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => `"${word}"`);

  //   setText(newText.join('\n'));
  // };

  // const addSquads = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => `[${word}]`);

  //   setText(newText.join('\n'));
  // }

  // const addMinus = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => `-${string}`);

  //   setText(newText.join('\n'));
  // }

  // const addMinusAndSqauds = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => `-[${word}]`);

  //   setText(newText.join('\n'));
  // }

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

  // const addMinusAndQuotes = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(word => `-"${word}"`);

  //   setText(newText.join('\n'));
  // }

  // const removeSpace = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => {

  //     const words = string.split(/\s+/).map(word => {
  //       return word.trim();
  //     })

  //     return words.join(' ');
  //   });

  //   console.log(newText);

  //   setText(newText.join('\n'));
  // }

  // const removePartPhrase = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(string => {
  //     console.log(string);
  //     const words = string.split('-');
  //     console.log(words);

  //     return words[0];
  //   });

  //   setText(newText.join('\n'));
  // }

  // const replaceProbils = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(line => {
  //     const words = line.split(' ').map(word => {
  //       console.log(word);

  //       let newWord = '';

  //       for (let i = 0; i < word.length; i++) {
  //         if (word[i] === ' ') {
  //           newWord += '_';
  //         } else {
  //           newWord += word[i];
  //         }
  //       }

  //       return newWord;
  //     })

  //     return words.join('_');
  //   })

  //   setText(newText.join('\n'));
  // }

  // const removesSpecialSymbols = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(line => {
  //     const words = line.split(' ').map(word => word.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g, ''));

  //     return words.join(' ');
  //   })

  //   setText(newText.join('\n'));
  // }

  // const exchangeSpecialSymbolsOnProbils = () => {
  //   writeHistory();

  //   const newText = text.split('\n').map(line => {
  //     const words = line.split(' ').map(word => {
  //       return word.replace(/[()\\~!@#$%^&*_=+[\]{}|;'":,/<>?`]/g, ' ');
  //     })

  //     return words.join(' ');
  //   })

  //   setText(newText.join('\n'));
  // }

  const handleAction = (actionType) => {
    const worker = new Worker(new URL('./textWorker.js', import.meta.url), { type: 'module' });

    worker.postMessage({ action: actionType, text: text });

    worker.onmessage = (e) => {
      const { result, duration } = e.data;

      if (result !== text) {
        console.log(result);
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

    console.log(history[historyIndex]);
    console.log(history);
    console.log(historyIndex);
  };

  const onRedo = () => {
    setHistoryIndex(currentIndex => currentIndex + 1);
    setText(history[historyIndex].join('\n'));

    console.log(history[historyIndex]);
  };

  console.log(historyIndex);
  console.log(historyIndex === 0);
  console.log(historyIndex === history.length - 1);

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
