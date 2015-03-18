Emoticons-js
============

A jquery plugin to insert emojis, font smileys, embed videos (youtube/vimeo), media files,pdf and highlight code syntax.

Features
--------

* Converts emoticon text codes into emoticons :smile: , :heart:
* Finds links in text input and turns them into html links.
* Youtube and Vimeo video embedding
* HTML5 player supported media embedding (mp3,mp4,ogg)
* PDF viewing with preview and then the actual pdf in a frame.
* Inline Code Syntax highlighting (uses highlight.js)

Dependencies
------------
* Jquery
* [Highlight.js](https://highlightjs.org/) (Optional if code syntax highlighting is needed)

Getting started
---------------

**bower**
```bower install --save emoticons-js```

**npm**
```npm install --save emoticons-js```

Load css file
```html
<link rel="stylesheet" href="path/to/jquery.emoticons.css"/>
```

Load Scripts
```html
<script src="path/to/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script> <!--==== Optional =====-->
<script src="path/to/jquery.emoticons.js"></script>
```

HTML Structure
--------------
```html
<div id="element">
  <div> Some content here </div>
  <div> Some content here </div>
  ...
  ...
</div>
```

Simple Usage
------------
```javascript
$('#element').emoticons();
```

Options
-------
property|Default value|Description
--------|-------------|-----------
link|true|Instructs the library whether or not to embed urls
linkTarget|'_blank'|same as the target attribute in html anchor tag . supports all html supported target values.
pdfEmbed|false|Instructs the library whether or not to show a preview of pdf links
videoEmbed|true|Instructs the library whether or not to show a preview of youtube/vimeo videos with details
videoWidth|null|width of the video frame
videoHeight|null|height of the video frame
ytAuthKey|null|(**Mandatory**) The authorization key obtained from google's developer console for using youtube data api
imageEmbed|true|Instructs the library whether or not to embed images
audioEmbed|false|Instructs the library whether or not to embed audio
basicVideoEmbed|false|Instructs the library whether or not to show basic video files like mp4 etc. (supported by html5 player)
highlightCode|true|Instructs the library whether or not to highlight code syntaxes.

Advanced Usage
--------------

```javascript
$('#element').emoticons({
  link           : true,
  linkTarget     : '_self',
  pdfEmbed       : true,
  imageEmbed     :true,
  audioEmbed     : false,
  videoEmbed     : true,
  basicVideoEmbed: true,
  videoWidth     : null,
  videoHeight    : null,
  ytAuthKey      : null,
  highlightCode  : true
});
```
License
-------
The MIT License (MIT)
Copyright (c) 2014 Ritesh Kumar


