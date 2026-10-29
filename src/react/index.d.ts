import type {
  ComponentPropsWithRef,
  JSX,
  ReactElement,
  RefCallback,
} from "react";
import type { BarfyStarsOptions as EmitterOptions } from "../wtc-barfystars.js";

export type BarfyStarsOptions = Omit<EmitterOptions, "particleContainer">;
export type BarfyStarsTag = Exclude<
  keyof HTMLElementTagNameMap & keyof JSX.IntrinsicElements,
  "area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input" |
  "link" | "meta" | "param" | "source" | "track" | "wbr"
>;

export type BarfyStarsProps<T extends BarfyStarsTag = "div"> = {
  as?: T;
  options?: BarfyStarsOptions;
  enabled?: boolean;
} & Omit<ComponentPropsWithRef<NoInfer<T>>, "as" | "options" | "enabled">;

export function BarfyStars<T extends BarfyStarsTag = "div">(
  props: BarfyStarsProps<T>
): ReactElement;

export function useBarfyStars<T extends HTMLElement = HTMLElement>(
  options?: BarfyStarsOptions,
  enabled?: boolean
): {
  ref: RefCallback<T>;
  containerRef: RefCallback<HTMLElement>;
  barf: () => void;
  element: T | null;
};

export default BarfyStars;
