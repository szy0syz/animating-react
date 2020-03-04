import React from 'react';
import { useGesture } from 'react-with-gesture';
import { animated, useSpring } from 'react-spring';

const Gesture = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  // 这里down表示鼠标按键是否按下ing
  // 这里delta是个偏移量，表示光标下落点的坐标相对xy轴偏移了多少，是个[0,0] 的数组
  const bind = useGesture(({ down, delta }) => {
    // 按着鼠标没，按着就设偏移量
    set({ xy: down ? delta : [0, 0] });
  });
  return (
    <animated.div
      style={{
        transform: xy.interpolate((x,y) => `translate3d(${x}px, ${y}px, 0)`),
      }}
      {...bind()}
      className="box"
    />
  );
};

export default Gesture;
