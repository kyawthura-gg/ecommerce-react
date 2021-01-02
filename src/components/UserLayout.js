import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default UserLayout;
