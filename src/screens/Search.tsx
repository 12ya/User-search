import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {User} from '../components/User';

import axios from 'axios';

export const Search = () => {
  const [input, setInput] = useState('');
  const [user, setUser] = useState({
    login: '',
    name: '',
    avatar_url: '',
    followers: null,
    following: null,
    message: null,
  });
  const {navigate} = useNavigation();

  const findUser = () => {
    axios
      .get(`https://api.github.com/users/${input}`)
      .then(res => {
        console.log(res.data, 'result from findUser function');
        setUser(res.data);
        setInput('');
      })
      .catch(err => {
        console.log(err, 'error in findUser function');
        setUser({message: 'err'});
        setInput('');
      });
  };

  const handleUserPress = () => {
    navigate('Follows', {user});
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Username"
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.button} onPress={findUser}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

      {user.message || !user.login ? (
        <Text>Not found</Text>
      ) : (
        <User
          avatar_url={user.avatar_url}
          followers={user.followers}
          following={user.following}
          login={user.login}
          name={user.name}
          onPress={handleUserPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 2,
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 10,
    marginRight: 20,
  },
  button: {
    borderColor: 'purple',
    borderWidth: 1,
    paddingVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
});
