import {
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../utility/Images';
import axios from 'axios';
// import {Calendar} from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
const validator = require('validator');
import moment from 'moment';

const InputView = ({
  title,
  source,
  value,
  onChangeText,
  keyboardType,
  maxLength,
}) => {
  return (
    <View style={styles.body}>
      <Text style={styles.txt1}>{title}</Text>
      <View style={styles.row}>
        <Image source={source} style={styles.avtarIcon} resizeMode="contain" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.txt2}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};
const ProfileScreen = ({route, navigation}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState();
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [other, setOther] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');
  const RadioButton = ({title, source, onPress}) => {
    return (
      <>
        <TouchableOpacity onPress={onPress}>
          <Image source={source} style={styles.circle} />
        </TouchableOpacity>
        <Text style={{marginHorizontal: 12}}>{title}</Text>
      </>
    );
  };
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  // const validateName = () => {
  //   if (errorMessage.length < 0) {
  //     setErrorMessage('please enter name greate than 5');
  //   }
  // };

  const formattedDate = moment(date).format('YYYY /MM /DD');

  const handleSubmit = () => {
    const params = {
      mobile_no: route.params.paramKey1.data.mobile_no,
      name: name,
      email: email,
      gender: genderShow(),
      dob: date,
    };
    console.log({params});
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + route.params.paramKey1.token,
    };
    console.log(headers);
    axios
      .post('http://172.105.41.247/cashcry/api/v1/profile-update', params, {
        headers,
      })
      .then(res => {
        console.log({Response: res});
        console.log({data: res.data});
        console.log(res.data.status);
        // console.log(res.data.data);
        if (res.data.status === true) {
          navigation.navigate('Home', {
            response: res.data,
          });
        } else {
          setErrorMessage1(`${res.data.errors.name[0]}`);
          // setErrorMessage(validateName());
        }
      })
      .catch(err => {
        console.log({err});
      });
  };
  const ActionSelectDate = () => {
    setOpen(true);
  };
  const maleGender = () => {
    setMale(true);
    setFemale(false);
    setOther(false);
  };
  const femaleGender = () => {
    setMale(false);
    setFemale(true);
    setOther(false);
  };
  const otherGender = () => {
    setMale(false);
    setFemale(false);
    setOther(true);
  };
  const genderShow = () => {
    if (male === true) {
      return 'male';
      setGender(gender);
    } else if (female === true) {
      return 'female';
      setGender(gender);
    } else if (other === true) {
      return 'other';
      setGender(gender);
    } else {
      return 'male';
    }
  };
  return (
    <View style={styles.appContainer}>
      <InputView
        title={'Full Name'}
        source={Images.avtarIcon}
        value={name}
        onChangeText={value => setName(value)}
        maxLength={30}
      />
      {/* {emailValidError ? <Text>{emailValidError}</Text> : null} */}
      <Text>{errorMessage1}</Text>
      {name.length === 0 && name.length < 7 && <Text>please enter name </Text>}
      <InputView
        title={'Email Address'}
        source={Images.mailIcon}
        value={email}
        onChangeText={value => {
          setEmail(value);
          handleValidEmail(value);
        }}
      />
      {emailValidError ? <Text>{emailValidError}</Text> : null}
      <InputView
        title={'Mobile Number'}
        source={Images.mailIcon}
        value={number}
        onChangeText={value => setNumber(value)}
        maxLength={0}
      />
      <View style={styles.body}>
        <Text>Gender</Text>
        <View style={styles.rowGender}>
          <RadioButton
            title={'Male'}
            source={male ? Images.circleIcon : Images.emptyIcon}
            onPress={maleGender}
          />
          <RadioButton
            title={'Female'}
            source={female ? Images.circleIcon : Images.emptyIcon}
            onPress={femaleGender}
          />
          <RadioButton
            title={'Others'}
            source={other ? Images.circleIcon : Images.emptyIcon}
            onPress={otherGender}
          />
        </View>
      </View>
      <Text>{genderShow()}</Text>
      <View style={styles.body}>
        <Text>Date of birth </Text>
        <TouchableOpacity onPress={ActionSelectDate}>
          <Text style={styles.datePicker}>
            {/* {date.toLocaleDateString()} */}
            {formattedDate}
          </Text>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
      </View>

      <Text>err3 :{errorMessage}</Text>
      <Text>
        {name} and {email} and {dob} ,{gender}
      </Text>
      <TouchableOpacity style={styles.btnView} onPress={handleSubmit}>
        <Text style={styles.btn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F94144',
  },
  body: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    height: 80,
  },
  avtarIcon: {
    height: 14,
    width: 14,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txt1: {
    color: '#000',
    marginTop: 5,
    marginHorizontal: 12,
  },
  txt2: {
    fontSize: 16,
    marginLeft: 12,
    color: '#000',
    // backgroundColor: 'gray',
    height: 40,
    width: '80%',
    margin: 12,
  },
  date: {
    fontSize: 20,
    marginLeft: 12,
    color: '#000',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    width: 100,
    height: 30,
    alignSelf: 'center',
  },
  circle: {
    height: 20,
    width: 20,
  },
  rowGender: {
    flexDirection: 'row',
    margin: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  datePicker: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
  },
});
