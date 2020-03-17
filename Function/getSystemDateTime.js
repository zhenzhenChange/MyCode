const getSystemDateTime = () => {
  let date = new Date();
  let day = date.getDate();
  let hours = date.getHours();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (day >= 0 && day <= 9) day = "0" + day;
  if (month >= 1 && month <= 9) month = "0" + month;
  if (hours >= 0 && hours <= 9) hours = "0" + hours;
  if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;
  if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default getSystemDateTime;
