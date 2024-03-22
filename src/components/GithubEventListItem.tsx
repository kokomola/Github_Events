import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {memo} from 'react';
import type {GithubEvent} from '../shared.types';

type GithubEventListItemProps = {
  event: GithubEvent;
  onPress: (e: GithubEvent) => void;
};

export default memo(function GithubEventListItem({
  event,
  onPress,
}: GithubEventListItemProps): React.JSX.Element {
  const handleItemPress = () => {
    onPress(event);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleItemPress}>
      <Image style={styles.avatar} source={{uri: event.actor.avatar_url}} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.username}>{event.actor.display_login}</Text>
        <Text numberOfLines={1}>
          {event.type} in {event.repo.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  descriptionContainer: {
    marginLeft: 10,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
});
