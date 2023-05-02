import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import './index.css';
import Input from '../../../components/Input/Input';
import Dropdown from '../../../components/Dropdown/Dropdown';
import Images from '../../../components/Images/Images';
import FormErrors from '../../../components/Errors/FormErrors';
import { addItem, resetErrors } from '../itemsSlice';

const AddItem = () => {
  const TYPES = ['Toilets', 'Fridge', 'Car', 'Maintenance', 'Other'];
  const formInfoState = {
    name: null,
    buying_price: null,
    selling_price: null,
    item_quantity: null,
    category: 'Toilets',
    images: [],
    validations: {
      nameValid: null,
      buyingPriceValid: null,
      itemQuantityValid: null,
      sellingPriceValid: null,
      isValid: null,
      formErrors: {
        name: '', buying_price: '', item_quantity: '', selling_price: '',
      },
    },
  };
  const [formInfo, setFormInfo] = useState(formInfoState);
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.items);

  console.log(response);

  useEffect(() => {
    if (response?.item_id) {
      enqueueSnackbar('Item added successfully', {
        variant: 'success',
        TransitionProps: { direction: 'down' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }

    return () => dispatch(resetErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const validateField = (fieldName, fieldValue) => {
    const { formErrors } = formInfo.validations;
    let {
      nameValid, buyingPriceValid, itemQuantityValid, sellingPriceValid,
    } = formInfo.validations;

    switch (fieldName) {
      case 'name':
        nameValid = fieldValue.length >= 3;
        formErrors.name = nameValid ? '' : 'should contain at least 3 characters ';
        break;
      case 'buying_price':
        buyingPriceValid = !Number.isNaN(fieldValue) && fieldValue > 0;
        formErrors.buying_price = buyingPriceValid ? '' : 'should be a number greater than 0';
        break;
      case 'item_quantity':
        itemQuantityValid = !Number.isNaN(fieldValue) && fieldValue > 0;
        formErrors.item_quantity = itemQuantityValid ? '' : 'should be a number greater than 0';
        break;
      case 'selling_price':
        sellingPriceValid = !Number.isNaN(fieldValue) && fieldValue > 0;
        formErrors.selling_price = sellingPriceValid ? '' : 'should be a number greater than 0';
        break;
      default:
        break;
    }

    setFormInfo({
      ...formInfo,
      [fieldName]: fieldValue,
      validations: {
        formErrors,
        nameValid,
        buyingPriceValid,
        itemQuantityValid,
        sellingPriceValid,
        isValid: nameValid && buyingPriceValid && itemQuantityValid && sellingPriceValid,
      },
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInfo.validations.isValid) {
      return;
    }
    const newItem = { ...formInfo };
    delete newItem.validations;
    dispatch(addItem(newItem));
    setFormInfo(
      formInfoState,
    );
  };

  const addImage = () => {
    const newImages = [...formInfo.images, ''];
    setFormInfo({ ...formInfo, images: newImages });
  };

  const deleteImage = (i) => {
    const newImages = [...formInfo.images];
    newImages.splice(i, 1);
    setFormInfo({ ...formInfo, images: newImages });
  };

  const handleImage = (e, index) => {
    const newImages = [...formInfo.images];
    newImages[index] = e.target.value;
    setFormInfo({ ...formInfo, images: newImages });
  };

  // Item form
  const itemForm = () => (
    <>
      <FormErrors
        formErrors={formInfo.validations.formErrors}
      />
      <form onSubmit={handleSubmit}>
        <Input name="Name" type="text" onInput={handleInput} value={formInfo.name} isValid={formInfo.validations.nameValid} />
        <Input name="Item quantity" type="number" onInput={handleInput} value={formInfo.item_quantity} isValid={formInfo.validations.itemQuantityValid} />
        <Input name="Buying price" type="number" onInput={handleInput} value={formInfo.buying_price} isValid={formInfo.validations.buyingPriceValid} />
        <Input name="Selling price" type="number" onInput={handleInput} value={formInfo.selling_price} isValid={formInfo.validations.sellingPriceValid} />
        <Dropdown name="Category" options={TYPES} onDrop={handleInput} value={formInfo.category} />
        <Images
          form={formInfo}
          onAdd={addImage}
          onChange={handleImage}
          onDelete={deleteImage}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );

  return (
    <section id="add_item">
      <div className="form__container">
        {itemForm()}
      </div>
    </section>
  );
};

export default AddItem;
