import PropTypes from 'prop-types';
import { Carousel } from 'flowbite-react';
import styled from 'styled-components';

const ImagesContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageItem = styled.img`
  height: 400px;
  object-fit: cover;
  margin: 0 20px;
`;

const ListImages = ({ images, altText }) => (
  <ImagesContainer>
    <Carousel slideInterval={3000}>
      {images && images.map((image) => (
        <ImageItem
          key={altText}
          src={image.url}
          alt={altText || 'Item Image'}
        />
      ))}
    </Carousel>
  </ImagesContainer>
);

ListImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  altText: PropTypes.string.isRequired,
};

ListImages.defaultProps = {
  images: [],
};

export default ListImages;
