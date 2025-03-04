import ProjectHeader from "components/ProjectList/ProjectHeader";
import ProjectView from "components/ProjectList/ProjectView";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6edf1;
  height: auto;
  width: 100vw;
`;

export default function ProjectList() {
  return (
    <Container>
      <ProjectHeader />
      <ProjectView />
    </Container>
  );
}
