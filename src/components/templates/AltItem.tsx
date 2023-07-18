import styled from "styled-components";

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

const AltTextBoxSmall = styled.div`
  width: 35px;
  height: 15px;
  background: #EFEFEF;
  border-radius: 3px;
`

const AltTextBoxSmallLeft = styled.div`
  width: 35px;
  height: 15px;
  background: #EFEFEF;
  position: absolute;
  top: 15px;
  left: 15px;
  border-radius: 3px;
`

const AltTextBoxSmallRight = styled.div`
  width: 35px;
  height: 15px;
  background: #EFEFEF;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: 3px;
`

const AltTextBoxSmallBottom = styled.div`
  width: 35px;
  height: 15px;
  background: #EFEFEF;
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 3px;
`

const AltTextBoxMedium = styled.div`
  width: 256px;
  height: 17.5px;
  background: #EFEFEF;
  border-radius: 3px;
`

const AltTextBoxLarge = styled.div`
  width: 200px;
  height: 22.5px;
  background: #EFEFEF;
  border-radius: 3px;
`

export default function AltItem() {
  return (
    <Container>
      <AltTextBoxSmall />
      <AltTextBoxLarge />
      <AltTextBoxMedium />
      <AltTextBoxSmallLeft />
      <AltTextBoxSmallRight />
      <AltTextBoxSmallBottom />
    </Container>
  );
}