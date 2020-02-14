import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel } from 'src/actions/trainingApiActions';
import { loadValue } from 'src/localStorage';
import shuffle from 'src/utils/shuffle';

const synth = window.speechSynthesis;
const lang = 'en-US';

const initialCardSettings = {
  cardDimension: 120,
  cardTextSize: 16
};

const CardSettingsContext = React.createContext(initialCardSettings);

function withReceivedTrainingLevel(WrappedComponent) {
  function WithReceivedTrainingLevel(props) {
    const params = useParams();
    const history = useHistory();

    const trainingLevelsMap = useSelector(
      store => store.training.trainingLevelsMap
    );

    const dispatch = useDispatch();

    const [
      preparedWordTranslations,
      setPreparedWordTranslations
    ] = React.useState();

    const [cardSettings, setCardSettings] = React.useState(initialCardSettings);

    React.useEffect(() => {
      const paramLevelId = +params.levelId;

      if (!trainingLevelsMap[paramLevelId]) {
        switch (paramLevelId) {
          case 0:
            history.push('/training');
            return;
          case -1:
            history.push('/dictionary');
            return;
          default:
            setPreparedWordTranslations(undefined);
            dispatch(receiveTrainingLevel(paramLevelId));
        }
      } else {
        const trainingsSettingsLocalData = loadValue('trainingsSettings');

        const trainingSettings =
          (trainingsSettingsLocalData &&
            trainingsSettingsLocalData[+params.trainingId]) ||
          {};

        setCardSettings({
          cardDimension: +trainingSettings.cardDimension || 120,
          cardTextSize: +trainingSettings.cardTextSize || 16
        });

        if (trainingLevelsMap[paramLevelId]) {
          let wordTranslations =
            trainingLevelsMap[paramLevelId].wordTranslations;

          if (paramLevelId <= 0) {
            wordTranslations = shuffle([...wordTranslations]).slice(
              0,
              trainingSettings.quantity || 8
            );
          }

          if (trainingSettings.voice) {
            wordTranslations = wordTranslations.map(wordTranslation => {
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
            });
          }

          setPreparedWordTranslations(wordTranslations);
        }
      }
    }, [trainingLevelsMap, params, dispatch, history]);

    return (
      Boolean(preparedWordTranslations) && (
        <CardSettingsContext.Provider value={cardSettings}>
          <WrappedComponent
            levelId={+params.levelId}
            wordTranslations={preparedWordTranslations}
            {...props}
          />
        </CardSettingsContext.Provider>
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedTrainingLevel.displayName = `withReceivedTrainingLevel(${wrappedComponentName})`;

  return WithReceivedTrainingLevel;
}

export { CardSettingsContext };
export default withReceivedTrainingLevel;
