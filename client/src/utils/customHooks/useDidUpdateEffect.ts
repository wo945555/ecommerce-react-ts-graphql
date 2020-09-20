import React, { useEffect, useRef } from 'react'

export const useDidUpdateEffect = (fn:React.EffectCallback, deps:React.DependencyList = []) => {
  const firstMount = useRef(true);
  
  useEffect(() => {
    if(firstMount.current) {
      firstMount.current = false;
      return;
    }else {
      fn && fn();
    } 
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}