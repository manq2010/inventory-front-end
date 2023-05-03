import PropTypes from 'prop-types';
import { Carousel } from 'flowbite-react';
// import { Carousel } from 'flowbite';
// import styled from 'styled-components';

// const carousel = new Carousel(items, options);

// const ImagesContainer = styled.div`
//   /* position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center; */
// `;

// const ImageItem = styled.img`
//   /* height: 400px;
//   object-fit: cover;
//   margin: 0 20px; */
// `;

const ListImages = ({ images, altText }) => (
  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">

    <Carousel
      slideInterval={3000}
    >
      {images && images.map((image) => (
        <img
          className="w-full object-cover"
          key={altText}
          src={image.url}
          alt={altText || 'Item Image'}
        />
      ))}
    </Carousel>
  </div>
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
