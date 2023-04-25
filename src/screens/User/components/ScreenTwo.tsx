import * as React from 'react';
import { Space } from '../../../components/Space';
import { H2, Subtitle2 } from '../../../components/Typography';
import { Image, View } from 'react-native';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';
import {
  MainContainer,
  Line,
  Icon,
  ImageContent,
  Content,
  Footer,
  ButtonsRow,
} from '../UserStyles';

interface Props {
  loading: boolean;
  onOkClick: () => void;
}

const ScreenTwo: React.FC<Props> = ({ loading, onOkClick }) => {
  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H2 noBold>
          Estamos analisando sua foto e em breve você receberá um retorno pelo
          e-mail e aplicativo.
        </H2>
        <Space n={3} />
        <H2 noBold>
          Enquanto isso, <H2>você pode fazer seu pedido de aluguel.</H2>
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
          <Content>
            <Subtitle2 type="secondDarkColor">
              Assim que aprovarmos o seu cadastro, seu pedido será logo
              efetuado.
            </Subtitle2>
          </Content>
        </Line>

        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={'contain'}
            style={{ height: '100%', maxWidth: '60%' }}
            source={require('../../assets/img/selfie-2.png')}
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
              onPress={onOkClick}
            >
              Ok
            </ButtonComponent>
          </ButtonsRow>
        </View>
      </Footer>
    </MainContainer>
  );
};

export default ScreenTwo;
