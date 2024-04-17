import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useGetFoodSessionsRepo} from 'repositories';
import {FlatListComponent, TextComponent} from 'components';
import {colors, valueStyles} from 'values';
import {StatusFoodEnum} from 'models';
import {useGenerateStripePaymentRepo} from 'repositories/foods/generateStripePayment.repo';
import {useMainStackNavigation} from 'utils';

type ColorObjModel = {
  [key in StatusFoodEnum]: {
    backgroundColor: string;
    borderColor: string;
  };
};
const colorObj: ColorObjModel = {
  [StatusFoodEnum.PENDING]: {
    backgroundColor: colors.yellow100,
    borderColor: colors.yellow,
  },
  [StatusFoodEnum.PAYMENT]: {
    backgroundColor: colors.primary100,
    borderColor: colors.primary,
  },
  [StatusFoodEnum.WAITING]: {
    backgroundColor: colors.secondary100,
    borderColor: colors.secondary,
  },
  [StatusFoodEnum.DONE]: {
    backgroundColor: colors.green100,
    borderColor: colors.green,
  },
};
type StatusFoodsListProps = {};
export const StatusFoodsListComponent: FC<StatusFoodsListProps> = () => {
  const navigation = useMainStackNavigation();
  const {foodSessions, refetch} = useGetFoodSessionsRepo();
  const {generateStripePayment} = useGenerateStripePaymentRepo({
    onSuccess: ({url}) => {
      const invalidUrl = !url?.length;
      if (invalidUrl) {
        Alert.alert('Warning', 'Server generate payment fail');
        return;
      }

      navigation.navigate('Payment', {
        url,
        onSuccess: () => {
          Alert.alert('Alert', 'Payment success');
          navigation.goBack();
        },
        onCancel: navigation.goBack,
      });
    },
  });

  const onPress = (statusFoodId: string, status: StatusFoodEnum) => () => {
    if (status !== StatusFoodEnum.PAYMENT) return;

    generateStripePayment({statusFoodId});
  };

  return (
    <FlatListComponent
      contentContainerStyle={styles.container}
      data={foodSessions}
      keyExtractor={({id}) => id}
      onRefresh={refetch}
      renderItem={({item: {id, food, status, user}}) => {
        const backgroundColor = colorObj[status].backgroundColor;
        const borderColor = colorObj[status].borderColor;

        return (
          <TouchableOpacity onPress={onPress(id, status)}>
            <View
              style={[styles.itemContainer, {backgroundColor, borderColor}]}>
              <TextComponent style={styles.itemTitle}>
                {food.name}
              </TextComponent>
              <TextComponent>Status: {status}</TextComponent>
              <TextComponent>Role: {user.role}</TextComponent>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const {padding2} = valueStyles;
const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap,
    padding: padding2,
  },
  itemContainer: {
    padding: padding2,
    borderRadius: valueStyles.borderRadius2,
    borderWidth: valueStyles.line2,
    gap: valueStyles.gap,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});
