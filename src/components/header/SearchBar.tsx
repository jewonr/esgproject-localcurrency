import styled from "styled-components";

type SearchBarProps = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const Container = styled.div`
  position: absolute;
  align-items: center;
  display: flex;
  width: 100%;
  position: relative;
`;

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

const Img = styled.img`
  position: absolute;
  right: 15px;
`

export default function SearchBar({ text, onChange, onClick }: SearchBarProps) {
  return (
    <Container>
      <Input placeholder="가맹점을 검색해보세요" value={text} onChange={onChange} />
      <Img src="images/search.svg" onClick={onClick} />
    </Container>
  );
}