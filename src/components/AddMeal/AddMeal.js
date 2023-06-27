import React, { useState } from 'react';
import './AddMeal.css';
import { useDispatch } from 'react-redux';
import { CartAction } from '../../Reducer/CartReducer';
import axios from 'axios';

const AddMeal = () => {
  const [name, setTitle] = useState('');
  const [details, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [amountError, setAmountError] = useState('');

  const dispatch = useDispatch()

  const handleAddItems = async (e) => {
    e.preventDefault();
    setTitleError('');
    setDescriptionError('');
    setAmountError('');

    let hasError = false;

    if (!name) {
      setTitleError('*');
      hasError = true;
    }

    if (!details) {
      setDescriptionError('*');
      hasError = true;
    }

    if (!amount || isNaN(amount)) {
      setAmountError('*');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const addedItems = {
      id: Math.random() * 100,
      name: name,
      details: details,
      amount: amount
    }
    await axios.post("https://crudcrud.com/api/d24ae34d2de84f0aada52d85676fa40e/items", addedItems);

    // console.log(data);

    const {data: storeItem} = await axios.get("https://crudcrud.com/api/d24ae34d2de84f0aada52d85676fa40e/items") || [];
    
    // const storeItems = storeItem || []

    dispatch(CartAction.addNewItems(storeItem))

    // console.log(getData.data);

    // const storeItems = JSON.parse(localStorage.getItem('meals')) || [];
    // storeItems.push(addedItems);
    // localStorage.setItem("meals", JSON.stringify(storeItems));

    // dispatch(CartAction.addNewItems(addedItems))

    // dispatch(CartAction.addNewItems(getData.data))

    setTitle('');
    setDescription('');
    setAmount('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!e.target.value) {
      setTitleError('*');
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!e.target.value) {
      setDescriptionError('*');
    } else {
      setDescriptionError('');
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (!e.target.value || isNaN(e.target.value)) {
      setAmountError('*');
    } else {
      setAmountError('');
    }
  };

  return (
    <div>
      <div>
        <form className='meal_form'>
          <div className='meal_form_name'>
            <label>Item Name:</label>
            <input type='text' value={name} onChange={handleTitleChange} />
            {titleError && <span style={{ color: 'red' }}>{titleError}</span>}
          </div>
          <div className='meal_form_description'>
            <label>Item details:</label>
            <input type='text' value={details} onChange={handleDescriptionChange} />
            {descriptionError && <span style={{ color: 'red' }}>{descriptionError}</span>}
          </div>
          <div className='meal_form_amount'>
            <label>Item Amount:</label>
            <input type='number' min='1' value={amount} onChange={handleAmountChange} />
            {amountError && <span style={{ color: 'red' }}>{amountError}</span>}
          </div>
          <button onClick={handleAddItems}>Add Items</button>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
