import styled, { keyframes } from 'styled-components';

const rotateSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoginContent = styled.div`
  justify-content: center;
  border: 1px solid grey;
  box-shadow: 2px 2px 5px 2px gray;
  display: flex;
  flex-direction: column;
  height: 150px;
  position: relative;
  width: 200px;
`;

export const LoginContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: calc(100vh - 20px);
`;

export const LoginInput = styled.input`
  margin: 5px auto;
`;

export const LoginButton = styled.button`
  margin: 5px auto;
  max-width: 100px;
`;

export const Spinner = styled.div`
  animation: ${rotateSpinner} 1.5s linear infinite;
  border: 3px tomato solid;
  border-right: 3px transparent solid;
  border-radius: 50%;
  bottom: 35px;
  height: 15px;
  position: absolute;
  right: 45px;
  width: 15px;
`;

export const ErrorMessage = styled.div`
  color: tomato;
  font-size: 1rem;
  text-align: center;
`;
