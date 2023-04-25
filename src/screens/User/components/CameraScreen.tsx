import React, { FC, useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';
import { SpaceHorizontal } from '../../../components/Space';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CameraScreenProps {
  confirmFoto?: (photo: ImageSourcePropType) => void;
}

const Screen = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${(props) => props.theme.space.space2};
`;

const Line = styled.View`
  width: 100%;
  flex-flow: row;
`;

const CameraScreen: FC<CameraScreenProps> = ({ confirmFoto }) => {
  const [type, setType] = useState(Camera.Constants.Type.front);
  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<ImageSourcePropType>();

  const takeFoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  if (photo) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: photo }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: [{ rotateY: '180deg' }],
          }}
        />
        <Screen>
          <Line>
            <ButtonComponent
              flex
              onPress={() => setPhoto(undefined)}
              type="CallToAction-Outline"
            >
              Não curti
            </ButtonComponent>
            <SpaceHorizontal n={2} />
            <ButtonComponent
              onPress={() => confirmFoto && confirmFoto(photo)}
              flex
              type="CallToAction-Light"
            >
              Ficou top
            </ButtonComponent>
          </Line>
        </Screen>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}
    >
      <Camera style={{ flex: 1 }} type={type} ref={camera}>
        <SafeAreaView flex={1}>
          <Screen>
            <Line>
              <ButtonComponent
                onPress={() => takeFoto()}
                width="100%"
                type="CallToAction-Light"
              >
                Tirar foto
              </ButtonComponent>
            </Line>
          </Screen>
        </SafeAreaView>
      </Camera>
    </TouchableWithoutFeedback>
  );
};

export default CameraScreen;
