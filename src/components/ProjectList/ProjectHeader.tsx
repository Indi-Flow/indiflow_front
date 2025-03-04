import { useState } from "react";
import styled from "styled-components";
import Close from "assets/icons/icon_close.svg";

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

export default function ProjectHeader() {
  const [projectModal, setProjectModal] = useState<boolean>(false);

  return (
    <Container>
      <MainTitle>프로젝트 목록</MainTitle>
      <Button onClick={() => setProjectModal(true)}>
        <Plus>+</Plus> 새로운 프로젝트 생성
      </Button>
      {projectModal && (
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
              onClick={() => setProjectModal(false)}
            />
            <Label>프로젝트 제목</Label>
            <Input type="text" placeholder="제목을 입력해주세요." />
            <Label>마감일 설정</Label>
            <Input type="date" />
            <Label>내용</Label>
            <Input type="text" placeholder="내용을 입력해주세요." />
            <AddButton onClick={() => setProjectModal(false)}>
              등록하기
            </AddButton>
          </BackGround>
        </Modal>
      )}
    </Container>
  );
}
