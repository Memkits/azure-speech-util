> speech util based on azure

### Usage:

```js
import {
  speechOne,
  speechQueue,
  nativeSpeechOne,
} from "@memkits/azure-speech-util";

speechOne(
  "内容",
  "zh-CN",
  KEY,
  () => {
    console.log("play");
  },
  () => {
    console.log("ended");
  }
);

speechQueue("内容", "en-US", KEY, () => {
  console.log("play");
});

nativeSpeechOne("内容", "en-US");
```

### License

MIT
