const FormatDate = () => {
const date = new Date();
    
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
    
      const hour = date.getHours().toString().padStart(2, "0");
      const minut = date.getMinutes().toString().padStart(2, "0");
      const day = days[date.getDay()];
      const dateNum = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
    
      return `${hour}:${minut} - ${day}, ${dateNum} ${month} ${year}`;
    
}

export default FormatDate