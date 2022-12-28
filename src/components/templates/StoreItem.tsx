import styled from "styled-components"

type StoreItemProps = {
  data: any;
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
      <Local>{data.SIGUN_NM}</Local>
      <Title>{data.CMPNM_NM}</Title>
      <Address>{data.REFINE_ROADNM_ADDR}</Address>
      <Industry>{data.INDUTYPE_NM}</Industry>
      <Distance>10km</Distance>
    </Container>
  );
}