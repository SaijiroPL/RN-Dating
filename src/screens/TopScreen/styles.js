import { StyleSheet, Dimensions } from 'react-native';

// Constants
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * TopScreenのスタイリング
 * @author tanakakota
 */
const styles = StyleSheet.create({
  containerStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptySpaceStyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topImageStyle: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  linkGroupStyle: { flex: 3, justifyContent: 'center', alignItems: 'center' },
  sexGroupStyle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  ageGroupStyle: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  addressGroupStyle: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  inputFormStyle: {
    width: SCREEN_WIDTH * 0.75,
    marginBottom: 20,
  },
  completeButtonStyle: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    width: SCREEN_WIDTH * 0.75,
  },
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
  dividerStyle: {
    backgroundColor: 'orange',
    width: SCREEN_WIDTH * 0.75,
    marginVertical: 30,
  },
});

export default styles;
