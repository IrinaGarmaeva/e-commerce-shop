export const formatISODate = (dateISO: string) =>{
  const date = new Date(dateISO);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const formatUnixTimestamp = (timestamp: number | string) => {
  return new Date(timestamp).toLocaleDateString()
}
