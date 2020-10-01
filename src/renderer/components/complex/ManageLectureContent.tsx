import React, { PropsWithChildren } from "react";
import Select from "components/atoms/Select";

import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styles/theme";
import Button from "components/atoms/Button";
import SettingIcon from "components/atoms/svg/Setting";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
`;

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  &:first {
    flex: 1;
  }
`;
const data = [
  { title: "일어 I", kind: "미분류", createdAt: "2020.08.12." },
  { title: "운영체제", kind: "미분류", createdAt: "2020.08.12." },
  { title: "독도의 이해", kind: "싫은과목", createdAt: "2020.08.12." },
  { title: "시스템 프로그래밍", kind: "좋은과목", createdAt: "2020.08.12." },
  { title: "대구경북의 이해", kind: "꿀교양", createdAt: "2020.08.12." },
  { title: "오토마타및형식이론", kind: "미분류", createdAt: "2020.08.12." },
];

export default function ManageLectureContent(): JSX.Element {
  return (
    <Wrapper>
      <Top>
        <Select>
          <option>전체 보기</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Select>
        <div style={{ flex: 1, marginLeft: "16px" }}>
          <Select>
            <option>최신순</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Select>
        </div>
        <Button
          color="white"
          style={{
            backgroundColor: "#032D3C",
            borderRadius: 0,
            width: "153px",
            height: "55px",
          }}
        >
          + 새 강의 추가
        </Button>
      </Top>
      <div style={{ marginBottom: "10px", color: "red" }}>
        총 6개의 강의가 있습니다.
      </div>
      <UL>
        {data.map((x, i) => {
          return (
            <LI key={"lect-" + i}>
              <div style={{ flex: 1 }}>{x.title}</div>
              <div style={{ padding: "0 20px" }}>{x.kind}</div>
              <div style={{ padding: "0 20px" }}>{x.createdAt}</div>
              <div style={{ padding: "0 20px" }}>
                <SettingIcon />
              </div>
            </LI>
          );
        })}
      </UL>
    </Wrapper>
  );
}
