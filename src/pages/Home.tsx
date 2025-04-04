import List from "components/Home/List";
import Navigation from "components/Home/Navigation";
import SubTask from "components/Home/SubTask";
import Task from "components/Home/Task";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Play from "assets/icons/icon_play.svg";
import Pause from "assets/icons/icon_pause.svg";
import Reset from "assets/icons/icon_reset.svg";
import styled from "styled-components";
import Statistics from "components/Home/Statistics";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const TimerBox = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
  justify-content: center;
  width: 232px;
  height: 55px;
  border-radius: 10px;
  background: #fff;
  border: none;
  position: absolute;
  top: 12%;
  left: 15%;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 113px;
  height: 40px;
  border: 1px solid #000;
  background-color: #fff;
`;

const TimerText = styled.p`
  color: #000;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ContentArea = styled.div`
  width: 88%;
  animation: slideIn 0.3s ease-in-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const username = location.state?.username;
  const [page, setPage] = useState<number>(1);
  const [taskId, setTaskId] = useState<number>(-1);
  const [time, setTime] = useState<number>(1800);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (time === 0) {
      alert("포모도로 추가!");
      setTime(1800);
      setIsActive(false);
      postPomodoro();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const postPomodoro = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pomodoro/add/${username}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(1800);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getPageContent = () => {
    if (page === 1) {
      return taskId === -1 ? (
        <Task key="task" id={id} setInSubTask={setTaskId} username={username} />
      ) : (
        <SubTask key="subtask" id={id} taskId={taskId} username={username} />
      );
    } else if (page === 2) {
      return <List key="list" id={id} username={username} />;
    } else {
      return <Statistics key="stats" username={username} />;
    }
  };

  return (
    <Container>
      <div>
        <Navigation
          page={page}
          setPage={setPage}
          setTaskId={setTaskId}
          username={username}
        />
        <TimerBox>
          <Image
            src={!isActive ? Play : Pause}
            alt="Play"
            width={24}
            height={24}
            onClick={() => toggleTimer()}
          />
          <Image
            src={Reset}
            alt="Reset"
            width={24}
            height={24}
            onClick={() => resetTimer()}
          />
          <Timer>
            <TimerText>{formatTime(time)}</TimerText>
          </Timer>
        </TimerBox>
      </div>
      <ContentArea key={`${page}-${taskId}`}>{getPageContent()}</ContentArea>
    </Container>
  );
}
