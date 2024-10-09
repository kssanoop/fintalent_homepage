import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimatedContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 3s ease-in-out forwards;
`;
