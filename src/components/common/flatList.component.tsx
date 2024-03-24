import {
  FlatListProps as FlatListRootProps,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import {useIsLoading} from 'utils';
import Animated, {LinearTransition} from 'react-native-reanimated';

type FlatListProps<T> = ComponentBaseModel<FlatListRootProps<T>>;
export const FlatListComponent = <T extends {}>({
  data,
  renderItem,
  horizontal,
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
    <Animated.FlatList
      data={data}
      onLayout={onLayout}
      itemLayoutAnimation={LinearTransition.stiffness(200)}
      horizontal={horizontal}
      ListFooterComponent={
        // fix issue on android to show ActivityIndicatorComponent when fetch data
        <View style={{height: height * (data?.length ? 0.5 : 1)}} />
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
