import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { Button, Menu, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ViewportContext } from '../App';

export const Navbar:React.FC<{}> = () => {
  const viewport  = useContext(ViewportContext);

  //desktop or tablet
  const SigninD:JSX.Element = (
    <Fragment>
      <Button ghost>
        <Link to="/signin">Sign In</Link>
      </Button>
      <Button type="link">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </Fragment>
  )

  //phone 
  const menu:JSX.Element = (
    <Menu>
      <Menu.Item key="signin">
        <Link to="/signin">Sign In</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link to="/signup">Sign Up</Link>
      </Menu.Item>
    </Menu>
  )
  const SigninP:JSX.Element = (
    <Dropdown overlay={menu}>
      <MenuOutlined className="menu-icon" />
    </Dropdown>
  )
  return (
    <div className="nav-bar">
      <div className="prop-nav">
        <div className="logo-wrap">
            <Link to="/">
              <i className="logo"></i>
            </Link>            
          </div>
        <h1>
          <Link to="/">EPIC STORE</Link>
        </h1>
      </div>
      <div className="signin-wrap">
        { (viewport === 'phone') 
        ? SigninP
        : SigninD }
      </div>
    </div>
  )
}