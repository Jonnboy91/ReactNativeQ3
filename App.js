import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import GlobalStyles from './GlobalStyles';
import List from './components/List'


const App = () => {
  return (
    <SafeAreaView style={styles.container, GlobalStyles.droidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;