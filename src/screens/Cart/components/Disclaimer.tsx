import React from 'react';
import { H3, H4 } from '../../../components/Typography';
import { Space } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Box from '../../../components/Box';
import { translation } from '../../../texts';
import { handleOpenCart } from '../../../store/actions/cart/cart';
import { Line, Hr } from './CartInfoStyles';

interface DisclaimerProps {
  time: number;
  products: any[];
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ time, products }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const keepBuying = () => {
    dispatch(handleOpenCart(false));
    navigation.navigate('Início');
  };

  return (
    <>
      <View style={{ margin: 4 }}>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              {translation('cart.rentTimeBox.title')}
            </H3>
            {time && <H3>{translation('cart.rentTimeBox.time', { time })}</H3>}
          </Line>
          <Space n={2} />
          {products.length <= 1 && (
            <>
              <Line>
                <H4 flex type="secondDarkColor">
                  {translation('cart.rentTimeBox.description')}
                </H4>
              </Line>
              <Space n={2} />
            </>
          )}
          <Button type="CallToAction-Outline-Flex" onPress={keepBuying}>
            {translation('cart.rentTimeBox.button')}
          </Button>
        </Box>
      </View>

      <Hr />
    </>
  );
};

interface DisclaimerRenewProps {
  time: number;
}

export const DisclaimerRenew: React.FC<DisclaimerRenewProps> = ({ time }) => {
  return (
    <>
      <View>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              Tempo de renovação do aluguel
            </H3>
            {time && <H3>+{time} dias</H3>}
          </Line>
        </Box>
      </View>
      <Hr />
      <Space n={2} />
    </>
  );
};
