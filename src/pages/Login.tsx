import SignIn from "components/Login/SignIn";
import styled, { keyframes, css } from "styled-components";
import HomepageImage from "assets/images/Login/homepage_image.png";
import { useState } from "react";
import SignOn from "components/Login/SignOn";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const AnimatedContainer = styled.div<{ state: string }>`
  ${({ state }) =>
    state === "entering" &&
    css`
      animation: ${fadeIn} 300ms forwards;
    `}
  ${({ state }) =>
    state === "exiting" &&
    css`
      animation: ${fadeOut} 300ms forwards;
    `}
`;

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [animationState, setAnimationState] = useState("entered");

  const handleToggle = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      setIsSignIn(!isSignIn);
      setAnimationState("entering");
    }, 300);
  };

  return (
    <Container>
      <AnimatedContainer state={animationState}>
        {isSignIn ? (
          <SignIn setIsSignIn={handleToggle} />
        ) : (
          <SignOn setIsSignIn={handleToggle} />
        )}
      </AnimatedContainer>
      <img src={HomepageImage} alt="Homepage" width={628} height={520} />
    </Container>
  );
}
