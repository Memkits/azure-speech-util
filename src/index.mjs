import * as bundle from "microsoft-cognitiveservices-speech-sdk/distrib/browser/microsoft.cognitiveservices.speech.sdk.bundle";

bundle;

var synthesizer;
var previousAudio;

export function speechOne(text, key, language, onPlay, onNext) {
  if (key == null) {
    throw new Error("key is required");
  }
  if (synthesizer == null) {
    configAzureSpeechApiOnly(key, language);
  }

  synthesizer.speakSsmlAsync(
    makeSsml(text, language),
    (result) => {
      if (result) {
        if (previousAudio != null) {
          previousAudio.pause();
        }
        // synthesizer.close();
        let b = new Blob([result.audioData], { type: "audio/wav" });

        let url = URL.createObjectURL(b);
        // console.log(b.toString())
        // console.log('url', url)

        let audio = new Audio();
        previousAudio = audio;
        audio.src = url;
        audio.autoplay = true;

        audio.onplay = () => {
          onPlay?.();
        };
        audio.onended = () => {
          previousAudio = null;
          onNext?.();
        };
      } else {
        console.warn("unknown result");
      }
    },
    (error) => {
      console.log(error);
      synthesizer.close();
    }
  );
}

export let configAzureSpeechApi = (key, language) => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, "eastasia");
  speechConfig.speechSynthesisLanguage = language; // For example, "de-DE"
  speechConfig.speechSynthesisVoiceName = pickVoice(language);
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
};

export let configAzureSpeechApiOnly = (key, language) => {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, "eastasia");
  speechConfig.speechSynthesisLanguage = language; // For example, "de-DE"
  speechConfig.speechSynthesisVoiceName = pickVoice(language);
  synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, null);
};

var previousContent = "";
export function speechQueue(text, key, lang, onPlay) {
  if (key == null) {
    throw new Error("key is required");
  }
  if (text === previousContent) {
    // accidental click
    return;
  }
  previousContent = text;
  if (synthesizer == null) {
    configAzureSpeechApi(key, lang);
  }

  synthesizer.speakSsmlAsync(
    makeSsml(text, lang),
    (result) => {
      if (result) {
        // synthesizer.close();
        onPlay?.();
      } else {
        console.warn("unknown result");
      }
    },
    (error) => {
      console.log(error);
      synthesizer.close();
    }
  );
}

let makeSsml = (text, language) => {
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
    <voice name="${pickVoice(language)}">
        <prosody rate="+10.00%">
            ${text}
        </prosody>
    </voice>
</speak>`;
};

let pickVoice = (language) => {
  switch (language) {
    case "zh-CN":
      return "zh-CN-XiaochenNeural";
    case "en-US":
      return "en-US-SaraNeural";
    default:
      console.error("unknown language:", language);
      return null;
  }
};

export let nativeSpeechOne = (content, language) => {
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance(content);
  msg.rate = 1.1;
  msg.lang = language;
  window.speechSynthesis.speak(msg);
};
