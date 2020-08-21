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
      height: calc(100% - 100px);
      /* padding-bottom: 50px; */
      &__action {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`
