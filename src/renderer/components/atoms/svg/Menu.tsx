import React from "react";

export default function Menu({
  selected = false,
}: {
  selected?: boolean;
}): JSX.Element {
  return (
    <svg
      width="15"
      height="11"
      viewBox="0 0 15 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.375 10.25H14.625V8.66667H0.375V10.25ZM0.375 6.29167H14.625V4.70833H0.375V6.29167ZM0.375 0.75V2.33333H14.625V0.75H0.375Z"
        fill={selected ? "#F2994A" : "black"}
      />
    </svg>
  );
}
