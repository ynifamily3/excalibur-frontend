import React, { Suspense } from "react";
import Loading from "components/atoms/Loading";

export const FallBackComponent = (): JSX.Element => {
  return <Loading>UI 로딩 중...</Loading>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default function WaitingComponent<P extends object>(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  // eslint-disable-next-line react/display-name
  return (props: P): JSX.Element => (
    <Suspense fallback={<FallBackComponent />}>
      <Component {...props} />
    </Suspense>
  );
}
