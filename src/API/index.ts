const API_URL = 'https://wfc2-image-api-259809.appspot.com/api';

async function _fetch<T>(path: string): Promise<{ res: T | null; error: Error | null }> {
  try {
    const res = await fetch(API_URL + path);
    const json = await res.json();
    if (!res.ok) {
      return { error: json, res: null };
    }
    return { error: null, res: json };
  } catch (error) {
    return { error, res: null };
  }
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
