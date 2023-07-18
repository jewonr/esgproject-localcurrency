import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../header/SearchBar";
import OptionList from "./OptionList";
import SearchOptionDetail from "./SearchOptionDetail";

type SearchProps = {
  onClickSearchButton: (region: string, idx?: number, input?: string) => void;
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
  justify-content: space-between;
`

const PrimaryOption = styled.div`
  margin: 30px 0 15px 0;
  background: var(--primary-color);
  padding: 15px;
  font-size: 15px;
  color: #FFFFFF;
  border-radius: 5px;
  font-family: 'Spoqa-Bold';
  height: 50px;
`

const SelectedRegion = styled.div`
  margin: 30px 0 15px 0;
  padding: 15px;
  font-size: 15px;
  border-radius: 5px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #EFEFEF;
  width: max-content;
  gap: 15px;
`

const Text = styled.div`
  font-family: 'Spoqa-Bold';
  font-size: 15px;
`

const DeleteButton = styled.img`

`

const optionList = ["가맹점명 검색", "업종별 검색"];

export default function Search({ onClickSearchButton, isActive, setIsActive }: SearchProps) {
  const [input, setInput] = useState("");
  const [clickedOption, setClickedOption] = useState([false, false, false]);
  const [clickedOptionIdx, setClickedOptionIdx] = useState(0);
  const [optionDetailActive, setOptionDetailActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleOnClickSearchButton = () => {
    setIsActive(false);
    if(selectedRegion) {
      for(let i = 0; i < clickedOption.length; i++) {
        if(clickedOption[i] && input) {
          onClickSearchButton(selectedRegion, i, input);
          setInput("");
          return;
        }
      }  
      console.log(selectedRegion);
      onClickSearchButton(selectedRegion);
      setInput("");
      return;
    }
    setInput("");
    return;

  }

  const onClickSelectRegionButton = () => {
    setOptionDetailActive(true);
  }

  const onClickDeleteRegionButton = () => {
    setSelectedRegion("");
  }

  // useEffect(() => {
  //   for(let i = 0; i < clickedOption.length; i++) {
  //     if(clickedOption[i]) {
  //       setClickedOptionIdx(i);
  //       break;
  //     } else {
  //       setInput("");
  //     }
  //   }
  // }, [clickedOption])

  return (
    <Container isActive={isActive}>
      <CancelButton src="/images/x.svg" onClick={() => setIsActive(false)} />
      <SearchBar text={input} onChange={onChange} onClick={handleOnClickSearchButton} placeholder="선택한 옵션에 맞게 검색해보세요" />
      <OptionWrapper>
        <PrimaryOption onClick={onClickSelectRegionButton}>지역 선택</PrimaryOption>
        <OptionList 
          optionList={optionList} 
          clickedOption={clickedOption} 
          setClickedOption={setClickedOption} 
        />
      </OptionWrapper>
      {
        selectedRegion &&  
        <SelectedRegion>
          <Text>{selectedRegion}</Text>
          <DeleteButton src="/images/x.svg" onClick={onClickDeleteRegionButton} />
        </SelectedRegion>
      }
      <SearchOptionDetail isActive={optionDetailActive} setIsActive={setOptionDetailActive} idx={clickedOptionIdx} setOption={setSelectedRegion} />
    </Container>
  );
}