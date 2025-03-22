import styled from "styled-components";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #e6edf1;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const StatBox = styled.div`
  display: flex;
  width: 1019px;
  height: 576px;
  align-items: center;
  padding-left: 39px;
  padding-right: 39px;
  background-color: #fff;
  border-radius: 5px;
  justify-content: center;
  gap: 200px;
  border: none;
  margin-top: 130px;
`;

const StatCircleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StatText = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
`;

interface PomodoroProps {
  username: string;
}

export default function Statistics({ username }: PomodoroProps) {
  const [pomodoro, setPomodoro] = useState({
    d_count: 0,
    t_count: 150,
  });
  const target = pomodoro.t_count
    ? Math.ceil(pomodoro.t_count / 100) * 100
    : 100;

  useEffect(() => {
    getTodayPomodoro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodayPomodoro = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/pomodoro/stats/${username}`
      );
      setPomodoro(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <StatBox>
        <StatCircleWrap>
          <CircularProgressbarWithChildren
            value={pomodoro.d_count}
            maxValue={10}
            strokeWidth={20}
            styles={{
              path: {
                stroke: "#79BFF4",
              },
            }}
          >
            <StatText>
              오늘의 목표치
              <br />
              {pomodoro.d_count}회 / 10회
            </StatText>
          </CircularProgressbarWithChildren>
          <StatText>오늘의 포모도로 횟수 : {pomodoro.d_count}회</StatText>
        </StatCircleWrap>
        <StatCircleWrap>
          <CircularProgressbarWithChildren
            value={pomodoro.t_count}
            maxValue={target}
            strokeWidth={20}
            styles={{
              path: {
                stroke: "#79BFF4",
              },
            }}
          >
            <StatText>
              다음 목표치
              <br />
              {pomodoro.t_count}회 / {target}회
            </StatText>
          </CircularProgressbarWithChildren>
          <StatText>나의 포모도로 총 횟수 : {pomodoro.t_count}회</StatText>
        </StatCircleWrap>
      </StatBox>
    </Container>
  );
}
