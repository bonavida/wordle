export const isToday = (someDateInMs: number) => {
  if (!someDateInMs) return false;
  const someDate = new Date(someDateInMs);
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
