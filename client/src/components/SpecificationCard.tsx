import React, { useContext, useState, useEffect } from 'react';
import {  Link, useHistory, useLocation } from 'react-router-dom';
import './Details.scss';
import { Row, Col, Input, Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { classnames } from '../utils/classnames';
import { ViewportContext } from '../App';
import { StoreHeaderDesktop } from '../components/StoreHeaderDesktop';
import { StoreHeaderMobile } from '../components/mobile/StoreHeaderMobile';
import { getGameById } from '../api/api';
import { Specification } from '../api/db-types';
import { imgUrl } from '../config/envconfig';

interface Props {
  specifications: Specification[];
}