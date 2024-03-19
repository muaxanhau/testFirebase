import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {ComponentBaseModel} from 'models';
import {useGetAllUserCartsRepo} from 'repositories';
import {FlatListComponent, TextComponent} from 'components';
import {dateUtil, utils} from 'utils';
import dayjs from 'dayjs';
import {Timestamp} from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';
import {colors, valueStyles} from 'values';

type ListCartsProps = ComponentBaseModel<{}>;
export const ListCartsComponent: FC<ListCartsProps> = () => {
  const {carts} = useGetAllUserCartsRepo();

  return (
    <FlatListComponent
      data={carts}
      keyExtractor={({id}) => id}
      contentContainerStyle={styles.container}
      renderItem={({
        item: {
          item: {name, color},
          quantity,
          createdAt,
        },
      }) => (
        <CartComponent
          name={name}
          color={color}
          quantity={quantity}
          createdAt={createdAt}
        />
      )}
    />
  );
};

type CartProps = ComponentBaseModel<{
  name: string;
  color: string;
  quantity: number;
  createdAt: Date;
}>;
const CartComponent: FC<CartProps> = ({name, color, quantity, createdAt}) => {
  return (
    <View style={styles.wrapper}>
      <TextComponent>{name}</TextComponent>
      <TextComponent>{color}</TextComponent>
      <TextComponent>{quantity}</TextComponent>
      <TextComponent>{dateUtil.getDayTime(createdAt)}</TextComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap2,
    paddingTop: valueStyles.padding2,
    paddingHorizontal: valueStyles.padding2,
  },
  wrapper: {
    padding: valueStyles.padding3,
    backgroundColor: colors.red100,
    borderRadius: valueStyles.borderRadius2,
    borderWidth: valueStyles.line,
    borderColor: colors.red,
  },
});
