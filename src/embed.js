/******/ !function(modules) {
    /******/
    /******/
    // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/
        // Check if module is in cache
        /******/
        if (installedModules[moduleId]) /******/
        return installedModules[moduleId].exports;
        /******/
        /******/
        // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            exports: {},
            /******/
            id: moduleId,
            /******/
            loaded: !1
        };
        /******/
        /******/
        // Return the exports of the module
        /******/
        /******/
        /******/
        // Execute the module function
        /******/
        /******/
        /******/
        // Flag the module as loaded
        /******/
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.loaded = !0, module.exports;
    }
    // webpackBootstrap
    /******/
    // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/
    // Load entry module and return exports
    /******/
    /******/
    /******/
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/
    // expose the module cache
    /******/
    /******/
    /******/
    // __webpack_public_path__
    /******/
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.p = "dist/", __webpack_require__(0);
}([ /* 0 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), Emoji = __webpack_require__(75), Smiley = __webpack_require__(76), Url = __webpack_require__(77), Twitter = __webpack_require__(78), Gmap = __webpack_require__(80), Markdown = __webpack_require__(82), Code = __webpack_require__(83), Video = __webpack_require__(96), Audio = __webpack_require__(106), Image = __webpack_require__(110), helper = __webpack_require__(103);
    !function(window) {
        var globalOptions = {}, defaultOptions = {
            marked: !1,
            markedOptions: {},
            link: !0,
            linkOptions: {
                target: "self",
                exclude: [ "pdf" ],
                rel: ""
            },
            emoji: !0,
            customEmoji: [],
            fontIcons: !0,
            customFontIcons: [],
            highlightCode: !0,
            videoJS: !1,
            videojsOptions: {
                fluid: !0,
                preload: "metadata"
            },
            locationEmbed: !0,
            mapOptions: {
                mode: "place"
            },
            tweetsEmbed: !0,
            tweetOptions: {
                maxWidth: 550,
                hideMedia: !1,
                hideThread: !1,
                align: "none",
                lang: "en"
            },
            imageEmbed: !0,
            videoEmbed: !0,
            videoHeight: null,
            videoWidth: null,
            videoDetails: !0,
            audioEmbed: !0,
            excludeEmbed: [],
            inlineEmbed: [],
            inlineText: !0,
            codeEmbedHeight: 500,
            vineOptions: {
                maxWidth: null,
                type: "postcard",
                //'postcard' or 'simple' embedding
                responsive: !0,
                width: 350,
                height: 460
            },
            googleAuthKey: "",
            soundCloudOptions: {
                height: 160,
                themeColor: "f50000",
                //Hex Code of the player theme color
                autoPlay: !1,
                hideRelated: !1,
                showComments: !0,
                showUser: !0,
                showReposts: !1,
                visual: !1,
                //Show/hide the big preview image
                download: !1
            },
            beforeEmbedJSApply: function() {},
            afterEmbedJSApply: function() {},
            onVideoShow: function() {},
            onTweetsLoad: function() {},
            videojsCallback: function() {}
        }, EmbedJS = function() {
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
                _classCallCheck(this, EmbedJS);
                /**
	             * We have created a clone of the original options to make sure that the original object
	             * isn't altered.
	             */
                var defOpts = utils.cloneObject(defaultOptions), globOpts = utils.cloneObject(globalOptions), globOptions = utils.deepExtend(defOpts, globOpts);
                if (//merge global options with the overriding options provided by the user as an options
                //object while creating a new instance of embed.js
                this.options = utils.deepExtend(globOptions, options), !this.options.element && !input) throw ReferenceError("You need to pass an element or the string that needs to be processed");
                this.options.element ? (this.element = this.options.element, this.input = this.element.innerHTML) : this.input = input;
            }
            /**
	         * Processes the string and performs all the insertions and manipulations based on
	         * the options and the input provided by the user. This is an asynchronous function using the async/await
	         * feature of ES7 and this returns a promise which is resolved once the result data is ready
	         * @return {string} The processes resulting string
	         */ /**
	         * First processes the data by calling the .process() and then renders the data in the div
	         * => Loads the twitter widgets
	         * => Executes the onTweetsLoad() once all the tweets have been rendered
	         * => Applies video.js on the media (both audio and video)
	         * => Triggers video loading on click of the video preview
	         * => Executes afterEmbedJSApply() once everything is done.
	         *
	         * @return {}
	         */ /**
	         * returns the resulting string based on the input and the options passed by the user.
	         * @param  {Function} callback Function that is executed once the data is ready
	         * @return {}
	         */ /**
	         * The destroy method destroys all the listeners and replaces the rih text with the original text in the
	         * element.
	         * @return {null}
	         */ return EmbedJS.prototype.process = function() {
                var input, options, embeds, output, _process, _ref, _ref2, _process2, _process3, _ref3, result;
                return _regeneratorRuntime.async(function(context$3$0) {
                    for (;;) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        return input = this.input, options = this.options, embeds = [], output = "", this.options.beforeEmbedJSApply(), 
                        output = options.link ? new Url(input, options).process() : input, output = options.marked ? new Markdown(output, options).process() : output, 
                        output = options.emoji ? new Emoji(output, options).process() : output, output = options.fontIcons ? new Smiley(output, options).process() : output, 
                        _process = new Code(input, output, options, embeds).process(), output = _process[0], 
                        embeds = _process[1], context$3$0.next = 14, _regeneratorRuntime.awrap(new Video(input, output, options, embeds).process());

                      case 14:
                        if (_ref = context$3$0.sent, output = _ref[0], embeds = _ref[1], !options.locationEmbed) {
                            context$3$0.next = 23;
                            break;
                        }
                        return context$3$0.next = 20, _regeneratorRuntime.awrap(new Gmap(input, output, options, embeds).process());

                      case 20:
                        context$3$0.t0 = context$3$0.sent, context$3$0.next = 24;
                        break;

                      case 23:
                        context$3$0.t0 = [ output, embeds ];

                      case 24:
                        if (_ref2 = context$3$0.t0, output = _ref2[0], embeds = _ref2[1], _process2 = new Audio(input, output, options, embeds).process(), 
                        output = _process2[0], embeds = _process2[1], _process3 = new Image(input, output, options, embeds).process(), 
                        output = _process3[0], embeds = _process3[1], !options.tweetsEmbed) {
                            context$3$0.next = 40;
                            break;
                        }
                        return this.twitter = new Twitter(input, output, options, embeds), context$3$0.next = 37, 
                        _regeneratorRuntime.awrap(this.twitter.process());

                      case 37:
                        _ref3 = context$3$0.sent, output = _ref3[0], embeds = _ref3[1];

                      case 40:
                        return result = utils.createText(output, embeds), context$3$0.abrupt("return", result);

                      case 42:
                      case "end":
                        return context$3$0.stop();
                    }
                }, null, this);
            }, EmbedJS.prototype.render = function() {
                var result, event;
                return _regeneratorRuntime.async(function(context$3$0) {
                    for (;;) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        if (this.element) {
                            context$3$0.next = 2;
                            break;
                        }
                        throw new Error("You didn't pass an element while creating this instance. render() method can't work without an element");

                      case 2:
                        return context$3$0.next = 4, _regeneratorRuntime.awrap(this.process());

                      case 4:
                        result = context$3$0.sent, this.element.innerHTML = result, helper.applyVideoJS(this.options), 
                        helper.play("ejs-video-thumb", this.options), event = new Event("rendered"), this.element.dispatchEvent(event), 
                        this.options.afterEmbedJSApply();

                      case 11:
                      case "end":
                        return context$3$0.stop();
                    }
                }, null, this);
            }, EmbedJS.prototype.text = function(callback) {
                var result;
                return _regeneratorRuntime.async(function(context$3$0) {
                    for (;;) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        return context$3$0.next = 2, _regeneratorRuntime.awrap(this.process());

                      case 2:
                        result = context$3$0.sent, callback(result, this.input);

                      case 4:
                      case "end":
                        return context$3$0.stop();
                    }
                }, null, this);
            }, EmbedJS.prototype.destroy = function() {
                if (!this.element) throw new Error("destroy() method only if an element had been passed in the options object");
                helper.destroy("ejs-video-thumb", this.options), this.element.removeEventListener("rendered", this.twitter.load(), !1), 
                this.element.innerHTML = this.input;
            }, EmbedJS;
        }(), ejs = {
            instances: [],
            elements: [],
            /**
	         * Sets options globally
	         * @param {object} options
	         */
            setOptions: function(options) {
                globalOptions = utils.deepExtend(defaultOptions, options);
            },
            /**
	         * Applies embed.js to all the elements with the class name provided as option
	         * @param  {string} className
	         * @return {null}
	         */
            applyEmbedJS: function(className) {
                this.elements = document.getElementsByClassName(className);
                for (var i = 0; i < this.elements.length; i++) {
                    var option = {
                        element: this.elements[i]
                    };
                    this.instances[i] = new EmbedJS(option), this.instances[i].render();
                }
            },
            /**
	         * Destroys all the instances of EmbedJS created by using ejs.applyEmbedJS method.
	         * @return {null}
	         */
            destroyEmbedJS: function() {
                for (var i = 0; i < this.elements.length; i++) this.instances[i].destroy();
            }
        };
        window.EmbedJS = EmbedJS, window.ejs = ejs;
    }(window);
}, /* 1 */
/***/
function(module, exports) {
    "use strict";
    exports["default"] = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }, exports.__esModule = !0;
}, /* 2 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(global) {
        // This method of obtaining a reference to the global object needs to be
        // kept identical to the way it is obtained in runtime.js
        var g = "object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this, hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0, oldRuntime = hadRuntime && g.regeneratorRuntime;
        if (// Force reevalutation of runtime.js.
        g.regeneratorRuntime = void 0, module.exports = __webpack_require__(3), hadRuntime) // Restore the original runtime.
        g.regeneratorRuntime = oldRuntime; else // Remove the global property added by runtime.js.
        try {
            delete g.regeneratorRuntime;
        } catch (e) {
            g.regeneratorRuntime = void 0;
        }
        module.exports = {
            "default": module.exports,
            __esModule: !0
        };
    }).call(exports, function() {
        return this;
    }());
}, /* 3 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(global, process) {
        /**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
        "use strict";
        var _Symbol = __webpack_require__(5)["default"], _Symbol$iterator = __webpack_require__(36)["default"], _Object$create = __webpack_require__(48)["default"], _Promise = __webpack_require__(50)["default"];
        !function(global) {
            function wrap(innerFn, outerFn, self, tryLocsList) {
                // If outerFn provided, then outerFn.prototype instanceof Generator.
                var generator = _Object$create((outerFn || Generator).prototype);
                return generator._invoke = makeInvokeMethod(innerFn, self || null, new Context(tryLocsList || [])), 
                generator;
            }
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
            // Dummy constructor functions that we use as the .constructor and
            // .constructor.prototype properties for functions that return Generator
            // objects. For full spec compliance, you may wish to configure your
            // minifier not to mangle the names of these two functions.
            function Generator() {}
            function GeneratorFunction() {}
            function GeneratorFunctionPrototype() {}
            // Helper for defining the .next, .throw, and .return methods of the
            // Iterator interface in terms of a single ._invoke method.
            function defineIteratorMethods(prototype) {
                [ "next", "throw", "return" ].forEach(function(method) {
                    prototype[method] = function(arg) {
                        return this._invoke(method, arg);
                    };
                });
            }
            function AwaitArgument(arg) {
                this.arg = arg;
            }
            function AsyncIterator(generator) {
                // This invoke function is written in a style that assumes some
                // calling function (or Promise) will handle exceptions.
                function invoke(method, arg) {
                    var result = generator[method](arg), value = result.value;
                    return value instanceof AwaitArgument ? _Promise.resolve(value.arg).then(invokeNext, invokeThrow) : _Promise.resolve(value).then(function(unwrapped) {
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
                        return result.value = unwrapped, result;
                    });
                }
                function enqueue(method, arg) {
                    var enqueueResult = // If enqueue has been called before, then we want to wait until
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
                    previousPromise ? previousPromise.then(function() {
                        return invoke(method, arg);
                    }) : new _Promise(function(resolve) {
                        resolve(invoke(method, arg));
                    });
                    // Avoid propagating enqueueResult failures to Promises returned by
                    // later invocations of the iterator.
                    return previousPromise = enqueueResult["catch"](function(ignored) {}), enqueueResult;
                }
                "object" == typeof process && process.domain && (invoke = process.domain.bind(invoke));
                var previousPromise, invokeNext = invoke.bind(generator, "next"), invokeThrow = invoke.bind(generator, "throw");
                invoke.bind(generator, "return");
                // Define the unified helper method that is used to implement .next,
                // .throw, and .return (see defineIteratorMethods).
                this._invoke = enqueue;
            }
            function makeInvokeMethod(innerFn, self, context) {
                var state = GenStateSuspendedStart;
                return function(method, arg) {
                    if (state === GenStateExecuting) throw new Error("Generator is already running");
                    if (state === GenStateCompleted) {
                        if ("throw" === method) throw arg;
                        // Be forgiving, per 25.3.3.3.3 of the spec:
                        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                        return doneResult();
                    }
                    for (;;) {
                        var delegate = context.delegate;
                        if (delegate) {
                            if ("return" === method || "throw" === method && delegate.iterator[method] === undefined) {
                                // A return or throw (when the delegate iterator has no throw
                                // method) always terminates the yield* loop.
                                context.delegate = null;
                                // If the delegate iterator has a return method, give it a
                                // chance to clean up.
                                var returnMethod = delegate.iterator["return"];
                                if (returnMethod) {
                                    var record = tryCatch(returnMethod, delegate.iterator, arg);
                                    if ("throw" === record.type) {
                                        // If the return method threw an exception, let that
                                        // exception prevail over the original return or throw.
                                        method = "throw", arg = record.arg;
                                        continue;
                                    }
                                }
                                if ("return" === method) // Continue with the outer return, now that the delegate
                                // iterator has been terminated.
                                continue;
                            }
                            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
                            if ("throw" === record.type) {
                                context.delegate = null, // Like returning generator.throw(uncaught), but without the
                                // overhead of an extra function call.
                                method = "throw", arg = record.arg;
                                continue;
                            }
                            // Delegate generator ran and handled its own exceptions so
                            // regardless of what the method was, we continue as if it is
                            // "next" with an undefined arg.
                            method = "next", arg = undefined;
                            var info = record.arg;
                            if (!info.done) return state = GenStateSuspendedYield, info;
                            context[delegate.resultName] = info.value, context.next = delegate.nextLoc, context.delegate = null;
                        }
                        if ("next" === method) state === GenStateSuspendedYield ? context.sent = arg : context.sent = undefined; else if ("throw" === method) {
                            if (state === GenStateSuspendedStart) throw state = GenStateCompleted, arg;
                            context.dispatchException(arg) && (// If the dispatched exception was caught by a catch block,
                            // then let that catch block handle the exception normally.
                            method = "next", arg = undefined);
                        } else "return" === method && context.abrupt("return", arg);
                        state = GenStateExecuting;
                        var record = tryCatch(innerFn, self, context);
                        if ("normal" === record.type) {
                            // If an exception is thrown from innerFn, we leave state ===
                            // GenStateExecuting and loop back for another invocation.
                            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                            var info = {
                                value: record.arg,
                                done: context.done
                            };
                            if (record.arg !== ContinueSentinel) return info;
                            context.delegate && "next" === method && (// Deliberately forget the last sent value so that we don't
                            // accidentally pass it on to the delegate.
                            arg = undefined);
                        } else "throw" === record.type && (state = GenStateCompleted, // Dispatch the exception by looping back around to the
                        // context.dispatchException(arg) call above.
                        method = "throw", arg = record.arg);
                    }
                };
            }
            function pushTryEntry(locs) {
                var entry = {
                    tryLoc: locs[0]
                };
                1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
                entry.afterLoc = locs[3]), this.tryEntries.push(entry);
            }
            function resetTryEntry(entry) {
                var record = entry.completion || {};
                record.type = "normal", delete record.arg, entry.completion = record;
            }
            function Context(tryLocsList) {
                // The root entry object (effectively a try statement without a catch
                // or a finally block) gives us a place to store values thrown from
                // locations where there is no enclosing try statement.
                this.tryEntries = [ {
                    tryLoc: "root"
                } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
            }
            function values(iterable) {
                if (iterable) {
                    var iteratorMethod = iterable[iteratorSymbol];
                    if (iteratorMethod) return iteratorMethod.call(iterable);
                    if ("function" == typeof iterable.next) return iterable;
                    if (!isNaN(iterable.length)) {
                        var i = -1, next = function next() {
                            for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
                            next.done = !1, next;
                            return next.value = undefined, next.done = !0, next;
                        };
                        return next.next = next;
                    }
                }
                // Return an iterator with no values.
                return {
                    next: doneResult
                };
            }
            function doneResult() {
                return {
                    value: undefined,
                    done: !0
                };
            }
            var undefined, hasOwn = Object.prototype.hasOwnProperty, iteratorSymbol = "function" == typeof _Symbol && _Symbol$iterator || "@@iterator", inModule = "object" == typeof module, runtime = global.regeneratorRuntime;
            if (runtime) // Don't bother evaluating the rest of this file if the runtime was
            // already defined globally.
            // If regeneratorRuntime is defined globally and we're in a module,
            // make the exports object identical to regeneratorRuntime.
            return void (inModule && (module.exports = runtime));
            // Define the runtime globally (as expected by generated code) as either
            // module.exports (if we're in a module) or a new, empty object.
            runtime = global.regeneratorRuntime = inModule ? module.exports : {}, runtime.wrap = wrap;
            var GenStateSuspendedStart = "suspendedStart", GenStateSuspendedYield = "suspendedYield", GenStateExecuting = "executing", GenStateCompleted = "completed", ContinueSentinel = {}, Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
            GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype, GeneratorFunctionPrototype.constructor = GeneratorFunction, 
            GeneratorFunction.displayName = "GeneratorFunction", runtime.isGeneratorFunction = function(genFun) {
                var ctor = "function" == typeof genFun && genFun.constructor;
                // For the native GeneratorFunction constructor, the best we can
                // do is to check its .name property.
                return ctor ? ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name) : !1;
            }, runtime.mark = function(genFun) {
                return genFun.__proto__ = GeneratorFunctionPrototype, genFun.prototype = _Object$create(Gp), 
                genFun;
            }, // Within the body of any async function, `await x` is transformed to
            // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
            // `value instanceof AwaitArgument` to determine if the yielded value is
            // meant to be awaited. Some may consider the name of this method too
            // cutesy, but they are curmudgeons.
            runtime.awrap = function(arg) {
                return new AwaitArgument(arg);
            }, defineIteratorMethods(AsyncIterator.prototype), // Note that simple async functions are implemented on top of
            // AsyncIterator objects; they just return a Promise for the value of
            // the final result produced by the iterator.
            runtime.async = function(innerFn, outerFn, self, tryLocsList) {
                var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
                return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                    return result.done ? result.value : iter.next();
                });
            }, // Define Generator.prototype.{next,throw,return} in terms of the
            // unified ._invoke helper method.
            defineIteratorMethods(Gp), Gp[iteratorSymbol] = function() {
                return this;
            }, Gp.toString = function() {
                return "[object Generator]";
            }, runtime.keys = function(object) {
                var keys = [];
                for (var key in object) keys.push(key);
                // Rather than returning an object with a next method, we keep
                // things simple and return the next function itself.
                return keys.reverse(), function next() {
                    for (;keys.length; ) {
                        var key = keys.pop();
                        if (key in object) return next.value = key, next.done = !1, next;
                    }
                    // To avoid creating an additional object, we just hang the .value
                    // and .done properties off the next function object itself. This
                    // also ensures that the minifier will not anonymize the function.
                    return next.done = !0, next;
                };
            }, runtime.values = values, Context.prototype = {
                constructor: Context,
                reset: function(skipTempReset) {
                    if (this.prev = 0, this.next = 0, this.sent = undefined, this.done = !1, this.delegate = null, 
                    this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) // Not sure about the optimal order of these conditions:
                    "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
                },
                stop: function() {
                    this.done = !0;
                    var rootEntry = this.tryEntries[0], rootRecord = rootEntry.completion;
                    if ("throw" === rootRecord.type) throw rootRecord.arg;
                    return this.rval;
                },
                dispatchException: function(exception) {
                    function handle(loc, caught) {
                        return record.type = "throw", record.arg = exception, context.next = loc, !!caught;
                    }
                    if (this.done) throw exception;
                    for (var context = this, i = this.tryEntries.length - 1; i >= 0; --i) {
                        var entry = this.tryEntries[i], record = entry.completion;
                        if ("root" === entry.tryLoc) // Exception thrown outside of any try block that could handle
                        // it, so set the completion value of the entire function to
                        // throw the exception.
                        return handle("end");
                        if (entry.tryLoc <= this.prev) {
                            var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                            if (hasCatch && hasFinally) {
                                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                            } else if (hasCatch) {
                                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                            } else {
                                if (!hasFinally) throw new Error("try statement without catch or finally");
                                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function(type, arg) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var entry = this.tryEntries[i];
                        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                            var finallyEntry = entry;
                            break;
                        }
                    }
                    finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (// Ignore the finally entry if control is not jumping to a
                    // location outside the try/catch block.
                    finallyEntry = null);
                    var record = finallyEntry ? finallyEntry.completion : {};
                    return record.type = type, record.arg = arg, finallyEntry ? this.next = finallyEntry.finallyLoc : this.complete(record), 
                    ContinueSentinel;
                },
                complete: function(record, afterLoc) {
                    if ("throw" === record.type) throw record.arg;
                    "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = record.arg, 
                    this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc);
                },
                finish: function(finallyLoc) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var entry = this.tryEntries[i];
                        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
                        resetTryEntry(entry), ContinueSentinel;
                    }
                },
                "catch": function(tryLoc) {
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var entry = this.tryEntries[i];
                        if (entry.tryLoc === tryLoc) {
                            var record = entry.completion;
                            if ("throw" === record.type) {
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
                    return this.delegate = {
                        iterator: values(iterable),
                        resultName: resultName,
                        nextLoc: nextLoc
                    }, ContinueSentinel;
                }
            };
        }(// Among the various tricks for obtaining a reference to the global
        // object, this seems to be the most reliable technique that does not
        // use indirect eval (which violates Content Security Policy).
        "object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : void 0);
    }).call(exports, function() {
        return this;
    }(), __webpack_require__(4));
}, /* 4 */
/***/
function(module, exports) {
    function cleanUpNextTick() {
        draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
        queue.length && drainQueue();
    }
    function drainQueue() {
        if (!draining) {
            var timeout = setTimeout(cleanUpNextTick);
            draining = !0;
            for (var len = queue.length; len; ) {
                for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                queueIndex = -1, len = queue.length;
            }
            currentQueue = null, draining = !1, clearTimeout(timeout);
        }
    }
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun, this.array = array;
    }
    function noop() {}
    // shim for using process in browser
    var currentQueue, process = module.exports = {}, queue = [], draining = !1, queueIndex = -1;
    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
        queue.push(new Item(fun, args)), 1 !== queue.length || draining || setTimeout(drainQueue, 0);
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
    process.version = "", // empty string to avoid regexp issues
    process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, 
    process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
    process.emit = noop, process.binding = function(name) {
        throw new Error("process.binding is not supported");
    }, process.cwd = function() {
        return "/";
    }, process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
    }, process.umask = function() {
        return 0;
    };
}, /* 5 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(6),
        __esModule: !0
    };
}, /* 6 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(7), __webpack_require__(35), module.exports = __webpack_require__(14).Symbol;
}, /* 7 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    // ECMAScript 6 symbols shim
    var $ = __webpack_require__(8), global = __webpack_require__(9), has = __webpack_require__(10), DESCRIPTORS = __webpack_require__(11), $export = __webpack_require__(13), redefine = __webpack_require__(17), $fails = __webpack_require__(12), shared = __webpack_require__(20), setToStringTag = __webpack_require__(21), uid = __webpack_require__(23), wks = __webpack_require__(22), keyOf = __webpack_require__(24), $names = __webpack_require__(29), enumKeys = __webpack_require__(30), isArray = __webpack_require__(31), anObject = __webpack_require__(32), toIObject = __webpack_require__(25), createDesc = __webpack_require__(19), getDesc = $.getDesc, setDesc = $.setDesc, _create = $.create, getNames = $names.get, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, setter = !1, HIDDEN = wks("_hidden"), isEnum = $.isEnum, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), useNative = "function" == typeof $Symbol, ObjectProto = Object.prototype, setSymbolDesc = DESCRIPTORS && $fails(function() {
        return 7 != _create(setDesc({}, "a", {
            get: function() {
                return setDesc(this, "a", {
                    value: 7
                }).a;
            }
        })).a;
    }) ? function(it, key, D) {
        var protoDesc = getDesc(ObjectProto, key);
        protoDesc && delete ObjectProto[key], setDesc(it, key, D), protoDesc && it !== ObjectProto && setDesc(ObjectProto, key, protoDesc);
    } : setDesc, wrap = function(tag) {
        var sym = AllSymbols[tag] = _create($Symbol.prototype);
        return sym._k = tag, DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
            configurable: !0,
            set: function(value) {
                has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), setSymbolDesc(this, tag, createDesc(1, value));
            }
        }), sym;
    }, isSymbol = function(it) {
        return "symbol" == typeof it;
    }, $defineProperty = function(it, key, D) {
        return D && has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
        D = _create(D, {
            enumerable: createDesc(0, !1)
        })) : (has(it, HIDDEN) || setDesc(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
        setSymbolDesc(it, key, D)) : setDesc(it, key, D);
    }, $defineProperties = function(it, P) {
        anObject(it);
        for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
        return it;
    }, $create = function(it, P) {
        return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
    }, $propertyIsEnumerable = function(key) {
        var E = isEnum.call(this, key);
        return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : !0;
    }, $getOwnPropertyDescriptor = function(it, key) {
        var D = getDesc(it = toIObject(it), key);
        return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
        D;
    }, $getOwnPropertyNames = function(it) {
        for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || result.push(key);
        return result;
    }, $getOwnPropertySymbols = function(it) {
        for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
        return result;
    }, $stringify = function(it) {
        if (void 0 !== it && !isSymbol(it)) {
            for (// IE8 returns string on undefined
            var replacer, $replacer, args = [ it ], i = 1, $$ = arguments; $$.length > i; ) args.push($$[i++]);
            return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), 
            ($replacer || !isArray(replacer)) && (replacer = function(key, value) {
                return $replacer && (value = $replacer.call(this, key, value)), isSymbol(value) ? void 0 : value;
            }), args[1] = replacer, _stringify.apply($JSON, args);
        }
    }, buggyJSON = $fails(function() {
        var S = $Symbol();
        // MS Edge converts symbol values to JSON as {}
        // WebKit converts symbol values to JSON as null
        // V8 throws on boxed symbols
        return "[null]" != _stringify([ S ]) || "{}" != _stringify({
            a: S
        }) || "{}" != _stringify(Object(S));
    });
    // 19.4.1.1 Symbol([description])
    useNative || ($Symbol = function() {
        if (isSymbol(this)) throw TypeError("Symbol is not a constructor");
        return wrap(uid(arguments.length > 0 ? arguments[0] : void 0));
    }, redefine($Symbol.prototype, "toString", function() {
        return this._k;
    }), isSymbol = function(it) {
        return it instanceof $Symbol;
    }, $.create = $create, $.isEnum = $propertyIsEnumerable, $.getDesc = $getOwnPropertyDescriptor, 
    $.setDesc = $defineProperty, $.setDescs = $defineProperties, $.getNames = $names.get = $getOwnPropertyNames, 
    $.getSymbols = $getOwnPropertySymbols, DESCRIPTORS && !__webpack_require__(34) && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0));
    var symbolStatics = {
        // 19.4.2.1 Symbol.for(key)
        "for": function(key) {
            return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        // 19.4.2.5 Symbol.keyFor(sym)
        keyFor: function(key) {
            return keyOf(SymbolRegistry, key);
        },
        useSetter: function() {
            setter = !0;
        },
        useSimple: function() {
            setter = !1;
        }
    };
    // 19.4.2.2 Symbol.hasInstance
    // 19.4.2.3 Symbol.isConcatSpreadable
    // 19.4.2.4 Symbol.iterator
    // 19.4.2.6 Symbol.match
    // 19.4.2.8 Symbol.replace
    // 19.4.2.9 Symbol.search
    // 19.4.2.10 Symbol.species
    // 19.4.2.11 Symbol.split
    // 19.4.2.12 Symbol.toPrimitive
    // 19.4.2.13 Symbol.toStringTag
    // 19.4.2.14 Symbol.unscopables
    $.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(it) {
        var sym = wks(it);
        symbolStatics[it] = useNative ? sym : wrap(sym);
    }), setter = !0, $export($export.G + $export.W, {
        Symbol: $Symbol
    }), $export($export.S, "Symbol", symbolStatics), $export($export.S + $export.F * !useNative, "Object", {
        // 19.1.2.2 Object.create(O [, Properties])
        create: $create,
        // 19.1.2.4 Object.defineProperty(O, P, Attributes)
        defineProperty: $defineProperty,
        // 19.1.2.3 Object.defineProperties(O, Properties)
        defineProperties: $defineProperties,
        // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
        // 19.1.2.7 Object.getOwnPropertyNames(O)
        getOwnPropertyNames: $getOwnPropertyNames,
        // 19.1.2.8 Object.getOwnPropertySymbols(O)
        getOwnPropertySymbols: $getOwnPropertySymbols
    }), // 24.3.2 JSON.stringify(value [, replacer [, space]])
    $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), "JSON", {
        stringify: $stringify
    }), // 19.4.3.5 Symbol.prototype[@@toStringTag]
    setToStringTag($Symbol, "Symbol"), // 20.2.1.9 Math[@@toStringTag]
    setToStringTag(Math, "Math", !0), // 24.3.3 JSON[@@toStringTag]
    setToStringTag(global.JSON, "JSON", !0);
}, /* 8 */
/***/
function(module, exports) {
    var $Object = Object;
    module.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
    };
}, /* 9 */
/***/
function(module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = global);
}, /* 10 */
/***/
function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, /* 11 */
/***/
function(module, exports, __webpack_require__) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !__webpack_require__(12)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, /* 12 */
/***/
function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return !0;
        }
    };
}, /* 13 */
/***/
function(module, exports, __webpack_require__) {
    var global = __webpack_require__(9), core = __webpack_require__(14), ctx = __webpack_require__(15), PROTOTYPE = "prototype", $export = function(type, name, source) {
        var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
        IS_GLOBAL && (source = name);
        for (key in source) // contains in native
        own = !IS_FORCED && target && key in target, own && key in exports || (// export native or passed
        out = own ? target[key] : source[key], // prevent global pollution for namespaces
        exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
            var F = function(param) {
                return this instanceof C ? new C(param) : C(param);
            };
            return F[PROTOTYPE] = C[PROTOTYPE], F;
        }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, IS_PROTO && ((exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out));
    };
    // type bitmap
    $export.F = 1, // forced
    $export.G = 2, // global
    $export.S = 4, // static
    $export.P = 8, // proto
    $export.B = 16, // bind
    $export.W = 32, // wrap
    module.exports = $export;
}, /* 14 */
/***/
function(module, exports) {
    var core = module.exports = {
        version: "1.2.6"
    };
    "number" == typeof __e && (__e = core);
}, /* 15 */
/***/
function(module, exports, __webpack_require__) {
    // optional / simple context binding
    var aFunction = __webpack_require__(16);
    module.exports = function(fn, that, length) {
        if (aFunction(fn), void 0 === that) return fn;
        switch (length) {
          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
}, /* 16 */
/***/
function(module, exports) {
    module.exports = function(it) {
        if ("function" != typeof it) throw TypeError(it + " is not a function!");
        return it;
    };
}, /* 17 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(18);
}, /* 18 */
/***/
function(module, exports, __webpack_require__) {
    var $ = __webpack_require__(8), createDesc = __webpack_require__(19);
    module.exports = __webpack_require__(11) ? function(object, key, value) {
        return $.setDesc(object, key, createDesc(1, value));
    } : function(object, key, value) {
        return object[key] = value, object;
    };
}, /* 19 */
/***/
function(module, exports) {
    module.exports = function(bitmap, value) {
        return {
            enumerable: !(1 & bitmap),
            configurable: !(2 & bitmap),
            writable: !(4 & bitmap),
            value: value
        };
    };
}, /* 20 */
/***/
function(module, exports, __webpack_require__) {
    var global = __webpack_require__(9), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
    module.exports = function(key) {
        return store[key] || (store[key] = {});
    };
}, /* 21 */
/***/
function(module, exports, __webpack_require__) {
    var def = __webpack_require__(8).setDesc, has = __webpack_require__(10), TAG = __webpack_require__(22)("toStringTag");
    module.exports = function(it, tag, stat) {
        it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
            configurable: !0,
            value: tag
        });
    };
}, /* 22 */
/***/
function(module, exports, __webpack_require__) {
    var store = __webpack_require__(20)("wks"), uid = __webpack_require__(23), Symbol = __webpack_require__(9).Symbol;
    module.exports = function(name) {
        return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)("Symbol." + name));
    };
}, /* 23 */
/***/
function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
    };
}, /* 24 */
/***/
function(module, exports, __webpack_require__) {
    var $ = __webpack_require__(8), toIObject = __webpack_require__(25);
    module.exports = function(object, el) {
        for (var key, O = toIObject(object), keys = $.getKeys(O), length = keys.length, index = 0; length > index; ) if (O[key = keys[index++]] === el) return key;
    };
}, /* 25 */
/***/
function(module, exports, __webpack_require__) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = __webpack_require__(26), defined = __webpack_require__(28);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, /* 26 */
/***/
function(module, exports, __webpack_require__) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = __webpack_require__(27);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return "String" == cof(it) ? it.split("") : Object(it);
    };
}, /* 27 */
/***/
function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, /* 28 */
/***/
function(module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function(it) {
        if (void 0 == it) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, /* 29 */
/***/
function(module, exports, __webpack_require__) {
    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var toIObject = __webpack_require__(25), getNames = __webpack_require__(8).getNames, toString = {}.toString, windowNames = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], getWindowNames = function(it) {
        try {
            return getNames(it);
        } catch (e) {
            return windowNames.slice();
        }
    };
    module.exports.get = function(it) {
        return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : getNames(toIObject(it));
    };
}, /* 30 */
/***/
function(module, exports, __webpack_require__) {
    // all enumerable object keys, includes symbols
    var $ = __webpack_require__(8);
    module.exports = function(it) {
        var keys = $.getKeys(it), getSymbols = $.getSymbols;
        if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = $.isEnum, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && keys.push(key);
        return keys;
    };
}, /* 31 */
/***/
function(module, exports, __webpack_require__) {
    // 7.2.2 IsArray(argument)
    var cof = __webpack_require__(27);
    module.exports = Array.isArray || function(arg) {
        return "Array" == cof(arg);
    };
}, /* 32 */
/***/
function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(33);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, /* 33 */
/***/
function(module, exports) {
    module.exports = function(it) {
        return "object" == typeof it ? null !== it : "function" == typeof it;
    };
}, /* 34 */
/***/
function(module, exports) {
    module.exports = !0;
}, /* 35 */
/***/
function(module, exports) {}, /* 36 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(37),
        __esModule: !0
    };
}, /* 37 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(38), __webpack_require__(44), module.exports = __webpack_require__(22)("iterator");
}, /* 38 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(39)(!0);
    // 21.1.3.27 String.prototype[@@iterator]()
    __webpack_require__(41)(String, "String", function(iterated) {
        this._t = String(iterated), // target
        this._i = 0;
    }, function() {
        var point, O = this._t, index = this._i;
        return index >= O.length ? {
            value: void 0,
            done: !0
        } : (point = $at(O, index), this._i += point.length, {
            value: point,
            done: !1
        });
    });
}, /* 39 */
/***/
function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(40), defined = __webpack_require__(28);
    // true  -> String#at
    // false -> String#codePointAt
    module.exports = function(TO_STRING) {
        return function(that, pos) {
            var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
            return 0 > i || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i), 55296 > a || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536);
        };
    };
}, /* 40 */
/***/
function(module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, /* 41 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(34), $export = __webpack_require__(13), redefine = __webpack_require__(17), hide = __webpack_require__(18), has = __webpack_require__(10), Iterators = __webpack_require__(42), $iterCreate = __webpack_require__(43), setToStringTag = __webpack_require__(21), getProto = __webpack_require__(8).getProto, ITERATOR = __webpack_require__(22)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values", returnThis = function() {
        return this;
    };
    module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);
        var methods, key, getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind];
            switch (kind) {
              case KEYS:
                return function() {
                    return new Constructor(this, kind);
                };

              case VALUES:
                return function() {
                    return new Constructor(this, kind);
                };
            }
            return function() {
                return new Constructor(this, kind);
            };
        }, TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT);
        // Fix native
        if ($native) {
            var IteratorPrototype = getProto($default.call(new Base()));
            // Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, !0), // FF fix
            !LIBRARY && has(proto, FF_ITERATOR) && hide(IteratorPrototype, ITERATOR, returnThis), 
            // fix Array#{values, @@iterator}.name in V8 / FF
            DEF_VALUES && $native.name !== VALUES && (VALUES_BUG = !0, $default = function() {
                return $native.call(this);
            });
        }
        if (// Define iterator
        LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
        // Plug for library
        Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: DEF_VALUES ? getMethod("entries") : $default
        }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
        return methods;
    };
}, /* 42 */
/***/
function(module, exports) {
    module.exports = {};
}, /* 43 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var $ = __webpack_require__(8), descriptor = __webpack_require__(19), setToStringTag = __webpack_require__(21), IteratorPrototype = {};
    // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    __webpack_require__(18)(IteratorPrototype, __webpack_require__(22)("iterator"), function() {
        return this;
    }), module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = $.create(IteratorPrototype, {
            next: descriptor(1, next)
        }), setToStringTag(Constructor, NAME + " Iterator");
    };
}, /* 44 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(45);
    var Iterators = __webpack_require__(42);
    Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
}, /* 45 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var addToUnscopables = __webpack_require__(46), step = __webpack_require__(47), Iterators = __webpack_require__(42), toIObject = __webpack_require__(25);
    // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()
    module.exports = __webpack_require__(41)(Array, "Array", function(iterated, kind) {
        this._t = toIObject(iterated), // target
        this._i = 0, // next index
        this._k = kind;
    }, function() {
        var O = this._t, kind = this._k, index = this._i++;
        return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == kind ? step(0, index) : "values" == kind ? step(0, O[index]) : step(0, [ index, O[index] ]);
    }, "values"), // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), 
    addToUnscopables("entries");
}, /* 46 */
/***/
function(module, exports) {
    module.exports = function() {};
}, /* 47 */
/***/
function(module, exports) {
    module.exports = function(done, value) {
        return {
            value: value,
            done: !!done
        };
    };
}, /* 48 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(49),
        __esModule: !0
    };
}, /* 49 */
/***/
function(module, exports, __webpack_require__) {
    var $ = __webpack_require__(8);
    module.exports = function(P, D) {
        return $.create(P, D);
    };
}, /* 50 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(51),
        __esModule: !0
    };
}, /* 51 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(35), __webpack_require__(38), __webpack_require__(44), __webpack_require__(52), 
    module.exports = __webpack_require__(14).Promise;
}, /* 52 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var Wrapper, $ = __webpack_require__(8), LIBRARY = __webpack_require__(34), global = __webpack_require__(9), ctx = __webpack_require__(15), classof = __webpack_require__(53), $export = __webpack_require__(13), isObject = __webpack_require__(33), anObject = __webpack_require__(32), aFunction = __webpack_require__(16), strictNew = __webpack_require__(54), forOf = __webpack_require__(55), setProto = __webpack_require__(60).set, same = __webpack_require__(61), SPECIES = __webpack_require__(22)("species"), speciesConstructor = __webpack_require__(62), asap = __webpack_require__(63), PROMISE = "Promise", process = global.process, isNode = "process" == classof(process), P = global[PROMISE], testResolve = function(sub) {
        var test = new P(function() {});
        return sub && (test.constructor = Object), P.resolve(test) === test;
    }, USE_NATIVE = function() {
        function P2(x) {
            var self = new P(x);
            return setProto(self, P2.prototype), self;
        }
        var works = !1;
        try {
            // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
            if (works = P && P.resolve && testResolve(), setProto(P2, P), P2.prototype = $.create(P.prototype, {
                constructor: {
                    value: P2
                }
            }), // actual Firefox has broken subclass support, test that
            P2.resolve(5).then(function() {}) instanceof P2 || (works = !1), works && __webpack_require__(11)) {
                var thenableThenGotten = !1;
                P.resolve($.setDesc({}, "then", {
                    get: function() {
                        thenableThenGotten = !0;
                    }
                })), works = thenableThenGotten;
            }
        } catch (e) {
            works = !1;
        }
        return works;
    }(), sameConstructor = function(a, b) {
        // library wrapper special case
        // library wrapper special case
        return LIBRARY && a === P && b === Wrapper ? !0 : same(a, b);
    }, getConstructor = function(C) {
        var S = anObject(C)[SPECIES];
        return void 0 != S ? S : C;
    }, isThenable = function(it) {
        var then;
        return isObject(it) && "function" == typeof (then = it.then) ? then : !1;
    }, PromiseCapability = function(C) {
        var resolve, reject;
        this.promise = new C(function($$resolve, $$reject) {
            if (void 0 !== resolve || void 0 !== reject) throw TypeError("Bad Promise constructor");
            resolve = $$resolve, reject = $$reject;
        }), this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    }, perform = function(exec) {
        try {
            exec();
        } catch (e) {
            return {
                error: e
            };
        }
    }, notify = function(record, isReject) {
        if (!record.n) {
            record.n = !0;
            var chain = record.c;
            asap(function() {
                for (var value = record.v, ok = 1 == record.s, i = 0, run = function(reaction) {
                    var result, then, handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject;
                    try {
                        handler ? (ok || (record.h = !0), result = handler === !0 ? value : handler(value), 
                        result === reaction.promise ? reject(TypeError("Promise-chain cycle")) : (then = isThenable(result)) ? then.call(result, resolve, reject) : resolve(result)) : reject(value);
                    } catch (e) {
                        reject(e);
                    }
                }; chain.length > i; ) run(chain[i++]);
                // variable length - can't use forEach
                chain.length = 0, record.n = !1, isReject && setTimeout(function() {
                    var handler, console, promise = record.p;
                    isUnhandled(promise) && (isNode ? process.emit("unhandledRejection", value, promise) : (handler = global.onunhandledrejection) ? handler({
                        promise: promise,
                        reason: value
                    }) : (console = global.console) && console.error && console.error("Unhandled promise rejection", value)), 
                    record.a = void 0;
                }, 1);
            });
        }
    }, isUnhandled = function(promise) {
        var reaction, record = promise._d, chain = record.a || record.c, i = 0;
        if (record.h) return !1;
        for (;chain.length > i; ) if (reaction = chain[i++], reaction.fail || !isUnhandled(reaction.promise)) return !1;
        return !0;
    }, $reject = function(value) {
        var record = this;
        record.d || (record.d = !0, record = record.r || record, // unwrap
        record.v = value, record.s = 2, record.a = record.c.slice(), notify(record, !0));
    }, $resolve = function(value) {
        var then, record = this;
        if (!record.d) {
            record.d = !0, record = record.r || record;
            // unwrap
            try {
                if (record.p === value) throw TypeError("Promise can't be resolved itself");
                (then = isThenable(value)) ? asap(function() {
                    var wrapper = {
                        r: record,
                        d: !1
                    };
                    // wrap
                    try {
                        then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                    } catch (e) {
                        $reject.call(wrapper, e);
                    }
                }) : (record.v = value, record.s = 1, notify(record, !1));
            } catch (e) {
                $reject.call({
                    r: record,
                    d: !1
                }, e);
            }
        }
    };
    // constructor polyfill
    USE_NATIVE || (// 25.4.3.1 Promise(executor)
    P = function(executor) {
        aFunction(executor);
        var record = this._d = {
            p: strictNew(this, P, PROMISE),
            // <- promise
            c: [],
            // <- awaiting reactions
            a: void 0,
            // <- checked in isUnhandled reactions
            s: 0,
            // <- state
            d: !1,
            // <- done
            v: void 0,
            // <- value
            h: !1,
            // <- handled rejection
            n: !1
        };
        try {
            executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
            $reject.call(record, err);
        }
    }, __webpack_require__(68)(P.prototype, {
        // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
        then: function(onFulfilled, onRejected) {
            var reaction = new PromiseCapability(speciesConstructor(this, P)), promise = reaction.promise, record = this._d;
            return reaction.ok = "function" == typeof onFulfilled ? onFulfilled : !0, reaction.fail = "function" == typeof onRejected && onRejected, 
            record.c.push(reaction), record.a && record.a.push(reaction), record.s && notify(record, !1), 
            promise;
        },
        // 25.4.5.1 Promise.prototype.catch(onRejected)
        "catch": function(onRejected) {
            return this.then(void 0, onRejected);
        }
    })), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Promise: P
    }), __webpack_require__(21)(P, PROMISE), __webpack_require__(69)(PROMISE), Wrapper = __webpack_require__(14)[PROMISE], 
    // statics
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
        // 25.4.4.5 Promise.reject(r)
        reject: function(r) {
            var capability = new PromiseCapability(this), $$reject = capability.reject;
            return $$reject(r), capability.promise;
        }
    }), $export($export.S + $export.F * (!USE_NATIVE || testResolve(!0)), PROMISE, {
        // 25.4.4.6 Promise.resolve(x)
        resolve: function(x) {
            // instanceof instead of internal slot check because we should fix it without replacement native Promise core
            if (x instanceof P && sameConstructor(x.constructor, this)) return x;
            var capability = new PromiseCapability(this), $$resolve = capability.resolve;
            return $$resolve(x), capability.promise;
        }
    }), $export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(70)(function(iter) {
        P.all(iter)["catch"](function() {});
    })), PROMISE, {
        // 25.4.4.1 Promise.all(iterable)
        all: function(iterable) {
            var C = getConstructor(this), capability = new PromiseCapability(C), resolve = capability.resolve, reject = capability.reject, values = [], abrupt = perform(function() {
                forOf(iterable, !1, values.push, values);
                var remaining = values.length, results = Array(remaining);
                remaining ? $.each.call(values, function(promise, index) {
                    var alreadyCalled = !1;
                    C.resolve(promise).then(function(value) {
                        alreadyCalled || (alreadyCalled = !0, results[index] = value, --remaining || resolve(results));
                    }, reject);
                }) : resolve(results);
            });
            return abrupt && reject(abrupt.error), capability.promise;
        },
        // 25.4.4.4 Promise.race(iterable)
        race: function(iterable) {
            var C = getConstructor(this), capability = new PromiseCapability(C), reject = capability.reject, abrupt = perform(function() {
                forOf(iterable, !1, function(promise) {
                    C.resolve(promise).then(capability.resolve, reject);
                });
            });
            return abrupt && reject(abrupt.error), capability.promise;
        }
    });
}, /* 53 */
/***/
function(module, exports, __webpack_require__) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = __webpack_require__(27), TAG = __webpack_require__(22)("toStringTag"), ARG = "Arguments" == cof(function() {
        return arguments;
    }());
    module.exports = function(it) {
        var O, T, B;
        return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = (O = Object(it))[TAG]) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
    };
}, /* 54 */
/***/
function(module, exports) {
    module.exports = function(it, Constructor, name) {
        if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
        return it;
    };
}, /* 55 */
/***/
function(module, exports, __webpack_require__) {
    var ctx = __webpack_require__(15), call = __webpack_require__(56), isArrayIter = __webpack_require__(57), anObject = __webpack_require__(32), toLength = __webpack_require__(58), getIterFn = __webpack_require__(59);
    module.exports = function(iterable, entries, fn, that) {
        var length, step, iterator, iterFn = getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0;
        if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
        // fast case for arrays with default iterator
        if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]); else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) call(iterator, f, step.value, entries);
    };
}, /* 56 */
/***/
function(module, exports, __webpack_require__) {
    // call something on iterator step with safe closing on error
    var anObject = __webpack_require__(32);
    module.exports = function(iterator, fn, value, entries) {
        try {
            return entries ? fn(anObject(value)[0], value[1]) : fn(value);
        } catch (e) {
            var ret = iterator["return"];
            throw void 0 !== ret && anObject(ret.call(iterator)), e;
        }
    };
}, /* 57 */
/***/
function(module, exports, __webpack_require__) {
    // check on default Array iterator
    var Iterators = __webpack_require__(42), ITERATOR = __webpack_require__(22)("iterator"), ArrayProto = Array.prototype;
    module.exports = function(it) {
        return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
}, /* 58 */
/***/
function(module, exports, __webpack_require__) {
    // 7.1.15 ToLength
    var toInteger = __webpack_require__(40), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, /* 59 */
/***/
function(module, exports, __webpack_require__) {
    var classof = __webpack_require__(53), ITERATOR = __webpack_require__(22)("iterator"), Iterators = __webpack_require__(42);
    module.exports = __webpack_require__(14).getIteratorMethod = function(it) {
        return void 0 != it ? it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)] : void 0;
    };
}, /* 60 */
/***/
function(module, exports, __webpack_require__) {
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */
    var getDesc = __webpack_require__(8).getDesc, isObject = __webpack_require__(33), anObject = __webpack_require__(32), check = function(O, proto) {
        if (anObject(O), !isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
    };
    module.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? // eslint-disable-line
        function(test, buggy, set) {
            try {
                set = __webpack_require__(15)(Function.call, getDesc(Object.prototype, "__proto__").set, 2), 
                set(test, []), buggy = !(test instanceof Array);
            } catch (e) {
                buggy = !0;
            }
            return function(O, proto) {
                return check(O, proto), buggy ? O.__proto__ = proto : set(O, proto), O;
            };
        }({}, !1) : void 0),
        check: check
    };
}, /* 61 */
/***/
function(module, exports) {
    // 7.2.9 SameValue(x, y)
    module.exports = Object.is || function(x, y) {
        return x === y ? 0 !== x || 1 / x === 1 / y : x != x && y != y;
    };
}, /* 62 */
/***/
function(module, exports, __webpack_require__) {
    // 7.3.20 SpeciesConstructor(O, defaultConstructor)
    var anObject = __webpack_require__(32), aFunction = __webpack_require__(16), SPECIES = __webpack_require__(22)("species");
    module.exports = function(O, D) {
        var S, C = anObject(O).constructor;
        return void 0 === C || void 0 == (S = anObject(C)[SPECIES]) ? D : aFunction(S);
    };
}, /* 63 */
/***/
function(module, exports, __webpack_require__) {
    var head, last, notify, global = __webpack_require__(9), macrotask = __webpack_require__(64).set, Observer = global.MutationObserver || global.WebKitMutationObserver, process = global.process, Promise = global.Promise, isNode = "process" == __webpack_require__(27)(process), flush = function() {
        var parent, domain, fn;
        for (isNode && (parent = process.domain) && (process.domain = null, parent.exit()); head; ) domain = head.domain, 
        fn = head.fn, domain && domain.enter(), fn(), // <- currently we use it only for Promise - try / catch not required
        domain && domain.exit(), head = head.next;
        last = void 0, parent && parent.enter();
    };
    // Node.js
    if (isNode) notify = function() {
        process.nextTick(flush);
    }; else if (Observer) {
        var toggle = 1, node = document.createTextNode("");
        new Observer(flush).observe(node, {
            characterData: !0
        }), // eslint-disable-line no-new
        notify = function() {
            node.data = toggle = -toggle;
        };
    } else notify = Promise && Promise.resolve ? function() {
        Promise.resolve().then(flush);
    } : function() {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global, flush);
    };
    module.exports = function(fn) {
        var task = {
            fn: fn,
            next: void 0,
            domain: isNode && process.domain
        };
        last && (last.next = task), head || (head = task, notify()), last = task;
    };
}, /* 64 */
/***/
function(module, exports, __webpack_require__) {
    var defer, channel, port, ctx = __webpack_require__(15), invoke = __webpack_require__(65), html = __webpack_require__(66), cel = __webpack_require__(67), global = __webpack_require__(9), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, counter = 0, queue = {}, ONREADYSTATECHANGE = "onreadystatechange", run = function() {
        var id = +this;
        if (queue.hasOwnProperty(id)) {
            var fn = queue[id];
            delete queue[id], fn();
        }
    }, listner = function(event) {
        run.call(event.data);
    };
    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    setTask && clearTask || (setTask = function(fn) {
        for (var args = [], i = 1; arguments.length > i; ) args.push(arguments[i++]);
        return queue[++counter] = function() {
            invoke("function" == typeof fn ? fn : Function(fn), args);
        }, defer(counter), counter;
    }, clearTask = function(id) {
        delete queue[id];
    }, // Node.js 0.8-
    "process" == __webpack_require__(27)(process) ? defer = function(id) {
        process.nextTick(ctx(run, id, 1));
    } : MessageChannel ? (channel = new MessageChannel(), port = channel.port2, channel.port1.onmessage = listner, 
    defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(id) {
        global.postMessage(id + "", "*");
    }, global.addEventListener("message", listner, !1)) : defer = ONREADYSTATECHANGE in cel("script") ? function(id) {
        html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this), run.call(id);
        };
    } : function(id) {
        setTimeout(ctx(run, id, 1), 0);
    }), module.exports = {
        set: setTask,
        clear: clearTask
    };
}, /* 65 */
/***/
function(module, exports) {
    // fast apply, http://jsperf.lnkit.com/fast-apply/5
    module.exports = function(fn, args, that) {
        var un = void 0 === that;
        switch (args.length) {
          case 0:
            return un ? fn() : fn.call(that);

          case 1:
            return un ? fn(args[0]) : fn.call(that, args[0]);

          case 2:
            return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

          case 3:
            return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

          case 4:
            return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
        }
        return fn.apply(that, args);
    };
}, /* 66 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(9).document && document.documentElement;
}, /* 67 */
/***/
function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(33), document = __webpack_require__(9).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, /* 68 */
/***/
function(module, exports, __webpack_require__) {
    var redefine = __webpack_require__(17);
    module.exports = function(target, src) {
        for (var key in src) redefine(target, key, src[key]);
        return target;
    };
}, /* 69 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var core = __webpack_require__(14), $ = __webpack_require__(8), DESCRIPTORS = __webpack_require__(11), SPECIES = __webpack_require__(22)("species");
    module.exports = function(KEY) {
        var C = core[KEY];
        DESCRIPTORS && C && !C[SPECIES] && $.setDesc(C, SPECIES, {
            configurable: !0,
            get: function() {
                return this;
            }
        });
    };
}, /* 70 */
/***/
function(module, exports, __webpack_require__) {
    var ITERATOR = __webpack_require__(22)("iterator"), SAFE_CLOSING = !1;
    try {
        var riter = [ 7 ][ITERATOR]();
        riter["return"] = function() {
            SAFE_CLOSING = !0;
        }, Array.from(riter, function() {
            throw 2;
        });
    } catch (e) {}
    module.exports = function(exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) return !1;
        var safe = !1;
        try {
            var arr = [ 7 ], iter = arr[ITERATOR]();
            iter.next = function() {
                safe = !0;
            }, arr[ITERATOR] = function() {
                return iter;
            }, exec(arr);
        } catch (e) {}
        return safe;
    };
}, /* 71 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _getIterator = __webpack_require__(72)["default"], utils = {
        /**
	     * Trucates the string and adds ellipsis at the end.
	     * @param string        The string to be truncated
	     * @param n             Length to which it should be truncated
	     * @returns {string}    The truncated string
	     */
        truncate: function(string, n) {
            return string.substr(0, n - 1) + (string.length > n ? "..." : "");
        },
        /**
	     * Returns an array after removing the duplicates.
	     * @param array         The array containing the duplicates
	     * @returns {Array}     Array with unique values.
	     */
        getUnique: function(array) {
            var u = {}, a = [];
            return array.forEach(function(value) {
                u.hasOwnProperty(value) || (a.push(value), u[value] = 1);
            }), a;
        },
        /**
	     * Converts a string into legitimate url.
	     * @param string
	     */
        toUrl: function(string) {
            var url;
            return url = -1 == string.indexOf("//") ? "//" + string : string;
        },
        /**
	     * Extends an Object
	     * @param destination
	     * @param source
	     * @returns {*}
	     */
        deepExtend: function(destination, source) {
            for (var property in source) source[property] && source[property].constructor === Object ? (destination[property] = destination[property] || {}, 
            this.deepExtend(destination[property], source[property])) : destination[property] = source[property];
            return destination;
        },
        escapeRegExp: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
        /**
	     * Sort an array of objects based on the index value
	     * @param  {Array} arr Array to be sorted
	     * @return {Array}     Sorted array
	     */
        sortObject: function(arr) {
            return arr.sort(function(a, b) {
                return a.index - b.index;
            });
        },
        /**
	     * Creates the string of the iframes after sorting them and finally returning a string
	     * @param  {sring} str    String to which the created text has to be added
	     * @param  {object} embeds Sorted array of iframe html
	     * @return {string}        String to be rendered
	     */
        createText: function(str, embeds) {
            for (var sortedEmbeds = this.sortObject(embeds), _iterator = sortedEmbeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    if (_i = _iterator.next(), _i.done) break;
                    _ref = _i.value;
                }
                var embed = _ref;
                str += " " + embed.text;
            }
            return str;
        },
        /**
	     * Matches the string and finds the substrings matching to the provided regex pattern
	     * @param  {object} regex Regex pattern
	     * @param  {string} input The string to be analyzed
	     * @return {object}       Returns the matched substring with their corresponding positions
	     */
        matches: function(regex, input) {
            return regex.exec(input);
        },
        /**
	     * Checks wheteher a particular service should be embedded or not based on
	     * the setting provided by the user
	     * @param  {object} options The options provided by the user
	     * @param  {string} service Name of the service for which the condition is to be analyzed
	     * @return {boolean}        True if it should be embedded
	     */
        ifEmbed: function(options, service) {
            return -1 == options.excludeEmbed.indexOf(service) && "all" !== options.excludeEmbed;
        },
        ifInline: function(options, service) {
            return -1 == options.inlineEmbed.indexOf(service) && "all" !== options.inlineEmbed;
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
            if (options.videoHeight && options.videoWidth) return dimensions;
            if (options.videoHeight) return dimensions.width = options.videoHeight / 3 * 4, 
            dimensions;
            if (options.videoWidth) return dimensions.height = dimensions.width / 4 * 3, dimensions;
            var _ref2 = [ 800, 600 ];
            return dimensions.width = _ref2[0], dimensions.height = _ref2[1], dimensions;
        },
        /**
	     * Returns a cloned object
	     * @param  {object} obj
	     * @return {object}     cloned object
	     */
        cloneObject: function(obj) {
            if (null === obj || "object" != typeof obj) return obj;
            var temp = obj.constructor();
            // give temp the original obj's constructor
            for (var key in obj) temp[key] = this.cloneObject(obj[key]);
            return temp;
        }
    };
    module.exports = utils;
}, /* 72 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(73),
        __esModule: !0
    };
}, /* 73 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(44), __webpack_require__(38), module.exports = __webpack_require__(74);
}, /* 74 */
/***/
function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(32), get = __webpack_require__(59);
    module.exports = __webpack_require__(14).getIterator = function(it) {
        var iterFn = get(it);
        if ("function" != typeof iterFn) throw TypeError(it + " is not iterable!");
        return anObject(iterFn.call(it));
    };
}, /* 75 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], Emoji = function() {
        function Emoji(input, options) {
            _classCallCheck(this, Emoji), this.input = input, this.options = options, this.emojiList = [ "bowtie", "smile", "laughing", "blush", "smiley", "relaxed", "smirk", "heart_eyes", "kissing_heart", "kissing_closed_eyes", "flushed", "relieved", "satisfied", "grin", "wink", "stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "grinning", "kissing", "winky_face", "kissing_smiling_eyes", "stuck_out_tongue", "sleeping", "worried", "frowning", "anguished", "open_mouth", "grimacing", "confused", "hushed", "expressionless", "unamused", "sweat_smile", "sweat", "wow", "disappointed_relieved", "weary", "pensive", "disappointed", "confounded", "fearful", "cold_sweat", "persevere", "cry", "sob", "joy", "astonished", "scream", "neckbeard", "tired_face", "angry", "rage", "triumph", "sleepy", "yum", "mask", "sunglasses", "dizzy_face", "imp", "smiling_imp", "neutral_face", "no_mouth", "innocent", "alien", "yellow_heart", "blue_heart", "purple_heart", "heart", "green_heart", "broken_heart", "heartbeat", "heartpulse", "two_hearts", "revolving_hearts", "cupid", "sparkling_heart", "sparkles", "star", "star2", "dizzy", "boom", "collision", "anger", "exclamation", "question", "grey_exclamation", "grey_question", "zzz", "dash", "sweat_drops", "notes", "musical_note", "fire", "hankey", "poop", "shit", "\\+1", "thumbsup", "-1", "thumbsdown", "ok_hand", "punch", "facepunch", "fist", "v", "wave", "hand", "raised_hand", "open_hands", "point_up", "point_down", "point_left", "point_right", "raised_hands", "pray", "point_up_2", "clap", "muscle", "metal", "fu", "walking", "runner", "running", "couple", "family", "two_men_holding_hands", "two_women_holding_hands", "dancer", "dancers", "ok_woman", "no_good", "information_desk_person", "raising_hand", "bride_with_veil", "person_with_pouting_face", "person_frowning", "bow", "couplekiss", "couple_with_heart", "massage", "haircut", "nail_care", "boy", "girl", "woman", "man", "baby", "older_woman", "older_man", "person_with_blond_hair", "man_with_gua_pi_mao", "man_with_turban", "construction_worker", "cop", "angel", "princess", "smiley_cat", "smile_cat", "heart_eyes_cat", "kissing_cat", "smirk_cat", "scream_cat", "crying_cat_face", "joy_cat", "pouting_cat", "japanese_ogre", "japanese_goblin", "see_no_evil", "hear_no_evil", "speak_no_evil", "guardsman", "skull", "feet", "lips", "kiss", "droplet", "ear", "eyes", "nose", "tongue", "love_letter", "bust_in_silhouette", "busts_in_silhouette", "speech_balloon", "thought_balloon", "feelsgood", "finnadie", "goberserk", "godmode", "hurtrealbad", "rage1", "rage2", "rage3", "rage4", "suspect", "trollface", "sunny", "umbrella", "cloud", "snowflake", "snowman", "zap", "cyclone", "foggy", "ocean", "cat", "dog", "mouse", "hamster", "rabbit", "wolf", "frog", "tiger", "koala", "bear", "pig", "pig_nose", "cow", "boar", "monkey_face", "monkey", "horse", "racehorse", "camel", "sheep", "elephant", "panda_face", "snake", "bird", "baby_chick", "hatched_chick", "hatching_chick", "chicken", "penguin", "turtle", "bug", "honeybee", "ant", "beetle", "snail", "octopus", "tropical_fish", "fish", "whale", "whale2", "dolphin", "cow2", "ram", "rat", "water_buffalo", "tiger2", "rabbit2", "dragon", "goat", "rooster", "dog2", "pig2", "mouse2", "ox", "dragon_face", "blowfish", "crocodile", "dromedary_camel", "leopard", "cat2", "poodle", "paw_prints", "bouquet", "cherry_blossom", "tulip", "four_leaf_clover", "rose", "sunflower", "hibiscus", "maple_leaf", "leaves", "fallen_leaf", "herb", "mushroom", "cactus", "palm_tree", "evergreen_tree", "deciduous_tree", "chestnut", "seedling", "blossom", "ear_of_rice", "shell", "globe_with_meridians", "sun_with_face", "full_moon_with_face", "new_moon_with_face", "new_moon", "waxing_crescent_moon", "first_quarter_moon", "waxing_gibbous_moon", "full_moon", "waning_gibbous_moon", "last_quarter_moon", "waning_crescent_moon", "last_quarter_moon_with_face", "first_quarter_moon_with_face", "moon", "earth_africa", "earth_americas", "earth_asia", "volcano", "milky_way", "partly_sunny", "octocat", "squirrel", "bamboo", "gift_heart", "dolls", "school_satchel", "mortar_board", "flags", "fireworks", "sparkler", "wind_chime", "rice_scene", "jack_o_lantern", "ghost", "santa", "christmas_tree", "gift", "bell", "no_bell", "tanabata_tree", "tada", "confetti_ball", "balloon", "crystal_ball", "cd", "dvd", "floppy_disk", "camera", "video_camera", "movie_camera", "computer", "tv", "iphone", "phone", "telephone", "telephone_receiver", "pager", "fax", "minidisc", "vhs", "sound", "speaker", "mute", "loudspeaker", "mega", "hourglass", "hourglass_flowing_sand", "alarm_clock", "watch", "radio", "satellite", "loop", "mag", "mag_right", "unlock", "lock", "lock_with_ink_pen", "closed_lock_with_key", "key", "bulb", "flashlight", "high_brightness", "low_brightness", "electric_plug", "battery", "calling", "email", "mailbox", "postbox", "bath", "bathtub", "shower", "toilet", "wrench", "nut_and_bolt", "hammer", "seat", "moneybag", "yen", "dollar", "pound", "euro", "credit_card", "money_with_wings", "e-mail", "inbox_tray", "outbox_tray", "envelope", "incoming_envelope", "postal_horn", "mailbox_closed", "mailbox_with_mail", "mailbox_with_no_mail", "door", "smoking", "bomb", "gun", "hocho", "pill", "syringe", "page_facing_up", "page_with_curl", "bookmark_tabs", "bar_chart", "chart_with_upwards_trend", "chart_with_downwards_trend", "scroll", "clipboard", "calendar", "date", "card_index", "file_folder", "open_file_folder", "scissors", "pushpin", "paperclip", "black_nib", "pencil2", "straight_ruler", "triangular_ruler", "closed_book", "green_book", "blue_book", "orange_book", "notebook", "notebook_with_decorative_cover", "ledger", "books", "bookmark", "name_badge", "microscope", "telescope", "newspaper", "football", "basketball", "soccer", "baseball", "tennis", "8ball", "rugby_football", "bowling", "golf", "mountain_bicyclist", "bicyclist", "horse_racing", "snowboarder", "swimmer", "surfer", "ski", "spades", "hearts", "clubs", "diamonds", "gem", "ring", "trophy", "musical_score", "musical_keyboard", "violin", "space_invader", "video_game", "black_joker", "flower_playing_cards", "game_die", "dart", "mahjong", "clapper", "memo", "pencil", "book", "art", "microphone", "headphones", "trumpet", "saxophone", "guitar", "shoe", "sandal", "high_heel", "lipstick", "boot", "shirt", "tshirt", "necktie", "womans_clothes", "dress", "running_shirt_with_sash", "jeans", "kimono", "bikini", "ribbon", "tophat", "crown", "womans_hat", "mans_shoe", "closed_umbrella", "briefcase", "handbag", "pouch", "purse", "eyeglasses", "fishing_pole_and_fish", "coffee", "tea", "sake", "baby_bottle", "beer", "beers", "cocktail", "tropical_drink", "wine_glass", "fork_and_knife", "pizza", "hamburger", "fries", "poultry_leg", "meat_on_bone", "spaghetti", "curry", "fried_shrimp", "bento", "sushi", "fish_cake", "rice_ball", "rice_cracker", "rice", "ramen", "stew", "oden", "dango", "egg", "bread", "doughnut", "custard", "icecream", "ice_cream", "shaved_ice", "birthday", "cake", "cookie", "chocolate_bar", "candy", "lollipop", "honey_pot", "apple", "green_apple", "tangerine", "lemon", "cherries", "grapes", "watermelon", "strawberry", "peach", "melon", "banana", "pear", "pineapple", "sweet_potato", "eggplant", "tomato", "corn", "house", "house_with_garden", "school", "office", "post_office", "hospital", "bank", "convenience_store", "love_hotel", "hotel", "wedding", "church", "department_store", "european_post_office", "city_sunrise", "city_sunset", "japanese_castle", "european_castle", "tent", "factory", "tokyo_tower", "japan", "mount_fuji", "sunrise_over_mountains", "sunrise", "stars", "themoreyouknow", "tmyk", "statue_of_liberty", "bridge_at_night", "carousel_horse", "rainbow", "ferris_wheel", "fountain", "roller_coaster", "ship", "speedboat", "boat", "sailboat", "rowboat", "anchor", "rocket", "airplane", "helicopter", "steam_locomotive", "tram", "mountain_railway", "bike", "aerial_tramway", "suspension_railway", "mountain_cableway", "tractor", "blue_car", "oncoming_automobile", "car", "red_car", "taxi", "oncoming_taxi", "articulated_lorry", "bus", "oncoming_bus", "rotating_light", "police_car", "oncoming_police_car", "fire_engine", "ambulance", "minibus", "truck", "train", "station", "train2", "bullettrain_front", "bullettrain_side", "light_rail", "monorail", "railway_car", "trolleybus", "ticket", "fuelpump", "vertical_traffic_light", "traffic_light", "warning", "construction", "beginner", "atm", "slot_machine", "busstop", "barber", "hotsprings", "checkered_flag", "crossed_flags", "izakaya_lantern", "moyai", "circus_tent", "performing_arts", "round_pushpin", "triangular_flag_on_post", "jp", "kr", "cn", "us", "fr", "es", "it", "ru", "gb", "uk", "de", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "keycap_ten", "1234", "zero", "hash", "symbols", "arrow_backward", "arrow_down", "arrow_forward", "arrow_left", "capital_abcd", "abcd", "abc", "arrow_lower_left", "arrow_lower_right", "arrow_right", "arrow_up", "arrow_upper_left", "arrow_upper_right", "arrow_double_down", "arrow_double_up", "arrow_down_small", "arrow_heading_down", "arrow_heading_up", "leftwards_arrow_with_hook", "arrow_right_hook", "left_right_arrow", "arrow_up_down", "arrow_up_small", "arrows_clockwise", "arrows_counterclockwise", "rewind", "fast_forward", "information_source", "ok", "twisted_rightwards_arrows", "repeat", "repeat_one", "new", "top", "up", "cool", "free", "ng", "cinema", "koko", "signal_strength", "u5272", "u5408", "u55b6", "u6307", "u6708", "u6709", "u6e80", "u7121", "u7533", "u7a7a", "u7981", "sa", "restroom", "mens", "womens", "baby_symbol", "no_smoking", "parking", "wheelchair", "metro", "baggage_claim", "accept", "wc", "potable_water", "put_litter_in_its_place", "secret", "congratulations", "m", "passport_control", "left_luggage", "customs", "ideograph_advantage", "cl", "sos", "id", "no_entry_sign", "underage", "no_mobile_phones", "do_not_litter", "non-potable_water", "no_bicycles", "no_pedestrians", "children_crossing", "no_entry", "eight_spoked_asterisk", "eight_pointed_black_star", "heart_decoration", "vs", "vibration_mode", "mobile_phone_off", "chart", "currency_exchange", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpius", "sagittarius", "capricorn", "aquarius", "pisces", "ophiuchus", "six_pointed_star", "negative_squared_cross_mark", "a", "b", "ab", "o2", "diamond_shape_with_a_dot_inside", "recycle", "end", "on", "soon", "clock1", "clock130", "clock10", "clock1030", "clock11", "clock1130", "clock12", "clock1230", "clock2", "clock230", "clock3", "clock330", "clock4", "clock430", "clock5", "clock530", "clock6", "clock630", "clock7", "clock730", "clock8", "clock830", "clock9", "clock930", "heavy_dollar_sign", "copyright", "registered", "tm", "x", "heavy_exclamation_mark", "bangbang", "interrobang", "o", "heavy_multiplication_x", "heavy_plus_sign", "heavy_minus_sign", "heavy_division_sign", "white_flower", "100", "heavy_check_mark", "ballot_box_with_check", "radio_button", "link", "curly_loop", "wavy_dash", "part_alternation_mark", "trident", "black_square", "white_square", "white_check_mark", "black_square_button", "white_square_button", "black_circle", "white_circle", "red_circle", "large_blue_circle", "large_blue_diamond", "large_orange_diamond", "small_blue_diamond", "small_orange_diamond", "small_red_triangle", "small_red_triangle_down", "shipit" ], 
            this.allEmojiList = this.emojiList.concat(this.options.customEmoji), this.emojiRegex = new RegExp(":(" + this.allEmojiList.join("|") + "):", "g");
        }
        return Emoji.prototype.process = function() {
            return this.input.replace(this.emojiRegex, function(match, text) {
                return '<span class="emoticon emoticon-' + text + '" title=":' + text + ':"></span>';
            });
        }, Emoji;
    }();
    module.exports = Emoji;
}, /* 76 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Smiley = function() {
        function Smiley(input, options) {
            _classCallCheck(this, Smiley), this.input = " " + input + " ";
            //hack to consider the first and last element
            var defaultIcons = [ {
                text: " :) ",
                code: "&#xe60a"
            }, {
                text: " :D ",
                code: "&#xe608"
            }, {
                text: " :d ",
                code: "&#xe608"
            }, {
                text: " :( ",
                code: "&#xe60e"
            }, {
                text: " :/ ",
                code: "&#xe620"
            }, {
                text: " :P ",
                code: "&#xe60c"
            }, {
                text: " :p ",
                code: "&#xe60c"
            }, {
                text: " 3:) ",
                code: "&#xe618"
            }, {
                text: " (^) ",
                code: "&#xe607"
            }, {
                text: " ;) ",
                code: "&#xe610"
            }, {
                text: " :o ",
                code: "&#xe61a"
            }, {
                text: " -_- ",
                code: "&#xe61e"
            }, {
                text: " (y) ",
                code: "&#xe606"
            }, {
                text: " :* ",
                code: "&#xe604"
            }, {
                text: " &lt;3 ",
                code: "&#xe604"
            }, {
                text: " <3 ",
                code: "&#xe604"
            }, {
                text: " &lt;/3 ",
                code: "&#xe605"
            }, {
                text: " </3 ",
                code: "&#xe605"
            }, {
                text: " ^_^ ",
                code: "&#xe612"
            }, {
                text: " 8-) ",
                code: "&#xe614"
            }, {
                text: " 8| ",
                code: "&#xe614"
            }, {
                text: " :S ",
                code: "&#xe61c"
            }, {
                text: " :s ",
                code: "&#xe61c"
            } ];
            this.icons = options.customFontIcons.length ? options.customFontIcons : defaultIcons, 
            this.EscapedSymbols = this.icons.map(function(val) {
                return "" + utils.escapeRegExp(val.text);
            }), this.smileyRegex = new RegExp("(" + this.EscapedSymbols.join("|") + ")", "g");
        }
        return Smiley.prototype.process = function() {
            var _this = this, processedString = this.input.replace(this.smileyRegex, function(match, text) {
                var index = _this.EscapedSymbols.indexOf(utils.escapeRegExp(text)), code = _this.icons[index].code;
                return ' <span class="icon-emoticon" title="' + text + '">' + code + "</span> ";
            });
            return processedString.substring(1, processedString.length - 1);
        }, Smiley;
    }();
    module.exports = Smiley;
}, /* 77 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Url = function() {
        function Url(input, options) {
            _classCallCheck(this, Url), this.input = input, this.options = options, this.urlRegex = /((href|src)=["']|)(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(?:https?:\/\/)?(?:(?:0rz\.tw)|(?:1link\.in)|(?:1url\.com)|(?:2\.gp)|(?:2big\.at)|(?:2tu\.us)|(?:3\.ly)|(?:307\.to)|(?:4ms\.me)|(?:4sq\.com)|(?:4url\.cc)|(?:6url\.com)|(?:7\.ly)|(?:a\.gg)|(?:a\.nf)|(?:aa\.cx)|(?:abcurl\.net)|(?:ad\.vu)|(?:adf\.ly)|(?:adjix\.com)|(?:afx\.cc)|(?:all\.fuseurl.com)|(?:alturl\.com)|(?:amzn\.to)|(?:ar\.gy)|(?:arst\.ch)|(?:atu\.ca)|(?:azc\.cc)|(?:b23\.ru)|(?:b2l\.me)|(?:bacn\.me)|(?:bcool\.bz)|(?:binged\.it)|(?:bit\.ly)|(?:buff\.ly)|(?:bizj\.us)|(?:bloat\.me)|(?:bravo\.ly)|(?:bsa\.ly)|(?:budurl\.com)|(?:canurl\.com)|(?:chilp\.it)|(?:chzb\.gr)|(?:cl\.lk)|(?:cl\.ly)|(?:clck\.ru)|(?:cli\.gs)|(?:cliccami\.info)|(?:clickthru\.ca)|(?:clop\.in)|(?:conta\.cc)|(?:cort\.as)|(?:cot\.ag)|(?:crks\.me)|(?:ctvr\.us)|(?:cutt\.us)|(?:dai\.ly)|(?:decenturl\.com)|(?:dfl8\.me)|(?:digbig\.com)|(?:digg\.com)|(?:disq\.us)|(?:dld\.bz)|(?:dlvr\.it)|(?:do\.my)|(?:doiop\.com)|(?:dopen\.us)|(?:easyuri\.com)|(?:easyurl\.net)|(?:eepurl\.com)|(?:eweri\.com)|(?:fa\.by)|(?:fav\.me)|(?:fb\.me)|(?:fbshare\.me)|(?:ff\.im)|(?:fff\.to)|(?:fire\.to)|(?:firsturl\.de)|(?:firsturl\.net)|(?:flic\.kr)|(?:flq\.us)|(?:fly2\.ws)|(?:fon\.gs)|(?:freak\.to)|(?:fuseurl\.com)|(?:fuzzy\.to)|(?:fwd4\.me)|(?:fwib\.net)|(?:g\.ro.lt)|(?:gizmo\.do)|(?:gl\.am)|(?:go\.9nl.com)|(?:go\.ign.com)|(?:go\.usa.gov)|(?:goo\.gl)|(?:goshrink\.com)|(?:gurl\.es)|(?:hex\.io)|(?:hiderefer\.com)|(?:hmm\.ph)|(?:href\.in)|(?:hsblinks\.com)|(?:htxt\.it)|(?:huff\.to)|(?:hulu\.com)|(?:hurl\.me)|(?:hurl\.ws)|(?:icanhaz\.com)|(?:idek\.net)|(?:ilix\.in)|(?:is\.gd)|(?:its\.my)|(?:ix\.lt)|(?:j\.mp)|(?:jijr\.com)|(?:kl\.am)|(?:klck\.me)|(?:korta\.nu)|(?:krunchd\.com)|(?:l9k\.net)|(?:lat\.ms)|(?:liip\.to)|(?:liltext\.com)|(?:linkbee\.com)|(?:linkbun\.ch)|(?:liurl\.cn)|(?:ln-s\.net)|(?:ln-s\.ru)|(?:lnk\.gd)|(?:lnk\.ms)|(?:lnkd\.in)|(?:lnkurl\.com)|(?:lru\.jp)|(?:lt\.tl)|(?:lurl\.no)|(?:macte\.ch)|(?:mash\.to)|(?:merky\.de)|(?:migre\.me)|(?:miniurl\.com)|(?:minurl\.fr)|(?:mke\.me)|(?:moby\.to)|(?:moourl\.com)|(?:mrte\.ch)|(?:myloc\.me)|(?:myurl\.in)|(?:n\.pr)|(?:nbc\.co)|(?:nblo\.gs)|(?:nn\.nf)|(?:not\.my)|(?:notlong\.com)|(?:nsfw\.in)|(?:nutshellurl\.com)|(?:nxy\.in)|(?:nyti\.ms)|(?:o-x\.fr)|(?:oc1\.us)|(?:om\.ly)|(?:omf\.gd)|(?:omoikane\.net)|(?:on\.cnn.com)|(?:on\.mktw.net)|(?:onforb\.es)|(?:orz\.se)|(?:ow\.ly)|(?:ping\.fm)|(?:pli\.gs)|(?:pnt\.me)|(?:politi\.co)|(?:post\.ly)|(?:pp\.gg)|(?:profile\.to)|(?:ptiturl\.com)|(?:pub\.vitrue.com)|(?:qlnk\.net)|(?:qte\.me)|(?:qu\.tc)|(?:qy\.fi)|(?:r\.im)|(?:rb6\.me)|(?:read\.bi)|(?:readthis\.ca)|(?:reallytinyurl\.com)|(?:redir\.ec)|(?:redirects\.ca)|(?:redirx\.com)|(?:retwt\.me)|(?:ri\.ms)|(?:rickroll\.it)|(?:riz\.gd)|(?:rt\.nu)|(?:ru\.ly)|(?:rubyurl\.com)|(?:rurl\.org)|(?:rww\.tw)|(?:s4c\.in)|(?:s7y\.us)|(?:safe\.mn)|(?:sameurl\.com)|(?:sdut\.us)|(?:shar\.es)|(?:shink\.de)|(?:shorl\.com)|(?:short\.ie)|(?:short\.to)|(?:shortlinks\.co.uk)|(?:shorturl\.com)|(?:shout\.to)|(?:show\.my)|(?:shrinkify\.com)|(?:shrinkr\.com)|(?:shrt\.fr)|(?:shrt\.st)|(?:shrten\.com)|(?:shrunkin\.com)|(?:simurl\.com)|(?:slate\.me)|(?:smallr\.com)|(?:smsh\.me)|(?:smurl\.name)|(?:sn\.im)|(?:snipr\.com)|(?:snipurl\.com)|(?:snurl\.com)|(?:sp2\.ro)|(?:spedr\.com)|(?:srnk\.net)|(?:srs\.li)|(?:starturl\.com)|(?:su\.pr)|(?:surl\.co.uk)|(?:surl\.hu)|(?:t\.cn)|(?:t\.co)|(?:t\.lh.com)|(?:ta\.gd)|(?:tbd\.ly)|(?:tcrn\.ch)|(?:tgr\.me)|(?:tgr\.ph)|(?:tighturl\.com)|(?:tiniuri\.com)|(?:tiny\.cc)|(?:tiny\.ly)|(?:tiny\.pl)|(?:tinylink\.in)|(?:tinyuri\.ca)|(?:tinyurl\.com)|(?:tl\.gd)|(?:tmi\.me)|(?:tnij\.org)|(?:tnw\.to)|(?:tny\.com)|(?:to\.ly)|(?:togoto\.us)|(?:totc\.us)|(?:toysr\.us)|(?:tpm\.ly)|(?:tr\.im)|(?:tra\.kz)|(?:trunc\.it)|(?:twhub\.com)|(?:twirl\.at)|(?:twitclicks\.com)|(?:twitterurl\.net)|(?:twitterurl\.org)|(?:twiturl\.de)|(?:twurl\.cc)|(?:twurl\.nl)|(?:u\.mavrev.com)|(?:u\.nu)|(?:u76\.org)|(?:ub0\.cc)|(?:ulu\.lu)|(?:updating\.me)|(?:ur1\.ca)|(?:url\.az)|(?:url\.co.uk)|(?:url\.ie)|(?:url360\.me)|(?:url4\.eu)|(?:urlborg\.com)|(?:urlbrief\.com)|(?:urlcover\.com)|(?:urlcut\.com)|(?:urlenco\.de)|(?:urli\.nl)|(?:urls\.im)|(?:urlshorteningservicefortwitter\.com)|(?:urlx\.ie)|(?:urlzen\.com)|(?:usat\.ly)|(?:use\.my)|(?:vb\.ly)|(?:vgn\.am)|(?:vl\.am)|(?:vm\.lc)|(?:w55\.de)|(?:wapo\.st)|(?:wapurl\.co.uk)|(?:wipi\.es)|(?:wp\.me)|(?:x\.vu)|(?:xr\.com)|(?:xrl\.in)|(?:xrl\.us)|(?:xurl\.es)|(?:xurl\.jp)|(?:y\.ahoo.it)|(?:yatuc\.com)|(?:ye\.pe)|(?:yep\.it)|(?:yfrog\.com)|(?:yhoo\.it)|(?:yiyd\.com)|(?:youtu\.be)|(?:yuarel\.com)|(?:z0p\.de)|(?:zi\.ma)|(?:zi\.mu)|(?:zipmyurl\.com)|(?:zud\.me)|(?:zurl\.ws)|(?:zz\.gd)|(?:zzang\.kr)|(?:›\.ws)|(?:✩\.ws)|(?:✿\.ws)|(?:❥\.ws)|(?:➔\.ws)|(?:➞\.ws)|(?:➡\.ws)|(?:➨\.ws)|(?:➯\.ws)|(?:➹\.ws)|(?:➽\.ws))\/[a-z0-9]*/gi;
        }
        return Url.prototype.process = function() {
            var config = this.options.linkOptions;
            return this.input.replace(this.urlRegex, function(match) {
                var extension = match.split(".")[match.split(".").length - 1];
                return -1 === config.exclude.indexOf(extension) ? '<a href="' + utils.toUrl(match) + '" rel="' + config.rel + '" target="' + config.target + '">' + match + "</a>" : match;
            });
        }, Url;
    }();
    module.exports = Url;
}, /* 78 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(fetchJsonp) {
        "use strict";
        var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), Twitter = function() {
            function Twitter(input, output, options, embeds) {
                _classCallCheck(this, Twitter), this.input = input, this.output = output, this.options = options, 
                this.embeds = embeds, this.regex = /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi, this.service = "twitter", 
                this.load = this.load.bind(this), this.options.element.addEventListener("rendered", this.load, !1);
            }
            /**
	     * Fetches the data from twitter's oEmbed API
	     * @param  {string} url URL of the tweet
	     * @return {object}     data containing the tweet info
	     */ /**
	     * Load twitter widgets
	     * @return {}
	     */ return Twitter.prototype.tweetData = function(url) {
                var config, apiUrl, response, data;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        return config = this.options.tweetOptions, apiUrl = "https://api.twitter.com/1/statuses/oembed.json?omit_script=true&url=" + url + "&maxwidth=" + config.maxWidth + "&hide_media=" + config.hideMedia + "&hide_thread=" + config.hideThread + "&align=" + config.align + "&lang=" + config.lang, 
                        context$2$0.next = 4, _regeneratorRuntime.awrap(fetchJsonp(apiUrl, {
                            credentials: "include"
                        }));

                      case 4:
                        return response = context$2$0.sent, context$2$0.next = 7, _regeneratorRuntime.awrap(response.json());

                      case 7:
                        return data = context$2$0.sent, context$2$0.abrupt("return", data);

                      case 9:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this);
            }, Twitter.prototype.load = function() {
                var _this = this;
                twttr.widgets.load(this.options.element), //here this refers to the element
                //Execute the function after the widget is loaded
                twttr.events.bind("loaded", function() {
                    _this.options.onTweetsLoad();
                });
            }, Twitter.prototype.process = function() {
                var regexInline, match, url, data, text;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        if (context$2$0.prev = 0, utils.ifInline(this.options, this.service)) {
                            context$2$0.next = 15;
                            break;
                        }
                        regexInline = this.options.link ? new RegExp("([^>]*" + this.regex.source + ")</a>", "gi") : new RegExp("([^\\s]*" + this.regex.source + ")", "gi"), 
                        match = void 0;

                      case 4:
                        if (null === (match = utils.matches(regexInline, this.output))) {
                            context$2$0.next = 13;
                            break;
                        }
                        return url = this.options.link ? match[0].slice(0, -4) : match[0], context$2$0.next = 8, 
                        _regeneratorRuntime.awrap(this.tweetData(url));

                      case 8:
                        data = context$2$0.sent, text = data.html, this.options.link ? this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text + "</a>") : this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text), 
                        context$2$0.next = 4;
                        break;

                      case 13:
                        context$2$0.next = 23;
                        break;

                      case 15:
                        match = void 0;

                      case 16:
                        if (null === (match = utils.matches(this.regex, this.input))) {
                            context$2$0.next = 23;
                            break;
                        }
                        return context$2$0.next = 19, _regeneratorRuntime.awrap(this.tweetData(match[0]));

                      case 19:
                        data = context$2$0.sent, this.embeds.push({
                            text: data.html,
                            index: match.index
                        }), context$2$0.next = 16;
                        break;

                      case 23:
                        return context$2$0.abrupt("return", [ this.output, this.embeds ]);

                      case 26:
                        context$2$0.prev = 26, context$2$0.t0 = context$2$0["catch"](0);

                      case 29:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this, [ [ 0, 26 ] ]);
            }, Twitter;
        }();
        module.exports = Twitter;
    }).call(exports, __webpack_require__(79));
}, /* 79 */
/***/
function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    !function(global, factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ exports, module ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, 
        __WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof __WEBPACK_AMD_DEFINE_FACTORY__ ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
        !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }(this, function(exports, module) {
        "use strict";
        function generateCallbackFunction() {
            return "jsonp_" + Date.now() + "_" + Math.ceil(1e5 * Math.random());
        }
        // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
        function clearFunction(functionName) {
            // IE8 throws an exception when you try to delete a property on window
            // http://stackoverflow.com/a/1824228/751089
            try {
                delete window[functionName];
            } catch (e) {
                window[functionName] = void 0;
            }
        }
        function removeScript(scriptId) {
            var script = document.getElementById(scriptId);
            document.getElementsByTagName("head")[0].removeChild(script);
        }
        var defaultOptions = {
            timeout: 5e3,
            jsonpCallback: "callback"
        }, fetchJsonp = function(url) {
            var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], timeout = null != options.timeout ? options.timeout : defaultOptions.timeout, jsonpCallback = null != options.jsonpCallback ? options.jsonpCallback : defaultOptions.jsonpCallback, timeoutId = void 0;
            return new Promise(function(resolve, reject) {
                var callbackFunction = generateCallbackFunction();
                window[callbackFunction] = function(response) {
                    resolve({
                        ok: !0,
                        // keep consistent with fetch API
                        json: function() {
                            return Promise.resolve(response);
                        }
                    }), timeoutId && clearTimeout(timeoutId), removeScript(jsonpCallback + "_" + callbackFunction), 
                    clearFunction(callbackFunction);
                }, // Check if the user set their own params, and if not add a ? to start a list of params
                url += -1 === url.indexOf("?") ? "?" : "&";
                var jsonpScript = document.createElement("script");
                jsonpScript.setAttribute("src", url + jsonpCallback + "=" + callbackFunction), jsonpScript.id = jsonpCallback + "_" + callbackFunction, 
                document.getElementsByTagName("head")[0].appendChild(jsonpScript), timeoutId = setTimeout(function() {
                    reject(new Error("JSONP request to " + url + " timed out")), clearFunction(callbackFunction), 
                    removeScript(jsonpCallback + "_" + callbackFunction);
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
}, /* 80 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(fetch) {
        "use strict";
        var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), Gmap = function() {
            function Gmap(input, output, options, embeds) {
                _classCallCheck(this, Gmap), this.input = input, this.output = output, this.options = options, 
                this.embeds = embeds, this.service = "map", this.regex = /@\((.+)\)/gi;
            }
            return Gmap.prototype.getCoordinate = function(location) {
                var url, response, data, latitude, longitude;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        return url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&sensor=false", 
                        context$2$0.next = 3, _regeneratorRuntime.awrap(fetch(url));

                      case 3:
                        return response = context$2$0.sent, context$2$0.next = 6, _regeneratorRuntime.awrap(response.json());

                      case 6:
                        return data = context$2$0.sent, latitude = data.results[0].geometry.location.lat, 
                        longitude = data.results[0].geometry.location.lng, context$2$0.abrupt("return", [ latitude, longitude ]);

                      case 11:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this);
            }, Gmap.prototype.template = function(match, latitude, longitude) {
                var location = match.split("(")[1].split(")")[0], config = this.options.mapOptions, dimensions = utils.dimensions(this.options);
                return "place" === config.mode ? '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/place?key=' + this.options.googleAuthKey + "&q=" + location + '"></iframe></div>' : "streetview" === config.mode ? '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/streetview?key=' + this.options.googleAuthKey + "&location=" + latitude + "," + longitude + '&heading=210&pitch=10&fov=35"></iframe></div>' : "view" === config.mode ? '<div class="ejs-embed ejs-map"><iframe width="' + dimensions.width + '" height="' + dimensions.height + '" src="https://www.google.com/maps/embed/v1/view?key=' + this.options.googleAuthKey + "&center=" + latitude + "," + longitude + '&zoom=18&maptype=satellite"></iframe></div>' : void 0;
            }, Gmap.prototype.process = function() {
                var match, _loop;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (var _this = this; ;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        match = void 0, _loop = function() {
                            var _ref, latitude, longitude, text;
                            return _regeneratorRuntime.async(function(context$3$0) {
                                for (;;) switch (context$3$0.prev = context$3$0.next) {
                                  case 0:
                                    if ("place" === this.options.mapOptions.mode) {
                                        context$3$0.next = 6;
                                        break;
                                    }
                                    return context$3$0.next = 3, _regeneratorRuntime.awrap(this.getCoordinate(match[0]));

                                  case 3:
                                    context$3$0.t0 = context$3$0.sent, context$3$0.next = 7;
                                    break;

                                  case 6:
                                    context$3$0.t0 = [ null, null ];

                                  case 7:
                                    _ref = context$3$0.t0, latitude = _ref[0], longitude = _ref[1], text = this.template(match[0], latitude, longitude), 
                                    utils.ifInline(this.options, this.service) ? (this.embeds.push({
                                        text: text,
                                        index: match.index
                                    }), this.output = this.output.replace(this.regex, function(match) {
                                        return '<span class="ejs-location">' + match.split("(")[1].split(")")[0] + "</span>";
                                    })) : this.output = this.output.replace(this.regex, function(match) {
                                        return '<span class="ejs-location">' + match.split("(")[1].split(")")[0] + "</span>" + text;
                                    });

                                  case 12:
                                  case "end":
                                    return context$3$0.stop();
                                }
                            }, null, _this);
                        };

                      case 2:
                        if (null === (match = utils.matches(this.regex, this.output))) {
                            context$2$0.next = 7;
                            break;
                        }
                        return context$2$0.next = 5, _regeneratorRuntime.awrap(_loop());

                      case 5:
                        context$2$0.next = 2;
                        break;

                      case 7:
                        return context$2$0.abrupt("return", [ this.output, this.embeds ]);

                      case 8:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this);
            }, Gmap;
        }();
        module.exports = Gmap;
    }).call(exports, __webpack_require__(81));
}, /* 81 */
/***/
function(module, exports) {
    /* WEBPACK VAR INJECTION */
    (function(global) {
        /*** IMPORTS FROM imports-loader ***/
        (function() {
            !function() {
                "use strict";
                function normalizeName(name) {
                    if ("string" != typeof name && (name = name.toString()), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
                    return name.toLowerCase();
                }
                function normalizeValue(value) {
                    return "string" != typeof value && (value = value.toString()), value;
                }
                function Headers(headers) {
                    this.map = {}, headers instanceof Headers ? headers.forEach(function(value, name) {
                        this.append(name, value);
                    }, this) : headers && Object.getOwnPropertyNames(headers).forEach(function(name) {
                        this.append(name, headers[name]);
                    }, this);
                }
                function consumed(body) {
                    return body.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (body.bodyUsed = !0);
                }
                function fileReaderReady(reader) {
                    return new Promise(function(resolve, reject) {
                        reader.onload = function() {
                            resolve(reader.result);
                        }, reader.onerror = function() {
                            reject(reader.error);
                        };
                    });
                }
                function readBlobAsArrayBuffer(blob) {
                    var reader = new FileReader();
                    return reader.readAsArrayBuffer(blob), fileReaderReady(reader);
                }
                function readBlobAsText(blob) {
                    var reader = new FileReader();
                    return reader.readAsText(blob), fileReaderReady(reader);
                }
                function Body() {
                    return this.bodyUsed = !1, this._initBody = function(body) {
                        if (this._bodyInit = body, "string" == typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else {
                            if (body) throw new Error("unsupported BodyInit type");
                            this._bodyText = "";
                        }
                    }, support.blob ? (this.blob = function() {
                        var rejected = consumed(this);
                        if (rejected) return rejected;
                        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([ this._bodyText ]));
                    }, this.arrayBuffer = function() {
                        return this.blob().then(readBlobAsArrayBuffer);
                    }, this.text = function() {
                        var rejected = consumed(this);
                        if (rejected) return rejected;
                        if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                        if (this._bodyFormData) throw new Error("could not read FormData body as text");
                        return Promise.resolve(this._bodyText);
                    }) : this.text = function() {
                        var rejected = consumed(this);
                        return rejected ? rejected : Promise.resolve(this._bodyText);
                    }, support.formData && (this.formData = function() {
                        return this.text().then(decode);
                    }), this.json = function() {
                        return this.text().then(JSON.parse);
                    }, this;
                }
                function normalizeMethod(method) {
                    var upcased = method.toUpperCase();
                    return methods.indexOf(upcased) > -1 ? upcased : method;
                }
                function Request(url, options) {
                    if (options = options || {}, this.url = url, this.credentials = options.credentials || "omit", 
                    this.headers = new Headers(options.headers), this.method = normalizeMethod(options.method || "GET"), 
                    this.mode = options.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && options.body) throw new TypeError("Body not allowed for GET or HEAD requests");
                    this._initBody(options.body);
                }
                function decode(body) {
                    var form = new FormData();
                    return body.trim().split("&").forEach(function(bytes) {
                        if (bytes) {
                            var split = bytes.split("="), name = split.shift().replace(/\+/g, " "), value = split.join("=").replace(/\+/g, " ");
                            form.append(decodeURIComponent(name), decodeURIComponent(value));
                        }
                    }), form;
                }
                function headers(xhr) {
                    var head = new Headers(), pairs = xhr.getAllResponseHeaders().trim().split("\n");
                    return pairs.forEach(function(header) {
                        var split = header.trim().split(":"), key = split.shift().trim(), value = split.join(":").trim();
                        head.append(key, value);
                    }), head;
                }
                function Response(bodyInit, options) {
                    options || (options = {}), this._initBody(bodyInit), this.type = "default", this.url = null, 
                    this.status = options.status, this.ok = this.status >= 200 && this.status < 300, 
                    this.statusText = options.statusText, this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers), 
                    this.url = options.url || "";
                }
                if (!self.fetch) {
                    Headers.prototype.append = function(name, value) {
                        name = normalizeName(name), value = normalizeValue(value);
                        var list = this.map[name];
                        list || (list = [], this.map[name] = list), list.push(value);
                    }, Headers.prototype["delete"] = function(name) {
                        delete this.map[normalizeName(name)];
                    }, Headers.prototype.get = function(name) {
                        var values = this.map[normalizeName(name)];
                        return values ? values[0] : null;
                    }, Headers.prototype.getAll = function(name) {
                        return this.map[normalizeName(name)] || [];
                    }, Headers.prototype.has = function(name) {
                        return this.map.hasOwnProperty(normalizeName(name));
                    }, Headers.prototype.set = function(name, value) {
                        this.map[normalizeName(name)] = [ normalizeValue(value) ];
                    }, Headers.prototype.forEach = function(callback, thisArg) {
                        Object.getOwnPropertyNames(this.map).forEach(function(name) {
                            this.map[name].forEach(function(value) {
                                callback.call(thisArg, value, name, this);
                            }, this);
                        }, this);
                    };
                    var support = {
                        blob: "FileReader" in self && "Blob" in self && function() {
                            try {
                                return new Blob(), !0;
                            } catch (e) {
                                return !1;
                            }
                        }(),
                        formData: "FormData" in self
                    }, methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
                    Body.call(Request.prototype), Body.call(Response.prototype), self.Headers = Headers, 
                    self.Request = Request, self.Response = Response, self.fetch = function(input, init) {
                        // TODO: Request constructor should accept input, init
                        var request;
                        return request = Request.prototype.isPrototypeOf(input) && !init ? input : new Request(input, init), 
                        new Promise(function(resolve, reject) {
                            function responseURL() {
                                // Avoid security warnings on getResponseHeader when not allowed by CORS
                                return "responseURL" in xhr ? xhr.responseURL : /^X-Request-URL:/m.test(xhr.getAllResponseHeaders()) ? xhr.getResponseHeader("X-Request-URL") : void 0;
                            }
                            var xhr = new XMLHttpRequest();
                            xhr.onload = function() {
                                var status = 1223 === xhr.status ? 204 : xhr.status;
                                if (100 > status || status > 599) return void reject(new TypeError("Network request failed"));
                                var options = {
                                    status: status,
                                    statusText: xhr.statusText,
                                    headers: headers(xhr),
                                    url: responseURL()
                                }, body = "response" in xhr ? xhr.response : xhr.responseText;
                                resolve(new Response(body, options));
                            }, xhr.onerror = function() {
                                reject(new TypeError("Network request failed"));
                            }, xhr.open(request.method, request.url, !0), "include" === request.credentials && (xhr.withCredentials = !0), 
                            "responseType" in xhr && support.blob && (xhr.responseType = "blob"), request.headers.forEach(function(value, name) {
                                xhr.setRequestHeader(name, value);
                            }), xhr.send("undefined" == typeof request._bodyInit ? null : request._bodyInit);
                        });
                    }, self.fetch.polyfill = !0;
                }
            }(), /*** EXPORTS FROM exports-loader ***/
            module.exports = global.fetch;
        }).call(global);
    }).call(exports, function() {
        return this;
    }());
}, /* 82 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], Markdown = function() {
        function Markdown(output, options) {
            if (_classCallCheck(this, Markdown), !window.marked) throw new ReferenceError("marked.js is not loaded.");
            this.output = output, this.options = options;
        }
        return Markdown.prototype.process = function() {
            var _this = this, renderer = new marked.Renderer();
            renderer.code = function(text) {
                var highlightedCode = window.hljs ? hljs.highlightAuto(text) : {
                    value: text
                }, language = window.hljs ? highlightedCode.language : "", template = '<pre><code class="ejs-code hljs ' + language + '">' + highlightedCode.value + "</code></pre>";
                return template;
            }, renderer.link = function(href, title, text) {
                return -1 === href.indexOf("&lt;/a") ? href : href.match(/&gt;(.+)&lt;\/a/gi) ? (title || (title = ""), 
                '<a href="' + RegExp.$1 + '" rel=' + _this.options.linkOptions.rel + '" target="' + _this.options.linkOptions.target + '" title="' + title + '">' + text + "</a>") : void 0;
            }, renderer.image = function(href, title, text) {
                return -1 === href.indexOf("&lt;/a") ? href : href.match(/&gt;(.+)&lt;\/a/gi) ? (title || (title = ""), 
                '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + RegExp.$1 + '" title="' + title + '" alt="' + text + '"/></div></div>') : void 0;
            }, //Fix for heading that should be actually present in marked.js
            //if gfm is true the `## Heading` is acceptable but `##Heading` is not
            marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading, marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading, 
            renderer.paragraph = function(text) {
                return "<p> " + text + " </p>";
            }, //for font smiley in end.
            this.options.markedOptions.renderer = renderer;
            var output = marked(this.output, this.options.markedOptions);
            return output;
        }, Markdown;
    }();
    module.exports = Markdown;
}, /* 83 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Highlight = __webpack_require__(84), Ideone = __webpack_require__(85), Plunker = __webpack_require__(91), JsBin = __webpack_require__(92), CodePen = __webpack_require__(93), JsFiddle = __webpack_require__(94), Gist = __webpack_require__(95), Code = function() {
        function Code(input, output, options, embeds) {
            _classCallCheck(this, Code), this.input = input, this.output = output, this.options = options, 
            this.embeds = embeds;
        }
        return Code.prototype.process = function() {
            try {
                var input = this.input, output = this.output, options = this.options, embeds = this.embeds;
                output = options.highlightCode && !options.marked ? new Highlight(output, options).process() : output;
                var _ref = utils.ifEmbed(options, "ideone") ? new Ideone(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref[0], embeds = _ref[1];
                var _ref2 = utils.ifEmbed(options, "plunker") ? new Plunker(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref2[0], embeds = _ref2[1];
                var _ref3 = utils.ifEmbed(options, "jsbin") ? new JsBin(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref3[0], embeds = _ref3[1];
                var _ref4 = utils.ifEmbed(options, "codepen") ? new CodePen(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref4[0], embeds = _ref4[1];
                var _ref5 = utils.ifEmbed(options, "jsfiddle") ? new JsFiddle(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref5[0], embeds = _ref5[1];
                var _ref6 = utils.ifEmbed(options, "gist") ? new Gist(input, output, options, embeds).process() : [ output, embeds ];
                return output = _ref6[0], embeds = _ref6[1], [ output, embeds ];
            } catch (error) {}
        }, Code;
    }();
    module.exports = Code;
}, /* 84 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], Highlight = function() {
        function Highlight(output, options) {
            if (_classCallCheck(this, Highlight), !hljs) throw new ReferenceError("'hljs is not defined. HighlightJS library is needed to highlight code. Visit https://highlightjs.org/'");
            this.output = output, this.options = options, this.regex = /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm, 
            this.inlineCodeRegex = /(`)\s*([\s\S]*?[^`])\s*\1(?!`)/gm;
        }
        /**
	     * Encodes the characters like <, > and space and replaces them with
	     * &lt;, &gt; and &gt; respectively.
	     * @param  {string} code The string that has to be encoded.
	     * @return {string}      The encoded string
	     */ /**
	     * removes whitespace characters
	     * @param  {string} code The string from which the whitespace has to be removed
	     * @return {string}
	     */ /**
	     * Places the code and the language name in the required template
	     * @param {string} processedCode
	     * @param {string} language
	     * @return {string}
	     */ /**
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
	     */ return Highlight.prototype.encode = function(code) {
            return code = code.replace(/&amp;/gm, ""), code = code.replace(/&lt;/g, "<"), code = code.replace(/&gt;/g, ">");
        }, Highlight.prototype.trimSpace = function(code) {
            // trailing whitespace
            // leading whitespace
            return code = code.replace(/^([ \t]*)/g, ""), code = code.replace(/[ \t]*$/g, "");
        }, Highlight.prototype.addTemplate = function(processedCode, language) {
            return '<pre><code class="ejs-code hljs ' + language + '">' + processedCode.value + "</code></pre>";
        }, Highlight.prototype.process = function() {
            var _this = this;
            this.output = this.output.replace(this.inlineCodeRegex, function(match, group1, group2) {
                return "<code>" + group2 + "</code>";
            });
            var result = this.output.replace(this.regex, function(match, group1, group2, group3) {
                var code = group3;
                code = _this.trimSpace(code), code = _this.encode(code), // to prevent auto-linking. Not necessary in code
                // *blocks*, but in code spans. Will be converted
                // back after the auto-linker runs.
                code = code.replace(/:\/\//g, "~P");
                var language = group2.split("\n")[0], highlightedCode = void 0;
                return language ? highlightedCode = hljs.highlightAuto(code, [ language ]) : (highlightedCode = hljs.highlightAuto(code), 
                language = highlightedCode.language), _this.addTemplate(highlightedCode, language);
            });
            return result;
        }, Highlight;
    }();
    module.exports = Highlight;
}, /* 85 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Ideone = function(_Base) {
        function Ideone(input, output, options, embeds) {
            _classCallCheck(this, Ideone), _Base.call(this, input, output, options, embeds), 
            this.regex = /ideone.com\/[a-zA-Z0-9]{6}/gi, this.service = "ideone";
        }
        return _inherits(Ideone, _Base), Ideone.prototype.template = function(match) {
            return '<div class="ejs-ideone ejs-embed"><iframe src="http://ideone.com/embed/' + match.split("/") + '" frameborder="0" height="' + this.options.codeEmbedHeight + '"></iframe></div>';
        }, Ideone;
    }(Base);
    module.exports = Ideone;
}, /* 86 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _Object$create = __webpack_require__(48)["default"], _Object$setPrototypeOf = __webpack_require__(87)["default"];
    exports["default"] = function(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        subClass.prototype = _Object$create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), superClass && (_Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
    }, exports.__esModule = !0;
}, /* 87 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = {
        "default": __webpack_require__(88),
        __esModule: !0
    };
}, /* 88 */
/***/
function(module, exports, __webpack_require__) {
    __webpack_require__(89), module.exports = __webpack_require__(14).Object.setPrototypeOf;
}, /* 89 */
/***/
function(module, exports, __webpack_require__) {
    // 19.1.3.19 Object.setPrototypeOf(O, proto)
    var $export = __webpack_require__(13);
    $export($export.S, "Object", {
        setPrototypeOf: __webpack_require__(60).set
    });
}, /* 90 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = function() {
        function Base(input, output, options, embeds) {
            _classCallCheck(this, Base), this.input = input, this.output = output, this.options = options, 
            this.embeds = embeds;
        }
        return Base.prototype.process = function() {
            var _this = this;
            if (utils.ifInline(this.options, this.service)) for (var match = void 0; null !== (match = utils.matches(this.regex, this.input)); ) {
                var text = this.template(match[0]);
                this.embeds.push({
                    text: text,
                    index: match.index
                });
            } else {
                var regexInline = this.options.link ? new RegExp("([^>]*" + this.regex.source + ")</a>", "gm") : new RegExp("([^\\s]*" + this.regex.source + ")", "gm");
                this.output = this.output.replace(regexInline, function(match) {
                    return _this.options.link ? _this.options.inlineText ? match + _this.template(match.slice(0, -4)) : _this.template(match.slice(0, -4)) + "</a>" : _this.options.inlineText ? match + _this.template(match) : _this.template(match);
                });
            }
            return [ this.output, this.embeds ];
        }, Base;
    }();
    module.exports = Base;
}, /* 91 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Plunker = function(_Base) {
        function Plunker(input, output, options, embeds) {
            _classCallCheck(this, Plunker), _Base.call(this, input, output, options, embeds), 
            this.regex = /plnkr.co\/edit\/[a-zA-Z0-9\?=]+/gi, this.service = "plunker";
        }
        return _inherits(Plunker, _Base), Plunker.prototype.template = function(match) {
            var a = match.split("?")[0].split("/"), id = a[a.length - 1];
            return '<div class="ejs-embed ejs-plunker">\n		<iframe class="ne-plunker" src="http://embed.plnkr.co/' + id + '" height="' + this.options.codeEmbedHeight + '"></iframe>\n		</div>';
        }, Plunker;
    }(Base);
    module.exports = Plunker;
}, /* 92 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), JsBin = function(_Base) {
        function JsBin(input, output, options, embeds) {
            _classCallCheck(this, JsBin), _Base.call(this, input, output, options, embeds), 
            this.regex = /jsbin.com\/[a-zA-Z0-9_]+\/[0-9_]+/gi, this.service = "jsbin";
        }
        return _inherits(JsBin, _Base), JsBin.prototype.template = function(id) {
            return '<div class="ejs-jsbin ejs-embed">\n		<iframe height="' + this.options.codeEmbedHeight + '" class="jsbin-embed foo" src="http://' + id + '/embed?html,js,output"></iframe>\n		</div>';
        }, JsBin;
    }(Base);
    module.exports = JsBin;
}, /* 93 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), CodePen = function(_Base) {
        function CodePen(input, output, options, embeds) {
            _classCallCheck(this, CodePen), _Base.call(this, input, output, options, embeds), 
            this.regex = /http:\/\/codepen.io\/([A-Za-z0-9_]+)\/pen\/([A-Za-z0-9_]+)/gi, this.service = "codepen";
        }
        return _inherits(CodePen, _Base), CodePen.prototype.template = function(id) {
            return '<div class="ejs-embed ejs-codepen">\n			<iframe scrolling="no" height="' + this.options.codeEmbedHeight + '" src="' + id.replace(/\/pen\//, "/embed/") + "/?height=" + this.options.codeEmbedHeight + "\"></iframe>'\n		</div>";
        }, CodePen;
    }(Base);
    module.exports = CodePen;
}, /* 94 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), JsFiddle = function(_Base) {
        function JsFiddle(input, output, options, embeds) {
            _classCallCheck(this, JsFiddle), _Base.call(this, input, output, options, embeds), 
            this.regex = /jsfiddle.net\/[a-zA-Z0-9_]+\/[a-zA-Z0-9_]+/gi, this.service = "jsfiddle";
        }
        return _inherits(JsFiddle, _Base), JsFiddle.prototype.template = function(id) {
            return '<div class="ejs-embed ejs-jsfiddle">\n			<iframe height="' + this.options.codeEmbedHeight + '" src="http://' + id + '/embedded"></iframe>\n		</div>';
        }, JsFiddle;
    }(Base);
    module.exports = JsFiddle;
}, /* 95 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Gist = function(_Base) {
        function Gist(input, output, options, embeds) {
            var _this = this;
            _classCallCheck(this, Gist), _Base.call(this, input, output, options, embeds), this.regex = /gist.github.com\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9]+)/g, 
            this.service = "gist", this.options.element.addEventListener("rendered", function() {
                _this.load();
            });
        }
        return _inherits(Gist, _Base), Gist.prototype.template = function(match) {
            return '<div class="ejs-gist" data-src="' + match + '"></div>';
        }, Gist.prototype.load = function() {
            for (var gists = this.options.element.getElementsByClassName("ejs-gist"), i = 0; i < gists.length; i++) {
                var gistFrame = document.createElement("iframe");
                gistFrame.setAttribute("width", "100%"), gistFrame.id = "ejs-gist-" + i;
                var zone = gists[i];
                zone.innerHTML = "", zone.appendChild(gistFrame);
                // Create the iframe's document
                var url = gists[i].getAttribute("data-src");
                url = -1 === url.indexOf("http") ? "https://" + url : url;
                var gistFrameHTML = '<html><base target="_parent"/><body onload="parent.document.getElementById(\'ejs-gist-' + i + '\').style.height=parseInt(document.body.scrollHeight)+20+\'px\'"><script type="text/javascript" src="' + url + '.js"></script></body></html>', gistFrameDoc = gistFrame.document;
                gistFrame.contentDocument ? gistFrameDoc = gistFrame.contentDocument : gistFrame.contentWindow && (gistFrameDoc = gistFrame.contentWindow.document), 
                gistFrameDoc.open(), gistFrameDoc.writeln(gistFrameHTML), gistFrameDoc.close();
            }
        }, Gist;
    }(Base);
    module.exports = Gist;
}, /* 96 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), Ted = __webpack_require__(97), Dailymotion = __webpack_require__(98), Ustream = __webpack_require__(99), LiveLeak = __webpack_require__(100), Vine = __webpack_require__(101), Youtube = __webpack_require__(102), Vimeo = __webpack_require__(104), BasicVideo = __webpack_require__(105), Video = function() {
        function Video(input, output, options, embeds) {
            _classCallCheck(this, Video), this.input = input, this.output = output, this.options = options, 
            this.embeds = embeds;
        }
        return Video.prototype.process = function() {
            var input, output, options, embeds, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
            return _regeneratorRuntime.async(function(context$2$0) {
                for (;;) switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    if (input = this.input, output = this.output, options = this.options, embeds = this.embeds, 
                    _ref = utils.ifEmbed(options, "ted") ? new Ted(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref[0], embeds = _ref[1], _ref2 = utils.ifEmbed(options, "dailymotion") ? new Dailymotion(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref2[0], embeds = _ref2[1], _ref3 = utils.ifEmbed(options, "ustream") ? new Ustream(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref3[0], embeds = _ref3[1], _ref4 = utils.ifEmbed(options, "liveleak") ? new LiveLeak(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref4[0], embeds = _ref4[1], _ref5 = options.videoEmbed ? new BasicVideo(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref5[0], embeds = _ref5[1], _ref6 = utils.ifEmbed(options, "vine") ? new Vine(input, output, options, embeds).process() : [ output, embeds ], 
                    output = _ref6[0], embeds = _ref6[1], !utils.ifEmbed(options, "youtube")) {
                        context$2$0.next = 28;
                        break;
                    }
                    return context$2$0.next = 25, _regeneratorRuntime.awrap(new Youtube(input, output, options, embeds).process());

                  case 25:
                    context$2$0.t0 = context$2$0.sent, context$2$0.next = 29;
                    break;

                  case 28:
                    context$2$0.t0 = [ output, embeds ];

                  case 29:
                    if (_ref7 = context$2$0.t0, output = _ref7[0], embeds = _ref7[1], !utils.ifEmbed(options, "vimeo")) {
                        context$2$0.next = 38;
                        break;
                    }
                    return context$2$0.next = 35, _regeneratorRuntime.awrap(new Vimeo(input, output, options, embeds).process());

                  case 35:
                    context$2$0.t1 = context$2$0.sent, context$2$0.next = 39;
                    break;

                  case 38:
                    context$2$0.t1 = [ output, embeds ];

                  case 39:
                    return _ref8 = context$2$0.t1, output = _ref8[0], embeds = _ref8[1], context$2$0.abrupt("return", [ output, embeds ]);

                  case 43:
                  case "end":
                    return context$2$0.stop();
                }
            }, null, this);
        }, Video;
    }();
    module.exports = Video;
}, /* 97 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), Ted = function(_Base) {
        function Ted(input, output, options, embeds) {
            _classCallCheck(this, Ted), _Base.call(this, input, output, options, embeds), this.regex = /ted.com\/talks\/[a-zA-Z0-9_]+/gi, 
            this.service = "ted";
        }
        return _inherits(Ted, _Base), Ted.prototype.template = function(match) {
            var dimensions = utils.dimensions(this.options), a = match.split("/"), id = a[a.length - 1];
            return '<div class="ejs-embed ejs-ted"><iframe src="http://embed.ted.com/talks/' + id + '.html" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
        }, Ted;
    }(Base);
    module.exports = Ted;
}, /* 98 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), Dailymotion = function(_Base) {
        function Dailymotion(input, output, options, embeds) {
            _classCallCheck(this, Dailymotion), _Base.call(this, input, output, options, embeds), 
            this.regex = /dailymotion.com\/video\/[a-zA-Z0-9-_]+/gi, this.service = "dailymotion";
        }
        return _inherits(Dailymotion, _Base), Dailymotion.prototype.template = function(match) {
            var dimensions = utils.dimensions(this.options), a = match.split("/"), id = a[a.length - 1];
            return '<div class="ejs-video ejs-embed">\n		<iframe src="http://www.dailymotion.com/embed/video/' + id + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe>\n		</div>';
        }, Dailymotion;
    }(Base);
    module.exports = Dailymotion;
}, /* 99 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), Ustream = function(_Base) {
        function Ustream(input, output, options, embeds) {
            _classCallCheck(this, Ustream), _Base.call(this, input, output, options, embeds), 
            this.regex = /ustream.tv\/[a-z\/0-9]*/gi, this.service = "ustream";
        }
        return _inherits(Ustream, _Base), Ustream.prototype.template = function(match) {
            var id = match.split("/");
            id.splice(1, 0, "embed");
            var dimensions = utils.dimensions(this.options);
            return '<div class="ejs-embed ejs-ustream"><iframe src="//www.' + id.join("/") + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
        }, Ustream;
    }(Base);
    module.exports = Ustream;
}, /* 100 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), LiveLeak = function(_Base) {
        function LiveLeak(input, output, options, embeds) {
            _classCallCheck(this, LiveLeak), _Base.call(this, input, output, options, embeds), 
            this.regex = /liveleak.com\/view\?i=[a-zA-Z0-9_]+/gi, this.service = "liveleak";
        }
        return _inherits(LiveLeak, _Base), LiveLeak.prototype.template = function(match) {
            var dimensions = utils.dimensions(this.options);
            return '<div class="ejs-video ejs-embed"><iframe src="http://www.liveleak.com/e/' + match.split("=")[1] + '" height="' + dimensions.height + '" width="' + dimensions.width + '"></iframe></div>';
        }, LiveLeak;
    }(Base);
    module.exports = LiveLeak;
}, /* 101 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Vine = function(_Base) {
        function Vine(input, output, options, embeds) {
            _classCallCheck(this, Vine), _Base.call(this, input, output, options, embeds), this.regex = /vine.co\/v\/[a-zA-Z0-9]+/gi, 
            this.service = "vine";
        }
        return _inherits(Vine, _Base), Vine.prototype.template = function(match) {
            var config = this.options.vineOptions, a = match.split("/"), id = a[a.length - 1];
            return '<div class="ejs-vine">\n		<iframe class="ejs-vine-iframe" src="https://vine.co/v/' + id + "/embed/" + config.type + '" height="' + config.height + '" width="' + config.width + '"></iframe>\n		</div>';
        }, Vine;
    }(Base);
    module.exports = Vine;
}, /* 102 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(fetch) {
        "use strict";
        var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), helper = __webpack_require__(103), Youtube = function() {
            function Youtube(input, output, options, embeds) {
                _classCallCheck(this, Youtube), this.input = input, this.output = output, this.options = options, 
                this.embeds = embeds, this.regex = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/gi, 
                this.service = "youtube";
            }
            return Youtube.prototype.formatData = function(data) {
                return {
                    title: data.snippet.title,
                    thumbnail: data.snippet.thumbnails.medium.url,
                    rawDescription: data.snippet.description,
                    views: data.statistics.viewCount,
                    likes: data.statistics.likeCount,
                    description: utils.truncate(data.snippet.description, 150),
                    url: "https://www.youtube.com/watch?v=" + data.id,
                    id: data.id,
                    host: "youtube"
                };
            }, Youtube.prototype.data = function data(id) {
                var url, response, data;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        return context$2$0.prev = 0, url = "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + this.options.googleAuthKey + "&part=snippet,statistics", 
                        context$2$0.next = 4, _regeneratorRuntime.awrap(fetch(url));

                      case 4:
                        return response = context$2$0.sent, context$2$0.next = 7, _regeneratorRuntime.awrap(response.json());

                      case 7:
                        return data = context$2$0.sent, context$2$0.abrupt("return", data.items[0]);

                      case 11:
                        context$2$0.prev = 11, context$2$0.t0 = context$2$0["catch"](0);

                      case 14:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this, [ [ 0, 11 ] ]);
            }, Youtube.prototype.process = function() {
                var regexInline, match, id, embedUrl, data, text;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        if (context$2$0.prev = 0, utils.ifInline(this.options, this.service)) {
                            context$2$0.next = 21;
                            break;
                        }
                        regexInline = this.options.link ? new RegExp("([^>]*" + this.regex.source + ")</a>", "gi") : new RegExp("([^\\s]*" + this.regex.source + ")", "gi"), 
                        match = void 0;

                      case 4:
                        if (null === (match = utils.matches(regexInline, this.output))) {
                            context$2$0.next = 19;
                            break;
                        }
                        if (id = match[2], embedUrl = "https://www.youtube.com/embed/" + id, data = void 0, 
                        text = void 0, !this.options.videoDetails) {
                            context$2$0.next = 15;
                            break;
                        }
                        return context$2$0.next = 11, _regeneratorRuntime.awrap(this.data(id));

                      case 11:
                        data = context$2$0.sent, text = helper.detailsTemplate(this.formatData(data), embedUrl), 
                        context$2$0.next = 16;
                        break;

                      case 15:
                        text = helper.template(embedUrl, this.options);

                      case 16:
                        this.options.link ? this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text + "</a>") : this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text), 
                        context$2$0.next = 4;
                        break;

                      case 19:
                        context$2$0.next = 36;
                        break;

                      case 21:
                        match = void 0;

                      case 22:
                        if (null === (match = utils.matches(this.regex, this.input))) {
                            context$2$0.next = 36;
                            break;
                        }
                        if (embedUrl = "https://www.youtube.com/embed/" + match[1], data = void 0, text = void 0, 
                        !this.options.videoDetails) {
                            context$2$0.next = 32;
                            break;
                        }
                        return context$2$0.next = 28, _regeneratorRuntime.awrap(this.data(match[1]));

                      case 28:
                        data = context$2$0.sent, text = helper.detailsTemplate(this.formatData(data), embedUrl), 
                        context$2$0.next = 33;
                        break;

                      case 32:
                        text = helper.template(embedUrl, this.options);

                      case 33:
                        this.embeds.push({
                            text: text,
                            index: match.index
                        }), context$2$0.next = 22;
                        break;

                      case 36:
                        context$2$0.next = 41;
                        break;

                      case 38:
                        context$2$0.prev = 38, context$2$0.t0 = context$2$0["catch"](0);

                      case 41:
                        return context$2$0.abrupt("return", [ this.output, this.embeds ]);

                      case 42:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this, [ [ 0, 38 ] ]);
            }, Youtube;
        }();
        module.exports = Youtube;
    }).call(exports, __webpack_require__(81));
}, /* 103 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var utils = __webpack_require__(71), helper = {
        /**
	     * Plays the video after clicking on the thumbnail
	     * @param  {string} className The class name on which click is to be listened
	     * @param  {object} options   Options object
	     * @return {null}
	     */
        play: function(className, options) {
            for (var classes = document.getElementsByClassName(className), _loop = function(i) {
                classes[i].onclick = function() {
                    options.onVideoShow();
                    var url = classes[i].getAttribute("data-ejs-url") + "?autoplay=true", template = helper.template(url, options);
                    classes[i].parentNode.parentNode.innerHTML = template;
                };
            }, i = 0; i < classes.length; i++) _loop(i);
        },
        /**
	     * Common template for vimeo and youtube iframes
	     * @param  {string} url     URL of the embedding video
	     * @param  {object} options Options object
	     * @return {string}         compiled template with variables replaced
	     */
        template: function template(url, options) {
            var dimensions = utils.dimensions(options), template = '<div class="ejs-video-player ejs-embed">\n        <iframe src="' + url + '" frameBorder="0" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n        </div>';
            return template;
        },
        /**
	     * Template for showing vimeo and youtube video details
	     * @param  {object} data     Object containing the variable values as key-value pair
	     * @param  {string} embedUrl URL of the video
	     * @return {string}          template with variables replaced
	     */
        detailsTemplate: function(data, embedUrl) {
            return '<div class="ejs-video ejs-embed">\n        <div class="ejs-video-preview">\n        <div class="ejs-video-thumb" data-ejs-url="' + embedUrl + '">\n        <div class="ejs-thumb" style="background-image:url(' + data.thumbnail + ')"></div>\n        <i class="fa fa-play-circle-o"></i>\n        </div>\n        <div class="ejs-video-detail">\n        <div class="ejs-video-title">\n        <a href="' + data.url + '">\n        ' + data.title + '\n        </a>\n        </div>\n        <div class="ejs-video-desc">\n        ' + data.description + '\n        </div>\n        <div class="ejs-video-stats">\n        <span>\n        <i class="fa fa-eye"></i>' + data.views + '\n        </span>\n        <span>\n        <i class="fa fa-heart"></i>' + data.likes + "\n        </span>\n        </div>\n        </div>\n        </div>\n        </div>";
        },
        /**
	     * Applies video.js to all audio and video dynamically
	     * @param  {object} options Options object
	     * @return {null}
	     */
        applyVideoJS: function(options) {
            var dimensions = utils.dimensions(options);
            if (options.videojsOptions.width = dimensions.width, options.videojsOptions.height = dimensions.height, 
            options.videoJS) {
                if (!window.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
                for (var elements = options.element.getElementsByClassName("ejs-video-js"), i = 0; i < elements.length; i++) videojs(elements[i], options.videojsOptions, function() {
                    return options.videojsCallback();
                });
            }
        },
        /**
	     * Destroys the onclick event for opening the video template from the details template
	     * @param  {className} className
	     * @return {null}
	     */
        destroy: function(className) {
            for (var classes = document.getElementsByClassName(className), i = 0; i < classes.length; i++) classes[i].onclick = null;
        }
    };
    module.exports = helper;
}, /* 104 */
/***/
function(module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */
    (function(fetch) {
        "use strict";
        var _classCallCheck = __webpack_require__(1)["default"], _regeneratorRuntime = __webpack_require__(2)["default"], utils = __webpack_require__(71), helper = __webpack_require__(103), Vimeo = function() {
            function Vimeo(input, output, options, embeds) {
                _classCallCheck(this, Vimeo), this.input = input, this.output = output, this.options = options, 
                this.embeds = embeds, this.regex = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)*/gi, 
                this.service = "vimeo";
            }
            return Vimeo.prototype.formatData = function(data) {
                return {
                    title: data.title,
                    thumbnail: data.thumbnail_medium,
                    rawDescription: data.description.replace(/\n/g, "<br/>").replace(/&#10;/g, "<br/>"),
                    views: data.stats_number_of_plays,
                    likes: data.stats_number_of_likes,
                    description: utils.truncate(data.description.replace(/((<|&lt;)br\s*\/*(>|&gt;)\r\n)/g, " "), 150),
                    url: data.url,
                    id: data.id,
                    host: "vimeo"
                };
            }, Vimeo.prototype.data = function data(id) {
                var url, response, data;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        return context$2$0.prev = 0, url = "https://vimeo.com/api/v2/video/" + id + ".json", 
                        context$2$0.next = 4, _regeneratorRuntime.awrap(fetch(url));

                      case 4:
                        return response = context$2$0.sent, context$2$0.next = 7, _regeneratorRuntime.awrap(response.json());

                      case 7:
                        return data = context$2$0.sent, context$2$0.abrupt("return", data[0]);

                      case 11:
                        context$2$0.prev = 11, context$2$0.t0 = context$2$0["catch"](0);

                      case 14:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this, [ [ 0, 11 ] ]);
            }, Vimeo.prototype.process = function() {
                var regexInline, match, id, embedUrl, data, text;
                return _regeneratorRuntime.async(function(context$2$0) {
                    for (;;) switch (context$2$0.prev = context$2$0.next) {
                      case 0:
                        if (context$2$0.prev = 0, utils.ifInline(this.options, this.service)) {
                            context$2$0.next = 21;
                            break;
                        }
                        regexInline = this.options.link ? new RegExp("([^>]*" + this.regex.source + ")</a>", "gi") : new RegExp("([^\\s]*" + this.regex.source + ")", "gi"), 
                        match = void 0;

                      case 4:
                        if (null === (match = utils.matches(regexInline, this.output))) {
                            context$2$0.next = 19;
                            break;
                        }
                        if (id = this.options.link ? match[0].slice(0, -4).split("/").slice(-1).pop() : match[0].split("/").slice(-1).pop(), 
                        embedUrl = "https://player.vimeo.com/video/" + id, data = void 0, text = void 0, 
                        !this.options.videoDetails) {
                            context$2$0.next = 15;
                            break;
                        }
                        return context$2$0.next = 11, _regeneratorRuntime.awrap(this.data(id));

                      case 11:
                        data = context$2$0.sent, text = helper.detailsTemplate(this.formatData(data), embedUrl), 
                        context$2$0.next = 16;
                        break;

                      case 15:
                        text = helper.template(embedUrl, this.options);

                      case 16:
                        this.options.link ? this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text + "</a>") : this.output = this.options.inlineText ? this.output.replace(match[0], match[0] + text) : this.output.replace(match[0], text), 
                        context$2$0.next = 4;
                        break;

                      case 19:
                        context$2$0.next = 36;
                        break;

                      case 21:
                        match = void 0;

                      case 22:
                        if (null === (match = utils.matches(this.regex, this.input))) {
                            context$2$0.next = 36;
                            break;
                        }
                        if (embedUrl = "https://player.vimeo.com/video/" + match[3], data = void 0, text = void 0, 
                        !this.options.videoDetails) {
                            context$2$0.next = 32;
                            break;
                        }
                        return context$2$0.next = 28, _regeneratorRuntime.awrap(this.data(match[3]));

                      case 28:
                        data = context$2$0.sent, text = helper.detailsTemplate(this.formatData(data), embedUrl), 
                        context$2$0.next = 33;
                        break;

                      case 32:
                        text = helper.template(embedUrl, this.options);

                      case 33:
                        this.embeds.push({
                            text: text,
                            index: match.index
                        }), context$2$0.next = 22;
                        break;

                      case 36:
                        return context$2$0.abrupt("return", [ this.output, this.embeds ]);

                      case 39:
                        context$2$0.prev = 39, context$2$0.t0 = context$2$0["catch"](0);

                      case 42:
                      case "end":
                        return context$2$0.stop();
                    }
                }, null, this, [ [ 0, 39 ] ]);
            }, Vimeo;
        }();
        module.exports = Vimeo;
    }).call(exports, __webpack_require__(81));
}, /* 105 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), BasicVideo = function(_Base) {
        function BasicVideo(input, output, options, embeds) {
            _classCallCheck(this, BasicVideo), _Base.call(this, input, output, options, embeds), 
            this.regex = /(?:https?):\/\/\S*\.(?:ogv|webm|mp4)/gi, this.service = "video";
        }
        return _inherits(BasicVideo, _Base), BasicVideo.prototype.template = function(match) {
            return '<div class="ejs-video ejs-embed">\n			<div class="ejs-video-player">\n				<div class="ejs-player">\n					<video src="' + match + '" class="ejs-video-js video-js" controls></video>\n				</div>\n			</div>\n		</div>';
        }, BasicVideo;
    }(Base);
    module.exports = BasicVideo;
}, /* 106 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), SoundCloud = __webpack_require__(107), Spotify = __webpack_require__(108), BasicAudio = __webpack_require__(109), Audio = function() {
        function Audio(input, output, options, embeds) {
            _classCallCheck(this, Audio), this.input = input, this.output = output, this.options = options, 
            this.embeds = embeds;
        }
        return Audio.prototype.process = function() {
            try {
                var input = this.input, output = this.output, options = this.options, embeds = this.embeds, _ref = utils.ifEmbed(options, "soundcloud") ? new SoundCloud(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref[0], embeds = _ref[1];
                var _ref2 = utils.ifEmbed(options, "spotify") ? new Spotify(input, output, options, embeds).process() : [ output, embeds ];
                output = _ref2[0], embeds = _ref2[1];
                var _ref3 = this.options.audioEmbed ? new BasicAudio(input, output, options, embeds).process() : [ output, embeds ];
                return output = _ref3[0], embeds = _ref3[1], [ output, embeds ];
            } catch (error) {}
        }, Audio;
    }();
    module.exports = Audio;
}, /* 107 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), SoundCloud = function(_Base) {
        function SoundCloud(input, output, options, embeds) {
            _classCallCheck(this, SoundCloud), _Base.call(this, input, output, options, embeds), 
            this.regex = /(soundcloud.com)\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+/gi, this.service = "soundcloud";
        }
        return _inherits(SoundCloud, _Base), SoundCloud.prototype.template = function(match) {
            var config = this.options.soundCloudOptions;
            return '<div class="ejs-embed">\n		<iframe height="160" scrolling="no" src="https://w.soundcloud.com/player/?url=' + match + "\n		&auto_play     = " + config.autoPlay + "\n		&hide_related  = " + config.hideRelated + "\n		&show_comments = " + config.showComments + "\n		&show_user     = " + config.showUser + "\n		&show_reposts  = " + config.showReposts + "\n		&visual        = " + config.visual + "\n		&download      = " + config.download + "\n		&color         = " + config.themeColor + "\n		&theme_color   = " + config.themeColor + '"></iframe>\n		</div>';
        }, SoundCloud;
    }(Base);
    module.exports = SoundCloud;
}, /* 108 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Spotify = function(_Base) {
        function Spotify(input, output, options, embeds) {
            _classCallCheck(this, Spotify), _Base.call(this, input, output, options, embeds), 
            this.regex = /spotify.com\/track\/[a-zA-Z0-9_]+/gi, this.service = "spotify";
        }
        return _inherits(Spotify, _Base), Spotify.prototype.template = function(match) {
            var a = match.split("/"), id = a[a.length - 1];
            return '<div class="ejs-embed">\n		<iframe src="https://embed.spotify.com/?uri=spotify:track:' + id + '" height="80"></iframe>\n		</div>';
        }, Spotify;
    }(Base);
    module.exports = Spotify;
}, /* 109 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), BasicAudio = function(_Base) {
        function BasicAudio(input, output, options, embeds) {
            _classCallCheck(this, BasicAudio), _Base.call(this, input, output, options, embeds), 
            this.regex = /((?:https?):\/\/\S*\.(?:wav|mp3|ogg))/gi, this.service = "audio";
        }
        return _inherits(BasicAudio, _Base), BasicAudio.prototype.template = function(match) {
            return '<div class="ejs-audio ejs-embed"><audio src="' + match + '" controls class="video-js ejs-video-js"></audio></div>';
        }, BasicAudio;
    }(Base);
    module.exports = BasicAudio;
}, /* 110 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Flickr = __webpack_require__(111), Instagram = __webpack_require__(112), Basic = __webpack_require__(113), Image = function() {
        function Image(input, output, options, embeds) {
            _classCallCheck(this, Image), this.input = input, this.output = output, this.options = options, 
            this.embeds = embeds;
        }
        return Image.prototype.process = function() {
            try {
                var input = this.input, output = this.output, embeds = this.embeds, _ref = utils.ifEmbed(this.options, "flickr") ? new Flickr(input, output, this.options, embeds).process() : [ output, embeds ];
                output = _ref[0], embeds = _ref[1];
                var _ref2 = utils.ifEmbed(this.options, "instagram") ? new Instagram(input, output, this.options, embeds).process() : [ output, embeds ];
                output = _ref2[0], embeds = _ref2[1];
                var _ref3 = this.options.imageEmbed ? new Basic(input, output, this.options, embeds).process() : [ output, embeds ];
                return output = _ref3[0], embeds = _ref3[1], [ output, embeds ];
            } catch (error) {}
        }, Image;
    }();
    module.exports = Image;
}, /* 111 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), Flickr = function(_Base) {
        function Flickr(input, output, options, embeds) {
            _classCallCheck(this, Flickr), _Base.call(this, input, output, options, embeds), 
            this.regex = /flickr.com\/[a-z]+\/[a-zA-Z@_$!\d]+\/[\d]+/gi, this.service = "flickr";
        }
        return _inherits(Flickr, _Base), Flickr.prototype.template = function(match) {
            var dimensions = utils.dimensions(this.options);
            return '<div class="ejs-embed">\n			<div class="ne-image-wrapper">\n				<iframe src="' + utils.toUrl(match) + '/player/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe>\n			</div>\n		</div>';
        }, Flickr;
    }(Base);
    module.exports = Flickr;
}, /* 112 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], utils = __webpack_require__(71), Base = __webpack_require__(90), Instagram = function(_Base) {
        function Instagram(input, output, options, embeds) {
            _classCallCheck(this, Instagram), _Base.call(this, input, output, options, embeds), 
            this.regex = /instagram.com\/p\/[a-zA-Z0-9]+/gi, this.service = "instagram";
        }
        return _inherits(Instagram, _Base), Instagram.prototype.template = function(match) {
            var dimensions = utils.dimensions(this.options);
            return '<div class="ejs-embed"><iframe src="' + utils.toUrl(match) + '/embed/" width="' + dimensions.width + '" height="' + dimensions.height + '"></iframe></div>';
        }, Instagram;
    }(Base);
    module.exports = Instagram;
}, /* 113 */
/***/
function(module, exports, __webpack_require__) {
    "use strict";
    var _inherits = __webpack_require__(86)["default"], _classCallCheck = __webpack_require__(1)["default"], Base = __webpack_require__(90), Basic = function(_Base) {
        function Basic(input, output, options, embeds) {
            _classCallCheck(this, Basic), _Base.call(this, input, output, options, embeds), 
            this.regex = /((?:https?):\/\/\S*\.(?:gif|jpg|jpeg|tiff|png|svg|webp))/gi, this.service = "image";
        }
        return _inherits(Basic, _Base), Basic.prototype.template = function(match) {
            return '<div class="ejs-image ejs-embed"><div class="ne-image-wrapper"><img src="' + match + '"/></div></div>';
        }, Basic;
    }(Base);
    module.exports = Basic;
} ]);
//# sourceMappingURL=embed.js.map