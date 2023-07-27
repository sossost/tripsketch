export type ReComment = {
  parentId: string;
  comment_id: string;
  created_at: string;
  content: string;
  user: {
    id: string;
    nickName: string;
    profile_img: string;
  };
  likes: number;
  liked_user_list: string[];
  toReply: string;
};
