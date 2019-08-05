import styled from 'styled-components';

export const HomeContent = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-rows: repeat(auto-fill, 1fr);
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 20px;
`;

export const LogoutButton = styled.button`
  background-color: tomato;
  border-radius: 20px;
  bottom: 32px;
  color: #FFF;
  cursor: pointer;
  font-size: 1.1rem;
  position: fixed;
  right: 32px;
`;
