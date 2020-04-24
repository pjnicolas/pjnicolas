import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useChain, animated, config } from 'react-spring';

import GithubMark from './assets/GitHub-Mark-Light-64px.png';
import LinkedIn from './assets/LinkedIn-Light.png';
import resumeLinkES from './pedro-javier-nicolas-zamora-ES.pdf'
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


// const useResponsive = (desktop, tablet, phone) => {
//   const windowSize = useWindowSize();

//   const MIN_DESKTOP_WIDTH = 1024;
//   const MIN_TABLET_WIDTH = 768;

//   if (windowSize.width < MIN_TABLET_WIDTH) return phone;
//   if (windowSize.width <= MIN_DESKTOP_WIDTH) return tablet;
//   return desktop;
// };


const App = () => {
  const [open, setOpen] = useState(null);
  const [aboutWidth, setAboutWidth] = useState(null);
  const [aboutHeight, setAboutHeight] = useState(null);
  const aboutRef = useRef();
  const windowSize = useWindowSize();

  useEffect(() => {
    if (aboutRef.current) {
      setAboutWidth(aboutRef.current.offsetWidth);
      setAboutHeight(aboutRef.current.offsetHeight);
    } else {
      setAboutWidth(null);
      setAboutHeight(null);
    }
  }, [aboutRef]);

  let width = 'auto';
  if (aboutWidth) {
    width = open ? `${windowSize.width}px` : `${aboutWidth + 1}px`;
  }

  let height = 'auto';
  if (aboutHeight) {
    height = open ? `${windowSize.height * 0.75}px` : `${aboutHeight}px`;
  }

  const aboutAnimationFirstRef = useRef();
  const aboutAnimationFirst = useSpring({
    width,
    backgroundColor: open ? '#81818130' : '#ffa500',
    borderRadius: open ? '0' : '99px',
    ref: aboutAnimationFirstRef,
    config: config.default,
  });

  const aboutAnimationSecondRef = useRef();
  const aboutAnimationSecond = useSpring({
    height,
    marginBottom: open ? '0' : '40vh',
    ref: aboutAnimationSecondRef,
    config: config.default,
  });

  const aboutContentAnimationFirstRef = useRef();
  const aboutContentAnimationFirst = useSpring({
    display: open ? 'flex' : 'none',
    ref: aboutContentAnimationFirstRef,
    config: {
      duration: 1,
    },
  });

  const aboutContentAnimationSecondRef = useRef();
  const aboutContentAnimationSecond = useSpring({
    opacity: open ? 1 : 0,
    ref: aboutContentAnimationSecondRef,
    config:  config.default,
  });

  useChain(open
    ? [aboutAnimationFirstRef, aboutAnimationSecondRef, aboutContentAnimationFirstRef, aboutContentAnimationSecondRef]
    : [aboutContentAnimationSecondRef, aboutContentAnimationFirstRef, aboutAnimationSecondRef, aboutAnimationFirstRef]
  );

  const aboutAnimation = {
    ...aboutAnimationFirst,
    ...aboutAnimationSecond,
  };

  const aboutContentAnimation = {
    ...aboutContentAnimationFirst,
    ...aboutContentAnimationSecond,
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
          className="About"
          style={aboutAnimation}
          ref={aboutRef}
        >
          <button
            type="button"
            className="About__button"
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
                You can download my resume <a href={resumeLinkES}>here</a> (spanish version).
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
    </div>
  );
};

export default App;
