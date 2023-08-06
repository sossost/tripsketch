export type Comment = {
  id: string;
  userNickName: string;
  userProfileUrl: string;
  tripId: string;
  parentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[];
  replyTo: string;
  children: Comment[];
};
