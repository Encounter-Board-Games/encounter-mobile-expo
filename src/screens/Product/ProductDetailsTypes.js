import styled from 'styled-components';

export const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
  width: 100%;
  min-height: 100%;
`;

export const Tags = styled.View`
  width: 100%;
  flex-flow: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space.space1};
`;

export const Line = styled.View`
  flex-flow: row;
  width: 100%;
  height: auto;
`;

export const MainLine = styled.View`
  flex: 1;
`;

export const ToolBar = styled.View`
    flex-flow: row;
    margin-top: ${(props) => props.theme.space.space2}
    margin-bottom: ${(props) => props.theme.space.space2};
    
    align-items: center;;
    justify-content: flex-start;
    position: relative;
`;

export const Dices = styled.View`
    flex-flow: row;
    align-items: center;
    flex: 1
    margin-right: ${(props) => props.theme.space.space3}
`;

export const DicesNumber = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondDarkColor};
  margin-left: ${(props) => props.theme.space.space0};
`;

export const Icon = styled.TouchableOpacity`
    padding-right: ${(props) => props.theme.space.space1}
    align-items:center;
    justify-content: center;
`;

export const Price = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkColor};
  text-align: right;
  font-family: Nunito-Bold;
`;

export const VideoPlayer = styled.TouchableOpacity`
  flex-flow: row;
  margin-top: ${(props) => props.theme.space.space2};
  align-items: center;
  height: 24px;
`;

export const VideoPlayerText = styled.Text`
  font-size: 12px;
  font-family: Nunito;
  margin-left: ${(props) => props.theme.space.space1};
  color: ${(props) => props.theme.colors.secondDarkColor};
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.colors.secondDarkColor};
`;

export const Description = styled.View`
  margin-top: ${(props) => props.theme.space.space2};
  font-family: Nunito;
`;

export const CarrosselContainer = styled.View`
  align-items: center;
`;

export const Header = styled.View`
  padding: ${(props) => props.theme.space.space2};
`;

export const ButtonContent = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
`;
