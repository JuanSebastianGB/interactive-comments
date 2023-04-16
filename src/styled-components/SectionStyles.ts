import styled from 'styled-components';

export const SectionStyles = styled.div`
  &.is-reply {
    margin-left: 2rem;
  }
  display: grid;
  grid-template-columns: 65px repeat(6, 1fr);
  border-radius: 1rem;
  padding: 1.2rem;
  font-size: 1.2rem;
  min-width: 100%;
  margin: 0 auto;
  background-color: var(--clr-white);
  .color-blue {
    color: var(--clr-blue);
  }
  .header {
    grid-column: 1 / 8;
    grid-row: 1 / 2;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 1.2rem;
    span {
      color: var(--clr-gray);
    }
    figure {
      width: 2.5rem;
    }
    img {
      width: 100%;
    }
    .you {
      color: var(--clr-white);
      background-color: var(--clr-blue);
      padding: 0.2rem 0.7rem;
    }
  }
  .content {
    grid-column: 1 / 8;
    grid-row: 2 / 3;
    margin: 1rem 0;
    color: var(--clr-gray);
  }
  .control {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 0.3rem;
    background-color: #f5f6fa;
    & > button {
      width: 2rem;
      height: 2rem;
      color: var(--clr-gray-light);
      background-color: inherit;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
    }
    & > span {
      color: var(--clr-blue);
      font-weight: 700;
    }
  }

  .section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .username {
    color: var(--clr-dark);
    font-weight: 700;
  }

  @media (min-width: 750px) {
    .header {
      grid-column: 2 / 6;
      grid-row: 1 / 2;
    }
    .content {
      grid-column: 2 / 8;
      grid-row: 2 / 3;
    }
    .reply {
      grid-column: 6 / 8;
      grid-row: 1/ 2;
    }
    .control {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
      display: flex;
      flex-direction: column;
      max-width: 45%;
      height: 80%;
    }
  }

  @media (min-width: 800px) {
    max-width: 800px;
  }
`;
