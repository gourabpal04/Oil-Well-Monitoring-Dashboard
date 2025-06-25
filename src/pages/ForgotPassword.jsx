import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ForgotContainer = styled.div`
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
  height: 450px;
  background: rgba(37, 37, 43, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(101, 106, 170, 0.678);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px 0 rgba(101, 106, 170, 0.8);
  }
`;

const ForgotBox = styled.div`
  position: absolute;
  inset: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(37, 37, 43, 0.9) 0%, rgba(35, 35, 40, 0.9) 100%);
  color: #fff;
  box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 30px;
  backdrop-filter: blur(5px);
`;

const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #fff;
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  i {
    color: rgb(75, 129, 155);
    text-shadow: 0 0 5px rgb(86, 156, 189), 0 0 20px rgb(70, 144, 163);
    margin-right: 10px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  outline: none;
  border: none;
  font-size: 0.9em;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(75, 129, 155, 0.5);
    box-shadow: 0 0 15px rgba(75, 129, 155, 0.2);
  }

  &[type="submit"] {
    background: rgb(75, 129, 155);
    border: none;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: 0.5s;
    margin-top: 10px;
    font-size: 1em;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    &:hover {
      background: rgb(86, 156, 189);
      box-shadow: 0 0 30px rgba(75, 129, 155, 0.5);
      transform: translateY(-2px);
    }
  }
`;

const BackToLogin = styled.button`
  all: unset;
  color: rgb(75, 129, 155);
  text-decoration: underline;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;
  text-align: center;

  &:hover {
    color: rgb(86, 156, 189);
    text-shadow: 0 0 10px rgba(75, 129, 155, 0.3);
  }
`;

const Message = styled.div`
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 0.85em;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
  
  ${props => props.type === 'error' && `
    background: rgba(255, 59, 48, 0.1);
    border: 1px solid rgba(255, 59, 48, 0.2);
    color: #ff3b30;
  `}
  
  ${props => props.type === 'success' && `
    background: rgba(52, 199, 89, 0.1);
    border: 1px solid rgba(52, 199, 89, 0.2);
    color: #34c759;
  `}
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(37, 37, 43, 0.95);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(101, 106, 170, 0.678);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const PopupTitle = styled.h3`
  color: #fff;
  font-size: 1.5em;
  margin: 0;
  text-align: center;
`;

const PopupMessage = styled.p`
  color: rgb(75, 129, 155);
  text-align: center;
  margin: 0;
`;

const PopupIcon = styled.i`
  color: rgb(75, 129, 155);
  font-size: 3em;
  margin-bottom: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
  animation: fadeIn 0.3s ease-out;
`;

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.username || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setShowSuccessPopup(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while resetting password');
      console.error('Password reset error:', err);
    }
  };

  return (
    <ForgotContainer>
      <Box>
        <ForgotBox>
          <Title>
            <i className="fa-solid fa-key"></i>
            Reset Password
          </Title>
          
          {error && <Message type="error">{error}</Message>}
          {success && <Message type="success">{success}</Message>}
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
            
            <Input
              type="submit"
              value="Reset Password"
            />
          </Form>
          
          <BackToLogin onClick={() => navigate('/login')}>
            Back to Login
          </BackToLogin>
        </ForgotBox>
      </Box>

      {showSuccessPopup && (
        <>
          <Overlay />
          <SuccessPopup>
            <PopupIcon className="fa-solid fa-check-circle" />
            <PopupTitle>Success!</PopupTitle>
            <PopupMessage>
              Password reset successful!<br />
              Redirecting to login...
            </PopupMessage>
          </SuccessPopup>
        </>
      )}
    </ForgotContainer>
  );
};

export default ForgotPassword; 