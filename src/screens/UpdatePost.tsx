import AuthGuard from "../components/auth/AuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";

const UpdatePost = () => {
  return (
    <AuthGuard>
      <PostPageComponent />
    </AuthGuard>
  );
};

export default UpdatePost;
