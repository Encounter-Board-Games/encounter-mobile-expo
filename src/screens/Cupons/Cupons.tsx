import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Button from '../../components/Button/Button';
import { H3, Subtitle2 } from '../../components/Typography';
import { Space } from '../../components/Space';
import ScreePopup from '../../components/ScreePopup';
import Box from '../../components/Box';
import NotLoggedBox from '../user/components/NotLoggedBox';
import InformationBox from '../../components/InformationBox';
import ProgressBar from '../../components/ProgressBar';
import { handleLoadCupons } from '../../store/actions/cupons';
import { handleSetSelects } from '../../store/actions/filters/handleSetFilters';
import { RootState } from '../../store/store';
import { View } from 'react-native';
import { translation } from '../../texts';
import { useNavigation } from '@react-navigation/native';

interface Cupon {
  title: any;
  description: any;
  search(search: any): void;
  progressBarText: any;
  progressBar: any;
  // Define the properties of the Cupon model
}

interface CuponsState {
  cupons: Cupon[];
}

const Container = styled.View`
  min-height: 100%;
  padding: ${(props) => props.theme.space.space2};
`;

const CuponContainer = styled.View`
  width: 100%;
`;

const Cupons: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cupons = undefined } = useSelector<RootState, CuponsState>(
    (state) => state.cupons
  );

  useEffect(() => {
    dispatch(handleLoadCupons());
  }, []);

  const hasCupons = cupons != undefined && cupons.length > 0;

  const openFilter = (filter: string) => {
    dispatch(handleSetSelects(filter));
    navigation.navigate('Busca');
  };

  return hasCupons ? (
    <View flex={1}>
      {cupons.map((cupon, index) => (
        <Box key={index}>
          <CuponContainer>
            <H3>{cupon.title}</H3>
            <Space n={2} />
            <Subtitle2 type="secondDarkColor">{cupon.description}</Subtitle2>
            <Space n={2} />
            <Button
              type="CallToAction-Outline"
              onPress={() => openFilter(cupon.search)}
            >
              {translation('cupon.btn')}
            </Button>
            <Space n={2} />
            <Subtitle2 width="100%" right type="secondDarkColor">
              {cupon.progressBarText}
            </Subtitle2>
            <Space n={1} />
            <ProgressBar percent={cupon.progressBar} />
          </CuponContainer>
        </Box>
      ))}
    </View>
  ) : (
    <InformationBox
      title="Você não possui cupons ativos."
      description="Assim que receber, poderá ver tudo por aqui!"
    />
  );
};

const CuponsScreen: FC = () => {
  const { isLogged = false } = useSelector<RootState, { isLogged: boolean }>(
    (state) => state.user
  );

  const isNotLoggedContent = () => (
    <NotLoggedBox title="Você não possui cupons ativos." />
  );

  return (
    <ScreePopup title="Cupons" withBorder>
      <Container>{isLogged ? <Cupons /> : isNotLoggedContent()}</Container>
    </ScreePopup>
  );
};

export default CuponsScreen;
