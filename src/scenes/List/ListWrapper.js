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
        }
      }
    }
    &__body {
      height: calc(100% - 80px);
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
        background-color: #131212a6;
        color: #fff;
      }
      /* padding-bottom: 50px; */
      &__action {
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          transform: translateY(99px);
          transition: 0.8s transform;
          &.show {
            transform: translateY(0px);
          }
        }
      }
    }
  }
`
