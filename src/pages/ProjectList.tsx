import ProjectHeader from "components/ProjectList/ProjectHeader";
import ProjectView from "components/ProjectList/ProjectView";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6edf1;
  height: 100vh;
  width: 100vw;
`;

interface ProjectViewProps {
  id: number;
  name: string;
  content: string;
  date: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectViewProps[]>([]);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    handleGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, setProjects]);

  const handleGetProjects = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/projects/${username}`
      );
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <ProjectHeader setProjects={setProjects} username={username} />
      <ProjectView datas={projects} />
    </Container>
  );
}
