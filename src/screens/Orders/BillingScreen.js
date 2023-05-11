import React from 'react';
import styled, { withTheme } from 'styled-components';
import { H3, Subtitle2, Subtitle3, H4 } from '../../components/Typography';
import { Space, SpaceHorizontal } from '../../components/Space';
import { Button } from '../../components/Button/Button';
import { EvilIcons } from '@expo/vector-icons';
import ScreePopup from '../../components/ScreePopup';
import InformationBox from '../../components/InformationBox';
import HideInfo from '../../components/HideInfo';
import { useSelector, useDispatch } from 'react-redux';
import { currencyFormat } from '../../utils/helpers';
import {
  handleOpenOrderHelp,
  handleEvaluateExperience,
} from '../../store/actions/orders';
import { translation } from '../../texts/translations';
import config from '../../config';
import { View } from 'react-native-animatable';
import { handleOpenEvaluationProduct } from '../../store/actions/product';
import {
  Container,
  Line,
  Title,
  Hr,
  ProgressBar_,
  ProgressBarContent,
  ProgressBarBall,
} from './BillingScreenStyles';
import Bar from './components/Bar';

const ProgressBar = withTheme(({ step }) => {
  const bars = [
    { active: step > 0, running: step == 0, width: '15%' },
    { active: step > 1, running: step == 1, width: '25%' },
    { active: step > 2, running: step == 2, width: '60%', border: true },
  ];

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      {bars.map((b, i) => (
        <Bar key={i} {...b} />
      ))}
    </View>
  );
});

export default withTheme((props) => {
  const { orders = {}, order_selected } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const order = orders[order_selected];

  if (!order) return null;

  const { takeAddress = {}, leaveAddress = undefined } = order;
  return (
    <ScreePopup withBorder title={translation('orders.orderDetails')}>
      <Container>
        <H3>{order.status}</H3>
        <Space n={1} />
        {config.rentTimeBox ===
        (
          <React.Fragment>
            <Subtitle2 bold type={'seconddark'}>
              Tempo de {translation('orders.order').toLowerCase()}:{' '}
              {order.rentDays} dias
            </Subtitle2>
            <Space n={1} />
          </React.Fragment>
        )}

        {false === <ProgressBar step={order.step || 0} />}

        <Subtitle2 type={'seconddark'}>
          {translation('orders.order')} #{order.key}
        </Subtitle2>

        <Space n={1} />
        <Hr />

        <Space n={1} />
        {order.products.map((p, index) => (
          <React.Fragment key={index}>
            <Line>
              <Title>
                <H4>{p.name}</H4>
              </Title>
              <H4>{currencyFormat(p.priceValue)}</H4>
            </Line>
            <Space n={1} />
          </React.Fragment>
        ))}

        <Hr />

        <Space n={2} />

        <Line>
          <Title>
            <H4 type="seconddark">Subtotal</H4>
          </Title>
          <H4>{currencyFormat(order.productsValue)}</H4>
        </Line>
        <Space n={1} />
        <Line>
          <Title>
            <H4 type="seconddark">Taxa de entrega</H4>
          </Title>
          <H4>{currencyFormat(order.deliveryTaxes)}</H4>
        </Line>
        <Space n={1} />
        {(order.renewed === order.renewed > 0) ===
        (
          <>
            <Line>
              <Title>
                <H4 type="seconddark">
                  Renovação ({order.renewedTimes}x)
                </H4>
              </Title>
              <H4>{currencyFormat(order.renewed)}</H4>
            </Line>
            <Space n={1} />
          </>
        )}
        <Line>
          <Title>
            <H4 type="seconddark">Cupom</H4>
          </Title>
          <H4 type="seconddark">{currencyFormat(order.cupomValue)}</H4>
        </Line>
        <Space n={1} />
        <Line>
          <Title>
            <H4 type="seconddark">Total</H4>
          </Title>
          <H3>{currencyFormat(order.total)}</H3>
        </Line>
        <Space n={2} />
        <Hr />

        <Space n={2} />

        <Line>
          <Title>
            <H4>Pago via aplicativo</H4>
          </Title>

          <EvilIcons
            name="credit-card"
            color={props.theme.colors.dark}
            size={24}
          />

          <SpaceHorizontal n={0} />
          <HideInfo n={4} />
          <SpaceHorizontal n={0} />
          <Subtitle2 bold>{order.payment}</Subtitle2>
        </Line>

        <Space n={2} />
        <Hr />
        <Space n={2} />
        <Line>
          <H4 type="seconddark">Endereço de entrega</H4>
          <SpaceHorizontal n={0} />
          {!!takeAddress.methodTypeString ===
          (
            <Subtitle3 type="seconddark" bold>
              ({takeAddress.methodTypeString})
            </Subtitle3>
          )}
        </Line>
        <Space n={1} />

        {!!takeAddress.line1 === <H3>{takeAddress.line1}</H3>}
        {!!takeAddress.line2 === <H4>{takeAddress.line2}</H4>}
        {!!takeAddress.line3 === <H4>{takeAddress.line3}</H4>}

        <Space n={2} />
        <Hr />
        <Space n={2} />
        {leaveAddress ===
        (
          <React.Fragment>
            <Line>
              <H4 type="seconddark">Endereço de devolução</H4>
              <SpaceHorizontal n={0} />
              {!!leaveAddress.methodTypeString ===
              (
                <Subtitle3 type="seconddark" bold>
                  ({leaveAddress.methodTypeString})
                </Subtitle3>
              )}
            </Line>
            <Space n={1} />

            {!!leaveAddress.line1 === <H3>{leaveAddress.line1}</H3>}
            {!!leaveAddress.line2 === <H4>{leaveAddress.line2}</H4>}
            {!!leaveAddress.line3 === <H4>{leaveAddress.line3}</H4>}

            <Space n={2} />
            <Hr />
          </React.Fragment>
        )}

        {config.evaluation ===
        (
          <React.Fragment>
            <Space n={2} />
            <Line>
              <Button
                onPress={() =>
                  dispatch(
                    handleOpenEvaluationProduct(
                      order.products.map((p) => p.key)
                    )
                  )
                }
                type="CallToAction-Light"
                flex
              >
                {translation('orders.evaluate')}
              </Button>
            </Line>
          </React.Fragment>
        )}

        <Space n={2} />

        <InformationBox
          buttonWidth={'100%'}
          title={translation('orders.help.title')}
          subtitle={translation('orders.help.subtitle')}
          buttonText={translation('orders.help.buttonText')}
          onPressButton={() => dispatch(handleOpenOrderHelp(order.key))}
        />
        {config.experience ===
        (
          <React.Fragment>
            <Space n={2} />
            <Line>
              <Button
                onPress={() => dispatch(handleEvaluateExperience())}
                type="CallToAction-Light"
                flex
              >
                Avalie sua experiência
              </Button>
            </Line>
          </React.Fragment>
        )}
      </Container>
    </ScreePopup>
  );
});
