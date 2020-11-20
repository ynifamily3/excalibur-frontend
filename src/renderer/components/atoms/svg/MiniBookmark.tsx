import React from "react";

export default function MiniBookmark({
  color = "#E4E4E4",
}: {
  color?: string;
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
        d="M11.0833 10.4999L12.25 11.0833V1.74992C12.25 1.10825 11.725 0.583252 11.0833 0.583252H5.24417C4.6025 0.583252 4.08333 1.10825 4.08333 1.74992H9.91667C10.5583 1.74992 11.0833 2.27492 11.0833 2.91659V10.4999ZM8.75 2.91659H2.91667C2.275 2.91659 1.75 3.44159 1.75 4.08325V13.4166L5.83333 11.6666L9.91667 13.4166V4.08325C9.91667 3.44159 9.39167 2.91659 8.75 2.91659Z"
        fill={color}
      />
    </svg>
  );
}
