/* eslint-disable indent */
import styled from 'styled-components/native';

export interface HProps {
  type?: ThemeColorKey;
  center?: boolean;
  noBold?: boolean;
  bold?: boolean;
  flex?: string;
  color?: string;
  underline?: boolean;
  right?: boolean;
  width?: string;
}

export type ThemeColorKey =
  | 'primary'
  | 'primaryDark'
  | 'primaryLight'
  | 'secondary'
  | 'secondaryDark'
  | 'secondaryLight'
  | 'complement'
  | 'light'
  | 'dark'
  | 'success'
  | 'warning'
  | 'danger';

export const H1 = styled.Text<HProps>`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.h1};
  color: ${(props) => {
    if (!props.type) return props.theme.colors.dark;
    return props.theme.colors[props.type];
  }};
`;

export const H2 = styled.Text<HProps>`
  font-family: ${({ noBold }) => (noBold ? 'Nunito' : 'Nunito-Bold')};
  font-size: ${({ theme }) => theme.sizes.h2}px;
  color: ${({ type, theme }) =>
    type ? theme.colors[type] : theme.colors.dark};
  ${({ center }) => (center ? 'text-align: center;' : '')}
`;

export const H3 = styled.Text<HProps>`
  font-family: Nunito-Bold;
  font-size: ${({ theme }) => theme.sizes.h3}px;
  color: ${({ type, theme }) =>
    type ? theme.colors[type] : theme.colors.dark};
  ${({ flex }) => (flex ? 'flex: 1;' : '')}
  ${({ center }) => (center ? 'text-align: center;' : 'text-align: left;')}
`;

export const H4 = styled.Text<HProps>`
  font-family: Nunito;
  font-size: ${({ theme }) => theme.sizes.h4}px;
  color: ${({ type, theme }) =>
    type ? theme.colors[type] : theme.colors.dark};
  ${({ center }) => (center ? 'text-align: center;' : '')}
  ${({ flex }) => (flex ? 'flex: 1;' : '')}
`;

export const Subtitle1 = styled.Text<HProps>`
  font-size: ${({ theme }) => theme.sizes.subtitle1}px;
  color: ${({ type, color, theme }) =>
    color ? color : type ? theme.colors[type] : theme.colors.dark};
  ${({ center }) => (center ? 'text-align: center;' : '')}
  ${({ underline, color }) =>
    underline
      ? `text-decoration: underline; text-decoration-color: ${
          color ? color : 'inherit'
        };`
      : ''};
`;

export const Subtitle2 = styled.Text<HProps>`
  font-family: ${({ bold }) => (bold ? 'Nunito-Bold' : 'Nunito')};
  font-size: ${({ theme }) => theme.sizes.subtitle2}px;
  color: ${({ type, color, theme }) =>
    color ? color : type ? theme.colors[type] : theme.colors.dark};
  ${({ flex }) => (flex ? 'flex: 1;' : '')}
  ${({ center }) => (center ? 'text-align: center;' : '')}
  ${({ width }) => (width ? `width: ${width}` : '')}
  ${({ right }) => (right ? 'text-align: right;' : '')}
  ${({ underline, color }) =>
    underline
      ? `text-decoration: underline; text-decoration-color: ${
          color ? color : 'inherit'
        };`
      : ''};
`;

export const Subtitle3 = styled.Text<HProps>`
  font-size: ${({ theme }) => theme.sizes.subtitle3}px;
  color: ${({ type, theme }) =>
    type ? theme.colors[type] : theme.colors.dark};
  ${({ center }) => (center ? 'text-align: center;' : '')}
`;

export const Button1Text = styled.Text`
  font-size: ${({ theme }) => `${theme.sizes.button1}px`};
  color: ${({ theme }) => theme.colors.dark};
`;

export const Button2Text = styled.Text`
  font-size: ${({ theme }) => `${theme.sizes.button2}px`};
  color: ${({ theme }) => theme.colors.dark};
`;

export const Button3Text = styled.Text`
  font-size: ${({ theme }) => `${theme.sizes.button3}px`};
  color: ${({ theme }) => theme.colors.dark};
`;

export const Button4Text = styled.Text`
  font-size: ${({ theme }) => `${theme.sizes.button4}px`};
  color: ${({ theme }) => theme.colors.dark};
`;
