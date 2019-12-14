declare type Serieses = {
  title: string;
  seriesId: string;
  author: string;
  publisher: string;
  volumes: number;
  description: string;
  seriesImage: string;
  width: string;
  height: string;
};

declare type Series = {
  title: string;
  author: string;
  publisher: string;
  volumes: number;
  description: string;
  seriesImage: string;
  books: Books[];
  width: string;
  height: string;
};

type Books = {
  id: string;
  image: string;
  title: string;
};
