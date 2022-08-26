import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import InputList from '../components/InputList';
import {Images} from '../utility/Images';

const ValidationScreen = ({navigation}) => {
  const [counter, setCounter] = useState(59);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image source={Images.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.txt}>CASHC₹Y</Text>
      </View>
      <View>
        <Text style={styles.otp}>otp Verification</Text>
      </View>
      <View style={styles.InputViw}>
        <InputList />
      </View>
      <View style={styles.counterView}>
        <Text style={styles.counter}> {counter} seconds</Text>
      </View>
      <View style={styles.txtView1}>
        <Text style={styles.txt1}>Didn't receive code ?</Text>
        <Text style={styles.txt2}>Resend Code</Text>
      </View>
    </View>
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
    marginTop: 16,
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
});
