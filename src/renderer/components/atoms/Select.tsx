/* eslint-disable import/named */
import React, { PropsWithChildren } from "react";
import styled, { StyledComponentProps } from "styled-components";
import theme from "styles/theme";
import TriangleElement from "components/atoms/svg/Triangle";
import PropTypes from "prop-types";

const SSelect = styled.select`
  min-width: 227px;
  min-height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.05);
  font-size: ${theme.size.h4}px;
  color: rgba(0, 0, 0, 0.4);
  padding-left: 10px;
  appearance: none;
  width: ${({ width = "227px" }: { width: string }) => {
    return width;
  }};
`;

const Triangle = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-right: 12px;
  align-items: center;
  right: 0;
  top: 0;
  height: 44px;
  pointer-events: none; /* 클릭가능하도록 함 */
`;

const Select: React.FC<StyledComponentProps<
  "select",
  never,
  { width?: string },
  never
>> = (props) => {
  const { width, ...restProps } = props;
  return (
    <div
      style={{
        position: "relative",
        width: `${width}`,
      }}
    >
      <Triangle>
        <TriangleElement />
      </Triangle>
      <SSelect width={width} {...restProps}>
        {props.children}
      </SSelect>
    </div>
  );
};

Select.defaultProps = {
  width: "227px",
};

Select.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
