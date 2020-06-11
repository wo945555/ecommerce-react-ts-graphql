type clnBasicType = string | undefined;
type clnType = { [cln:string]: boolean|undefined } | clnBasicType;

export const classnames = (...arg:clnType[]) => {
  const cln:string[] = arg.reduce(reducer, []);
  return cln.join(' ');
}

const reducer = (item:string[], next:clnType) => {
  switch(typeof next) {
    case 'string':
      item.push(next.toString());
      break;
    case 'object':
      for(let key in next) {
        next[key] && item.push(key);
      }
  }
  return item;
}

