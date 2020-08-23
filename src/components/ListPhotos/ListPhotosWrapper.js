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

        cursor: pointer;
        &:hover {
          background-color: #cccccc75;
          .list-photo__grid__item__checkbox {
            display: block;
          }
        }
        &__image {
          width: 100%;
          height: 70%;
          background-color: #ccc3;
          img {
            height: 100%;
          }
        }
        &__info {
          margin-top: 10px;
          p {
            margin: 0;
          }
          &__imageName {
            font-weight: bold;
          }
          &__category {
            font-size: 0.7rem;
          }
        }
        &__checkbox {
          position: absolute;
          width: 100%;
          text-align: left;
          display: none;
          background-image: linear-gradient(#04040440, #10101000);
          &.show {
            display: block;
          }
          input {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
`
