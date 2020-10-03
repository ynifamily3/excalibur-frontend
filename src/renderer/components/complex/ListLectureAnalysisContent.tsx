import React, { PropsWithChildren } from "react";
import Select from "components/atoms/Select";

import { RootState } from "rootReducer";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styles/theme";
import Button from "components/atoms/Button";
import SettingIcon from "components/atoms/svg/Setting";
import color from "styles/color";

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
  overflow-y: auto;
  height: 100%;
`;

const LI = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  font-size: ${theme.size.h4}px;
  color: gray;
  height: 60px;
`;

const LIChild = styled.div`
  padding: 0 20px;
  &:first-child {
    color: black;
    flex: 1;
    font-size: ${theme.size.h3}px;
    padding: "0 20px";
  }
`;

const InputText = styled.input`
  width: 100%;
  min-width: 300px;
  min-height: 44px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.05);
  font-size: ${theme.size.h4}px;
  padding-left: 10px;
  appearance: none;
`;

const data = [
  {
    times: 4,
    title: "생활속의 물리",
    kind: "미분류",
    createdAt: "2020.08.12.",
  },
  { times: 2, title: "교양승마", kind: "미분류", createdAt: "2020.08.15." },
  {
    times: 3,
    title: "생활속의 물리",
    kind: "미분류",
    createdAt: "2020.08.10.",
  },
  {
    times: 2,
    title: "도박중독과 상담",
    kind: "미분류",
    createdAt: "2020.08.07.",
  },
  { times: 7, title: "수학", kind: "미분류", createdAt: "2020.08.01." },
  { times: 6, title: "수학", kind: "미분류", createdAt: "2020.07.24." },
  { times: 1, title: "교양승마", kind: "미분류", createdAt: "2020.07.22." },
];

export default function ListLectureAnalysisContent(): JSX.Element {
  return (
    <Wrapper>
      <Top>
        <Select>
          <option>미분류</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </Select>
        <div style={{ marginLeft: "16px" }}>
          <Select>
            <option>최신순</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Select>
        </div>
        <div style={{ flex: 1, marginLeft: "16px" }}>
          <InputText type="text" placeholder="강의명을 입력하세요..." />
        </div>
      </Top>
      <div
        style={{
          marginBottom: "10px",
          marginTop: "30px",
          color: "black",
          fontSize: theme.size.h4 + "px",
        }}
      >
        총 {data.length}개의 강의가 있습니다.
      </div>
      <UL>
        {data.map((x, i) => {
          return (
            <LI key={"lect-" + i}>
              <LIChild>{x.title}</LIChild>
              <LIChild>{x.kind}</LIChild>
              <LIChild>{x.createdAt}</LIChild>
              <LIChild>
                <Button
                  color="white"
                  style={{
                    backgroundColor: "#032D3C",
                    borderRadius: 0,
                    fontSize: "12px",
                    width: "76px",
                    height: "34px",
                    paddingTop: "4px",
                    paddingBottom: "2px",
                  }}
                >
                  리포트
                </Button>
              </LIChild>
            </LI>
          );
        })}
      </UL>
    </Wrapper>
  );
}
