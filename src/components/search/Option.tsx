import styled from "styled-components"

type OptionProps = {
  idx: number;
  isActive: boolean;
  text: string;
  onClickOption: ($: number) => void;
}

const Container = styled.div<{ isActive: boolean }>`
  background: ${props => props.isActive ? "rgba(198, 210, 50, 0.2)" : "#FFFFFF"};
  padding: 15px;
  font-size: 15px;
  color: var(--primary-color);
  border: 1px solid ${props => props.isActive ? "var(--primary-color)" : "#F6F6F6"};
  border-radius: 5px;
  font-family: 'Spoqa-Bold';
  z-index: ${props => props.isActive ? 1 : 0};
  height: 50px;
`

export default function Option({ idx, isActive, text, onClickOption }: OptionProps) {
  return (
    <Container isActive={isActive} onClick={() => onClickOption(idx)}>
      {text}
    </Container>
  );
}