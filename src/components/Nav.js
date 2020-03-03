import React from 'react';
import { animated } from 'react-spring'

const Nav = ({style}) => {
  return (
    <animated.div style={style} className="nav-wrapper">
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Store</a>
        <a href="#">Tourials</a>
      </nav>
    </animated.div>
  );
};

export default Nav;
