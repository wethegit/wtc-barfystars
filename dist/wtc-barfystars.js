'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTIONS = exports.Particle = exports.BarfyStars = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wtcControllerElement = require('wtc-controller-element');

var _wtcControllerElement2 = _interopRequireDefault(_wtcControllerElement);

var _wtcVector = require('wtc-vector');

var _wtcVector2 = _interopRequireDefault(_wtcVector);

var _wtcUtilityHelpers = require('wtc-utility-helpers');

var _wtcUtilityHelpers2 = _interopRequireDefault(_wtcUtilityHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ACTIONS = {
  HOVER: 0,
  CLICK: 1,
  CALLBACK: 2
};

var fpsMeasure = _wtcUtilityHelpers2.default.getFPSMeasure();
window.fpsMeasure = fpsMeasure;

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
      this.element = document.createElement('span');
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
    key: 'run',
    value: function run() {
      var pos = this.position.clone();
      this.momentum.scale(this.friction).add(this.gravity);
      pos.add(this.momentum);
      this.rotation += this.momentum.x;
      this.scale *= this.friction - 0.04;
      this.opacity *= this.friction + 0.01;
      this.position = pos;

      this.element.style.transform = 'translate(' + this.position.x + 'px, ' + this.position.y + 'px) scale(' + this.scale + ') rotate(' + this.rotation + 'deg)';
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
    key: 'momentumfactor',
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
    key: 'friction',
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
    key: 'scaleInitial',
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
    key: 'scaleFactor',
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
    key: 'removeAt',
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
    key: 'gravityFactor',
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
        _this.respondToResize = config.respondToResize != 'false';
      }

      _this.working = true;
      _this.configured = true;
    } catch (error) {
      console.log(error);
    }

    if (_this.respondToResize) {
      window.addEventListener('resize', function () {
        clearTimeout(_this.cssTimeout);
        _this.ammendCSS();
      });
    }

    if (_this.configured) {
      _this.originalStyle = getComputedStyle(_this.element);
      _this.element.parentElement.insertBefore(_this.wrapper, _this.element);
      _this.wrapper.appendChild(_this.element);
      _this.ammendCSS(false);

      if (_this.action == ACTIONS.HOVER) {
        _this.element.addEventListener('touchstart', function () {
          _this.touching = true;
        });
        _this.element.addEventListener('mouseenter', function () {
          if (_this.touching) return true;
          _this.addParticles();
        });
        _this.element.addEventListener('touchend', function () {
          _this.touching = false;
        });
        _this.element.addEventListener('touchcancel', function () {
          _this.touching = false;
        });
      }
    }
    return _this;
  }

  _createClass(BarfyStars, [{
    key: 'ammendCSS',
    value: function ammendCSS() {
      var _this2 = this;

      var hasTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var w = this.wrapper;
      var e = this.element;

      w.style.cssText = '';
      e.style.cssText = '';

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
        w.style.pointerEvents = 'none';

        e.style.position = 'relative';
        e.style.top = 'auto';
        e.style.right = 'auto';
        e.style.bottom = 'auto';
        e.style.left = 'auto';
        e.style.marginRight = 'auto';
        e.style.pointerEvents = 'all';
      }, hasTimeout ? 300 : 0);
    }
  }, {
    key: 'run',
    value: function run() {
      this.particles.forEach(function (particle) {
        particle.run();
      });

      if (this.running) {
        requestAnimationFrame(this.run.bind(this));
      }
    }
  }, {
    key: 'addParticles',
    value: function addParticles() {
      if (this.working) {
        for (var i = 0; i < this.numParticles; i++) {
          this.addParticle();
        }
        this.running = true;
      }
    }
  }, {
    key: 'addParticle',
    value: function addParticle() {
      if (fpsMeasure.average60 > 20) {
        var particle = new Particle(this);
        this.particles.push(particle);
        this.element.appendChild(particle.element);
      }
    }
  }, {
    key: 'removeParticle',
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
    key: 'configured',
    set: function set(value) {
      this._configured = value === true;
    },
    get: function get() {
      return this._configured === true;
    }
  }, {
    key: 'working',
    set: function set(value) {
      this._working = value === true;
    },
    get: function get() {
      return this._working === true;
    }
  }, {
    key: 'running',
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
    key: 'wrapper',
    get: function get() {
      if (!this._wrapper) {
        this._wrapper = document.createElement('div');
        this._wrapper.className = this.wrapperClassname;
      }

      return this._wrapper;
    }
  }, {
    key: 'particles',
    get: function get() {
      if (!this._particles) {
        this._particles = [];
      }
      return this._particles;
    }
  }, {
    key: 'particleClasses',
    get: function get() {
      var c = this.particleBaseClassName;
      return c + ' ' + c + '--' + Math.ceil(Math.random() * this.numUniqueParticles);
    }
  }, {
    key: 'numUniqueParticles',
    set: function set(value) {
      if (!isNaN(value)) this._numUniqueParticles = value;
    },
    get: function get() {
      return this._numUniqueParticles || 5;
    }
  }, {
    key: 'particleBaseClassName',
    set: function set(value) {
      if (typeof value == 'string') this._particleBaseClassName = value;
    },
    get: function get() {
      return this._particleBaseClassName || 'BSParticle';
    }
  }, {
    key: 'action',
    set: function set(value) {
      this._action = ['hover', 'click', 'callback'].indexOf(value);
      if (this._action < 0) this._action = 0;
    },
    get: function get() {
      return this._action || 0;
    }
  }, {
    key: 'wrapperClassname',
    set: function set(value) {
      if (typeof value == 'string' && value.length > 3) {
        this._wrapperClassname = value;
      }
    },
    get: function get() {
      return (this._wrapperClassname || 'starburst') + (' ' + this.additionalClasses);
    }
  }, {
    key: 'momentum',
    set: function set(value) {
      if (!isNaN(value)) this._momentum = value;
    },
    get: function get() {
      return this._momentum || null;
    }
  }, {
    key: 'gravity',
    set: function set(value) {
      if (!isNaN(value)) this._gravity = value;
    },
    get: function get() {
      return this._gravity || null;
    }
  }, {
    key: 'friction',
    set: function set(value) {
      if (!isNaN(value)) this._friction = value;
    },
    get: function get() {
      return this._friction || null;
    }
  }, {
    key: 'numParticles',
    set: function set(value) {
      if (!isNaN(value)) this._numParticles = value;
    },
    get: function get() {
      return this._numParticles || 20;
    }
  }, {
    key: 'scaleInitial',
    set: function set(value) {
      if (!isNaN(value)) this._scaleInitial = value;
    },
    get: function get() {
      return this._scaleInitial || null;
    }
  }, {
    key: 'scaleFactor',
    set: function set(value) {
      if (!isNaN(value)) this._scaleFactor = value;
    },
    get: function get() {
      return this._scaleFactor || null;
    }
  }, {
    key: 'removeAt',
    set: function set(value) {
      if (!isNaN(value)) this._removeAt = value;
    },
    get: function get() {
      return this._removeAt || null;
    }
  }, {
    key: 'additionalClasses',
    set: function set(value) {
      if (typeof value == 'string') this._additionalClasses = value;
    },
    get: function get() {
      return this._additionalClasses || '';
    }
  }, {
    key: 'respondToResize',
    set: function set(value) {
      this._respondToResize = value === true;
    },
    get: function get() {
      return this._respondToResize !== false;
    }
  }]);

  return BarfyStars;
}(_wtcControllerElement2.default);

_wtcControllerElement.ExecuteControllers.registerController(BarfyStars, 'BarfyStars');

exports.BarfyStars = BarfyStars;
exports.Particle = Particle;
exports.ACTIONS = ACTIONS;