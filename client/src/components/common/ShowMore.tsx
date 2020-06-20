import React, { useState } from 'react';
import './ShowMore.scss';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { classnames } from '../../utils/classnames';

interface Props {
  children: JSX.Element;
}

export const ShowMore:React.FC<Props> = (props) => {
  const { children } = props;
  const [ isEllipsis, setEllipsis ] = useState<boolean>(true);
  return (
    <div className="showmore">
      <div className={classnames('showmore-content',
       { ellipsis: isEllipsis })}>
       { children }
      </div>
      { isEllipsis
        ? <Button className="showmore-btn"
            icon={<DownOutlined />}
            onClick={() => setEllipsis(false)} >
           显示更多内容</Button>
        : <Button className="showmore-btn"
            icon={<UpOutlined />}
            onClick={() => setEllipsis(true)} >
           显示较少内容</Button> }
    </div>
  )
}