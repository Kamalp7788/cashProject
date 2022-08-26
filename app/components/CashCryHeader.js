import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Images} from '../utility/Images';

const CashCryHeader = ({onPress}) => {
  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={onPress}>
        <Image source={Images.backIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.txt}>CASHC₹Y</Text>
    </View>
  );
};

export default CashCryHeader;

const styles = StyleSheet.create({
  body: {
    height: 50,
    backgroundColor: '#F94144',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backIcon: {
    height: 16,
    width: 16,
    marginHorizontal: 20,
  },
  txt: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
});
