import React from 'react';
import RegistrationForm from "./RegistrationForm"
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { auth } = useAuth();
  
  return (
    <>
      <div>
        {auth.role == "admin" ?
          ( <>
            <div align="center">
            <br></br>
            <br></br>
            <h1>Already Logged in as Admin.</h1>
            <br></br>
            <h3>If you wish to register a new account, please logout first.</h3>
            <br></br>
            <br></br>
            </div>
          </> ) : ( <>
          {auth.role == "user" ?
            ( <>
              <div align="center">
              <br></br>
              <br></br>
              <h1>Already Logged in as User.</h1>
              <br></br>
              <h3>If you wish to register a new account, please logout first.</h3>
              <br></br>
              <br></br>
              </div>
              </> ) : ( <>
                <div align="center">
                <br></br>
                <br></br>
                <h1>Register</h1>
                <p>Register for more functions</p>
                <br></br>
                <br></br>
                </div>
                <RegistrationForm />
                <br></br>
                <br></br>
                </> )}
            </> )}
        </div>
      </>
  );
}

export default Register;
