import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { getBreeds } from 'features/dogs';

const BreedsTable = () => {
  const { data } = useSelector((state) => state.dogs.breedsTable);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const rows = data?.map((breed) => ({
    id: breed.id,
    name: breed.name,
    origin: breed.origin,
    breed_group: breed.breed_group,
    life_span: breed.life_span,
  }));

  return (
    <Div>
      <ul>
        {rows.map((breed) => (
          <li key={breed.id}>
            <h3>{breed.name}</h3>
            <p>
              Breed group:
              {' '}
              {breed.breed_group}
            </p>
            <p>
              Life span:
              {' '}
              {breed.life_span}
            </p>
            <p>
              Origin:
              {' '}
              {breed.origin}
            </p>
          </li>
        ))}
      </ul>
    </Div>
  );
};

export default BreedsTable;

const Div = styled.div`
  ${({ theme }) => css`
    height: calc(100vh - ${theme.constants.navbarHeight} - ${theme.constants.tableHeadHeight});
  `}
  box-shadow: ${({ theme }) => theme.shadows.light};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
`;
