import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const ProfileData = ({route}) => {
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  return (
    <View>
      <Text>ProfileData</Text>
      {/* <Text>mo_number :{route.params.paramKey1.data.mobile_no}</Text> */}
      <Text>email :{email}</Text>
      <Text>Date of Birth :{dob}</Text>
      <Text>gender :{gender}</Text>
    </View>
  );
};

export default ProfileData;

const styles = StyleSheet.create({});
