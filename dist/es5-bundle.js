var WTCBarfyStars =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTIONS = exports.Particle = exports.BarfyStars = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcControllerElement = __webpack_require__(1);

var _wtcControllerElement2 = _interopRequireDefault(_wtcControllerElement);

var _wtcVector = __webpack_require__(2);

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _wtcMeasureFps = __webpack_require__(3);

var _wtcMeasureFps2 = _interopRequireDefault(_wtcMeasureFps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ACTIONS = {
  HOVER: 0,
  CLICK: 1,
  CALLBACK: 2
};

var fpsMeasure = (0, _wtcMeasureFps2.default)();

/**
 * The Particle class is responsible for undertaking the calculations based on properties
 * provided by the Simulation class.
 *
 * @class Particle
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created July 4th, 2017
 */

var Particle = function () {
  /**
   * Creates an instance of Particle.
   *
   * @constructor
   * @param {BarfyStars} emitter         The emitter class that provides the properties.
   * @memberOf Particle
   */
  function Particle(emitter) {
    _classCallCheck(this, Particle);

    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (!iOS) {
      this.emitter = emitter;
      this.element = document.createElement("span");
      this.element.className = this.emitter.particleClasses;

      var randomFactorX = Math.random();
      this.momentum = new _wtcVector2.default(this.momentumfactor * -1 + randomFactorX * (this.momentumfactor * 2), this.momentumfactor * -1 + Math.random() * (this.momentumfactor * (-1 - this.gravityFactor)));
      this.position = this.momentum.multiplyScalarNew(10);
      this.position.y = 0;
      this.position.add(new _wtcVector2.default(0, 0));
      this.position = new _wtcVector2.default(0, 0);

      this.scale = this.scaleInitial + Math.random() * this.scaleFactor;
      this.opacity = 1;
      this.gravity = new _wtcVector2.default(0, this.gravityFactor);
      this.rotation = this.momentum.x;

      this.run();
    }
  }

  /**
   * Runs the simulation for the particle.
   *
   * @memberOf Particle
   */


  _createClass(Particle, [{
    key: "run",
    value: function run() {
      var pos = this.position.clone();
      this.momentum.scale(this.friction).add(this.gravity);
      pos.add(this.momentum);
      this.rotation += this.momentum.x;
      this.scale *= this.friction - 0.04;
      this.opacity *= this.friction + 0.01;
      this.position = pos;

      this.element.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px) scale(" + this.scale + ") rotate(" + this.rotation + "deg)";
      this.element.style.opacity = this.opacity;

      if (this.scale < this.removeAt || fpsMeasure.average60 < 5) {
        this.emitter.removeParticle(this);
      }
    }

    /**
     * Getters and setters
     */

    /**
     * (getter/setter) The momentum factor for the particle.
     * If not provided, tries to find the value on the emitter.
     *
     * @memberOf Particle
     * @default 5.0
     */

  }, {
    key: "momentumfactor",
    set: function set(value) {
      if (!isNaN(value)) {
        this._momentumfactor = value;
      }
    },
    get: function get() {
      return this._momentumfactor || this.emitter.momentum || 5.0;
    }

    /**
     * (getter/setter) The friction of the particle.
     *
     * @memberOf Particle
     * @default 0.999
     */

  }, {
    key: "friction",
    set: function set(value) {
      if (!isNaN(value)) {
        this._friction = value;
      }
    },
    get: function get() {
      return this._friction || this.emitter.friction || 0.999;
    }

    /**
     * (getter) The scaleInitial property is the initial scale of the particle.
     * This property is derived from the emitter.
     *
     * @readonly
     * @memberOf Particle
     * @default 0.5
     */

  }, {
    key: "scaleInitial",
    get: function get() {
      return this.emitter.scaleInitial || 0.5;
    }

    /**
     * (getter) scaleFactor is the amount of scaling that happens on the particle initially.
     * This property is derived from the emitter.
     *
     * @readonly
     * @memberOf Particle
     * @default 0.8
     */

  }, {
    key: "scaleFactor",
    get: function get() {
      return this.emitter.scaleFactor || 0.8;
    }

    /**
     * (getter) removeAt determines the point, in scale, at which the particle is removed.
     * This property is derived from the emitter.
     *
     * @readonly
     * @memberOf Particle
     * @default 0.05
     */

  }, {
    key: "removeAt",
    get: function get() {
      return this.emitter.removeAt || 0.05;
    }

    /**
     * (getter) the gravity determines the speed at which the particle falls.
     * This property is derived from the emitter.
     *
     * @readonly
     * @memberOf Particle
     * @default 0.05
     */

  }, {
    key: "gravityFactor",
    get: function get() {
      return this.emitter.gravity || 0.4;
    }
  }]);

  return Particle;
}();

