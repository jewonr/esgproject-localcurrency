import styled from "styled-components"
import SecTitle from "../templates/SecTitle";
import StoreList from "../templates/StoreList";
import { Data } from "../../../pages";

type BodyTypes = {
  data: Array<Data>;
  secTitle: string;
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

export default function Body({ data, secTitle }: BodyTypes) {
  return (
    <Container>
      <TopWrapper>
        {secTitle && <><SecTitle text={`${secTitle} 근처 가맹점`} /><img src="images/crosshair.svg" /></>}
      </TopWrapper>
      <StoreList data={data} />
    </Container>
  );
}