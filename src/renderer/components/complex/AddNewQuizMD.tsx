import { QuizBox as QuizBoxOriginal } from "components/atoms/QuizBox";
import { Radio, RadioLabel, RadioSelect } from "components/atoms/Radio";
import X from "components/atoms/svg/X";
import { ModalContext } from "contexts/modalContext";
import p from "immer";
import React, { FC, useCallback, useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createQuiz } from "repos/quiz";
import { RootState } from "rootReducer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;
`;
const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuizBox = styled(QuizBoxOriginal)`
  margin: 16px 0;
  height: 70px;
  position: relative;
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
const Selection = styled.div`
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
  background-color: white;
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

const AddNewQuizMD: FC<{
  fireFn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ fireFn }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const QuizBoxRef = useRef<HTMLDivElement>();
  const { handleModal } = useContext(ModalContext);
  const { analysisStat } = useSelector((state: RootState) => state.global);
  const [contentState, setContentState] = useState("");
  const [isPending, setIsPending] = useState(false); // 퀴즈 등록 pending
  const [selState, setSelState] = useState<{
    text: string[];
    answer: number;
  }>({ text: ["", "", ""], answer: -1 });

  const selectionRef = useRef(null);
  // const isLoadingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentState(e.target.value);
    QuizBoxRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    textAreaRef.current.style.height = "auto"; // 이 구문 없으면 안 줄어든다. (근데 이게 있으면 애니메이션이 안 된다..)
    const saved = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = saved + 20 + "px";
  };

  const isValid = useCallback(() => {
    return (
      selState.answer !== -1 &&
      selState.text[0].trim().length > 0 &&
      selState.text[1].trim().length > 0 &&
      selState.text[2].trim().length > 0 &&
      contentState.trim().length > 0
    );
  }, [contentState, selState.answer, selState.text])();

  const createQuizAPI = useCallback(async () => {
    try {
      setIsPending(true);
      await createQuiz({
        sessionId: analysisStat.sessionId,
        content: contentState,
        example1: selState.text[0],
        example2: selState.text[1],
        example3: selState.text[2],
        answer: selState.answer + 1,
      });
      fireFn(true);
      handleModal();
    } catch (e) {
      console.log("에러", e);
    } finally {
      setIsPending(false);
    }
  }, [analysisStat.sessionId, contentState, selState, handleModal, fireFn]);
  const handleRegiester = () => {
    createQuizAPI();
  };

  const selections = selState.text.map((text, i) => {
    return (
      <Selection
        key={"sel" + i}
        ref={(ref) => {
          if (selections.length - 1 === i) {
            selectionRef.current = ref;
          }
        }}
      >
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
  });

  return (
    <Wrapper>
      <Button onClick={handleModal}>
        <X width="32" height="32" color="black" />
      </Button>
      <div style={{ display: "flex" }}>
        <h2 style={{ flex: 1 }}>퀴즈 출제</h2>
        <Button
          style={{
            padding: "16px",
            color: "white",
            backgroundColor: "rgb(3, 45, 60)",
            border: "1px solid rgb(238, 239, 241)",
            borderRadius: "6px",
            opacity: !isValid ? "0.5" : "1",
          }}
          onClick={handleRegiester}
          disabled={!isValid || isPending}
        >
          + 퀴즈 등록
        </Button>
      </div>
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <ScrollWrapper>
          <QuizBox ref={QuizBoxRef}>
            <Textarea
              ref={textAreaRef}
              placeholder="퀴즈 내용을 입력해 주세요."
              onChange={handleChange}
              value={contentState}
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
              </div>
              {selections}
            </SelectionWrapper>
          </QuizBox>
        </ScrollWrapper>
      </div>
    </Wrapper>
  );
};

export default AddNewQuizMD;
