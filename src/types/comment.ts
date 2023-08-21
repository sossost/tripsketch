export type Comment = {
  id: string;
  userEmail: string;
  userNickName: string;
  userProfileUrl: string;
  tripId: string;
  parentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  replyTo: string;
  isDeleted: boolean;
  isLiked: boolean;
  numberOfLikes: number;
  children: Comment[];
};
