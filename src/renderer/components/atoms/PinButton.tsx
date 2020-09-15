import React from "react";
import styled from "styled-components";

const Img = styled.div`
  width: 18px;
  height: 18px;
  background-image: ${({
    isPinned = false,
  }: {
    isPinned?: boolean | undefined;
  }) => {
    if (!isPinned) return "url(assets/push-pin.png)";
    else return "url(assets/push-pin-pinned.png)";
  }};
  background-size: cover;
`;

export default function PinButton({
  isPinned = false,
}: {
  isPinned?: boolean | undefined;
}): JSX.Element {
  return <Img isPinned={isPinned} />;
}
