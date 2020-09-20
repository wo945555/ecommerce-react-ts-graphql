export const unique = <T extends object, U extends keyof T>(arr:T[], key:U):T[] => {
  const hash = new Map();
  let uniqueArr:T[] = [];
  arr.forEach((item:T)=>{
    const existSymbol = item[key];
    
    if(!hash.has(existSymbol)) {
      uniqueArr.push(item);
      hash.set(existSymbol, true);
    }
  });
  return uniqueArr;
}