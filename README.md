<p align="center"><img src="demo/logo.png" align="center" alt=""></p>

<p align="center">
<a href="https://travis-ci.org/ritz078/embed.js">
<img src="https://travis-ci.org/ritz078/embed.js.svg?branch=master" alt="Build Status" style="max-width:100%;">
</a>
<a href="https://github.com/ritz078/embed.js">
<img src="https://img.shields.io/npm/v/embed-js.svg" alt="npm" style="max-width:100%;">
</a>
<a href="https://github.com/ritz078/embed.js">
<img src="https://img.shields.io/bower/v/embed-js.svg" alt="Bower" style="max-width:100%;"
></a>
<a href="https://twitter.com/intent/tweet?text=embed.js+%7C+A+JS+plugin+to+embed+emojis%2C+media%2C+maps%2C+tweets%2C+code%2C+services+and+parse+markdown+http%3A%2F%2Fbit.ly%2F1NIvT8A&amp;url='http%3A%2F%2Fbit.ly%2F1NIvT8A'&amp;hashtags=JavaScript">
<img src="https://img.shields.io/twitter/url/https/github.com/ritz078/embed.js.svg?style=social" alt="Twitter" style="max-width:100%;">
</a>
</p>

> A JavaScript plugin that analyses the string and automatically embeds the supported emojis, media, maps, tweets, code and services.


![screen](demo/demo.gif)

## Important links

* **[Features](http://riteshkr.com/embed.js)**
* **[Full Documentation](http://riteshkr.com/embed.js/doc.html)**
* **[Examples](http://riteshkr.com/embed.js/examples.html)**

## Installation

To install the stable version:
```
npm install --save embed-js
```



## CDN

* [jsDelivr](https://www.jsdelivr.com/projects/embed.js)
* [cdnjs](https://cdnjs.com/libraries/embed-js)

## Simple Usage

Let's assume that the HTML structure is as written below

``` html
<div id="element">
   <!--===== your string here =======-->
</div>
```

Creating an instance of embed.js

``` javascript
var x = new EmbedJS({
  input: document.getElementById('element'),
  googleAuthKey : 'xxxx'
})
```

Next step is replacing the original text with the processed text.

``` javascript
//Render the result
x.render();
```

There may be cases where you just want the processed string to use it according to your need. You can get it by the following method.

``` javascript
//Get the resulting string
x.text(function(data){
  console.log(data); //The resultant string
})
```

If you wan't to destroy the instance. It will also replace the processed string with the original string.

``` javascript
//Destroy the instance
x.destroy()
```

## Options
```js

var options = {
	//An option when set to true will use marked.js to parse markdown and convert it to HTML.
	// Make sure you have loaded marked.js before loading embed.js if this option is set to
	// true else the plugin will throw an error.
	marked                 : false,

	// The option takes the marked.js options.
	markedOptions          : {},

	// Instructs the plugin whether or not to embed urls/ convert urls into HTML anchor tags.
	link                   : true,

	linkOptions            : {
		// Same as the target attribute in html anchor tag . supports all html supported target values.
		target : 'self',

		// Accept array of extensions to be excluded from converting into HTML anchor links
		exclude: ['pdf'],

		// Same as the rel attribute.
		rel    : ''
	},

	// Set to false if you want to disable converting emoji codes into actual emojis.
	emoji                  : true,

	// Include the names of custom emojis. Eg : ['emoji1', 'emoji2']. Now they can be
	// used using :emoji1: :emoji2:
	customEmoji            : [],


	fontIcons              : true,
	customFontIcons        : [],
	highlightCode          : false,
	videoJS                : false,
	videojsOptions         : {
		fluid  : true,
		preload: 'metadata'
	},
	locationEmbed          : true,
	mapOptions             : {
		mode: 'place'
	},
	tweetsEmbed            : false,
	tweetOptions           : {
		maxWidth  : 550,
		hideMedia : false,
		hideThread: false,
		align     : 'none',
		lang      : 'en'
	},
	singleEmbed            : false,

	// For using the open graph support (fetching site's meta data) , you will have
	// to set up your own server due to cross domain restrictions. This option takes
	// the api template as the string where url is a variable.
	openGraphEndpoint      : null,

	// Urls that have the array items in their string won't be processed by the
	// openGraph API.
	openGraphExclude       : [],

	// Set to false if you want to disable embedding supported video formats.
	videoEmbed             : true,


	videoHeight            : null,
	videoWidth             : null,
	videoDetails           : true,
	audioEmbed             : true,
	excludeEmbed           : [],
	inlineEmbed            : [],
	inlineText             : true,
	codeEmbedHeight        : 500,
	vineOptions            : {
		maxWidth  : null,
		type      : 'postcard', //'postcard' or 'simple' embedding
		responsive: true,
		width     : 350,
		height    : 460
	},

	// The google dev auth key needed if the user is using youtube embedding or
	// google map embedding feature of the plugin.
	googleAuthKey          : '',

	soundCloudOptions      : {
		height      : 160,
		themeColor  : 'f50000', //Hex Code of the player theme color
		autoPlay    : false,
		hideRelated : false,
		showComments: true,
		showUser    : true,
		showReposts : false,
		visual      : false, //Show/hide the big preview image
		download    : false //Show/Hide download buttons
	},
	videoClickClass        : 'ejs-video-thumb',
	customVideoClickHandler: false,
	beforeEmbedJSApply     : function () {},
	afterEmbedJSApply      : function () {},
	onVideoShow            : function () {},
	onTweetsLoad           : function () {},
	videojsCallback        : function () {},
	onOpenGraphFetch       : function () {},
	videoClickHandler      : function () {}
}
```

## Creating custom build

Set the features you don't want to **false** in `build.json` and then run

```
grunt build
```

This will create a customized build of the plugin.

## Adding custom emojis

1. Add the image to **assets/images/emojis**. Make sure the name of the file is same as emoji name.
1. Pass the emoji name as the value to `customEmoji`. See the example [here](http://riteshkr.com/embed.js/doc.html#emoji)
1. Run `grunt build-emoji && grunt build`

## License

MIT &copy; [Ritesh Kumar](https://github.com/ritz078)
