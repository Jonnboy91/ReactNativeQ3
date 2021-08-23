import React from 'react';
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, SafeAreaView} from 'react-native';
import GlobalStyles from './GlobalStyles';
import List from './components/List'


const App = () => {
  return (
    <SafeAreaView style={styles.container, GlobalStyles.droidSafeArea}>
      <List />
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default App;