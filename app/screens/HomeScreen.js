import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = ({route}) => {
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
      {/* <Text style={styles.txt1}>photo : {route.params.response.data}</Text>
      <Text style={styles.txt1}>active : {route.params.response.data}</Text> */}
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
