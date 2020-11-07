// import { ALabel, Checkbox, CheckboxWrapper } from "components/atoms/Checkbox";
import { QuizBox as QuizBoxOriginal } from "components/atoms/QuizBox";
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioSelect,
} from "components/atoms/Radio";
import X from "components/atoms/svg/X";
import { ModalContext } from "contexts/modalContext";
import { ipcRenderer } from "electron";
import p from "immer";
import React, {
  FC,
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuizBox = styled(QuizBoxOriginal)`
  margin-top: 16px;
  height: 70px;
  position: relative;
  padding: 0;
  padding: 16px;
  transition: height 1s;
`;
const Button = styled.button`
  width: 32;
  height: 32;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  border: none;
  background-color: inherit;
  &:active {
    transform: translateY(1px);
  }
`;
export const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Selection = styled.div`
  border: inherit;
  border-radius: inherit;
  width: 100%;
  height: 33px;
  display: flex;
  align-items: center;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 56px;
  border: inherit;
  border-radius: inherit;
  padding: 16px;
  transition: height 1s;
`;
export type ISelectionMockFC = {
  mock: boolean;
};
export type ISelectionFC = {
  key_: number;
  text: string;
  isAnswer: boolean;
  setTextFn: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFn: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddNewQuizMD: FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const QuizBoxRef = useRef<HTMLDivElement>();
  const { handleModal } = useContext(ModalContext);
  const [selState, setSelState] = useState<{
    text: string[];
    answer: number;
  }>({ text: ["", "", ""], answer: -1 });

  const handleChange = () => {
    QuizBoxRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    textAreaRef.current.style.height = "auto"; // 이 구문 없으면 안 줄어든다. (근데 이게 있으면 애니메이션이 안 된다..)
    const saved = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = saved + 20 + "px";
  };

  return (
    <Wrapper>
      <Button onClick={() => handleModal()}>
        <X width="32" height="32" color="black" />
      </Button>
      <h2>퀴즈 출제</h2>
      <QuizBox ref={QuizBoxRef}>
        <Textarea
          ref={textAreaRef}
          placeholder="퀴즈 내용을 입력해 주세요."
          onChange={handleChange}
        ></Textarea>
        <SelectionWrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 style={{ flex: 1 }}>선지를 입력해 주세요.</h3>
            <Button
              style={{
                padding: "16px",
                color: "white",
                backgroundColor: "rgb(3, 45, 60)",
                border: "1px solid rgb(238, 239, 241)",
                borderRadius: "6px",
              }}
            >
              + 퀴즈 등록
            </Button>
          </div>
          {selState.text.map((text, i) => {
            return (
              <Selection key={"sel" + i}>
                <div
                  style={{
                    display: "inline-block",
                    flex: 1,
                    marginRight: "16px",
                    height: "32px",
                  }}
                >
                  <input
                    type="text"
                    value={selState.text[i]}
                    onChange={(e) => {
                      const r = p(selState, (draft) => {
                        draft.text[i] = e.target.value;
                      });
                      setSelState(r);
                    }}
                    placeholder={"선지를 입력해 주세요."}
                    style={{
                      height: "32px",
                      paddingLeft: "16px",
                      border: "1px solid rgb(238, 239, 241)",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                  />
                </div>
                <label htmlFor={"sel-" + i}>
                  <RadioSelect style={{ marginRight: 0 }}>
                    <Radio
                      type="radio"
                      name="selection"
                      id={"sel-" + i}
                      value={"sel-" + i}
                      checked={selState.answer === i}
                      onChange={() => {
                        setSelState(
                          p(selState, (draft) => {
                            draft.answer = i;
                          })
                        );
                      }}
                    />
                    <RadioLabel htmlFor={"sel-" + i}>정답</RadioLabel>
                  </RadioSelect>
                </label>
              </Selection>
            );
          })}
        </SelectionWrapper>
      </QuizBox>
      <Button
        style={{ backgroundColor: "skyblue", padding: 30 }}
        onClick={() => {
          (async function () {
            const proc = JSON.parse(await ipcRenderer.invoke("getProcessList"));
            console.log(proc);
          })();
        }}
      >
        Process 가져오기
      </Button>
    </Wrapper>
  );
};

export default AddNewQuizMD;
