import * as React from "react";
import { Text, View, Picker } from "react-native";
import { Button, Divider } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { SimpleLineIcons } from "@expo/vector-icons";

// from app
import colors from "app/src/constants/colors";
import { topStyle, entryStyle } from "app/src/styles/top-style";

interface Props {
  navigation: any;
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
    prefecture: "tokyo"
  };

  /** 完了ボタン押下でホーム画面に遷移する */
  onCompleteButtonPress = () => {
    this.props.navigation.navigate("main");
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

          {/* 住まい選択 */}
          <View style={entryStyle.addressGroup}>
            {/* <Divider style={entryStyle.divider} /> */}
            <Text style={entryStyle.entryText}>住まい</Text>
            <Picker
              selectedValue={prefecture}
              style={{ width: 200 }}
              itemStyle={{ fontSize: 15, color: colors.tintColor }}
              onValueChange={itemValue =>
                this.setState({ prefecture: itemValue })
              }
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

          {/* 決定ボタン */}
          {this.renderCompleteButton()}

          <View style={topStyle.emptySpace} />
        </View>
      </View>
    );
  }
}
