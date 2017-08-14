# embed-plugin-twitter

A plugin that can be used to embed tweets.

## Installation
```
npm i -S embed-js embed-plugin-twitter
```

### CDN

https://unpkg.com/embed-plugin-twitter

## Usage
Embeds Tweets in the website. You need to load https://platform.twitter.com/widgets.js in advance to get this working.

```js
import EmbedJS from 'embed-js'
import twitter from 'embed-plugin-twitter'

const x = new EmbedJS({
  input: document.getElementById('element'),
  plugins: [
  twitter({
    // Regex that matches the string and sends to the template method.
    regex: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi,

    // The maximum width of a rendered Tweet in whole pixels.
    // This value must be between 220 and 550 inclusive. A supplied
    // value under or over the allowed range will be returned as the
    // minimum or maximum supported width respectively; the reset width
    // value will be reflected in the returned width property. Note that
    // Twitter does not support the oEmbed maxheight parameter. Tweets
    // are fundamentally text, and are therefore of unpredictable height
    // that cannot be scaled like an image or video. Relatedly, the
    // oEmbed response will not provide a value for height. Implementations
    // that need consistent heights for Tweets should refer to the hide_thread
    // and hide_media parameters below.
    maxWidth: 550,

    // When set to true , t, or 1 links in a Tweet are not expanded to photo,
    // video, or link previews
    hideMedia: false,

    // When set to true , t, or 1 a collapsed version of the previous Tweet
    // in a conversation thread will not be displayed when the requested Tweet
    // is in reply to another Tweet
    hideThread: false,

    // Specifies whether the embedded Tweet should be floated left,
    // right, or center in the page relative to the parent element.
    // Valid values are left, right, center, and none
    align: "none",

    // Request returned HTML and a rendered Tweet in the specified Twitter
    // language supported by embedded Tweets. https://dev.twitter.com/web/overview/languages
    lang: "en",

    // When set to dark, the Tweet is displayed with light text over a dark background
    theme: "light",

    // Adjust the color of Tweet text links with a hexadecimal color value
    linkColor: "#355acee",

    // Set to video to return a Twitter Video embed for the given Tweet
    widgetType: "",

    /**
		 * It accepts the matching url and returns the html
		 * content that replaces or appends to the URL based
		 * on options. This can return a asynchronous response.
		 */
    template(args, options, pluginOptions, { html }) {
      return html
    },

    // The twitter object loaded from widgets.js. By default it takes twttr
    // from window object.
    twttr: isBrowser ? window.twttr : null,

    // executed when the tweet has been loaded
    // and rendered on the client side
    onLoad() {}
   })
 ]
})
```

**Note** : The twitter embed functionality provided by **embed-plugin-noembed** doesn't provide this much customization. So if you willing to use this plugin for tweet embedding along with noembed plugin, make sure you disable twitter embedding in the latter by passing `exclude: ['twitter']` in it.

### License
MIT @ Ritesh Kumar