import styled from 'styled-components';
import { H3 } from '../../../components/Typography';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TextInput = styled.TextInput`
     height: 40px;
     width: 100%;
     border: 1.5px solid ${(props) => props.theme.colors.primary}
     background: ${(props) => props.theme.colors.primaryLight}
     padding-left: ${(props) => props.theme.space.s2}
     padding-right: ${(props) => props.theme.space.s2}
     border-radius: ${(props) => props.theme.borderRadius.button}
     font-size: ${(props) => props.theme.space.s2};
 `;

export const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
`;

export const Btn = styled.View`
  flex: 1 1 0px;
`;

export const Option_ = styled.TouchableOpacity`
  margin-top: ${(props) => props.theme.space.s1};
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: 40px;
  height: 40px;
  margin-left: ${(props) => props.theme.space.s1};
  margin-right: ${(props) => props.theme.space.s1};
`;

export const Option = ({ children, onPress }) => {
  return <Option_ onPress={onPress}>
    <H3 center>{children}</H3>
  </Option_>
  );
};
