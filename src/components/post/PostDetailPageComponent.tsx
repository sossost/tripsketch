import React, { useCallback, useRef, useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, Animated, Text } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import PostViewContainer from "./PostViewContainer";
import LikesAndCommentText from "./LikesAndCommentText";
import {
  useGetPostAndComments,
  useGetPostAndCommentsForGuest,
} from "../../hooks/usePostQuery";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import DeletePostView from "./components/post/DeletePostView";
import { GetPost } from "../../types/Post";
import Loading from "../UI/Loading";
import PostCommentContainer from "./postCommentContainer";
import CommentViewButton from "./components/comment/CommentViewButton";
import LikesListModal from "./LikesListModal";
import AsyncBoundary from "@components/common/AsyncBoundary";

const PostDetailPageComponent = ({ postId }: { postId: string }) => {
  const { data: userData } = useGetCurrentUser();
  let postAndCommentData: GetPost | null | undefined;
  let postAndCommentLoading;
  let postAndCommentError;

  if (userData) {
    // 로그인된 사용자의 데이터 가져오기
    const userResult = useGetPostAndComments(postId);
    postAndCommentData = userResult.postAndCommentData;
    postAndCommentLoading = userResult.isDataUserLoading;
    postAndCommentError = userResult.isDataUserError;
  } else {
    // 비로그인 상태의 데이터 가져오기
    const guestResult = useGetPostAndCommentsForGuest(postId);
    postAndCommentData = guestResult.postAndCommentGuestData;
    postAndCommentLoading = guestResult.isDataGuestLoading;
    postAndCommentError = guestResult.isDataGuestError;
  }

  // 좋아요 유저리스트 확인 모달
  const [isLikesModal, setIsLikesModal] = useState<boolean>(false);
  const LikesModalHandler = () => {
    setIsLikesModal(!isLikesModal);
  };

  // 바텀시트 높이 조절하는 변수
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "50%", "90%"], []);
  const [sheetIndex, setSheetIndex] = useState(0);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const bottomSheetScrollViewRef: any = useRef(null);
  const handleSheetChange = useCallback((index: number) => {
    setSheetIndex(index);
    Animated.timing(overlayOpacity, {
      toValue: index >= 1 ? 0.5 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  if (postAndCommentLoading) {
    return <Loading />;
  }

  // 삭제된 게시물 요청 시 보여질 부분
  if (!postAndCommentData) {
    return <DeletePostView />;
  }

  return (
    <View style={styles.container}>
      {isLikesModal ? (
        <AsyncBoundary>
          <LikesListModal modalClose={LikesModalHandler} postId={postId} />
        </AsyncBoundary>
      ) : null}
      <View style={styles.containerInner}>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <PostViewContainer
            postId={postId}
            postData={postAndCommentData.tripAndCommentPairDataByTripId.first}
          />
          <LikesAndCommentText
            postId={postId}
            postData={postAndCommentData.tripAndCommentPairDataByTripId.first}
            likesModal={LikesModalHandler}
          />
          <PostCommentContainer
            sort={"preview"}
            postId={postId}
            handleIconPress={(index) => handleSnapPress(index)}
            commentData={
              postAndCommentData.tripAndCommentPairDataByTripId.second
            }
            sheetRef={sheetRef}
            snapPoints={snapPoints}
            handleSheetChange={handleSheetChange}
            bottomSheetScrollViewRef={bottomSheetScrollViewRef}
          />
          <View style={styles.isComment_btn}>
            <CommentViewButton
              text={"댓글 생성 & 전체 댓글보기"}
              activeOpacity={0.8}
              onPress={() => handleSnapPress(1)}
            />
          </View>
        </ScrollView>
        {sheetIndex >= 1 && (
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        )}
      </View>
      <PostCommentContainer
        sort={"all"}
        postId={postId}
        handleIconPress={(index) => handleSnapPress(index)}
        commentData={postAndCommentData.tripAndCommentPairDataByTripId.second}
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
        bottomSheetScrollViewRef={bottomSheetScrollViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    backgroundColor: "white",
  },
  contentContainer: {
    backgroundColor: "white",
    position: "relative",
  },
  isComment_btn: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopColor: "#e9e9e9",
    borderTopWidth: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
    zIndex: 3,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default PostDetailPageComponent;
