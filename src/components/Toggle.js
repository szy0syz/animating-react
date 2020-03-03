import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

const Toggle = () => {
  const [items, setItems] = useState([
    {
      letter: 'J',
      key: 1,
    },
    {
      letter: 'e',
      key: 2,
    },
    {
      letter: 'r',
      key: 3,
    },
    {
      letter: 'r',
      key: 4,
    },
    {
      letter: 'y',
      key: 5,
    },
  ]);
  const transtion = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div>
      {transtion.map(
        ({ item, key, props }) =>
          item && (
            <animated.h1 key={key} style={props}>
              {item.letter}
            </animated.h1>
          )
      )}
      <button
        onClick={() =>
          setItems([
            { letter: 'S', key: 1 },
            { letter: 'h', key: 2 },
            { letter: 'i', key: 3 },
          ])
        }
      >
        Button
      </button>
    </div>
  );
};

export default Toggle;

/*
const Toggle = () => {
  const [isToggled, setToggled] = useState(false);
  const transtion = useTransition(isToggled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div>
      {transtion.map(({item, key, props}) => item && <animated.h1 key={key} style={props}>Hello</animated.h1>)}
      <button onClick={() => setToggled(!isToggled)}>Button</button>
    </div>
  );
};
*/