var BarfyStars = function (_ElementController) {
  _inherits(BarfyStars, _ElementController);

  function BarfyStars(element) {
    _classCallCheck(this, BarfyStars);

    var _this = _possibleConstructorReturn(this, (BarfyStars.__proto__ || Object.getPrototypeOf(BarfyStars)).call(this, element));

    try {
      if (element.dataset.config) {
        var config = JSON.parse(element.dataset.config);
        _this.action = config.action;
        _this.momentum = config.momentum;
        _this.gravity = config.gravity;
        _this.friction = config.friction;
        _this.numParticles = config.numParticles;
        _this.numUniqueParticles = config.numUniqueParticles;
        _this.scaleInitial = config.scaleInitial;
        _this.scaleFactor = config.scaleFactor;
        _this.removeAt = config.removeAt;
        _this.additionalClasses = config.additionalClasses;
        _this.respondToResize = config.respondToResize != "false";
        _this.eventName = config.eventName;
      }

      _this.working = true;
      _this.configured = true;
    } catch (error) {
      console.log(error);
    }

    if (_this.respondToResize) {
      window.addEventListener("resize", function () {
        clearTimeout(_this.cssTimeout);
        _this.ammendCSS();
      });
    }

    if (_this.configured) {
      _this.originalStyle = getComputedStyle(_this.element);
      _this.element.parentElement.insertBefore(_this.wrapper, _this.element);
      _this.wrapper.appendChild(_this.element);
      _this.ammendCSS(false);

      // @TODO All of this needs to be cleaned up to alleviate memory leaks
      if (_this.action == ACTIONS.HOVER) {
        _this.element.addEventListener("touchstart", function () {
          _this.touching = true;
        });
        _this.element.addEventListener("mouseenter", function () {
          if (_this.touching) return true;
          _this.addParticles();
        });
        _this.element.addEventListener("touchend", function () {
          _this.touching = false;
        });
        _this.element.addEventListener("touchcancel", function () {
          _this.touching = false;
        });
      } else if (_this.action == ACTIONS.CALLBACK) {
        window.addEventListener(_this.eventName, function () {
          _this.addParticles();
        });
      }
    }
    return _this;
  }

  _createClass(BarfyStars, [{
    key: "ammendCSS",
    value: function ammendCSS() {
      var _this2 = this;

      var hasTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var w = this.wrapper;
      var e = this.element;

      w.style.cssText = "";
      e.style.cssText = "";

      this.cssTimeout = setTimeout(function () {
        w.style.display = _this2.originalStyle.display;
        w.style.position = _this2.originalStyle.position;
        w.style.width = _this2.originalStyle.width;
        w.style.height = _this2.originalStyle.height;
        w.style.top = _this2.originalStyle.top;
        w.style.right = _this2.originalStyle.right;
        w.style.bottom = _this2.originalStyle.bottom;
        w.style.left = _this2.originalStyle.left;
        w.style.marginRight = _this2.originalStyle.marginRight;
        w.style.pointerEvents = "none";

        e.style.position = "relative";
        e.style.top = "auto";
        e.style.right = "auto";
        e.style.bottom = "auto";
        e.style.left = "auto";
        e.style.marginRight = "auto";
        e.style.pointerEvents = "all";
      }, hasTimeout ? 300 : 0);
    }
  }, {
    key: "run",
    value: function run() {
      this.particles.forEach(function (particle) {
        particle.run();
      });

      if (this.running) {
        requestAnimationFrame(this.run.bind(this));
      }
    }
  }, {
    key: "addParticles",
    value: function addParticles() {
      if (this.working) {
        for (var i = 0; i < this.numParticles; i++) {
          this.addParticle();
        }
        this.running = true;
      }
    }
  }, {
    key: "addParticle",
    value: function addParticle() {
      if (fpsMeasure.average60 > 20) {
        var particle = new Particle(this);
        this.particles.push(particle);
        this.element.appendChild(particle.element);
      }
    }
  }, {
    key: "removeParticle",
    value: function removeParticle(particle) {
      var _this3 = this;

      setTimeout(function () {
        for (var i = _this3.particles.length - 1; i >= 0; i--) {
          if (_this3.particles[i] === particle) {
            _this3.particles.splice(i, 1);
          }
        }
        if (_this3.particles.length <= 0) {
          _this3.running = false;
        }
        try {
          _this3.element.removeChild(particle.element);
        } catch (error) {}
      }, 0);
    }
  }, {
    key: "configured",
    set: function set(value) {
      this._configured = value === true;
    },
    get: function get() {
      return this._configured === true;
    }
  }, {
    key: "working",
    set: function set(value) {
      this._working = value === true;
    },
    get: function get() {
      return this._working === true;
    }
  }, {
    key: "running",
    set: function set(value) {
      var oldValue = this.running;
      this._running = value === true;
      if (this._running === true && oldValue === false) {
        this.run();
      }
    },
    get: function get() {
      return this._running === true;
    }
  }, {
    key: "wrapper",
    get: function get() {
      if (!this._wrapper) {
        this._wrapper = document.createElement("div");
        this._wrapper.className = this.wrapperClassname;
      }

      return this._wrapper;
    }
  }, {
    key: "particles",
    get: function get() {
      if (!this._particles) {
        this._particles = [];
      }
      return this._particles;
    }
  }, {
    key: "particleClasses",
    get: function get() {
      var c = this.particleBaseClassName;
      return c + " " + c + "--" + Math.ceil(Math.random() * this.numUniqueParticles);
    }
  }, {
    key: "numUniqueParticles",
    set: function set(value) {
      if (!isNaN(value)) this._numUniqueParticles = value;
    },
    get: function get() {
      return this._numUniqueParticles || 5;
    }
  }, {
    key: "particleBaseClassName",
    set: function set(value) {
      if (typeof value == "string") this._particleBaseClassName = value;
    },
    get: function get() {
      return this._particleBaseClassName || "BSParticle";
    }
  }, {
    key: "action",
    set: function set(value) {
      this._action = ["hover", "click", "callback"].indexOf(value);
      if (this._action < 0) this._action = 0;
    },
    get: function get() {
      return this._action || 0;
    }
  }, {
    key: "wrapperClassname",
    set: function set(value) {
      if (typeof value == "string" && value.length > 3) {
        this._wrapperClassname = value;
      }
    },
    get: function get() {
      return (this._wrapperClassname || "starburst") + (" " + this.additionalClasses);
    }
  }, {
    key: "momentum",
    set: function set(value) {
      if (!isNaN(value)) this._momentum = value;
    },
    get: function get() {
      return this._momentum || null;
    }
  }, {
    key: "gravity",
    set: function set(value) {
      if (!isNaN(value)) this._gravity = value;
    },
    get: function get() {
      return this._gravity || null;
    }
  }, {
    key: "friction",
    set: function set(value) {
      if (!isNaN(value)) this._friction = value;
    },
    get: function get() {
      return this._friction || null;
    }
  }, {
    key: "numParticles",
    set: function set(value) {
      if (!isNaN(value)) this._numParticles = value;
    },
    get: function get() {
      return this._numParticles || 20;
    }
  }, {
    key: "scaleInitial",
    set: function set(value) {
      if (!isNaN(value)) this._scaleInitial = value;
    },
    get: function get() {
      return this._scaleInitial || null;
    }
  }, {
    key: "scaleFactor",
    set: function set(value) {
      if (!isNaN(value)) this._scaleFactor = value;
    },
    get: function get() {
      return this._scaleFactor || null;
    }
  }, {
    key: "removeAt",
    set: function set(value) {
      if (!isNaN(value)) this._removeAt = value;
    },
    get: function get() {
      return this._removeAt || null;
    }
  }, {
    key: "additionalClasses",
    set: function set(value) {
      if (typeof value == "string") this._additionalClasses = value;
    },
    get: function get() {
      return this._additionalClasses || "";
    }
  }, {
    key: "respondToResize",
    set: function set(value) {
      this._respondToResize = value === true;
    },
    get: function get() {
      return this._respondToResize !== false;
    }
  }, {
    key: "eventName",
    set: function set(value) {
      if (typeof value === "string") this._eventName = value;
    },
    get: function get() {
      return this._eventName || "barf_stars";
    }
  }]);

  return BarfyStars;
}(_wtcControllerElement2.default);

