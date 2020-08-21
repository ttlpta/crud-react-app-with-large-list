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
        img {
          height: 100%;
        }
      }
    }
  }
`
