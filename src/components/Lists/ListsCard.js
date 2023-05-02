import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const DetailsCard = styled.div`
  width: 300px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  margin: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const ItemCard = ({ currentItems }) => {
  // handle navigation click event on car card
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/items/${id}`);
  };

  return (
    <CardContainer>
      {currentItems
        && currentItems.map((item) => (
          <DetailsCard
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            aria-hidden="true"
          >
            <ImageContainer>
              <ItemImage
                src={item.images.length > 0 && item.images[0].url}
                alt={item.name}
              />
            </ImageContainer>
            <Description>{item.name}</Description>
          </DetailsCard>
        ))}
    </CardContainer>
  );
};

ItemCard.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

ItemCard.defaultProps = {
  currentItems: [],
};

export default ItemCard;
