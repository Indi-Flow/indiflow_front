import { useState } from "react";
import styled from "styled-components";
import Memo from "./Memo";
import Close from "assets/icons/icon_close.svg";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #e6edf1;
  padding-left: 53px;
`;

const Wrap = styled.div`
  display: flex;
  width: 858px;
  align-items: center;
  justify-content: end;
`;

const Button = styled.button`
  margin-top: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 161px;
  height: 44px;
  border-radius: 5px;
  background: #fff;
  border: none;
  gap: 8px;
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Span = styled.span`
  font-size: 24px;
`;

const TaskMemoWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const TaskWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 49px;
`;

const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 237px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 22px;
  padding-top: 26px;
  padding-right: 22px;
`;

const TaskTitle = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0px;
`;

const SpanTag = styled.span`
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 46px;
  height: 20px;
  border-radius: 10px;
  background: #79bff4;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TaskDate = styled.p`
  color: #b5b5b5;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Content = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 43px;
  border-radius: 5px;
  background-color: #79bff4;
  border: none;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
`;

const BackGround = styled.div`
  width: 651px;
  height: 574px;
  background-color: #fff;
  padding-left: 64px;
  padding-top: 39px;
  border: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 41px;
`;

const Input = styled.input`
  width: 323px;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 11px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #fff;
`;

const AddButton = styled.button`
  width: 186px;
  height: 59px;
  margin-top: 41px;
  margin-left: 400px;
  border-radius: 10px;
  background: #79bff4;
  border: none;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  cursor: pointer;
`;

interface TaskProps {
  id: string | undefined;
  setInSubTask: (inSubTask: number) => void;
  username: string | undefined;
}

interface Task {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function Task({ id, setInSubTask, username }: TaskProps) {
  const [isTask, setIsTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const formatDate = (date: string) => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 30) {
      return `${Math.floor(diffDays / 30)}달 남음`;
    } else if (diffDays > 0) {
      return `${diffDays}일 남음`;
    } else {
      return `${Math.abs(diffDays)}일 지남`;
    }
  };

  return (
    <Container>
      <Wrap>
        <Button onClick={() => setIsTask(true)}>
          <Span>+</Span> 새로운 Task 생성
        </Button>
      </Wrap>
      <TaskMemoWrap>
        <TaskWrap>
          {tasks.map((task) => (
            <TaskBox key={task.id}>
              <TaskTitle>
                {task.title} <SpanTag>task</SpanTag>
              </TaskTitle>
              <TaskDate>{formatDate(task.date)}</TaskDate>
              <Content>{task.content}</Content>
              <ButtonBox>
                <InButton onClick={() => setInSubTask(task.id)}>
                  SubTask 보기
                </InButton>
              </ButtonBox>
            </TaskBox>
          ))}
        </TaskWrap>
        <Memo id={id} username={username} />
      </TaskMemoWrap>
      {isTask && (
        <Modal>
          <BackGround>
            <img
              src={Close}
              alt="close"
              style={{
                position: "absolute",
                right: "50px",
                top: "50px",
                cursor: "pointer",
              }}
              onClick={() => setIsTask(false)}
            />
            <Label>Task 이름</Label>
            <Input type="text" placeholder="TASK 이름을 입력해주세요" />
            <Label>마감일 설정</Label>
            <Input type="date" />
            <Label>내용</Label>
            <Input type="text" placeholder="내용을 입력해주세요." />
            <AddButton onClick={() => setIsTask(false)}>등록하기</AddButton>
          </BackGround>
        </Modal>
      )}
    </Container>
  );
}
