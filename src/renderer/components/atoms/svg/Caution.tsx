import React from "react";

export default function Caution({
  color = "#e36262",
  width = "18",
  height = "18",
}: {
  color?: string;
  width?: string;
  height?: string;
}): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 15.75H17.25L9 1.5L0.75 15.75ZM9.75 13.5H8.25V12H9.75V13.5ZM9.75 10.5H8.25V7.5H9.75V10.5Z"
        fill={color}
      />
    </svg>
  );
}
