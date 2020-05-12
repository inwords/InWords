import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import shuffle from 'src/utils/shuffle';
import FadeAnimation from 'src/components/core/FadeAnimation';
import Fade from 'src/components/core/Fade';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import TrainingCard from 'src/components/routes-common/TrainingCard';

const NEXT_WORDS_DELAY = 1000;

import './AuditionTraining.css';

const getRandomRightWord = words =>
  words.length > 1 ? words[Math.round(Math.random())] : words[0];

function AuditionTraining({ trainingLevel, handleEnd }) {
  const [words, setWords] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [rightWord, setRightWord] = useState({});
  const [selectedWordId, setSelectedWordId] = useState(-1);
  const [rightSelectedWordId, setRightSelectedWordId] = useState(-1);
  const [wrongSelectedWordId, setWrongSelectedWordId] = useState(-1);

  const resetWords = () => {
    setCurrentWords([]);
    setRightWord(-1);
    setSelectedWordId(-1);
    setRightSelectedWordId(-1);
    setWrongSelectedWordId(-1);
  };

  useEffect(() => {
    if (!trainingLevel.wordTranslations.length) return;

    resetWords();

    const preparedWords = trainingLevel.wordTranslations.map(
      ({ wordForeign, onSpeech }) => ({
        id: uuidv4(),
        title: wordForeign,
        onSpeech
      })
    );

    shuffle(preparedWords);
    setWords(preparedWords);

    const currentPreparedWords = preparedWords.slice(0, 2);
    setCurrentWords(currentPreparedWords);

    const rightWord = getRandomRightWord(currentPreparedWords);
    setRightWord(rightWord);
    rightWord.onSpeech();
  }, [trainingLevel.wordTranslations]);

  const handleClick = id => () => {
    if (selectedWordId !== -1) return;

    setSelectedWordId(id);

    let isError = false;
    if (id === rightWord.id) {
      setRightSelectedWordId(rightWord.id);
      setWrongSelectedWordId(-1);
    } else {
      isError = true;
      setRightSelectedWordId(rightWord.id);

      if (currentWords.length > 1) {
        setWrongSelectedWordId(
          currentWords[0].id === rightWord.id
            ? currentWords[1].id
            : currentWords[0].id
        );
      }
    }

    setTimeout(() => {
      resetWords();

      const restWords = !isError
        ? words.filter(
            ({ id }) => !currentWords.find(currentWord => id === currentWord.id)
          )
        : words;

      if (!restWords.length) {
        handleEnd(1);
        return;
      }

      shuffle(restWords);
      setWords(restWords);
      setCurrentWords(restWords.slice(0, 2));

      const rightWord = getRandomRightWord(restWords);
      setRightWord(rightWord);
      rightWord.onSpeech();
    }, NEXT_WORDS_DELAY);
  };

  const handleSpeak = () => {
    if (rightWord.onSpeech) {
      rightWord.onSpeech();
    }
  };

  const cardSettings = trainingLevel.cardSettings;

  return (
    <div className="audition-training-field">
      <div className="audition-training-cards">
        {currentWords.map(({ id, title, onSpeech }) => (
          <FadeAnimation key={id}>
            <Fade in>
              <div>
                <TrainingCard
                  data-testid={`card-${id}`}
                  open
                  dimension={cardSettings.cardDimension}
                  textSize={cardSettings.cardTextSize}
                  onClick={handleClick(id, onSpeech)}
                  depthShadow={selectedWordId === id ? 16 : 4}
                >
                  {rightSelectedWordId === id ? (
                    <Icon
                      color="success"
                      className="audition-training-result-icon"
                    >
                      check_circle
                    </Icon>
                  ) : (
                    wrongSelectedWordId === id && (
                      <Icon
                        color="error"
                        className="audition-training-result-icon"
                      >
                        error
                      </Icon>
                    )
                  )}
                  {title}
                </TrainingCard>
              </div>
            </Fade>
          </FadeAnimation>
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
    ).isRequired,
    cardSettings: PropTypes.object.isRequired
  }).isRequired,
  handleEnd: PropTypes.func.isRequired
};

export default AuditionTraining;
