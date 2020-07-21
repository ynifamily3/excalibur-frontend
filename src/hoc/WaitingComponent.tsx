import React, { Suspense } from "react";

export const FallBackComponent = () => {
  return <div>로딩 중...</div>;
};

export default function WaitingComponent(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  return (props: any) => (
    <Suspense fallback={<FallBackComponent />}>
      <Component {...props} />
    </Suspense>
  );
}
