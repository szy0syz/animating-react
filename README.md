# animating-react

## Ch-01

- `useSpring` 终究返回的还是一个 `Object`
- 这个对象使用在组件的 `style` 属实上，但必须 `animated.div`包裹起来才能识别

```js
import { useSpring, animated } from 'react-spring';

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

return <animated.div style={fade}></animated.div>;
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
</animated.h1>;
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

## Ch-05 Nav

> 菜单打开动效，记得`Nav` 组件内部用 `animated` 包一下。

```js
const navAnimation = useSpring({
  transform: isNavOpen ? `translate3d(0,0,0) scale(1)` : `translate3d(100%,0,0) scale(0.6)`,
});

<Nav style={navAnimation} />;
```

![03](./preview/spring003.gif)

## Ch-06 Checkout

- 注意两处有 `tricks`
  - 第一处：`Checkout` 是 `fixed`布局，在视窗最上方且有绝对权重，导致在它下面的`按钮`点击事件没有效果，则需要单独处理 `pointerEvents: isOpen ? 'all' : 'none';`
  - 第二处：transform: x.interpolate(x => `translate3d(${-1 * x}%,0,0)`) 还是数值运动处理，使用 `interpolate`，和反向运动使用 `-1`

```js
const Checkout = ({ isOpen }) => {
  const { x } = useSpring({
    x: isOpen ? 0 : 100,
  });

  return (
    <div
      className="checkout"
      style={{
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      <animated.div
        style={{ transform: x.interpolate(x => `translate3d(${-1 * x}%,0,0)`) }}
        className="checkout-left"
      ></animated.div>
      <animated.div
        style={{ transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}
        className="checkout-right"
      ></animated.div>
    </div>
  );
};
```

![04](./preview/spring004.gif)

## Ch-07 Emulating Keyframes

> 模拟帧动画用 interpolate 的链式操作

```js
// ❎ y: isToggle ? -50 : 0,
// -> ✅ y: isToggle ? 0 : 1,

// 这里的 `interpolate` 是链式操作，对原先的值进行迭代

<animated.h1
  style={{
    color,
    opacity,
    transform: y
      .interpolate({
        range: [0, 0.25, 0.5, 0.75, 1],
        output: [0, -25, -50, -100, -50],
      })
      .interpolate(y => `translate3d(0,${y}px,0)`),
  }}
>
  Hello
</animated.h1>
```

![05](./preview/spring005.gif)

## Ch-08 Transition with mounting

![06](./preview/spring006.gif)

```js
const transtion = useTransition(isToggled, null, {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
});
// 感觉真不好用
return {transtion.map(({item, key, props}) => item && <animated.h1 key={key} style={props}>Hello</animated.h1>)}
```

## Ch-09 Transition with multiple

> 感觉 transition 用于批量元素的动画

![07](./preview/spring007.gif)

```js
{transtion.map(
  ({ item, key, props }) =>
    item && (
      <animated.h1 key={key} style={props}>
        {item.letter}
      </animated.h1>
    )
)}
```

## Ch-10 Trasition with router

![08](./preview/spring008.gif)

## Ch-11 Trasition with modal

![09](./preview/spring009.gif)

- 小技巧：`const pointerEvents = on ? 'all' : 'none';` 不要遮挡 Menu 的点击事件
- 原来 `style` 的样式 `pointerEvents`，可以传递下去，真巧妙 `style={{ pointerEvents }}`
- 设计大原来没有后来有的问题，统统用 `useTransition`，相当于 `mounting` 和 `unmounting`
- modal-card 有个从上往下掉的效果 `translate3d(0, -50px, 0)`

```css
.modal {
  position: fixed;
  width: 100%;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

```js
const Modal = ({ closeModal, animation, pointerEvents }) => {
  return (
    <div className="modal" style={{ pointerEvents }}>
      <animated.div className="modal-card" style={animation}>
        <button onClick={closeModal}>Close</button>
        <h1>Modal</h1>
      </animated.div>
    </div>
  );
};

const ModalWrapper = () => {
  const [on, toggle] = useState(false);
  const transition = useTransition(on, null, {
    from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -50px, 0)' }
  });

  const pointerEvents = on ? 'all' : 'none';

  return (
    <div>
      {transition.map(
        ({ item, key, props: animation }) =>
          item && (
            <Modal
              pointerEvents={pointerEvents}
              animation={animation}
              closeModal={() => toggle(false)}
            />
          )
      )}
      <button onClick={() => toggle(!on)}>Open</button>
    </div>
  );
};
```
