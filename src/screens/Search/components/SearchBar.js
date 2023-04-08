import React from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from '../../../components/SearchBar'
import { handleChangeFilteringText } from '../../../store/actions/filters'

const SearchButton = styled.TouchableOpacity`
   
    min-width: 25%;
    border-left-width: .5px;
    margin-top: 8px;
    margin-bottom: 8px;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    
    border-color: #414042;
`

const SearchButtonText = styled.Text`
    font-size: 14px;
    color: #414042;
`

const SearchFiltersNumber = styled.View`
    background: #414042;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: ${props => props.theme.borderRadius.tag};
    margin-right: 2px;
`
const SearchFiltersNumberText = styled.Text`
    font-size: 14px;
    color: "#FAFAFA";
`


export default () => {
    const navigation = useNavigation()
    const numberOfFilters = useSelector(state => state.filters.numberOfFilters) || 0
    
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filters)
    
    const text = filter.text || ''

    return (<SearchBar type="Filter" clearButton value={text} onChangeText={(e) => dispatch(handleChangeFilteringText(e)) }>
        <SearchButton onPress={() =>  navigation.navigate('Filter')}>
            {
                numberOfFilters > 0 && (<SearchFiltersNumber>
                    <SearchFiltersNumberText>{numberOfFilters}</SearchFiltersNumberText>
                </SearchFiltersNumber>)
            }

            <SearchButtonText>Filtros</SearchButtonText>
        </SearchButton>
    </SearchBar>)
}