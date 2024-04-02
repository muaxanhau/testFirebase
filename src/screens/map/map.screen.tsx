import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {ScreenBaseModel} from 'models';
import {
  BottomSheetComponent,
  BottomSheetRefProps,
  ButtonComponent,
  ScreenLayoutComponent,
  TextComponent,
} from 'components';
import MapView, {
  Circle,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {colors} from 'values';
import {useMainStackNavigation, utils} from 'utils';
import {
  currPosition,
  dummyRestaurants,
  regionDelta,
  Restaurant,
} from './dummyData';

export const MapScreen: ScreenBaseModel = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const navigation = useMainStackNavigation();
  const ref = useRef<BottomSheetRefProps>(null);

  const onPressMarker = (res: Restaurant) => () => {
    setRestaurant(res);
    ref.current?.open();
  };
  const onPressGo = () => {
    ref.current?.close();
    navigation.navigate('ListItems');
  };

  return (
    <>
      <BottomSheetComponent ref={ref} paddingHorizontal>
        <TextComponent type="h2">{restaurant?.title}</TextComponent>
        <TextComponent>Description: {restaurant?.description}</TextComponent>
        <TextComponent>Rate: {restaurant?.rate}</TextComponent>
        <TextComponent>
          Coordinate: {restaurant?.latitude}
          {'  '}|{'  '}
          {restaurant?.longitude}
        </TextComponent>

        <ButtonComponent
          title="Go"
          onPress={onPressGo}
          style={{marginTop: 'auto'}}
        />
      </BottomSheetComponent>

      <ScreenLayoutComponent title="Map" disablePaddingTop enableBottom>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              ...currPosition,
              ...regionDelta,
            }}>
            {dummyRestaurants.map((res, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: res.latitude,
                  longitude: res.longitude,
                }}
                title={res.title}
                onPress={onPressMarker(res)}
              />
            ))}

            <>
              <Marker coordinate={currPosition} pinColor={colors.primary} />
              <Circle
                center={currPosition}
                radius={500}
                fillColor={utils.opacityColor(colors.primary, 0.2)}
                strokeColor={colors.neutral}
                strokeWidth={1}
              />
            </>
          </MapView>
        </View>
      </ScreenLayoutComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
