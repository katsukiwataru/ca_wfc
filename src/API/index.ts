export const getSerieses = async () => {
  const apiServer = 'https://wfc2-image-api-259809.appspot.com/api/series/';
  const res = await fetch(apiServer);
  const resJson = await res.json();
  return resJson;
};

export const getSeries = async (id: string) => {
  const apiServer = `https://wfc2-image-api-259809.appspot.com/api/series/${id}/`;
  const res = await fetch(apiServer);
  const resJson = await res.json();
  return resJson;
};

export default { getSeries, getSerieses };
