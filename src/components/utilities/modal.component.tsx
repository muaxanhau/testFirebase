import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ComponentWithChildBaseModel} from 'models';
import {utils} from 'utils';
import {colors} from 'values';

export type ModalRefProps = {
  open: () => void;
  close: () => void;
};
type ModalProps = ComponentWithChildBaseModel<{
  /**
   * 0 <= backgroundOpacity <= 1
   */
  backgroundOpacity?: number;
  onShow?: () => void;
  onDismiss?: () => void;
}>;
export const ModalComponent = forwardRef<ModalRefProps, ModalProps>(
  ({children, backgroundOpacity = 0.5, onShow, onDismiss}, ref) => {
    const [visible, setVisible] = useState(false);

    const backgroundColor = utils.opacityColor(colors.black, backgroundOpacity);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    useImperativeHandle(ref, () => ({open, close}), []);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
        onShow={onShow}
        onDismiss={onDismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.background, {backgroundColor}]}
            onPress={close}
            activeOpacity={1}
          />

          {children}
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
