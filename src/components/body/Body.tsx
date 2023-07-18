import styled from "styled-components"
import SecTitle from "../templates/SecTitle";
import StoreList from "../templates/StoreList";
import { Data } from "../../../pages";
import AltItem from "../templates/AltItem";

type BodyProps = {
  data: Data[][];
  secTitle: string;
  getStores: (region: string, key?: string, value?: string) => void;
  queryKey?: string;
  queryValue?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
`

const Morebutton = styled.button`
  margin-top: 20px;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #979797;
  width: 60px;
  padding: 5px;
`

const AltItemList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
`

const AltSecTitle = styled.div`
  width: 180px;
  height: 30px;
  background: #FFFFFF;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 0 24px;
`

const AltLocationButton = styled.div`
  width: 30px;
  height: 30px;
  background: #FFFFFF;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 0 24px;
`

const AltButton = styled.div`
  margin-top: 20px;
  width: 35px;
  height: 15px;
  background: #EFEFEF;
  border-radius: 3px;
`

const arr = Array.from({ length: 10 }); // 요소가 있어야 map 메서드 작동 가능함.

export default function Body({ data, secTitle, getStores, queryKey, queryValue }: BodyProps) {
  return (
    <Container>
      <TopWrapper>
        {
          data.length ? 
          <>
            <SecTitle text={`${secTitle} 근처 가맹점`} />
            <img src="images/crosshair.svg" />
          </>
          :
          <>
            <AltSecTitle />
            <AltLocationButton />
          </>
        }
      </TopWrapper>
      {
        data.length ?
        <>
          {data.map((item, i) => (
            <StoreList data={item} key={i} />
          ))}
          <Morebutton onClick={() => queryKey ? getStores(secTitle, queryKey, queryValue) : getStores(secTitle)}>더보기</Morebutton>
        </>
        : 
        <>
          <AltItemList>
            {arr.map((_, i) => (
              <AltItem key={i} />
            ))}
          </AltItemList>
          <AltButton />
        </>
      }
    </Container>
  );
}