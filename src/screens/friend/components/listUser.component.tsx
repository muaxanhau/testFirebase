import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {colors, valueStyles} from 'values';
import {ComponentBaseModel, UserModel} from 'models';
import {EnteringAnimationEnum, ExitingAnimationEnum} from 'models';
import {TextComponent, ViewAnimationComponent} from 'components';
import {usePreviousState} from 'utils';
import {useGetUsersRepo} from 'repositories';

type ListUserProps = ComponentBaseModel;
export const ListUserComponent: FC<ListUserProps> = () => {
  const [page, prevPage, setPage] = usePreviousState(1);
  const {users} = useGetUsersRepo({page});

  const renderItem = ({item}: {item: UserModel}) => {
    const isRightShow = page >= prevPage;
    const isRightHide = page > prevPage;

    return (
      <TouchableOpacity>
        <ViewAnimationComponent
          style={styles.itemContainer}
          entering={
            isRightShow
              ? EnteringAnimationEnum.SLIDE_IN_RIGHT
              : EnteringAnimationEnum.SLIDE_IN_LEFT
          }
          exiting={
            isRightHide
              ? ExitingAnimationEnum.SLIDE_OUT_RIGHT
              : ExitingAnimationEnum.SLIDE_OUT_LEFT
          }>
          <TextComponent>{item.firstName}</TextComponent>
        </ViewAnimationComponent>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={users?.data}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Prev"
          disabled={page === 1}
          onPress={() => {
            setPage(page - 1);
          }}
        />
        <TextComponent type="h1">{page}</TextComponent>
        <Button
          title="Next"
          disabled={users?.totalPages === page}
          onPress={() => {
            setPage(page + 1);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: valueStyles.gap,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: valueStyles.gap,
  },
  itemContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.red300,
  },
});
