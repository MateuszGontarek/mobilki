import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/button/Button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>12432432423423</Text>
      <Button />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ rotate: '45deg' } , { scale: 2 }],
  }
});
