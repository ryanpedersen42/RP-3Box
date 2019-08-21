import React from 'react';

import './auth-page.scss';

const AuthPage = ({ handleLogin }) => (
  <div className="auth-page">
        <button className="custom-button" onClick={handleLogin}>
          Auth with 3box
        </button>
  </div>
);

export default AuthPage;