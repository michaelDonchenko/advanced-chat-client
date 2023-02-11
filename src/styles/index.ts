import {createGlobalStyle} from "styled-components";

const styles = createGlobalStyle<{isModalOpen: boolean}>`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Courier New', Courier, monospace;
    color: ${({theme}) => theme.palette.text}
  }
  #root {
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.palette.background.main};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: ${(props) => (props.isModalOpen ? "opacity(0.9)" : "opacity(1)")};
    filter:${(props) => (props.isModalOpen ? "blur(2px)" : "blur(0)")};
    transition: filter 0.5s;
  }
  h1 {
    font-size: 30px;
    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
      font-size: 28px;
    }
  }
  h2 {
    font-size: 22px;
    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
      font-size: 20px;
    }
  }
  h3 {
    font-size: 18px;
    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
      font-size: 16px;
    }
  }
  p {
    font-size: 16px;
    @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
      font-size: 14px;
    }
  }
`;

export default styles;
