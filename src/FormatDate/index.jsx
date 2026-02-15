const FormatDate = (timezone = 0) => {
  const localDate = new Date(
    new Date().getTime() +
      timezone * 1000 +
      new Date().getTimezoneOffset() * 60000,
  );

  const days = [
    "Bazar",
    "Bazarertəsi",
    "Çərşənbə axşamı",
    "Çərşənbə",
    "Cümə axşamı",
    "Cümə",
    "Şənbə",
  ];
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const hour = localDate.getHours().toString().padStart(2, "0");
  const minut = localDate.getMinutes().toString().padStart(2, "0");
  const day = days[localDate.getDay()];
  const dateNum = localDate.getDate();
  const month = months[localDate.getMonth()];
  const year = localDate.getFullYear();

  return `${hour}:${minut} - ${day}, ${dateNum} ${month} ${year}`;
};

export default FormatDate;
