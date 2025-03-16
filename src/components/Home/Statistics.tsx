import styled from "styled-components";

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
  justify-content: space-between;
  width: 1019px;
  height: 80px;
  align-items: center;
  padding-left: 39px;
  padding-right: 39px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  margin-top: 130px;
`;

const StatText = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GraphWrap = styled.div`
  display: flex;
  width: 1200px;
  height: 500px;
  gap: 6px;
`;

const TodayNumberBox = styled.div`
  width: 45px;
  height: 464px;
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

const TodayNumber = styled.p`
  color: #000;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GraphBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 539px;
`;

const Graph = styled.div`
  width: 1100px;
  height: 450px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #000;
`;

const Day = styled.div`
  width: 1019px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 150px;
  margin-left: 20px;
`;

const DateText = styled.p`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default function Statistics() {
  const todayNumber = [0, 1, 2, 3, 4];
  const getLastNDays = (n: number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date
        .toLocaleDateString("ko-KR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\./g, "")
        .replace(/ /g, ".");
      dates.push(formattedDate);
    }
    return dates.reverse();
  };

  const dates = getLastNDays(5);

  return (
    <Container>
      <StatBox>
        <StatText>오늘의 포모도로 횟수 : 3회</StatText>
        <StatText>나의 포모도로 총 횟수 : 78회</StatText>
      </StatBox>
      <GraphWrap>
        <TodayNumberBox>
          {todayNumber.reverse().map((number, index) => (
            <TodayNumber key={index}>{number}회</TodayNumber>
          ))}
        </TodayNumberBox>
        <GraphBox>
          <Graph>
            {[1, 2, 3, 4].map((number, index) => (
              <Line key={index} style={{ top: `${number * 22.5 - 14}%` }} />
            ))}
          </Graph>
          <Day>
            {dates.map((date, index) => (
              <DateText key={index}>{date}</DateText>
            ))}
          </Day>
        </GraphBox>
      </GraphWrap>
    </Container>
  );
}
