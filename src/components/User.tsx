import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface IUser {
  avatar_url: string;
  followers: number | null;
  following: number | null;
  name: string;
  login: string;
  onPress?: () => void;
}

export const User = ({
  avatar_url,
  followers,
  following,
  name,
  login,
  onPress,
}: IUser) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        {avatar_url && (
          <Image source={{uri: avatar_url}} style={styles.image} />
        )}
        <View style={styles.userDetails}>
          <Text style={styles.text}>Username: {login}</Text>
          <Text style={styles.text}>Name: {name}</Text>
          <Text style={styles.text}>Followers: {followers}</Text>
          <Text style={styles.text}>Following: {following}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  userDetails: {
    height: 100,
    justifyContent: 'space-between',
  },
  text: {fontSize: 16},
});
