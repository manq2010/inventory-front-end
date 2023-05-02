import { useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { BiLeftArrow } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ListsImage from './ListsImage';
import { getItem } from '../../features/items/itemsSlice';

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  padding: 16px;
  background-color: #f5f5f5;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin-top: 64px;
  }
`;

const ItemDetailsImage = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

const ItemTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const ItemDetailsInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItemInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => (props.isEven ? '#f5f5f5' : 'transparent')};
`;

const ItemInfoTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ItemInfoText = styled.p`
  font-size: 18px;
  font-weight: normal;
  margin: 0;
`;

const AddToSaleBtn = styled.button`
  background-color: #98bf11;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #79a60a;
  }
`;

const ListDetails = () => {
  const { id } = useParams();
  const { item, isLoading } = useSelector((state) => state.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem(id));
  }, [dispatch, id]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/reserve/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
          <PuffLoader color="#98BF11" size={80} speedMultiplier={1} />
        </div>
      ) : (
        <>
          <div
            role="presentation"
            onClick={() => window.history.back()}
            className="absolute top-4 xs:top-4 sm:top-8 md:top-auto md:bottom-12 left-0 px-5 py-4 bg-[#98BF11] rounded-r-full cursor-pointer hover:bg-lime-600 duration-150 ease-in"
          >
            <BiLeftArrow fill="#fff" size={24} />
          </div>
          <ItemDetails>
            <ItemDetailsImage>
              <ListsImage images={item?.images} altText={item?.name} />
            </ItemDetailsImage>
            <ItemDetailsInfo>
              <ItemTitle>
                <span>{item?.name}</span>
              </ItemTitle>
              <ItemInfoRow>
                <ItemInfoTitle>selling_price:</ItemInfoTitle>
                <ItemInfoText>{item?.selling_price}</ItemInfoText>
              </ItemInfoRow>
              <ItemInfoRow>
                <ItemInfoTitle>category:</ItemInfoTitle>
                <ItemInfoText>{item?.category}</ItemInfoText>
              </ItemInfoRow>
              <ItemInfoRow>
                <ItemInfoTitle>item_quantity:</ItemInfoTitle>
                <ItemInfoText>{item?.item_quantity}</ItemInfoText>
              </ItemInfoRow>
              <AddToSaleBtn onClick={() => handleClick(id)}>
                Add to Sale
              </AddToSaleBtn>
            </ItemDetailsInfo>
          </ItemDetails>
        </>
      )}
    </>

  );
};

export default ListDetails;
