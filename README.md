# wtc-barfystars

Turn any element into a particle system fountain.

## Usage

### Javascript

```js
import BarfyStars from "https://cdn.skypack.dev/wtc-barfystars";

const barfUnicorns = new BarfyStars(document.getElementById("unicorns"));
```

### HTML

```html
<button id="unicorns" data-config='{ "numUniqueParticles": 3 }'>
  Click me 🦄
</button>
```

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
  font-size: 30px;
}
.barfystars-particle--2::after {
  content: "⭐️";
  font-size: 20px;
}
.barfystars-particle--3::after {
  font-size: 25px;
}
```

## Options

Properties can be provided to the controller through the `data-config` attribute. This attribute must be **JSON** formatted and properies can be as follows:

**action** | String | default: `'hover'`  
The action that triggers the barfy stars.  
Can be one of:

- **hover** Triggers the action on hover (default)
- **click** Triggers the action on click
- **callback** Triggers the action on callback (requires `eventName`)

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
