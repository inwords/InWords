import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import AnimatedTrainingCard from 'src/components/routes-common/AnimatedTrainingCard';

const NEXT_WORDS_DELAY = 1000;

import './AuditionTraining.css';

function AuditionTraining({ trainingLevel, trainingSettings, handleEnd }) {
  const [words, setWords] = useState([]);
  const [restWords, setRestWords] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [rightWord, setRightWord] = useState({});
  const [selectedWordId, setSelectedWordId] = useState(-1);
  const [metrics, setMetrics] = useState({});

  const resetWords = () => {
    setCurrentWords([]);
    setRightWord(-1);
    setSelectedWordId(-1);
  };

  const prepareNextWords = useCallback((words, restWords) => {
    const rightWord = shuffle([...restWords])[0];
    let newCurrentWords = [rightWord];
    if (words.length > 1) {
      newCurrentWords.push(
        shuffle([...words]).filter(({ id }) => id !== rightWord.id)[0]
      );
    }
    shuffle(newCurrentWords);
    setCurrentWords(newCurrentWords);

    setRightWord(rightWord);
    rightWord.onSpeech();
  }, []);

  useEffect(() => {
    resetWords();

    const preparedWords = trainingLevel.wordTranslations.map(
      ({ serverId, wordNative, onSpeech }) => ({
        id: serverId,
        title: wordNative,
        onSpeech
      })
    );

    setWords(preparedWords);
    setRestWords(preparedWords);
    prepareNextWords(preparedWords, preparedWords);
  }, [trainingLevel.wordTranslations, prepareNextWords]);

  const handleClick = id => () => {
    if (selectedWordId !== -1) return;

    setSelectedWordId(id);

    const newMetrics = {
      ...metrics,
      [id]: metrics[id] ? metrics[id] + 1 : 1
    };
    setMetrics(newMetrics);

    setTimeout(() => {
      resetWords();

      let newRestWords = restWords;
      if (id === rightWord.id) {
        newRestWords = restWords.filter(({ id }) => id !== rightWord.id);
        setRestWords(newRestWords);

        if (!newRestWords.length) {
          handleEnd('audition', newMetrics);
          return;
        }
      }

      prepareNextWords(words, newRestWords);
    }, NEXT_WORDS_DELAY);
  };

  const handleSpeak = () => {
    if (rightWord.onSpeech) {
      rightWord.onSpeech();
    }
  };

  return (
    <div className="audition-training-field">
      <div className="audition-training-cards">
        {currentWords.map(({ id, title, onSpeech }) => (
          <AnimatedTrainingCard
            key={id}
            data-testid={`card-${id}`}
            open
            color={
              id === rightWord.id && id === selectedWordId
                ? 'success'
                : id !== rightWord.id && id === selectedWordId
                ? 'error'
                : null
            }
            dimension={+trainingSettings.cardDimension}
            textSize={+trainingSettings.cardTextSize}
            margin={8}
            onClick={handleClick(id, onSpeech)}
            depthShadow={selectedWordId === id ? 16 : 4}
          >
            {title}
          </AnimatedTrainingCard>
        ))}
      </div>
      <IconButton aria-label="speak" color="primary" onClick={handleSpeak}>
        <Icon fontSize="large">volume_up</Icon>
      </IconButton>
    </div>
  );
}

AuditionTraining.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        onSpeech: PropTypes.func
      }).isRequired
    ).isRequired
  }).isRequired,
  trainingSettings: PropTypes.exact({
    cardDimension: PropTypes.string.isRequired,
    cardTextSize: PropTypes.string.isRequired
  }).isRequired,
  handleEnd: PropTypes.func.isRequired
};

export default AuditionTraining;
