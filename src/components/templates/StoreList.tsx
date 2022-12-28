import styled from "styled-components"
import StoreItem from "./StoreItem";

type StoreListProps = {
  data: Array<any>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export default function StoreList({ data }: StoreListProps) {
  if(data.length) {
    return (
      <Container>
        {data.map((item, idx) => (
          <StoreItem key={idx} data={item} />
        ))}
      </Container>
    );
  } else {
    return <></>;
  }
}