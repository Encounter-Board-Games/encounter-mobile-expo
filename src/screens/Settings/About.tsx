import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../../types/globals';
import ScreePopup from '../../components/ScreePopup';
import { Subtitle1, H3, H4 } from '../../components/Typography';
import { SpaceHorizontal } from '../../components/Space';
import Button from '../../components/Button/Button';
import theme from '../../theme/theme';
import { AboutState } from '../../types/globals';

interface ContainerProps {}

const Container = styled.View<ContainerProps>`
  padding: ${({ theme }) => theme.space.s2};
  padding-top: ${({ theme }) => theme.space.s3};
  padding-bottom: 0;
  flex: 1;
  height: 100%;
`;

const ButtonContent = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.space.s2};
`;

const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

type AboutScreenProps = {
  about: AboutState;
};

const AboutScreen: React.FC<AboutScreenProps> = ({ about }) => {
  const appState = useSelector((state: RootState) => state.app);
  const { about: aboutData }: { about: AboutState } = appState;

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
          <Button
            type={'CallToAction-Light'}
            onPress={openInstagram}
            theme={theme}
          >
            Ir para o Instagram
          </Button>
        </ButtonContent>
      )}
      theme={theme}
    >
      <Container>
        <Subtitle1>{aboutData.aboutText}</Subtitle1>

        <SpaceHorizontal n="s3" />
        <H3 color="secondaryDark">Conheça nosso instagram</H3>

        <SpaceHorizontal n="s0" />
        <Line>
          <Ionicons
            color={theme.colors.secondaryDark}
            size={20}
            name="logo-instagram"
          />
          <SpaceHorizontal n="s1" />
          <H4 type="secondaryDark">@{aboutData.instagram}</H4>
        </Line>
      </Container>
    </ScreePopup>
  );
};

export default AboutScreen;
