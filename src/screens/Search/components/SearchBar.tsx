import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../../components/SearchBar/SearchBar';
// eslint-disable-next-line max-len
import { handleChangeFilteringText } from '../../../store/actions/filters/filters';
import {
  SearchButton,
  SearchFiltersNumber,
  SearchFiltersNumberText,
  SearchButtonText,
} from './SearchBarStyles';

const FilterSearchBar = () => {
  const navigation = useNavigation();
  const numberOfFilters =
    useSelector((state) => state.filters.numberOfFilters) || 0;

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters);

  const text = filter.text || '';

  return (
    <SearchBar
      type="Filter"
      clearButton
      value={text}
      onChangeText={(e) => dispatch(handleChangeFilteringText(e))}
    >
      <SearchButton onPress={() => navigation.navigate('Filter')}>
        {numberOfFilters > 0 && (
          <SearchFiltersNumber>
            <SearchFiltersNumberText>{numberOfFilters}</SearchFiltersNumberText>
          </SearchFiltersNumber>
        )}

        <SearchButtonText>Filtros</SearchButtonText>
      </SearchButton>
    </SearchBar>
  );
};

export default FilterSearchBar;
