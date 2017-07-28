import pluck from 'just-pluck-it'
import flatten from 'just-flatten-it'

const regexes = [
	{
		patterns: ['http://www\\.clickhole\\.com/[^/]+/[^/][^\\s]+'],
		name: 'Clickhole'
	},
	{
		name: 'Boing Boing',
		patterns: ['http://boingboing\\.net/\\d{4}/\\d{2}/\\d{2}/[^/]+\\.html']
	},
	{patterns: ['https?://path\\.com/p/([0-9a-zA-Z]+)$'], name: 'Path'},
	{
		patterns: ['https?://soundcloud.com/.*/.[^\\s]*'],
		name: 'SoundCloud'
	},
	{
		patterns: [
			'https?://(?:www|mobile\\.)?twitter\\.com/(?:#!/)?([^/]+)/status(?:es)?/(\\d+)'
		],
		name: 'Twitter'
	},
	{
		name: 'Urban Dictionary',
		patterns: ['http://www\\.urbandictionary\\.com/define\\.php\\?term=.[^\\s]+']
	},
	{name: 'Vimeo', patterns: ['https?://(?:www\\.)?vimeo\\.com/.[^\\s]+']},
	{
		name: 'iTunes Movie Trailers',
		patterns: ['http://trailers\\.apple\\.com/trailers/[^/]+/[^/]+']
	},
	{
		name: 'ASCII Art Farts',
		patterns: ['http://www\\.asciiartfarts\\.com/[0-9]+\\.html']
	},
	{
		patterns: [
			'http://www\\.monoprice\\.com/products/product\\.asp\\?.*p_id=\\d+'
		],
		name: 'Monoprice'
	},
	{
		name: 'The Verge',
		patterns: [
			'http://(?:www\\.)?theverge\\.com/\\d{4}/\\d{1,2}/\\d{1,2}/\\d+/[^/]+/?$'
		]
	},
	{
		patterns: ['http://www.traileraddict.com/trailer/[^/]+/trailer'],
		name: 'TrailerAddict'
	},
	{
		name: 'The Duffel Blog',
		patterns: ['http://www\\.duffelblog\\.com/\\d{4}/\\d{1,2}/[^/]+/?$']
	},
	{
		name: 'Wired',
		patterns: ['https?://(?:www\\.)?wired\\.com/([^/]+/)?\\d+/\\d+/[^/]+/?$']
	},
	{
		name: 'Qik',
		patterns: ['http://qik\\.com/video/.[^\\s]*']
	},
	{patterns: ['http://(?:www\\.)?xkcd\\.com/\\d+/?'], name: 'XKCD'},
	{
		name: 'Skitch',
		patterns: [
			'https?://(?:www.)?skitch.com/([^/]+)/[^/]+/.[^\\s]+',
			'http://skit.ch/[^/][^\\s]+'
		]
	},
	{
		name: 'Lockerz',
		patterns: ['http://lockerz\\.com/[sd]/\\d+']
	},
	{patterns: ['http://gfycat\\.com/([a-zA-Z][^\\s]+)'], name: 'Gfycat'},
	{
		name: 'Picplz',
		patterns: ['http://picplz\\.com/user/[^/]+/pic/[^/][^\\s]+']
	},
	{patterns: ['http://(?:www\\.)?twitpic\\.com/([^/]+)'], name: 'Twitpic'},
	{
		name: 'Twitlonger',
		patterns: [
			'http://www\\.twitlonger\\.com/show/[a-zA-Z0-9][^\\s]+',
			'http://tl\\.gd/[^/][^\\s]+'
		]
	},
	{
		name: 'Ars Technica',
		patterns: ['http://arstechnica\\.com/[^/]+/\\d+/\\d+/[^/]+/?$']
	}, {
		name: 'instagram',
		patterns: [
			'https?://instagram\\.com/p/.[^\\s]*',
			'https?://instagr\\.am/p/.[^\\s]*',
			'https?://instagram\\.com/p/.[^\\s]*',
			'https?://instagr\\.am/p/.[^\\s]*'
		]
	}, {
		name: 'slideshare',
		patterns: [
			'https?://www\\.slideshare\\.net/.*/.[^\\s]*',
			'https?://fr\\.slideshare\\.net/.*/.[^\\s]*',
			'https?://de\\.slideshare\\.net/.*/.[^\\s]*',
			'https?://es\\.slideshare\\.net/.*/.[^\\s]*',
			'https?://pt\\.slideshare\\.net/.*/.[^\\s]*'
		]
	}, {
		name: 'vimeo',
		patterns: [
			'https?://vimeo\\.com/.[^\\s]*',
			'https?://vimeo\\.com/album/.*/video/.[^\\s]*',
			'https?://vimeo\\.com/channels/.*/.[^\\s]*',
			'https?://vimeo\\.com/groups/.*/videos/.[^\\s]*',
			'https?://vimeo\\.com/ondemand/.*/.[^\\s]*'
		]
	},
	{
		patterns: [
			'https?://www\\.23hq\\.com/.*/photo/.[^\\s]*',
			'https?://alpha\\.app\\.net/.*/post/.[^\\s]*',
			'https?://photos\\.app\\.net/.*/.[^\\s]*',
			'https?://live\\.amcharts\\.com/.[^\\s]*',
			'https?://www\\.animatron\\.com/project/.[^\\s]*',
			'https?://animatron\\.com/project/.[^\\s]*',
			'https?://animoto\\.com/play/.[^\\s]*',
			'https?://audiosnaps\\.com/k/.[^\\s]*',
			'https?://blackfire\\.io/profiles/.*/graph',
			'https?://blackfire\\.io/profiles/compare/.*/graph',
			'https?://cacoo\\.com/diagrams/.[^\\s]*',
			'https?://img\\.catbo\\.at/.[^\\s]*',
			'https?://public\\.chartblocks\\.com/c/.[^\\s]*',
			'https?://chirb\\.it/.[^\\s]*',
			'https?://www\\.circuitlab\\.com/circuit/.[^\\s]*',
			'https?://www\\.clipland\\.com/v/.[^\\s]*',
			'https?://www\\.clipland\\.com/v/.[^\\s]*',
			'https?://clyp\\.it/.[^\\s]*',
			'https?://clyp\\.it/playlist/.[^\\s]*',
			'https?://codepen\\.io/.[^\\s]*',
			'https?://codepen\\.io/.[^\\s]*',
			'https?://codepoints\\.net/.[^\\s]*',
			'https?://codepoints\\.net/.[^\\s]*',
			'https?://www\\.codepoints\\.net/.[^\\s]*',
			'https?://www\\.codepoints\\.net/.[^\\s]*',
			'https?://www\\.collegehumor\\.com/video/.[^\\s]*',
			'https?://coub\\.com/view/.[^\\s]*',
			'https?://coub\\.com/embed/.[^\\s]*',
			'https?://crowdranking\\.com/.*/.[^\\s]*',
			'https?://www\\.dailymile\\.com/people/.*/entries/.[^\\s]*',
			'https?://www\\.dailymotion\\.com/video/.[^\\s]*',
			'https?://.*\\.deviantart\\.com/art/.[^\\s]*',
			'https?://.*\\.deviantart\\.com/.*#/d.[^\\s]*',
			'https?://fav\\.me/.[^\\s]*',
			'https?://sta\\.sh/.[^\\s]*',
			'https?://.*\\.didacte\\.com/a/course/.[^\\s]*',
			'https?://www\\.dipity\\.com/.*/.*/',
			'https?://docs\\.com/.[^\\s]*',
			'https?://www\\.docs\\.com/.[^\\s]*',
			'https?://dotsub\\.com/view/.[^\\s]*',
			'https?://edocr\\.com/docs/.[^\\s]*',
			'https?://egliseinfo\\.catholique\\.fr/.[^\\s]*',
			'https?://embedarticles\\.com/.[^\\s]*',
			'https?://eyrie\\.io/board/.[^\\s]*',
			'https?://eyrie\\.io/sparkfun/.[^\\s]*',
			'https?://www\\.facebook\\.com/.*/videos/.[^\\s]*',
			'https?://www\\.facebook\\.com/video\\.php',
			'https?://flat\\.io/score/.[^\\s]*',
			'https?://.*\\.flat\\.io/score/.[^\\s]*',
			'https?://.*\\.flickr\\.com/photos/.[^\\s]*',
			'https?://flic\\.kr/p/.[^\\s]*',
			'https?://fiso\\.foxsports\\.com\\.au/isomorphic-widget/.[^\\s]*',
			'https?://fiso\\.foxsports\\.com\\.au/isomorphic-widget/.[^\\s]*',
			'https?://framebuzz\\.com/v/.[^\\s]*',
			'https?://framebuzz\\.com/v/.[^\\s]*',
			'https?://www\\.funnyordie\\.com/videos/.[^\\s]*',
			'https?://.*\\.geograph\\.org\\.uk/.[^\\s]*',
			'https?://.*\\.geograph\\.co\\.uk/.[^\\s]*',
			'https?://.*\\.geograph\\.ie/.[^\\s]*',
			'https?://.*\\.wikimedia\\.org/.*_geograph\\.org\\.uk_.[^\\s]*',
			'https?://.*\\.geograph\\.org\\.gg/.[^\\s]*',
			'https?://.*\\.geograph\\.org\\.je/.[^\\s]*',
			'https?://channel-islands\\.geograph\\.org/.[^\\s]*',
			'https?://channel-islands\\.geographs\\.org/.[^\\s]*',
			'https?://.*\\.channel\\.geographs\\.org/.[^\\s]*',
			'https?://geo-en\\.hlipp\\.de/.[^\\s]*',
			'https?://geo\\.hlipp\\.de/.[^\\s]*',
			'https?://germany\\.geograph\\.org/.[^\\s]*',
			'https?://gty\\.im/.[^\\s]*',
			'https?://gfycat\\.com/.[^\\s]*',
			'https?://www\\.gfycat\\.com/.[^\\s]*',
			'https?://gfycat\\.com/.[^\\s]*',
			'https?://www\\.gfycat\\.com/.[^\\s]*',
			'https?://giphy\\.com/gifs/.[^\\s]*',
			'https?://gph\\.is/.[^\\s]*',
			'https?://media\\.giphy\\.com/media/.*/giphy\\.gif',
			'https?://gyazo\\.com/.[^\\s]*',
			'https?://huffduffer\\.com/.*/.[^\\s]*',
			'https?://www\\.hulu\\.com/watch/.[^\\s]*',
			'https?://www\\.ifixit\\.com/Guide/View/.[^\\s]*',
			'https?://ifttt\\.com/recipes/.[^\\s]*',
			'https?://player\\.indacolive\\.com/player/jwp/clients/.[^\\s]*',
			'https?://infogr\\.am/.[^\\s]*',
			'https?://www\\.inoreader\\.com/oembed/',
			'https?://.*\\.inphood\\.com/.[^\\s]*',
			'https?://www\\.isnare\\.com/.[^\\s]*',
			'https?://www\\.kickstarter\\.com/projects/.[^\\s]*',
			'https?://www\\.kidoju\\.com/en/x/.*/.[^\\s]*',
			'https?://www\\.kidoju\\.com/fr/x/.*/.[^\\s]*',
			'https?://kit\\.com/.*/.[^\\s]*',
			'https?://kit\\.com/.*/.[^\\s]*',
			'https?://www\\.kitchenbowl\\.com/recipe/.[^\\s]*',
			'https?://jdr\\.knacki\\.info/meuh/.[^\\s]*',
			'https?://jdr\\.knacki\\.info/meuh/.[^\\s]*',
			'https?://learningapps\\.org/.[^\\s]*',
			'https?://mathembed\\.com/latex\\?inputText=.[^\\s]*',
			'https?://mathembed\\.com/latex\\?inputText=.[^\\s]*',
			'https?://me\\.me/i/.[^\\s]*',
			'https?://meetup\\.com/.[^\\s]*',
			'https?://meetu\\.ps/.[^\\s]*',
			'https?://www\\.mixcloud\\.com/.*/.*/',
			'https?://www\\.mobypicture\\.com/user/.*/view/.[^\\s]*',
			'https?://moby\\.to/.[^\\s]*',
			'https?://beta\\.modelo\\.io/embedded/.[^\\s]*',
			'https?://mybeweeg\\.com/w/.[^\\s]*',
			'https?://.*\\.nanoo\\.tv/link/.[^\\s]*',
			'https?://nanoo\\.tv/link/.[^\\s]*',
			'https?://.*\\.nanoo\\.pro/link/.[^\\s]*',
			'https?://nanoo\\.pro/link/.[^\\s]*',
			'https?://.*\\.nanoo\\.tv/link/.[^\\s]*',
			'https?://nanoo\\.tv/link/.[^\\s]*',
			'https?://.*\\.nanoo\\.pro/link/.[^\\s]*',
			'https?://nanoo\\.pro/link/.[^\\s]*',
			'https?://.*\\.nfb\\.ca/film/.[^\\s]*',
			'https?://www\\.odds\\.com\\.au/.[^\\s]*',
			'https?://odds\\.com\\.au/.[^\\s]*',
			'https?://mix\\.office\\.com/watch/.[^\\s]*',
			'https?://mix\\.office\\.com/embed/.[^\\s]*',
			'https?://official\\.fm/tracks/.[^\\s]*',
			'https?://official\\.fm/playlists/.[^\\s]*',
			'https?://on\\.aol\\.com/video/.[^\\s]*',
			'https?://orbitvu\\.co/001/.*/ov3601/view',
			'https?://orbitvu\\.co/001/.*/ov3601/.*/view',
			'https?://orbitvu\\.co/001/.*/ov3602/.*/view',
			'https?://orbitvu\\.co/001/.*/2/orbittour/.*/view',
			'https?://orbitvu\\.co/001/.*/1/2/orbittour/.*/view',
			'https?://orbitvu\\.co/001/.*/ov3601/view',
			'https?://orbitvu\\.co/001/.*/ov3601/.*/view',
			'https?://orbitvu\\.co/001/.*/ov3602/.*/view',
			'https?://orbitvu\\.co/001/.*/2/orbittour/.*/view',
			'https?://orbitvu\\.co/001/.*/1/2/orbittour/.*/view',
			'https?://www\\.oumy\\.com/v/.[^\\s]*',
			'https?://pastery\\.net/.[^\\s]*',
			'https?://pastery\\.net/.[^\\s]*',
			'https?://www\\.pastery\\.net/.[^\\s]*',
			'https?://www\\.pastery\\.net/.[^\\s]*',
			'https?://store\\.pixdor\\.com/place-marker-widget/.*/show',
			'https?://store\\.pixdor\\.com/map/.*/show',
			'https?://.*\\.polldaddy\\.com/s/.[^\\s]*',
			'https?://.*\\.polldaddy\\.com/poll/.[^\\s]*',
			'https?://.*\\.polldaddy\\.com/ratings/.[^\\s]*',
			'https?://app\\.sellwithport\\.com/#/buyer/.[^\\s]*',
			'https?://portfolium\\.com/entry/.[^\\s]*',
			'https?://www\\.punters\\.com\\.au/.[^\\s]*',
			'https?://punters\\.com\\.au/.[^\\s]*',
			'https?://www\\.quiz\\.biz/quizz-.*\\.html',
			'https?://www\\.quizz\\.biz/quizz-.*\\.html',
			'https?://rapidengage\\.com/s/.[^\\s]*',
			'https?://reddit\\.com/r/.*/comments/.*/.[^\\s]*',
			'https?://rwire\\.com/.[^\\s]*',
			'https?://repubhub\\.icopyright\\.net/freePost\\.act\\?.[^\\s]*',
			'https?://www\\.reverbnation\\.com/.[^\\s]*',
			'https?://www\\.reverbnation\\.com/.*/songs/.[^\\s]*',
			'https?://roomshare\\.jp/post/.[^\\s]*',
			'https?://roomshare\\.jp/en/post/.[^\\s]*',
			'https?://videos\\.sapo\\.pt/.[^\\s]*',
			'https?://console\\.screen9\\.com/.[^\\s]*',
			'https?://.*\\.screen9\\.tv/.[^\\s]*',
			'https?://www\\.screenr\\.com/.*/',
			'https?://www\\.scribblemaps\\.com/maps/view/.[^\\s]*',
			'https?://www\\.scribblemaps\\.com/maps/view/.[^\\s]*',
			'https?://scribblemaps\\.com/maps/view/.[^\\s]*',
			'https?://scribblemaps\\.com/maps/view/.[^\\s]*',
			'https?://www\\.scribd\\.com/doc/.[^\\s]*',
			'https?://www\\.shortnote\\.jp/view/notes/.[^\\s]*',
			'https?://shoudio\\.com/.[^\\s]*',
			'https?://shoud\\.io/.[^\\s]*',
			'https?://showtheway\\.io/to/.[^\\s]*',
			'https?://.*\\.silk\\.co/explore/.[^\\s]*',
			'https?://.*\\.silk\\.co/explore/.[^\\s]*',
			'https?://.*\\.silk\\.co/s/embed/.[^\\s]*',
			'https?://.*\\.silk\\.co/s/embed/.[^\\s]*',
			'https?://onsizzle\\.com/i/.[^\\s]*',
			'https?://sketchfab\\.com/models/.[^\\s]*',
			'https?://sketchfab\\.com/models/.[^\\s]*',
			'https?://sketchfab\\.com/.*/folders/.[^\\s]*',
			'https?://.*\\.smugmug\\.com/.[^\\s]*',
			'https?://soundcloud\\.com/.[^\\s]*',
			'https?://play\\.soundsgood\\.co/playlist/.[^\\s]*',
			'https?://soundsgood\\.co/playlist/.[^\\s]*',
			'https?://speakerdeck\\.com/.*/.[^\\s]*',
			'https?://speakerdeck\\.com/.*/.[^\\s]*',
			'https?://.*\\.spreaker\\.com/.[^\\s]*',
			'https?://.*\\.spreaker\\.com/.[^\\s]*',
			'https?://streamable\\.com/.[^\\s]*',
			'https?://streamable\\.com/.[^\\s]*',
			'https?://content\\.streamonecloud\\.net/embed/.[^\\s]*',
			'https?://sway\\.com/.[^\\s]*',
			'https?://www\\.sway\\.com/.[^\\s]*',
			'https?://ted\\.com/talks/.[^\\s]*',
			'https?://www\\.nytimes\\.com/svc/oembed',
			'https?://nytimes\\.com/.[^\\s]*',
			'https?://.*\\.nytimes\\.com/.[^\\s]*',
			'https?://theysaidso\\.com/image/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/countdown/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/countup/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/ticker/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/worldclock/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/countdown/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/countup/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/ticker/.[^\\s]*',
			'https?://www\\.tickcounter\\.com/worldclock/.[^\\s]*',
			'https?://www\\.topy\\.se/image/.[^\\s]*',
			'https?://clips\\.twitch\\.tv/.[^\\s]*',
			'https?://clips\\.twitch\\.tv/.[^\\s]*',
			'https?://www\\.twitch\\.tv/.[^\\s]*',
			'https?://www\\.twitch\\.tv/.[^\\s]*',
			'https?://twitch\\.tv/.[^\\s]*',
			'https?://twitch\\.tv/.[^\\s]*',
			'https?://player\\.ubideo\\.com/.[^\\s]*',
			'https?://.*\\.uol\\.com\\.br/view/.[^\\s]*',
			'https?://.*\\.uol\\.com\\.br/video/.[^\\s]*',
			'https?://.*\\.ustream\\.tv/.[^\\s]*',
			'https?://.*\\.ustream\\.com/.[^\\s]*',
			'https?://uttles\\.com/uttle/.[^\\s]*',
			'https?://veer\\.tv/videos/.[^\\s]*',
			'https?://veervr\\.tv/videos/.[^\\s]*',
			'https?://www\\.vevo\\.com/.[^\\s]*',
			'https?://www\\.vevo\\.com/.[^\\s]*',
			'https?://www\\.videojug\\.com/film/.[^\\s]*',
			'https?://www\\.videojug\\.com/interview/.[^\\s]*',
			'https?://vidl\\.it/.[^\\s]*',
			'https?://player\\.vimeo\\.com/video/.[^\\s]*',
			'https?://vine\\.co/v/.[^\\s]*',
			'https?://vine\\.co/v/.[^\\s]*',
			'https?://vlipsy\\.com/.[^\\s]*',
			'https?://.*\\.wiredrive\\.com/.[^\\s]*',
			'https?://.*\\.wizer\\.me/learn/.[^\\s]*',
			'https?://.*\\.wizer\\.me/learn/.[^\\s]*',
			'https?://.*\\.wizer\\.me/preview/.[^\\s]*',
			'https?://.*\\.wizer\\.me/preview/.[^\\s]*',
			'https?://.*\\.yfrog\\.com/.[^\\s]*',
			'https?://yfrog\\.us/.[^\\s]*'
		],
		name: 'oEmbed'
	},
	{name: 'Vine', patterns: ['https?://vine.co/v/[a-zA-Z0-9][^\\s]+']},
	{
		name: 'Imgur',
		patterns: ['https?://imgur\\.com/(?:[^\\/]+/)?[0-9a-zA-Z]+$']
	},
	{
		patterns: [
			'https?://www\\.(dropbox\\.com/s/.+\\.(?:jpg|png|gif))',
			'https?://db\\.tt/[a-zA-Z0-9][^\\s]+'
		],
		name: 'Dropbox'
	},
	{
		name: 'SWITCHTube',
		patterns: ['https://tube.switch.ch/videos/([a-z0-9]+)']
	},
	{
		patterns: [
			'http://www\\.amazon\\.com/(?:.+/)?[gd]p/(?:product/)?(?:tags-on-product/)?([a-zA-Z0-9]+)',
			'http://amzn\\.com/([^/]+)'
		],
		name: 'Amazon'
	},
	{patterns: ['http://bash\\.org/\\?(\\d+)'], name: 'Bash.org'},
	{
		patterns: [
			'https?://www\\.globalgiving\\.org/((micro)?projects|funds)/.[^\\s]*'
		],
		name: 'GlobalGiving'
	},
	{
		patterns: [
			'https?:\\/\\/(?:[^\\.]+\\.)?youtube\\.com\\/watch\\/?\\?(?:.+&)?v=([^&][^\\s]+)',
			'https?://(?:[^\\.]+\\.)?(?:youtu\\.be|youtube\\.com/embed)/([a-zA-Z0-9_-][^\\s]+)'
		],
		name: 'YouTube'
	}
]

export default function getRegexes (excludeServices = []) {
	const includedRegexes = regexes.filter(
		r => excludeServices.indexOf(r.name.toLowerCase()) === -1
	)
	const patterns = flatten(pluck(includedRegexes, 'patterns'))
	return new RegExp(patterns.join('|'), 'gi')
}
