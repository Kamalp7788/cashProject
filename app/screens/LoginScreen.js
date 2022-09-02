import {
  Alert,
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../utility/Images';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
// import {Formik} from 'formik';
// import * as yup from 'yup';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  const handleSubmit = () => {
    const params = {mobile_no: number};
    const headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post('https://sandbox.cashcry.com/api/v1/login', params, {headers})
      .then(res => {
        console.log(res.data);
        console.log(res.status);
        console.log(res.data.status);
        console.log(res.data.errors);
        if (res.data.status === true) {
          navigation.navigate('Validate', {paramKey: number});
          // alert(` You have created: ${JSON.stringify(res.data)}`);
        } else {
          setErrorMessage(`${res.data.errors.mobile_no[0]}`);
          // ToastAndroid.showWithGravity(
          //   `You have created: ${JSON.stringify(res.data)}`,
          //   ToastAndroid.LONG,
          //   ToastAndroid.TOP,
          // );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onChange = text => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert('please enter numbers only');
      }
    }
    setNumber(newText);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.body}>
        <TouchableOpacity>
          <Image source={Images.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>CASHC₹Y</Text>
      </View>
      <View style={styles.logoView}>
        <Image
          source={Images.logoIcon}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.nub}>Mobile Number</Text>
        <TextInput
          placeholder="Please enter your mobile number"
          style={styles.txtinput}
          keyboardType="number-pad"
          value={number}
          onChangeText={text => onChange(text)}
          maxLength={11}
        />
      </View>
      {number.length > 0 && number.length < 10 && (
        <Text style={styles.error}>Please enter 10 digits</Text>
      )}
      <Text style={styles.errMsg}>{errorMessage}</Text>

      <View style={styles.btn}>
        <Button
          title="Submit"
          color={'#F94144'}
          onPress={handleSubmit}
          disabled={number.length < 10 || !number}
        />
      </View>
      <Text>{number}</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  logoView: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoImg: {
    borderRadius: 22,
    height: 150,
    width: 150,
  },
  inputView: {
    height: 80,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
  },
  nub: {
    color: '#000',
    marginLeft: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  txtinput: {
    fontSize: 18,
    marginLeft: 8,
  },
  btn: {
    margin: 16,
  },
  error: {
    color: '#F94144',
    marginLeft: 20,
  },
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
  errMsg: {
    fontSize: 20,
    color: 'red',
    fontWeight: '600',
    margin: 12,
  },
});
