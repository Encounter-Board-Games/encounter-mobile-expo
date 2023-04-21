import styled from 'styled-components';

export const Content = styled.ScrollView`
  flex: 1;
  padding: ${(props) => props.theme.space.space2};
`;

export const ContainerInputs = styled.View`
  flex: 1;
`;

export const Line = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const LineButtons = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${(props) => props.theme.space.space3};
`;

export const LineAddress = styled.View`
  flex-flow: row;
  align-items: center;
`;

export const Column = styled.View`
  flex-flow: column;
  flex: 1;
`;
