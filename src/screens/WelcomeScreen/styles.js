import { StyleSheet, Dimensions } from 'react-native';

// Constants
const SCREEN_WIDTH = Dimensions.get('window').width;

/**
 * WelcomeScreenのスタイリング
 * 
 * @author tanakakota
 */
const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});

export default styles;