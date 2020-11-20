import React from "react";

const LoadingAnim = ({
  top = "-15px",
  left = "0",
}: {
  top?: string;
  left?: string;
}): JSX.Element => {
  return (
    <div className="lds-ellipsis" style={{ position: "absolute", top, left }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { LoadingAnim };
