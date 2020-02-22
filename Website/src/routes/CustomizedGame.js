import React from 'react';
import PropTypes from 'prop-types';
import shuffle from 'src/utils/shuffle';
import Game from 'src/routes/Game';
import CardSettingsContext from 'src/routes/CardSettingsContext';

const synth = window.speechSynthesis;
const lang = 'en-US';

function CustomizedGame({ trainingSettings, trainingLevel, ...rest }) {
  const [cardSettings, setCardSettings] = React.useState({
    cardDimension: 120,
    cardTextSize: 16
  });

  const [processedTrainingLevel, setProcessedTrainingLevel] = React.useState();

  const [listOn, setListOn] = React.useState(true);

  React.useEffect(() => {
    setCardSettings({
      cardDimension: +trainingSettings.cardDimension || 120,
      cardTextSize: +trainingSettings.cardTextSize || 16
    });

    if (trainingSettings.listOn !== undefined) {
      setListOn(trainingSettings.listOn);
    }

    setProcessedTrainingLevel({
      ...trainingLevel,
      wordTranslations: shuffle([...trainingLevel.wordTranslations]).slice(
        0,
        trainingSettings.quantity || 8
      )
    });

    if (trainingSettings.voiceOn) {
      setProcessedTrainingLevel(processedTrainingLevel => ({
        ...processedTrainingLevel,
        wordTranslations: processedTrainingLevel.wordTranslations.map(
          wordTranslation => {
            const onSpeech = () => {
              if (synth.speaking) {
                synth.cancel();
              }

              const speech = new SpeechSynthesisUtterance(
                wordTranslation.wordForeign
              );
              speech.lang = lang;
              synth.speak(speech);
            };

            return {
              ...wordTranslation,
              onSpeech
            };
          }
        )
      }));
    }
  }, [trainingSettings, trainingLevel]);

  return (
    Boolean(processedTrainingLevel) && (
      <CardSettingsContext.Provider value={cardSettings}>
        <Game
          trainingLevel={processedTrainingLevel}
          listOn={listOn}
          {...rest}
        />
      </CardSettingsContext.Provider>
    )
  );
}

CustomizedGame.propTypes = {
  trainingSettings: PropTypes.shape({
    quantity: PropTypes.string,
    listOn: PropTypes.bool,
    cardDimension: PropTypes.string,
    cardTextSize: PropTypes.string
  }).isRequired,
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
  }).isRequired
};

export default CustomizedGame;
