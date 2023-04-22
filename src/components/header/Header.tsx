import styled from "styled-components"

type HeaderProps = {
  onClick: () => void;
}

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  height: 100px;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px 50px 10px 10px;
  border: 1px solid #F6F6F6;
  background: #FFFFFF;
  border-radius: 5px;
  font-size: 17px;

  &::placeholder {
    color: #E0E0E0;
  }
`;

export default function Header({ onClick }: HeaderProps) {
  return (
    <Container>
      <Input placeholder="클릭해서 가맹점을 검색해보세요" readOnly onClick={onClick} />
    </Container>
  );
}