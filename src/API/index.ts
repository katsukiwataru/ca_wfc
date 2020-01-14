const API_URL = 'https://wfc2-image-api-259809.appspot.com/api';

async function _fetch<T>(path: string): Promise<T> {
  const res = await fetch(API_URL + path);
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  const resJson = await res.json();
  return resJson as T;
}

export const getSerieses = () => {
  return _fetch<{ data: Serieses[] }>('/series');
};

export const getSeries = async (seriesId: string) => {
  return _fetch<Series>(`/series/${seriesId}`);
};

export const getBooks = async (seriesId: string) => {
  return _fetch<Book>(`/books/${seriesId}/`);
};

export default { getSeries, getSerieses, getBooks };
