import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #e6edf1;
  padding-left: 53px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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

export default function List({ id }: ListProps) {
  const dummyDatas = [
    {
      id: 1,
      name: "태스크명 1",
      subTasks: [
        {
          id: 1,
          name: "서브태스크1",
          content: "this is content",
          date: "2025-02-02T00:00:00",
        },
        {
          id: 2,
          name: "서브태스크2",
          content: "this is content",
          date: "2025-02-02T00:00:00",
        },
      ],
    },
    {
      id: 2,
      name: "태스크명 2",
      subTasks: [],
    },
    {
      id: 3,
      name: "태스크명 3",
      subTasks: [
        {
          id: 1,
          name: "서브태스크1",
          content: "this is content",
          date: "2025-02-02T00:00:00",
        },
        {
          id: 2,
          name: "서브태스크2",
          content: "this is content",
          date: "2025-02-02T00:00:00",
        },
      ],
    },
  ];

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
        {dummyDatas.map((data) => (
          <TaskWrap key={data.id}>
            <TitleBox>
              <TaskTitle>{data.name}</TaskTitle>
            </TitleBox>
            <ul>
              {data.subTasks.map((subTask) => (
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
