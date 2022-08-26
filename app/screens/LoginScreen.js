import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../utility/Images';

const LoginScreen = ({navigation}) => {
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const ActionHandler = () => {
    const requestOptions = {
      method: 'POST',
      headers: 'Content-Type: application/x-www-form-urlencoded',
      body: JSON.stringify({
        mobile_no: '7014584811',
      }),
    };
    fetch('http://172.105.41.247/cashcry/api/v1/login', requestOptions)
      .then(response => response.json())
      .then(json => console.log('Fetch api response', json.login))
      .catch(error => console.log('error', error));
  };

  //   const apiKey = 'YOUR_API_KEY';
  //   const apiURL = 'http://172.105.41.247/cashcry/api/v1/login' + apiKey;
  //   const sendPhoneNumberValidationRequest = async number => {
  //     try {
  //       const response = await fetch.get(apiURL + '&mobile_no=' + number);
  //       const data = response.json();
  //       return data.is_valid_format.value;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   const handleSubmit = async number => {
  //     try {
  //       const isValid = await sendnumberValidationRequest(number);
  //       if (isValid) {
  //         setErrorMessage('');
  //         console.log('SUBMITTED! ', number);
  //       } else {
  //         setErrorMessage(
  //           'INVALID PHONE NUMBER.PLEASE CHECK YOUR INPUT AND TRY AGAIN.',
  //         );
  //         console.log('INVALID NUMBER.');
  //       }
  //       return isValid;
  //     } catch (error) {
  //       setErrorMessage(
  //         'COULD NOT VALIDATE PHONE NUMBER.PLEASE TRY AGAIN LATER.',
  //       );
  //     }
  //   };
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
          onChangeText={text => setNumber(text)}
          maxLength={10}
        />
      </View>
      {number.length > 0 && number.length < 10 && (
        <Text style={styles.error}>Please enter 10 digits</Text>
      )}

      <View style={styles.btn}>
        <Button
          title="Submit"
          color={'#F94144'}
          onPress={ActionHandler}
          disabled={number.length < 10 || !number}
        />
      </View>
      <Text>{errorMessage}</Text>
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
});
