// import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import {User} from '../components/User';

export const UsersList = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();

  const [data, setData] = useState([
    {
      login: '',
      name: '',
      avatar_url: '',
      followers: null,
      following: null,
      message: null,
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${params.user.login}/${params.type}`)
      .then(res => {
        console.log(res, 'result from UsersList effect');
        setData(res.data);
      })
      .catch(err => {
        console.log(err, 'error from UsersList effect');
      });
  }, []);

  const handleUserPress = user => {
    navigate('Follows', {user});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.map(user => (
          <View style={styles.userContainer}>
            <User
              avatar_url={user.avatar_url}
              followers={user.followers}
              following={user.following}
              login={user.login}
              name={user.name}
              onPress={() => handleUserPress(user)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  userContainer: {
    marginBottom: 34,
  },
});
