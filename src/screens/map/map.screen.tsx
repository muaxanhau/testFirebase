import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {ScreenBaseModel} from 'models';
import {ScreenLayoutComponent} from 'components';
import {LatLng, LeafletView} from 'react-native-leaflet-view';

export const MapScreen: FC<ScreenBaseModel> = () => {
  return (
    <ScreenLayoutComponent disablePaddingTop>
      <LeafletView
        onMessageReceived={e => {
          console.log('=======================');
          console.log(e.payload);
        }}
        mapCenterPosition={[10, 10]}
      />
    </ScreenLayoutComponent>
  );
};

const styles = StyleSheet.create({});
