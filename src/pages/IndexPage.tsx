import React from "react";
import Container from "../components/Container/Container";

export interface IndexPageProps {
}

function IndexPage({}: IndexPageProps) {
  return <>
    <Container>
      <h1 className="accent_text_color">Test <span>slyles!</span></h1>
      <h2>Im h2!</h2>
      <button className="btn">button</button>
      <a href="/">link</a>
    </Container>
  </>
}

export default IndexPage;
