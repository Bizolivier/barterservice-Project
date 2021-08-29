export const IMG = imageName => {
  return imageName.startsWith("https")
    ? imageName
    : require(`./images/${imageName}`);
};
