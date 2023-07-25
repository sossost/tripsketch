import { ReComment } from "./ReComment";

export type Comment = {
  id: string;
  comment: string;
  create_at: string;
  like: string[];
  parentId: string;
  user: {
    id: string;
    nickName: string;
    profile_img: string;
  };
  children: ReComment[];
};
