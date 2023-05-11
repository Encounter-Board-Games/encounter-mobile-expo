import React from 'react';
import { H3, H4 } from '../../../components/Typography';
import { Space } from '../../../components/Space';
import { View } from 'react-native';
import { currencyFormat } from '../../../utils/helpers';
import { Line, Title, CupomContent, Hr } from './CartInfoStyles';

interface CupomProps {
  cupom: {
    title: string;
    discount: number;
  } | null;
}

export const Cupom: React.FC<CupomProps> = ({ cupom }) => {
  return (
    <>
      <Space n={2} />
      <H3 type="seconddark">Cupom de desconto</H3>
      <Space n={2} />
      <CupomContent>
        {cupom ? <H4>{cupom.title}</H4> : <H4>Sem cupom disponível</H4>}
      </CupomContent>

      <Space n={2} />
      <Hr />
    </>
  );
};

interface BillingProps {
  renew: boolean;
  subtotal: number;
  deliveryTaxes?: number;
  total?: number;
  cupom: {
    title: string;
    discount: number;
  } | null;
}

export const Billing: React.FC<BillingProps> = ({
  renew,
  subtotal,
  deliveryTaxes,
  total,
  cupom,
}) => {
  return (
    <View>
      <Space n={2} />

      {!renew && (
        <>
          <Line>
            <Title>
              <H4 type="seconddark">Subtotal</H4>
            </Title>
            <H4>{currencyFormat(subtotal)}</H4>
          </Line>
          <Space n={1} />
          <Line>
            <Title>
              <H4 type="seconddark">Taxa de entrega</H4>
            </Title>
            <H4 type="seconddark">
              {deliveryTaxes === undefined
                ? 'a calcular'
                : currencyFormat(deliveryTaxes)}
            </H4>
          </Line>
          <Space n={1} />
          <Line>
            <Title>
              <H4 type="seconddark">Cupom de desconto</H4>
            </Title>
            <H4 type="primaryDark">
              {cupom?.discount ? currencyFormat(cupom.discount) : '-'}
            </H4>
          </Line>

          <Space n={1} />
        </>
      )}
      <Line>
        <Title>
          <H3>Total</H3>
        </Title>
        <H3>{total !== undefined ? currencyFormat(total) : '-'}</H3>
      </Line>
      <Space n={2} />
      <Hr />
    </View>
  );
};
