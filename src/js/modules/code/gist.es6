let Base = require('../base.es6');

class Gist extends Base {
    constructor(input, options, embeds) {
        super(input, options, embeds);
        this.regex = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/g;

        this.options.element.addEventListener('rendered', () => {
            this.load()
        })
    }

    template(match) {
        let template =
            `<div class="ejs-gist" data-src="${match}"></div>`
        return template;
    }

    load() {
        let gists = this.options.element.getElementsByClassName('ejs-gist');
        for (var i = 0; i < gists.length; i++) {
            var gistFrame = document.createElement("iframe");
            gistFrame.setAttribute("width", "100%");
            gistFrame.id = `ejs-gist-${i}`;

            var zone = gists[i];
            zone.innerHTML = "";
            zone.appendChild(gistFrame);

            // Create the iframe's document
            var gistFrameHTML =
            `<html><base target="_parent"/><body onload="parent.document.getElementById('ejs-gist-${i}').style.height=parseInt(document.body.scrollHeight)+20+'px'"><script type="text/javascript" src="https://${gists[i].getAttribute('data-src')}.js"></script></body></html>`;

            // Set iframe's document with a trigger for this document to adjust the height
            var gistFrameDoc = gistFrame.document;

            if (gistFrame.contentDocument) {
                gistFrameDoc = gistFrame.contentDocument;
            } else if (gistFrame.contentWindow) {
                gistFrameDoc = gistFrame.contentWindow.document;
            }

            gistFrameDoc.open();
            gistFrameDoc.writeln(gistFrameHTML);
            gistFrameDoc.close();
        }
    }
}

module.exports = Gist;
