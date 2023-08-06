import React, { useCallback, useRef, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import PostView from "../components/post/PostView";
import Comment from "../components/post/Comment";
import Line from "../components/common/Line";
import CommentBest from "../components/post/CommentBest";
import LikesAndCommentText from "../components/post/LikesAndCommentText";
import { Post } from "../types/Post";

const postData: Post = {
  id: "35345",
  title: "프랑스 2일차 여행일기 프랑스 2일차 여행일기 ",
  image: [
    "https://source.unsplash.com/random",
    "https://picsum.photos/200/300",
    "https://source.unsplash.com/random",
  ],
  content:
    "파리로 여행을 다니면서 여행은 어떻게 하는건지, 어떻게 하면 잘하는건지 깨닫게 되는 계기가 있었어욤 :D특히 첫 유럽여행을 마치고 친구들이 어디가 가장 좋았고, 어디가 가장 별로였냐고 물어보면 1초의 고민도 없이 !!가장 좋았던곳은 바르셀로나 별로였던 곳은... 파리라고 얘기했었죠 ~ ",
  likes: ["qfe123", "dger123", "apple34234", "1234"],
  views: 24,
  location: ["48.85840960783098", "2.2948565569020114"],
  startAt: "2023-05-06",
  endAt: "2023-05-12",
  hashtag: ["프랑스", "해외여행"],
  createdAt: "2023-04-03",
  hidden: true,
  user: {
    id: "1234",
    nickName: "파란하늘",
    profile_img: "https://reactnative.dev/img/tiny_logo.png",
  },
};

const TripDetail = () => {
  const [post, setPost] = useState<Post>(postData);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "50%", "90%"], []);

  const [sheetIndex, setSheetIndex] = useState(0);

  const overlayOpacity = useRef(new Animated.Value(0)).current;
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

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <ScrollView>
          <PostView post={post} />
          <LikesAndCommentText post={post} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleSnapPress(1)}
          >
            <CommentBest />
          </TouchableOpacity>
        </ScrollView>
        {sheetIndex >= 1 && (
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        )}
      </View>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        style={styles.sheet}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Comment />
        </BottomSheetScrollView>
      </BottomSheet>
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

export default TripDetail;
