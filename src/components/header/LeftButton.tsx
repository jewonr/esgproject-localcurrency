import styled from "styled-components";

const Container = styled.button`
  border: none;
  background: transparent;
  font-size: 20px;
  font-family: 'Spoqa-Bold';
  color: var(--primary-color);
`

export default function LeftButton() {
  return (
    <Container>로그인</Container>
  );
}