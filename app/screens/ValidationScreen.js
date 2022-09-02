import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '../utility/Images';
import {useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const ValidationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [message, setMessage] = useState('');
  const [counter, setCounter] = useState(59);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const [errMessage, setErrMessage] = useState('');
  const [otp, setOtp] = useState('');

  const ActionHandleOtp = () => {
    const params = {mobile_no: route.params.paramKey, otp: otp};
    console.log(params);
    const headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    };
    axios
      .post('http://172.105.41.247/cashcry/api/v1/login-otp', params, {headers})
      .then(res => {
        console.log(res.data);
        // console.log(res.status);
        // console.log(res.data.status);
        console.log(value);
        console.log(res.data.is_register);
        if (res.data.is_register === true) {
          navigation.navigate('Profile', {
            paramKey1: res.data,
          });
        } else {
          navigation.navigate('Home', {
            response: res.data,
          });
          // navigation.navigate('ProfileData', {
          //   paramKey1: route.params.paramKey,
          //   paramKey2: res.data,
          // });
          setErrMessage(`${res.data.errors.otp[0]}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image source={Images.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>CASHC₹Y</Text>
      </View>
      <View>
        <Text style={styles.otp}>otp Verification</Text>
      </View>
      <View style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={otp => setOtp(otp)}
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
        <View style={styles.btn1}>
          <Button
            title="Submit"
            color="#F94144"
            // disabled={value.length < 6 || !value}
            disabled={otp.length < 6 || !otp}
            onPress={ActionHandleOtp}
          />
        </View>
        {/* <Text style={styles.errMessage}>{message}</Text> */}
      </View>
      {/* <View style={styles.InputViw}>
        <InputList />
      </View> */}
      <View style={styles.counterView}>
        <Text style={styles.counter}> {counter} seconds</Text>
      </View>
      <View style={styles.txtView1}>
        <Text style={styles.txt1}>Didn't receive code ?</Text>
        <TouchableOpacity
          onPress={
            (() => alert('resend code'),
            useEffect(() => {
              const timer =
                counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
              return () => clearInterval(timer);
            }, [counter]))
          }>
          <Text style={styles.txt2}>Resend Code</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{message}</Text>
        <Text>Values passed from First page: {route.params.paramKey}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ValidationScreen;

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
  otp: {
    fontSize: 36,
    color: '#000000',
    margin: 12,
    fontWeight: '600',
  },
  InputViw: {
    flexDirection: 'row',
  },
  btn: {
    margin: 16,
  },
  counterView: {
    alignSelf: 'center',
    marginTop: 40,
  },
  counter: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '600',
  },
  txtView1: {
    margin: 16,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  txt1: {
    fontSize: 20,
    color: '#000000',
  },
  txt2: {
    fontSize: 20,
    color: '#F94144',
    fontWeight: '800',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  root: {padding: 20},
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
  btn1: {
    marginTop: 28,
  },
  errMessage: {
    padding: 20,
    textAlign: 'center',
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
  errMess: {
    fontSize: 18,
    margin: 12,
    color: 'red',
  },
});
