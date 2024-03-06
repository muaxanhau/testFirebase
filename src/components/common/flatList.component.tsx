import {
  // FlatList,
  FlatListProps as FlatListRootProps,
  LayoutChangeEvent,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {ActivityIndicatorComponent, TextComponent} from 'components';
import {useIsLoading, utils} from 'utils';
import {FlatList} from 'react-native-gesture-handler';

type FlatListProps<T> = ComponentBaseModel<FlatListRootProps<T>>;

export const FlatListComponent = <T extends {}>({
  ...rest
}: FlatListProps<T>) => {
  const isLoading = useIsLoading();
  const [height, setHeight] = useState(0);

  const refFirstSetHeight = useRef(false);
  const onLayout = (e: LayoutChangeEvent) => {
    if (refFirstSetHeight.current) return;

    const currenHeight = e.nativeEvent.layout.height;
    if (currenHeight === 0) return;

    refFirstSetHeight.current = true;
    setHeight(currenHeight);
  };

  return (
    <FlatList
      {...rest}
      onLayout={onLayout}
      ListFooterComponent={<View style={styles.footer} />}
      ListEmptyComponent={
        <View style={[styles.emptyContainer, {height}]}>
          {isLoading ? (
            <ActivityIndicatorComponent />
          ) : (
            <TextComponent>Empty</TextComponent>
          )}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    height: utils.hp(30),
  },
  emptyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
