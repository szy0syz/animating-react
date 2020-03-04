import React, { useState } from 'react';
import useMeasure from '../hooks/useMeasure';
import { useSpring, animated } from 'react-spring';

const Accordion = () => {
  const [on, toggle] = useState(false);
  // const [bind, measure] = useMeasure();
  // console.dir(bind)
  // console.dir(measure);
  const [bind, { height, top }] = useMeasure();
  const animation = useSpring({
    overflow: 'hidden',
    // + wrapper的padding
    height: on ? height + top * 2 : 0,
  });


  return (
    <div>
      <h1 onClick={() => toggle(!on)}>Toggle</h1>
      <animated.div style={animation}>
        <div {...bind} className="accordion">
          <p>Hello, i'm in the accordion</p>
        </div>
      </animated.div>
    </div>
  );
};

export default Accordion;
