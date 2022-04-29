> speech util based on azure

### Usage:

```js
import { speechOnce, speechQueue } from "@memkits/azure-speech-util";

speechOnce(
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
```

### License

MIT
