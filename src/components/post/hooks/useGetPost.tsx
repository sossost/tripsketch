import { useGetUpdatePost } from "../../../hooks/usePostQuery";

const useGetPost = (postId: string) => {
  const { updateData, postsUpdateIsLoading } = useGetUpdatePost(postId);

  // 데이터 로딩 중인 경우
  if (postsUpdateIsLoading) {
    return { isLoading: true };
  }

  if (!updateData) {
    return { isLoading: false, data: null };
  } else {
    return { isLoading: false, data: updateData };
  }
};

export default useGetPost;