_wtcControllerElement.ExecuteControllers.registerController(BarfyStars, "BarfyStars");

exports.BarfyStars = BarfyStars;
exports.Particle = Particle;
exports.ACTIONS = ACTIONS;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ExecuteControllers
 * Simple static class to instanciate and register all the controllers.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1.1.0
 * @requirements
 * @created Nov 23, 2016
 */

/**
 * Stores controllers.
 * @type {Object}
 */
var controllersList = new Map();

var ExecuteControllers = function () {
  function ExecuteControllers() {
    _classCallCheck(this, ExecuteControllers);
  }

  _createClass(ExecuteControllers, null, [{
    key: 'instanciateAll',

    /**
     * Instanciate all the elements with registered controllers.
     * @param {String|Object} query  - Can be a string, ex: '[data-controller]' or
     *                                 an object, ex: {el: DOMNode, query: '[data-controller]'}
     * @param {String} controllerAtt - Attribute with the name of the controller.
     */
    value: function instanciateAll() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-controller]';
      var controllerAtt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data-controller';
      var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var els = null;

      if (typeof query === 'string') {
        els = document.querySelectorAll(query);
      } else if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        if (!query.hasOwnProperty('el')) {
          throw 'Instanciate all is missing the DOMNode. Ex: instanciateAll({el: DOMNode, query: "[data-controller]"})';
        }

        if (!query.hasOwnProperty('query')) {
          query.query = '[data-controller]';
        }

        els = query.el.querySelectorAll(query.query);
      }

      if (els.length > 0) {
        for (var i = 0; i < els.length; i++) {
          var op = els[i];
          var cont = op.getAttribute(controllerAtt);

          if (cont) {
            ExecuteControllers.instanciate(op, op.getAttribute(controllerAtt), debug);
          }
        }
      }
    }

    /**
     * Instanciate controller and saves it in the data attribute.
     * @param {DOMNode} el             - Element.
     * @param {string|class}  controllerName - Name of the registered controller, or a Class.
     *
     * @return {DOMNode} Element.
     */

  }, {
    key: 'instanciate',
    value: function instanciate() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var controllerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var controller = controllerName;

      try {
        if (typeof controllerName === 'string') {
          if (el.data && el.data.instanciated) {
            throw new Error('The element with the controller \'' + controllerName + '\' has already been instanciated. This error is non-critical and just means that something has tried to instanciate it twice.');
          }

          if (controllersList.has(controllerName)) {
            controller = controllersList.get(controllerName);
          } else {
            throw new Error('The controller \'' + controllerName + '\' has not been registered. Please make sure the controller is registering itself using ExecuteController.registerController(CLASS, \'OPTIONAL-NAME\').');
          }

          if (!debug) {

            var parameters = el.dataset;
            var instance = new controller(el, parameters);

            return el;
          }
        }
      } catch (_error) {
        console.warn("Error: " + _error.message, _error.stack);
      }

      if (debug) {
        var _parameters = el.dataset;
        var _instance = new controller(el, _parameters);
        return el;
      }
    }

    /**
     * Registers controllers
     * @param {Class}  controller     - Controller.
     * @param {string} [controllerName=''] - Name of the controller
     */

  }, {
    key: 'registerController',
    value: function registerController(controller) {
      var controllerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      try {
        if (!controllerName) {
          throw 'Controller name is required. Ex: ExecuteControllers.registerController(TestController, \'TestController\');';
        }

        if (controllersList.has(controllerName)) {
          console.warn('Controller ' + controllerName + ' is already registered.');
        } else {
          controllersList.set(controllerName, controller);
        }
      } catch (e) {}
    }

    /**
     * Get list of registered controllers.
     * @return {Map} List
     */

  }, {
    key: 'controllersList',
    get: function get() {
      return controllersList;
    }
  }]);

  return ExecuteControllers;
}();

