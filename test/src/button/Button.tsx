import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

export default function Button() {

  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight {...touchProps}>
        <Text>tt</Text>
      </TouchableHighlight>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    borderColor: 'blue',
    backgroundColor: 'blue',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPress: {
    borderColor: 'red',
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});