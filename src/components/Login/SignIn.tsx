import styled from "styled-components";
import Logo from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 100%;
`;

const Label = styled.label`
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 45px;
`;

const Input = styled.input`
  width: 399px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #000;
  background: #fff;
  margin-top: 28px;
  padding-left: 20px;
  &::placeholder {
    color: #b5b5b5;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 61px;
  margin-top: 84px;
`;

const InButton = styled.button`
  width: 150px;
  height: 59px;
  border: 0;
  border-radius: 10px;
  background: #79bff4;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  cursor: pointer;
`;

const OnButton = styled.button`
  width: 150px;
  height: 59px;
  border: 0;
  border-radius: 10px;
  background: #b5b5b5;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  cursor: pointer;
`;

interface SignInProps {
  setIsSignIn: (isSignIn: boolean) => void;
}

export default function SignIn({ setIsSignIn }: SignInProps) {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/user/sign_in", {
        username: id,
        password: password,
      });
      navigate(`/projects/${response.data}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <img src={Logo} alt="Logo" height={70} width={70} />
      <Label htmlFor="id">아이디</Label>
      <Input
        type="text"
        id="id"
        placeholder="아이디를 입력해주세요"
        onChange={(e) => setId(e.target.value)}
      />
      <Label htmlFor="password">비밀번호</Label>
      <Input
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonWrap>
        <InButton onClick={() => handleSignIn()}>로그인하기</InButton>
        <OnButton onClick={() => setIsSignIn(false)}>회원가입하기</OnButton>
      </ButtonWrap>
    </Container>
  );
}
