import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import PostCard from "../components/post/card/PostCard";
import { Text } from "react-native";
import KakaoLoginButton from "../components/auth/KakaoLoginButton";
import { diaries } from "../../data/mockdata";

const Home = ({ navigation }: any) => {
  let loggedIn = false;
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionDescView}>
          <View style={styles.centerLine}></View>
          <Text style={styles.sectionDesc}>요즘 뜨는 스케치</Text>
        </View>
        {diaries.map((diary) => (
          <PostCard post={diary} />
        ))}

        <View style={styles.sectionDescView}>
          <View style={styles.centerLine}></View>
          <Text style={styles.sectionDesc}>새로운 스케치</Text>
        </View>
        {diaries.map((diary) => (
          <PostCard post={diary} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
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
    color: "#777",
    paddingHorizontal: 18,
    fontSize: 18,
    fontWeight: "600",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "#eee",
  },
  centerLine: {
    width: "100%",
    top: "50%",
    borderBottomWidth: 1,
    position: "absolute",
    borderColor: "#CCC",
  },

  greetingText: {
    fontSize: 18,
    marginVertical: 15,
  },
});

export default Home;
