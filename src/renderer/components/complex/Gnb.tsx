import React, { useEffect } from "react";
import styled from "styled-components";
import { RootState } from "rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { signInAction } from "features/accounts/accountSlice";

const Wrapper = styled.div``;

export default function Gnb(): JSX.Element {
  const dispatch = useDispatch();
  const { isLogin, accountInfo } = useSelector(
    (state: RootState) => state.account
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        signInAction({
          email: "jongkeun.ch@gmail.com",
          mode: "student",
          password: "12345",
        })
      );
    }, 1000);
  }, [dispatch]);

  return (
    <Wrapper>
      &gt; 설정{isLogin === false ? "비로그인" : `로그인${accountInfo.email}`}
    </Wrapper>
  );
}
