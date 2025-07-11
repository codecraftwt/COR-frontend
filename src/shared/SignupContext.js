import React, { createContext, useContext, useState, useEffect } from 'react';

const SignupContext = createContext();

export const useSignup = () => useContext(SignupContext);

const defaultSignupData = {
  firstname: '',
  lastname: '',
  company: '',
  locations: [],
  website: [],
  email: '',
  phone: '',
  password: '',
  confirmpassword: '',
  onboardingProgress: 0
};

export const SignupProvider = ({ children }) => {
  // Load from localStorage or use default
  const [signupData, setSignupData] = useState(() => {
    const saved = localStorage.getItem('signupData');
    return saved ? JSON.parse(saved) : defaultSignupData;
  });

  // Save to localStorage whenever signupData changes
  useEffect(() => {
    localStorage.setItem('signupData', JSON.stringify(signupData));
  }, [signupData]);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
}; 