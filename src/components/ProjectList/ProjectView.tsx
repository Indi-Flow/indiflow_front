import styled from "styled-components";
import Calendar from "assets/icons/icon_calendar.svg";
import Content from "assets/icons/icon_content.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 1033px;
  margin-top: 44px;
  height: auto;
  background-color: #e6edf1;
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
  background-color: #79bff4;
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
  username: string | undefined;
  setIsDelete: (isDelete: boolean) => void;
}

export default function ProjectView({
  datas,
  username,
  setIsDelete,
}: ProjectViewComponentProps) {
  const navigate = useNavigate();

  const formattedDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}년 ${month}월 ${day.slice(0, 2)}일`;
  };

  const handleDeleteProject = async (id: number) => {
    try {
      setIsDelete(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/${username}/${id}/finish_project`
      );
      alert(response.data);
      setIsDelete(false);
    } catch (error) {
      alert("프로젝트 삭제에 실패했습니다 (Task들을 모두 완료해주세요)");
      console.error(error);
    }
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
            <InButton
              onClick={() =>
                navigate(`/Home/${data.id}`, { state: { username } })
              }
            >
              들어가기
            </InButton>
            <FinishButton onClick={() => handleDeleteProject(data.id)}>
              완료하기
            </FinishButton>
          </Wrap>
        </ProjectBox>
      ))}
    </Container>
  );
}
