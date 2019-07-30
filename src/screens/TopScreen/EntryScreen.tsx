import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Picker } from "native-base";
import { Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { SimpleLineIcons } from "@expo/vector-icons";

// from app
import colors from "app/src/constants/colors";
import appStyle from "app/src/styles/common-style";
import { topStyle, entryStyle } from "app/src/styles/top-screen-style";

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
const EntryScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [sex, setSex] = useState("");
  const [date, setDate] = useState("1995-01-01");
  const [prefecture, setPrefecture] = useState("");

  /** 完了ボタン押下でホーム画面に遷移する */
  const onCompleteButtonPress = () => {
    navigate("main");
  };

  /** 性別選択ボタンを描画する */
  const renderSexButtons = () => {
    return (
      <View style={entryStyle.sexGroup}>
        <Text style={entryStyle.entryText}>性別</Text>
        {/* 選択したボタンの色を変える */}
        {sex === "man" ? (
          <Button
            title="男性"
            icon={
              <SimpleLineIcons
                name="user"
                color={colors.tintColor}
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
                color={colors.tintColor}
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
                color={colors.tintColor}
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
                color={colors.tintColor}
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
      <View style={entryStyle.ageGroup}>
        <Text style={entryStyle.entryText}>生年月日</Text>
        <DatePicker
          style={{ width: 200 }}
          date={date}
          mode="date"
          format="YYYY-MM-DD"
          minDate="1980-01-01"
          maxDate="2018-12-31"
          confirmBtnText="決定"
          cancelBtnText="キャンセル"
          customStyles={{ dateInput: { marginLeft: 20 } }}
          onDateChange={date => setDate(date)}
        />
      </View>
    );
  };

  /** 都道府県選択フォームを描画する */
  const renderAddressForm = () => {
    return (
      <View style={entryStyle.addressGroup}>
        <Text style={entryStyle.entryText}>住まい</Text>
        <Picker
          mode="dropdown"
          placeholder="都道府県を選択"
          placeholderStyle={{ color: colors.tintColor, marginLeft: 10 }}
          style={{ width: 160, marginLeft: 10 }}
          textStyle={appStyle.defaultText}
          note={false}
          selectedValue={prefecture}
          onValueChange={itemValue => setPrefecture(itemValue)}
        >
          {/* TODO 47都道府県分(別ファイルに吐き出したい) */}
          <Picker.Item label="埼玉" value="saitama" />
          <Picker.Item label="千葉" value="chiba" />
          <Picker.Item label="東京" value="tokyo" />
          <Picker.Item label="神奈川" value="kanagawa" />
          <Picker.Item label="愛知" value="aichi" />
          <Picker.Item label="大阪" value="osaka" />
          <Picker.Item label="福岡" value="fukuoka" />
        </Picker>
      </View>
    );
  };

  /** 入力完了ボタンを描画する */
  const renderCompleteButton = () => {
    return (
      <View style={topStyle.emptySpace}>
        {/* 未入力項目がある場合はボタン押下不可 */}
        {sex !== "" ? (
          <Button
            buttonStyle={topStyle.completeButton}
            title="決定"
            onPress={onCompleteButtonPress}
          />
        ) : (
          <Button buttonStyle={topStyle.completeButton} title="決定" disabled />
        )}
      </View>
    );
  };

  return (
    <View style={topStyle.topContainer}>
      <View style={topStyle.linkGroup}>
        <View style={topStyle.emptySpace} />

        {/* 性別選択 */}
        {renderSexButtons()}
        {/* 生年月日選択 */}
        {renderBirthdayForm()}
        {/* 住まい選択 */}
        {renderAddressForm()}
        {/* 決定ボタン */}
        {renderCompleteButton()}

        <View style={topStyle.emptySpace} />
      </View>
    </View>
  );
};

export default EntryScreen;
