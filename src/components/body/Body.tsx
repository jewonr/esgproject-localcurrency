import styled from "styled-components"
import SecTitle from "../templates/SecTitle";
import StoreList from "../templates/StoreList";

type BodyTypes = {
  data: Array<any>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`

export default function Body({ data }: BodyTypes) {
  return (
    <Container>
      <TopWrapper>
        <SecTitle text="현위치 근처 가맹점" />
        <img src="images/crosshair.svg" />
      </TopWrapper>
      <StoreList data={data} />
    </Container>
  );
}