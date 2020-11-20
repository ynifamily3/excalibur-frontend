import BackButton from "components/atoms/BackButton";
import Button from "components/atoms/Button";
import Select from "components/atoms/Select";
import InputText from "components/molecules/InputText";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTeacherCourses } from "repos/course";
import { changeDashboardPage } from "slices/uiSlice";
import styled from "styled-components";
import theme from "styles/theme";

const Wrapper = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default function AddNewLectureContent(): JSX.Element {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }
  function handleSubmit(): void {
    if (text.trim().length < 1) {
      alert("제대로 입력하세요.");
      return;
    }
    setDisabled(true);
    (async () => {
      try {
        await createTeacherCourses({ accountId: 13, name: text });
        dispatch(changeDashboardPage("managelecture"));
      } catch (e) {
        console.error("에러:", e);
        setDisabled(false);
      }
    })();
  }
  return (
    <Wrapper>
      <div
        style={{
          fontSize: theme.size.h2,
          marginBottom: "44px",
          display: "flex",
        }}
      >
        <BackButton
          onClick={() => {
            dispatch(changeDashboardPage("managelecture"));
          }}
        />
        새 강의 추가
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
          <InputText
            type="text"
            placeholder="강의명"
            onKeyPress={handleEnterKey}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div style={{ justifySelf: "end" }}>그룹</div>
          <Select width="100%">
            <option>그룹 선택</option>
            <option>그룹 1</option>
            <option>그룹 2</option>
          </Select>
          <Button
            color="white"
            onClick={handleSubmit}
            disabled={disabled}
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
