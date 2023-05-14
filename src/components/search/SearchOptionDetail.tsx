import { useEffect, useState } from "react";
import styled from "styled-components";
import OptionList from "./OptionList";
import { region } from "../region";
import { sector } from "../sector";
import SearchBar from "../header/SearchBar";

type SearchOptionDetailProps = {
  isActive: boolean;
  setIsActive: ($: boolean) => void;
  idx: number;
  setOption: ($: string) => void;
}

const Container = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 30px 20px;
  background: #FFFFFF;
  display: ${props => props.isActive ? "flex" : "none"};
  z-index: 2;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-size: 18px;
  margin-left: 5px;
  line-height: 24px;
  font-family: 'Spoqa-Bold';
`

const CancelButton = styled.img`
  position: absolute;
  top: 30px;
  right: 20px;
`

const Body = styled.div`
  flex: 1;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
`

const SubmitButton = styled.div`
  width: 100%;
  height: 50px;
  border: none;
  background: var(--primary-color);
  color: #FFFFFF;
  border-radius: 15px;
  text-align: center;
  padding: 16px;
  font-family: 'Spoqa-Bold';
`

const titleList = ["지역", "", "업종", "상품권"];
const placeholderList = ["도 또는 광역시를 검색해보세요", "", "", ""];

export default function SearchOptionDetail({ isActive, setIsActive, idx, setOption }: SearchOptionDetailProps) {
  const [clickedOption, setClickedOption] = useState(new Array(30).fill(false));
  const [clickedOptionIdx, setClickedOptionIdx] = useState(0);
  const [input, setInput] = useState("");
  const [optionRegionList, setOptionRegionList] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const onclickSearchButton = () => {
    for (let i in Object.keys(region)) {
      if(Object.keys(region)[i] === input) {
        setOptionRegionList(Object.values(region)[i]);
        break;
      }
    }
  }

  const onClickCancelOrSaveButton = (option: "cancel" | "save") => {
    if (option === "save") {
      if(idx === 0) {
        setOption(optionRegionList[clickedOptionIdx]);
      } else if(idx === 2) {
        setOption(sector[clickedOptionIdx])
      }
    }
    setIsActive(false)
    setClickedOption(new Array(30).fill(false));
    setOptionRegionList([]);
    setInput("");
  }

  useEffect(() => {
    for(let i = 0; i < clickedOption.length; i++) {
      if(clickedOption[i]) {
        console.log(i);
        setClickedOptionIdx(i);
        break;
      }
    }
  }, [clickedOption])

 return (
  <Container isActive={isActive}>
    <Header>
      <Title>{titleList[idx]} 선택하기</Title>
      <CancelButton src="/images/x.svg" onClick={() => onClickCancelOrSaveButton("cancel")} />
    </Header>
    <Body>
      {idx == 0 && 
        <>
          <SearchBar text={input} onChange={onChange} onClick={onclickSearchButton} placeholder={placeholderList[0]} />
          <OptionList optionList={optionRegionList} clickedOption={clickedOption} setClickedOption={setClickedOption} />
        </> 
      }
      {idx == 2 && 
        <OptionList optionList={sector} clickedOption={clickedOption} setClickedOption={setClickedOption} />
      }
    </Body>
    <SubmitButton onClick={() => onClickCancelOrSaveButton("save")}>저장</SubmitButton>
  </Container>
 );
}