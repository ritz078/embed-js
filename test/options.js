export let options = {
	marked                 : false,
	markedOptions          : {},
	link                   : true,
	linkOptions            : {
		target : 'self',
		exclude: ['pdf'],
		rel    : ''
	},
	emoji                  : true,
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
	openGraphEndpoint      : null,
	openGraphExclude       : [],
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
	beforeEmbedJSApply     : function () {
	},
	afterEmbedJSApply      : function () {
	},
	onVideoShow            : function () {
	},
	onTweetsLoad           : function () {
	},
	videojsCallback        : function () {
	},
	onOpenGraphFetch       : function () {
	},
	onOpenGraphFail        : function () {
	},
	videoClickHandler      : function () {
	},
	served                 : []   //Private variable used to store processed urls so that they are not processed multiple times.
};

export let ejs = {
	template: {
		url() {
		},
		smiley() {
		},
		emoji() {
		},
		basicAudio() {
		},
		soundCloud() {
		},
		spotify() {
		},
		codePen() {
		},
		ideone() {
		},
		jsBin() {
		},
		jsFiddle() {
		},
		plunker() {
		},
		basicImage() {
		},
		flickr() {
		},
		instagram() {
		},
		basicVideo() {
		},
		dailymotion() {
		},
		liveLeak() {
		},
		ted() {
		},
		ustream() {
		},
		detailsVimeo() {
		},
		detailsYoutube() {
		},
		vine() {
		},
		vimeo(){
		},
		youtube(){
		},
		openGraph(){
		},
		Github(){
		},
		slideShare(){
		}
	}
};
