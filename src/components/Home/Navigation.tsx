import styled from "styled-components";
import Logo from "assets/icons/logo.svg";
import Home from "assets/icons/icon_home.svg";
import HomeCheck from "assets/icons/icon_home_check.svg";
import Graph from "assets/icons/icon_graph.svg";
import GraphCheck from "assets/icons/icon_graph_check.svg";
import Pomodoro from "assets/icons/icon_pomodoro.svg";
import PomodoroCheck from "assets/icons/icon_pomodoro_check.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 125px;
  height: auto;
  padding-top: 24px;
  gap: 120px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 83px;
`;

interface NavigationProps {
  page: number;
  setPage: (page: number) => void;
}

export default function Navigation({ page, setPage }: NavigationProps) {
  return (
    <Container>
      <img src={Logo} alt="Logo" width={70} height={70} />
      <Wrap>
        <img
          src={page === 1 ? HomeCheck : Home}
          alt="Home"
          width={30}
          height={30}
          onClick={() => setPage(1)}
          style={{ cursor: "pointer" }}
        />
        <img
          src={page === 2 ? GraphCheck : Graph}
          alt="Graph"
          width={30}
          height={30}
          onClick={() => setPage(2)}
          style={{ cursor: "pointer" }}
        />
        <img
          src={page === 3 ? PomodoroCheck : Pomodoro}
          alt="Pomodoro"
          width={30}
          height={30}
          onClick={() => setPage(3)}
          style={{ cursor: "pointer" }}
        />
      </Wrap>
    </Container>
  );
}
