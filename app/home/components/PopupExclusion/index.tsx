import DefaultButton from '@/components/button';
import React from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { PopupExclusionStyles } from './PopupExclusion';

interface CardMatchProps {
  visible: boolean;
  onHidden?: () => void;
  onConfirmDelete: () => void;
  onCancel: () => void
}

const PopupExclusion: React.FC<CardMatchProps> = ({ visible, onCancel, onConfirmDelete }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <Pressable style={PopupExclusionStyles.centeredView} onPress={onCancel} >
        <TouchableWithoutFeedback>
          <View style={PopupExclusionStyles.modalView}>
            <Text style={PopupExclusionStyles.modalText}>Deseja realmente apagar esta partida ?</Text>
            <View style={PopupExclusionStyles.vRowButtons}>
              <DefaultButton
                style={[PopupExclusionStyles.button, PopupExclusionStyles.cancelButton]}
                text="Cancelar"
                onPress={onCancel} />
              <DefaultButton
                style={PopupExclusionStyles.button}
                text="Apagar partida"
                onPress={onConfirmDelete} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default PopupExclusion;