/**
 * Element Controller
 * Base class to be extended by controllers.
 * It saves the instance and information on the element data for future reference.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1
 * @requirements
 * @created Nov 23, 2016
 */


var ElementController = function () {
  function ElementController(element) {
    _classCallCheck(this, ElementController);

    this.element = element;
    this.element.data = this.element.data || {};
    this.element.data.controller = this;
    this.element.data.instanciated = true;
  }

  /**
   * Check if element exists in the DOM.
   * @return {Bool} True/False.
   */


  _createClass(ElementController, [{
    key: 'elementExistsInDOM',
    value: function elementExistsInDOM() {
      var element = void 0,
          exists = void 0;
      exists = this.element || null;
      if (!exists) {
        return false;
      }
      element = this.element;
      while (element) {
        if (element === document) {
          return true;
        }
        element = element.parentNode;
      }
      return false;
    }
  }]);

  return ElementController;
}();

// Export ElementController as defaultl


exports.default = ElementController;
exports.ExecuteControllers = ExecuteControllers;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var conversionFactor = 180 / Math.PI;

var radianToDegrees = function radianToDegrees(radian) {
  return radian * conversionFactor;
};

var degreesToRadian = function degreesToRadian(degrees) {
  return degrees / conversionFactor;
};
/**
 * A basic 2D Vector class that provides simple algebraic functionality in the form
 * of 2D Vectors.
 *
 * We use Getters/setters for both principle properties (x & y) as well as virtual
 * properties (rotation, length etc.).
 *
 * @class Vector
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.1
 * @created Dec 19, 2016
 */


