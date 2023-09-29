import { Comment } from "./comment";

export type Post = {
  id: string;
  nickname: string;
  profileImageUrl: string;
  title: string;
  likes: number;
  comments: number;
  countryCode: string;
  country: string;
  createdAt: string;
  image: string;
  isLiked: boolean;
  content?: string;
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

export type PostUpdate = {
  id: string;
  nickname: string;
  title: string;
  content: string;
  likes: number;
  views: number;
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
  isHidden: boolean;
  createdAt: string;
  tripLikes: string[];
  images: string[];
  isLiked: boolean;
  isPublic: boolean;
};

export type GetPost = {
  tripAndCommentPairDataByTripId: {
    first: {
      id: string;
      nickname: string;
      title: string;
      content: string;
      likes: number;
      views: number;
      location: string;
      startedAt: string;
      endAt: string;
      hashtag: string[];
      latitude: number;
      longitude: number;
      isPublic: boolean;
      isHidden: boolean;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      images: string[];
      isLiked: boolean;
    };
    second: Comment[];
  };
};

export type PostLike = {
  id: string;
  tripLikesInfo: {
    nickname: string;
    profileImageUrl: string;
  }[];
};
