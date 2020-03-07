const synth = window.speechSynthesis;

export default function createSpeech(text, { lang = 'en-US' } = {}) {
  return () => {
    if (synth.speaking) {
      synth.cancel();
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    synth.speak(speech);
  };
}
