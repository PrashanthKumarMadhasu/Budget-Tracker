import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  StyledSelect,
  StyledOption,
  FilterWrapper,
  StyledInput,
  StyledButton,
} from "../utils/styles";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddTransactionModal = ({ onClose, onAdd, editTx }) => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('bills');

  useEffect(() => {
    if (editTx) {
      setName(editTx.name);
      setAmount(editTx.amount);
      setCategory(editTx.category);
    }
  }, [editTx]);

  const handleSave = async () => {
    const data = { name, amount: parseFloat(amount), category };

    try {
      if (editTx) {
        await axios.put(`http://localhost:5000/api/transactions/${editTx._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/transactions', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onAdd();
      onClose();
    } catch (err) {
      console.error('Failed to save transaction:', err);
    }
  };

  return (
    <Overlay>
      <Modal>
        <h3>{editTx ? 'Edit' : 'Add'} Transaction</h3>
        <StyledInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <StyledInput type="number" placeholder="₹ Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <StyledSelect value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="bills">Bills</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </StyledSelect>
        <StyledButton bg="#2196f3" hover="#1976d2" onClick={handleSave}>{editTx ? 'Update' : 'Save'}</StyledButton>
        
        <StyledButton bg="#f44336" hover="#e53935" onClick={onClose}>Cancel</StyledButton>
      </Modal>
    </Overlay>
  );
};

export default AddTransactionModal;
