import { hot } from "react-hot-loader";
import React, { useState } from "react";
import { ipcRenderer } from "electron";
import { RecoilRoot } from "recoil";
import InfiniteScrollNoLibrary from "components/InfiniteScrollNoLibrary";
import styled from "styled-components";
import "normalize.css";
import "styles/global.css";
import theme from "styles/theme";
import Button from "components/atoms/Button";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

function App() {
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    body: string;
  }>({
    title: "타이틀",
    subtitle: "서브타이틀",
    body: "내용",
  });

  const [wh, setWh] = useState<{ width: number; height: number }>({
    width: 1024,
    height: 768,
  });
  const [animated, setAnimated] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) return;
    setWh({
      ...wh,
      [e.target.name]: +e.target.value,
    });
  };

  return (
    <RecoilRoot>
      <div>
        <form>
          <input
            type="text"
            placeholder="가로"
            name="width"
            value={wh.width}
            onChange={changeHandler2}
          />
          <input
            type="text"
            placeholder="세로"
            name="height"
            value={wh.height}
            onChange={changeHandler2}
          />

          <input
            type="checkbox"
            id="animate"
            checked={animated}
            onChange={() => {
              setAnimated(!animated);
            }}
          />
          <label htmlFor="animate">애니메이트..</label>
          <button
            onClick={(e) => {
              e.preventDefault();
              ipcRenderer.send("resizeWindow", {
                width: wh.width,
                height: wh.height,
                animated,
              });
            }}
          >
            윈도우 크기 조정
          </button>
          <br />
          <input
            type="text"
            placeholder="제목"
            name="title"
            onChange={changeHandler}
          />
          <input
            type="text"
            placeholder="부제목"
            name="subtitle"
            onChange={changeHandler}
          />
          <input
            type="text"
            placeholder="내용"
            name="body"
            onChange={changeHandler}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              ipcRenderer.send("notification", formData);
            }}
          >
            노티피케이션
          </button>
        </form>
      </div>
      <Wrapper>
        <Title>Hello, 월드!</Title>
      </Wrapper>
      <Button color={theme.main.color}>안녕!</Button>
      <InfiniteScrollNoLibrary />
    </RecoilRoot>
  );
}

export default hot(module)(App);
