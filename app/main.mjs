import { speechOne, speechQueue, nativeSpeechOne } from "../src/index.mjs";

window.onload = () => {
  let one = document.getElementById("one");
  let queue = document.getElementById("queue");
  let content = document.getElementById("content");
  let native = document.getElementById("native");

  one.onclick = () => {
    speechOne(
      content.value,
      new URLSearchParams(location.search).get("key"),
      "zh-CN",
      () => {
        console.log("play");
      }
    );
  };

  queue.onclick = () => {
    speechQueue(
      content.value,
      new URLSearchParams(location.search).get("key"),
      "zh-CN",
      () => {
        console.log("play");
      },
      () => {
        console.log("ended");
      }
    );
  };

  native.onclick = () => {
    nativeSpeechOne(content.value, "zh-CN");
  };
};
