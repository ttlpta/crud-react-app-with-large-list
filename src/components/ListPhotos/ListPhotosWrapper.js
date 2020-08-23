import styled from 'styled-components'

export default styled.div`
  height: 100%;
  .list-photo {
    &__grid {
      > div {
        position: relative;
        margin: auto;
      }

      &__item {
        text-align: center;
        background-color: #ccc3;
        cursor: pointer;
        &:hover {
          background-color: #cccccc75;
        }
        img {
          height: 100%;
        }
      }
    }
  }
`
