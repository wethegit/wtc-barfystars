# wtc-barfystars

Turn any element into a particle system fountain.  
[Demo](https://codepen.io/team/wtc/pen/YzpmzRz)

## Usage

```sh
npm i wtc-barfystars
```

```html
<button id="unicorns" data-config='{ "numUniqueParticles": 3 }'>
  Hover me 🦄
</button>
```

```jsx
import "wtc-barfystars/style.css";
import BarfyStars from "wtc-barfystars";

const barfUnicorns = new BarfyStars(document.getElementById("unicorns"));
```

Customize it as you want:

```scss
#unicorns {
  .barfystars-particle::after {
    content: "🦄";
    font-size: 30px;
  }
  .barfystars-particle--2::after {
    content: "⭐️";
    font-size: 20px;
  }
  .barfystars-particle--3::after {
    content: "☄️";
    font-size: 25px;
  }
}
```

## React

```tsx
import { useRef, useState } from "react";
import { BarfyStars } from "wtc-barfystars/react";
import "wtc-barfystars/style.css";

function Celebration() {
  const [enabled, setEnabled] = useState(true);
  const button = useRef<HTMLButtonElement>(null);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.currentTarget.checked)}
        />
        Enable particles
      </label>
      <BarfyStars
        as="button"
        type="button"
        ref={button}
        className="celebration"
        options={{ action: "click", numParticles: 30 }}
        enabled={enabled}
      >
        Celebrate
      </BarfyStars>
    </>
  );
}
```

`as` defaults to `"div"` and infers the HTML props, event types and ref type.
Choose an HTML element that can contain children (not a void element such as
`input` or `img`). Use normal props, `className`, `style` and children to customize
the target. For example:

```css
.celebration .barfystars-particle::after {
  content: "⭐";
  font-size: 24px;
}
```

For custom markup or imperative triggers, attach both refs from the hook:

```tsx
import { useBarfyStars } from "wtc-barfystars/react";

function CustomCelebration() {
  const { ref, containerRef, barf } = useBarfyStars<HTMLButtonElement>({
    action: false,
  });

  return (
    <div style={{ position: "relative" }}>
      <button ref={ref} onClick={barf}>Celebrate</button>
      <span
        ref={containerRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
```

The hook leaves placement and positioning of the particle layer to you. Its second
argument is the same enabled flag, defaulting to `true`. `barf` is stable and safely
does nothing while disabled or before mounting. Keep React-managed children outside
the particle layer.

## Options

Properties can be provided to the controller through the `data-config` attribute on the HTML element, this attribute must be **JSON** formatted, alternatively you can pass an object to the class instance as a second parameter.

Properies can be as follows:

**action** | String || Boolean | default: `'hover'`  
The action that triggers the barfy stars.  
Can be one of:

- **hover** Triggers the action on hover (default)
- **click** Triggers the action on click
- **callback** Triggers the action on callback
- **false** Events are turned off

You can find examples of all `action` options on the [demo](https://codepen.io/team/wtc/pen/YzpmzRz).

**momentum** | Float | default: `null`  
The initial momentum for the particles.

**gravity** | Float | default: `null`  
The gravity to apply to the particles.

**friction** | Float | default: `null`  
The friction to apply to the particles' momentum.

**numParticles** | Integer | default: `20`  
The number of particles to spawn.

**numUniqueParticles** | Integer | default: `5`

**scaleInitial** | Float | default: `null`  
The initial scale of the particles

**scaleFactor** | Float | default: `null`  
A multiplier used to reduce the scale of the particles over time.

**removeAt** | Float | default: `null`  
The point, in scale, at which the particles need to be removed.

**additionalClasses** | String | default: `''`  
Additional classes to be provided to the containing element.

**respondToResize** | Boolean | default: `true`  
Whether the element should respond to resize events. This should happen when the positioning of the anchor also changes in response to resize

**eventName** | String | default: `'barf_stars'`  
This indicates the event to custom listen to on the window that causes the stars to barf if the controller is set to `action:callback`

**particleContainer** | HTMLElement | default: the target element

Provide a separate particle container to avoid the legacy wrapper and style
copying. Position the container yourself. The React component and hook manage this
option internally.

## Cleanup

Call `barfUnicorns.destroy()` when a vanilla emitter is no longer needed. This
removes its event listeners and particles, cancels its animation and pending style
updates, and restores the original DOM placement and inline styles when using the
legacy wrapper. Calling `destroy()` more than once is safe.
