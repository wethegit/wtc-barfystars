# wtc-barfystars

Turn any element into a particle system fountain.

## usage

### Javascript

```js
import BarfyStars from "https://cdn.skypack.dev/wtc-barfystars";

const barfUnicorns = new BarfyStars(document.getElementById("unicorns"));
```

### HTML

```html
<button
  id="unicorns"
  data-config='{ "respondToResize": "false", "additionalClasses": "platform-link" }'
>
  Click me 🦄
</button>
```

Properties can be provided to the controller through the `data-config` attribute. This attribute must be JSON formatted and properies can be as follows:

- **action** default: hover
  The action that triggers the barfy stars.
  Can be one of:
  - **hover** Triggers the action on hover (default)
  - **click** Triggers the action on click
  - **callback** Triggers the action on callback (requires `eventName`)
- **momentum** default: null
  The initial momentum for the particles.
- **gravity** default: null
  The gravity to apply to the particles.
- **friction** default: null
  The friction to apply to the particles' momentum.
- **numParticles** default: 20
  The number of particles to spawn.
- **numUniqueParticles** default: 5
- **scaleInitial** default: null
  The initial scale of the particles
- **scaleFactor** default: null
  A multiplier used to reduce the scale of the particles over time.
- **removeAt** default: null
  The point, in scale, at which the particles need to be removed.
- **additionalClasses** default: ''
  Additional classes to be provided to the containing element.
- **respondToResize** default: true
  Whether the element should respond to resize events. This should happen when the positioning of the anchor also changes in response to resize
- **eventName** default: 'barf_stars'
  This indicates the event to custom listen to on the window that causes the stars to barf if the controller is set to `action:callback`

### CSS

Add the default css:

```html
<link
  href="https://cdn.skypack.dev/wtc-barfystars/dist/wtc-barfystars.css"
  rel="stylesheet"
/>
```

Customize it as you want:

```css
.barfystars-particle::after {
  content: "🦄";
  font-size: 20px;
}
.barfystars-particle--2::after {
  content: "⭐️";
  font-size: 10px;
}
.barfystars-particle--3::after {
  font-size: 15px;
}
.barfystars-particle--4::after {
  font-size: 30px;
}
.barfystars-particle--5::after {
  font-size: 8px;
}
```

## TO DO

- Implement click and callback actions
- Implement deferred elements to contain the barfy stars
- Add some more helful detail to this readme
