export type User = {
  nickname: string;
  introduction: string;
  profileImageUrl: string;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
};
