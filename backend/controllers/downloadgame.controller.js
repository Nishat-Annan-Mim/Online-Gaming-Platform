export const getDownloadLink = (req, res) => {
  const playStoreLink = "https://play.google.com/store";
  res.json({ url: playStoreLink });
};
