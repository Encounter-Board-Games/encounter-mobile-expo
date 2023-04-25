import React, { FC, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import * as Camera from 'expo-camera';
import CameraScreen from './components/CameraScreen';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line max-len
import { handleUploadSelfDocument } from '../../store/actions/user/handlers/handleUpload';
import ScreenOne from './components/ScreenOne';
import ScreenTwo from './components/ScreenTwo';

interface Props {}

const SelfUpload: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [camera, setOpenCamera] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') setOpenCamera(true);
  };

  const addPhoto = (photo: string) => {
    setLoading(true);
    setOpenCamera(false);
    dispatch(handleUploadSelfDocument(photo)).then(() => {
      setOk(true);
    });
  };

  const onOkClick = () => navigation.goBack();

  if (ok) {
    return (
      <ScreenTwo onOkClick={onOkClick} onCameraPress={() => openCamera()} />
    );
  }

  return (
    <Animatable.View
      animation="fadeIn"
      style={{ width: '100%', height: '100%' }}
    >
      {!camera ? (
        <ScreenOne loading={loading} onCameraPress={() => openCamera()} />
      ) : (
        <CameraScreen confirmFoto={(photo) => addPhoto(photo)} />
      )}
    </Animatable.View>
  );
};

export default SelfUpload;
