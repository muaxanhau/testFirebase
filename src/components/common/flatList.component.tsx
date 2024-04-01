import {
  FlatListProps as FlatListRootProps,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  ComponentBaseModel,
  EnteringAnimationEnum,
  ExitingAnimationEnum,
} from 'models';
import {
  ActivityIndicatorComponent,
  TextComponent,
  ViewAnimationComponent,
} from 'components';
import {useIsLoading, useLayout} from 'utils';
import Animated, {LinearTransition} from 'react-native-reanimated';

type FlatListProps<T> = ComponentBaseModel<
  Omit<FlatListRootProps<T>, 'onRefresh'> & {
    // onRefresh wont work if "horizontal" = true
    onRefresh?: () => Promise<unknown>;
  }
>;
export const FlatListComponent = <T extends {}>({
  data,
  renderItem,
  horizontal,
  onRefresh,
  ...rest
}: FlatListProps<T>) => {
  const isLoading = useIsLoading();
  const [refreshing, setRefreshing] = useState(false);
  const {onLayout, height} = useLayout();

  const onRefreshData = async () => {
    if (!onRefresh) return;

    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <Animated.FlatList
      data={data}
      onLayout={onLayout}
      itemLayoutAnimation={LinearTransition.stiffness(200)}
      horizontal={horizontal}
      refreshing={refreshing}
      onRefresh={horizontal ? undefined : onRefreshData}
      scrollEventThrottle={16}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      ListFooterComponent={
        // fix issue on android to show ActivityIndicatorComponent when fetch data
        horizontal ? null : (
          <View style={{height: height * (data?.length ? 0.5 : 1)}} />
        )
      }
      ListEmptyComponent={
        horizontal ? null : (
          <View style={[styles.emptyContainer, {height}]}>
            {isLoading ? (
              <ActivityIndicatorComponent />
            ) : (
              <TextComponent>Empty</TextComponent>
            )}
          </View>
        )
      }
      renderItem={data => (
        <ViewAnimationComponent
          entering={EnteringAnimationEnum.FADE_IN_RIGHT}
          exiting={ExitingAnimationEnum.FADE_OUT}
          delay={data.index * 100}>
          {renderItem?.(data)}
        </ViewAnimationComponent>
      )}
      {...rest}
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
