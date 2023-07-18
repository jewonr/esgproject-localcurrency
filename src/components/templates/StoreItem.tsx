import styled from "styled-components"
import { Data } from "../../../pages";

type StoreItemProps = {
  data: Data;
}

const Container = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0 0 24px;
  background: #FFFFFF;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  position: relative;
`

const Title = styled.div`
  font-size: 18px;
  font-family: 'Spoqa-Bold';
`

const Address = styled.div`
  font-size: 14px;
  color: #979797;
  max-width: 80%;
  max-height: 35px;
  overflow: hidden;
`

const Local = styled.div`
  font-size: 12px;
`

const Industry = styled.div`
  position: absolute;
  font-size: 12px;
  top: 15px;
  left: 15px;
  color: #979797;
`

const Currency = styled.div`
  position: absolute;
  font-size: 12px;
  top: 15px;
  right: 15px;
  color: #979797;
`

const Distance = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: 15px;
  right: 15px;
  color: #979797;
`

export default function StoreItem({ data }: StoreItemProps) {
  return (
    <Container>
      <Local>{data.sggNm}</Local>
      <Title>{data.affiliateNm}</Title>
      <Address>{data.lctnRoadNmAddr}</Address>
      <Industry>{data.sectorNm}</Industry>
      <Currency>{data.localBill}</Currency>
      {data.distance && <Distance>{data.distance}km</Distance>}
    </Container>
  );
}