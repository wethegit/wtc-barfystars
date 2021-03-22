import vector from "wtc-vector";
import getFPSMeasure from "wtc-measure-fps";

const ACTIONS = {
  HOVER: 0,
  CLICK: 1,
  CALLBACK: 2,
};

let fpsMeasure = getFPSMeasure();

/**
 * The Particle class is responsible for undertaking the calculations based on properties
 * provided by the Simulation class.
 *
 * @class Particle
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.1.0
 * @created July 4th, 2017
 */
class Particle {
  /**
   * Creates an instance of Particle.
   *
   * @constructor
   * @param {BarfyStars} emitter         The emitter class that provides the properties.
   * @memberOf Particle
   */
  constructor(emitter) {
    this.emitter = emitter;
    this.element = document.createElement("span");
    this.element.className = this.emitter.particleClasses;

    let randomFactorX = Math.random();
    this.momentum = new vector(
      this.momentumfactor * -1 + randomFactorX * (this.momentumfactor * 2),
      this.momentumfactor * -1 +
        Math.random() * (this.momentumfactor * (-1 - this.gravityFactor))
    );
    this.position = this.momentum.multiplyScalarNew(10);
    this.position.y = 0;
    this.position.add(new vector(0, 0));
    this.position = new vector(0, 0);

    this.scale = this.scaleInitial + Math.random() * this.scaleFactor;
    this.opacity = 1;
    this.gravity = new vector(0, this.gravityFactor);
    this.rotation = this.momentum.x;

    this.run();
  }

