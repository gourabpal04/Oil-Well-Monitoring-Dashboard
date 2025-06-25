import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the animated login
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #25252b;
  font-family: "Poppins", sans-serif;
`;

const Box = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
  background: rgba(37, 37, 43, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(101, 106, 170, 0.678);
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  z-index: 1;
  animation: pulseShadow 2s ease-in-out infinite;

  &:hover {
    width: 450px;
    height: 500px;
  }

  &:hover .login {
    inset: 40px;
  }

  &:hover .loginBx {
    transform: translateY(0px);
  }

  @keyframes pulseShadow {
    0%, 100% {
      box-shadow: 0 8px 32px 0 rgba(101, 106, 170, 0.678);
    }
    50% {
      box-shadow: 0 16px 64px 0 rgba(101, 106, 170, 1);
    }
  }
`;

const LoginBox = styled.div`
  position: absolute;
  inset: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background: #00000033;
  color: #fff;
  z-index: 1000;
  box-shadow: inset 0 10px 20px #00000080;
  border-bottom: 2px solid #ffffff80;
  transition: 0.5s;
  overflow: hidden;
`;

const LoginForm = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  transform: translateY(150px);
  transition: 0.5s;
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #fff;
  font-size: 1.5em;
  margin-bottom: 20px;
  
  i {
    color:rgb(75, 129, 155);
    text-shadow: 0 0 5pxrgb(86, 156, 189), 0 0 20pxrgb(70, 144, 163);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  outline: none;
  border: none;
  font-size: 1em;
  color: #fff;
  background: #0000001a;
  border: 2px solid #fff;
  border-radius: 30px;

  &::placeholder {
    color: #999;
  }

  &[type="submit"] {
    background: rgb(75, 129, 155);
    border: none;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      box-shadow: 0 0 30px rgb(75, 129, 155), 0 0 30px rgb(75, 129, 155);
    }
  }
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LinkButton = styled.button`
  all: unset;
  color: rgb(55, 117, 146);
  text-decoration: underline;
  font-size: 1em;
  cursor: pointer;

  &:nth-child(2) {
    font-weight: 600;
  }

  &:hover, &:focus, &:active {
    all: unset;
    color: rgb(55, 117, 146);
    text-decoration: underline;
    font-size: 1em;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color:rgb(55, 117, 146);
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9em;
  width: 100%;
  text-align: center;
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', data.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <LoginContainer>
      <Box>
        <LoginBox className="login">
          <LoginForm className="loginBx">
            <Title>
              <i className="fa-solid fa-right-to-bracket"></i>
              {' '}Login
            </Title>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            
            <Input
              type="submit"
              value="Sign in"
              onClick={handleSubmit}
            />
            
            <Group>
              <LinkButton onClick={handleForgotPassword}>
                Forgot Password
              </LinkButton>
              <LinkButton onClick={handleSignUp}>
                Sign up
              </LinkButton>
            </Group>
          </LoginForm>
        </LoginBox>
      </Box>
    </LoginContainer>
  );
};

export default Login; 