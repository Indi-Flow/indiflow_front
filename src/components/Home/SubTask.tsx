import styled, { keyframes, css } from "styled-components";
import Memo from "./Memo";
import { useEffect, useState } from "react";
import Close from "assets/icons/icon_close.svg";
import axios from "axios";

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

const SubTaskMemoWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

const SubTaskWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 49px;
`;

const SubTaskBox = styled.div`
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

const SubTaskTitle = styled.p`
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

const SubTaskDate = styled.p`
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Modal = styled.div<{ state: string }>`
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
  ${({ state }) =>
    state === "entering" &&
    css`
      animation: ${fadeIn} 300ms forwards;
    `}
  ${({ state }) =>
    state === "exiting" &&
    css`
      animation: ${fadeOut} 300ms forwards;
    `}
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

interface SubTaskProps {
  id: string | undefined;
  taskId: number;
  username: string | undefined;
}

interface SubTaskData {
  id: number;
  name: string;
  content: string;
  date: string;
}

export default function SubSubTask({ id, taskId, username }: SubTaskProps) {
  const [isSubTaskModal, setIsSubTaskModal] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<string>("entered");
  const [subTasks, setSubTasks] = useState<SubTaskData[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    handleGetSubTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete]);

  const handleGetSubTasks = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/task/${username}/${id}/${taskId}/subTask_list`
      );
      setSubTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostSubTasks = async (date: string) => {
    try {
      const formDate = new Date(date).toISOString();
      const response = await axios.post(
        `http://127.0.0.1:8080/subTask/${username}/${id}/${taskId}/subTask`,
        {
          name: name,
          content: content,
          date: formDate,
        }
      );
      const data = {
        id: response.data,
        name: name,
        content: content,
        date: formDate,
      };
      setSubTasks((props) => [...props, data]);
      setIsSubTaskModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubTask = async (subTaskId: number) => {
    try {
      setIsDelete(true);
      const response = await axios.delete(
        `http://localhost:8080/subTask/${username}/${id}/${taskId}/${subTaskId}/finish_subtask`
      );
      alert(response.data);
      setIsDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    if (subTasks.length >= 4) {
      alert("Task는 최대 4개까지 등록할 수 있습니다.");
      return;
    }
    setAnimationState("entering");
    setIsSubTaskModal(true);
  };

  const handleCloseModal = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      setIsSubTaskModal(false);
    }, 300);
  };

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
        <Button onClick={handleOpenModal}>
          <Span>+</Span> 새로운 SubTask 생성
        </Button>
      </Wrap>
      <SubTaskMemoWrap>
        <SubTaskWrap>
          {subTasks.map((subTask) => (
            <SubTaskBox key={subTask.id}>
              <SubTaskTitle>
                {subTask.name} <SpanTag>SubTask</SpanTag>
              </SubTaskTitle>
              <SubTaskDate>{formatDate(subTask.date)}</SubTaskDate>
              <Content>{subTask.content}</Content>
              <ButtonBox>
                <InButton onClick={() => handleDeleteSubTask(subTask.id)}>
                  SubTask 완료하기
                </InButton>
              </ButtonBox>
            </SubTaskBox>
          ))}
        </SubTaskWrap>
        <Memo id={id} username={username} />
      </SubTaskMemoWrap>
      {isSubTaskModal && (
        <Modal state={animationState}>
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
              onClick={handleCloseModal}
            />
            <Label>SubTask 이름</Label>
            <Input
              type="text"
              placeholder="SubTask 이름을 입력해주세요"
              onChange={(e) => setName(e.target.value)}
            />
            <Label>마감일 설정</Label>
            <Input type="date" onChange={(e) => setDate(e.target.value)} />
            <Label>내용</Label>
            <Input
              type="text"
              placeholder="내용을 입력해주세요."
              onChange={(e) => setContent(e.target.value)}
            />
            <AddButton onClick={() => handlePostSubTasks(date)}>
              등록하기
            </AddButton>
          </BackGround>
        </Modal>
      )}
    </Container>
  );
}
