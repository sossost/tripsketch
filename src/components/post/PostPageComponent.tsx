import Loading from "../UI/Loading";
import PostWriteContainer from "./PostWriteContainer";
import useGetPost from "./hooks/useGetPost";

interface PostPageProps {
  updateId?: string;
}

const PostPageComponent = ({ updateId }: PostPageProps) => {
  if (updateId) {
    const { isLoading, data: updateData } = useGetPost(updateId);

    if (isLoading) {
      return <Loading />;
    }
    return <PostWriteContainer updateId={updateId} updateData={updateData} />;
  }

  // updateId가 없는 경우 리턴
  return <PostWriteContainer />;
};

export default PostPageComponent;
