import styled from 'styled-components';

export const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  [name='textArea'] {
    width: 100%;
    height: 8rem;
    padding: 1rem 1.8rem;
    border-radius: 1rem;
    border: thin solid var(--clr-gray-light);
    resize: none;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--clr-gray);
      font-size: 1rem;
    }
  }
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
  button {
    background-color: var(--clr-blue);
    color: var(--clr-white);
    text-transform: uppercase;
    padding: 0.5rem 1.6rem;
    border-radius: 10px;
    font-size: 1rem;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  background-color: var(--clr-white);
  border-radius: 1rem;
  padding: 1.2rem 1.3rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  .flex-row {
    margin-top: 1rem;
  }
`;
