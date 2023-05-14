import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../header/SearchBar";
import OptionList from "./OptionList";
import SearchOptionDetail from "./SearchOptionDetail";

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

const optionList = ["지역 검색", "도로명주소 검색", "업종별 검색"];

export default function Search({ onClickSearchButton, isActive, setIsActive }: SearchProps) {
  const [input, setInput] = useState("");
  const [clickedOption, setClickedOption] = useState([false, false, false, false]);
  const [clickedOptionIdx, setClickedOptionIdx] = useState(0);
  const [optionDetailActive, setOptionDetailActive] = useState(false);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleOnClickSearchButton = () => {
    setIsActive(false);
    onClickSearchButton(clickedOptionIdx, input);
  }

  useEffect(() => {
    for(let i = 0; i < clickedOption.length; i++) {
      if(clickedOption[i] && i != 1) {
        setOptionDetailActive(true);
        setClickedOptionIdx(i);
        break;
      } else {
        setInput("");
      }
    }
  }, [clickedOption])

  return (
    <Container isActive={isActive}>
      <CancelButton src="/images/x.svg" onClick={() => setIsActive(false)} />
      <SearchBar text={input} onChange={onChange} onClick={handleOnClickSearchButton} placeholder="선택한 옵션에 맞게 검색해보세요" />
      <OptionList 
        optionList={optionList} 
        clickedOption={clickedOption} 
        setClickedOption={setClickedOption} 
      />
      <SearchOptionDetail isActive={optionDetailActive} setIsActive={setOptionDetailActive} idx={clickedOptionIdx} setOption={setInput} />
    </Container>
  );
}