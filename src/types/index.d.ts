type User = {
  id: string;
  profile_img: string;
  followers: string[];
  followings: string[];
  user_name: string;
  introduction: string;
};

type Diary = {
  title: string;
  content: string;
  location: string;
  thumbnail: string;
  isHidden: boolean;
  date: string;
};
