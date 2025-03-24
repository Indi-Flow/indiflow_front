import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Close from "assets/icons/icon_close.svg";
import axios from "axios";

const Container = styled.div`
  width: 1033px;
  height: 48px;
  margin-top: 74px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const MainTitle = styled.p`
  color: #000;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
`;

const Button = styled.button`
  width: 161px;
  height: 44px;
  border-radius: 5px;
  background: #fff;
  color: #000;
  border: none;
  text-align: center;
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;

const Plus = styled.span`
  font-size: 18px;
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

interface ProjectViewProps {
  id: number;
  name: string;
  content: string;
  date: string;
}

interface ProjectHeaderComponentProps {
  setProjects: React.Dispatch<React.SetStateAction<ProjectViewProps[]>>;
  username: string | undefined;
}

export default function ProjectHeader({
  setProjects,
  username,
}: ProjectHeaderComponentProps) {
  const [projectModal, setProjectModal] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<string>("entered");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleFetchProjects = async () => {
    try {
      const formattedDate = new Date(date).toISOString();
      console.log(name, content, formattedDate);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/${username}`,
        {
          name: name,
          content: content,
          date: formattedDate,
        }
      );
      console.log(response.data);
      setProjects((props) => [...props, response.data]);
      setProjectModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setAnimationState("entering");
    setProjectModal(true);
  };

  const handleCloseModal = () => {
    setAnimationState("exiting");
    setTimeout(() => {
      setProjectModal(false);
    }, 300);
  };

  return (
    <Container>
      <MainTitle>프로젝트 목록</MainTitle>
      <Button onClick={handleOpenModal}>
        <Plus>+</Plus> 새로운 프로젝트 생성
      </Button>
      {projectModal && (
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
            <Label>프로젝트 제목</Label>
            <Input
              type="text"
              placeholder="제목을 입력해주세요."
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
            <AddButton onClick={() => handleFetchProjects()}>
              등록하기
            </AddButton>
          </BackGround>
        </Modal>
      )}
    </Container>
  );
}
