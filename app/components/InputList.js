import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const InputList = ({navigation}) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [number, setNumber] = useState('');
  const [errMessage, setErrMessage] = useState('');
  // const [otp,setOtp] = useState('')
  const ActionHandleOtp = () => {
    const params = {otp: value, mobile_no: number};
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .post('http://172.105.41.247/cashcry/api/v1/login-otp', params, {headers})
      .then(res => {
        console.log(res.data);
        console.log(res.status);
        console.log(value);
        if (res.data.status === true) {
          navigation.navigate('Profile');
        } else {
          setErrMessage(`${res.data.errors.otp[0]}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Text style={styles.errMess}>{errMessage}</Text>
      <View style={styles.btn}>
        <Button
          title="Submit"
          color={'#F94144'}
          disabled={value.length < 6 || !value}
          onPress={ActionHandleOtp}
        />
      </View>
      {/* <Text style={styles.errMessage}>{message}</Text> */}
    </SafeAreaView>
  );
};

export default InputList;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#F94144',
    textAlign: 'center',
    fontWeight: '600',
  },
  focusCell: {
    borderColor: '#000',
  },
  btn: {
    marginTop: 28,
  },
  errMessage: {
    padding: 20,
    textAlign: 'center',
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  errMess: {},
});
