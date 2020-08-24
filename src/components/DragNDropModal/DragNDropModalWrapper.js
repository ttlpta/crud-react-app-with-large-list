import styled, { keyframes } from 'styled-components'

const animatetop = keyframes`
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
`

export default styled.div`
  display: ${props => (props.show ? 'block' : 'none')}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 75px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  .modal {
    &__content {
      position: relative;
      background-color: #fefefe;
      margin: auto;
      padding: 0;
      border: 1px solid #888;
      width: 40%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
      animation-name: ${animatetop};
      animation-duration: 0.4s;
    }
    &__header {
      padding: 2px 16px;
      .close {
        float: right;
        font-size: 30px;
        &:hover,
        &:focus {
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
    &__body {
      padding: 2px 16px;
      .dropNdrag {
        display: flex;
        flex-direction: column;
        &__area {
          position: relative;
          text-align: center;
          border: 1px dashed #ccc;
          &.has-error {
            color: red;
            border-color: red;
          }
          &.dragover {
            background-color: #ece9e9;
          }
          .files {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            /* left: 0; */
            background: red;
            width: 100%;
            opacity: 0;
            z-index: 1;
          }
          p {
            margin: 40px 0px;
          }
        }
        &__display-files {
          display: flex;
          height: 250px;
          margin-top: 20px;
          flex-wrap: wrap;
          overflow-y: auto;
          overflow-x: hidden;
          .no-file-select {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
          }
          .previewImg {
            max-width: 40px;
            margin-right: 10px;
            &:hover {
              cursor: pointer;
              opacity: 0.6;
            }
          }
        }
      }
    }
    &__footer {
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
`
