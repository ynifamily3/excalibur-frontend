import React from "react";

export default function RightArrow({
  fill = "#E4E4E4",
}: {
  fill?: string;
}): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L5.76625 1.23375L10.6488 6.125H0V7.875H10.6488L5.76625 12.7663L7 14L14 7L7 0Z"
        fill={fill}
      />
    </svg>
  );
}
