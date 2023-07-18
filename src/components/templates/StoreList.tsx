import styled from "styled-components"
import StoreItem from "./StoreItem";

type StoreListProps = {
  data: Array<any>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
  width: 100%;
`

export default function StoreList({ data }: StoreListProps) {
  return (
    <Container>
      {data.map((item, idx) => (
        <StoreItem key={idx} data={item} />
      ))}
    </Container>
  )
}