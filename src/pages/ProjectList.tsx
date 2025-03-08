import ProjectHeader from "components/ProjectList/ProjectHeader";
import ProjectView from "components/ProjectList/ProjectView";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6edf1;
  height: auto;
  width: 100vw;
`;

export default function ProjectList() {
  const datas = [
    {
      id: 1,
      name: "1인 개발 프로젝트1",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      date: "2025-03-09T15:30:00",
    },
    {
      id: 2,
      name: "1인 개발 프로젝트2",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      date: "2025-03-09T15:30:00",
    },
    {
      id: 3,
      name: "1인 개발 프로젝트3",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      date: "2025-03-09T15:30:00",
    },
    {
      id: 4,
      name: "1인 개발 프로젝트4",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      date: "2025-03-09T15:30:00",
    },
    {
      id: 5,
      name: "1인 개발 프로젝트5",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      date: "2025-03-09T15:30:00",
    },
  ];

  return (
    <Container>
      <ProjectHeader />
      <ProjectView datas={datas} />
    </Container>
  );
}
