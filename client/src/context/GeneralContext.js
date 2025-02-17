import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');

  const [productSearch, setProductSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get('http://localhost:3001/fetch-cart');
        const userCartItems = response.data.filter(item => item.userId === userId);
        setCartCount(userCartItems.length);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  const handleSearch = () => {
    navigate('#products-body'); // Navigate to product search results or section
  };

  const login = async () => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post('http://localhost:3001/login', loginInputs);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      handleUserNavigation(res.data.usertype);
    } catch (err) {
      console.error('Login failed:', err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:3001/register', {
        username, email, usertype, password, restaurantAddress, restaurantImage
      });
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      handleUserNavigation(res.data.usertype);
    } catch (err) {
      console.error('Registration failed:', err);
      alert("Registration failed. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleUserNavigation = (userType) => {
    switch (userType) {
      case 'customer':
        navigate('/');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'restaurant':
        navigate('/restaurant');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <GeneralContext.Provider value={{
      login, register, logout,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      usertype, setUsertype,
      setRestaurantAddress, setRestaurantImage,
      productSearch, setProductSearch,
      handleSearch, cartCount, fetchCartCount
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
