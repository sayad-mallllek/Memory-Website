import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  .post-container {
    background-color: ${({ theme }) => theme.postContainer};
    border: 1px groove #040F17;
    border-radius: 6px;
    box-shadow: 5px 5px 10px lightblack;
    transition: all 0.50s linear;
  }

  Card {
    background-color: ${({ theme }) => theme.postContainer};
  }
  `
