import React, { PropsWithChildren } from "react";

export default function Loading(
  props: PropsWithChildren<React.ReactNode>
): JSX.Element {
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
        {props.children}
      </div>
    </div>
  );
}
