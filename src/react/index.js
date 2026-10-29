"use client";

import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Emitter from "../wtc-barfystars.js";

export function useBarfyStars(options = {}, enabled = true) {
  const [element, ref] = useState(null);
  const [container, containerRef] = useState(null);
  const instance = useRef(null);
  const {
    action, momentum, gravity, friction, numParticles, numUniqueParticles,
    scaleInitial, scaleFactor, removeAt, additionalClasses, respondToResize,
    eventName,
  } = options;

  useEffect(() => {
    if (!element || !container || !enabled) return;
    const emitter = new Emitter(element, {
      action, momentum, gravity, friction, numParticles, numUniqueParticles,
      scaleInitial, scaleFactor, removeAt, additionalClasses, respondToResize,
      eventName, particleContainer: container,
    });
    instance.current = emitter;
    return () => {
      emitter.destroy();
      instance.current = null;
    };
  }, [
    element, container, enabled, action, momentum, gravity, friction,
    numParticles, numUniqueParticles, scaleInitial, scaleFactor, removeAt,
    additionalClasses, respondToResize, eventName,
  ]);

  const barf = useCallback(() => instance.current?.barf(), []);
  return { ref, containerRef, barf, element };
}

export const BarfyStars = forwardRef(function BarfyStars(
  { as: Component = "div", options, enabled = true, children, style, ...props },
  forwardedRef
) {
  const { ref, containerRef } = useBarfyStars(options, enabled);
  const targetRef = useCallback((node) => {
    ref(node);
    const cleanup = typeof forwardedRef === "function" ? forwardedRef(node) : undefined;
    if (forwardedRef && typeof forwardedRef !== "function") forwardedRef.current = node;
    return () => {
      ref(null);
      if (typeof cleanup === "function") cleanup();
      else if (typeof forwardedRef === "function") forwardedRef(null);
      else if (forwardedRef) forwardedRef.current = null;
    };
  }, [ref, forwardedRef]);

  return createElement(
    Component,
    {
      ...props,
      ref: targetRef,
      style: {
        ...style,
        position: !style?.position || style.position === "static" ? "relative" : style.position,
      },
    },
    children,
    createElement("span", {
      ref: containerRef,
      "aria-hidden": true,
      className: ["barfystars", options?.additionalClasses].filter(Boolean).join(" "),
      style: { position: "absolute", inset: 0, pointerEvents: "none" },
    })
  );
});

export default BarfyStars;
