import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #e6edf1;
  padding-left: 53px;
  padding-top: 10%;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  max-height: 600px;
  overflow-y: auto;
`;

const TaskWrap = styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  width: 1044px;
  height: auto;
  align-items: center;
  padding-top: 22px;
`;

const TitleBox = styled.div`
  display: flex;
  width: 940px;
  height: 33px;
  background-color: #d1ebff;
  align-items: center;
`;

const TaskTitle = styled.p`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-left: 10px;
`;

const SubTaskItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  width: 860px;
`;

const SubTaskName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const SubTaskContent = styled.p`
  font-size: 14px;
  margin: 0 16px;
  flex: 1;
`;

const SubTaskDate = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`;

interface ListProps {
  id: string | undefined;
  username: string | undefined;
}

interface AllProps {
  id: number;
  name: string;
  subTasks: SubTaskProps[];
}

interface SubTaskProps {
  id: number;
  name: string;
  content: string;
  date: string;
}

export default function List({ id, username }: ListProps) {
  const [allTasks, setAllTasks] = useState<AllProps[]>([]);

  useEffect(() => {
    handleGetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/project/${username}/${id}/tasks_with_subtasks`
      );
      setAllTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
      .replace(/\./g, ".")
      .replace(/ /g, "");
  };

  return (
    <Container>
      <Wrap>
        {allTasks.map((task) => (
          <TaskWrap key={task.id}>
            <TitleBox>
              <TaskTitle>{task.name}</TaskTitle>
            </TitleBox>
            <ul>
              {task.subTasks.map((subTask) => (
                <SubTaskItem key={subTask.id}>
                  <SubTaskName>• {subTask.name}</SubTaskName>
                  <SubTaskContent>{subTask.content}</SubTaskContent>
                  <SubTaskDate>마감일 {formatDate(subTask.date)}</SubTaskDate>
                </SubTaskItem>
              ))}
            </ul>
          </TaskWrap>
        ))}
      </Wrap>
    </Container>
  );
}
