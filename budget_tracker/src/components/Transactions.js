import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import AddTransactionModal from "./AddTransactionModal";
import {
  StyledSelect,
  StyledOption,
  FilterWrapper,
  StyledInput,
  StyledButton,
  StyledDeleteIcon,
  StyledEditIcon,
} from "../utils/styles";

const Box = styled.div`
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 10px;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tx = styled.div`
  padding: 1rem;
  background: white;
  margin: 0.5rem 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(214, 233, 231);
    font-size: 1.3rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PlusButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 22px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(46, 77, 47);
    font-size: 28px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#012c45" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #012c45;
    color: white;
  }
`;

export const InputField = styled.input`
  padding: 0px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 16px;
  color: black;
  outline: none;
  height: 38px;

  &:focus {
    border-color:rgb(76, 172, 175);
    box-shadow: 0 0 3px rgb(76, 168, 175);
  }
`;

const Transactions = ({ refreshSummary }) => {
  const { token } = useAuth();
  const [txs, setTxs] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ category: "", amount: "", date: "" });
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const fetchTxs = async () => {
    const params = { ...filter, page };
    const res = await axios.get("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    setTxs(res.data.transactions);
    setTotal(res.data.total);
    refreshSummary();
  };

  useEffect(() => {
    fetchTxs();
  }, [page, filter]);

  const deleteTx = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTxs();
  };

  return (
    <Box>
      <Row>
        <FilterWrapper>
          <h4> filter by</h4>
          <StyledSelect
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <StyledOption value="">All</StyledOption>
            <StyledOption value="bills">Bills</StyledOption>
            <StyledOption value="groceries">Groceries</StyledOption>
            <StyledOption value="entertainment">Entertainment</StyledOption>
            <StyledOption value="others">Others</StyledOption>
          </StyledSelect>
        </FilterWrapper>
        <InputField
          type="number"
          placeholder="Min Amount"
          onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
        />
        <InputField
          type="date"
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        {/* <StyledButton bg="#f44336" hover="#e53935" onClick={fetchTxs}>Filter</StyledButton> */}
        <PlusButton
          onClick={() => {
            setEditTx(null);
            setShowModal(true);
          }}
        >
          +
        </PlusButton>
      </Row>

      <ScrollableList>
        {txs.map((tx) => (
          <Tx key={tx._id}>
            {tx.name} - ₹{tx.amount} ({tx.category})
            <Controls>
              <StyledEditIcon
                onClick={() => {
                  setEditTx(tx);
                  setShowModal(true);
                }}
              />
              <StyledDeleteIcon onClick={() => deleteTx(tx._id)} />
            </Controls>
          </Tx>
        ))}
      </ScrollableList>

      <Pagination>
        {Array.from({ length: Math.ceil(total / 7) }, (_, i) => (
          <PageButton
            key={i}
            onClick={() => setPage(i + 1)}
            active={page === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>

      {showModal && (
        <AddTransactionModal
          onClose={() => {
            setShowModal(false);
            setEditTx(null);
          }}
          onAdd={fetchTxs}
          editTx={editTx}
        />
      )}
    </Box>
  );
};

export default Transactions;
