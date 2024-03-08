import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const MapScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent title="Map" disablePaddingTop enableBottom>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    </ScreenLayoutComponent>
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
