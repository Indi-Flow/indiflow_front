import styled from "styled-components";
import Arrow from "assets/icons/icon_arrow.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  background-color: #fff;
  width: 350px;
  height: 550px;
  position: relative;
  padding: 16px;
  overflow-y: auto;
  align-items: end;
`;

const MemoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemoItem = styled.div`
  background-color: #d1ebff;
  padding: 9px;
  border-radius: 10px;
  margin-bottom: 8px;
  align-self: flex-end;
  text-align: end;
  width: auto;
  height: auto;
  word-wrap: break-word;
`;

const MemoText = styled.p`
  margin: 0px;
  color: #000;
  text-align: right;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const MemoDate = styled.p<{ isFirst: boolean }>`
  color: #b5b5b5;
  text-align: end;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0px;
  margin-bottom: ${(props) => (props.isFirst ? "68px" : "26px")};
`;

const InputDiv = styled.div`
  position: absolute;
  bottom: 18px;
  left: 45px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 42px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);
`;

const Input = styled.input`
  width: 250px;
  height: 20px;
  border: none;
  padding-left: 12px;
  outline: none;
`;

interface MemoProps {
  id: string | undefined;
}

export default function Memo({ id }: MemoProps) {
  const memos = [
    {
      id: 1,
      content: "한줄 메모 입니다.",
      created_at: "2025-03-02T12:39:49",
    },

    {
      id: 2,
      content: "한줄 메모 입니다.한줄 메모 입니다.",
      created_at: "2025-03-02T12:39:49",
    },
    {
      id: 3,
      content: "한줄 메모 입니다.",
      created_at: "2025-03-02T12:39:49",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container>
      {memos.map((memo, index) => (
        <MemoWrap>
          <MemoItem key={memo.id}>
            <MemoText>{memo.content}</MemoText>
          </MemoItem>
          <MemoDate isFirst={index === 0}>
            {formatDate(memo.created_at)}
          </MemoDate>
        </MemoWrap>
      ))}
      <InputDiv>
        <Input type="text" placeholder="메모를 입력해주세요." />
        <img src={Arrow} alt="arrow" width={24} height={24} />
      </InputDiv>
    </Container>
  );
}
