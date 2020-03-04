import React, { useState } from 'react';
import { useTrail, animated } from 'react-spring';

const items = [0.5, 0.3, 0.2, 0.7, 1];

const Boxes = () => {
  const [on ,toggle] = useState(false);
  const springs = useTrail(5, {
    opacity: on ? 0: 1,
    transform: on ? 'scale(.3)' : 'scale(1)'
  });
  return (
    <div className="boxes-grid">
      <button onClick={() => toggle(!on)}>toggle trail</button>
      {springs.map((animation, idx) => (
        <animated.div key={idx} className="box" style={animation} />
      ))}
    </div>
  );
};

export default Boxes;
