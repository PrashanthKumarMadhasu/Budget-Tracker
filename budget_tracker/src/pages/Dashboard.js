import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Chart from "../components/Chart";
import Transactions from "../components/Transactions";
import { useNavigate } from "react-router-dom";
import LogoutImage from '../assets/logout-blue.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(2, 27, 44, 0.99);
  padding: 10px 20px 0;
`;

const Title = styled.h2`
  color: white;
  font-size: 1.6rem;
  margin: 0;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    max-width: 35px;
    max-height: 35px;
    object-fit: contain;
  }

  &:focus {
    outline: none; /* Remove focus outline */
  }
`;

const Wrapper = styled.div`
  display: flex;
  background-color: rgba(2, 27, 44, 0.99);
  padding-bottom:10px;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 3;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const Box = styled.div`
  flex: 1;
  padding: 0.2rem 1rem;
  background: rgba(145, 190, 221, 0.99);
  border-radius: 10px;
  box-shadow: 2px 2px 2px #000;
  font-size: 1.2rem;
  font-weight:800;
  text-align: center;
  color: white;
`;

const Header = styled.h3`
  text-align: center;
  color: rgba(1, 28, 46, 0.99);
`;

const Btn = styled.button`
  border:none;
  padding:8px 15px;
  font-size:1rem;
  font-weight:bold;
  border-radius:8px;
  margin-top:10px;
  background-color: rgba(1, 28, 46, 0.99);
  color:white;
  cursor:pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffffff;
    color:rgba(1, 28, 46, 0.99);
    border:1px solid rgba(1, 28, 46, 0.99);
  }
`;
const Dashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ expense: 0 });
  const [budget, setBudget] = useState({ salary: "", estimatedBudget: "" });

  const fetchSummary = async () => {
    try {
      const txs = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transactions = txs.data.transactions;
      const expense = Math.abs(
        transactions.reduce((sum, tx) => sum + tx.amount, 0)
      );
      setSummary({ expense });

      const res = await axios.get("http://localhost:5000/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) setBudget(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (token) fetchSummary();
  }, [token]);

  const updateBudget = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/budget", budget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudget(res.data);
      fetchSummary();
    } catch (err) {
      console.error(err);
    }
  };

  const income = Number(budget.salary) || 0;
  const expense = summary.expense;
  const balance = income - expense;

  return (
    <Container>
      <TopBar>
        <Title>Budget Tracker</Title>
        
        <LogoutButton onClick={logout}><img src={LogoutImage} ></img></LogoutButton>
      </TopBar>

      <Wrapper>
        <Left>
          <Row>
            <Box>
              <Header>Summary</Header>
              <p>Total Income: ₹ {income}</p>
              <p>Total Expense: ₹ {expense}</p>
              <hr></hr>
              <p>Balance: ₹ {balance}</p>
            </Box>
            <Box>
              <Header>Set Budget</Header>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <label htmlFor="salary">income: </label>
                <input
                  id="salary"
                  type="number"
                  placeholder="Salary"
                  value={budget.salary}
                  onChange={(e) =>
                    setBudget({ ...budget, salary: e.target.value })
                  }
                  style={{
                    border: "2px solid black",
                    padding: "5px",
                    fontSize: "15px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    maxWidth: "100px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <label for="budget">budget:  </label>
                <input
                  id="budget"
                  type="number"
                  placeholder="Estimated Budget"
                  value={budget.estimatedBudget}
                  onChange={(e) =>
                    setBudget({ ...budget, estimatedBudget: e.target.value })
                  }
                  style={{
                    border: "2px solid black",
                    padding: "5px",
                    fontSize: "15px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    maxWidth: "100px",
                  }}
                />
              </div>

              <Btn onClick={updateBudget}>Save</Btn>
            </Box>
          </Row>
          <Box style={{ margin: "0 1rem" }}>
            <Header>Budget vs Expenses</Header>
            <Chart
              salary={income}
              estimated={budget.estimatedBudget}
              expense={expense}
            />
          </Box>
        </Left>

        <Right>
          <Transactions refreshSummary={fetchSummary} />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
