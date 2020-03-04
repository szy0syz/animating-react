import React from 'react';
import { useGesture } from 'react-with-gesture';
import { animated, useSpring } from 'react-spring';

const Gesture = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  // 这里down表示鼠标按键是否按下ing
  // 这里delta是个偏移量，表示光标下落点的坐标相对xy轴偏移了多少，是个[0,0] 的数组
  const bind = useGesture(({ down, delta }) => {
    // 按着鼠标没，按着就设偏移量
    if (down) {
      set({ x: delta[0] });
    } else {
      if (delta[0] > 400) {
        set({ x: 500 });
      } else if (delta[0] < -400) {
        set({ x: -500 });
      } else {
        set({ x: 0 });
      }
    }
  });
  return (
    <animated.div
      style={{
        opacity: x.interpolate({
          //! 这里是根管道
          map: Math.abs, //* 如果不加左边滑的时候没效果
          range: [0, 400],
          output: [1, 0],
        }),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`),
      }}
      {...bind()}
      className="box"
    />
  );
};

export default Gesture;
