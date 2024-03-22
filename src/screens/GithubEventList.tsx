import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useCallback} from 'react';
import {api, useGetEventsQuery} from '../redux/api';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import GithubEventListItem from '../components/GithubEventListItem';
import {useUserRefetch} from '../hooks/useUserRefetch';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList, GithubEvent} from '../shared.types';
import {store} from '../redux/store';
import {Screens} from '../navigation/Screens';

const eventsCount = '25';

type Props = NativeStackScreenProps<
  RootStackParamList,
  Screens.GithubEventList
>;

export default function GithubEventList({
  navigation,
}: Props): React.JSX.Element {
  const {
    data: events,
    refetch: refetchEvents,
    isLoading,
  } = useGetEventsQuery(eventsCount, {
    skip: !useIsFocused(),
    pollingInterval: 30000,
  });

  const {isUserRefetching, handleUserRefetch} = useUserRefetch(refetchEvents);

  useFocusEffect(
    useCallback(() => {
      store.dispatch(
        api.endpoints.getEvents.initiate(eventsCount, {
          forceRefetch: true,
        }),
      );
    }, []),
  );

  const handleEventListItemPress = useCallback((event: GithubEvent) => {
    navigation.navigate(Screens.GithubEvent, {event});
  }, []);

  const handleRenderEventItem: ListRenderItem<GithubEvent> = ({item}) => {
    return (
      <GithubEventListItem onPress={handleEventListItemPress} event={item} />
    );
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <FlatList
        data={events}
        renderItem={handleRenderEventItem}
        refreshControl={
          <RefreshControl
            refreshing={isUserRefetching}
            onRefresh={handleUserRefetch}
          />
        }
        contentContainerStyle={styles.flatListContentContainer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 20,
  },
});
