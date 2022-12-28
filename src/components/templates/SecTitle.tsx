import styled from "styled-components"

type SecTitleProps = {
  text: string;
}

const Container = styled.div`
  font-family: 'Spoqa-Bold';
  font-size: 23px;
  color: var(--primary-color);
`

export default function SecTitle({ text }: SecTitleProps) {
  return (
    <Container>{text}</Container>
  );
}