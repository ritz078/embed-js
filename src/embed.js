/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(regeneratorRuntime) {//The MIT License (MIT)
	//Copyright (c) 2014 Ritesh Kumar
	//
	//Permission is hereby granted, free of charge, to any person obtaining a copy
	//of this software and associated documentation files (the "Software"), to deal
	//in the Software without restriction, including without limitation the rights
	//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	//copies of the Software, and to permit persons to whom the Software is
	//furnished to do so, subject to the following conditions:
	//
	//    The above copyright notice and this permission notice shall be included in all
	//copies or substantial portions of the Software.
	//
	//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	//SOFTWARE.
	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _modulesUtilsEs6=__webpack_require__(3);var _modulesUtilsEs62=_interopRequireDefault(_modulesUtilsEs6);var _modulesEmoticonsEmojiEs6=__webpack_require__(4);var _modulesEmoticonsEmojiEs62=_interopRequireDefault(_modulesEmoticonsEmojiEs6);var _modulesEmoticonsSmileyEs6=__webpack_require__(5);var _modulesEmoticonsSmileyEs62=_interopRequireDefault(_modulesEmoticonsSmileyEs6);var _modulesUrlEs6=__webpack_require__(6);var _modulesUrlEs62=_interopRequireDefault(_modulesUrlEs6);var _modulesCodeCodeEs6=__webpack_require__(7);var _modulesCodeCodeEs62=_interopRequireDefault(_modulesCodeCodeEs6);var _modulesVideoVideoEs6=__webpack_require__(15);var _modulesVideoVideoEs62=_interopRequireDefault(_modulesVideoVideoEs6);var _modulesTwitterTwitterEs6=__webpack_require__(26);var _modulesTwitterTwitterEs62=_interopRequireDefault(_modulesTwitterTwitterEs6);var _modulesAudioAudioEs6=__webpack_require__(28);var _modulesAudioAudioEs62=_interopRequireDefault(_modulesAudioAudioEs6);var _modulesImageImageEs6=__webpack_require__(32);var _modulesImageImageEs62=_interopRequireDefault(_modulesImageImageEs6);var _modulesVideoHelperEs6=__webpack_require__(23);var _modulesVideoHelperEs62=_interopRequireDefault(_modulesVideoHelperEs6);(function(){var defaultOptions={link:true,linkOptions:{target:'self',exclude:['pdf']},emoji:true,fontIcons:true,highlightCode:true,videoJS:false,videojsOptions:{fluid:true,preload:'metadata'},tweetsEmbed:true,tweetOptions:{maxWidth:550,hideMedia:false,hideThread:false,align:'none',lang:'en'},imageEmbed:true,videoEmbed:true,videoHeight:null,videoWidth:null,videoDetails:true,audioEmbed:true,excludeEmbed:[],codeEmbedHeight:500,vineOptions:{maxWidth:null,type:'postcard', //'postcard' or 'simple' embedding
	responsive:true,width:350,height:460},googleAuthKey:'AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts',soundCloudOptions:{height:160,themeColor:'f50000', //Hex Code of the player theme color
	autoPlay:false,hideRelated:false,showComments:true,showUser:true,showReposts:false,visual:false, //Show/hide the big preview image
	download:false //Show/Hide download buttons
	},beforeEmbedJSApply:function beforeEmbedJSApply(){},afterEmbedJSApply:function afterEmbedJSApply(){},onVideoShow:function onVideoShow(){},onTweetsLoad:function onTweetsLoad(){},videojsCallback:function videojsCallback(){}};var EmbedJS=(function(){function EmbedJS(options,input){_classCallCheck(this,EmbedJS);this.options = _modulesUtilsEs62['default'].deepExtend(defaultOptions,options);this.element = this.options.element || input;if(!this.element){throw ReferenceError("You need to pass an element or the string that needs to be processed");}this.input = this.element.innerHTML;} /**
	         * Processes the string and performs all the insertions and manipulations based on
	         * the options and the input provided by the user. This is an asynchronous function using the async/await
	         * feature of ES7 and this returns a promise which is resolved once the result data is ready
	         * @return {string} The processes resulting string
	         */EmbedJS.prototype.process = function process(){var input,options,embeds,output,_process,_ref,_process2,_process3,twitter,result;return regeneratorRuntime.async(function process$(context$3$0){while(1) switch(context$3$0.prev = context$3$0.next){case 0:input = this.input;options = this.options;embeds = [];this.options.beforeEmbedJSApply();output = options.link?new _modulesUrlEs62['default'](input,options).process():output;output = options.emoji?new _modulesEmoticonsEmojiEs62['default'](output,options).process():output;output = options.fontIcons?new _modulesEmoticonsSmileyEs62['default'](output,options).process():output;_process = new _modulesCodeCodeEs62['default'](input,output,options,embeds).process();output = _process[0];embeds = _process[1];context$3$0.next = 12;return regeneratorRuntime.awrap(new _modulesVideoVideoEs62['default'](input,output,options,embeds).process());case 12:_ref = context$3$0.sent;output = _ref[0];embeds = _ref[1];_process2 = new _modulesAudioAudioEs62['default'](input,output,options,embeds).process();output = _process2[0];embeds = _process2[1];_process3 = new _modulesImageImageEs62['default'](input,output,options,embeds).process();output = _process3[0];embeds = _process3[1];if(!options.tweetsEmbed){context$3$0.next = 31;break;}twitter = new _modulesTwitterTwitterEs62['default'](input,options,embeds);if(!options.tweetsEmbed){context$3$0.next = 29;break;}context$3$0.next = 26;return regeneratorRuntime.awrap(twitter.process());case 26:context$3$0.t0 = context$3$0.sent;context$3$0.next = 30;break;case 29:context$3$0.t0 = output;case 30:embeds = context$3$0.t0;case 31:result = _modulesUtilsEs62['default'].createText(output,embeds);return context$3$0.abrupt('return',result);case 33:case 'end':return context$3$0.stop();}},null,this);}; /**
	         * First processes the data by calling the .process() and then renders the data in the div
	         * => Loads the twitter widgets
	         * => Executes the onTweetsLoad() once all the tweets have been rendered
	         * => Applies video.js on the media (both audio and video)
	         * => Triggers video loading on click of the video preview
	         * => Executes afterEmbedJSApply() once everything is done.
	         *
	         * @return {}
	         */EmbedJS.prototype.render = function render(){var result;return regeneratorRuntime.async(function render$(context$3$0){var _this=this;while(1) switch(context$3$0.prev = context$3$0.next){case 0:context$3$0.next = 2;return regeneratorRuntime.awrap(this.process());case 2:result = context$3$0.sent;this.options.element.innerHTML = result;if(twttr){ //Load twitter data with styling
	twttr.widgets.load(this.options.element); //Execute the function after the widget is loaded
	twttr.events.bind('loaded',function(){_this.options.onTweetsLoad();});}_modulesVideoHelperEs62['default'].applyVideoJS(this.options);_modulesVideoHelperEs62['default'].play('ejs-video-thumb',this.options);this.options.afterEmbedJSApply();case 8:case 'end':return context$3$0.stop();}},null,this);}; /**
	         * returns the resulting string based on the input and the options passed by the user.
	         * @param  {Function} callback Function that is executed once the data is ready
	         * @return {}
	         */EmbedJS.prototype.text = function text(callback){var result;return regeneratorRuntime.async(function text$(context$3$0){while(1) switch(context$3$0.prev = context$3$0.next){case 0:context$3$0.next = 2;return regeneratorRuntime.awrap(this.process());case 2:result = context$3$0.sent;callback(result);case 4:case 'end':return context$3$0.stop();}},null,this);};return EmbedJS;})();window.EmbedJS = EmbedJS;})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*** IMPORTS FROM imports-loader ***/
	(function() {
	
	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
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
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
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
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
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
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
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
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
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
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
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
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
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
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
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
	          arg = undefined;
	
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
	            context.sent = undefined;
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
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
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
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
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
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
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
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
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
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
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
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
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
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.regeneratorRuntime}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';var utils={ /**
	     * Trucates the string and adds ellipsis at the end.
	     * @param string        The string to be truncated
	     * @param n             Length to which it should be truncated
	     * @returns {string}    The truncated string
	     */truncate:function truncate(string,n){return string.substr(0,n - 1) + (string.length > n?'...':'');}, /**
	     * Returns an array after removing the duplicates.
	     * @param array         The array containing the duplicates
	     * @returns {Array}     Array with unique values.
	     */getUnique:function getUnique(array){var u={},a=[];array.forEach(function(value){if(!u.hasOwnProperty(value)){a.push(value);u[value] = 1;}});return a;}, /**
	     * Converts a string into legitimate url.
	     * @param string
	     */toUrl:function toUrl(string){var url;if(string.indexOf('//') == -1){url = '//' + string;}else {url = string;}return url;}, /**
	     * Extends an Object
	     * @param destination
	     * @param source
	     * @returns {*}
	     */deepExtend:function deepExtend(destination,source){for(var property in source) {if(source[property] && source[property].constructor === Object){destination[property] = destination[property] || {};this.deepExtend(destination[property],source[property]);}else {destination[property] = source[property];}}return destination;},escapeRegExp:function escapeRegExp(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,'\\$&');}, /**
	     * Sort an array of objects based on the index value
	     * @param  {Array} arr Array to be sorted
	     * @return {Array}     Sorted array
	     */sortObject:function sortObject(arr){return arr.sort(function(a,b){return a.index - b.index;});}, /**
	     * Creates the string of the iframes after sorting them and finally returning a string
	     * @param  {sring} str    String to which the created text has to be added
	     * @param  {object} embeds Sorted array of iframe html
	     * @return {string}        String to be rendered
	     */createText:function createText(str,embeds){var sortedEmbeds=this.sortObject(embeds);for(var _iterator=sortedEmbeds,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[Symbol.iterator]();;) {var _ref;if(_isArray){if(_i >= _iterator.length)break;_ref = _iterator[_i++];}else {_i = _iterator.next();if(_i.done)break;_ref = _i.value;}var embed=_ref;str += ' ' + embed.text;}return str;}, /**
	     * Matches the string and finds the substrings matching to the provided regex pattern
	     * @param  {object} regex Regex pattern
	     * @param  {string} input The string to be analyzed
	     * @return {object}       Returns the matched substring with their corresponding positions
	     */matches:function matches(regex,input){return regex.exec(input);}, /**
	     * Checks wheteher a particular service should be embedded or no based on
	     * the setting provided by the user
	     * @param  {object} options The options provided by the user
	     * @param  {string} service Name of the service for which the condition is to be analyzed
	     * @return {boolean}        True if it should be embedded
	     */ifEmbed:function ifEmbed(options,service){return options.excludeEmbed.indexOf(service) == -1 && options.excludeEmbed !== 'all';}, /**
	     * Calculates the dimensions for the elements based on a aspect ratio
	     * @param  {object} options Plugin options
	     * @return {object}         The width and height of the elements
	     */dimensions:function dimensions(options){var dimensions={width:options.videoWidth,height:options.videoHeight};if(options.videoHeight && options.videoWidth){return dimensions;}else if(options.videoHeight){dimensions.width = options.videoHeight / 390 * 640;return dimensions;}else if(options.videoWidth){dimensions.height = dimensions.width / 640 * 390;return dimensions;}else {var _ref2=[640,390];dimensions.width = _ref2[0];dimensions.height = _ref2[1];return dimensions;}}};module.exports = utils;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Emoji=(function(){function Emoji(input){_classCallCheck(this,Emoji);this.input = input;this.emojiList = ['bowtie','smile','laughing','blush','smiley','relaxed','smirk','heart_eyes','kissing_heart','kissing_closed_eyes','flushed','relieved','satisfied','grin','wink','stuck_out_tongue_winking_eye','stuck_out_tongue_closed_eyes','grinning','kissing','winky_face','kissing_smiling_eyes','stuck_out_tongue','sleeping','worried','frowning','anguished','open_mouth','grimacing','confused','hushed','expressionless','unamused','sweat_smile','sweat','wow','disappointed_relieved','weary','pensive','disappointed','confounded','fearful','cold_sweat','persevere','cry','sob','joy','astonished','scream','neckbeard','tired_face','angry','rage','triumph','sleepy','yum','mask','sunglasses','dizzy_face','imp','smiling_imp','neutral_face','no_mouth','innocent','alien','yellow_heart','blue_heart','purple_heart','heart','green_heart','broken_heart','heartbeat','heartpulse','two_hearts','revolving_hearts','cupid','sparkling_heart','sparkles','star','star2','dizzy','boom','collision','anger','exclamation','question','grey_exclamation','grey_question','zzz','dash','sweat_drops','notes','musical_note','fire','hankey','poop','shit','\\+1','thumbsup','-1','thumbsdown','ok_hand','punch','facepunch','fist','v','wave','hand','raised_hand','open_hands','point_up','point_down','point_left','point_right','raised_hands','pray','point_up_2','clap','muscle','metal','fu','walking','runner','running','couple','family','two_men_holding_hands','two_women_holding_hands','dancer','dancers','ok_woman','no_good','information_desk_person','raising_hand','bride_with_veil','person_with_pouting_face','person_frowning','bow','couplekiss','couple_with_heart','massage','haircut','nail_care','boy','girl','woman','man','baby','older_woman','older_man','person_with_blond_hair','man_with_gua_pi_mao','man_with_turban','construction_worker','cop','angel','princess','smiley_cat','smile_cat','heart_eyes_cat','kissing_cat','smirk_cat','scream_cat','crying_cat_face','joy_cat','pouting_cat','japanese_ogre','japanese_goblin','see_no_evil','hear_no_evil','speak_no_evil','guardsman','skull','feet','lips','kiss','droplet','ear','eyes','nose','tongue','love_letter','bust_in_silhouette','busts_in_silhouette','speech_balloon','thought_balloon','feelsgood','finnadie','goberserk','godmode','hurtrealbad','rage1','rage2','rage3','rage4','suspect','trollface','sunny','umbrella','cloud','snowflake','snowman','zap','cyclone','foggy','ocean','cat','dog','mouse','hamster','rabbit','wolf','frog','tiger','koala','bear','pig','pig_nose','cow','boar','monkey_face','monkey','horse','racehorse','camel','sheep','elephant','panda_face','snake','bird','baby_chick','hatched_chick','hatching_chick','chicken','penguin','turtle','bug','honeybee','ant','beetle','snail','octopus','tropical_fish','fish','whale','whale2','dolphin','cow2','ram','rat','water_buffalo','tiger2','rabbit2','dragon','goat','rooster','dog2','pig2','mouse2','ox','dragon_face','blowfish','crocodile','dromedary_camel','leopard','cat2','poodle','paw_prints','bouquet','cherry_blossom','tulip','four_leaf_clover','rose','sunflower','hibiscus','maple_leaf','leaves','fallen_leaf','herb','mushroom','cactus','palm_tree','evergreen_tree','deciduous_tree','chestnut','seedling','blossom','ear_of_rice','shell','globe_with_meridians','sun_with_face','full_moon_with_face','new_moon_with_face','new_moon','waxing_crescent_moon','first_quarter_moon','waxing_gibbous_moon','full_moon','waning_gibbous_moon','last_quarter_moon','waning_crescent_moon','last_quarter_moon_with_face','first_quarter_moon_with_face','moon','earth_africa','earth_americas','earth_asia','volcano','milky_way','partly_sunny','octocat','squirrel','bamboo','gift_heart','dolls','school_satchel','mortar_board','flags','fireworks','sparkler','wind_chime','rice_scene','jack_o_lantern','ghost','santa','christmas_tree','gift','bell','no_bell','tanabata_tree','tada','confetti_ball','balloon','crystal_ball','cd','dvd','floppy_disk','camera','video_camera','movie_camera','computer','tv','iphone','phone','telephone','telephone_receiver','pager','fax','minidisc','vhs','sound','speaker','mute','loudspeaker','mega','hourglass','hourglass_flowing_sand','alarm_clock','watch','radio','satellite','loop','mag','mag_right','unlock','lock','lock_with_ink_pen','closed_lock_with_key','key','bulb','flashlight','high_brightness','low_brightness','electric_plug','battery','calling','email','mailbox','postbox','bath','bathtub','shower','toilet','wrench','nut_and_bolt','hammer','seat','moneybag','yen','dollar','pound','euro','credit_card','money_with_wings','e-mail','inbox_tray','outbox_tray','envelope','incoming_envelope','postal_horn','mailbox_closed','mailbox_with_mail','mailbox_with_no_mail','door','smoking','bomb','gun','hocho','pill','syringe','page_facing_up','page_with_curl','bookmark_tabs','bar_chart','chart_with_upwards_trend','chart_with_downwards_trend','scroll','clipboard','calendar','date','card_index','file_folder','open_file_folder','scissors','pushpin','paperclip','black_nib','pencil2','straight_ruler','triangular_ruler','closed_book','green_book','blue_book','orange_book','notebook','notebook_with_decorative_cover','ledger','books','bookmark','name_badge','microscope','telescope','newspaper','football','basketball','soccer','baseball','tennis','8ball','rugby_football','bowling','golf','mountain_bicyclist','bicyclist','horse_racing','snowboarder','swimmer','surfer','ski','spades','hearts','clubs','diamonds','gem','ring','trophy','musical_score','musical_keyboard','violin','space_invader','video_game','black_joker','flower_playing_cards','game_die','dart','mahjong','clapper','memo','pencil','book','art','microphone','headphones','trumpet','saxophone','guitar','shoe','sandal','high_heel','lipstick','boot','shirt','tshirt','necktie','womans_clothes','dress','running_shirt_with_sash','jeans','kimono','bikini','ribbon','tophat','crown','womans_hat','mans_shoe','closed_umbrella','briefcase','handbag','pouch','purse','eyeglasses','fishing_pole_and_fish','coffee','tea','sake','baby_bottle','beer','beers','cocktail','tropical_drink','wine_glass','fork_and_knife','pizza','hamburger','fries','poultry_leg','meat_on_bone','spaghetti','curry','fried_shrimp','bento','sushi','fish_cake','rice_ball','rice_cracker','rice','ramen','stew','oden','dango','egg','bread','doughnut','custard','icecream','ice_cream','shaved_ice','birthday','cake','cookie','chocolate_bar','candy','lollipop','honey_pot','apple','green_apple','tangerine','lemon','cherries','grapes','watermelon','strawberry','peach','melon','banana','pear','pineapple','sweet_potato','eggplant','tomato','corn','house','house_with_garden','school','office','post_office','hospital','bank','convenience_store','love_hotel','hotel','wedding','church','department_store','european_post_office','city_sunrise','city_sunset','japanese_castle','european_castle','tent','factory','tokyo_tower','japan','mount_fuji','sunrise_over_mountains','sunrise','stars','themoreyouknow','tmyk','statue_of_liberty','bridge_at_night','carousel_horse','rainbow','ferris_wheel','fountain','roller_coaster','ship','speedboat','boat','sailboat','rowboat','anchor','rocket','airplane','helicopter','steam_locomotive','tram','mountain_railway','bike','aerial_tramway','suspension_railway','mountain_cableway','tractor','blue_car','oncoming_automobile','car','red_car','taxi','oncoming_taxi','articulated_lorry','bus','oncoming_bus','rotating_light','police_car','oncoming_police_car','fire_engine','ambulance','minibus','truck','train','station','train2','bullettrain_front','bullettrain_side','light_rail','monorail','railway_car','trolleybus','ticket','fuelpump','vertical_traffic_light','traffic_light','warning','construction','beginner','atm','slot_machine','busstop','barber','hotsprings','checkered_flag','crossed_flags','izakaya_lantern','moyai','circus_tent','performing_arts','round_pushpin','triangular_flag_on_post','jp','kr','cn','us','fr','es','it','ru','gb','uk','de','one','two','three','four','five','six','seven','eight','nine','keycap_ten','1234','zero','hash','symbols','arrow_backward','arrow_down','arrow_forward','arrow_left','capital_abcd','abcd','abc','arrow_lower_left','arrow_lower_right','arrow_right','arrow_up','arrow_upper_left','arrow_upper_right','arrow_double_down','arrow_double_up','arrow_down_small','arrow_heading_down','arrow_heading_up','leftwards_arrow_with_hook','arrow_right_hook','left_right_arrow','arrow_up_down','arrow_up_small','arrows_clockwise','arrows_counterclockwise','rewind','fast_forward','information_source','ok','twisted_rightwards_arrows','repeat','repeat_one','new','top','up','cool','free','ng','cinema','koko','signal_strength','u5272','u5408','u55b6','u6307','u6708','u6709','u6e80','u7121','u7533','u7a7a','u7981','sa','restroom','mens','womens','baby_symbol','no_smoking','parking','wheelchair','metro','baggage_claim','accept','wc','potable_water','put_litter_in_its_place','secret','congratulations','m','passport_control','left_luggage','customs','ideograph_advantage','cl','sos','id','no_entry_sign','underage','no_mobile_phones','do_not_litter','non-potable_water','no_bicycles','no_pedestrians','children_crossing','no_entry','eight_spoked_asterisk','eight_pointed_black_star','heart_decoration','vs','vibration_mode','mobile_phone_off','chart','currency_exchange','aries','taurus','gemini','cancer','leo','virgo','libra','scorpius','sagittarius','capricorn','aquarius','pisces','ophiuchus','six_pointed_star','negative_squared_cross_mark','a','b','ab','o2','diamond_shape_with_a_dot_inside','recycle','end','on','soon','clock1','clock130','clock10','clock1030','clock11','clock1130','clock12','clock1230','clock2','clock230','clock3','clock330','clock4','clock430','clock5','clock530','clock6','clock630','clock7','clock730','clock8','clock830','clock9','clock930','heavy_dollar_sign','copyright','registered','tm','x','heavy_exclamation_mark','bangbang','interrobang','o','heavy_multiplication_x','heavy_plus_sign','heavy_minus_sign','heavy_division_sign','white_flower','100','heavy_check_mark','ballot_box_with_check','radio_button','link','curly_loop','wavy_dash','part_alternation_mark','trident','black_square','white_square','white_check_mark','black_square_button','white_square_button','black_circle','white_circle','red_circle','large_blue_circle','large_blue_diamond','large_orange_diamond','small_blue_diamond','small_orange_diamond','small_red_triangle','small_red_triangle_down','shipit'];this.emojiRegex = new RegExp(':(' + this.emojiList.join('|') + '):','g');}Emoji.prototype.process = function process(){return this.input.replace(this.emojiRegex,function(match,text){return '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';});};return Emoji;})();module.exports = Emoji;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var Smiley=(function(){function Smiley(input){_classCallCheck(this,Smiley);this.input = ' ' + input + ' '; //hack to consider the first and last element
	this.icons = [{'text':' :) ','code':'e60a'},{'text':' :D ','code':'e608'},{'text':' :d ','code':'e608'},{'text':' :( ','code':'e60e'},{'text':' :/ ','code':'e620'},{'text':' :P ','code':'e60c'},{'text':' :p ','code':'e60c'},{'text':' 3:) ','code':'e618'},{'text':' (^) ','code':'e607'},{'text':' ;) ','code':'e610'},{'text':' :o ','code':'e61a'},{'text':' -_- ','code':'e61e'},{'text':' (y) ','code':'e606'},{'text':' :* ','code':'e604'},{'text':' &lt;3 ','code':'e604'},{'text':' <3 ','code':'e604'},{'text':' &lt;/3 ','code':'e605'},{'text':' </3 ','code':'e605'},{'text':' ^_^ ','code':'e612'},{'text':' 8-) ','code':'e614'},{'text':' 8| ','code':'e614'},{'text':' :S ','code':'e61c'},{'text':' :s ','code':'e61c'}];this.EscapedSymbols = this.icons.map(function(val){return '' + _utilsEs62['default'].escapeRegExp(val.text);});this.smileyRegex = new RegExp('(' + this.EscapedSymbols.join('|') + ')','g');}Smiley.prototype.process = function process(){var _this=this;var processedString=this.input.replace(this.smileyRegex,function(match,text){var index=_this.EscapedSymbols.indexOf(_utilsEs62['default'].escapeRegExp(text));var code=_this.icons[index].code;return ' <span class="icon-emoticon" title="' + text + '">&#x' + code + '</span> ';});return processedString.substring(1,processedString.length - 1);};return Smiley;})();module.exports = Smiley;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _modulesUtilsEs6=__webpack_require__(3);var _modulesUtilsEs62=_interopRequireDefault(_modulesUtilsEs6);var Url=(function(){function Url(input,options){_classCallCheck(this,Url);this.input = input;this.options = options;this.urlRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi;}Url.prototype.process = function process(){var config=this.options.linkOptions;return this.input.replace(this.urlRegex,function(match){var extension=match.split('.')[match.split('.').length - 1];if(config.exclude.indexOf(extension) === -1){return '<a href="' + _modulesUtilsEs62['default'].toUrl(match) + '" target="' + config.target + '">' + match + '</a>';}return match;});};return Url;})();module.exports = Url;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _highlightEs6=__webpack_require__(8);var _highlightEs62=_interopRequireDefault(_highlightEs6);var _ideoneEs6=__webpack_require__(9);var _ideoneEs62=_interopRequireDefault(_ideoneEs6);var _plunkerEs6=__webpack_require__(11);var _plunkerEs62=_interopRequireDefault(_plunkerEs6);var _jsbinEs6=__webpack_require__(12);var _jsbinEs62=_interopRequireDefault(_jsbinEs6);var _codepenEs6=__webpack_require__(13);var _codepenEs62=_interopRequireDefault(_codepenEs6);var _jsfiddleEs6=__webpack_require__(14);var _jsfiddleEs62=_interopRequireDefault(_jsfiddleEs6);var Code=(function(){function Code(input,output,options,embeds){_classCallCheck(this,Code);this.input = input;this.output = output;this.options = options;this.embeds = embeds;}Code.prototype.process = function process(){try{var output=this.output;var embeds=this.embeds;output = this.options.highlightCode?new _highlightEs62['default'](output,this.options).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'ideone')?new _ideoneEs62['default'](this.input,this.options,embeds).process():embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'plunker')?new _plunkerEs62['default'](this.input,this.options,embeds).process():embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'jsbin')?new _jsbinEs62['default'](this.input,this.options,embeds).process():embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'codepen')?new _codepenEs62['default'](this.input,this.options,embeds).process():embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'jsfiddle')?new _jsfiddleEs62['default'](this.input,this.options,embeds).process():embeds;return [output,embeds];}catch(error) {console.log(error);}};return Code;})();module.exports = Code;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var Highlight=(function(){function Highlight(input,options){_classCallCheck(this,Highlight);if(!hljs){throw new ReferenceError('\'hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/\'');}this.input = input;this.options = options;} /**
	     * Encodes the characters like <, > and space and replaces them with
	     * &lt;, &gt; and &gt; respectively.
	     * @param  {string} code The string that has to be encoded.
	     * @return {string}      The encoded string
	     */Highlight.prototype.encode = function encode(code){code = code.replace(/&amp;/gm,'');code = code.replace(/&lt;/g,'<');code = code.replace(/&gt;/g,'>');return code;}; /**
	     * removes whitespace characters
	     * @param  {string} code The string from which the whitespace has to be removed
	     * @return {string}
	     */Highlight.prototype.trimSpace = function trimSpace(code){code = code.replace(/^([ \t]*)/g,''); // leading whitespace
	code = code.replace(/[ \t]*$/g,''); // trailing whitespace
	return code;}; /**
	     * Places the code and the language name in the required template
	     * @param {string} processedCode
	     * @param {string} language
	     * @return {string}
	     */Highlight.prototype.addTemplate = function addTemplate(processedCode,language){var template='<pre>\n            <code class="ejs-code hljs ' + language + '">' + processedCode.value + '</code>\n        </pre>\n        ';return template;};Highlight.prototype.process = function process(){var _this=this;var regex=/(`+)(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm;var input=this.input.replace(regex,function(match,group1,group2,group3){var code=group3;code = _this.trimSpace(code);code = _this.encode(code); // to prevent auto-linking. Not necessary in code
	// *blocks*, but in code spans. Will be converted
	// back after the auto-linker runs.
	code = code.replace(/:\/\//g,'~P');var language=group2.split('\n')[0];var highlightedCode=undefined;if(language){highlightedCode = hljs.highlightAuto(code,[language]);}else {highlightedCode = hljs.highlightAuto(code);language = highlightedCode.language;}return _this.addTemplate(highlightedCode,language);});return input;};return Highlight;})();module.exports = Highlight;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Ideone=(function(_Base){_inherits(Ideone,_Base);function Ideone(input,options,embeds){_classCallCheck(this,Ideone);_Base.call(this,input,options,embeds);this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi;}Ideone.prototype.template = function template(match){var template='<div class="ejs-ideone ejs-embed">\n\t\t\t<iframe src="http://ideone.com/embed/' + match.split('/') + '" frameborder="0" height="' + this.options.codeEmbedHeight + '"></iframe>\',\n\t\t</div>';return template;};return Ideone;})(_baseEs62['default']);module.exports = Ideone;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var Base=(function(){function Base(input,options,embeds){_classCallCheck(this,Base);this.input = input;this.options = options;this.embeds = embeds;}Base.prototype.process = function process(){var match=undefined;while((match = _utilsEs62['default'].matches(this.regex,this.input)) !== null) {var text=this.template(match[0]);this.embeds.push({text:text,index:match.index});}return this.embeds;};return Base;})();module.exports = Base;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Plunker=(function(_Base){_inherits(Plunker,_Base);function Plunker(input,options,embeds){_classCallCheck(this,Plunker);_Base.call(this,input,options,embeds);this.regex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi;}Plunker.prototype.template = function template(match){var id=match.indexOf('?') === -1?match.split('/')[2]:match.split('/')[2].split('?')[0];var template='<div class="ejs-embed ejs-plunker">\n            <iframe class="ne-plunker" src="http://embed.plnkr.co/' + id + '" height="' + this.options.codeEmbedHeight + '"></iframe>\n        </div>';return template;};return Plunker;})(_baseEs62['default']);module.exports = Plunker;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var JsBin=(function(_Base){_inherits(JsBin,_Base);function JsBin(input,options,embeds){_classCallCheck(this,JsBin);_Base.call(this,input,options,embeds);this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi;}JsBin.prototype.template = function template(id){var template='<div class="ejs-jsbin ejs-embed">\n\t\t<iframe height="' + this.options.codeEmbedHeight + '" class="jsbin-embed foo" src="http://' + id + '/embed?html,js,output"></iframe>\',\n\t\t</div>';return template;};return JsBin;})(_baseEs62['default']);module.exports = JsBin;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var CodePen=(function(_Base){_inherits(CodePen,_Base);function CodePen(input,options,embeds){_classCallCheck(this,CodePen);_Base.call(this,input,options,embeds);this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi;}CodePen.prototype.template = function template(id){var template='<div class="ejs-embed ejs-codepen">\n\t\t<iframe scrolling="no" height="' + this.options.codeEmbedHeight + '" src="' + id.replace(/\/pen\//,'/embed/') + '/?height=' + this.options.codeEmbedHeight + '"></iframe>\'\n\t\t</div>';return template;};return CodePen;})(_baseEs62['default']);module.exports = CodePen;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var JsFiddle=(function(_Base){_inherits(JsFiddle,_Base);function JsFiddle(input,options,embeds){_classCallCheck(this,JsFiddle);_Base.call(this,input,options,embeds);this.regex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi;}JsFiddle.prototype.template = function template(id){var template='<div class="ejs-embed ejs-jsfiddle">\n\t\t<iframe height="' + this.options.codeEmbedHeight + '" src="http://' + id + '/embedded"></iframe>\n\t\t</div>';return template;};return JsFiddle;})(_baseEs62['default']);module.exports = JsFiddle;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(regeneratorRuntime) {'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _tedEs6=__webpack_require__(16);var _tedEs62=_interopRequireDefault(_tedEs6);var _dailymotionEs6=__webpack_require__(17);var _dailymotionEs62=_interopRequireDefault(_dailymotionEs6);var _ustreamEs6=__webpack_require__(18);var _ustreamEs62=_interopRequireDefault(_ustreamEs6);var _liveleakEs6=__webpack_require__(19);var _liveleakEs62=_interopRequireDefault(_liveleakEs6);var _vineEs6=__webpack_require__(20);var _vineEs62=_interopRequireDefault(_vineEs6);var _youtubeEs6=__webpack_require__(21);var _youtubeEs62=_interopRequireDefault(_youtubeEs6);var _vimeoEs6=__webpack_require__(24);var _vimeoEs62=_interopRequireDefault(_vimeoEs6);var _basicEs6=__webpack_require__(25);var _basicEs62=_interopRequireDefault(_basicEs6);var Video=(function(){function Video(input,output,options,embeds){_classCallCheck(this,Video);this.input = input;this.output = output;this.options = options;this.embeds = embeds;}Video.prototype.process = function process(){var input,output,embeds;return regeneratorRuntime.async(function process$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:input = this.input;output = this.output;embeds = this.embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'ted')?new _tedEs62['default'](input,this.options,embeds).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'dailymotion')?new _dailymotionEs62['default'](input,this.options,embeds).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'ustream')?new _ustreamEs62['default'](input,this.options,embeds).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'liveleak')?new _liveleakEs62['default'](input,this.options,embeds).process():output;embeds = this.options.videoEmbed?new _basicEs62['default'](input,this.options,embeds).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'vine')?new _vineEs62['default'](input,this.options,embeds).process():output;if(!_utilsEs62['default'].ifEmbed(this.options,'youtube')){context$2$0.next = 15;break;}context$2$0.next = 12;return regeneratorRuntime.awrap(new _youtubeEs62['default'](input,this.options,embeds).process());case 12:context$2$0.t0 = context$2$0.sent;context$2$0.next = 16;break;case 15:context$2$0.t0 = output;case 16:embeds = context$2$0.t0;if(!_utilsEs62['default'].ifEmbed(this.options,'vimeo')){context$2$0.next = 23;break;}context$2$0.next = 20;return regeneratorRuntime.awrap(new _vimeoEs62['default'](input,this.options,embeds).process());case 20:context$2$0.t1 = context$2$0.sent;context$2$0.next = 24;break;case 23:context$2$0.t1 = output;case 24:embeds = context$2$0.t1;return context$2$0.abrupt('return',[output,embeds]);case 26:case 'end':return context$2$0.stop();}},null,this);};return Video;})();module.exports = Video;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Ted=(function(_Base){_inherits(Ted,_Base);function Ted(input,options,embeds){_classCallCheck(this,Ted);_Base.call(this,input,options,embeds);this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi;}Ted.prototype.template = function template(id){var dimensions=_utilsEs62['default'].dimensions(this.options);var template='<div class="ejs-embed">\n\t\t\t<iframe src="http://embed.ted.com/talks/' + id.split('/')[2] + '.html" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\n\t\t</div>';return template;};return Ted;})(_baseEs62['default']);module.exports = Ted;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Dailymotion=(function(_Base){_inherits(Dailymotion,_Base);function Dailymotion(input,options,embeds){_classCallCheck(this,Dailymotion);_Base.call(this,input,options,embeds);this.regex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi;}Dailymotion.prototype.template = function template(match){var dimensions=_utilsEs62['default'].dimensions(this.options);var id=match.split('/')[2];var template='<div class="ejs-video">\n\t\t<iframe src="http://www.dailymotion.com/embed/video/' + id + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\n\t\t</div>';return template;};return Dailymotion;})(_baseEs62['default']);module.exports = Dailymotion;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Ustream=(function(_Base){_inherits(Ustream,_Base);function Ustream(input,options,embeds){_classCallCheck(this,Ustream);_Base.call(this,input,options,embeds);this.regex = /ustream.tv\/[a-z\/0-9]*/gi;}Ustream.prototype.template = function template(match){var id=match.split('/');id.splice(1,0,'embed');var dimensions=_utilsEs62['default'].dimensions(this.options);var template='<div class="ejs-embed">\n\t\t<iframe src="//www.' + id.join('/') + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\',\n\t\t\'</div>\'';return template;};return Ustream;})(_baseEs62['default']);module.exports = Ustream;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var LiveLeak=(function(_Base){_inherits(LiveLeak,_Base);function LiveLeak(input,options,embeds){_classCallCheck(this,LiveLeak);_Base.call(this,input,options,embeds);this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi;}LiveLeak.prototype.template = function template(match){var dimensions=_utilsEs62['default'].dimensions(this.options);var template='<div class="ejs-video">\n\t\t<iframe src="http://www.liveleak.com/e/' + match.split('=')[1] + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\n\t\t</div>';return template;};return LiveLeak;})(_baseEs62['default']);module.exports = LiveLeak;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Vine=(function(_Base){_inherits(Vine,_Base);function Vine(input,options,embeds){_classCallCheck(this,Vine);_Base.call(this,input,options,embeds);this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi;}Vine.prototype.template = function template(match){var config=this.options.vineOptions;var template='<div class="ejs-vine">\n\t\t<iframe class="ejs-vine-iframe" src="https://vine.co/v/' + match.split('/')[2] + '/embed/' + config.type + '" height="' + config.height + '" width="' + config.width + '"></iframe>\n\t\t</div>';return template;};return Vine;})(_baseEs62['default']);module.exports = Vine;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(regeneratorRuntime, fetch) {'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _helperEs6=__webpack_require__(23);var _helperEs62=_interopRequireDefault(_helperEs6);var Youtube=(function(){function Youtube(input,options,embeds){_classCallCheck(this,Youtube);this.input = input;this.options = options;this.embeds = embeds;this.regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi;}Youtube.prototype.formatData = function formatData(data){return {title:data.snippet.title,thumbnail:data.snippet.thumbnails.medium.url,rawDescription:data.snippet.description,views:data.statistics.viewCount,likes:data.statistics.likeCount,description:_utilsEs62['default'].truncate(data.snippet.description,150),url:'https://www.youtube.com/watch?v=' + data.id,id:data.id,host:'youtube'};};Youtube.prototype.data = function data(id){var url,response,data;return regeneratorRuntime.async(function data$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:context$2$0.prev = 0;url = 'https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=' + this.options.googleAuthKey + '&part=snippet,statistics';context$2$0.next = 4;return regeneratorRuntime.awrap(fetch(url));case 4:response = context$2$0.sent;context$2$0.next = 7;return regeneratorRuntime.awrap(response.json());case 7:data = context$2$0.sent;return context$2$0.abrupt('return',data.items[0]);case 11:context$2$0.prev = 11;context$2$0.t0 = context$2$0['catch'](0);console.log(context$2$0.t0);case 14:case 'end':return context$2$0.stop();}},null,this,[[0,11]]);};Youtube.prototype.process = function process(){var match,embedUrl,data,text;return regeneratorRuntime.async(function process$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:context$2$0.prev = 0;match = undefined;case 2:if(!((match = _utilsEs62['default'].matches(this.regex,this.input)) !== null)){context$2$0.next = 16;break;}embedUrl = 'https://www.youtube.com/embed/' + match[1];data = undefined,text = undefined;if(!this.options.videoDetails){context$2$0.next = 12;break;}context$2$0.next = 8;return regeneratorRuntime.awrap(this.data(match[1]));case 8:data = context$2$0.sent;text = _helperEs62['default'].detailsTemplate(this.formatData(data),embedUrl);context$2$0.next = 13;break;case 12:text = _helperEs62['default'].template(embedUrl,this.options);case 13:this.embeds.push({text:text,index:match.index});context$2$0.next = 2;break;case 16:return context$2$0.abrupt('return',this.embeds);case 19:context$2$0.prev = 19;context$2$0.t0 = context$2$0['catch'](0);console.log(context$2$0.t0);case 22:case 'end':return context$2$0.stop();}},null,this,[[0,19]]);};return Youtube;})();module.exports = Youtube;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(22)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	(function() {
	
	(function() {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = name.toString();
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }
	    return value
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(url, options) {
	    options = options || {}
	    this.url = url
	
	    this.credentials = options.credentials || 'omit'
	    this.headers = new Headers(options.headers)
	    this.method = normalizeMethod(options.method || 'GET')
	    this.mode = options.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(options.body)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }
	
	  Body.call(Response.prototype)
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function(input, init) {
	    // TODO: Request constructor should accept input, init
	    var request
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input
	    } else {
	      request = new Request(input, init)
	    }
	
	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return;
	      }
	
	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();
	
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = global.fetch}.call(global));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var helper={play:function play(className,options){var classes=document.getElementsByClassName(className);for(var i=0;i < classes.length;i++) {classes[i].addEventListener('click',function(){options.onVideoShow();var url=this.getAttribute('data-ejs-url');var template=helper.template(url,options);this.parentNode.parentNode.innerHTML = template;},false);}},template:function template(url,options){var dimensions=_utilsEs62['default'].dimensions(options);var template='<div class="ejs-video-player">\n        <iframe src="' + url + '" frameBorder="0" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n        </div>';return template;},detailsTemplate:function detailsTemplate(data,embedUrl){var template='<div class="ejs-video">\n        <div class="ejs-video-preview">\n        <div class="ejs-video-thumb" data-ejs-url="' + embedUrl + '">\n        <img src="' + data.thumbnail + '" alt="' + data.host + '/' + data.id + '"/>\n        <i class="fa fa-play-circle-o"></i>\n        </div>\n        <div class="ejs-video-detail">\n        <div class="ejs-video-title">\n        <a href="' + data.url + '">' + data.title + '</a>\n        </div>\n        <div class="ejs-video-desc">' + data.description + '</div>\n        <div class="ejs-video-stats">\n        <span><i class="fa fa-eye"></i>' + data.views + '</span>\n        <span><i class="fa fa-heart"></i>' + data.likes + '</span>\n        </div>\n        </div>\n        </div>\n        </div>';return template;},applyVideoJS:function applyVideoJS(options){var dimensions=_utilsEs62['default'].dimensions(options);options.videojsOptions.width = dimensions.width;options.videojsOptions.height = dimensions.height;if(options.videoJS){if(!window.videojs){throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");}var elements=options.element.getElementsByClassName('ejs-video-js');for(var i=0;i < elements.length;i++) {videojs(elements[i],options.videojsOptions,function(){return options.videojsCallback();});}}}};module.exports = helper;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(regeneratorRuntime, fetch) {'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _helperEs6=__webpack_require__(23);var _helperEs62=_interopRequireDefault(_helperEs6);var Vimeo=(function(){function Vimeo(input,options,embeds){_classCallCheck(this,Vimeo);this.input = input;this.options = options;this.embeds = embeds;this.regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi;}Vimeo.prototype.formatData = function formatData(data){return {title:data.title,thumbnail:data.thumbnail_medium,rawDescription:data.description.replace(/\n/g,'<br/>').replace(/&#10;/g,'<br/>'),views:data.stats_number_of_plays,likes:data.stats_number_of_likes,description:_utilsEs62['default'].truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g,' '),150),url:data.url,id:data.id,host:'vimeo'};};Vimeo.prototype.data = function data(id){var url,response,data;return regeneratorRuntime.async(function data$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:context$2$0.prev = 0;url = 'https://vimeo.com/api/v2/video/' + id + '.json';context$2$0.next = 4;return regeneratorRuntime.awrap(fetch(url));case 4:response = context$2$0.sent;context$2$0.next = 7;return regeneratorRuntime.awrap(response.json());case 7:data = context$2$0.sent;return context$2$0.abrupt('return',data[0]);case 11:context$2$0.prev = 11;context$2$0.t0 = context$2$0['catch'](0);console.log(context$2$0.t0);case 14:case 'end':return context$2$0.stop();}},null,this,[[0,11]]);};Vimeo.prototype.process = function process(){var match,embedUrl,data,text;return regeneratorRuntime.async(function process$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:context$2$0.prev = 0;match = undefined;case 2:if(!((match = _utilsEs62['default'].matches(this.regex,this.input)) !== null)){context$2$0.next = 16;break;}embedUrl = 'https://player.vimeo.com/video/' + match[3];data = undefined,text = undefined;if(!this.options.videoDetails){context$2$0.next = 12;break;}context$2$0.next = 8;return regeneratorRuntime.awrap(this.data(match[3]));case 8:data = context$2$0.sent;text = _helperEs62['default'].detailsTemplate(this.formatData(data),embedUrl);context$2$0.next = 13;break;case 12:text = _helperEs62['default'].template(embedUrl,this.options);case 13:this.embeds.push({text:text,index:match.index});context$2$0.next = 2;break;case 16:return context$2$0.abrupt('return',this.embeds);case 19:context$2$0.prev = 19;context$2$0.t0 = context$2$0['catch'](0);console.log(context$2$0.t0);case 22:case 'end':return context$2$0.stop();}},null,this,[[0,19]]);};return Vimeo;})();module.exports = Vimeo;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(22)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var BasicVideo=(function(_Base){_inherits(BasicVideo,_Base);function BasicVideo(input,options,embeds){_classCallCheck(this,BasicVideo);_Base.call(this,input,options,embeds);this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi;}BasicVideo.prototype.template = function template(match){var template='<div class="ejs-video">\n\t\t<div class="ejs-video-player">\n\t\t<div class="ejs-player">\n\t\t<video src="' + match + '" class="ejs-video-js video-js" controls></video>\n\t\t</div>\n\t\t</div>\n\t\t</div>';return template;};return BasicVideo;})(_baseEs62['default']);module.exports = BasicVideo;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(regeneratorRuntime, fetchJsonp) {'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var Twitter=(function(){function Twitter(input,options,embeds){_classCallCheck(this,Twitter);this.input = input;this.options = options;this.embeds = embeds;this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi;} /**
	     * Fetches the data from twitter's oEmbed API
	     * @param  {string} url URL of the tweet
	     * @return {object}     data containing the tweet info
	     */Twitter.prototype.tweetData = function tweetData(url){var config,apiUrl,response,data;return regeneratorRuntime.async(function tweetData$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:config = this.options.tweetOptions;apiUrl = 'https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=' + url + '&maxwidth=' + config.maxWidth + '&hide_media=' + config.hideMedia + '&hide_thread=' + config.hideThread + '&align=' + config.align + '&lang=' + config.lang;context$2$0.next = 4;return regeneratorRuntime.awrap(fetchJsonp(apiUrl,{credentials:'include'}));case 4:response = context$2$0.sent;context$2$0.next = 7;return regeneratorRuntime.awrap(response.json());case 7:data = context$2$0.sent;return context$2$0.abrupt('return',data);case 9:case 'end':return context$2$0.stop();}},null,this);}; /**
	     * Load twitter widgets
	     * @return {}
	     */Twitter.prototype.load = function load(){twttr.widgets.load(this.options.element);};Twitter.prototype.process = function process(){var match,data;return regeneratorRuntime.async(function process$(context$2$0){while(1) switch(context$2$0.prev = context$2$0.next){case 0:context$2$0.prev = 0;match = undefined;case 2:if(!((match = _utilsEs62['default'].matches(this.regex,this.input)) !== null)){context$2$0.next = 9;break;}context$2$0.next = 5;return regeneratorRuntime.awrap(this.tweetData(match[0]));case 5:data = context$2$0.sent;this.embeds.push({text:data.html,index:match.index});context$2$0.next = 2;break;case 9:return context$2$0.abrupt('return',this.embeds);case 12:context$2$0.prev = 12;context$2$0.t0 = context$2$0['catch'](0);console.log(context$2$0.t0);case 15:case 'end':return context$2$0.stop();}},null,this,[[0,12]]);};return Twitter;})();module.exports = Twitter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(27)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod);
	    global.fetchJsonp = mod.exports;
	  }
	})(this, function (exports, module) {
	  'use strict';
	
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
	          // keep consistent with fetch API
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
	
	  // export as global function
	  /*
	  let local;
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }
	  
	  local.fetchJsonp = fetchJsonp;
	  */
	
	  module.exports = fetchJsonp;
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _soundcloudEs6=__webpack_require__(29);var _soundcloudEs62=_interopRequireDefault(_soundcloudEs6);var _spotifyEs6=__webpack_require__(30);var _spotifyEs62=_interopRequireDefault(_spotifyEs6);var _basicEs6=__webpack_require__(31);var _basicEs62=_interopRequireDefault(_basicEs6);var Audio=(function(){function Audio(input,output,options,embeds){_classCallCheck(this,Audio);this.input = input;this.output = output;this.options = options;this.embeds = embeds;}Audio.prototype.process = function process(){try{var output=this.output;var embeds=this.embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'soundcloud')?new _soundcloudEs62['default'](this.input,this.options,embeds).process():embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'spotify')?new _spotifyEs62['default'](this.input,this.options,embeds).process():embeds;embeds = this.options.audioEmbed?new _basicEs62['default'](this.input,this.options,embeds).process():embeds;return [output,embeds];}catch(error) {console.log(error);}};return Audio;})();module.exports = Audio;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var SoundCloud=(function(_Base){_inherits(SoundCloud,_Base);function SoundCloud(input,options,embeds){_classCallCheck(this,SoundCloud);_Base.call(this,input,options,embeds);this.regex = /soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi;}SoundCloud.prototype.template = function template(match){var config=this.options.soundCloudOptions;var template='<div class="ejs-embed">\n\t\t<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=https://' + match + '\n\t\t&auto_play     = ' + config.autoPlay + '\n\t\t&hide_related  = ' + config.hideRelated + '\n\t\t&show_comments = ' + config.showComments + '\n\t\t&show_user     = ' + config.showUser + '\n\t\t&show_reposts  = ' + config.showReposts + '\n\t\t&visual        = ' + config.visual + '\n\t\t&download      = ' + config.download + '\n\t\t&color         = ' + config.themeColor + '\n\t\t&theme_color   = ' + config.themeColor + '"></iframe>\n\t\t</div>';return template;};return SoundCloud;})(_baseEs62['default']);module.exports = SoundCloud;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Spotify=(function(_Base){_inherits(Spotify,_Base);function Spotify(input,options,embeds){_classCallCheck(this,Spotify);_Base.call(this,input,options,embeds);this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi;}Spotify.prototype.template = function template(match){var template='<div class="ejs-embed">\n\t\t<iframe src="https://embed.spotify.com/?uri=spotify:track:' + match.split('/')[2] + '" height="80"></iframe>\n\t\t</div>';return template;};return Spotify;})(_baseEs62['default']);module.exports = Spotify;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var BasicAudio=(function(_Base){_inherits(BasicAudio,_Base);function BasicAudio(input,options,embeds){_classCallCheck(this,BasicAudio);_Base.call(this,input,options,embeds);this.regex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi;}BasicAudio.prototype.template = function template(match){var template='<div class="ejs-audio">\n\t\t<audio src="' + match + '" controls class="video-js ejs-video-js"></audio>\n\t\t</div>';return template;};return BasicAudio;})(_baseEs62['default']);module.exports = BasicAudio;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _flickrEs6=__webpack_require__(33);var _flickrEs62=_interopRequireDefault(_flickrEs6);var _instagramEs6=__webpack_require__(34);var _instagramEs62=_interopRequireDefault(_instagramEs6);var _basicEs6=__webpack_require__(35);var _basicEs62=_interopRequireDefault(_basicEs6);var Image=(function(){function Image(input,output,options,embeds){_classCallCheck(this,Image);this.input = input;this.output = output;this.options = options;this.embeds = embeds;}Image.prototype.process = function process(){try{var input=this.input;var output=this.output;var embeds=this.embeds;embeds = _utilsEs62['default'].ifEmbed(this.options,'flickr')?new _flickrEs62['default'](input,this.options,embeds).process():output;embeds = _utilsEs62['default'].ifEmbed(this.options,'instagram')?new _instagramEs62['default'](input,this.options,embeds).process():output;embeds = this.options.imageEmbed?new _basicEs62['default'](input,this.options,embeds).process():output;return [output,embeds];}catch(error) {console.log(error);}};return Image;})();module.exports = Image;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Flickr=(function(_Base){_inherits(Flickr,_Base);function Flickr(input,options,embeds){_classCallCheck(this,Flickr);_Base.call(this,input,options,embeds);this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d]+\/[\d]+/gi;}Flickr.prototype.template = function template(match){var dimensions=_utilsEs62['default'].dimensions(this.options);var template='<div class="ejs-embed">\n\t\t\t<div class="ne-image-wrapper">\n\t\t\t\t<iframe src="' + _utilsEs62['default'].toUrl(match) + '/player/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n\t\t\t</div>\n\t\t</div>';return template;};return Flickr;})(_baseEs62['default']);module.exports = Flickr;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _utilsEs6=__webpack_require__(3);var _utilsEs62=_interopRequireDefault(_utilsEs6);var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Instagram=(function(_Base){_inherits(Instagram,_Base);function Instagram(input,options,embeds){_classCallCheck(this,Instagram);_Base.call(this,input,options,embeds);this.regex = /instagram.com\/p\/[a-zA-Z0-9]+/gi;}Instagram.prototype.template = function template(match){var dimensions=this.dimensions();var template='<div class="ejs-embed">\n\t\t\t<iframe src="' + _utilsEs62['default'].toUrl(match) + '/embed/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n\t\t</div>';return template;};return Instagram;})(_baseEs62['default']);module.exports = Instagram;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';function _interopRequireDefault(obj){return obj && obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _baseEs6=__webpack_require__(10);var _baseEs62=_interopRequireDefault(_baseEs6);var Basic=(function(_Base){_inherits(Basic,_Base);function Basic(input,options,embeds){_classCallCheck(this,Basic);_Base.call(this,input,options,embeds);this.regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi;}Basic.prototype.template = function template(match){var template='<div class="ejs-image">\n\t\t<div class="ne-image-wrapper">\n\t\t<img src="' + match + '"/>\n\t\t</div>\n\t\t</div>';return template;};return Basic;})(_baseEs62['default']);module.exports = Basic;

/***/ }
/******/ ]);
//# sourceMappingURL=embed.js.map