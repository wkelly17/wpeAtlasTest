import { Transition, CSSTransition } from 'react-transition-group';
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SwitchTransition } from 'react-transition-group';
import { Box } from '../components';

const PageTransitions = ({
  children,
  route,
  routingPageOffset,
  inProp,
  setInProp,
  ...restProps
}) => {
  const [transition, setTransition] = useState(true);
  const divRef = useRef();

  const handleExit = (routingPageOffset, route) => {
    console.log('handlingExit');
    // setTransition(false);
    gsap
      .timeline()
      .set(divRef.current, {
        y: -routingPageOffset,
      })
      .to(divRef.current, {
        scale: 0.9,
        duration: 0.25,
      })
      .to(divRef.current, {
        opacity: 0,
        duration: 0.25,
      });
  };

  const getEnterTL = () => {
    const q = gsap.utils.selector(divRef.current);
    if (!divRef.current) {
      return;
    }
    let tl = gsap
      .timeline({ paused: true })
      .from(divRef.current, {
        opacity: 0,
        duration: 0.25,
      })
      .from(
        divRef.current,
        {
          scale: 0.9,
          duration: 0.25,
        },
        '<'
      )
      .from(
        q('h1'),
        {
          autoAlpha: 0,
          xPercent: 10,
        },
        '<'
      );
    return tl;
  };

  const handleEnter = () => {
    console.log('handlingEnter');
    getEnterTL().play();
  };

  return (
    <div className={transition && 'transitioning'}>
      <Transition
        // mountOnEnter={true}
        in={inProp}
        key={route}
        onEnter={handleEnter}
        onExit={() => handleExit(routingPageOffset, route)}
        // timeout={() => {
        //   let tl = getEnterTL();
        //   if (tl) {
        //     return tl.duration();
        //   } else {
        //     return null;
        //   }
        // }}
        timeout={10}
        // onEntered={}
      >
        <Box as={'div'} ref={divRef} id="transitionBox">
          {children}
          {/* {React.cloneElement(children[0], { client, pageProps })} */}
        </Box>
      </Transition>
    </div>
  );
};

export default PageTransitions;
