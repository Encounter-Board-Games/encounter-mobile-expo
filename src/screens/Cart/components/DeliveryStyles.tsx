import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface Theme {
  colors: {
    secondaryLight: string;
  };
  space: {
    s3: string;
  };
}

export const Hr = styled.View<{ theme: Theme }>`
  background: ${(props) => props.theme.colors.secondaryLight};
  height: 1.5px;
`;

export const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

export const AddressItem = styled(TouchableOpacity)<{ theme: Theme }>`
  flex-flow: row;
  width: 100%;
  margin-top: ${(props) => props.theme.space.s3};
`;

export const AddressSelect = styled.View`
  padding-top: 2px;
`;

export const Address = styled.View`
  flex: 1;
`;

export const ImageContent = styled.View`
  height: 32px;
  width: 32px;
`;

export const Arrow = styled(TouchableOpacity)`
  height: 100%;
  width: 32px;
`;
