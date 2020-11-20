import styled from "styled-components";
import theme from "styles/theme";

export const QuizBox = styled.div`
  flex: 1;
  display: flex;
  padding: 18px;
  padding-top: 36px;
  position: relative;
  flex-wrap: wrap;
  padding-bottom: 48px;
  background-color: rgb(248, 249, 249);
  border: 1px solid rgb(238, 239, 241);
  border-radius: 6px;
  font-size: ${theme.size.h5}px;
`;
