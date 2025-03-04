import styled from "styled-components";

const Container = styled.div`
  width: 1033px;
  margin-top: 44px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
`;

export default function ProjectView() {
  const datas = [
    {
      id: 1,
      name: "1인 개발 프로젝트1",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      data: "2025-03-09T15:30:00",
    },
    {
      id: 2,
      name: "1인 개발 프로젝트2",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      data: "2025-03-09T15:30:00",
    },
    {
      id: 3,
      name: "1인 개발 프로젝트3",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      data: "2025-03-09T15:30:00",
    },
    {
      id: 4,
      name: "1인 개발 프로젝트4",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      data: "2025-03-09T15:30:00",
    },
    {
      id: 5,
      name: "1인 개발 프로젝트5",
      content: "1인 개발로 프로젝트 진행 중입니다.",
      data: "2025-03-09T15:30:00",
    },
  ];
  return <p>dd</p>;
}
