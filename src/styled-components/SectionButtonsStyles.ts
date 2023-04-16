import styled from 'styled-components';

export const SectionButtonsStyle = styled.div`
  grid-column: 3/ 8;
  grid-row: 3 / 4;
  color: var(--clr-blue);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  gap: 1 rem;

  .container-buttons {
    display: flex;
    gap: 3rem;
  }
  svg {
    overflow: visible;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .btn-reply button {
    background-color: inherit;
    border: none;
    color: var(--clr-blue);
    font-weight: 700;
    cursor: pointer;
    &:disabled {
      color: var(--clr-gray-light);
      cursor: not-allowed;
    }
  }

  .btn-edit {
    color: var(--clr-blue);
  }
  .btn-delete {
    color: var(--clr-red);
  }
`;
