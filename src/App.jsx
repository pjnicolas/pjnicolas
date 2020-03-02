import React, { useState, useRef, useEffect } from 'react';
import Particles from 'react-particles-js';
import { useSpring, useChain, animated } from 'react-spring';

import particlesConfig from './particlesjs.json';

import GithubMark from './assets/GitHub-Mark-Light-64px.png';
import LinkedIn from './assets/LinkedIn-Light.png';

import './App.scss';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const useResponsive = (desktop, tablet, phone) => {
  const windowSize = useWindowSize();

  const DESKTOP_WIDTH = 1024;
  const TABLET_WIDTH = 768;
  // const PHONE_WIDTH = 68;

  if (windowSize.width < TABLET_WIDTH) return phone;
  if (windowSize.width <= DESKTOP_WIDTH) return tablet;
  return desktop;
};

const App = () => {
  const [open, setOpen] = useState(null);

  let closedButtonWidth = useResponsive('20vw', '40vw', '65vw');
  let aboutHeight = useResponsive('65vw', '70vw', '75vw');

  const aboutAnimationFirstRef = useRef();
  const aboutAnimationFirst = useSpring({
    width: open ? '100vw' : closedButtonWidth,
    borderRadius: open ? '0' : '5vh',
    ref: aboutAnimationFirstRef,
    config: {
      duration: 100,
    },
  });

  const aboutAnimationSecondRef = useRef();
  const aboutAnimationSecond = useSpring({
    height: open ? aboutHeight : '10vh',
    marginBottom: open ? '0' : '40vh',
    ref: aboutAnimationSecondRef,
  });

  const aboutContentAnimationRef = useRef();
  const aboutContentAnimation = useSpring({
    opacity: open ? 1 : 0,
    ref: aboutContentAnimationRef,
    config: {
      duration: 300,
    },
  });

  useChain(open
    ? [aboutAnimationFirstRef, aboutAnimationSecondRef, aboutContentAnimationRef]
    : [aboutContentAnimationRef, aboutAnimationSecondRef, aboutAnimationFirstRef]
  );
  // , open ? null : [0, 0.4]);

  const aboutAnimation = {
    ...aboutAnimationFirst,
    ...aboutAnimationSecond,
  };

  return (
    <div>
      <div className="Home">
        <div className="Home__info">
          <div className="Home__name">
            PEDRO JAVIER NICOLÁS ZAMORA
        </div>
          <div className="Home__job">
            Software developer
          </div>
        </div>
        <animated.div
          className={`About ${open && 'About--open'} ${open === false && 'About--close'}`}
          style={aboutAnimation}
        >
          <button
            type="button"
            className={`About__button ${open && 'About__button--open'} ${open === false && 'About__button--close'}`}
            onClick={() => setOpen(o => !o)}
          >
            About me
        </button>

          <animated.div
            className="About__content"
            style={aboutContentAnimation}
          >
            <div className="About__text">
              <p>
                Hi! I'm a spanish developer interested in full stack web development.
              </p>

              <p>
                I love <span className="About__tech">Linux</span>, <span className="About__tech">JavaScript</span> and <span className="About__tech">React.js</span>. I also like Node.js, Redux, Java, C, Firebase, Git, Bash... among many others.
              </p>

              <p>
                I'm currently working as a co-founder/developer in a startup called Gloam in Murcia, Spain.
              </p>
            </div>

            <div className="About__footer">
              <div className="About__contact">
                <div>
                  (+34) 626 77 92 41
                </div>

                <div>
                  pedrojavier.nz@gmail.com
                </div>
              </div>

              <div className="About__social-area">
                <a className="About__social" href="https://github.com/dizzyrobin" target="_blank">
                  <img className="About__social-img" src={GithubMark} />
                  <div className="About__social-description">GitHub</div>
                </a>
                <a className="About__social" href="https://www.linkedin.com/in/pjnicolas/" target="_blank">
                  <img className="About__social-img" src={LinkedIn} />
                  <div className="About__social-description">LinkedIn</div>
                </a>
              </div>
            </div>
          </animated.div>
        </animated.div>
      </div>
      <div className={`Particles__wrapper ${open && 'Particles__wrapper--blur'}`}>
        <Particles
          params={particlesConfig}
          width="100vw"
          height="100vh"
          className="Particles"
          canvasClassName="Particles__canvas"
        />
      </div>
    </div>
  );
};

export default App;
