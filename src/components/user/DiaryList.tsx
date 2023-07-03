import { View, Text } from "react-native";

type DiaryListProps = {
  diaries: Diary[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const DiaryList = (props: DiaryListProps) => {
  const { diaries, isLoading, isError } = props;
  return (
    <View>
      {isLoading ? (
        <Text>로딩...</Text>
      ) : isError ? (
        <Text>에러메세지</Text>
      ) : (
        <View>
          {diaries?.map((item, index) => (
            <View key={index}></View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DiaryList;
