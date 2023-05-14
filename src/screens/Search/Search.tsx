import React, { useEffect, FunctionComponent } from 'react';
import { View as RNView } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { H3, Subtitle2 } from '../../components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Tag from '../../components/Tag';
// eslint-disable-next-line max-len
import { handleSetMyFavorites } from '../../store/actions/filters/handleSetFilters';
import {
  handleClearSelects,
  handleChangeFilteringText,
} from '../../store/actions/filters/handleFilters';
// eslint-disable-next-line max-len
import { handleNeedTutorial } from '../../store/actions/filters/tutorialFilters';
import ProductShelf from '../product/components/ProductShelf';
import HeaderSeeAll from '../../components/HeaderSeeAll';
import { s2, Space } from './SearchStyles';
import FilterResult from './components/FilterResult';
import { translation } from '../../texts/translations';
import config from '../../config';
import {
  Chips,
  Container,
  FlexContent,
  RecentItem,
  s3,
} from './SearchStyles';
import SearchBar from '../../components/SearchBar/SearchBar';
import theme from '../../theme/theme';

const Screen = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const View = styled(RNView)`
  flex: 1;
`;

export interface Chip {
  text: string;
  isRemovable: boolean;
  type: string;
}

export interface RootState {
  address: any;
  filters: {
    chips: Chip[];
    recentTexts: string[];
    isFiltered: boolean;
    isLoading: boolean;
  };
  user: {
    isLogged: boolean;
    userInfo: {
      favorites?: string[];
    };
  };
}

const Search: FunctionComponent = () => {
  const {
    chips = [],
    recentTexts = [],
    isFiltered = false,
    isLoading = false,
  } = useSelector((state: RootState) => state.filters);
  const user = useSelector((state: RootState) => state.user);
  const { isLogged = false, userInfo = {} } = user;
  const favorites = userInfo.favorites || [];

  const dispatch = useDispatch<ThunkDispatch<RootState, void, any>>();

  useEffect(() => {
    dispatch(handleNeedTutorial());
  }, [dispatch]);

  const filterResult = () => (
    <FlexContent>
      <Chips showsHorizontalScrollIndicator={false} horizontal>
        {chips.map((chip, index) => (
          <Tag
            key={index}
            isSelected
            onClose={
              chip.isRemovable
                ? () => dispatch(handleClearSelects(chip.type))
                : undefined
            }
          >
            {chip.text}
          </Tag>
        ))}
      </Chips>
      <s2 />

      <FilterResult />
    </FlexContent>
  );

  const recents = () => (
    <FlexContent>
      <FlexContent>
        <s3 />
        <H3>Buscas Recentes</H3>
        <Space />
        {recentTexts && recentTexts.length > 0 ? (
          recentTexts
            .map((e) => e)
            .reverse()
            .map((item, index) => (
              <RecentItem
                key={index}
                onPress={() => dispatch(handleChangeFilteringText(item, false))}
              >
                <Subtitle2 color={theme.colors.seconddark}>
                  {item}
                </Subtitle2>
              </RecentItem>
            ))
        ) : (
          <Subtitle2 type="secondColor">
            Você ainda não possui buscas recentes
          </Subtitle2>
        )}
      </FlexContent>
      {isLogged && config.favorites && (
        <FlexContent>
          <HeaderSeeAll
            title="Meus Favoritos"
            showSeeAll={favorites.length > 0}
            onSeeAllPress={() => dispatch(handleSetMyFavorites())}
          />
          <Space />
          {favorites.length > 0 ? (
            <View flex={1}>
              <ProductShelf hidePrice noFlex showRemember ids={favorites} />
            </View>
          ) : (
            <Subtitle2 type="secondColor">
              {translation('search.favorites')}
            </Subtitle2>
          )}
        </FlexContent>
      )}
    </FlexContent>
  );

  return (
    <Screen>
      <Container>
        <SearchBar type="Filter" />
        {isFiltered || isLoading ? filterResult() : recents()}
      </Container>
    </Screen>
  );
};

export default withTheme(Search);
