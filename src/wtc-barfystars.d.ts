export interface BarfyStarsOptions {
  action?: "hover" | "click" | "callback" | false;
  momentum?: number;
  gravity?: number;
  friction?: number;
  numParticles?: number;
  numUniqueParticles?: number;
  scaleInitial?: number;
  scaleFactor?: number;
  removeAt?: number;
  additionalClasses?: string;
  respondToResize?: boolean;
  eventName?: string;
  /** Render particles here without wrapping or modifying the target's styles. */
  particleContainer?: HTMLElement;
}

export const ACTIONS: Readonly<{ HOVER: 0; CLICK: 1; CALLBACK: 2 }>;

export class Particle {
  constructor(emitter: BarfyStars);
  element: HTMLSpanElement;
  emitter: BarfyStars;
  run(): void;
}

export default class BarfyStars {
  constructor(element: HTMLElement, options?: BarfyStarsOptions);
  element: HTMLElement;
  particleContainer: HTMLElement;
  working: boolean;
  running: boolean;
  configured: boolean;
  readonly particles: Particle[];
  barf(): void;
  addParticles(): void;
  addParticle(): void;
  removeParticle(particle: Particle): void;
  destroy(): void;
}
