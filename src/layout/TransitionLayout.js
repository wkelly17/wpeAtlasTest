import { gsap } from 'gsap';
import { TransitionContext } from 'context/TransitionContext';
import { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useIsomorphicLayoutEffect, useSessionStorage } from 'react-use';
import { useRouter } from 'next/router';

// Next, we have TransitionLayout which will be our controller that will initiate the outro animations and update the page when they are all complete.
export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);

  const router = useRouter();

  const [prevPath, setPrevPath] = useSessionStorage('prevPath', null);
  const [currentPath, setCurrentPath] = useSessionStorage(
    'currentPath',
    router.asPath
  );
  router?.events?.on('routeChangeStart', () => {
    setPath('start');
  });
  router?.events?.on('routeChangeComplete', () => {
    setPath();
  });

  const setPath = useCallback((which) => {
    if (which == 'start') {
      setPrevPath(router.asPath);
    } else {
      setCurrentPath(router.asPath);
    }
  }, []);

  // router.route = folder structure with brackets; e.g /[...pageUri]

  const { pageTransitions } = useContext(TransitionContext);

  const el = useRef();
  const exitPage = pageTransitions?.find((transObj) => {
    return transObj.page == prevPath;
  });
  let exitTransition = findExitTransition(exitPage);

  function findExitTransition(exitPage) {
    if (!exitPage) return undefined;
    let exitTl;
    exitTl = exitPage?.transitions?.find(
      (transition) => transition.path == currentPath
    );
    if (!exitTl) {
      exitTl = exitPage.exitDefault;
    }
    if (!exitTl) {
      return undefined;
    } else {
      return exitTl;
    }
  }

  //
  useIsomorphicLayoutEffect(() => {
    if (children !== displayChildren) {
      if (true) {
        // if (!exitTransition) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children);
      } else {
        console.log(exitTransition);
        exitTransition.play().then(() => {
          // outro complete so reset to an empty paused timeline
          exitTransition.seek(0).pause().clear();
          setDisplayChildren(children);
          exitTransition = undefined;
        });
      }
    }
  }, [children]);

  // useIsomorphicLayoutEffect(() => {
  //   gsap.to(el.current, {
  //     background,
  //     duration: 1,
  //   });
  // }, [background]);
  // UPDATE THE CHILDREN SHOWN.   ROUTING IS DONE IMMEDIATELY, BUT THE CHILD IS NOT MOUNTED UNTIL SET STATE IS FINISHED;
  return <div ref={el}>{displayChildren}</div>;
}
