import extend from "just-extend";
import pWaterfall from "p-waterfall";

class EmbedJS {
  constructor(options) {
    const defaultOptions = {
      plugins: []
    };

    this.options = extend({}, defaultOptions, options);
  }

  process() {
    const { plugins } = this.options;
    return pWaterfall(plugins, this.options);
  }

  text(cb) {}

  render() {}
}

export default EmbedJS;
