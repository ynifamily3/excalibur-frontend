import React from "react";

export default function MiniPeople({
  color = "#E4E4E4",
  width = "14",
  height = "14",
}: {
  color?: string;
  width?: string;
  height?: string;
}): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
        fill={color}
      />
    </svg>
  );
}
