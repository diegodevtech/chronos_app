export function formatSecToMin(seconds: number){
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${min}:${sec}`
}