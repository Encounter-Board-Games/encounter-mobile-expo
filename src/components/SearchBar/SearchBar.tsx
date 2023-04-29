import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { RootState } from '../../types/globals';
import {
  handleChangeFilteringText,
  handleFilterAction,
} from '../../store/actions/filters/handleFilters';
// eslint-disable-next-line max-len
import { handleSearchLocationByTerm } from '../../store/actions/address/address';
import { handleAddressAction } from '../../store/actions/address/address';
import {
  SearchBarContainer,
  SearchInput,
  ClearButton,
} from './SearchBarStyles';

interface SearchBarProps {
  type: 'Filter' | 'Location';
  clearButton?: boolean;
  children?: React.ReactNode;
}

const SearchBar: FC<SearchBarProps> = ({
  type,
  clearButton = false,
  children,
}) => {
  const dispatch = useDispatch();
  const textMaxLength = type === 'Location' ? 9 : undefined;
  const textKeyboardType = type === 'Location' ? 'number-pad' : 'default';
  const placeholderText = type === 'Location' ? 'Buscar por cep' : 'Buscar';
  const text = useSelector((state: RootState) => {
    if (type === 'Filter') {
      const filter = state.filters;
      return filter.text || '';
    } else if (type === 'Location') {
      const address = state.address;
      return address.searchLocations?.term || '';
    }
    return '';
  });

  const clearButtonVisible = clearButton ? text !== '' : false;

  const handleChangeText = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length >= 6) {
      formattedValue = `${formattedValue.substring(
        0,
        5
      )}-${formattedValue.substring(5, 8)}`;
    }
    if (type === 'Filter') {
      const action = handleChangeFilteringText(formattedValue);
      dispatch(action);
    } else if (type === 'Location') {
      const action = handleSearchLocationByTerm(
        formattedValue.substring(0, 9),
        true
      );
      dispatch(action);
    }
  };

  const handleClearText = () => {
    if (type === 'Filter') {
      const action = handleFilterAction('');
      dispatch(action);
    } else if (type === 'Location') {
      const action = handleAddressAction({ searchLocations: { term: '' } });
      dispatch(action);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        value={text}
        maxLength={textMaxLength}
        keyboardType={textKeyboardType}
        placeholder={placeholderText}
        onChangeText={handleChangeText}
      />
      {clearButtonVisible && (
        <ClearButton onPress={handleClearText}>
          <EvilIcons name="close" color="black" size={16} />
        </ClearButton>
      )}
      {children}
    </SearchBarContainer>
  );
};

export default SearchBar;