  /**
   * Runs the simulation for the particle.
   *
   * @memberOf Particle
   */
  run() {
    let pos = this.position.clone();

    this.momentum.scale(this.friction).add(this.gravity);
    pos.add(this.momentum);
    this.rotation += this.momentum.x;
    this.scale *= this.friction - 0.04;
    this.opacity *= this.friction + 0.01;
    this.position = pos;

    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
    this.element.style.opacity = this.opacity;

    if (this.scale < this.removeAt || fpsMeasure.average60 < 5)
      this.emitter.removeParticle(this);
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
  set momentumfactor(value) {
    if (!isNaN(value)) this._momentumfactor = value;
  }

  get momentumfactor() {
    return this._momentumfactor || this.emitter.momentum || 5.0;
  }

  /**
   * (getter/setter) The friction of the particle.
   *
   * @memberOf Particle
   * @default 0.999
   */
  set friction(value) {
    if (value && typeof value === "number") this._friction = value;
  }
  get friction() {
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
  get scaleInitial() {
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
  get scaleFactor() {
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
  get removeAt() {
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
  get gravityFactor() {
    return this.emitter.gravity || 0.4;
  }
}

class BarfyStars {
  constructor(element) {
    this.element = element;

    try {
      if (element.dataset.config) {
        let config = JSON.parse(element.dataset.config);

        this.action = config.action;
        this.momentum = config.momentum;
        this.gravity = config.gravity;
        this.friction = config.friction;
        this.numParticles = config.numParticles;
        this.numUniqueParticles = config.numUniqueParticles;
        this.scaleInitial = config.scaleInitial;
        this.scaleFactor = config.scaleFactor;
        this.removeAt = config.removeAt;
        this.additionalClasses = config.additionalClasses;
        this.respondToResize = config.respondToResize != "false";
        this.eventName = config.eventName;
      }

      this.working = true;
      this.configured = true;
    } catch (error) {
      console.log(error);
    }

    if (this.respondToResize) {
      window.addEventListener("resize", () => {
        clearTimeout(this.cssTimeout);
        this.ammendCSS();
      });
    }

    if (this.configured) {
      this.originalStyle = getComputedStyle(this.element);
      this.element.parentElement.insertBefore(this.wrapper, this.element);
      this.wrapper.appendChild(this.element);
      this.ammendCSS(false);

      const onEventCallback = this.onEventCallback.bind(this);

      switch (this.action) {
        case ACTIONS.CLICK:
          this.element.addEventListener("click", onEventCallback);
          break;

        case ACTIONS.CALLBACK:
          window.addEventListener(this.eventName, onEventCallback);
          break;

        default:
          this.element.addEventListener("pointerenter", onEventCallback);
          break;
      }
    }
  }

  ammendCSS(hasTimeout = true) {
    let w = this.wrapper;
    let e = this.element;

    w.style.cssText = "";
    e.style.cssText = "";

    this.cssTimeout = setTimeout(
      () => {
        w.style.display = this.originalStyle.display;
        w.style.position = this.originalStyle.position;
        w.style.width = this.originalStyle.width;
        w.style.height = this.originalStyle.height;
        w.style.top = this.originalStyle.top;
        w.style.right = this.originalStyle.right;
        w.style.bottom = this.originalStyle.bottom;
        w.style.left = this.originalStyle.left;
        w.style.marginRight = this.originalStyle.marginRight;
        w.style.pointerEvents = "none";

        e.style.position = "relative";
        e.style.top = "auto";
        e.style.right = "auto";
        e.style.bottom = "auto";
        e.style.left = "auto";
        e.style.marginRight = "auto";
        e.style.pointerEvents = "all";
      },
      hasTimeout ? 300 : 0
    );
  }

  run() {
    this.particles.forEach((particle) => {
      particle.run();
    });

    if (this.running) requestAnimationFrame(this.run.bind(this));
  }

  addParticles() {
    if (this.working) {
      for (let i = 0; i < this.numParticles; i++) {
        this.addParticle();
      }
      this.running = true;
    }
  }

  addParticle() {
    if (fpsMeasure.average60 > 20) {
      let particle = new Particle(this);
      if (particle.element) {
        this.particles.push(particle);
        this.element.appendChild(particle.element);
      }
    }
  }

  removeParticle(particle) {
    setTimeout(() => {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        if (this.particles[i] === particle) {
          this.particles.splice(i, 1);
        }
      }
      if (this.particles.length <= 0) {
        this.running = false;
      }
      try {
        this.element.removeChild(particle.element);
      } catch (error) {}
    }, 0);
  }

  set configured(value) {
    this._configured = value === true;
  }
  get configured() {
    return this._configured === true;
  }

  set working(value) {
    this._working = value === true;
  }
  get working() {
    return this._working === true;
  }

  set running(value) {
    let oldValue = this.running;
    this._running = value === true;
    if (this._running === true && oldValue === false) {
      this.run();
    }
  }
  get running() {
    return this._running === true;
  }

  get wrapper() {
    if (!this._wrapper) {
      this._wrapper = document.createElement("div");
      this._wrapper.className = this.wrapperClassname;
    }

    return this._wrapper;
  }

  get particles() {
    if (!this._particles) {
      this._particles = [];
    }
    return this._particles;
  }

  get particleClasses() {
    let c = this.particleBaseClassName;
    return (
      c + " " + c + "--" + Math.ceil(Math.random() * this.numUniqueParticles)
    );
  }

  set numUniqueParticles(value) {
    if (!isNaN(value)) this._numUniqueParticles = value;
  }
  get numUniqueParticles() {
    return this._numUniqueParticles || 5;
  }

  set particleBaseClassName(value) {
    if (typeof value == "string") this._particleBaseClassName = value;
  }
  get particleBaseClassName() {
    return this._particleBaseClassName || "barfystars-particle";
  }

  set action(value) {
    this._action = ["hover", "click", "callback"].indexOf(value);
    if (this._action < 0) this._action = 0;
  }
  get action() {
    return this._action || 0;
  }

  set wrapperClassname(value) {
    if (typeof value == "string" && value.length > 3) {
      this._wrapperClassname = value;
    }
  }
  get wrapperClassname() {
    return (
      (this._wrapperClassname || "starburst") + (" " + this.additionalClasses)
    );
  }

  set momentum(value) {
    if (!isNaN(value)) this._momentum = value;
  }
  get momentum() {
    return this._momentum || null;
  }

  set gravity(value) {
    if (!isNaN(value)) this._gravity = value;
  }
  get gravity() {
    return this._gravity || null;
  }

  set friction(value) {
    if (!isNaN(value)) this._friction = value;
  }
  get friction() {
    return this._friction || null;
  }

  set numParticles(value) {
    if (!isNaN(value)) this._numParticles = value;
  }
  get numParticles() {
    return this._numParticles || 20;
  }

  set scaleInitial(value) {
    if (!isNaN(value)) this._scaleInitial = value;
  }
  get scaleInitial() {
    return this._scaleInitial || null;
  }

  set scaleFactor(value) {
    if (!isNaN(value)) this._scaleFactor = value;
  }
  get scaleFactor() {
    return this._scaleFactor || null;
  }

  set removeAt(value) {
    if (!isNaN(value)) this._removeAt = value;
  }
  get removeAt() {
    return this._removeAt || null;
  }

  set additionalClasses(value) {
    if (typeof value == "string") this._additionalClasses = value;
  }
  get additionalClasses() {
    return this._additionalClasses || "";
  }

  set respondToResize(value) {
    this._respondToResize = value === true;
  }
  get respondToResize() {
    return this._respondToResize !== false;
  }

  set eventName(value) {
    if (typeof value === "string") this._eventName = value;
  }
  get eventName() {
    return this._eventName || "barf_stars";
  }
}

export { BarfyStars as default, Particle, ACTIONS };
