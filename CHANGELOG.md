For the changelog of versions after 4.1.14 see the releases section.

<a name="4.1.14"></a>
## [4.1.14](https://github.com/ritz078/embed.js/compare/v4.1.13...v4.1.14) (2017-02-22)


### Bug Fixes

* **unfetch:** replace fetch polyfill with unfetch ([da70f43](https://github.com/ritz078/embed.js/commit/da70f43))



<a name="4.1.13"></a>
## [4.1.13](https://github.com/ritz078/embed.js/compare/v4.1.12...v4.1.13) (2017-02-17)



<a name="4.1.12"></a>
## [4.1.12](https://github.com/ritz078/embed.js/compare/v4.1.11...v4.1.12) (2017-01-25)



<a name="4.1.11"></a>
## [4.1.11](https://github.com/ritz078/embed.js/compare/v4.1.10...v4.1.11) (2017-01-25)


### Bug Fixes

* **asyncEmbed:** fixes 194 ([7dbc1c4](https://github.com/ritz078/embed.js/commit/7dbc1c4))
* **template:** extend template instead of replacing ([900c528](https://github.com/ritz078/embed.js/commit/900c528))



<a name="4.1.10"></a>
## [4.1.10](https://github.com/ritz078/embed.js/compare/v4.1.7...v4.1.10) (2016-10-26)



<a name="4.1.7"></a>
## [4.1.7](https://github.com/ritz078/embed.js/compare/v4.1.6...v4.1.7) (2016-10-26)


### Bug Fixes

* **soundcloud:** wrong soundcloud URLs ([b9f566f](https://github.com/ritz078/embed.js/commit/b9f566f)), closes [#188](https://github.com/ritz078/embed.js/issues/188)



<a name="4.1.6"></a>
## [4.1.6](https://github.com/ritz078/embed.js/compare/v4.1.4...v4.1.6) (2016-10-16)


### Bug Fixes

* **string:** allow empty string as input ([3535d75](https://github.com/ritz078/embed.js/commit/3535d75)), closes [#181](https://github.com/ritz078/embed.js/issues/181)



<a name="4.1.4"></a>
## [4.1.4](https://github.com/ritz078/embed.js/compare/v4.1.3...v4.1.4) (2016-07-14)


### Bug Fixes

* **destroy:** fixed .load of undefined when tweetsEmbed was turned off. ([e19068b](https://github.com/ritz078/embed.js/commit/e19068b))
* **smiley:** fixed smiley, hashtag and mention conflict ([1826726](https://github.com/ritz078/embed.js/commit/1826726))



<a name="4.1.3"></a>
## [4.1.3](https://github.com/ritz078/embed.js/compare/v4.1.2...v4.1.3) (2016-06-16)


### Bug Fixes

* **destroy:** markdown and destroy working as expected + perf ([de45f1b](https://github.com/ritz078/embed.js/commit/de45f1b))


### Performance Improvements

* changed classes to functions ([764e7c5](https://github.com/ritz078/embed.js/commit/764e7c5))



<a name="4.1.2"></a>
## [4.1.2](https://github.com/ritz078/embed.js/compare/v4.1.1...v4.1.2) (2016-06-14)



<a name="4.1.1"></a>
## [4.1.1](https://github.com/ritz078/embed.js/compare/v4.1.0...v4.1.1) (2016-06-13)


### Bug Fixes

* **assets:** fixed relative path in of assets in dist ([a1d7b6c](https://github.com/ritz078/embed.js/commit/a1d7b6c))
* **destroy:** now it works as expected ([766d3ae](https://github.com/ritz078/embed.js/commit/766d3ae))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/ritz078/embed.js/compare/v4.0.4...v4.1.0) (2016-06-12)


### Features

* **gmap:** added template to google map ([b80a6ca](https://github.com/ritz078/embed.js/commit/b80a6ca)), closes [#162](https://github.com/ritz078/embed.js/issues/162)
* **hashtag & mentions:** added support for hashtag & mentions ([a53da81](https://github.com/ritz078/embed.js/commit/a53da81)), closes [#161](https://github.com/ritz078/embed.js/issues/161)



<a name="4.0.4"></a>
## [4.0.4](https://github.com/ritz078/embed.js/compare/v4.0.3...v4.0.4) (2016-04-27)


### Bug Fixes

* **string:** fixed addEventlistener of undefined when input is string ([73924ba](https://github.com/ritz078/embed.js/commit/73924ba)), closes [#167](https://github.com/ritz078/embed.js/issues/167)



<a name="4.0.3"></a>
## [4.0.3](https://github.com/ritz078/embed.js/compare/v4.0.2...v4.0.3) (2016-04-16)


### Bug Fixes

* **emoji:** fixed regex for +1 and -1 ([6b07ba6](https://github.com/ritz078/embed.js/commit/6b07ba6)), closes [#164](https://github.com/ritz078/embed.js/issues/164)



<a name="4.0.2"></a>
## [4.0.2](https://github.com/ritz078/embed.js/compare/v4.0.1...v4.0.2) (2016-04-11)


### Bug Fixes

* **link:** text disappears when link turned to false ([c4077c3](https://github.com/ritz078/embed.js/commit/c4077c3)), closes [#157](https://github.com/ritz078/embed.js/issues/157)



<a name="4.0.1"></a>
## [4.0.1](https://github.com/ritz078/embed.js/compare/v4.0.0...v4.0.1) (2016-03-27)


### Bug Fixes

* **smiley:** fixed a condition when continuous smileys were not shown. ([8c448e6](https://github.com/ritz078/embed.js/commit/8c448e6)), closes [#149](https://github.com/ritz078/embed.js/issues/149)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/ritz078/embed.js/compare/v3.7.4...v4.0.0) (2016-03-13)


### Bug Fixes

* **css:** removed calc due to limited browser support ([aed68ee](https://github.com/ritz078/embed.js/commit/aed68ee))
* **fetchjsonp:** removed window variable from fetchjsonp ([6e00ede](https://github.com/ritz078/embed.js/commit/6e00ede))
* **gist:** fixed the regex for excluding gist from github.com ([8cb52a8](https://github.com/ritz078/embed.js/commit/8cb52a8))
* **github:** exclude github embed if set in options ([c88a940](https://github.com/ritz078/embed.js/commit/c88a940)), closes [#142](https://github.com/ritz078/embed.js/issues/142)
* **ifInline & ifEmbed:** corrected the behaviour of these 2 functions ([fbe6de7](https://github.com/ritz078/embed.js/commit/fbe6de7))
* **opengraph:** fixed opengraph error ([c4e865c](https://github.com/ritz078/embed.js/commit/c4e865c))
* **option:** covert options array elements into lowercase before comparing ([1e03d07](https://github.com/ritz078/embed.js/commit/1e03d07))
* **text:** callback added in text ([2caca5e](https://github.com/ritz078/embed.js/commit/2caca5e))
* **umd:** added options to pass the global variable of 3rd party plugins ([f6cec4f](https://github.com/ritz078/embed.js/commit/f6cec4f)), closes [#131](https://github.com/ritz078/embed.js/issues/131)
* **umd:** fixed an issue with undefined marked and prismjs ([0bfaf06](https://github.com/ritz078/embed.js/commit/0bfaf06))
* **video:** fixed basic video regex issue ([cab117c](https://github.com/ritz078/embed.js/commit/cab117c))


### Features

* **es2015:** added es2015 build of the plugin and jsnext:main option in package.json ([36fa93d](https://github.com/ritz078/embed.js/commit/36fa93d))
* **highlight:** added support for Prism.js ([aa7f4b5](https://github.com/ritz078/embed.js/commit/aa7f4b5)), closes [#125](https://github.com/ritz078/embed.js/issues/125)
* **promises:** return promiss on .render() , .text() and .applyEmbedJS() ([3bf7012](https://github.com/ritz078/embed.js/commit/3bf7012))
* **singleEmbed:** added options to embed only one service from the detected services ([e31ec03](https://github.com/ritz078/embed.js/commit/e31ec03))
* **tests:** moved from mocha to ava ([c8c8bc7](https://github.com/ritz078/embed.js/commit/c8c8bc7)), closes [#118](https://github.com/ritz078/embed.js/issues/118)


### Performance Improvements

* **async/await:** Removed async/await in favour of ES6 promises ([ef473c2](https://github.com/ritz078/embed.js/commit/ef473c2)), closes [#117](https://github.com/ritz078/embed.js/issues/117)
* **base:** use base class for synchronous embedding and remove custom build of plugin ([68b7546](https://github.com/ritz078/embed.js/commit/68b7546))
* **setDimensions:** Avoid execution of setDimensions more than once. ([cb1e273](https://github.com/ritz078/embed.js/commit/cb1e273))



<a name="3.7.4"></a>
## [3.7.4](https://github.com/ritz078/embed.js/compare/v3.7.3...v3.7.4) (2016-01-19)


### Bug Fixes

* **npmignore:** updated .npmignore ([6ce6f46](https://github.com/ritz078/embed.js/commit/6ce6f46))



<a name="3.7.3"></a>
## [3.7.3](https://github.com/ritz078/embed.js/compare/v3.7.2...v3.7.3) (2016-01-19)


### Bug Fixes

* **log:** removed console.log ([acac175](https://github.com/ritz078/embed.js/commit/acac175))
* **npm:** Fixed npm dist issue and updated packages ([0e0d232](https://github.com/ritz078/embed.js/commit/0e0d232)), closes [#114](https://github.com/ritz078/embed.js/issues/114)
* **package:** corrected main file path ([f49326b](https://github.com/ritz078/embed.js/commit/f49326b))
* **template:** fixed  references for this.options.templates. ([daa3cce](https://github.com/ritz078/embed.js/commit/daa3cce))


### Features

* **core:** Changed templating structure and export class ([c63cc1e](https://github.com/ritz078/embed.js/commit/c63cc1e))



<a name="3.7.2"></a>
## [3.7.2](https://github.com/ritz078/embed.js/compare/v3.7.1...v3.7.2) (2016-01-10)


### Bug Fixes

* **build:** removed duplicate YOUTUBE key ([5b3a42a](https://github.com/ritz078/embed.js/commit/5b3a42a))
* **helpers:** changed helper functioned into named exports ([a9633da](https://github.com/ritz078/embed.js/commit/a9633da))
* **ideone:** corrected the src url formed for the iframe ([e3cda9e](https://github.com/ritz078/embed.js/commit/e3cda9e))
* **jsfiddle:** inline embedding of jsfiddle having / in url ([3add245](https://github.com/ritz078/embed.js/commit/3add245))
* **package:** updated package.json ([6913738](https://github.com/ritz078/embed.js/commit/6913738))
* **travis:** added grunt-cli installation to before-install step ([d23e6f8](https://github.com/ritz078/embed.js/commit/d23e6f8))


### Performance Improvements

* **css:** optimized css and reduced file size ([f3f65c3](https://github.com/ritz078/embed.js/commit/f3f65c3))
* **dimensions:** avoid recalculation of dimensions for each services ([3fb29d3](https://github.com/ritz078/embed.js/commit/3fb29d3))



<a name="3.7.1"></a>
## [3.7.1](https://github.com/ritz078/embed.js/compare/v3.7.0...v3.7.1) (2016-01-06)


### Bug Fixes

* **release:** fix version number in build files ([aea6b89](https://github.com/ritz078/embed.js/commit/aea6b89))


### Features

* **changelog:** automated changelog generation using grunt ([f74e5ad](https://github.com/ritz078/embed.js/commit/f74e5ad))



<a name="3.7.0"></a>
# [3.7.0](https://github.com/ritz078/embed.js/compare/3.6.2...v3.7.0) (2016-01-06)


### Bug Fixes

* **release:** fixed the release task ([0d68fc2](https://github.com/ritz078/embed.js/commit/0d68fc2))
* **template:** added options as argument in template functions ([45b2208](https://github.com/ritz078/embed.js/commit/45b2208))
* **test:** added some test and refactoring ([fbd58d6](https://github.com/ritz078/embed.js/commit/fbd58d6))


### Features

* **slideshare:** added slideshare embedding functionality ([d056eda](https://github.com/ritz078/embed.js/commit/d056eda)), closes [#93](https://github.com/ritz078/embed.js/issues/93)



<a name="3.6.2"></a>
## [3.6.2](https://github.com/ritz078/embed.js/compare/3.6.1...3.6.2) (2016-01-04)



<a name="3.6.1"></a>
## [3.6.1](https://github.com/ritz078/embed.js/compare/3.6.0...3.6.1) (2016-01-03)


### Bug Fixes

* **release:** added bower.json to release ([567af34](https://github.com/ritz078/embed.js/commit/567af34))



<a name="3.6.0"></a>
# [3.6.0](https://github.com/ritz078/embed.js/compare/v3.5.0...3.6.0) (2016-01-03)


### Bug Fixes

* removed function is_short_url as its no longer needed ([74b272c](https://github.com/ritz078/embed.js/commit/74b272c))
* **opengraph:** fixed preference order for opengraph usage with other services ([5d8e545](https://github.com/ritz078/embed.js/commit/5d8e545))


### Features

* **github:** Added github API integration for repo urls. ([7f727db](https://github.com/ritz078/embed.js/commit/7f727db)), closes [#81](https://github.com/ritz078/embed.js/issues/81)
* **ogp:** added boilerplate for opengraph data using opengraph.io API. ([337c340](https://github.com/ritz078/embed.js/commit/337c340))
* **opengrap:** Added server demo and server endpoint integration in the plugin ([d0996cd](https://github.com/ritz078/embed.js/commit/d0996cd))
* **opengraph:** Added check for already processed urls to prevent its processing multiple time ([eea4d12](https://github.com/ritz078/embed.js/commit/eea4d12))
* **opengraph:** added inline embedding of opengraph embed feature ([ebf237b](https://github.com/ritz078/embed.js/commit/ebf237b))
* **opengraph:** Integrated opengraph support with inline embedding. ([a72784d](https://github.com/ritz078/embed.js/commit/a72784d)), closes [#82](https://github.com/ritz078/embed.js/issues/82)
* **release:** added grunt release to automate publishing ([2ff5817](https://github.com/ritz078/embed.js/commit/2ff5817))


### Performance Improvements

* **package:** updated babel plugin ([1d54b31](https://github.com/ritz078/embed.js/commit/1d54b31))



<a name="3.4.3"></a>
## [3.4.3](https://github.com/ritz078/embed.js/compare/v3.3.3...v3.4.3) (2015-12-27)


### Bug Fixes

* **video:** fixed name of the function for custom video callback. ([348b7de](https://github.com/ritz078/embed.js/commit/348b7de)), closes [#79](https://github.com/ritz078/embed.js/issues/79)


### Features

* **video:** added support for custom click handler and class name for youtube and vimeo ([34d6cb3](https://github.com/ritz078/embed.js/commit/34d6cb3)), closes [#79](https://github.com/ritz078/embed.js/issues/79)



<a name="3.3.3"></a>
## [3.3.3](https://github.com/ritz078/embed.js/compare/v3.3.2...v3.3.3) (2015-12-25)


### Bug Fixes

* **changelog:** Added release notes for v3.2.2 ([7c5604b](https://github.com/ritz078/embed.js/commit/7c5604b))
* **ejs:** Accept className with dot also ([0e375c1](https://github.com/ritz078/embed.js/commit/0e375c1)), closes [#64](https://github.com/ritz078/embed.js/issues/64)
* **options:** Set tweetsEmbed and highlightCode to false by default ([1302d27](https://github.com/ritz078/embed.js/commit/1302d27))
* **video:** fix multiple video playing under same block ([21a7ce6](https://github.com/ritz078/embed.js/commit/21a7ce6)), closes [#76](https://github.com/ritz078/embed.js/issues/76)


### Features

* **.npmignore:** added npmignore to remove files from packaging ([dd5f174](https://github.com/ritz078/embed.js/commit/dd5f174))
* version bump ([b47b87f](https://github.com/ritz078/embed.js/commit/b47b87f))



<a name="3.2.2"></a>
## [3.2.2](https://github.com/ritz078/embed.js/compare/v3.0.4...v3.2.2) (2015-12-11)


### Bug Fixes

* **version:** fixed automatic versioning ([e2b6224](https://github.com/ritz078/embed.js/commit/e2b6224))
* **version:** removed auto versioning ([80a4b88](https://github.com/ritz078/embed.js/commit/80a4b88))



<a name="3.0.3"></a>
## [3.0.3](https://github.com/ritz078/embed.js/compare/v3.2.0...v3.0.3) (2015-12-11)


### Bug Fixes

* **instagram and flickr:** fixed issue of inline embedding ([d41fbef](https://github.com/ritz078/embed.js/commit/d41fbef))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/ritz078/embed.js/compare/v3.1.1...v3.2.0) (2015-12-11)


### Features

* version bump :smile: ([3078758](https://github.com/ritz078/embed.js/commit/3078758))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/ritz078/embed.js/compare/v3.1.0...v3.1.1) (2015-12-11)


### Bug Fixes

* **instagram:** fixed issue with instagram embed ([c63abb2](https://github.com/ritz078/embed.js/commit/c63abb2))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/ritz078/embed.js/compare/v3.0.2...v3.1.0) (2015-12-11)


### Bug Fixes

* **package:** replaced multiple main files with one ([fdf3b20](https://github.com/ritz078/embed.js/commit/fdf3b20))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/ritz078/embed.js/compare/v3.0.1...v3.0.2) (2015-12-11)


### Bug Fixes

* **bower:** added missing comma in the file ([590f429](https://github.com/ritz078/embed.js/commit/590f429))
* **bower:** unexpected token error ([2880148](https://github.com/ritz078/embed.js/commit/2880148))


### Features

* **bump:** version updated ([c33a383](https://github.com/ritz078/embed.js/commit/c33a383))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ritz078/embed.js/compare/v2.0.6...v3.0.0) (2015-12-06)


### Bug Fixes

* **app:** removed app directory ([5fa188a](https://github.com/ritz078/embed.js/commit/5fa188a))
* **autoplay:** Enabled when opening via preview ([f90416f](https://github.com/ritz078/embed.js/commit/f90416f))
* **babel:** added cachedirectory option to babel-loader ([5abdb64](https://github.com/ritz078/embed.js/commit/5abdb64))
* **build:** Added the correct build configuration for webpack ([6d504fc](https://github.com/ritz078/embed.js/commit/6d504fc))
* **css:** Added color variable and minor changes ([59667b6](https://github.com/ritz078/embed.js/commit/59667b6))
* **css:** added display block to all iframes to remove padding at bottom ([bbccf07](https://github.com/ritz078/embed.js/commit/bbccf07))
* **css:** added ejs-embed class to all embeds ([e9fdb88](https://github.com/ritz078/embed.js/commit/e9fdb88))
* **css:** added padding to the video preview ([440cb9b](https://github.com/ritz078/embed.js/commit/440cb9b))
* **css:** Fixed css emoji sprite path and add input as callback value ([cb5c667](https://github.com/ritz078/embed.js/commit/cb5c667))
* **custom template:** Fixed custom template for vimeo and youtube ([1794e5f](https://github.com/ritz078/embed.js/commit/1794e5f))
* **destroy:** replace text with original text on destroy ([fdfa221](https://github.com/ritz078/embed.js/commit/fdfa221))
* **dimensions():** converted the default aspect ratio to 4:3 ([ef0adcd](https://github.com/ritz078/embed.js/commit/ef0adcd))
* **embed all:** Changed selector from attribute name to class name ([5d72dc8](https://github.com/ritz078/embed.js/commit/5d72dc8))
* **flickr:** removed extra comma from the template ([287b56d](https://github.com/ritz078/embed.js/commit/287b56d))
* **gist:** Fixed inline embedding of github gist ([b2d6a00](https://github.com/ritz078/embed.js/commit/b2d6a00))
* **image:** Fixed default return bug in image embed and remove dead code ([75cff1a](https://github.com/ritz078/embed.js/commit/75cff1a))
* **inject:** removed rollup-plugin-inject from gruntfile.js ([0c2d59c](https://github.com/ritz078/embed.js/commit/0c2d59c))
* **instances:** Clash in options due to value change of options object ([e4a3fc2](https://github.com/ritz078/embed.js/commit/e4a3fc2))
* **markdown:** Accept heading without space if gfm set to true ([e011633](https://github.com/ritz078/embed.js/commit/e011633))
* **markdown:** fixed conflict arising due to inline image embed and native image embed. ([59b7afe](https://github.com/ritz078/embed.js/commit/59b7afe))
* **marked:** url parsing conflict between marked and native url parsing ([eb6997f](https://github.com/ritz078/embed.js/commit/eb6997f))
* **package:** added stage-2 preset to dev dependency ([5ad9012](https://github.com/ritz078/embed.js/commit/5ad9012))
* **package:** added transform-regenerator in dev dependencies ([4039f7c](https://github.com/ritz078/embed.js/commit/4039f7c))
* **preview:** Replace image with background-image for preview thumbnail ([01cc8f9](https://github.com/ritz078/embed.js/commit/01cc8f9))
* **smiley:** Now smiley in url won't be processed ([02a45a3](https://github.com/ritz078/embed.js/commit/02a45a3))
* **smiley:** Smiley at last was not rendered due to conflict with marked ([e6072a0](https://github.com/ritz078/embed.js/commit/e6072a0))
* **travis:** fixed parsing error due to incorrect indentation ([98d0d8a](https://github.com/ritz078/embed.js/commit/98d0d8a))
* **travis:** fixed parsing error due to incorrect indentation ([851b6f0](https://github.com/ritz078/embed.js/commit/851b6f0))
* **travis:** specifies brances for building and some minor code refactoring ([a911cd5](https://github.com/ritz078/embed.js/commit/a911cd5))
* **twitter:** Support for twitter embedding added ([675a357](https://github.com/ritz078/embed.js/commit/675a357))
* **videojs:** Added fluid:true and preload:'metada' as default in video.js options ([cfc0c67](https://github.com/ritz078/embed.js/commit/cfc0c67))
* **webpack-dev:** Removed grunt serve that ran webpack dev server ([36dbc9c](https://github.com/ritz078/embed.js/commit/36dbc9c))


### Features

* **audio:** Added wav|mp3|ogg embed feature support with video.js ([d270b18](https://github.com/ritz078/embed.js/commit/d270b18))
* **audio:** Support for soundcloud and spotify added ([555ea1b](https://github.com/ritz078/embed.js/commit/555ea1b))
* **build:** Added support to create custom build of the library by only including the necessary fun ([0e0d0bc](https://github.com/ritz078/embed.js/commit/0e0d0bc))
* **code:** Moved code analyzing part to separate module and support for ideone added ([973edb9](https://github.com/ritz078/embed.js/commit/973edb9))
* **code-highlighting:** Added support for code highlighting using highlight.js ([0b8ad3f](https://github.com/ritz078/embed.js/commit/0b8ad3f))
* **codepen:** support for codepen embedding added ([882bbc7](https://github.com/ritz078/embed.js/commit/882bbc7))
* **custom template:** added support for creating custom templates ([8372621](https://github.com/ritz078/embed.js/commit/8372621))
* **custom-emoji:** Added support for custom emoji and custom build process added ([8e61e15](https://github.com/ritz078/embed.js/commit/8e61e15))
* **custom-emoji-build:** Support to build a custom emoji set added ([30a3677](https://github.com/ritz078/embed.js/commit/30a3677))
* **custom-emoji-build:** Support to build a custom emoji set added ([73592a7](https://github.com/ritz078/embed.js/commit/73592a7)), closes [#46](https://github.com/ritz078/embed.js/issues/46)
* **dailymotion:** Support for dailymotion embedding added ([ce4c944](https://github.com/ritz078/embed.js/commit/ce4c944))
* **demo:** Added demo and logo of the library ([2cfbaa9](https://github.com/ritz078/embed.js/commit/2cfbaa9))
* **destroy:** Added destroy method to the plugin ([9f23b01](https://github.com/ritz078/embed.js/commit/9f23b01))
* **eslint:** added babel-eslint to support ES6 code linting ([445048a](https://github.com/ritz078/embed.js/commit/445048a))
* **fontSmiley:** Smiley class to insert font smileys implemented ([d5e41cc](https://github.com/ritz078/embed.js/commit/d5e41cc))
* **gist:** Added github gist embedding support ([c19b027](https://github.com/ritz078/embed.js/commit/c19b027))
* **gist:** Feature to embed github gists added ([6f56fcb](https://github.com/ritz078/embed.js/commit/6f56fcb))
* **globalSettings:** Added support to set global options and render by attribute name ([2f87292](https://github.com/ritz078/embed.js/commit/2f87292))
* **inline:** Twitter inline embedding support added ([b3a9ec3](https://github.com/ritz078/embed.js/commit/b3a9ec3))
* **inline code:** Added inline code block embedding feature ([dc57a7f](https://github.com/ritz078/embed.js/commit/dc57a7f))
* **inline embed:** Added functionality for inline embedding of youtube and vimeo videos ([31f3793](https://github.com/ritz078/embed.js/commit/31f3793))
* **inline embed:** Feature to allow inline embedding started ([99cb21f](https://github.com/ritz078/embed.js/commit/99cb21f))
* **input:** Feature to optionally provide input string added ([64f562f](https://github.com/ritz078/embed.js/commit/64f562f))
* **jsbin:** support for jsbin embedding added ([4a18e4e](https://github.com/ritz078/embed.js/commit/4a18e4e))
* **jsfiddle:** support for jsfiddle embedding added ([72e298e](https://github.com/ritz078/embed.js/commit/72e298e))
* **liveleak:** Support for liveleak video embedding added ([e2ae7da](https://github.com/ritz078/embed.js/commit/e2ae7da))
* **map:** Added support for map embed with option place, view and streetview ([9a5d8b4](https://github.com/ritz078/embed.js/commit/9a5d8b4))
* **map:** Inline embedding of map added ([92564fb](https://github.com/ritz078/embed.js/commit/92564fb))
* **markdown:** Markdown parsing support added using marked.js ([74f7881](https://github.com/ritz078/embed.js/commit/74f7881))
* **play:** Added the function to play youtube and vimeo videos. ([c5ed2f1](https://github.com/ritz078/embed.js/commit/c5ed2f1))
* **plunker:** Support for plunker embedding added ([0b7b603](https://github.com/ritz078/embed.js/commit/0b7b603))
* **rel:** Added option to provide rel attribute in link and added fix for media query ([0951dfb](https://github.com/ritz078/embed.js/commit/0951dfb)), closes [#47](https://github.com/ritz078/embed.js/issues/47)
* **rollup:** replacing webpack with rollup in the build process ([2e316ce](https://github.com/ritz078/embed.js/commit/2e316ce))
* **rollup.js:** Integrated rollup.js in the build process ([243f10d](https://github.com/ritz078/embed.js/commit/243f10d))
* **sass:** Included sass i the workflow and custom css template for sprite ([001c11f](https://github.com/ritz078/embed.js/commit/001c11f))
* **smileys:** Now the plugin correctly processes the smileys, emojis and urls ([50807c0](https://github.com/ritz078/embed.js/commit/50807c0))
* **spotify and soundcloud:** support for spotify and soundcloud embedding added ([5bf6bf0](https://github.com/ritz078/embed.js/commit/5bf6bf0))
* **ted:** Support for Ted video embedding support added ([2b84036](https://github.com/ritz078/embed.js/commit/2b84036))
* **text:** Feature to return processes string added and optional rendering enabled ([b01841e](https://github.com/ritz078/embed.js/commit/b01841e))
* **twitter:** Added on TweetsLoad function that gets executed after all the tweets have been render ([2ee86b4](https://github.com/ritz078/embed.js/commit/2ee86b4))
* **twitter:** Multiple tweet embed support added ([7a59ecf](https://github.com/ritz078/embed.js/commit/7a59ecf))
* **twitter, custom-icons:** Added support for custom font icons and triggered a renedered event wit ([98fd2e7](https://github.com/ritz078/embed.js/commit/98fd2e7))
* **url:** added buff.ly support to the url module ([12b944f](https://github.com/ritz078/embed.js/commit/12b944f))
* **urlEmbed:** Url class to find and replace links into anchor tags added ([76e8173](https://github.com/ritz078/embed.js/commit/76e8173))
* **ustream:** Support for ustream video embedding added ([4251c65](https://github.com/ritz078/embed.js/commit/4251c65))
* **video:** Added the feature to embed basic video and use video.js to support in multiple places. ([6da36e0](https://github.com/ritz078/embed.js/commit/6da36e0))
* **video-details:** Feature to disable vimeo and youtube description added ([a138840](https://github.com/ritz078/embed.js/commit/a138840))
* **vimeo:** Support for fetching vimeo data added ([0dff396](https://github.com/ritz078/embed.js/commit/0dff396))
* **vine:** Support for vine added ([20f8cb2](https://github.com/ritz078/embed.js/commit/20f8cb2))
* **youtube:** Support youtube details fetching from the API ([c2c1f9f](https://github.com/ritz078/embed.js/commit/c2c1f9f))


### Performance Improvements

* match replaced by exec to get the index ([92fb229](https://github.com/ritz078/embed.js/commit/92fb229))
* **async/await:** removal of async/await from the places that did't needed them ([bdc2aa2](https://github.com/ritz078/embed.js/commit/bdc2aa2))
* **babel-runtime:** Set the optional option to runtime and removed runtime.js ([49dd19d](https://github.com/ritz078/embed.js/commit/49dd19d))
* **code:** Refactored classes to extend base class ([c6f448b](https://github.com/ritz078/embed.js/commit/c6f448b))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/ritz078/embed.js/compare/v2.0.4...v2.0.5) (2015-05-01)



<a name="2.0.4"></a>
## [2.0.4](https://github.com/ritz078/embed.js/compare/v2.0.3...v2.0.4) (2015-04-19)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/ritz078/embed.js/compare/v2.0.2...v2.0.3) (2015-04-08)


### Features

* callback functions added [#10](https://github.com/ritz078/embed.js/issues/10) ([4e932e9](https://github.com/ritz078/embed.js/commit/4e932e9))
* support for a lot of shortened urls added [#12](https://github.com/ritz078/embed.js/issues/12) ([5cd9d4b](https://github.com/ritz078/embed.js/commit/5cd9d4b))


### Performance Improvements

* embed exclusion array added ([56d8432](https://github.com/ritz078/embed.js/commit/56d8432))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/ritz078/embed.js/compare/v2.0.1...v2.0.2) (2015-03-27)



<a name="2.0.1"></a>
## [2.0.1](https://github.com/ritz078/embed.js/compare/v2.0.0-rc.1...v2.0.1) (2015-03-23)



<a name="2.0.0-rc.1"></a>
# [2.0.0-rc.1](https://github.com/ritz078/embed.js/compare/v2.0.0...v2.0.0-rc.1) (2015-03-23)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ritz078/embed.js/compare/v1.0.0...v2.0.0) (2015-03-23)


### Features

* liveleak support added [#7](https://github.com/ritz078/embed.js/issues/7) ([7986722](https://github.com/ritz078/embed.js/commit/7986722))
* spotify support added ([14de673](https://github.com/ritz078/embed.js/commit/14de673))
* TED support added [#7](https://github.com/ritz078/embed.js/issues/7) ([4228ec0](https://github.com/ritz078/embed.js/commit/4228ec0))
* vine support added [#7](https://github.com/ritz078/embed.js/issues/7) ([e7aa9c1](https://github.com/ritz078/embed.js/commit/e7aa9c1))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/ritz078/embed.js/compare/4a6c756...v1.0.0) (2015-03-19)


### Features

* image embed feature added ([4a6c756](https://github.com/ritz078/embed.js/commit/4a6c756))



