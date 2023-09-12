// export type Post = {
//   id: string;
//   nickname: string;
//   title: string;
//   content: string;
//   likes: number;
//   views: number;
//   location: string[];
//   startedAt: string;
//   endAt: string;
//   hashtag: string[];
//   hidden: boolean;
//   createdAt: string;
//   tripLikes: string[];
//   images: string[];
//   isLiked: boolean;
//   public: boolean;
// };

export type Post = {
  isLiked: boolean;
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
  hidden: boolean;
  user: {
    id: string;
    nickName: string;
    profile_img: string;
  };
};

export type CreatePost = {
  title: string;
  content: string;
  location: string;
  startedAt: string;
  endAt: string;
  latitude: number;
  longitude: number;
  hashtagInfo: {
    countryCode: string;
    country: string;
    city: string;
    municipality: string;
    name: string;
    displayName: string;
    road: string;
    address: string;
    etc: string[];
  };
  isPublic: boolean;
  images: [];
};
