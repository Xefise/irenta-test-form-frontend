import React from "react";
import Container from "../components/Container/Container";
import OwnershipForm from "../components/ownership_forms/OnwershipForm";

export interface IndexPageProps {
}

function IndexPage({}: IndexPageProps) {
  return <>
    <Container>
      <h1>Тестовое задание iRenta.</h1>
      <OwnershipForm/>
    </Container>
  </>
}

export default IndexPage;
