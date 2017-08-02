import pluck from "just-pluck-it"
import flatten from "just-flatten-it"

const regexes = [
	{
		patterns: ["https?://soundcloud.com/.*/.[^\\s]*"],
		name: "SoundCloud"
	},
	{
		patterns: [
			"https?://(?:www|mobile\\.)?twitter\\.com/(?:#!/)?([^/]+)/status(?:es)?/(\\d+)"
		],
		name: "Twitter"
	},
	{
		name: "Urban Dictionary",
		patterns: ["http://www\\.urbandictionary\\.com/define\\.php\\?term=.[^\\s]+"]
	},
	{
		name: "iTunes Movie Trailers",
		patterns: ["http://trailers\\.apple\\.com/trailers/[^/]+/[^/]+"]
	},
	{
		name: "The Verge",
		patterns: [
			"http://(?:www\\.)?theverge\\.com/\\d{4}/\\d{1,2}/\\d{1,2}/\\d+/[^/]+/?$"
		]
	},
	{
		patterns: ["http://www.traileraddict.com/trailer/[^/]+/trailer"],
		name: "TrailerAddict"
	},
	{
		name: "Wired",
		patterns: ["https?://(?:www\\.)?wired\\.com/([^/]+/)?\\d+/\\d+/[^/]+/?$"]
	},
	{
		name: "instagram",
		patterns: [
			"https?://instagram\\.com/p/.[^\\s]*",
			"https?://instagr\\.am/p/.[^\\s]*"
		]
	},
	{
		name: "slideshare",
		patterns: [
			"https?://www\\.slideshare\\.net/.*/.[^\\s]*",
			"https?://fr\\.slideshare\\.net/.*/.[^\\s]*",
			"https?://de\\.slideshare\\.net/.*/.[^\\s]*",
			"https?://es\\.slideshare\\.net/.*/.[^\\s]*",
			"https?://pt\\.slideshare\\.net/.*/.[^\\s]*"
		]
	},
	{
		name: "vimeo",
		patterns: [
			"https?://vimeo\\.com/.[^\\s]*",
			"https?://vimeo\\.com/album/.*/video/.[^\\s]*",
			"https?://vimeo\\.com/channels/.*/.[^\\s]*",
			"https?://vimeo\\.com/groups/.*/videos/.[^\\s]*",
			"https?://vimeo\\.com/ondemand/.*/.[^\\s]*"
		]
	},
	{
		patterns: [
			"https?://photos\\.app\\.net/.*/.[^\\s]*",
			"https?://live\\.amcharts\\.com/.[^\\s]*",
			"https?://codepen\\.io/.[^\\s]*",
			"https?://codepen\\.io/.[^\\s]*",
			"https?://www\\.collegehumor\\.com/video/.[^\\s]*",
			"https?://www\\.dailymotion\\.com/video/.[^\\s]*",
			"https?://.*\\.deviantart\\.com/art/.[^\\s]*",
			"https?://.*\\.deviantart\\.com/.*#/d.[^\\s]*",
			"https?://dotsub\\.com/view/.[^\\s]*",
			"https?://edocr\\.com/docs/.[^\\s]*",
			"https?://www\\.facebook\\.com/.*/videos/.[^\\s]*",
			"https?://www\\.facebook\\.com/video\\.php",
			"https?://.*\\.flickr\\.com/photos/.[^\\s]*",
			"https?://flic\\.kr/p/.[^\\s]*",
			"https?://.*\\.wikimedia\\.org/.*_geograph\\.org\\.uk_.[^\\s]*",
			"https?://gfycat\\.com/.[^\\s]*",
			"https?://www\\.gfycat\\.com/.[^\\s]*",
			"https?://gfycat\\.com/.[^\\s]*",
			"https?://www\\.gfycat\\.com/.[^\\s]*",
			"https?://giphy\\.com/gifs/.[^\\s]*",
			"https?://media\\.giphy\\.com/media/.*/giphy\\.gif",
			"https?://www\\.hulu\\.com/watch/.[^\\s]*",
			"https?://www\\.kickstarter\\.com/projects/.[^\\s]*",
			"https?://www\\.mixcloud\\.com/.*/.*/",
			"https?://reddit\\.com/r/.*/comments/.*/.[^\\s]*",
			"https?://.*\\.screen9\\.tv/.[^\\s]*",
			"https?://www\\.scribd\\.com/doc/.[^\\s]*",
			"https?://.*\\.smugmug\\.com/.[^\\s]*",
			"https?://soundcloud\\.com/.[^\\s]*",
			"https?://play\\.soundsgood\\.co/playlist/.[^\\s]*",
			"https?://speakerdeck\\.com/.*/.[^\\s]*",
			"https?://speakerdeck\\.com/.*/.[^\\s]*",
			"https?://ted\\.com/talks/.[^\\s]*",
			"https?://www\\.nytimes\\.com/svc/oembed",
			"https?://nytimes\\.com/.[^\\s]*",
			"https?://.*\\.nytimes\\.com/.[^\\s]*",
			"https?://clips\\.twitch\\.tv/.[^\\s]*",
			"https?://clips\\.twitch\\.tv/.[^\\s]*",
			"https?://www\\.twitch\\.tv/.[^\\s]*",
			"https?://www\\.twitch\\.tv/.[^\\s]*",
			"https?://twitch\\.tv/.[^\\s]*",
			"https?://twitch\\.tv/.[^\\s]*",
			"https?://.*\\.ustream\\.tv/.[^\\s]*",
			"https?://.*\\.ustream\\.com/.[^\\s]*",
			"https?://veervr\\.tv/videos/.[^\\s]*",
			"https?://www\\.vevo\\.com/.[^\\s]*",
			"https?://www\\.vevo\\.com/.[^\\s]*",
			"https?://player\\.vimeo\\.com/video/.[^\\s]*",
			"https?://vine\\.co/v/.[^\\s]*",
			"https?://vine\\.co/v/.[^\\s]*",
		],
		name: "oEmbed"
	},
	{
		name: "Imgur",
		patterns: ["https?://imgur\\.com/(?:[^\\/]+/)?[0-9a-zA-Z]+$"]
	},
	{
		patterns: [
			"https?://www\\.(dropbox\\.com/s/.+\\.(?:jpg|png|gif))",
			"https?://db\\.tt/[a-zA-Z0-9][^\\s]+"
		],
		name: "Dropbox"
	},
	{
		patterns: [
			"http://www\\.amazon\\.com/(?:.+/)?[gd]p/(?:product/)?(?:tags-on-product/)?([a-zA-Z0-9]+)",
			"http://amzn\\.com/([^/]+)"
		],
		name: "Amazon"
	},
	{
		patterns: [
			"https?:\\/\\/(?:[^\\.]+\\.)?youtube\\.com\\/watch\\/?\\?(?:.+&)?v=([^&][^\\s]+)",
			"https?://(?:[^\\.]+\\.)?(?:youtu\\.be|youtube\\.com/embed)/([a-zA-Z0-9_-][^\\s]+)"
		],
		name: "YouTube"
	}
]

export default function getRegexes(excludeServices = []) {
	const includedRegexes = regexes.filter(
		r => excludeServices.indexOf(r.name.toLowerCase()) === -1
	)
	const patterns = flatten(pluck(includedRegexes, "patterns"))
	return new RegExp(patterns.join("|"), "gi")
}
