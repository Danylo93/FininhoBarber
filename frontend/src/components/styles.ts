import styled from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  label {
    display: inline-block;
    margin-right: 8px;
  }

  input[type='checkbox'] {
    appearance: none;
    width: 40px;
    height: 20px;
    position: relative;
    border-radius: 20px;
    background-color: #ccc;
    transition: background-color 0.3s ease-in-out;

    &:checked {
      background-color: #5bc0de;
    }

    &:focus {
      outline: none;
    }

    &::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: white;
      top: 2px;
      left: 2px;
      transition: transform 0.3s ease-in-out;
    }

    &:checked::before {
      transform: translateX(20px);
    }
  }
`;
