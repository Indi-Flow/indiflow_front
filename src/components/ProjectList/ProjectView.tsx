import styled from "styled-components";
import Calendar from "assets/icons/icon_calendar.svg";
import Content from "assets/icons/icon_content.svg";

const Container = styled.div`
  width: 1033px;
  margin-top: 44px;
  align-items: center;
  column-gap: 105px;
  row-gap: 57px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ProjectBox = styled.div`
  width: 442px;
  height: 230px;
  border: none;
  border-radius: 10px;
  background-color: #ffffff;
  padding-left: 22px;
  padding-top: 21px;
`;

const Title = styled.p`
  color: #000;
  height: 48px;
  font-size: 26px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin: 0;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 27px;
  margin-top: 18px;
`;

const Text = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InButton = styled.button`
  width: 200px;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #d1ebff;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-top: 18px;
  cursor: pointer;
`;

const FinishButton = styled.button`
  width: 200px;
  height: 52px;
  border: none;
  border-radius: 10px;
  background-color: #b5b5b5;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-top: 18px;
  cursor: pointer;
`;

interface ProjectViewProps {
  id: number;
  name: string;
  content: string;
  date: string;
}

interface ProjectViewComponentProps {
  datas: ProjectViewProps[];
}

export default function ProjectView({ datas }: ProjectViewComponentProps) {
  const formattedDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day.slice(0, 2)}일`;
  };
  return (
    <Container>
      {datas.map((data) => (
        <ProjectBox key={data.id}>
          <Title>{data.name}</Title>
          <Wrap>
            <img src={Calendar} alt="calendar" width={24} height={24} />
            <Text>{formattedDate(data.date)}</Text>
          </Wrap>
          <Wrap>
            <img src={Content} alt="content" width={24} height={24} />
            <Text>{data.content}</Text>
          </Wrap>
          <Wrap>
            <InButton>들어가기</InButton>
            <FinishButton>완료하기</FinishButton>
          </Wrap>
        </ProjectBox>
      ))}
    </Container>
  );
}
