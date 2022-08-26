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
  return (
    <View style={styles.appContainer}>
      <View style={styles.body}>
        <TouchableOpacity>
          <Image source={Images.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>CASHC₹Y</Text>
      </View>
      <View style={styles.logoView}>
        <Image source={Images.logoIcon} style={styles.logoImg} />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.nub}>Mobile Number</Text>
        <TextInput
          placeholder="Please enter your mobile number"
          style={styles.txtinput}
          keyboardType="number-pad"
          value={number}
          onChangeText={value => setNumber(value)}
          maxLength={10}
        />
      </View>
      {number.length > 0 && (
        <Text style={styles.error}>Please enter 10 digits</Text>
      )}

      <View style={styles.btn}>
        <Button
          title="Submit"
          color={'#F94144'}
          onPress={() => navigation.navigate('Validate')}
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
  logoView: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoImg: {
    borderRadius: 22,
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
});
