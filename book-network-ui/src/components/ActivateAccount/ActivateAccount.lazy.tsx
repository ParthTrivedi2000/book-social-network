import React, { lazy, Suspense } from 'react';

const LazyActivateAccount = lazy(() => import('./ActivateAccount'));

const ActivateAccount = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyActivateAccount {...props} />
  </Suspense>
);

export default ActivateAccount;
