import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../../store/reducers';
import { AboutState } from '../../store/types';
import ScreePopup from '../../components/ScreePopup';
import { Subtitle3, Subtitle1, H3, H4 } from '../../components/Typography';
import { Space, SpaceHorizontal } from '../../components/Space';
import { Button } from '../../components/Button/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface ContainerProps {}

const Container = styled.View<ContainerProps>`
  padding: ${({ theme }) => theme.space.space2};
  padding-top: ${({ theme }) => theme.space.space3};
  padding-bottom: 0;
  flex: 1;
  height: 100%;
`;

const ButtonContent = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.space2};
`;

const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

interface Props {}

const AboutScreen: React.FC<Props> = withTheme((props) => {
  const { about = {} }: { about: AboutState } = useSelector(
    (state: RootState) => state.app
  );

  const openInstagram = () => {
    Linking.openURL('instagram://user?username=' + about.instagram).catch(
      () => {
        Linking.openURL('http://instagram.com.br/' + about.instagram).catch();
      }
    );
  };

  return (
    <ScreePopup
      title={'Sobre' + (about.nameAbout || '')}
      footer={() => (
        <ButtonContent>
          <Button type={'CallToAction-Light'} onPress={openInstagram}>
            Ir para o Instagram
          </Button>
        </ButtonContent>
      )}
      withBorder
    >
      <Container>
        <Subtitle1>{about.aboutText}</Subtitle1>

        <Space n={3} />
        <H3 type="secondDarkColor">Conheça nosso instagram</H3>

        <Space n={0} />
        <Line>
          <Ionicons
            color={props.theme.colors.secondDarkColor}
            size={20}
            name="logo-instagram"
          />
          <SpaceHorizontal n={1} />
          <H4 type="secondDarkColor">@{about.instagram}</H4>
        </Line>
      </Container>
    </ScreePopup>
  );
});

export default AboutScreen;
