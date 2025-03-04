import styled from "styled-components";

export default function ProjectHeader() {
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

  return (
    <Container>
      <MainTitle>프로젝트 목록</MainTitle>
      <Button>
        <Plus>+</Plus> 새로운 프로젝트 생성
      </Button>
    </Container>
  );
}
