import React, { useRef, useEffect } from 'react';
import { Modalize, IHandles } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { SpaceHorizontal } from '../../components/Space';
import { H3, Subtitle2 } from '../../components/Typography';
import { closeInfoModal } from '../../store/actions/info';
import {
  Container,
  Header,
  CloseButton,
  Content,
  SafeSpace,
} from './InfoModalStyles';
import { RootState } from '../../types/globals';

interface InfoModalProps {}

const InfoModal: React.FC<InfoModalProps> = () => {
  const dispatch = useDispatch();
  const modalRef = useRef<Modalize>(null);
  const info: { open?: boolean; content?: any[]; title?: string } = useSelector(
    (state: RootState) => state.app.modalInfo || {}
  );
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (info.open && !modalRef.current?.getContent()?.state.isVisible) {
      modalRef.current?.open();
    }
    if (!info.open && modalRef.current?.getContent()?.state.isVisible) {
      modalRef.current?.close();
    }
  }, [info.open]);

  const { content = [], title = '' } = info;

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.light }}
      onClosed={() => dispatch(closeInfoModal())}
      ref={modalRef}
    >
      <Container>
        <Header onPress={() => dispatch(closeInfoModal())}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color={theme.colors.dark}
              size={16}
            />
          </CloseButton>
          <H3 center>{title}</H3>
        </Header>
        <SpaceHorizontal n="s3" />
        <Content>
          {content.map(
            (
              item: {
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | boolean
                  | React.ReactPortal
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | React.ReactFragment
                  | null
                  | undefined;
              },
              i: React.Key | null | undefined
            ) => (
              <React.Fragment key={i}>
                <H3 type="primaryDark">{item.name}</H3>
                <SpaceHorizontal n="s0" />
                <Subtitle2>{item.description}</Subtitle2>
                <SpaceHorizontal n="s3" />
              </React.Fragment>
            )
          )}
        </Content>
        <SafeSpace />
      </Container>
    </Modalize>
  );
};

export default InfoModal;
