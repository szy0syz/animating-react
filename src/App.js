import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import logo from './logo.svg';
import './App.css';
// import Nav from './components/Nav';
// import Toggle from './components/Toggle';
import Modal from './components/Modal';
import Accordion from './components/Accordion';
import Checkout from './components/Checkout';

const App = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const navAnimation = useSpring({
    transform: isNavOpen ? `translate3d(0,0,0) scale(1)` : `translate3d(100%,0,0) scale(0.6)`,
  });
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <animated.div className="App" style={fade}>
      <header className="App-header">
        <img src={logo} className="logo" />
        <button className="menu-button" onClick={() => setNavOpen(!isNavOpen)}>
          Menu
        </button>
        {/* <Nav style={navAnimation} /> */}
      </header>
      <main>
        {/* <Toggle />*/}
        {/* <Routes /> */}
        <Modal />
        <Accordion />
      </main>

      <Checkout isOpen={isNavOpen} />
    </animated.div>
  );
};

export default App;
