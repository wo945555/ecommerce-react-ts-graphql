interface Bp {
  viewport: string;
  maxWidth: number;
} 
export const viewport = (width:number) => {
  const breakpoints:Bp[] = [{
    viewport: 'phone', maxWidth: 768},{
    viewport: 'tablet', maxWidth: 1024},{
    viewport: 'desktop', maxWidth: 15360}];
  const bp = breakpoints.find(({ maxWidth }) => width <= maxWidth) || breakpoints[2];
  return (bp as Bp).viewport;
}