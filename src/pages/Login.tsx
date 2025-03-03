import SignIn from "components/Login/SignIn";
import styled from "styled-components";
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

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Container>
      {isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} />
      ) : (
        <SignOn setIsSignIn={setIsSignIn} />
      )}

      <img src={HomepageImage} alt="Homepage" width={628} height={520} />
    </Container>
  );
}
