import React, { useContext, useState, useEffect } from 'react';
import {  Link, useHistory, useLocation } from 'react-router-dom';
import './GameMetaCard.scss';
import { Row, Col, Input, Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { classnames } from '../utils/classnames';
import { ViewportContext } from '../App';
import { Game, Specification, Platform, Rating } from '../api/db-types';
import { imgUrl } from '../config/envconfig';

interface MetaItem {
  label: string;
  value: string | string[] | Platform[] | undefined;
  className: string; 
}

interface Props {
  game: Game;
}

export const GameMetaCard:React.FC<Props> = (props) => {
  const { game } = props;
  const { developer, publisher, release_date, tags, game_rating, specifications } = game;
  const tagNames = tags.map( ({ name }) => name );
  const rating = game_rating.name;
  const platforms: Platform[] = (specifications as Specification[]).map( ({ platform }) => platform );

  const metaItems:MetaItem[] = [{
    label: '开发商',
    value: developer,
    className: 'meta-item-2',
  },{
    label: '发行商',
    value: publisher,
    className: 'meta-item-2',
  },{
    label: '发行日期',
    value: release_date,
    className: 'meta-item-1',
  },{
    label: '标签',
    value: tagNames,
    className: 'meta-item-2',
  },{
    label: '评级',
    value: rating,
    className: 'meta-item-2',
  },{
    label: '平台',
    value: platforms,
    className: 'meta-item-1',
  },]

  return(
    <div id="gameMeta">
      <div className="meta-items">

      </div>
      <div className="about-content"></div>
    </div>
  )
}