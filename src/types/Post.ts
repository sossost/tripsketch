export type Post = {
  id: string;
  nickname: string;
  title: string;
  content: string;
  likes: number;
  views: number;
  location: string[];
  startedAt: string;
  endAt: string;
  hashtag: string[];
  hidden: boolean;
  createdAt: string;
  tripLikes: string[];
  images: string[];
};
