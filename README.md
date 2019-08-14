# wtc-barfystars
This is a controller intended to be used with [wtc-controller-execute](https://github.com/wethegit/wtc-controller-execute) to provide a particle system fountain effect to anchors.

## usage
### Javascript
```
import {ExecuteControllers} from 'wtc-controller-element';
import { BarfyStars, Particle, ACTIONS } from 'wtc-barfystars';

// Instanciate all controllers
ExecuteControllers.instanciateAll();
```

### HTML
```
<a href="#" data-controller="BarfyStars", data-config='{ "respondToResize": "false", "additionalClasses": "platform-link" }'>Text link</a>
```

Properties can be provided to the controller through the data-config attribute. This attribute must be JSON formatted and properies can be as follows:
- **action** default: hover
  The action that triggers the barfy stars.
  Can be one of:
  - **hover** Triggers the action on hover (default)
  - **click** Triggers the action on click (TBI)
  - **callback** Triggers the action on callback (TBI)
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
```
.BSParticle {
  display: block;
  height: 1px;
  left: 50%;
  position: absolute;
  pointer-events: none;
  top: 50%;
  width: 1px;
  z-index: 3;

  &::after {
    background: image-url('star-single.png');
    background-size: 100% 100%;
    content: '';
    display: block;
    height: 102px;
    position: absolute;
    transform: translate(-51px, -51px);
    width: 102px;
  }
}
.BSParticle--2::after {
  background: image-url('star-single-blue.png');
}
.BSParticle--3::after {
  background: image-url('star-single-green.png');
}
.BSParticle--4::after {
  background: image-url('star-single-pink.png');
}
.BSParticle--5::after {
  background: image-url('star-single-yellow.png');
}
```

## TO DO
- Implement click and callback actions
- Implement deferred elements to contain the barfy stars
- Add some more helful detail to this readme