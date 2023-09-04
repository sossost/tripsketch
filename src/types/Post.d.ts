export interface PostsData {
  posts: Post[];
  currentPage: number;
  totalPage: number;
  postsPerPage: number;
}

export interface Post {
  id: string;
  title: string;
  images: string[];
  content: string;
  nickname: string;
  views: number;
  location: string;
  likes: number;
  isLiked: boolean;
  hashtag: string[];
  tripLikes: string[];
  hidden: boolean;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  startedAt: string;
  endAt: string;
}
