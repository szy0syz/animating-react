# animating-react

## Ch-01

- `useSpring` 终究返回的还是一个 `Object`
- 这个对象使用在组件的 `style` 属实上，但必须 `animated.div`包裹起来才能识别

```js
import { useSpring, animated } from 'react-spring'

const fade = useSpring({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

// Shorter
// const fade0 = useSpring({from: { opacity:0 }, opacity: 1});

console.dir(fade);
// ------------------------
// Object:
//   opacity: AnimatedValue
//   payload: undefined
//   children: []
//   animatedStyles: Set(0) {}
//   value: 1
//   startPosition: 0
//   lastPosition: 1
//   lastVelocity: 0.008723350085529756
//   startTime: 1583214790073
//   lastTime: 1583214790849
//   done: true
//   setValue: ƒ (value, flush)
//   __proto__: Animated
//   __proto__: Object

return (
  <animated.div style={fade}></animated.div>
)
```

## Ch-02

> 简单的按钮控制显现

- 如果不写 `from` 和 `to` 的话，useSpring 有个默认的 `duration` 渐变

```js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Toggle = () => {
  const [isToggle, setToggle] = useState(false);
  const fade = useSpring({
    opacity: isToggle ? 1 : 0,
  });

  return (
    <div>
      <animated.h1 style={fade}>Hello</animated.h1>
      <button onClick={() => setToggle(!isToggle)}>Button</button>
    </div>
  );
};

export default Toggle;
```

## Ch-03

```js
const fade = useSpring({
  // opacity: isToggle ? 1 : 0,
  // fontSize: isToggle ? '2rem' : '5rem',
  transform: isToggle ? 'translate3d(0,0,0)' : 'translate3d(0, -50px, 0)',
  color: isToggle ? 'tomato' : 'green',
});
```

![01](./preview/spring001.gif)
![02](./preview/spring002.gif)

## Ch-04 interpolation

```js
// transform 不起作用，得用 interpolate
// ---- ❌❌ ----
const fade = useSpring({
  y: isToggle ? 0 : -50,
  color: isToggle ? 'tomato' : 'green',
});

<animated.h1
  style={{
    ...fade,
    transform: `translate3d(0,${fade.y},0)`,
  }}
>
  Hello
</animated.h1>
// ---- ❌❌ ----
```

> 和 数值 相关的必须使用 interpolate 动态获取

```js
const Toggle = () => {
  const [isToggle, setToggle] = useState(false);
  const { y, color } = useSpring({
    y: isToggle ? 0 : -50,
    color: isToggle ? 'tomato' : 'green',
  });

  return (
    <div>
      <animated.h1
        style={{
          color,
          transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
        }}
      >
        Hello
      </animated.h1>
      <button onClick={() => setToggle(!isToggle)}>Button</button>
    </div>
  );
};
```

Ch-05 Nav

> 菜单打开动效，记得`Nav` 组件内部用 `animated` 包一下。

```js
const navAnimation = useSpring({
  transform: isNavOpen ? `translate3d(0,0,0) scale(1)` : `translate3d(100%,0,0) scale(0.6)`,
});

<Nav style={navAnimation} />
```
