import {
  FlatList,
  FlatListProps as FlatListRootProps,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ComponentBaseModel} from 'models';
import {ActivityIndicatorComponent, TextComponent} from 'components';
import {useIsLoading} from 'utils';

type FlatListProps<T> = ComponentBaseModel<FlatListRootProps<T>>;

export const FlatListComponent = <T extends {}>({
  data,
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
      data={data}
      onLayout={onLayout}
      ListFooterComponent={
        <View style={{height: height * (data?.length ? 0.5 : 1)}} />
      }
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
  emptyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
