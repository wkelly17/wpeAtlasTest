import React, { useState, createContext, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/router';
import produce from 'immer';

const TransitionContext = createContext({});

const TransitionProvider = ({ children }) => {
  // const [timeline, setTimeline] = useState(() =>
  //   gsap.timeline({ paused: true })
  // );
  const [pageTransitions, setPageTransitions] = useState([
    {
      page: '/',
      enterDefault: gsap.timeline({ paused: true }),
      exitDefault: gsap.timeline({ paused: true }),
      transitions: [
        {
          path: '/about',
          enterTl: gsap.timeline(),
          exitTl: gsap.timeline(),
        },
        { path: '/blog', enterTl: gsap.timeline(), exitTl: gsap.timeline() },
      ],
    },
  ]);

  const updatePageTransitionEnter = useCallback(
    (page, enterFrom, newTimelineFxn, newTimelineFxnPos) => {
      setPageTransitions(
        produce((draft) => {
          const pickedPage = draft.find((Pt) => Pt.page === page);
          let pickedTrans;
          let pickedRoute;
          if (enterFrom == 'default' || !enterFrom) {
            pickedTrans = pickedPage.enterDefault;
          } else {
            pickedRoute = pickedPage.find((anim) => anim.path == enterFrom);
            pickedTrans = pickedRoute.enterTl;
          }
          pickedTrans.add(newTimelineFxn, newTimelineFxnPos);
          pickedTrans.name = `${pickedPage.page} - ${
            enterFrom == 'default' ? 'defaultEnter' : pickedRoute.path
          }`;
          // console.log(pickedTrans.name);
        })
      );
    },
    []
  );
  const updatePageTransitionExit = useCallback(
    (page, nextPage, newTimelineFxn, newTimelineFxnPos) => {
      setPageTransitions(
        produce((draft) => {
          const pickedPage = draft.find((Pt) => Pt.page === page);
          let pickedTrans;
          let pickedRoute;
          if (nextPage == 'default' || !nextPage) {
            pickedTrans = pickedPage.exitDefault;
          } else {
            let pickedSpecial = pickedPage.find(
              (anim) => anim.path == nextPage
            );
            pickedTrans = pickedSpecial.exitTl;
          }
          pickedTrans.add(newTimelineFxn, newTimelineFxnPos);
          pickedTrans.name = `${pickedPage.page} - ${
            nextPage == 'default' ? 'defaultExit' : pickedRoute.path
          }`;
          // console.log(pickedTrans.name);
        })
      );
    },
    []
  );

  return (
    <TransitionContext.Provider
      value={{
        timeline,
        setTimeline,
        pageTransitions,
        updatePageTransitionEnter,
        updatePageTransitionExit,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
