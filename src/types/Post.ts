export type Post = {
  id: string;
  nickname: string;
  profileImage: string;
  title: string;
  likes: number;
  comments: number;
  countryCode: string;
  country: string;
  createdAt: string;
  image: string;
  isLiked: boolean;
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
