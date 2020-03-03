import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Toggle = () => {
  const [isToggle, setToggle] = useState(false);
  const { y, color, opacity } = useSpring({
    // y: isToggle ? -50 : 0,
    y: isToggle ? 0 : 1,
    color: isToggle ? 'tomato' : 'green',
  });

  return (
    <div>
      <animated.h1
        style={{
          color,
          opacity,
          transform: y.interpolate({
            range: [0, .25, .5, .75, 1],
            output: [0, -25, -50, -100, -50]
          }).interpolate(y => `translate3d(0,${y}px,0)`),
        }}
      >
        Hello
      </animated.h1>
      <button onClick={() => setToggle(!isToggle)}>Button</button>
    </div>
  );
};

export default Toggle;
