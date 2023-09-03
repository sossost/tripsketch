import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../types/RootStack";
import { QUERY_KEY } from "../react-query/queryKey";
import { followUser, unfollowUser } from "../services/user";
import { User } from "../types/user";

interface SocialControllerInSocialPageProps {
  currentUser: User | null;
  pageOwnerNickname: string;
  variant: "팔로워" | "팔로잉";
}

export const useSocialControllerInSocialPage = ({
  currentUser,
  pageOwnerNickname,
  variant,
}: SocialControllerInSocialPageProps) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<StackNavigation>();

  const queryKey =
    variant === "팔로워" ? QUERY_KEY.FOLLOWERS : QUERY_KEY.FOLLOWING;

  const followMutation = useMutation(
    async (nickname: string) => {
      await followUser(nickname);
    },
    {
      onMutate: (targetNickname) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          queryKey,
          pageOwnerNickname,
        ]);

        const newData = prevData?.map((user) => {
          if (user.nickname === targetNickname) {
            return { ...user, isFollowing: true };
          }
          return user;
        });
        queryClient.setQueryData([queryKey, pageOwnerNickname], newData);
      },
      onSuccess: () => {
        console.log("팔로우 성공");
      },
      onError: () => {
        console.log("팔로우 실패");
      },
    }
  );

  const unfollowMutation = useMutation(
    async (nickname: string) => {
      await unfollowUser(nickname);
    },
    {
      onMutate: (targetNickname) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          queryKey,
          pageOwnerNickname,
        ]);

        const newData = prevData?.map((user) => {
          if (user.nickname === targetNickname) {
            return { ...user, isFollowing: false };
          }
          return user;
        });
        queryClient.setQueryData([queryKey, pageOwnerNickname], newData);
      },
      onSuccess: () => {
        console.log("언팔로우 성공");
      },
      onError: () => {
        console.log("언팔로우 실패");
      },
    }
  );

  /** 팔로우 버튼 핸들러 */
  const followBtnHandler = async (nickname: string, isFollowing: boolean) => {
    if (!currentUser) {
      navigation.navigate("KakaoLoginPage");
      return;
    }

    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(nickname);
      } else {
        await followMutation.mutateAsync(nickname);
      }
      queryClient.invalidateQueries([queryKey, pageOwnerNickname]);
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
      queryClient.invalidateQueries([
        QUERY_KEY.FOLLOWING,
        currentUser.nickname,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return followBtnHandler;
};

interface SocialControllerInUserPageProps {
  currentUser: User | null;
  pageOwner: User;
}

export const useSocialControllerInUserPage = ({
  currentUser,
  pageOwner,
}: SocialControllerInUserPageProps) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<StackNavigation>();

  const followMutation = useMutation(
    async (pageOwner: User) => {
      await followUser(pageOwner.nickname);
    },
    {
      onMutate: (pageOwner) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          QUERY_KEY.FOLLOWING,
          currentUser!.nickname,
        ]);

        const newData = [...(prevData ?? []), pageOwner];
        queryClient.setQueryData(
          [QUERY_KEY.FOLLOWING, currentUser!.nickname],
          newData
        );
      },
      onSuccess: () => {
        console.log("팔로우 성공");
      },
      onError: () => {
        console.log("팔로우 실패");
      },
    }
  );

  const unfollowMutation = useMutation(
    async (pageOwner: User) => {
      await unfollowUser(pageOwner.nickname);
    },
    {
      onMutate: (pageOwner) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          QUERY_KEY.FOLLOWING,
          currentUser!.nickname,
        ]);

        const newData = prevData?.filter((user) => {
          return user.nickname !== pageOwner.nickname;
        });
        queryClient.setQueryData(
          [QUERY_KEY.FOLLOWING, currentUser!.nickname],
          newData
        );
      },
      onSuccess: () => {
        console.log("언팔로우 성공");
      },
      onError: () => {
        console.log("언팔로우 실패");
      },
    }
  );

  /** 팔로우 버튼 핸들러 */
  const followBtnHandler = async (isFollowing: boolean) => {
    if (!currentUser) {
      navigation.navigate("KakaoLoginPage");
      return;
    }

    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(pageOwner);
      } else {
        await followMutation.mutateAsync(pageOwner);
      }
      queryClient.invalidateQueries([QUERY_KEY.USER, pageOwner.nickname]);
      queryClient.invalidateQueries([
        QUERY_KEY.FOLLOWING,
        currentUser.nickname,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return followBtnHandler;
};
