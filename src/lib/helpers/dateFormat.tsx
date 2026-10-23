export const BanglaDate = () => {
  const today = new Date();
  const dateInBang = new Intl.DateTimeFormat('bn-BD', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dhaka',
  }).format(today);
  return dateInBang;
};
