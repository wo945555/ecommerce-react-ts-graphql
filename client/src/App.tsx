import React, { createContext } from 'react';
import { useWidth } from './utils/customHooks/useWidth'
import {  MOBILE_WIDTH } from './config/constant'
import { RouterMap } from './router/router';

export const ViewportContext = createContext({});

export const App:React.FC<{}> = () => {
  const { width } = useWidth();
  
  return (
     <ViewportContext.Provider value={(width>MOBILE_WIDTH)? 'desktop': 'moblie'}>
      <RouterMap />
    </ViewportContext.Provider>
   )
}