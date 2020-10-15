import React, { PropsWithChildren } from "react";
import Select from "components/atoms/Select";

import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styles/theme";
import Button from "components/atoms/Button";
import SettingIcon from "components/atoms/svg/Setting";
import color from "styles/color";
import InputText from "components/molecules/InputText";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function DashboardMain(): JSX.Element {
  return (
    <Wrapper>
      <div style={{ fontSize: theme.size.h2, marginBottom: "44px" }}>
        이것은 대시보드 입니다. (메인페이지)
      </div>
    </Wrapper>
  );
}
