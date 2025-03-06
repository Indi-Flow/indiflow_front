import { useState } from "react";
import styled from "styled-components";
import Memo from "./Memo";
import Close from "assets/icons/icon_close.svg";

interface TaskProps {
  id: string | undefined;
}

interface TaskData {
  id: number;
  title: string;
  content: string;
  date: string;
}

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

export default function Task({ id }: TaskProps) {
  const [isTask, setIsTask] = useState<boolean>(false);
  const datas: TaskData[] = [
    {
      id: 1,
      title: "기획 및 디자인 작업 들어가기",
      content: "IA, Wireframe, Design 작업 하기",
      date: "2025-03-09T15:30:00",
    },
    {
      id: 2,
      title: "프론트 1차 UI 작업 들어가기",
      content: "API 연결하기 전 프론트 정적 페이지 완성",
      date: "2025-05-09T15:30:00",
    },
    {
      id: 3,
      title: "백엔드 API 설계",
      content: "DB 설계 및 API 문서 작성",
      date: "2025-03-03T15:30:00",
    },
    {
      id: 4,
      title: "API 연동",
      content: "사용자한테 입력을 받아서 API 연동을 통해 서버에 저장시키기 ",
      date: "2025-03-09T15:30:00",
    },
  ];
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
          {datas.map((data) => (
            <TaskBox key={data.id}>
              <TaskTitle>
                {data.title} <SpanTag>task</SpanTag>
              </TaskTitle>
              <TaskDate>{formatDate(data.date)}</TaskDate>
              <Content>{data.content}</Content>
              <ButtonBox>
                <InButton>SubTask 보기</InButton>
              </ButtonBox>
            </TaskBox>
          ))}
        </TaskWrap>
        <Memo id={id} />
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
