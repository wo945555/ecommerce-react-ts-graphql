import React, { Fragment }from 'react';
import { WindowsFilled, AppleFilled } from '@ant-design/icons';
import { Platform } from '../../api/db-types';

interface Props {
  platform: 'windows' | 'macOS';
}

export const PlatformIcon:React.FC<Props> = (props) => {
  const { platform } = props;
  const getPlatformIcon = (platform:Platform):JSX.Element => {
    switch(platform){
      case 'windows':
        return <WindowsFilled />
      case 'macOS':
        return <AppleFilled />
    }
  }
  return(
    <Fragment>
      {getPlatformIcon(platform)}
    </Fragment>
  )
}