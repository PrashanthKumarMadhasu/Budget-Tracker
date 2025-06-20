import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserImage from '../assets/user.png';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:rgb(228, 227, 199);
`;

const Box = styled.div`
  position: relative;
  padding: 2rem;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    border-radius: 12px;
    background: linear-gradient(45deg, #ff6b6b, #f7d794,rgb(145, 204, 106),rgb(226, 135, 226));
    background-size: 400% 400%;
    animation: gradientBorder 5s ease infinite;
  }

  @keyframes gradientBorder {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledInputField = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(61, 60, 60, 0.24);
  background-color: #fff;
  font-size: 18px;
  color: black;
  outline: none;

  &:focus {
    border-color:rgb(76, 172, 175);
    box-shadow: 0 0 3px rgb(36, 134, 126);
  }
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: rgb(64, 158, 235);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(47, 121, 182);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 3px rgb(64, 158, 235);
  }
`;


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(res.data.token);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Container>
      <Box>
        <h1 style={{ textAlign: "center" }}><img src={UserImage} width={100} ></img></h1>
        <StyledInputField
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton onClick={handleSubmit}>Login</StyledButton>
      </Box>
    </Container>
  );
};

export default Login;
