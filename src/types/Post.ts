export type Post = {
  id: string;
  title: string;
  content: string;
  likes: string[];
  views: number;
  loaction: string[];
  start_at: string;
  end_at: string;
  hashtag: string[];
  created_at: string;
  user: {
    id: string;
    nickName: string;
    profile_img: string;
  };
};
