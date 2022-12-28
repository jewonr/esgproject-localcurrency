import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../header/SearchBar";

type SearchProps = {
  onClickSearchButton: (idx: number, input: string) => void;
  isActive: boolean;
  setIsActive: ($: boolean) => void;
}

const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 64px 20px;
  background: #FFFFFF;
  display: ${props => props.isActive ? "relative" : "none"};
`

const CancelButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`

const OptionWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
`

const Option = styled.div<{ isActive: boolean }>`
  border-radius: 3px;
  background: ${props => props.isActive ? "rgba(198, 210, 50, 0.2)" : "#FFFFFF"};
  padding: 15px;
  font-size: 15px;
  color: var(--primary-color);
  border: 1px solid ${props => props.isActive ? "var(--primary-color)" : "#F6F6F6"};
  border-radius: 5px;
  font-family: 'Spoqa-Bold';
  z-index: ${props => props.isActive ? 1 : 0};
`

const optionList = ["지역 검색", "매장명 검색", "도로명주소 검색", "지번 주소 검색"];

export default function Search({ onClickSearchButton, isActive, setIsActive }: SearchProps) {
  const [input, setInput] = useState("");
  const [clickedOption, setClickedOption] = useState([true, false, false, false]);
  const [clickedOptionIdx, setClickedOptionIdx] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const onClickOption = (idx: number) => {
    setClickedOption(clickedOption.map(($, i) => i === idx ? true : false));
    setClickedOptionIdx(idx);
  }

  const handleOnClickSearchButton = () => {
    setIsActive(false);
    onClickSearchButton(clickedOptionIdx, input);
  }

  useEffect(() => {
    console.log(isActive)
  }, [isActive])

  return (
    <Container isActive={isActive}>
      <CancelButton src="/images/x.svg" onClick={() => setIsActive(false)} />
      <SearchBar text={input} onChange={onChange} onClick={handleOnClickSearchButton} />
      <OptionWrapper>
        {optionList.map((item, idx) => (
          <Option key={idx} isActive={clickedOption[idx]} onClick={() => onClickOption(idx)}>{item}</Option>
        ))}
      </OptionWrapper>
    </Container>
  );
}