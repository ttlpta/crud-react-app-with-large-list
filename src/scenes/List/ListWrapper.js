import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  .list {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 3rem;
      height: 60px;
      &__options {
        > * {
          margin: 0px 8px;
          font-family: cursive;
        }
      }
    }
    &__body {
      height: calc(100% - 60px);
      position: relative;
      .loading {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #08080842;
        color: #fff;
        font-size: 1.5rem;
      }
      /* padding-bottom: 50px; */
      &__action {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        left: 0;
        button {
          transform: translateY(99px);
          transition: 0.5s transform;
          padding: 5px 5rem;
          &.show {
            transform: translateY(-39px);
          }
        }
      }
    }
  }
`
