export type Post = {
  id: string;
  title: string;
  image: string[];
  content: string;
  likes: string[];
  views: number;
  location: string[];
  startAt: string;
  endAt: string;
  hashtag: string[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  hidden: boolean;
  user: {
    id: string;
    nickName: string;
    profile_img: string;
  };
};
