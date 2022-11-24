import {useNavigation, useRoute} from '@react-navigation/core';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

interface IButton {
  title: string;
  count: number | string;
  onPress: () => void;
}

export const Follows = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const [data, setData] = useState({followers: null, following: null});
  const isFocused = useIsFocused();

  const handleButtonPress = (type: string) => {
    navigate('UsersList', {user: params.user, type});
  };

  const getFollows = () => {
    axios
      .get(`https://api.github.com/users/${params.user.login}`, {
        headers: {
          Authorization: `Bearer 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`,
        },
      })
      .then(res => {
        console.log(res.data, 'result from findUser function');
        setData({followers: res.data.followers, following: res.data.following});
      })
      .catch(err => {
        console.log(err, 'error in findUser function');
        setData({message: 'err'});
      });
  };

  useEffect(() => {
    console.log(params, 'pararara');

    if (isFocused) {
      setData(params.user);
      getFollows();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Button
          title="Followers"
          count={data.followers || 'nil'}
          onPress={() => handleButtonPress('followers')}
        />
        <Button
          title="Following"
          count={data.following || 'nil'}
          onPress={() => handleButtonPress('following')}
        />
      </View>
    </View>
  );
};

const Button = ({title, count, onPress}: IButton) => {
  return (
    <TouchableOpacity
      disabled={count === 0}
      style={styles.button}
      onPress={onPress}>
      <Text style={styles.title}>
        {title} : {count}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#3A8891',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '49%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3A8891',
    padding: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
