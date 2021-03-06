import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import { SignUp } from '../component/SignUpForm';
import '../CSSsource/SignupPage.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../service/AuthService';

const SignUpPage = () => {
  const [login, setLogin] = useState<boolean>(false);
  const history = useHistory();

  function fetchLogin() {
    const isLoggin = AuthService.isUserLoggedIn();
    setLogin(isLoggin);
  }

  useEffect(() => {
    fetchLogin();
  }, []);

  return (
    <div className="signup-bigframe">
      { login ? history.push('/Home') : null}
      <div className="signup-whiteframe">
        <div className="signup-k-u-people">
          KU People
        </div>
        <div className="signup-plz-text">
          Please sign up or log in before use.
        </div>
        <SignUp />
        <div className="signup-accept-text">
          You already read and accept
        </div>
        <button className="signup-term-text">
          <Link to="/TermOfUse">
            Term of Use Agreement
          </Link>
        </button>
        <Link to='/'>
          <button type="button" className="btn btn-success" id="goBack">
            <div className="eHere">
              &lt; Go Back
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;