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
import {useIsLoading, useLayout, utils} from 'utils';
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
  onEndReached,
  ...rest
}: FlatListProps<T>) => {
  const isLoading = useIsLoading();
  const [refreshing, setRefreshing] = useState(false);
  const {onLayout, height} = useLayout();

  const hasData = !!data?.length;
  const showFooter = !horizontal && hasData;
  const showLoadMore = !!onEndReached && isLoading && hasData && !refreshing;

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
      onEndReached={hasData ? onEndReached : undefined}
      ListFooterComponent={
        showFooter ? (
          <View style={styles.footer}>
            {showLoadMore && <ActivityIndicatorComponent />}
          </View>
        ) : null
      }
      ListEmptyComponent={
        horizontal ? null : (
          <View style={[styles.empty, {height}]}>
            {isLoading ? (
              <ActivityIndicatorComponent />
            ) : (
              <TextComponent>Empty...</TextComponent>
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
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: utils.hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
