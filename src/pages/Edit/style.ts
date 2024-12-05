import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const Error = styled.p`
  color: red;
  font-size: 14px;
`;

export const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff1a1a;
  }
`;
