import React from "react";
import {Link} from "@/components/link";
import styled from "styled-components";
import {AuthForm} from "@/components/forms/authForm";

const Register = () => {
  return (
    <Container>
      <Title>Create a new account</Title>
      <AuthForm type="register" />
      <Link href="/login">Already have an account? login</Link>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({theme}) => theme.palette.background.dark};
  max-width: 500px;
  min-height: 500px;
  border-radius: 10px;
  padding: 12px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`;

export default Register;
