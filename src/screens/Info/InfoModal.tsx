import React, { useRef, useEffect } from 'react';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { Space } from '../../components/Space';
import { H3, Subtitle2 } from '../../components/Typography';
import { closeInfoModal } from '../../store/actions/info';
import {
  Container,
  Header,
  CloseButton,
  Content,
  SafeSpace,
} from './InfoModalStyles';
import { Theme } from '../../styles/theme-types';
import { RootState } from '../../store/Store';

interface InfoModalProps {
  theme: Theme;
}

const withTheme = (Component: React.ComponentType<any>) => {
  const ThemedComponent = (props: any) => {
    const theme = useSelector((state: RootState) => state.theme);
    return <Component {...props} theme={theme} />;
  };
  return ThemedComponent;
};

const InfoModal: React.FC<InfoModalProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);
  const info = useSelector((state: RootState) => state.info?.infoModal || {});

  useEffect(() => {
    if (info.open && !modalRef.current?.state.isVisible) {
      modalRef.current?.open();
    }
    if (!info.open && modalRef.current?.state.isVisible) {
      modalRef.current?.close();
    }
  }, [info.open]);

  const { content = [], title = '' } = info;

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.lightColor }}
      onClosed={() => dispatch(closeInfoModal())}
      HeaderComponent={undefined}
      ref={modalRef}
    >
      <Container behavior="padding">
        <Header onPress={() => dispatch(closeInfoModal())}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color={theme.colors.darkColor}
              size={16}
            />
          </CloseButton>
          <H3 center>{title}</H3>
        </Header>
        <Space n={3} />
        <Content>
          {content.map((item, i) => (
            <React.Fragment key={i}>
              <H3 type="primaryDarkColor">{item.name}</H3>
              <Space n={0} />
              <Subtitle2>{item.description}</Subtitle2>
              <Space n={3} />
            </React.Fragment>
          ))}
        </Content>
        <SafeSpace />
      </Container>
    </Modalize>
  );
};

export default withTheme(InfoModal);
