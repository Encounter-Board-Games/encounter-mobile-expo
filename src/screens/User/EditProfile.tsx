import React, { FC } from 'react';
import EditProfileContent from './EditProfileContent';
import ScreenPopup from '../../components/ScreenPopup';
import { useNavigation } from '@react-navigation/native';

interface EditProfileProps {}

const EditProfile: FC<EditProfileProps> = () => {
  const date = new Date();

  return (
    <ScreenPopup title="Editar perfil" withBorder noScroll>
      <EditProfileContent isEdit={true} />
    </ScreenPopup>
  );
};

export default EditProfile;
