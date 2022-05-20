import { forwardRef } from 'react';
function Box({ children, as = 'div', ...props }, ref) {
  const Component = as;

  return (
    <Component {...props} ref={ref}>
      {children}
    </Component>
  );
}

export default forwardRef(Box);

// take a component
// Take animation parameters
// useIso LayoutEffect based on Parameters
//Return Component
