import List from "components/Home/List";
import Navigation from "components/Home/Navigation";
import ReadyPage from "components/Home/ReadyPage";
import Task from "components/Home/Task";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);

  return (
    <Container>
      <div>
        <Navigation page={page} setPage={setPage} />
      </div>
      {page === 1 ? (
        <Task id={id} />
      ) : page === 2 ? (
        <List id={id} />
      ) : (
        <ReadyPage />
      )}
    </Container>
  );
}
