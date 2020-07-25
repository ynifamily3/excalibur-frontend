import React, { Suspense } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export const FallBackComponent = () => {
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
      <div style={{ width: "100%" }}>
        <LinearProgress />
      </div>
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

export default function WaitingComponent<P extends object>(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  return (props: P): JSX.Element => (
    <Suspense fallback={<FallBackComponent />}>
      <Component {...props} />
    </Suspense>
  );
}
