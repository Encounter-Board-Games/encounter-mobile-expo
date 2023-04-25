import * as React from 'react';
import { Space } from '../../../components/Space';
import { H2, Subtitle2 } from '../../../components/Typography';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MainContainer,
  Line,
  Icon,
  ImageContent,
  Content,
  Footer,
  ButtonsRow,
} from '../UserStyles';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';

interface Props {
  loading: boolean;
  onCameraPress: () => void;
}

const ScreenOne: React.FC<Props> = ({ loading, onCameraPress }) => {
  const navigation = useNavigation();

  return (
    <MainContainer>
      <Content>
        <Space n={5} />
        <H2>
          <H2 noBold>
            Para que você consiga efetuar seu primeiro aluguel, precisaremos de
            uma{' '}
          </H2>
          foto sua (selfie) segurando seu RG ou CNH ou RNE.
        </H2>

        <Space n={3} />
        <Line>
          <Icon>
            <Image
              resizeMode={'contain'}
              style={{ width: 20, height: 20 }}
              source={require('../../assets/img/dado.png')}
            />
          </Icon>
          <Subtitle2 type="secondDarkColor">
            Este é um procedimento de segurança que você precisará fazer apenas
            uma vez.
          </Subtitle2>
        </Line>

        <Space n={2} />
        <Line>
          <Icon>
            <Image
              resizeMode={'contain'}
              style={{ width: 20, height: 20 }}
              source={require('../../assets/img/dado.png')}
            />
          </Icon>
          <Subtitle2 type="secondDarkColor">
            Procure um lugar iluminado e não cubra seu rosto com o documento.
          </Subtitle2>
        </Line>

        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={'contain'}
            style={{ height: '100%', maxWidth: '75%' }}
            source={require('../../assets/img/selfie.png')}
          />
        </ImageContent>
        <Space n={4} />
      </Content>
      <Footer>
        <View style={{ flex: 1 }}>
          <ButtonsRow>
            <ButtonComponent
              width="100%"
              disabled={loading}
              type="CallToAction-Light"
              onPress={onCameraPress}
            >
              Abrir câmera
            </ButtonComponent>
          </ButtonsRow>

          <Space n={2} />
          <ButtonsRow>
            <ButtonComponent
              width="100%"
              disabled={loading}
              type="CallToAction-Outline"
              onPress={() => navigation.goBack()}
            >
              Agora não
            </ButtonComponent>
          </ButtonsRow>
        </View>
      </Footer>
    </MainContainer>
  );
};

export default ScreenOne;
