import React, { useEffect, useRef } from 'react';
import { withTheme, ThemeProps } from 'styled-components/native';
import { Modalize } from 'react-native-modalize';
import { Entypo } from '@expo/vector-icons';
import { translation } from '../../../texts/translations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, CloseButton } from './InfoModalStyles';
import { H3 } from '../../../components/Typography';
import { Theme } from '../../../styles/themeTypes';

interface Props extends ThemeProps<{}> {
  theme: Theme;
  onClose: () => void;
}

const RenewCartInfo: React.FC<Props> = ({ theme, onClose }) => {
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, [modalRef]);

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.light }}
      HeaderComponent={
        <Header onPress={onClose}>
          <CloseButton>
            <Entypo
              name="chevron-thin-down"
              color={theme.colors.dark}
              size={16}
            />
          </CloseButton>
          <H3 center>{translation('cart.cartName')}</H3>
        </Header>
      }
      ref={modalRef}
    >
      <SafeAreaView />
    </Modalize>
  );
};

export default withTheme(RenewCartInfo);
