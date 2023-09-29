import withAuthGuard from "../components/auth/withAuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";

const CreatePost = () => {
  return <PostPageComponent />;
};

export default withAuthGuard(CreatePost);
