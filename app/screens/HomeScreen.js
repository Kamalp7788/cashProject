import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
// import CalendarPicker from 'react-native-calendar-picker';

const HomeScreen = ({route, navigation}) => {
  // const [open, setOpen] = useState(false);
  // const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const onDateChange = selectedStartDate => {
  //   setSelectedStartDate(selectedStartDate);
  //   setOpen(true);
  // };
  return (
    <View style={styles.body}>
      <Text style={styles.txt1}>id : {route.params.response.data.id}</Text>
      <Text style={styles.txt1}>Name : {route.params.response.data.name}</Text>
      <Text style={styles.txt1}>
        email : {route.params.response.data.email}
      </Text>
      <Text style={styles.txt1}>
        userName : {route.params.response.data.username}
      </Text>
      <Text style={styles.txt1}>
        gender : {route.params.response.data.gender}
      </Text>
      <Text style={styles.txt1}>dob : {route.params.response.data.dob}</Text>
      <Text style={styles.txt1}>
        mobile_no : {route.params.response.data.mobile_no}
      </Text>
      {/* <TouchableOpacity>
        <Text>{startDate}</Text>
        <CalendarPicker onDateChange={onDateChange} modal open={open} />
      </TouchableOpacity> */}
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  txt1: {
    fontSize: 24,
    color: '#000',
    margin: 12,
  },
  body: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
