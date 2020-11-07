import Button from "components/atoms/Button";
import Select from "components/atoms/Select";
import SettingIcon from "components/atoms/svg/Setting";
import InputText from "components/molecules/InputText";
import React, { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { RootState } from "rootReducer";
import styled from "styled-components";
import color from "styles/color";
import theme from "styles/theme";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function AddNewLectureContent(): JSX.Element {
  return (
    <Wrapper>
      <div style={{ fontSize: theme.size.h2, marginBottom: "44px" }}>
        &lt; 새 강의 추가
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 1fr",
            rowGap: "16px",
            columnGap: "16px",
            alignItems: "center",
          }}
        >
          <div style={{ justifySelf: "end" }}>강의명</div>
          <InputText type="text" placeholder="강의명" />
          <div style={{ justifySelf: "end" }}>그룹</div>
          <Select width="100%">
            <option>그룹 선택</option>
            <option>그룹 1</option>
            <option>그룹 2</option>
          </Select>
          <Button
            color="white"
            style={{
              backgroundColor: "#032D3C",
              borderRadius: 0,
              fontSize: "16px",
              width: "153px",
              height: "55px",
              gridColumn: 2,
              justifySelf: "end",
              marginRight: 0,
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
