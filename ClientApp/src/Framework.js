export const IMG = imageName => {
  return imageName.startsWith("https")
    ? imageName
    : require(`./images/${imageName}`);
};

export const formatDate = formattedDate => {
  const newFormattedDate = new Date(formattedDate);
  const year = newFormattedDate.getFullYear();
  const date = newFormattedDate.getDate();
  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];
  const monthName = months[newFormattedDate.getMonth()];
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const dayName = days[newFormattedDate.getDay()];
  const formatted = `${dayName}, ${date} ${monthName} ${year}`;
  return formatted;
};

export const formatDateTime = formattedDate => {
  const newFormattedDate = new Date(formattedDate);
  const year = newFormattedDate.getFullYear();
  const date = newFormattedDate.getDate();
  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];
  const monthName = months[newFormattedDate.getMonth()];
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const dayName = days[newFormattedDate.getDay()];
  const hours = newFormattedDate.getHours();
  const minutes = newFormattedDate.getMinutes();

  const formatted = `${dayName}, ${date} ${monthName} ${year} ${hours} : ${minutes}`;

  return formatted;
}
