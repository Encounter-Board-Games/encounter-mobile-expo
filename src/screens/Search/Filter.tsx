import React from 'react';
import styled, { ThemeProps, withTheme } from 'styled-components/native';
import FilterItem from './components/FilterItem';
import ScreePopup from '../../components/ScreePopup';
import { handleClearSelects } from '../../store/actions/filters/filters';
import { useDispatch, useSelector } from 'react-redux';
import { Theme, useNavigation } from '@react-navigation/native';
import { translation } from '../../texts';
import { ButtonComponent } from '../../components/Button/ButtonStyles';

interface FilterProps {
  theme: Theme;
}

const Container = styled.View<ThemeProps<Theme>>`
  padding: ${(props) => props.theme.space.space2};
  padding-top: ${(props) => props.theme.space.space0};
  flex: 1;
`;

const Filter = ({ theme }: FilterProps) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters) || [];
  const { selects = {} } = useSelector((state) => state.filters);
  const navigation = useNavigation();

  return (
    <ScreePopup
      title="Filtros"
      tooltext="Limpar tudo"
      withBorder
      onToolPress={() => dispatch(handleClearSelects())}
    >
      <Container>
        {filters.map((f) => (
          <FilterItem
            key={f.type}
            {...f}
            selects={selects[f.type] || []}
            tags={f.options}
            values={f.values}
          />
        ))}
        <ButtonComponent
          onPress={() => navigation.navigate('Busca')}
          type={'CallToAction-Light'}
          width="100%"
        >
          {translation('search.button')}
        </ButtonComponent>
      </Container>
    </ScreePopup>
  );
};

export default withTheme(Filter);
