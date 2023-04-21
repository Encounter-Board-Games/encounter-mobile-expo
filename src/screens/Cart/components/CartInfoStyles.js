import styled from "styled-components";

export const Line = styled.View`
  flex: 1;
  flex-flow: row;
  align-items: center;
`;

export const Title = styled.View`
  flex: 1;
  padding-right: 8px;
`;

export const Remove = styled.TouchableOpacity`
    margin-right: ${(props) => props.theme.space.space1}
    justify-content:center;
    width: 24px;
    height: 24px;
`;

export const LineProducts = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const CupomContent = styled.View`
    margin: 4px;
    padding: ${(props) => props.theme.space.space2}
    padding-top: ${(props) => props.theme.space.space1}
    padding-bottom: ${(props) => props.theme.space.space1}
    background: ${(props) => props.theme.colors.lightColor}
    border-radius: ${(props) => props.theme.borderRadius.button}
    shadow-color: ${(props) => props.theme.shadow.shadowColor};
    shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width} ${(
  props
) => props.theme.shadow.shadowOffset.width} ;
    shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
    shadow-radius: ${(props) => props.theme.shadow.shadowRadius};
    elevation: ${(props) => props.theme.shadow.elevation};
`;

export const Hr = styled.View`
  background: ${(props) => props.theme.colors.secondLightColor};
  height: 1.5px;
  width: 100%;
`;