import List from "components/Home/List";
import Navigation from "components/Home/Navigation";
import ReadyPage from "components/Home/ReadyPage";
import SubTask from "components/Home/SubTask";
import Task from "components/Home/Task";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const username = location.state?.username;
  const [page, setPage] = useState<number>(1);
  const [taskId, setTaskId] = useState<number>(-1);

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <Container>
      <div>
        <Navigation
          page={page}
          setPage={setPage}
          setTaskId={setTaskId}
          username={username}
        />
      </div>
      {page === 1 ? (
        taskId === -1 ? (
          <Task id={id} setInSubTask={setTaskId} username={username} />
        ) : (
          <SubTask id={id} taskId={taskId} username={username} />
        )
      ) : page === 2 ? (
        <List id={id} username={username} />
      ) : (
        <ReadyPage />
      )}
    </Container>
  );
}
