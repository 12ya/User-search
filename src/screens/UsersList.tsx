// import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
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
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/users/${params.user.login}/${params.type}?per_page=30&page=${page}`,
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        },
      )
      .then(res => {
        console.log(res, 'result from UsersList effect');
        setData(prev => [...prev, ...res.data]);
      })
      .catch(err => {
        console.log(err, 'error from UsersList effect');
      });
  }, [page]);

  const handleUserPress = user => {
    navigate('Follows', {user});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.login}
        ListEmptyComponent={<Text>Not Found</Text>}
        onEndReachedThreshold={0.2}
        onEndReached={() => setPage(prev => ++prev)}
        renderItem={({item}) => {
          return !item.login ? null : (
            <View style={styles.userContainer}>
              <User
                avatar_url={item.avatar_url}
                followers={item.followers}
                following={item.following}
                login={item.login}
                name={item.name}
                onPress={() => handleUserPress(item)}
              />
            </View>
          );
        }}
      />
      {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.map(user => (
          <View style={styles.userContainer}>
            {!user.login ? (
              <Text>Not Found</Text>
            ) : (
              <User
                avatar_url={user.avatar_url}
                followers={user.followers}
                following={user.following}
                login={user.login}
                name={user.name}
                onPress={() => handleUserPress(user)}
              />
            )}
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD6',
    padding: 20,
  },
  userContainer: {
    marginBottom: 34,
  },
});
