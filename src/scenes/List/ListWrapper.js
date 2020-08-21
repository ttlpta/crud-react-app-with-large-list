import styled from 'styled-components'

export default styled.div`
  padding: 1rem 3rem;
  .list {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__options {
        > * {
          margin: 0px 8px;
        }
      }
    }
  }
`
