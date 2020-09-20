import React, { createContext, useEffect } from 'react';
import './App.scss';
import { useWidth } from './utils/customHooks/useWidth'
import { viewport } from './utils/viewport'
import { RouterMap } from './router/router';

export const ViewportContext = createContext({});


export const App:React.FC<{}> = () => {
  const { width } = useWidth();

  useEffect(() => {
    const html = document.querySelector('html'); 
    let fontSize = width /  10;
    if(fontSize > 50) {
      fontSize = 50;
    }
    (html as HTMLHtmlElement).style.fontSize = fontSize + 'px';
  }, [width])

  return (
     <ViewportContext.Provider value={viewport(width)}>
      <RouterMap />
    </ViewportContext.Provider>
   )
}