import React from "react";
import { Text, View } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";
import { Picker } from "native-base";
import { Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { SimpleLineIcons } from "@expo/vector-icons";

// from app
import colors from "app/src/constants/colors";
import appStyle from "app/src/styles/common-style";
import { topStyle, entryStyle } from "app/src/styles/top-style";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  sex: string;
  date: string;
  prefecture: string;
}

/**
 * ユーザー基本情報入力画面
 * @author kotatanaka
 */
export default class EntryScreen extends React.Component<Props, State> {
  public state: State = {
    sex: "",
    date: "1995-01-01",
    prefecture: ""
  };

  /** 完了ボタン押下でホーム画面に遷移する */
  onCompleteButtonPress = () => {
    const { navigation } = this.props;
    navigation.navigate("main");
  };

  /** 性別選択ボタンを描画する */
  renderSexButtons() {
    const { sex } = this.state;

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
            onPress={() => this.setState({ sex: "man" })}
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
            onPress={() => this.setState({ sex: "man" })}
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
            onPress={() => this.setState({ sex: "woman" })}
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
            onPress={() => this.setState({ sex: "woman" })}
          />
        )}
      </View>
    );
  }

  /** 生年月日選択フォームを描画する */
  renderBirthdayForm() {
    const { date } = this.state;

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
          onDateChange={date => this.setState({ date })}
        />
      </View>
    );
  }

  /** 都道府県選択フォームを描画する */
  renderAddressForm() {
    const { prefecture } = this.state;

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
          onValueChange={itemValue => this.setState({ prefecture: itemValue })}
        >
          {/* 47都道府県分(別ファイルに吐き出したい) */}
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
  }

  /** 入力完了ボタンを描画する */
  renderCompleteButton() {
    const { sex } = this.state;

    return (
      <View style={topStyle.emptySpace}>
        {/* 未入力項目がある場合はボタン押下不可 */}
        {sex !== "" ? (
          <Button
            buttonStyle={topStyle.completeButton}
            title="決定"
            onPress={this.onCompleteButtonPress}
          />
        ) : (
          <Button buttonStyle={topStyle.completeButton} title="決定" disabled />
        )}
      </View>
    );
  }

  render() {
    const { date, prefecture } = this.state;

    return (
      <View style={topStyle.topContainer}>
        <View style={topStyle.linkGroup}>
          <View style={topStyle.emptySpace} />

          {/* 性別選択 */}
          {this.renderSexButtons()}
          {/* 生年月日選択 */}
          {this.renderBirthdayForm()}
          {/* 住まい選択 */}
          {this.renderAddressForm()}
          {/* 決定ボタン */}
          {this.renderCompleteButton()}

          <View style={topStyle.emptySpace} />
        </View>
      </View>
    );
  }
}
