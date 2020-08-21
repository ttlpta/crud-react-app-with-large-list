import styled from "styled-components";

export default styled.div`
  position: fixed;
  top: -99px;
  right: 30px;
  height: 30px;

  padding: 10px 30px;
  border-radius: 5px;
  color: white;
  opacity: 0.8;
  text-align: center;
  cursor: pointer;
  z-index: 99999;
  transition: top 0.5s;
  &.show {
    top: 10px;
  }
  &.error {
    background: red;
  }
  &.success {
    background: green;
  }
  &:hover {
    opacity: 0.6;
  }
`;
