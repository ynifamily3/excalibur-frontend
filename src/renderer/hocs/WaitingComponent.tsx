import React, { Suspense } from "react";

export const FallBackComponent = (): JSX.Element => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2em",
        }}
      >
        로딩 중...
      </div>
    </div>
  );
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
