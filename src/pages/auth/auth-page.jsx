import React from 'react';

import './auth-page.scss';

const AuthPage = ({ handleAuth }) => (
  <div className="auth-page">
        <button className="custom-button" onClick={handleAuth}>
          Auth with 3box
        </button>
  </div>
);

export default AuthPage;