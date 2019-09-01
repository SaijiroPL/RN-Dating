import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Button } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";

// from app
import Colors from "app/src/constants/Colors";
import CompleteButton from "app/src/components/buttons/CompleteButton";
import DatePicker from "app/src/components/contents/DatePicker";
import PrefecturePicker from "app/src/components/contents/PrefecturePicker";
import { getToday } from "app/src/utils/DateUtil";
import appStyle from "app/src/styles/general-style";
import { entryScreenStyle } from "app/src/styles/top-screen-style";

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
const EntryScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const [sex, setSex] = useState<string>("");
  const [date, setDate] = useState<string>("1995-01-01");
  const [prefecture, setPrefecture] = useState<string>("");

  /** 完了ボタン押下でホーム画面に遷移する */
  const onCompleteButtonPress = () => {
    navigate("main");
  };

  /** 性別選択ボタンを描画する */
  const renderSexButtons = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <Text style={entryScreenStyle.entryText}>性別</Text>
        {/* 選択したボタンの色を変える */}
        {sex === "man" ? (
          <Button
            title="男性"
            icon={
              <SimpleLineIcons
                name="user"
                color={Colors.tintColor}
                size={15}
                style={{ paddingRight: 5 }}
              />
            }
            buttonStyle={{ marginHorizontal: 20 }}
            onPress={() => setSex("man")}
          />
        ) : (
          <Button
            type="outline"
            title="男性"
            icon={
              <SimpleLineIcons
                name="user"
                color={Colors.tintColor}
                size={15}
                style={{ paddingRight: 5 }}
              />
            }
            buttonStyle={{ marginHorizontal: 20 }}
            onPress={() => setSex("man")}
          />
        )}
        {sex === "woman" ? (
          <Button
            title="女性"
            icon={
              <SimpleLineIcons
                name="user-female"
                color={Colors.tintColor}
                size={15}
                style={{ paddingRight: 5 }}
              />
            }
            onPress={() => setSex("woman")}
          />
        ) : (
          <Button
            type="outline"
            title="女性"
            icon={
              <SimpleLineIcons
                name="user-female"
                color={Colors.tintColor}
                size={15}
                style={{ paddingRight: 5 }}
              />
            }
            onPress={() => setSex("woman")}
          />
        )}
      </View>
    );
  };

  /** 生年月日選択フォームを描画する */
  const renderBirthdayForm = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <Text style={entryScreenStyle.entryText}>生年月日</Text>
        <DatePicker date={date} setDate={setDate} maxDate={getToday()} />
      </View>
    );
  };

  /** 都道府県選択フォームを描画する */
  const renderAddressForm = () => {
    return (
      <View style={entryScreenStyle.formGroup}>
        <Text style={entryScreenStyle.entryText}>住まい</Text>
        <PrefecturePicker
          prefecture={prefecture}
          setPrefecture={setPrefecture}
        />
      </View>
    );
  };

  /** 入力完了ボタンを描画する */
  const renderCompleteButton = () => {
    return (
      <View style={appStyle.emptySpace}>
        {/* 未入力項目がある場合はボタン押下不可 */}
        {sex !== "" ? (
          <CompleteButton title="決定" onPress={onCompleteButtonPress} />
        ) : (
          <CompleteButton title="決定" disabled />
        )}
      </View>
    );
  };

  return (
    <View style={appStyle.standardContainer}>
      <View style={appStyle.emptySpace} />
      {renderSexButtons()}
      {renderBirthdayForm()}
      {renderAddressForm()}
      {renderCompleteButton()}
      <View style={appStyle.emptySpace} />
    </View>
  );
};

export default EntryScreen;
