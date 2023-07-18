import styled from "styled-components";
import Option from "./Option";

type OptionListProps = {
  optionList: string[];
  clickedOption: boolean[];
  setClickedOption: ($: boolean[]) => void;
}

const Container = styled.div`
  display: flex;
  gap: 15px 10px;
  margin: 30px 0 15px 0;
  flex-wrap: wrap;
`

export default function OptionList({ optionList, clickedOption, setClickedOption }: OptionListProps) {
  const onClickOption = (idx: number) => {
    setClickedOption(clickedOption.map((val, i) => i === idx ? !val : false));
  }

  return (
    <Container>
      {optionList.map((item, idx) => (
        <Option key={idx} idx={idx} isActive={clickedOption[idx]} text={item} onClickOption={onClickOption} />
      ))}
    </Container>
  );
}