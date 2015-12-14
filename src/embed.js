/*
 *  embed-js - v3.3.2
 *  A JavaScript plugin that analyses the string and embeds emojis, media, tweets, code and services.
 *  http://riteshkr.com/embed.js
 *
 *  Made by Ritesh Kumar
 *  Under MIT License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        step("next");
      });
    };
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers;
  var utils = {

      /**
       * Trucates the string and adds ellipsis at the end.
       * @param string        The string to be truncated
       * @param n             Length to which it should be truncated
       * @returns {string}    The truncated string
       */

      truncate: function truncate(string, n) {
          return string.substr(0, n - 1) + (string.length > n ? '...' : '');
      },

      /**
       * Returns an array after removing the duplicates.
       * @param array         The array containing the duplicates
       * @returns {Array}     Array with unique values.
       */
      getUnique: function getUnique(array) {
          var u = {},
              a = [];

          array.forEach(function (value) {
              if (!u.hasOwnProperty(value)) {
                  a.push(value);
                  u[value] = 1;
              }
          });
          return a;
      },

      /**
       * Converts a string into legitimate url.
       * @param string
       */
      toUrl: function toUrl(string) {
          return string.indexOf('//') === -1 ? '//' + string : string;
      },

      /**
       * Extends an Object
       * @param destination
       * @param source
       * @returns {*}
       */
      deepExtend: function deepExtend(destination, source) {
          for (var property in source) {
              if (source[property] && source[property].constructor === Object) {
                  destination[property] = destination[property] || {};
                  this.deepExtend(destination[property], source[property]);
              } else {
                  destination[property] = source[property];
              }
          }
          return destination;
      },
      escapeRegExp: function escapeRegExp(str) {
          return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      },

      /**
       * Sort an array of objects based on the index value
       * @param  {Array} arr Array to be sorted
       * @return {Array}     Sorted array
       */
      sortObject: function sortObject(arr) {
          return arr.sort(function (a, b) {
              return a.index - b.index;
          });
      },

      /**
       * Creates the string of the iframes after sorting them and finally returning a string
       * @param  {sring} str    String to which the created text has to be added
       * @param  {object} embeds Sorted array of iframe html
       * @return {string}        String to be rendered
       */
      createText: function createText(str, embeds) {
          var sortedEmbeds = this.sortObject(embeds);
          for (var i = 0; i < sortedEmbeds.length; i++) {
              str += ' ' + sortedEmbeds[i].text;
          }
          return str;
      },

      /**
       * Matches the string and finds the substrings matching to the provided regex pattern
       * @param  {object} regex Regex pattern
       * @param  {string} input The string to be analyzed
       * @return {object}       Returns the matched substring with their corresponding positions
       */
      matches: function matches(regex, input) {
          return regex.exec(input);
      },

      /**
       * Checks wheteher a particular service should be embedded or not based on
       * the setting provided by the user
       * @param  {object} options The options provided by the user
       * @param  {string} service Name of the service for which the condition is to be analyzed
       * @return {boolean}        True if it should be embedded
       */
      ifEmbed: function ifEmbed(options, service) {
          return options.excludeEmbed.indexOf(service) == -1 && options.excludeEmbed !== 'all';
      },
      ifInline: function ifInline(options, service) {
          return options.inlineEmbed.indexOf(service) == -1 && options.inlineEmbed !== 'all';
      },

      /**
       * Calculates the dimensions for the elements based on a aspect ratio
       * @param  {object} options Plugin options
       * @return {object}         The width and height of the elements
       */
      dimensions: function dimensions(options) {
          var dimensions = {
              width: options.videoWidth,
              height: options.videoHeight
          };
          if (options.videoHeight && options.videoWidth) {
              return dimensions;
          } else if (options.videoHeight) {
              dimensions.width = options.videoHeight / 3 * 4;
              return dimensions;
          } else if (options.videoWidth) {
              dimensions.height = dimensions.width / 4 * 3;
              return dimensions;
          } else {
              var _ref = [800, 600];
              dimensions.width = _ref[0];
              dimensions.height = _ref[1];

              return dimensions;
          }
      },

      /**
       * Returns a cloned object
       * @param  {object} obj
       * @return {object}     cloned object
       */
      cloneObject: function cloneObject(obj) {
          if (obj === null || (typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) !== 'object') return obj;
          var temp = obj.constructor(); // give temp the original obj's constructor
          for (var key in obj) {
              temp[key] = this.cloneObject(obj[key]);
          }
          return temp;
      }
  };

  var helper = {
  	/**
    * Plays the video after clicking on the thumbnail
    * @param  {string} className The class name on which click is to be listened
    * @param  {object} options   Options object
    * @return {null}
    */

  	play: function play(className, options) {
  		var _this = this;

  		var classes = document.getElementsByClassName(className);

  		var _loop = function _loop(i) {
  			classes[i].onclick = function () {
  				options.onVideoShow();
  				var url = classes[i].getAttribute('data-ejs-url') + "?autoplay=true";
  				classes[i].parentNode.parentNode.innerHTML = _this.template(url, options);
  			};
  		};

  		for (var i = 0; i < classes.length; i++) {
  			_loop(i);
  		}
  	},

  	/**
    * Common template for vimeo and youtube iframes
    * @param  {string} url     URL of the embedding video
    * @param  {object} options Options object
    * @return {string}         compiled template with variables replaced
    */
  	template: function template(url, options) {
  		var dimensions = utils.dimensions(options);
  		return ejs.template.vimeo(url, dimensions, options) || ejs.template.youtube(url, dimensions, options) || '<div class="ejs-video-player ejs-embed">\n        <iframe src="' + url + '" frameBorder="0" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n        </div>';
  	},

  	/**
    * Template for showing vimeo and youtube video details
    * @param  {object} data     Object containing the variable values as key-value pair
    * @param  {string} embedUrl URL of the video
    * @return {string}          template with variables replaced
    */
  	detailsTemplate: function detailsTemplate(data, embedUrl) {
  		return '<div class="ejs-video ejs-embed">\n        <div class="ejs-video-preview">\n        <div class="ejs-video-thumb" data-ejs-url="' + embedUrl + '">\n        <div class="ejs-thumb" style="background-image:url(' + data.thumbnail + ')"></div>\n        <i class="fa fa-play-circle-o"></i>\n        </div>\n        <div class="ejs-video-detail">\n        <div class="ejs-video-title">\n        <a href="' + data.url + '">\n        ' + data.title + '\n        </a>\n        </div>\n        <div class="ejs-video-desc">\n        ' + data.description + '\n        </div>\n        <div class="ejs-video-stats">\n        <span>\n        <i class="fa fa-eye"></i>' + data.views + '\n        </span>\n        <span>\n        <i class="fa fa-heart"></i>' + data.likes + '\n        </span>\n        </div>\n        </div>\n        </div>\n        </div>';
  	},
  	getDetailsTemplate: function getDetailsTemplate(data, fullData, embedUrl) {
  		if (data.host === 'vimeo') {
  			return ejs.template.detailsVimeo(data, fullData, embedUrl) || this.detailsTemplate(data, embedUrl);
  		} else if (data.host === 'youtube') {
  			return ejs.template.detailsYoutube(data, fullData, embedUrl) || this.detailsTemplate(data, embedUrl);
  		}
  	},

  	/**
    * Applies video.js to all audio and video dynamically
    * @param  {object} options Options object
    * @return {null}
    */
  	applyVideoJS: function applyVideoJS(options) {
  		var dimensions = utils.dimensions(options);
  		options.videojsOptions.width = dimensions.width;
  		options.videojsOptions.height = dimensions.height;
  		if (options.videoJS) {
  			if (!window.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
  			var elements = options.element.getElementsByClassName('ejs-video-js');
  			for (var i = 0; i < elements.length; i++) {
  				videojs(elements[i], options.videojsOptions, function () {
  					return options.videojsCallback();
  				});
  			}
  		}
  	},

  	/**
    * Destroys the onclick event for opening the video template from the details template
    * @param  {className} className
    * @return {null}
    */
  	destroy: function destroy(className) {
  		var classes = document.getElementsByClassName(className);
  		for (var i = 0; i < classes.length; i++) {
  			classes[i].onclick = null;
  		}
  	}
  };

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined$1 = void 0; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var regeneratorRuntime$1 = {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = Object.create((outerFn || Generator).prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
  }
  regeneratorRuntime$1.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
      try {
          return {
              type: "normal",
              arg: fn.call(obj, arg)
          };
      } catch (err) {
          return {
              type: "throw",
              arg: err
          };
      }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
              return this._invoke(method, arg);
          };
      });
  }

  regeneratorRuntime$1.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  regeneratorRuntime$1.mark = function (genFun) {
      if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          if (!(toStringTagSymbol in genFun)) {
              genFun[toStringTagSymbol] = "GeneratorFunction";
          }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorregeneratorRuntime.awrap(x)`, so that the regeneratorRuntime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  regeneratorRuntime$1.awrap = function (arg) {
      return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
      this.arg = arg;
  }

  function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
              reject(record.arg);
          } else {
              var result = record.arg;
              var value = result.value;
              if (value instanceof AwaitArgument) {
                  return Promise.resolve(value.arg).then(function (value) {
                      invoke("next", value, resolve, reject);
                  }, function (err) {
                      invoke("throw", err, resolve, reject);
                  });
              }

              return Promise.resolve(value).then(function (unwrapped) {
                  // When a yielded Promise is resolved, its final value becomes
                  // the .value of the Promise<{value,done}> result for the
                  // current iteration. If the Promise is rejected, however, the
                  // result for this iteration will be rejected with the same
                  // reason. Note that rejections of yielded Promises are not
                  // thrown back into the generator function, as is the case
                  // when an awaited Promise is rejected. This difference in
                  // behavior between yield and await is important, because it
                  // allows the consumer to decide what to do with the yielded
                  // rejection (swallow it and continue, manually .throw it back
                  // into the generator, abandon iteration, whatever). With
                  // await, by contrast, there is no opportunity to examine the
                  // rejection reason outside the generator function, so the
                  // only option is to throw it from the await expression, and
                  // let the generator function handle the exception.
                  result.value = unwrapped;
                  resolve(result);
              }, reject);
          }
      }

      if ((typeof process === "undefined" ? "undefined" : babelHelpers.typeof(process)) === "object" && process.domain) {
          invoke = process.domain.bind(invoke);
      }

      var previousPromise;

      function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
              return new Promise(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
              });
          }

          return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  regeneratorRuntime$1.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

      return regeneratorRuntime$1.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
      });
  };

  function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
          if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
              if (method === "throw") {
                  throw arg;
              }

              // Be forgiving, per 25.3.3.3.3 of the spec:
              // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
              return doneResult();
          }

          while (true) {
              var delegate = context.delegate;
              if (delegate) {
                  if (method === "return" || method === "throw" && delegate.iterator[method] === undefined$1) {
                      // A return or throw (when the delegate iterator has no throw
                      // method) always terminates the yield* loop.
                      context.delegate = null;

                      // If the delegate iterator has a return method, give it a
                      // chance to clean up.
                      var returnMethod = delegate.iterator["return"];
                      if (returnMethod) {
                          var record = tryCatch(returnMethod, delegate.iterator, arg);
                          if (record.type === "throw") {
                              // If the return method threw an exception, let that
                              // exception prevail over the original return or throw.
                              method = "throw";
                              arg = record.arg;
                              continue;
                          }
                      }

                      if (method === "return") {
                          // Continue with the outer return, now that the delegate
                          // iterator has been terminated.
                          continue;
                      }
                  }

                  var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

                  if (record.type === "throw") {
                      context.delegate = null;

                      // Like returning generator.throw(uncaught), but without the
                      // overhead of an extra function call.
                      method = "throw";
                      arg = record.arg;
                      continue;
                  }

                  // Delegate generator ran and handled its own exceptions so
                  // regardless of what the method was, we continue as if it is
                  // "next" with an undefined arg.
                  method = "next";
                  arg = undefined$1;

                  var info = record.arg;
                  if (info.done) {
                      context[delegate.resultName] = info.value;
                      context.next = delegate.nextLoc;
                  } else {
                      state = GenStateSuspendedYield;
                      return info;
                  }

                  context.delegate = null;
              }

              if (method === "next") {
                  if (state === GenStateSuspendedYield) {
                      context.sent = arg;
                  } else {
                      context.sent = undefined$1;
                  }
              } else if (method === "throw") {
                  if (state === GenStateSuspendedStart) {
                      state = GenStateCompleted;
                      throw arg;
                  }

                  if (context.dispatchException(arg)) {
                      // If the dispatched exception was caught by a catch block,
                      // then let that catch block handle the exception normally.
                      method = "next";
                      arg = undefined$1;
                  }
              } else if (method === "return") {
                  context.abrupt("return", arg);
              }

              state = GenStateExecuting;

              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done ? GenStateCompleted : GenStateSuspendedYield;

                  var info = {
                      value: record.arg,
                      done: context.done
                  };

                  if (record.arg === ContinueSentinel) {
                      if (context.delegate && method === "next") {
                          // Deliberately forget the last sent value so that we don't
                          // accidentally pass it on to the delegate.
                          arg = undefined$1;
                      }
                  } else {
                      return info;
                  }
              } else if (record.type === "throw") {
                  state = GenStateCompleted;
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(arg) call above.
                  method = "throw";
                  arg = record.arg;
              }
          }
      };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
      return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function () {
      return "[object Generator]";
  };

  function pushTryEntry(locs) {
      var entry = {
          tryLoc: locs[0]
      };

      if (1 in locs) {
          entry.catchLoc = locs[1];
      }

      if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
  }

  function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
          tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
  }

  regeneratorRuntime$1.keys = function (object) {
      var keys = [];
      for (var key in object) {
          keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
          while (keys.length) {
              var key = keys.pop();
              if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
              }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
      };
  };

  function values(iterable) {
      if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
              return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
              return iterable;
          }

          if (!isNaN(iterable.length)) {
              var i = -1,
                  next = function next() {
                  while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                          next.value = iterable[i];
                          next.done = false;
                          return next;
                      }
                  }

                  next.value = undefined$1;
                  next.done = true;

                  return next;
              };

              return next.next = next;
          }
      }

      // Return an iterator with no values.
      return {
          next: doneResult
      };
  }
  regeneratorRuntime$1.values = values;

  function doneResult() {
      return {
          value: undefined$1,
          done: true
      };
  }

  Context.prototype = {
      constructor: Context,

      reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
              for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                      this[name] = undefined$1;
                  }
              }
          }
      },

      stop: function stop() {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
              throw rootRecord.arg;
          }

          return this.rval;
      },

      dispatchException: function dispatchException(exception) {
          if (this.done) {
              throw exception;
          }

          var context = this;

          function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;
              return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;

              if (entry.tryLoc === "root") {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle("end");
              }

              if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, "catchLoc");
                  var hasFinally = hasOwn.call(entry, "finallyLoc");

                  if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) {
                          return handle(entry.catchLoc, true);
                      } else if (this.prev < entry.finallyLoc) {
                          return handle(entry.finallyLoc);
                      }
                  } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) {
                          return handle(entry.catchLoc, true);
                      }
                  } else if (hasFinally) {
                      if (this.prev < entry.finallyLoc) {
                          return handle(entry.finallyLoc);
                      }
                  } else {
                      throw new Error("try statement without catch or finally");
                  }
              }
          }
      },

      abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                  var finallyEntry = entry;
                  break;
              }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              // Ignore the finally entry if control is not jumping to a
              // location outside the try/catch block.
              finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
              this.next = finallyEntry.finallyLoc;
          } else {
              this.complete(record);
          }

          return ContinueSentinel;
      },

      complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
              throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
          } else if (record.type === "return") {
              this.rval = record.arg;
              this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
          }
      },

      finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
              }
          }
      },

      "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === "throw") {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                  }
                  return thrown;
              }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error("illegal catch attempt");
      },

      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
          };

          return ContinueSentinel;
      }
  };
  window.regeneratorRuntime = regeneratorRuntime$1;

  var defaultOptions = {
      timeout: 5000,
      jsonpCallback: 'callback'
  };

  function generateCallbackFunction() {
      return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
  }

  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
  function clearFunction(functionName) {
      // IE8 throws an exception when you try to delete a property on window
      // http://stackoverflow.com/a/1824228/751089
      try {
          delete window[functionName];
      } catch (e) {
          window[functionName] = undefined;
      }
  }

  function removeScript(scriptId) {
      var script = document.getElementById(scriptId);
      document.getElementsByTagName("head")[0].removeChild(script);
  }

  var fetchJsonp = function fetchJsonp(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var timeout = options.timeout != null ? options.timeout : defaultOptions.timeout;
      var jsonpCallback = options.jsonpCallback != null ? options.jsonpCallback : defaultOptions.jsonpCallback;

      var timeoutId = undefined;

      return new Promise(function (resolve, reject) {
          var callbackFunction = generateCallbackFunction();

          window[callbackFunction] = function (response) {
              resolve({
                  ok: true,
                  //
                  json: function json() {
                      return Promise.resolve(response);
                  }
              });

              if (timeoutId) clearTimeout(timeoutId);

              removeScript(jsonpCallback + '_' + callbackFunction);

              clearFunction(callbackFunction);
          };

          // Check if the user set their own params, and if not add a ? to start a list of params
          url += url.indexOf('?') === -1 ? '?' : '&';

          var jsonpScript = document.createElement('script');
          jsonpScript.setAttribute("src", url + jsonpCallback + '=' + callbackFunction);
          jsonpScript.id = jsonpCallback + '_' + callbackFunction;
          document.getElementsByTagName("head")[0].appendChild(jsonpScript);

          timeoutId = setTimeout(function () {
              reject(new Error('JSONP request to ' + url + ' timed out'));

              clearFunction(callbackFunction);
              removeScript(jsonpCallback + '_' + callbackFunction);
          }, timeout);
      });
  };
  window.fetchJsonp = fetchJsonp;

  (function () {
    'use strict';

    if (self.fetch) {
      return;
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = name.toString();
      }
      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }
      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      return value;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = this.map[name];
      if (!list) {
        list = [];
        this.map[name] = list;
      }
      list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      var values = this.map[normalizeName(name)];
      return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
      return this.map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = [normalizeValue(value)];
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames(this.map).forEach(function (name) {
        this.map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }
      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      return fileReaderReady(reader);
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      reader.readAsText(blob);
      return fileReaderReady(reader);
    }

    var support = {
      blob: 'FileReader' in self && 'Blob' in self && (function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      })(),
      formData: 'FormData' in self
    };

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;
        if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (!body) {
          this._bodyText = '';
        } else {
          throw new Error('unsupported BodyInit type');
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          return this.blob().then(readBlobAsArrayBuffer);
        };

        this.text = function () {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
      } else {
        this.text = function () {
          var rejected = consumed(this);
          return rejected ? rejected : Promise.resolve(this._bodyText);
        };
      }

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(url, options) {
      options = options || {};
      this.url = url;

      this.credentials = options.credentials || 'omit';
      this.headers = new Headers(options.headers);
      this.method = normalizeMethod(options.method || 'GET');
      this.mode = options.mode || null;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }
      this._initBody(options.body);
    }

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function headers(xhr) {
      var head = new Headers();
      var pairs = xhr.getAllResponseHeaders().trim().split('\n');
      pairs.forEach(function (header) {
        var split = header.trim().split(':');
        var key = split.shift().trim();
        var value = split.join(':').trim();
        head.append(key, value);
      });
      return head;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this._initBody(bodyInit);
      this.type = 'default';
      this.url = null;
      this.status = options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = options.statusText;
      this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
      this.url = options.url || '';
    }

    Body.call(Response.prototype);

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      // TODO: Request constructor should accept input, init
      var request;
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input;
      } else {
        request = new Request(input, init);
      }

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        function responseURL() {
          if ('responseURL' in xhr) {
            return xhr.responseURL;
          }

          // Avoid security warnings on getResponseHeader when not allowed by CORS
          if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
          }

          return;
        }

        xhr.onload = function () {
          var status = xhr.status === 1223 ? 204 : xhr.status;
          if (status < 100 || status > 599) {
            reject(new TypeError('Network request failed'));
            return;
          }
          var options = {
            status: status,
            statusText: xhr.statusText,
            headers: headers(xhr),
            url: responseURL()
          };
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };
    self.fetch.polyfill = true;
  })();

  var Twitter = (function () {
      function Twitter(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Twitter);

          this.input = input;
          this.output = output;
          this.options = options;
          this.embeds = embeds;
          this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;
          this.service = 'twitter';

          this.load = this.load.bind(this);
          this.options.element.addEventListener('rendered', this.load, false);
      }

      /**
       * Fetches the data from twitter's oEmbed API
       * @param  {string} url URL of the tweet
       * @return {object}     data containing the tweet info
       */

      babelHelpers.createClass(Twitter, [{
          key: 'tweetData',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
                  var config, apiUrl, response;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                          switch (_context.prev = _context.next) {
                              case 0:
                                  config = this.options.tweetOptions;
                                  apiUrl = 'https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=' + url + '&maxwidth=' + config.maxWidth + '&hide_media=' + config.hideMedia + '&hide_thread=' + config.hideThread + '&align=' + config.align + '&lang=' + config.lang;
                                  _context.next = 4;
                                  return fetchJsonp(apiUrl, {
                                      credentials: 'include'
                                  });

                              case 4:
                                  response = _context.sent;
                                  _context.next = 7;
                                  return response.json();

                              case 7:
                                  return _context.abrupt('return', _context.sent);

                              case 8:
                              case 'end':
                                  return _context.stop();
                          }
                      }
                  }, _callee, this);
              }));
              return function tweetData(_x) {
                  return ref.apply(this, arguments);
              };
          })()

          /**
           * Load twitter widgets
           * @return null
           */

      }, {
          key: 'load',
          value: function load() {
              var _this = this;

              twttr.widgets.load(this.options.element); //here this refers to the element

              //Execute the function after the widget is loaded
              twttr.events.bind('loaded', function () {
                  _this.options.onTweetsLoad();
              });
          }
      }, {
          key: 'process',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                  var regexInline, match, url, data, text;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                          switch (_context2.prev = _context2.next) {
                              case 0:
                                  _context2.prev = 0;

                                  if (utils.ifInline(this.options, this.service)) {
                                      _context2.next = 15;
                                      break;
                                  }

                                  regexInline = this.options.link ? new RegExp('([^>]*' + this.regex.source + ')</a>', 'gi') : new RegExp('([^\\s]*' + this.regex.source + ')', 'gi');
                                  match = undefined;

                              case 4:
                                  if (!((match = utils.matches(regexInline, this.output)) !== null)) {
                                      _context2.next = 13;
                                      break;
                                  }

                                  url = this.options.link ? match[0].slice(0, -4) : match[0];
                                  _context2.next = 8;
                                  return this.tweetData(url);

                              case 8:
                                  data = _context2.sent;
                                  text = data.html;

                                  if (this.options.link) {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text);
                                  } else {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text);
                                  }
                                  _context2.next = 4;
                                  break;

                              case 13:
                                  _context2.next = 23;
                                  break;

                              case 15:
                                  match = undefined;

                              case 16:
                                  if (!((match = utils.matches(this.regex, this.input)) !== null)) {
                                      _context2.next = 23;
                                      break;
                                  }

                                  _context2.next = 19;
                                  return this.tweetData(match[0]);

                              case 19:
                                  data = _context2.sent;

                                  this.embeds.push({
                                      text: data.html,
                                      index: match.index
                                  });
                                  _context2.next = 16;
                                  break;

                              case 23:
                                  return _context2.abrupt('return', [this.output, this.embeds]);

                              case 26:
                                  _context2.prev = 26;
                                  _context2.t0 = _context2['catch'](0);

                                  console.log(_context2.t0);

                              case 29:
                              case 'end':
                                  return _context2.stop();
                          }
                      }
                  }, _callee2, this, [[0, 26]]);
              }));
              return function process() {
                  return ref.apply(this, arguments);
              };
          })()
      }]);
      return Twitter;
  })();

  var Base = (function () {
  	function Base(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Base);

  		this.input = input;
  		this.output = output;
  		this.options = options;
  		this.embeds = embeds;
  	}

  	babelHelpers.createClass(Base, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			if (!utils.ifInline(this.options, this.service)) {
  				var regexInline = this.options.link ? new RegExp('([^>]*' + this.regex.source + ')</a>', 'gm') : new RegExp('([^\\s]*' + this.regex.source + ')', 'gm');
  				this.output = this.output.replace(regexInline, function (match) {
  					if (_this.options.link) {
  						return !_this.options.inlineText ? _this.template(match.slice(0, -4)) + '</a>' : match + _this.template(match.slice(0, -4));
  					} else {
  						return !_this.options.inlineText ? _this.template(match) : match + _this.template(match);
  					}
  				});
  			} else {
  				var match = undefined;
  				while ((match = utils.matches(this.regex, this.input)) !== null) {
  					var text = this.template(match[0]);
  					this.embeds.push({
  						text: text,
  						index: match.index
  					});
  				}
  			}
  			return [this.output, this.embeds];
  		}
  	}]);
  	return Base;
  })();

  var Basic = (function (_Base) {
  	babelHelpers.inherits(Basic, _Base);

  	function Basic(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Basic);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Basic).call(this, input, output, options, embeds));

  		_this.regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;
  		_this.service = 'image';
  		return _this;
  	}

  	babelHelpers.createClass(Basic, [{
  		key: 'template',
  		value: function template(match) {
  			return ejs.template.basicImage(match, this.options) || '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + match + '"/></div></div>';
  		}
  	}]);
  	return Basic;
  })(Base);

  var Instagram = (function (_Base) {
  	babelHelpers.inherits(Instagram, _Base);

  	function Instagram(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Instagram);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Instagram).call(this, input, output, options, embeds));

  		_this.regex = /instagram.com\/p\/[a-zA-Z0-9_\/\?\-\=]+/gi;
  		_this.service = 'instagram';
  		return _this;
  	}

  	babelHelpers.createClass(Instagram, [{
  		key: 'template',
  		value: function template(match) {
  			var dimensions = utils.dimensions(this.options);
  			return ejs.template.instagram(match, dimensions, this.options) || '<div class="ejs-embed ejs-instagram"><iframe src="' + utils.toUrl(match.split('/?')[0]) + '/embed/" height="' + dimensions.height + '"></iframe></div>';
  		}
  	}]);
  	return Instagram;
  })(Base);

  var Flickr = (function (_Base) {
  	babelHelpers.inherits(Flickr, _Base);

  	function Flickr(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Flickr);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Flickr).call(this, input, output, options, embeds));

  		_this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d\-\]+\/[\d]+/gi;
  		_this.service = 'flickr';
  		return _this;
  	}

  	babelHelpers.createClass(Flickr, [{
  		key: 'template',
  		value: function template(match) {
  			var dimensions = utils.dimensions(this.options);
  			return ejs.template.flickr(match, dimensions, this.options) || '<div class="ejs-embed">\n\t\t\t<div class="ne-image-wrapper">\n\t\t\t\t<iframe src="' + utils.toUrl(match.split('/?')[0]) + '/player/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n\t\t\t</div>\n\t\t</div>';
  		}
  	}]);
  	return Flickr;
  })(Base);

  var BasicAudio = (function (_Base) {
      babelHelpers.inherits(BasicAudio, _Base);

      function BasicAudio(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, BasicAudio);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BasicAudio).call(this, input, output, options, embeds));

          _this.regex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;
          _this.service = 'audio';
          return _this;
      }

      babelHelpers.createClass(BasicAudio, [{
          key: 'template',
          value: function template(match) {
              return ejs.template.basicAudio(match) || '<div class="ejs-audio ejs-embed"><audio src="' + match + '" controls class="video-js ejs-video-js"></audio></div>';
          }
      }]);
      return BasicAudio;
  })(Base);

  var Spotify = (function (_Base) {
  	babelHelpers.inherits(Spotify, _Base);

  	function Spotify(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, Spotify);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Spotify).call(this, input, output, options, embeds));

  		_this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi;
  		_this.service = 'spotify';
  		return _this;
  	}

  	babelHelpers.createClass(Spotify, [{
  		key: 'template',
  		value: function template(match) {
  			var a = match.split('/');
  			var id = a[a.length - 1];
  			return ejs.template.spotify(id) || '<div class="ejs-embed"><iframe src="https://embed.spotify.com/?uri=spotify:track:' + id + '" height="80"></iframe></div>';
  		}
  	}]);
  	return Spotify;
  })(Base);

  var SoundCloud = (function (_Base) {
  	babelHelpers.inherits(SoundCloud, _Base);

  	function SoundCloud(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, SoundCloud);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SoundCloud).call(this, input, output, options, embeds));

  		_this.regex = /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;
  		_this.service = 'soundcloud';
  		return _this;
  	}

  	babelHelpers.createClass(SoundCloud, [{
  		key: 'template',
  		value: function template(match) {
  			var config = this.options.soundCloudOptions;
  			return ejs.template.soundCloud(match, config) || '<div class="ejs-embed">\n\t\t<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=' + match + '\n\t\t&auto_play     = ' + config.autoPlay + '\n\t\t&hide_related  = ' + config.hideRelated + '\n\t\t&show_comments = ' + config.showComments + '\n\t\t&show_user     = ' + config.showUser + '\n\t\t&show_reposts  = ' + config.showReposts + '\n\t\t&visual        = ' + config.visual + '\n\t\t&download      = ' + config.download + '\n\t\t&color         = ' + config.themeColor + '\n\t\t&theme_color   = ' + config.themeColor + '"></iframe>\n\t\t</div>';
  		}
  	}]);
  	return SoundCloud;
  })(Base);

  var Gmap = (function () {
      function Gmap(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Gmap);

          this.input = input;
          this.output = output;
          this.options = options;
          this.embeds = embeds;
          this.service = 'map';
          this.regex = /@\((.+)\)/gi;
      }

      babelHelpers.createClass(Gmap, [{
          key: 'getCoordinate',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(location) {
                  var url, response, data, latitude, longitude;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                          switch (_context.prev = _context.next) {
                              case 0:
                                  url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=false';
                                  _context.next = 3;
                                  return fetch(url);

                              case 3:
                                  response = _context.sent;
                                  _context.next = 6;
                                  return response.json();

                              case 6:
                                  data = _context.sent;
                                  latitude = data.results[0].geometry.location.lat;
                                  longitude = data.results[0].geometry.location.lng;
                                  return _context.abrupt('return', [latitude, longitude]);

                              case 10:
                              case 'end':
                                  return _context.stop();
                          }
                      }
                  }, _callee, this);
              }));
              return function getCoordinate(_x) {
                  return ref.apply(this, arguments);
              };
          })()
      }, {
          key: 'template',
          value: function template(match, latitude, longitude) {
              var location = match.split('(')[1].split(')')[0];
              var config = this.options.mapOptions;
              var dimensions = utils.dimensions(this.options);
              if (config.mode === 'place') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/place?key=' + this.options.googleAuthKey + '&q=' + location + '"></iframe></div>';
              } else if (config.mode === 'streetview') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/streetview?key=' + this.options.googleAuthKey + '&location=' + latitude + ',' + longitude + '&heading=210&pitch=10&fov=35"></iframe></div>';
              } else if (config.mode === 'view') {
                  return '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/view?key=' + this.options.googleAuthKey + '&center=' + latitude + ',' + longitude + '&zoom=18&maptype=satellite"></iframe></div>';
              }
          }
      }, {
          key: 'process',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                  var _this = this;

                  var match, _loop;

                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                          switch (_context3.prev = _context3.next) {
                              case 0:
                                  match = undefined;
                                  _loop = regeneratorRuntime.mark(function _callee2() {
                                      var _ref, _ref2, latitude, longitude, text;

                                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                          while (1) {
                                              switch (_context2.prev = _context2.next) {
                                                  case 0:
                                                      if (!(_this.options.mapOptions.mode !== 'place')) {
                                                          _context2.next = 6;
                                                          break;
                                                      }

                                                      _context2.next = 3;
                                                      return _this.getCoordinate(match[0]);

                                                  case 3:
                                                      _context2.t0 = _context2.sent;
                                                      _context2.next = 7;
                                                      break;

                                                  case 6:
                                                      _context2.t0 = [null, null];

                                                  case 7:
                                                      _ref = _context2.t0;
                                                      _ref2 = babelHelpers.slicedToArray(_ref, 2);
                                                      latitude = _ref2[0];
                                                      longitude = _ref2[1];
                                                      text = _this.template(match[0], latitude, longitude);

                                                      if (!utils.ifInline(_this.options, _this.service)) {
                                                          _this.output = _this.output.replace(_this.regex, function (regexMatch) {
                                                              return '<span class="ejs-location">' + Gmap.locationText(regexMatch) + '</span>' + text;
                                                          });
                                                      } else {
                                                          _this.embeds.push({
                                                              text: text,
                                                              index: match.index
                                                          });
                                                          _this.output = _this.output.replace(_this.regex, function (regexMatch) {
                                                              return '<span class="ejs-location">' + Gmap.locationText(regexMatch) + '</span>';
                                                          });
                                                      }

                                                  case 13:
                                                  case 'end':
                                                      return _context2.stop();
                                              }
                                          }
                                      }, _callee2, _this);
                                  });

                              case 2:
                                  if (!((match = utils.matches(this.regex, this.output)) !== null)) {
                                      _context3.next = 6;
                                      break;
                                  }

                                  return _context3.delegateYield(_loop(), 't0', 4);

                              case 4:
                                  _context3.next = 2;
                                  break;

                              case 6:
                                  return _context3.abrupt('return', [this.output, this.embeds]);

                              case 7:
                              case 'end':
                                  return _context3.stop();
                          }
                      }
                  }, _callee3, this);
              }));
              return function process() {
                  return ref.apply(this, arguments);
              };
          })()
      }], [{
          key: 'locationText',
          value: function locationText(match) {
              return match.split('(')[1].split(')')[0];
          }
      }]);
      return Gmap;
  })();

  var Vimeo = (function () {
      function Vimeo(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Vimeo);

          this.input = input;
          this.output = output;
          this.options = options;
          this.embeds = embeds;
          this.regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;
          this.service = 'vimeo';
      }

      babelHelpers.createClass(Vimeo, [{
          key: 'data',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                  var url, response, data;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                          switch (_context.prev = _context.next) {
                              case 0:
                                  _context.prev = 0;
                                  url = 'https://vimeo.com/api/v2/video/' + id + '.json';
                                  _context.next = 4;
                                  return fetch(url);

                              case 4:
                                  response = _context.sent;
                                  _context.next = 7;
                                  return response.json();

                              case 7:
                                  data = _context.sent;
                                  return _context.abrupt('return', data[0]);

                              case 11:
                                  _context.prev = 11;
                                  _context.t0 = _context['catch'](0);

                                  console.log(_context.t0);

                              case 14:
                              case 'end':
                                  return _context.stop();
                          }
                      }
                  }, _callee, this, [[0, 11]]);
              }));
              return function data(_x) {
                  return ref.apply(this, arguments);
              };
          })()
      }, {
          key: 'process',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                  var regexInline, match, id, embedUrl, _data, text, _data2;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                          switch (_context2.prev = _context2.next) {
                              case 0:
                                  _context2.prev = 0;

                                  if (utils.ifInline(this.options, this.service)) {
                                      _context2.next = 21;
                                      break;
                                  }

                                  regexInline = this.options.link ? new RegExp('([^>]*' + this.regex.source + ')</a>', 'gi') : new RegExp('([^\\s]*' + this.regex.source + ')', 'gi');
                                  match = undefined;

                              case 4:
                                  if (!((match = utils.matches(regexInline, this.output)) !== null)) {
                                      _context2.next = 19;
                                      break;
                                  }

                                  id = this.options.link ? match[0].slice(0, -4).split('/').slice(-1).pop() : match[0].split('/').slice(-1).pop();
                                  embedUrl = 'https://player.vimeo.com/video/' + id;
                                  _data = undefined, text = undefined;

                                  if (!this.options.videoDetails) {
                                      _context2.next = 15;
                                      break;
                                  }

                                  _context2.next = 11;
                                  return this.data(id);

                              case 11:
                                  _data = _context2.sent;

                                  text = helper.getDetailsTemplate(Vimeo.formatData(_data, utils), _data, embedUrl);
                                  _context2.next = 16;
                                  break;

                              case 15:
                                  text = helper.template(embedUrl, this.options);

                              case 16:

                                  if (this.options.link) {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text);
                                  } else {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text);
                                  }
                                  _context2.next = 4;
                                  break;

                              case 19:
                                  _context2.next = 36;
                                  break;

                              case 21:
                                  match = undefined;

                              case 22:
                                  if (!((match = utils.matches(this.regex, this.input)) !== null)) {
                                      _context2.next = 36;
                                      break;
                                  }

                                  embedUrl = 'https://player.vimeo.com/video/' + match[3];
                                  _data2 = undefined, text = undefined;

                                  if (!this.options.videoDetails) {
                                      _context2.next = 32;
                                      break;
                                  }

                                  _context2.next = 28;
                                  return this.data(match[3]);

                              case 28:
                                  _data2 = _context2.sent;

                                  text = helper.getDetailsTemplate(Vimeo.formatData(_data2, utils), _data2, embedUrl);
                                  _context2.next = 33;
                                  break;

                              case 32:
                                  text = helper.template(embedUrl, this.options);

                              case 33:

                                  this.embeds.push({
                                      text: text,
                                      index: match.index
                                  });
                                  _context2.next = 22;
                                  break;

                              case 36:
                                  return _context2.abrupt('return', [this.output, this.embeds]);

                              case 39:
                                  _context2.prev = 39;
                                  _context2.t0 = _context2['catch'](0);

                                  console.log(_context2.t0);

                              case 42:
                              case 'end':
                                  return _context2.stop();
                          }
                      }
                  }, _callee2, this, [[0, 39]]);
              }));
              return function process() {
                  return ref.apply(this, arguments);
              };
          })()
      }], [{
          key: 'formatData',
          value: function formatData(data, utils) {
              return {
                  title: data.title,
                  thumbnail: data.thumbnail_medium,
                  rawDescription: data.description.replace(/\n/g, '<br/>').replace(/&#10;/g, '<br/>'),
                  views: data.stats_number_of_plays,
                  likes: data.stats_number_of_likes,
                  description: utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, ' '), 150),
                  url: data.url,
                  id: data.id,
                  host: 'vimeo'
              };
          }
      }]);
      return Vimeo;
  })();

  var Youtube = (function () {
      function Youtube(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Youtube);

          this.input = input;
          this.output = output;
          this.options = options;
          this.embeds = embeds;
          this.regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;
          this.service = 'youtube';
      }

      babelHelpers.createClass(Youtube, [{
          key: 'data',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                  var url, response, data;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                          switch (_context.prev = _context.next) {
                              case 0:
                                  _context.prev = 0;
                                  url = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=' + this.options.googleAuthKey + '&part=snippet,statistics';
                                  _context.next = 4;
                                  return fetch(url);

                              case 4:
                                  response = _context.sent;
                                  _context.next = 7;
                                  return response.json();

                              case 7:
                                  data = _context.sent;
                                  return _context.abrupt('return', data.items[0]);

                              case 11:
                                  _context.prev = 11;
                                  _context.t0 = _context['catch'](0);

                                  console.log(_context.t0);

                              case 14:
                              case 'end':
                                  return _context.stop();
                          }
                      }
                  }, _callee, this, [[0, 11]]);
              }));
              return function data(_x) {
                  return ref.apply(this, arguments);
              };
          })()
      }, {
          key: 'process',
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                  var regexInline, match, id, embedUrl, _data, text, _data2;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                          switch (_context2.prev = _context2.next) {
                              case 0:
                                  _context2.prev = 0;

                                  if (utils.ifInline(this.options, this.service)) {
                                      _context2.next = 21;
                                      break;
                                  }

                                  regexInline = this.options.link ? new RegExp('([^>]*' + this.regex.source + ')</a>', 'gi') : new RegExp('([^\\s]*' + this.regex.source + ')', 'gi');
                                  match = undefined;

                              case 4:
                                  if (!((match = utils.matches(regexInline, this.output)) !== null)) {
                                      _context2.next = 19;
                                      break;
                                  }

                                  id = match[2];
                                  embedUrl = 'https://www.youtube.com/embed/' + id;
                                  _data = undefined, text = undefined;

                                  if (!this.options.videoDetails) {
                                      _context2.next = 15;
                                      break;
                                  }

                                  _context2.next = 11;
                                  return this.data(id);

                              case 11:
                                  _data = _context2.sent;

                                  text = helper.getDetailsTemplate(Youtube.formatData(_data, utils), _data, embedUrl);
                                  _context2.next = 16;
                                  break;

                              case 15:
                                  text = helper.template(embedUrl, this.options);

                              case 16:
                                  if (this.options.link) {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text + '</a>') : this.output.replace(match[0], match[0] + text);
                                  } else {
                                      this.output = !this.options.inlineText ? this.output.replace(match[0], text) : this.output.replace(match[0], match[0] + text);
                                  }
                                  _context2.next = 4;
                                  break;

                              case 19:
                                  _context2.next = 37;
                                  break;

                              case 21:
                                  match = undefined;

                              case 22:
                                  if (!((match = utils.matches(this.regex, this.input)) !== null)) {
                                      _context2.next = 37;
                                      break;
                                  }

                                  id = match[1];
                                  embedUrl = 'https://www.youtube.com/embed/' + id;
                                  _data2 = undefined, text = undefined;

                                  if (!this.options.videoDetails) {
                                      _context2.next = 33;
                                      break;
                                  }

                                  _context2.next = 29;
                                  return this.data(id);

                              case 29:
                                  _data2 = _context2.sent;

                                  text = helper.getDetailsTemplate(Youtube.formatData(_data2, utils), _data2, embedUrl);
                                  _context2.next = 34;
                                  break;

                              case 33:
                                  text = helper.template(embedUrl, this.options);

                              case 34:

                                  this.embeds.push({
                                      text: text,
                                      index: match.index
                                  });
                                  _context2.next = 22;
                                  break;

                              case 37:
                                  _context2.next = 42;
                                  break;

                              case 39:
                                  _context2.prev = 39;
                                  _context2.t0 = _context2['catch'](0);

                                  console.log(_context2.t0);

                              case 42:
                                  return _context2.abrupt('return', [this.output, this.embeds]);

                              case 43:
                              case 'end':
                                  return _context2.stop();
                          }
                      }
                  }, _callee2, this, [[0, 39]]);
              }));
              return function process() {
                  return ref.apply(this, arguments);
              };
          })()
      }], [{
          key: 'formatData',
          value: function formatData(data, utils) {
              return {
                  title: data.snippet.title,
                  thumbnail: data.snippet.thumbnails.medium.url,
                  rawDescription: data.snippet.description,
                  views: data.statistics.viewCount,
                  likes: data.statistics.likeCount,
                  description: utils.truncate(data.snippet.description, 150),
                  url: 'https://www.youtube.com/watch?v=' + data.id,
                  id: data.id,
                  host: 'youtube'
              };
          }
      }]);
      return Youtube;
  })();

  var Vine = (function (_Base) {
      babelHelpers.inherits(Vine, _Base);

      function Vine(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Vine);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Vine).call(this, input, output, options, embeds));

          _this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi;
          _this.service = 'vine';
          return _this;
      }

      babelHelpers.createClass(Vine, [{
          key: 'template',
          value: function template(match) {
              var config = this.options.vineOptions;
              var a = match.split('/');
              var id = a[a.length - 1];
              return ejs.template.vine(id, this.options) || '<div class="ejs-vine">\n\t\t<iframe class="ejs-vine-iframe" src="https://vine.co/v/' + id + '/embed/' + config.type + '" height="' + config.height + '" width="' + config.width + '"></iframe>\n\t\t</div>';
          }
      }]);
      return Vine;
  })(Base);

  var BasicVideo = (function (_Base) {
  	babelHelpers.inherits(BasicVideo, _Base);

  	function BasicVideo(input, output, options, embeds) {
  		babelHelpers.classCallCheck(this, BasicVideo);

  		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(BasicVideo).call(this, input, output, options, embeds));

  		_this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;
  		_this.service = 'video';
  		return _this;
  	}

  	babelHelpers.createClass(BasicVideo, [{
  		key: 'template',
  		value: function template(match) {
  			return ejs.template.basicVideo(match, this.options) || '<div class="ejs-video ejs-embed">\n\t\t<div class="ejs-video-player">\n\t\t<div class="ejs-player">\n\t\t<video src="' + match + '" class="ejs-video-js video-js" controls></video>\n\t\t</div>\n\t\t</div>\n\t\t</div>';
  		}
  	}]);
  	return BasicVideo;
  })(Base);

  var LiveLeak = (function (_Base) {
      babelHelpers.inherits(LiveLeak, _Base);

      function LiveLeak(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, LiveLeak);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(LiveLeak).call(this, input, output, options, embeds));

          _this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;
          _this.service = 'liveleak';
          return _this;
      }

      babelHelpers.createClass(LiveLeak, [{
          key: 'template',
          value: function template(match) {
              var dimensions = utils.dimensions(this.options);
              return ejs.template.liveLeak(match, dimensions, this.options) || '<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/' + match.split('=')[1] + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
          }
      }]);
      return LiveLeak;
  })(Base);

  var Ustream = (function (_Base) {
      babelHelpers.inherits(Ustream, _Base);

      function Ustream(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Ustream);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ustream).call(this, input, output, options, embeds));

          _this.regex = /ustream.tv\/[a-z\/0-9]*/gi;
          _this.service = 'ustream';
          return _this;
      }

      babelHelpers.createClass(Ustream, [{
          key: 'template',
          value: function template(match) {
              var id = match.split('/');
              id.splice(1, 0, 'embed');
              var dimensions = utils.dimensions(this.options);
              return ejs.template.ustream(id, dimensions, this.options) || '<div class="ejs-embed ejs-ustream"><iframe src="//www.' + id.join('/') + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
          }
      }]);
      return Ustream;
  })(Base);

  var Dailymotion = (function (_Base) {
      babelHelpers.inherits(Dailymotion, _Base);

      function Dailymotion(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Dailymotion);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Dailymotion).call(this, input, output, options, embeds));

          _this.regex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;
          _this.service = 'dailymotion';
          return _this;
      }

      babelHelpers.createClass(Dailymotion, [{
          key: 'template',
          value: function template(match) {
              var dimensions = utils.dimensions(this.options);
              var a = match.split('/');
              var id = a[a.length - 1];
              return ejs.template.dailymotion(id, dimensions, this.options) || '<div class="ejs-video ejs-embed">\n\t\t<iframe src="http://www.dailymotion.com/embed/video/' + id + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\n\t\t</div>';
          }
      }]);
      return Dailymotion;
  })(Base);

  var Ted = (function (_Base) {
      babelHelpers.inherits(Ted, _Base);

      function Ted(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Ted);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ted).call(this, input, output, options, embeds));

          _this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;
          _this.service = 'ted';
          return _this;
      }

      babelHelpers.createClass(Ted, [{
          key: 'template',
          value: function template(match) {
              var dimensions = utils.dimensions(this.options);
              var a = match.split('/');
              var id = a[a.length - 1];
              return ejs.template.ted(id, dimensions, this.options) || '<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/' + id + '.html" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
          }
      }]);
      return Ted;
  })(Base);

  var Gist = (function (_Base) {
      babelHelpers.inherits(Gist, _Base);

      function Gist(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Gist);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Gist).call(this, input, output, options, embeds));

          _this.regex = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/g;
          _this.service = 'gist';

          _this.options.element.addEventListener('rendered', function () {
              _this.load();
          });
          return _this;
      }

      babelHelpers.createClass(Gist, [{
          key: 'template',
          value: function template(match) {
              return '<div class="ejs-gist" data-src="' + match + '"></div>';
          }
      }, {
          key: 'load',
          value: function load() {
              var gists = this.options.element.getElementsByClassName('ejs-gist');
              for (var i = 0; i < gists.length; i++) {
                  var gistFrame = document.createElement("iframe");
                  gistFrame.setAttribute("width", "100%");
                  gistFrame.id = 'ejs-gist-' + i;

                  var zone = gists[i];
                  zone.innerHTML = "";
                  zone.appendChild(gistFrame);

                  // Create the iframe's document
                  var url = gists[i].getAttribute('data-src');
                  url = url.indexOf('http') === -1 ? 'https://' + url : url;
                  var gistFrameHTML = '<html><base target="_parent"/><body onload="parent.document.getElementById(\'ejs-gist-' + i + '\').style.height=parseInt(document.body.scrollHeight)+20+\'px\'"><script type="text/javascript" src="' + url + '.js"></script></body></html>';

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
      }]);
      return Gist;
  })(Base);

  var JsFiddle = (function (_Base) {
      babelHelpers.inherits(JsFiddle, _Base);

      function JsFiddle(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, JsFiddle);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(JsFiddle).call(this, input, output, options, embeds));

          _this.regex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;
          _this.service = 'jsfiddle';
          return _this;
      }

      babelHelpers.createClass(JsFiddle, [{
          key: 'template',
          value: function template(id) {
              return ejs.template.jsFiddle(id, this.options) || '<div class="ejs-embed ejs-jsfiddle"><iframe height="' + this.options.codeEmbedHeight + '" src="http://' + id + '/embedded"></iframe></div>';
          }
      }]);
      return JsFiddle;
  })(Base);

  var CodePen = (function (_Base) {
      babelHelpers.inherits(CodePen, _Base);

      function CodePen(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, CodePen);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CodePen).call(this, input, output, options, embeds));

          _this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;
          _this.service = 'codepen';
          return _this;
      }

      babelHelpers.createClass(CodePen, [{
          key: 'template',
          value: function template(id) {
              return ejs.template.codePen(id, this.options) || '<div class="ejs-embed ejs-codepen">\n\t\t\t<iframe scrolling="no" height="' + this.options.codeEmbedHeight + '" src="' + id.replace(/\/pen\//, '/embed/') + '/?height=' + this.options.codeEmbedHeight + '"></iframe>\'\n\t\t</div>';
          }
      }]);
      return CodePen;
  })(Base);

  var JsBin = (function (_Base) {
      babelHelpers.inherits(JsBin, _Base);

      function JsBin(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, JsBin);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(JsBin).call(this, input, output, options, embeds));

          _this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;
          _this.service = 'jsbin';
          return _this;
      }

      babelHelpers.createClass(JsBin, [{
          key: 'template',
          value: function template(id) {
              return ejs.template.jsBin(id, this.options) || '<div class="ejs-jsbin ejs-embed">\n\t\t<iframe height="' + this.options.codeEmbedHeight + '" class="jsbin-embed foo" src="http://' + id + '/embed?html,js,output"></iframe>\n\t\t</div>';
          }
      }]);
      return JsBin;
  })(Base);

  var Plunker = (function (_Base) {
      babelHelpers.inherits(Plunker, _Base);

      function Plunker(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Plunker);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Plunker).call(this, input, output, options, embeds));

          _this.regex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;
          _this.service = 'plunker';
          return _this;
      }

      babelHelpers.createClass(Plunker, [{
          key: 'template',
          value: function template(match) {
              var a = match.split('?')[0].split('/');
              var id = a[a.length - 1];
              return ejs.template.plunker(id, this.options) || '<div class="ejs-embed ejs-plunker">\n\t\t<iframe class="ne-plunker" src="http://embed.plnkr.co/' + id + '" height="' + this.options.codeEmbedHeight + '"></iframe>\n\t\t</div>';
          }
      }]);
      return Plunker;
  })(Base);

  var Ideone = (function (_Base) {
      babelHelpers.inherits(Ideone, _Base);

      function Ideone(input, output, options, embeds) {
          babelHelpers.classCallCheck(this, Ideone);

          var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Ideone).call(this, input, output, options, embeds));

          _this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;
          _this.service = 'ideone';
          return _this;
      }

      babelHelpers.createClass(Ideone, [{
          key: 'template',
          value: function template(match) {
              return ejs.template.ideone(match, this.options) || '<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/' + match.split('/') + '" frameborder="0" height="' + this.options.codeEmbedHeight + '"></iframe></div>';
          }
      }]);
      return Ideone;
  })(Base);

  var Highlight = (function () {
  	function Highlight(output, options) {
  		babelHelpers.classCallCheck(this, Highlight);

  		if (!hljs) {
  			throw new ReferenceError('\'hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/\'');
  		}
  		this.output = output;
  		this.options = options;
  		this.regex = /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm;
  		this.inlineCodeRegex = /(`)\s*([\s\S]*?[^`])\s*\1(?!`)/gm;
  	}

  	/**
    * Encodes the characters like <, > and space and replaces them with
    * &lt;, &gt; and &gt; respectively.
    * @param  {string} code The string that has to be encoded.
    * @return {string}      The encoded string
    */

  	babelHelpers.createClass(Highlight, [{
  		key: 'process',

  		/**
     * Replaces the code block with the pre tags and returns a string having the code
     * formatting using Highlight.js.
     * => Matches the string with the regex and finds the code written in three back-ticks ```
     * => Detects whether any language has been provided by the user.
     *     The format supported by embed.js is
     *         ```[language-name]
     *         var a = 2;
     *         ```
     * => Trims all the unnecessary spaces and newlines from the code.
     * => Passes the code to `hljs.highlightAuto(code, language)` which returns a formatted string
     *     having the html tags for styling. The `language` here is optional. In case we don't pass the
     *     language, it tries to detect the language itself.
     * => Replaces the code string in the template with the formatted string
     * @return {string} The string in which the code is formatted
     */
  		value: function process() {
  			this.output = this.output.replace(this.inlineCodeRegex, function (match, group1, group2) {
  				return '<code>' + group2 + '</code>';
  			});

  			return this.output.replace(this.regex, function (match, group1, group2, group3) {
  				var code = group3;
  				code = Highlight.trimSpace(code);
  				code = Highlight.encode(code);

  				// to prevent auto-linking. Not necessary in code
  				// *blocks*, but in code spans. Will be converted
  				// back after the auto-linker runs.
  				code = code.replace(/:\/\//g, '~P');

  				var language = group2.split('\n')[0];
  				var highlightedCode = undefined;

  				if (language) {
  					highlightedCode = hljs.highlightAuto(code, [language]);
  				} else {
  					highlightedCode = hljs.highlightAuto(code);
  					language = highlightedCode.language;
  				}

  				return Highlight.addTemplate(highlightedCode, language);
  			});
  		}
  	}], [{
  		key: 'encode',
  		value: function encode(code) {
  			code = code.replace(/&amp;/gm, '');
  			code = code.replace(/&lt;/g, '<');
  			code = code.replace(/&gt;/g, '>');
  			return code;
  		}

  		/**
     * removes whitespace characters
     * @param  {string} code The string from which the whitespace has to be removed
     * @return {string}
     */

  	}, {
  		key: 'trimSpace',
  		value: function trimSpace(code) {
  			code = code.replace(/^([ \t]*)/g, ''); // leading whitespace
  			code = code.replace(/[ \t]*$/g, ''); // trailing whitespace
  			return code;
  		}

  		/**
     * Places the code and the language name in the required template
     * @param {string} processedCode
     * @param {string} language
     * @return {string}
     */

  	}, {
  		key: 'addTemplate',
  		value: function addTemplate(processedCode, language) {
  			return '<pre><code class="ejs-code hljs ' + language + '">' + processedCode.value + '</code></pre>';
  		}
  	}]);
  	return Highlight;
  })();

  var Smiley = (function () {
      function Smiley(input, options) {
          babelHelpers.classCallCheck(this, Smiley);

          this.input = ' ' + input + ' '; //hack to consider the first and last element

          var defaultIcons = [{
              'text': ' :) ',
              'code': '&#xe60a'
          }, {
              'text': ' :D ',
              'code': '&#xe608'
          }, {
              'text': ' :d ',
              'code': '&#xe608'
          }, {
              'text': ' :( ',
              'code': '&#xe60e'
          }, {
              'text': ' :/ ',
              'code': '&#xe620'

          }, {
              'text': ' :P ',
              'code': '&#xe60c'
          }, {
              'text': ' :p ',
              'code': '&#xe60c'
          }, {
              'text': ' 3:) ',
              'code': '&#xe618'
          }, {
              'text': ' (^) ',
              'code': '&#xe607'
          }, {
              'text': ' ;) ',
              'code': '&#xe610'
          }, {
              'text': ' :o ',
              'code': '&#xe61a'
          }, {
              'text': ' -_- ',
              'code': '&#xe61e'
          }, {
              'text': ' (y) ',
              'code': '&#xe606'
          }, {
              'text': ' :* ',
              'code': '&#xe604'
          }, {
              'text': ' &lt;3 ',
              'code': '&#xe604'
          }, {
              'text': ' <3 ',
              'code': '&#xe604'
          }, {
              'text': ' &lt;/3 ',
              'code': '&#xe605'
          }, {
              'text': ' </3 ',
              'code': '&#xe605'
          }, {
              'text': ' ^_^ ',
              'code': '&#xe612'
          }, {
              'text': ' 8-) ',
              'code': '&#xe614'
          }, {
              'text': ' 8| ',
              'code': '&#xe614'
          }, {
              'text': ' :S ',
              'code': '&#xe61c'
          }, {
              'text': ' :s ',
              'code': '&#xe61c'
          }];

          this.icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons;

          this.EscapedSymbols = this.icons.map(function (val) {
              return '' + utils.escapeRegExp(val.text);
          });

          this.smileyRegex = new RegExp('(' + this.EscapedSymbols.join('|') + ')', 'g');
      }

      babelHelpers.createClass(Smiley, [{
          key: 'process',
          value: function process() {
              var _this = this;

              var processedString = this.input.replace(this.smileyRegex, function (match, text) {
                  var index = _this.EscapedSymbols.indexOf(utils.escapeRegExp(text));
                  var code = _this.icons[index].code;
                  return ejs.template.smiley(text, code, _this.options) || ' <span class="icon-emoticon" title="' + text + '">' + code + '</span> ';
              });

              return processedString.substring(1, processedString.length - 1);
          }
      }]);
      return Smiley;
  })();

  var Emoji = (function () {
      function Emoji(output, options) {
          babelHelpers.classCallCheck(this, Emoji);

          this.output = output;
          this.options = options;

          this.emojiList = ['bowtie', 'smile', 'laughing', 'blush', 'smiley', 'relaxed', 'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed', 'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'winky_face', 'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried', 'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed', 'expressionless', 'unamused', 'sweat_smile', 'sweat', 'wow', 'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded', 'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished', 'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy', 'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp', 'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart', 'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart', 'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid', 'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom', 'collision', 'anger', 'exclamation', 'question', 'grey_exclamation', 'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note', 'fire', 'hankey', 'poop', 'shit', '\\+1', 'thumbsup', '-1', 'thumbsdown', 'ok_hand', 'punch', 'facepunch', 'fist', 'v', 'wave', 'hand', 'raised_hand', 'open_hands', 'point_up', 'point_down', 'point_left', 'point_right', 'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu', 'walking', 'runner', 'running', 'couple', 'family', 'two_men_holding_hands', 'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good', 'information_desk_person', 'raising_hand', 'bride_with_veil', 'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss', 'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl', 'woman', 'man', 'baby', 'older_woman', 'older_man', 'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban', 'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat', 'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat', 'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre', 'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes', 'nose', 'tongue', 'love_letter', 'bust_in_silhouette', 'busts_in_silhouette', 'speech_balloon', 'thought_balloon', 'feelsgood', 'finnadie', 'goberserk', 'godmode', 'hurtrealbad', 'rage1', 'rage2', 'rage3', 'rage4', 'suspect', 'trollface', 'sunny', 'umbrella', 'cloud', 'snowflake', 'snowman', 'zap', 'cyclone', 'foggy', 'ocean', 'cat', 'dog', 'mouse', 'hamster', 'rabbit', 'wolf', 'frog', 'tiger', 'koala', 'bear', 'pig', 'pig_nose', 'cow', 'boar', 'monkey_face', 'monkey', 'horse', 'racehorse', 'camel', 'sheep', 'elephant', 'panda_face', 'snake', 'bird', 'baby_chick', 'hatched_chick', 'hatching_chick', 'chicken', 'penguin', 'turtle', 'bug', 'honeybee', 'ant', 'beetle', 'snail', 'octopus', 'tropical_fish', 'fish', 'whale', 'whale2', 'dolphin', 'cow2', 'ram', 'rat', 'water_buffalo', 'tiger2', 'rabbit2', 'dragon', 'goat', 'rooster', 'dog2', 'pig2', 'mouse2', 'ox', 'dragon_face', 'blowfish', 'crocodile', 'dromedary_camel', 'leopard', 'cat2', 'poodle', 'paw_prints', 'bouquet', 'cherry_blossom', 'tulip', 'four_leaf_clover', 'rose', 'sunflower', 'hibiscus', 'maple_leaf', 'leaves', 'fallen_leaf', 'herb', 'mushroom', 'cactus', 'palm_tree', 'evergreen_tree', 'deciduous_tree', 'chestnut', 'seedling', 'blossom', 'ear_of_rice', 'shell', 'globe_with_meridians', 'sun_with_face', 'full_moon_with_face', 'new_moon_with_face', 'new_moon', 'waxing_crescent_moon', 'first_quarter_moon', 'waxing_gibbous_moon', 'full_moon', 'waning_gibbous_moon', 'last_quarter_moon', 'waning_crescent_moon', 'last_quarter_moon_with_face', 'first_quarter_moon_with_face', 'moon', 'earth_africa', 'earth_americas', 'earth_asia', 'volcano', 'milky_way', 'partly_sunny', 'octocat', 'squirrel', 'bamboo', 'gift_heart', 'dolls', 'school_satchel', 'mortar_board', 'flags', 'fireworks', 'sparkler', 'wind_chime', 'rice_scene', 'jack_o_lantern', 'ghost', 'santa', 'christmas_tree', 'gift', 'bell', 'no_bell', 'tanabata_tree', 'tada', 'confetti_ball', 'balloon', 'crystal_ball', 'cd', 'dvd', 'floppy_disk', 'camera', 'video_camera', 'movie_camera', 'computer', 'tv', 'iphone', 'phone', 'telephone', 'telephone_receiver', 'pager', 'fax', 'minidisc', 'vhs', 'sound', 'speaker', 'mute', 'loudspeaker', 'mega', 'hourglass', 'hourglass_flowing_sand', 'alarm_clock', 'watch', 'radio', 'satellite', 'loop', 'mag', 'mag_right', 'unlock', 'lock', 'lock_with_ink_pen', 'closed_lock_with_key', 'key', 'bulb', 'flashlight', 'high_brightness', 'low_brightness', 'electric_plug', 'battery', 'calling', 'email', 'mailbox', 'postbox', 'bath', 'bathtub', 'shower', 'toilet', 'wrench', 'nut_and_bolt', 'hammer', 'seat', 'moneybag', 'yen', 'dollar', 'pound', 'euro', 'credit_card', 'money_with_wings', 'e-mail', 'inbox_tray', 'outbox_tray', 'envelope', 'incoming_envelope', 'postal_horn', 'mailbox_closed', 'mailbox_with_mail', 'mailbox_with_no_mail', 'door', 'smoking', 'bomb', 'gun', 'hocho', 'pill', 'syringe', 'page_facing_up', 'page_with_curl', 'bookmark_tabs', 'bar_chart', 'chart_with_upwards_trend', 'chart_with_downwards_trend', 'scroll', 'clipboard', 'calendar', 'date', 'card_index', 'file_folder', 'open_file_folder', 'scissors', 'pushpin', 'paperclip', 'black_nib', 'pencil2', 'straight_ruler', 'triangular_ruler', 'closed_book', 'green_book', 'blue_book', 'orange_book', 'notebook', 'notebook_with_decorative_cover', 'ledger', 'books', 'bookmark', 'name_badge', 'microscope', 'telescope', 'newspaper', 'football', 'basketball', 'soccer', 'baseball', 'tennis', '8ball', 'rugby_football', 'bowling', 'golf', 'mountain_bicyclist', 'bicyclist', 'horse_racing', 'snowboarder', 'swimmer', 'surfer', 'ski', 'spades', 'hearts', 'clubs', 'diamonds', 'gem', 'ring', 'trophy', 'musical_score', 'musical_keyboard', 'violin', 'space_invader', 'video_game', 'black_joker', 'flower_playing_cards', 'game_die', 'dart', 'mahjong', 'clapper', 'memo', 'pencil', 'book', 'art', 'microphone', 'headphones', 'trumpet', 'saxophone', 'guitar', 'shoe', 'sandal', 'high_heel', 'lipstick', 'boot', 'shirt', 'tshirt', 'necktie', 'womans_clothes', 'dress', 'running_shirt_with_sash', 'jeans', 'kimono', 'bikini', 'ribbon', 'tophat', 'crown', 'womans_hat', 'mans_shoe', 'closed_umbrella', 'briefcase', 'handbag', 'pouch', 'purse', 'eyeglasses', 'fishing_pole_and_fish', 'coffee', 'tea', 'sake', 'baby_bottle', 'beer', 'beers', 'cocktail', 'tropical_drink', 'wine_glass', 'fork_and_knife', 'pizza', 'hamburger', 'fries', 'poultry_leg', 'meat_on_bone', 'spaghetti', 'curry', 'fried_shrimp', 'bento', 'sushi', 'fish_cake', 'rice_ball', 'rice_cracker', 'rice', 'ramen', 'stew', 'oden', 'dango', 'egg', 'bread', 'doughnut', 'custard', 'icecream', 'ice_cream', 'shaved_ice', 'birthday', 'cake', 'cookie', 'chocolate_bar', 'candy', 'lollipop', 'honey_pot', 'apple', 'green_apple', 'tangerine', 'lemon', 'cherries', 'grapes', 'watermelon', 'strawberry', 'peach', 'melon', 'banana', 'pear', 'pineapple', 'sweet_potato', 'eggplant', 'tomato', 'corn', 'house', 'house_with_garden', 'school', 'office', 'post_office', 'hospital', 'bank', 'convenience_store', 'love_hotel', 'hotel', 'wedding', 'church', 'department_store', 'european_post_office', 'city_sunrise', 'city_sunset', 'japanese_castle', 'european_castle', 'tent', 'factory', 'tokyo_tower', 'japan', 'mount_fuji', 'sunrise_over_mountains', 'sunrise', 'stars', 'themoreyouknow', 'tmyk', 'statue_of_liberty', 'bridge_at_night', 'carousel_horse', 'rainbow', 'ferris_wheel', 'fountain', 'roller_coaster', 'ship', 'speedboat', 'boat', 'sailboat', 'rowboat', 'anchor', 'rocket', 'airplane', 'helicopter', 'steam_locomotive', 'tram', 'mountain_railway', 'bike', 'aerial_tramway', 'suspension_railway', 'mountain_cableway', 'tractor', 'blue_car', 'oncoming_automobile', 'car', 'red_car', 'taxi', 'oncoming_taxi', 'articulated_lorry', 'bus', 'oncoming_bus', 'rotating_light', 'police_car', 'oncoming_police_car', 'fire_engine', 'ambulance', 'minibus', 'truck', 'train', 'station', 'train2', 'bullettrain_front', 'bullettrain_side', 'light_rail', 'monorail', 'railway_car', 'trolleybus', 'ticket', 'fuelpump', 'vertical_traffic_light', 'traffic_light', 'warning', 'construction', 'beginner', 'atm', 'slot_machine', 'busstop', 'barber', 'hotsprings', 'checkered_flag', 'crossed_flags', 'izakaya_lantern', 'moyai', 'circus_tent', 'performing_arts', 'round_pushpin', 'triangular_flag_on_post', 'jp', 'kr', 'cn', 'us', 'fr', 'es', 'it', 'ru', 'gb', 'uk', 'de', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten', '1234', 'zero', 'hash', 'symbols', 'arrow_backward', 'arrow_down', 'arrow_forward', 'arrow_left', 'capital_abcd', 'abcd', 'abc', 'arrow_lower_left', 'arrow_lower_right', 'arrow_right', 'arrow_up', 'arrow_upper_left', 'arrow_upper_right', 'arrow_double_down', 'arrow_double_up', 'arrow_down_small', 'arrow_heading_down', 'arrow_heading_up', 'leftwards_arrow_with_hook', 'arrow_right_hook', 'left_right_arrow', 'arrow_up_down', 'arrow_up_small', 'arrows_clockwise', 'arrows_counterclockwise', 'rewind', 'fast_forward', 'information_source', 'ok', 'twisted_rightwards_arrows', 'repeat', 'repeat_one', 'new', 'top', 'up', 'cool', 'free', 'ng', 'cinema', 'koko', 'signal_strength', 'u5272', 'u5408', 'u55b6', 'u6307', 'u6708', 'u6709', 'u6e80', 'u7121', 'u7533', 'u7a7a', 'u7981', 'sa', 'restroom', 'mens', 'womens', 'baby_symbol', 'no_smoking', 'parking', 'wheelchair', 'metro', 'baggage_claim', 'accept', 'wc', 'potable_water', 'put_litter_in_its_place', 'secret', 'congratulations', 'm', 'passport_control', 'left_luggage', 'customs', 'ideograph_advantage', 'cl', 'sos', 'id', 'no_entry_sign', 'underage', 'no_mobile_phones', 'do_not_litter', 'non-potable_water', 'no_bicycles', 'no_pedestrians', 'children_crossing', 'no_entry', 'eight_spoked_asterisk', 'eight_pointed_black_star', 'heart_decoration', 'vs', 'vibration_mode', 'mobile_phone_off', 'chart', 'currency_exchange', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpius', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'ophiuchus', 'six_pointed_star', 'negative_squared_cross_mark', 'a', 'b', 'ab', 'o2', 'diamond_shape_with_a_dot_inside', 'recycle', 'end', 'on', 'soon', 'clock1', 'clock130', 'clock10', 'clock1030', 'clock11', 'clock1130', 'clock12', 'clock1230', 'clock2', 'clock230', 'clock3', 'clock330', 'clock4', 'clock430', 'clock5', 'clock530', 'clock6', 'clock630', 'clock7', 'clock730', 'clock8', 'clock830', 'clock9', 'clock930', 'heavy_dollar_sign', 'copyright', 'registered', 'tm', 'x', 'heavy_exclamation_mark', 'bangbang', 'interrobang', 'o', 'heavy_multiplication_x', 'heavy_plus_sign', 'heavy_minus_sign', 'heavy_division_sign', 'white_flower', '100', 'heavy_check_mark', 'ballot_box_with_check', 'radio_button', 'link', 'curly_loop', 'wavy_dash', 'part_alternation_mark', 'trident', 'black_square', 'white_square', 'white_check_mark', 'black_square_button', 'white_square_button', 'black_circle', 'white_circle', 'red_circle', 'large_blue_circle', 'large_blue_diamond', 'large_orange_diamond', 'small_blue_diamond', 'small_orange_diamond', 'small_red_triangle', 'small_red_triangle_down', 'shipit'];

          this.allEmojiList = this.emojiList.concat(this.options.customEmoji);

          this.emojiRegex = new RegExp(':(' + this.allEmojiList.join('|') + '):', 'g');
      }

      babelHelpers.createClass(Emoji, [{
          key: 'process',
          value: function process() {
              var _this = this;

              return this.output.replace(this.emojiRegex, function (match, text) {
                  return ejs.template.emoji(text, _this.options) || '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';
              });
          }
      }]);
      return Emoji;
  })();

  var Markdown = (function () {
  	function Markdown(output, options) {
  		babelHelpers.classCallCheck(this, Markdown);

  		if (!window.marked) throw new ReferenceError('marked.js is not loaded.');
  		this.output = output;
  		this.options = options;
  		this.process();
  	}

  	babelHelpers.createClass(Markdown, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			var renderer = new marked.Renderer();

  			/**
      * Change the default template of the code blocks provided by marked.js
      * @param  {string} text The code block string
      * @return {string}      the new template
      */
  			renderer.code = function (text) {
  				var highlightedCode = window.hljs ? hljs.highlightAuto(text) : {
  					value: text
  				};
  				var language = window.hljs ? highlightedCode.language : '';
  				return '<pre><code class="ejs-code hljs ' + language + '">' + highlightedCode.value + '</code></pre>';
  			};

  			renderer.link = function (href, title, text) {
  				if (href.indexOf('&lt;/a') === -1) return href;
  				if (href.match(/&gt;(.+)&lt;\/a/gi)) {
  					if (!title) title = '';
  					return '<a href="' + RegExp.$1 + '" rel=' + _this.options.linkOptions.rel + '" target="' + _this.options.linkOptions.target + '" title="' + title + '">' + text + '</a>';
  				}
  			};

  			renderer.image = function (href, title, text) {
  				if (href.indexOf('&lt;/a') === -1) return href;
  				if (href.match(/&gt;(.+)&lt;\/a/gi)) {
  					if (!title) title = '';
  					return '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + RegExp.$1 + '" title="' + title + '" alt="' + text + '"/></div></div>';
  				}
  			};

  			renderer.paragraph = function (text) {
  				return '<p> ' + text + ' </p>';
  			}; //for font smiley in end.

  			//Fix for heading that should be actually present in marked.js
  			//if gfm is true the `## Heading` is acceptable but `##Heading` is not
  			marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;
  			marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;

  			this.options.markedOptions.renderer = renderer;
  			return marked(this.output, this.options.markedOptions);
  		}
  	}]);
  	return Markdown;
  })();

  var Url = (function () {
  	function Url(input, options) {
  		babelHelpers.classCallCheck(this, Url);

  		this.input = input;
  		this.options = options;
  		this.urlRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:buff\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi;
  	}

  	babelHelpers.createClass(Url, [{
  		key: 'process',
  		value: function process() {
  			var _this = this;

  			var config = this.options.linkOptions;
  			return this.input.replace(this.urlRegex, function (match) {
  				var extension = match.split('.')[match.split('.').length - 1];
  				if (config.exclude.indexOf(extension) === -1) {
  					return ejs.template.url(match, _this.options) || '<a href="' + utils.toUrl(match) + '" rel="' + config.rel + '" target="' + config.target + '">' + match + '</a>';
  				}
  				return match;
  			});
  		}
  	}]);
  	return Url;
  })();

  (function (window) {
  	var globalOptions = {};

  	var defaultOptions = {
  		marked: false,
  		markedOptions: {},
  		link: true,
  		linkOptions: {
  			target: 'self',
  			exclude: ['pdf'],
  			rel: ''
  		},
  		emoji: true,
  		customEmoji: [],
  		fontIcons: true,
  		customFontIcons: [],
  		highlightCode: false,
  		videoJS: false,
  		videojsOptions: {
  			fluid: true,
  			preload: 'metadata'
  		},
  		locationEmbed: true,
  		mapOptions: {
  			mode: 'place'
  		},
  		tweetsEmbed: false,
  		tweetOptions: {
  			maxWidth: 550,
  			hideMedia: false,
  			hideThread: false,
  			align: 'none',
  			lang: 'en'
  		},
  		imageEmbed: true,
  		videoEmbed: true,
  		videoHeight: null,
  		videoWidth: null,
  		videoDetails: true,
  		audioEmbed: true,
  		excludeEmbed: [],
  		inlineEmbed: [],
  		inlineText: true,
  		codeEmbedHeight: 500,
  		vineOptions: {
  			maxWidth: null,
  			type: 'postcard', //'postcard' or 'simple' embedding
  			responsive: true,
  			width: 350,
  			height: 460
  		},
  		googleAuthKey: '',
  		soundCloudOptions: {
  			height: 160,
  			themeColor: 'f50000', //Hex Code of the player theme color
  			autoPlay: false,
  			hideRelated: false,
  			showComments: true,
  			showUser: true,
  			showReposts: false,
  			visual: false, //Show/hide the big preview image
  			download: false //Show/Hide download buttons
  		},
  		beforeEmbedJSApply: function beforeEmbedJSApply() {},
  		afterEmbedJSApply: function afterEmbedJSApply() {},
  		onVideoShow: function onVideoShow() {},
  		onTweetsLoad: function onTweetsLoad() {},
  		videojsCallback: function videojsCallback() {}
  	};

  	var EmbedJS = (function () {
  		/**
     * The constructor takes two arguements. The first one is the options object and the second one is the
     * optional string . If the user wants to provide a string directly instead of the element, he can do that.
     * In case the user provides both the input element and the string, the input string will be taken from the element
     * and the provided string won't be processed.
     *
     * @param  {object} options The options object
     * @param  {string} input   [optional] The string to be processed
     * @return {null}
     */

  		function EmbedJS(options, input) {
  			babelHelpers.classCallCheck(this, EmbedJS);

  			/**
      * We have created a clone of the original options to make sure that the original object
      * isn't altered.
      */
  			var defOpts = utils.cloneObject(defaultOptions);
  			var globOpts = utils.cloneObject(globalOptions);

  			//merge global options with the default options
  			var globOptions = utils.deepExtend(defOpts, globOpts);

  			//merge global options with the overriding options provided by the user as an options
  			//object while creating a new instance of embed.js
  			this.options = utils.deepExtend(globOptions, options);

  			if (!this.options.element && !input) throw ReferenceError("You need to pass an element or the string that needs to be processed");

  			if (this.options.element) {
  				this.element = this.options.element;
  				this.input = this.element.innerHTML;
  			} else {
  				this.input = input;
  			}
  		}

  		/**
     * Processes the string and performs all the insertions and manipulations based on
     * the options and the input provided by the user. This is an asynchronous function using the async/await
     * feature of ES7 and this returns a promise which is resolved once the result data is ready
     * @return {string} The processes resulting string
     */

  		babelHelpers.createClass(EmbedJS, [{
  			key: 'process',
  			value: (function () {
  				var ref = babelHelpers.asyncToGenerator(regeneratorRuntime$1.mark(function _callee() {
  					var input, options, embeds, output, _process, _process2, _process3, _process4, _process5, _process6, _process7, _process8, _process9, _process10, _process11, _process12, _process13, _process14, _process15, _process16, _process17, _process18, _process19, _process20, _process21, _process22, _process23, _process24, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _process25, _process26, _process27, _process28, _process29, _process30, _process31, _process32, _process33, _process34, _process35, _process36, _ref7, _ref8;

  					return regeneratorRuntime$1.wrap(function _callee$(_context) {
  						while (1) {
  							switch (_context.prev = _context.next) {
  								case 0:
  									input = this.input;
  									options = this.options;
  									embeds = [];
  									output = '';

  									this.options.beforeEmbedJSApply();

  									if (true && options.link) {
  										output = new Url(input, options).process();
  									}
  									if (true && options.marked) {
  										output = new Markdown(output, options).process();
  									}
  									if (true && options.emoji) {
  										output = new Emoji(output, options).process();
  									}
  									if (true && options.fontIcons) {
  										output = new Smiley(output, options).process();
  									}

  									if (true && options.highlightCode && !options.marked) {
  										output = new Highlight(output, options).process();
  									}
  									if (true && utils.ifEmbed(options, 'ideone')) {
  										_process = new Ideone(input, output, options, embeds).process();
  										_process2 = babelHelpers.slicedToArray(_process, 2);
  										output = _process2[0];
  										embeds = _process2[1];
  									}
  									if (true && utils.ifEmbed(options, 'plunker')) {
  										_process3 = new Plunker(input, output, options, embeds).process();
  										_process4 = babelHelpers.slicedToArray(_process3, 2);
  										output = _process4[0];
  										embeds = _process4[1];
  									}
  									if (true && utils.ifEmbed(options, 'jsbin')) {
  										_process5 = new JsBin(input, output, options, embeds).process();
  										_process6 = babelHelpers.slicedToArray(_process5, 2);
  										output = _process6[0];
  										embeds = _process6[1];
  									}
  									if (true && utils.ifEmbed(options, 'codepen')) {
  										_process7 = new CodePen(input, output, options, embeds).process();
  										_process8 = babelHelpers.slicedToArray(_process7, 2);
  										output = _process8[0];
  										embeds = _process8[1];
  									}
  									if (true && utils.ifEmbed(options, 'jsfiddle')) {
  										_process9 = new JsFiddle(input, output, options, embeds).process();
  										_process10 = babelHelpers.slicedToArray(_process9, 2);
  										output = _process10[0];
  										embeds = _process10[1];
  									}
  									if (true && utils.ifEmbed(options, 'gist')) {
  										_process11 = new Gist(input, output, options, embeds).process();
  										_process12 = babelHelpers.slicedToArray(_process11, 2);
  										output = _process12[0];
  										embeds = _process12[1];
  									}

  									if (true && utils.ifEmbed(options, 'ted')) {
  										_process13 = new Ted(input, output, options, embeds).process();
  										_process14 = babelHelpers.slicedToArray(_process13, 2);
  										output = _process14[0];
  										embeds = _process14[1];
  									}
  									if (true && utils.ifEmbed(options, 'dailymotion')) {
  										_process15 = new Dailymotion(input, output, options, embeds).process();
  										_process16 = babelHelpers.slicedToArray(_process15, 2);
  										output = _process16[0];
  										embeds = _process16[1];
  									}
  									if (true && utils.ifEmbed(options, 'ustream')) {
  										_process17 = new Ustream(input, output, options, embeds).process();
  										_process18 = babelHelpers.slicedToArray(_process17, 2);
  										output = _process18[0];
  										embeds = _process18[1];
  									}
  									if (true && utils.ifEmbed(options, 'liveleak')) {
  										_process19 = new LiveLeak(input, output, options, embeds).process();
  										_process20 = babelHelpers.slicedToArray(_process19, 2);
  										output = _process20[0];
  										embeds = _process20[1];
  									}
  									if (true && options.videoEmbed) {
  										_process21 = new BasicVideo(input, output, options, embeds).process();
  										_process22 = babelHelpers.slicedToArray(_process21, 2);
  										output = _process22[0];
  										embeds = _process22[1];
  									}
  									if (true && utils.ifEmbed(options, 'vine')) {
  										_process23 = new Vine(input, output, options, embeds).process();
  										_process24 = babelHelpers.slicedToArray(_process23, 2);
  										output = _process24[0];
  										embeds = _process24[1];
  									}

  									if (!(true && utils.ifEmbed(options, 'youtube') && regeneratorRuntime$1)) {
  										_context.next = 29;
  										break;
  									}

  									_context.next = 25;
  									return new Youtube(input, output, options, embeds).process();

  								case 25:
  									_ref = _context.sent;
  									_ref2 = babelHelpers.slicedToArray(_ref, 2);
  									output = _ref2[0];
  									embeds = _ref2[1];

  								case 29:
  									if (!(true && utils.ifEmbed(options, 'vimeo'))) {
  										_context.next = 36;
  										break;
  									}

  									_context.next = 32;
  									return new Vimeo(input, output, options, embeds).process();

  								case 32:
  									_ref3 = _context.sent;
  									_ref4 = babelHelpers.slicedToArray(_ref3, 2);
  									output = _ref4[0];
  									embeds = _ref4[1];

  								case 36:
  									if (!(true && options.locationEmbed)) {
  										_context.next = 43;
  										break;
  									}

  									_context.next = 39;
  									return new Gmap(input, output, options, embeds).process();

  								case 39:
  									_ref5 = _context.sent;
  									_ref6 = babelHelpers.slicedToArray(_ref5, 2);
  									output = _ref6[0];
  									embeds = _ref6[1];

  								case 43:

  									if (true && utils.ifEmbed(options, 'soundcloud')) {
  										_process25 = new SoundCloud(input, output, options, embeds).process();
  										_process26 = babelHelpers.slicedToArray(_process25, 2);
  										output = _process26[0];
  										embeds = _process26[1];
  									}
  									if (true && utils.ifEmbed(options, 'spotify')) {
  										_process27 = new Spotify(input, output, options, embeds).process();
  										_process28 = babelHelpers.slicedToArray(_process27, 2);
  										output = _process28[0];
  										embeds = _process28[1];
  									}
  									if (true && options.audioEmbed) {
  										_process29 = new BasicAudio(input, output, options, embeds).process();
  										_process30 = babelHelpers.slicedToArray(_process29, 2);
  										output = _process30[0];
  										embeds = _process30[1];
  									}

  									if (true && utils.ifEmbed(options, 'flickr')) {
  										_process31 = new Flickr(input, output, options, embeds).process();
  										_process32 = babelHelpers.slicedToArray(_process31, 2);
  										output = _process32[0];
  										embeds = _process32[1];
  									}
  									if (true && utils.ifEmbed(options, 'instagram')) {
  										_process33 = new Instagram(input, output, options, embeds).process();
  										_process34 = babelHelpers.slicedToArray(_process33, 2);
  										output = _process34[0];
  										embeds = _process34[1];
  									}
  									if (true && options.imageEmbed) {
  										_process35 = new Basic(input, output, options, embeds).process();
  										_process36 = babelHelpers.slicedToArray(_process35, 2);
  										output = _process36[0];
  										embeds = _process36[1];
  									}

  									if (!(options.tweetsEmbed && true)) {
  										_context.next = 57;
  										break;
  									}

  									this.twitter = new Twitter(input, output, options, embeds);
  									_context.next = 53;
  									return this.twitter.process();

  								case 53:
  									_ref7 = _context.sent;
  									_ref8 = babelHelpers.slicedToArray(_ref7, 2);
  									output = _ref8[0];
  									embeds = _ref8[1];

  								case 57:
  									return _context.abrupt('return', utils.createText(output, embeds));

  								case 58:
  								case 'end':
  									return _context.stop();
  							}
  						}
  					}, _callee, this);
  				}));
  				return function process() {
  					return ref.apply(this, arguments);
  				};
  			})()

  			/**
      * First processes the data by calling the .process() and then renders the data in the div
      * => Loads the twitter widgets
      * => Executes the onTweetsLoad() once all the tweets have been rendered
      * => Applies video.js on the media (both audio and video)
      * => Triggers video loading on click of the video preview
      * => Executes afterEmbedJSApply() once everything is done.
      *
      * @return null
      */

  		}, {
  			key: 'render',
  			value: (function () {
  				var ref = babelHelpers.asyncToGenerator(regeneratorRuntime$1.mark(function _callee2() {
  					var event;
  					return regeneratorRuntime$1.wrap(function _callee2$(_context2) {
  						while (1) {
  							switch (_context2.prev = _context2.next) {
  								case 0:
  									if (this.element) {
  										_context2.next = 2;
  										break;
  									}

  									throw new Error('You didn\'t pass an element while creating this instance. render() method can\'t work without an element');

  								case 2:
  									_context2.next = 4;
  									return this.process();

  								case 4:
  									this.element.innerHTML = _context2.sent;

  									helper.applyVideoJS(this.options);

  									helper.play('ejs-video-thumb', this.options);

  									event = new Event('rendered');

  									this.element.dispatchEvent(event);

  									this.options.afterEmbedJSApply();

  								case 10:
  								case 'end':
  									return _context2.stop();
  							}
  						}
  					}, _callee2, this);
  				}));
  				return function render() {
  					return ref.apply(this, arguments);
  				};
  			})()

  			/**
      * returns the resulting string based on the input and the options passed by the user.
      * @param  {Function} callback Function that is executed once the data is ready
      * @return null
      */

  		}, {
  			key: 'text',
  			value: (function () {
  				var ref = babelHelpers.asyncToGenerator(regeneratorRuntime$1.mark(function _callee3(callback) {
  					var result;
  					return regeneratorRuntime$1.wrap(function _callee3$(_context3) {
  						while (1) {
  							switch (_context3.prev = _context3.next) {
  								case 0:
  									_context3.next = 2;
  									return this.process();

  								case 2:
  									result = _context3.sent;

  									callback(result, this.input);

  								case 4:
  								case 'end':
  									return _context3.stop();
  							}
  						}
  					}, _callee3, this);
  				}));
  				return function text(_x) {
  					return ref.apply(this, arguments);
  				};
  			})()

  			/**
      * The destroy method destroys all the listeners and replaces the rih text with the original text in the
      * element.
      * @return {null}
      */

  		}, {
  			key: 'destroy',
  			value: function destroy() {
  				if (!this.element) throw new Error('destroy() method only if an element had been passed in the options object');
  				helper.destroy('ejs-video-thumb');
  				this.element.removeEventListener('rendered', this.twitter.load(), false);
  				this.element.innerHTML = this.input;
  			}
  		}]);
  		return EmbedJS;
  	})();

  	window.ejs = {
  		instances: [],
  		elements: [],

  		/**
     * Sets options globally
     * @param {object} options
     */
  		setOptions: function setOptions(options) {
  			globalOptions = utils.deepExtend(defaultOptions, options);
  		},

  		/**
     * Applies embed.js to all the elements with the class name provided as option
     * @param  {string} className
     * @return {null}
     */
  		applyEmbedJS: function applyEmbedJS(className) {
  			if (className.charAt(0) === '.') className = className.substr(1);
  			this.elements = document.getElementsByClassName(className);
  			for (var i = 0; i < this.elements.length; i++) {
  				var option = {
  					element: this.elements[i]
  				};
  				this.instances[i] = new EmbedJS(option);
  				this.instances[i].render();
  			}
  		},

  		/**
     * Destroys all the instances of EmbedJS created by using ejs.applyEmbedJS method.
     * @return {null}
     */
  		destroyEmbedJS: function destroyEmbedJS() {
  			for (var i = 0; i < this.elements.length; i++) {
  				this.instances[i].destroy();
  			}
  		},

  		template: {
  			url: function url() {},
  			smiley: function smiley() {},
  			emoji: function emoji() {},
  			basicAudio: function basicAudio() {},
  			soundCloud: function soundCloud() {},
  			spotify: function spotify() {},
  			codePen: function codePen() {},
  			ideone: function ideone() {},
  			jsBin: function jsBin() {},
  			jsFiddle: function jsFiddle() {},
  			plunker: function plunker() {},
  			basicImage: function basicImage() {},
  			flickr: function flickr() {},
  			instagram: function instagram() {},
  			basicVideo: function basicVideo() {},
  			dailymotion: function dailymotion() {},
  			liveLeak: function liveLeak() {},
  			ted: function ted() {},
  			ustream: function ustream() {},
  			detailsVimeo: function detailsVimeo() {},
  			detailsYoutube: function detailsYoutube() {},
  			vine: function vine() {},
  			vimeo: function vimeo() {},
  			youtube: function youtube() {}
  		}
  	};
  	window.EmbedJS = EmbedJS;
  })(window);

}));
//# sourceMappingURL=embed.js.map