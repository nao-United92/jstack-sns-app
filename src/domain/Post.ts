export type Post = {
  id: number;
  content: string;
  like: number;
  handle: string;
  image: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  avatorUrl: string | null;
  name: string;
};
