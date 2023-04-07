import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeFilteringText } from '../store/actions/filters';
import { EvilIcons } from '@expo/vector-icons';
import { handleSearchLocationByTerm } from '../store/actions/address';

const SearchBarContainer = styled.View`
  padding-top: 8px;
  padding-bottom: 8px;
  height: 48px;
  background: white;
  border-radius: ${props => props.theme.borderRadius.button};
  align-items: center;
  flex-flow: row;    
  width: 100%;

  shadow-color: ${props => props.theme.shadow.shadowColor};
  shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width} ;
  shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
  shadow-radius: ${props => props.theme.shadow.shadowRadius};
  elevation: ${props => props.theme.shadow.elevation};
  padding-left: 12px;
`;

const ClearButton = styled(TouchableOpacity)`
  padding: 4px;
  background-color: ${props => props.theme.colors.secondLightColor};
  border-radius: 16px;
  justify-content: center;
  align-items:center;
  margin-right: ${props => props.theme.space.space1};
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: ${props => props.theme.colors.secondDarkColor};
  font-size: ${props => props.theme.sizes.subtitle3};
`;

const SearchBar = (props) => {
    const dispatch = useDispatch();
    const { type, clearButton, children } = props;
    const textMaxLength = type === 'Location' ? 9 : undefined;
    const textKeyboardType = type === 'Location' ? 'number-pad' : 'default';
    const placeholderText = type === 'Location' ? 'Buscar por cep' : 'Buscar';
    const text = useSelector(state => {
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
  }
  

  const handleChangeText = value => {
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length >= 6) {
      formattedValue = `${formattedValue.substring(0, 5)}-${formattedValue.substring(5, 8)}`;
    }
    if (type === 'Filter') {
      dispatch(handleChangeFilteringText(formattedValue));
    } else if (type === 'Location') {
      dispatch(handleSearchLocationByTerm(formattedValue.substring(0, 9), true));
    }
  };

  const handleClearText = () => {
    if (type === 'Filter') {
        dispatch(handleChangeFilteringText(''));
        } else if (type === 'Location') {
        dispatch(handleSearchLocationByTerm(''));
        }
        
        return (
        <SearchBarContainer>
        <SearchInput
             value={text}
             maxLength={textMaxLength}
             keyboardType={textKeyboardType}
             placeholder={placeholderText}
             onChangeText={handleChangeText}
           />
        {clearButtonVisible === (
        <ClearButton onPress={handleClearText}>
        <EvilIcons name="close" color="black" size={16} />
        </ClearButton>
        )}
        {children}
        </SearchBarContainer>
        );
        
        SearchBar.propTypes = {
        type: PropTypes.oneOf(['Filter', 'Location']).isRequired,
        clearButton: PropTypes.bool,
        children: PropTypes.node,
        };
        
        SearchBar.defaultProps = {
        clearButton: false,
        };
    };
        
        export default SearchBar;
