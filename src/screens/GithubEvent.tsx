import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../shared.types';
import {Screens} from '../navigation/Screens';

type Props = NativeStackScreenProps<RootStackParamList, Screens.GithubEvent>;

export default function GithubEvent({route}: Props): React.JSX.Element {
  const {event} = route.params;

  const handleAvatarPress = () => {
    Linking.openURL(`https://github.com/${event.actor.login}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Username: {event.actor.login}</Text>
          <Text style={styles.userInfoText} numberOfLines={2}>
            Repo id: {event.repo.id}
          </Text>
          <Text style={styles.userInfoText} numberOfLines={2}>
            Repo name: {event.repo.name}
          </Text>
          <Text style={styles.userInfoText} numberOfLines={2}>
            Action type: {event.type}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAvatarPress}
          style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{uri: event.actor.avatar_url}} />
          <Text>open profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flex: 1,
  },
  userInfoText: {
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'gray',
  },
});
