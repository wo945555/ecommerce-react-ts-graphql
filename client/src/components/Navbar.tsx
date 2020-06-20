import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './Navbar.scss';

export const Navbar:React.FC<{}> = ({}) => {

  return (
    <div className="nav-bar">
      <h1>
        <Link to="/">EPIC STORE</Link>
      </h1>

      <div className="signin-wrap">
        <Button ghost>
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button type="link">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}