var Vector =
/*#__PURE__*/
function () {
  /**
   * The Vector Class constructor
   *
   * @constructor
   * @param {number} x 				The x coord
   * @param {number} y 				The y coord
   */
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }
  /**
   * Resets the vector coordinates
   *
   * @public
  * @param {number} x 				The x coord
  * @param {number} y 				The y coord
   */


  _createClass(Vector, [{
    key: "reset",
    value: function reset(x, y) {
      this.x = x;
      this.y = y;
    }
    /**
     * Resets the vector coordinates to another vector object
     *
     * @public
    * @param {Vector} v 				The vector object to use to reset the coordinates
     */

  }, {
    key: "resetToVector",
    value: function resetToVector(v) {
      if (v instanceof Vector) {
        this.x = v.x;
        this.y = v.y;
      }
    }
    /**
     * Clones the vector
     *
     * @public
     * @return {Vector}					The cloned vector
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
    /**
     * Adds one vector to another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to add to this one
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "add",
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    }
    /**
     * Clones the vector and adds the vector to it instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to add to this one
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "addNew",
    value: function addNew(vector) {
      var v = this.clone();
      return v.add(vector);
    }
    /**
     * Adds a scalar to the vector, modifying both the x and y
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "addScalar",
    value: function addScalar(scalar) {
      return this.add(new Vector(scalar, scalar));
    }
    /**
     * Clones the vector and adds the scalar to it instead
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "addScalarNew",
    value: function addScalarNew(scalar) {
      var v = this.clone();
      return v.addScalar(scalar);
    }
    /**
     * Subtracts one vector from another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to subtract from this one
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "subtract",
    value: function subtract(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    }
    /**
     * Clones the vector and subtracts the vector from it instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to subtract from this one
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "subtractNew",
    value: function subtractNew(vector) {
      var v = this.clone();
      return v.subtract(vector);
    }
    /**
     * Subtracts a scalar from the vector, modifying both the x and y
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to subtract from the vector
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "subtractScalar",
    value: function subtractScalar(scalar) {
      return this.subtract(new Vector(scalar, scalar));
    }
    /**
     * Clones the vector and subtracts the scalar from it instead
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to add to the vector
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "subtractScalarNew",
    value: function subtractScalarNew(scalar) {
      var v = this.clone();
      return v.subtractScalar(scalar);
    }
    /**
     * Divides one vector by another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to divide this by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "divide",
    value: function divide(vector) {
      if (vector.x !== 0) {
        this.x /= vector.x;
      } else {
        this.x = 0;
      }

      if (vector.y !== 0) {
        this.y /= vector.y;
      } else {
        this.y = 0;
      }

      return this;
    }
    /**
     * Clones the vector and divides it by the vector instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to divide the clone by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "divideNew",
    value: function divideNew(vector) {
      var v = this.clone();
      return v.divide(vector);
    }
    /**
     * Divides the vector by a scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to divide both x and y by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.divide(v);
    }
    /**
     * Clones the vector and divides it by the provided scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to divide both x and y by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "divideScalarNew",
    value: function divideScalarNew(scalar) {
      var v = this.clone();
      return v.divideScalar(scalar);
    }
    /**
     * Multiplies one vector by another.
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to multiply this by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "multiply",
    value: function multiply(vector) {
      this.x *= vector.x;
      this.y *= vector.y;
      return this;
    }
    /**
     * Clones the vector and multiplies it by the vector instead
     *
     * @public
     * @chainable
     * @param  {Vector}  vector The vector to multiply the clone by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "multiplyNew",
    value: function multiplyNew(vector) {
      var v = this.clone();
      return v.multiply(vector);
    }
    /**
     * Multiplies the vector by a scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to multiply both x and y by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      var v = new Vector(scalar, scalar);
      return this.multiply(v);
    }
    /**
     * Clones the vector and multiplies it by the provided scalar.
     *
     * @public
     * @chainable
     * @param  {number}  scalar The scalar to multiply both x and y by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "multiplyScalarNew",
    value: function multiplyScalarNew(scalar) {
      var v = this.clone();
      return v.multiplyScalar(scalar);
    }
    /**
     * Alias of {@link Vector#multiplyScalar__anchor multiplyScalar}
     */

  }, {
    key: "scale",
    value: function scale(scalar) {
      return this.multiplyScalar(scalar);
    }
    /**
     * Alias of {@link Vector#multiplyScalarNew__anchor multiplyScalarNew}
     */

  }, {
    key: "scaleNew",
    value: function scaleNew(scalar) {
      return this.multiplyScalarNew(scalar);
    }
    /**
     * Rotates a vecor by a given amount, provided in radians.
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector by
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "rotate",
    value: function rotate(radian) {
      var x = this.x * Math.cos(radian) - this.y * Math.sin(radian);
      var y = this.x * Math.sin(radian) + this.y * Math.cos(radian);
      this.x = x;
      this.y = y;
      return this;
    }
    /**
     * Clones the vector and rotates it by the supplied radian value
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector by
     * @return {Vector}					Returns the clone of itself, modified
     */

  }, {
    key: "rotateNew",
    value: function rotateNew(radian) {
      var v = this.clone();
      return v.rotate(radian);
    }
    /**
     * Rotates a vecor by a given amount, provided in degrees. Converts the degree
     * value to radians and runs the rotaet method.
     *
     * @public
     * @chainable
     * @param  {number}  degrees The angle, in degrees, to rotate the vector by
     * @return {Vector}						Returns itself, modified
     */

  }, {
    key: "rotateDeg",
    value: function rotateDeg(degrees) {
      return this.rotate(degreesToRadian(degrees));
    }
    /**
     * Clones the vector and rotates it by the supplied degree value
     *
     * @public
     * @chainable
    * @param  {number}  degrees The angle, in degrees, to rotate the vector by
     * @return {Vector}					 Returns the clone of itself, modified
     */

  }, {
    key: "rotateDegNew",
    value: function rotateDegNew(degrees) {
      return this.rotateNew(degreesToRadian(degrees));
    }
    /**
     * Alias of {@link Vector#rotate__anchor rotate}
     */

  }, {
    key: "rotateBy",
    value: function rotateBy(radian) {
      return this.rotate(radian);
    }
    /**
     * Alias of {@link Vector#rotateNew__anchor rotateNew}
     */

  }, {
    key: "rotateByNew",
    value: function rotateByNew(radian) {
      return this.rotateNew(radian);
    }
    /**
     * Alias of {@link Vector#rotateDeg__anchor rotateDeg}
     */

  }, {
    key: "rotateDegBy",
    value: function rotateDegBy(degrees) {
      return this.rotateDeg(degrees);
    }
    /**
     * Alias of {@link Vector#rotateDegNew__anchor rotateDegNew}
     */

  }, {
    key: "rotateDegByNew",
    value: function rotateDegByNew(radian) {
      return tjos.rotateDegNew(radian);
    }
    /**
     * Rotates a vector to a specific angle
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector to
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "rotateTo",
    value: function rotateTo(radian) {
      return this.rotate(radian - this.angle);
    }
  }, {
    key: "rotateToNew",

    /**
     * Clones the vector and rotates it to the supplied radian value
     *
     * @public
     * @chainable
     * @param  {number}  radian The angle, in radians, to rotate the vector to
     * @return {Vector}					Returns the clone of itself, modified
     */
    value: function rotateToNew(radian) {
      var v = this.clone();
      return v.rotateTo(radian);
    }
  }, {
    key: "rotateToDeg",

    /**
     * Rotates a vecor to a given amount, provided in degrees. Converts the degree
     * value to radians and runs the rotateTo method.
     *
     * @public
     * @chainable
     * @param  {number}  degrees The angle, in degrees, to rotate the vector to
     * @return {Vector}						Returns itself, modified
     */
    value: function rotateToDeg(degrees) {
      return this.rotateTo(degreesToRadian(degrees));
    }
    /**
     * Clones the vector and rotates it to the supplied degree value
     *
     * @public
     * @chainable
    * @param  {number}  degrees The angle, in degrees, to rotate the vector to
     * @return {Vector}					 Returns the clone of itself, modified
     */

  }, {
    key: "rotateToDegNew",
    value: function rotateToDegNew(degrees) {
      return this.rotateToNew(degreesToRadian(degrees));
    }
    /**
     * Normalises the vector down to a length of 1 unit
     *
     * @public
     * @chainable
     * @return {Vector}					Returns itself, modified
     */

  }, {
    key: "normalise",
    value: function normalise() {
      return this.divideScalar(this.length);
    }
    /**
     * Clones the vector and normalises it
     *
     * @public
     * @chainable
     * @return {Vector}					Returns a clone of itself, modified
     */

  }, {
    key: "normaliseNew",
    value: function normaliseNew() {
      return this.divideScalarNew(this.length);
    }
    /**
     * Calculates the distance between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance between this and the supplied vector
     */

  }, {
    key: "distance",
    value: function distance(vector) {
      return this.subtractNew(vector).length;
    }
    /**
     * Calculates the distance on the X axis between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance, along the x axis, between this and the supplied vector
     */

  }, {
    key: "distanceX",
    value: function distanceX(vector) {
      return this.x - vector.x;
    }
    /**
     * Calculated the distance on the Y axis between this and the supplied vector
     *
     * @param  {Vector} vector The vector to calculate the distance from
     * @return {number}        The distance, along the y axis, between this and the supplied vector
     */

  }, {
    key: "distanceY",
    value: function distanceY(vector) {
      return this.y - vector.y;
    }
    /**
     * Calculates the dot product between this and a supplied vector
     *
     * @example
     * // returns -14
     * new Vector(2, -3).dot(new Vector(-4, 2))
     * new Vector(-4, 2).dot(new Vector(2, -3))
     * new Vector(2, -4).dot(new Vector(-3, 2))
     *
     * @param  {Vector} vector The vector object against which to calculate the dot product
     * @return {number}        The dot product of the two vectors
     */

  }, {
    key: "dot",
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }
    /**
     * Calculates the cross product between this and the supplied vector.
     *
     * @example
     * // returns -2
     * new Vector(2, -3).cross(new Vector(-4, 2))
     * new Vector(-4, 2).cross(new Vector(2, -3))
     * // returns 2
     * new Vector(2, -4).cross(new Vector(-3, 2))
     *
     * @param  {Vector} vector The vector object against which to calculate the cross product
     * @return {number}        The cross product of the two vectors
     */

  }, {
    key: "cross",
    value: function cross(vector) {
      return this.x * vector.x - this.y * vector.y;
    }
    /**
     * Getters and setters
     */

    /**
     * (getter/setter) The x value of the vector.
     *
     * @type {number}
     * @default 0
     */

  }, {
    key: "x",
    set: function set(x) {
      if (typeof x == 'number') {
        this._x = x;
      } else {
        throw new TypeError('X should be a number');
      }
    },
    get: function get() {
      return this._x || 0;
    }
    /**
    * (getter/setter) The y value of the vector.
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: "y",
    set: function set(y) {
      if (typeof y == 'number') {
        this._y = y;
      } else {
        throw new TypeError('Y should be a number');
      }
    },
    get: function get() {
      return this._y || 0;
    }
    /**
    * (getter/setter) The length of the vector presented as a square. If you're using
    * length for comparison, this is quicker.
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: "lengthSquared",
    set: function set(length) {
      var factor;

      if (typeof length == 'number') {
        factor = length / this.lengthSquared;
        this.multiplyScalar(factor);
      } else {
        throw new TypeError('length should be a number');
      }
    },
    get: function get() {
      return this.x * this.x + this.y * this.y;
    }
    /**
    * (getter/setter) The length of the vector
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: "length",
    set: function set(length) {
      var factor;

      if (typeof length == 'number') {
        factor = length / this.length;
        this.multiplyScalar(factor);
      } else {
        throw new TypeError('length should be a number');
      }
    },
    get: function get() {
      return Math.sqrt(this.lengthSquared);
    }
    /**
    * (getter/setter) The angle of the vector, in radians
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: "angle",
    set: function set(radian) {
      if (typeof radian == 'number') {
        this.rotateTo(radian);
      } else {
        throw new TypeError('angle should be a number');
      }
    },
    get: function get() {
      return Math.atan2(this.y, this.x);
    }
    /**
    * (getter/setter) The angle of the vector, in radians
    *
    * @type {number}
    * @default 0
    */

  }, {
    key: "angleInDegrees",
    set: function set(degrees) {
      if (typeof degrees == 'number') {
        this.rotateToDeg(degrees);
      } else {
        throw new TypeError('angle should be a number');
      }
    },
    get: function get() {
      return radianToDegrees(Math.atan2(this.y, this.x));
    }
    /**
     * (getter/setter) Vector width.
      * Alias of {@link Vector#x x}
     *
     * @type {number}
     */

  }, {
    key: "width",
    set: function set(w) {
      this.x = w;
    },
    get: function get() {
      return this.x;
    }
    /**
     * (getter/setter) Vector height.
      * Alias of {@link Vector#x x}
     *
     * @type {number}
     */

  }, {
    key: "height",
    set: function set(h) {
      this.y = h;
    },
    get: function get() {
      return this.y;
    }
    /**
     * (getter/setter) Vector area.
     * @readonly
     *
     * @type {number}
     */

  }, {
    key: "area",
    get: function get() {
      return this.x * this.y;
    }
    /**
     * (getter/setter) Vector slope.
     *
     * @type {number}
     */

  }, {
    key: "slope",
    set: function set(value) {
      if (!isNaN(value)) {
        var angle = Math.atan(value);
        this.angle = angle;
      }
    },
    get: function get() {
      return this.y / this.x;
    }
  }]);

  return Vector;
}();

