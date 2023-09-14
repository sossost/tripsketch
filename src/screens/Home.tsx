// @ts-ignore

import React, { useRef } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PostCard from "../components/post/card/PostCard";
import { Text } from "react-native";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { diaries } from "../../data/mockdata";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCurrentUser, getUserInfo } from "../services/user";

const Home = ({ navigation }: any) => {
  let loggedIn = false;
  const scrollViewRef = useRef<ScrollView>(null);

  const onPress = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
    });
  };

  // 액세스 갱신 확인용 핸들러
  const getUserInfoHandler = async () => {
    const userInfo = await getCurrentUser();
    console.log("userInfo", userInfo);
  };

  const countryCode = "kr";

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View style={styles.greetings}>
          <Text>로그인되었습니다.</Text>
        </View>
      ) : (
        <View style={styles.greetings}>
          <Text style={styles.greetingText}>트립스케치를 시작하세요.</Text>
          <KakaoLoginButton />
        </View>
      )}

      {/* <TouchableOpacity onPress={getUserInfoHandler}>
        <Text>유저 정보 요청</Text>
      </TouchableOpacity> */}

      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        <View style={styles.sectionDescView}>
          <View style={styles.centerLine}></View>
          <Text style={styles.sectionDesc}>실시간 HOT 여행 스케치</Text>
        </View>
        {diaries.map((diary) => (
          <PostCard post={diary} />
        ))}

        {/* <View style={styles.buttonItself}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.buttonText}>맨 위로</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    color: "black",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 150,
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
  },
  greetings: {
    width: "100%",
    backgroundColor: "white",
    height: 150,
    flexDirection: "column",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  sectionDescView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  sectionDesc: {
    color: "#68A6FF",
    paddingHorizontal: 18,
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  centerLine: {
    width: "100%",
    top: "50%",
    borderBottomWidth: 0.5,
    position: "absolute",
    borderColor: "#68A6FF",
  },

  greetingText: {
    fontSize: 18,
    marginVertical: 15,
  },
  buttonItself: {
    margin: 10,
    bottom: 0,
    right: 0,
    position: "absolute",
    width: 80,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Home;
