import emoji from "node-emoji/lib/emoji.json";
import emojiRegex from "regex-emoji";
import extend from "just-extend";

export default () => options =>
  Promise.resolve(
    extend({}, options, {
      input: options.input.replace(
        emojiRegex(),
        (match, emojiName) => emoji[emojiName]
      )
    })
  );
