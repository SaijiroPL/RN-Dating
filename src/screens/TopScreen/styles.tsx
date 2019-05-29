import { StyleSheet, Dimensions } from 'react-native';

// Constants
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * TopScreen, EntryScreen, WelcomeScreen のスタイリング
 * @author tanakakota
 */
const styles = StyleSheet.create({
  // コンテナ
  containerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptySpaceStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topImageStyle: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  linkGroupStyle: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  sexGroupStyle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  ageGroupStyle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  addressGroupStyle: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  slideStyle: { flex: 1, alignItems: 'center', width: SCREEN_WIDTH },
  headerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // コンポーネント
  inputFormStyle: {
    width: SCREEN_WIDTH * 0.75,
    marginBottom: 20,
  },
  completeButtonStyle: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    width: SCREEN_WIDTH * 0.75,
  },
  dividerStyle: {
    backgroundColor: 'orange',
    width: SCREEN_WIDTH * 0.75,
    marginVertical: 30,
  },

  // テキスト
  welcomeTextStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 20,
    padding: 10,
  },
  linkStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: 'orange',
  },
  entryTextStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 20,
    textAlign: 'center',
  },
  headerTextStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 20,
    paddingVertical: 20,
  },
  titleStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 20,
    padding: 10,
  },
  descriptionStyle: {
    fontFamily: 'genju-medium',
    color: '#666',
    fontSize: 15,
    padding: 10,
  },
});

export default styles;