var _default = Vector;
exports["default"] = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A singleton class that provides Framerate information for a website. When running, this will produce a
 * number of useful internal properties.
 *
 * - current
 *   The current framerate
 * - low
 *   The lowest overall framerate
 * - averageOverall
 *   The average overall framerate
 * - average60
 *   The average framerate in the last 60 frames (ideally this is a second)
 *
 * ## Usage
 * ```
 * let fps = utilities.getFPSMeasure();
 * console.log(fps.current); // 60
 * ```
 *
 * When using this class, it is often fortiuitous to cycle it down and back up after a big FPS dip:
 * ```
 * fps.stop();
 * fps.start();
 * ```
 *
 * @private
 * @class MeasureFPS
 */
var MeasureFPS = /*#__PURE__*/function () {
  function MeasureFPS() {
    _classCallCheck(this, MeasureFPS);

    this.start();
  }

  _createClass(MeasureFPS, [{
    key: "start",
    value: function start() {
      if (this.running === true) return;
      this.elapsedTime = 0;
      this.lastTime = 0;
      this.current = 0;
      this.low = 60;
      this.averageOverall = 60;
      this.average60 = 60;
      this.ticks = 0;
      this.running = true;
      requestAnimationFrame(this.run.bind(this));
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
    }
  }, {
    key: "run",
    value: function run(now) {
      var tick60;
      this.elapsedTime = (now - (this.lastTime || now)) / 1000;
      this.lastTime = now;
      this.ticks += 1;
      this.current = 1 / this.elapsedTime;

      if (this.current < this.low) {
        this.low = this.current;
      }

      if (!isNaN(parseInt(this.current))) {
        this.averageOverall = (this.ticks * this.averageOverall + this.current) / (this.ticks + 1);

        if (this.ticks % 60 === 0) {
          this.average60 = 60;
        }

        tick60 = this.ticks % 60 + 1;
        this.average60 = (tick60 * this.average60 + this.current) / (tick60 + 1);
      }

      if (this.running === true) {
        requestAnimationFrame(this.run.bind(this));
      }
    }
  }]);

  return MeasureFPS;
}();

var measureFPSInstance = null;

var getFPSMeasure = function getFPSMeasure() {
  if (measureFPSInstance === null) measureFPSInstance = new MeasureFPS();
  return measureFPSInstance;
};

var _default = getFPSMeasure;
exports["default"] = _default;

/***/ })
/******/ ]);