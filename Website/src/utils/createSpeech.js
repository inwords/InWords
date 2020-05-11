const synth = window.speechSynthesis;

const createSpeech = (text, { lang = 'en-US' } = {}) => () => {
  if (!synth) return;

  if (synth.speaking) {
    synth.cancel();
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = lang;
  synth.speak(speech);
};

export default createSpeech;
