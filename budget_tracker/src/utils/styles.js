import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  outline: none;
  cursor: pointer;
  appearance: none;

  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='gray' viewBox='0 0 20 20'><path d='M5.516 7.548l4.49 4.49 4.49-4.49L15.5 8.5 10 14 4.5 8.5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;

  padding-right: 40px;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 3px #4caf50;
  }
`;

export const StyledOption = styled.option`
  color: #333;
  padding: 10px;
  font-size:0.8rem;
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items:center;
`;
export const StyledInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 15px;
  color: black;
  outline: none;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 3px #4caf50;
  }
`;

export const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.bg || '#4caf50'};
  color: ${(props) => props.color || 'white'};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hover || props.bg || ' #45a049'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px ${(props) => props.bg || ' #4caf50'};
  }
`;

export const StyledDeleteIcon = styled(MdDelete)`
  color: red;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color:rgb(187, 5, 35);
    transform: scale(1.2);
  }
`;

export const StyledEditIcon = styled(FaEdit)`
  color: #1976d2;
  font-size: 20px;
  cursor: pointer;
  margin-right: 8px;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: #0d47a1;
    transform: scale(1.2);
  }
`;