import React, { useEffect } from 'react';
import { View } from 'react-native';
import { withTheme } from 'styled-components/native';
import { H3, Subtitle2 } from '../../components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from '../../components/Tag';
import {
  handleClearSelects,
  handleChangeFilteringText,
  handleSetMyFavorites,
  handleNeedTutorial,
} from '../../store/actions/filters/filters';
import ProductShelf from '../Product/components/ProductShelf';
import HeaderSeeAll from '../../components/HeaderSeeAll';
import FilterResult, { Space, Space2 } from './components/FilterResult';
import { translation } from '../../texts';
import config from '../../config';
import {
  Chips,
  Container,
  FlexContent,
  RecentItem,
  Space3,
} from './SearchStyles';
import SearchBar from '../../components/SearchBar/SearchBar';

interface Chip {
  text: string;
  isRemovable: boolean;
  type: string;
}

interface RootState {
  filters: {
    chips: Chip[];
    recentTexts: string[];
    isFiltered: boolean;
    isLoading: boolean;
  };
  user: {
    isLogged: boolean;
    userInfo: {
      favorites: string[];
    };
  };
}

const Search = () => {
  const {
    chips = [],
    recentTexts = [],
    isFiltered = false,
    isLoading = false,
  } = useSelector((state: RootState) => state.filters);
  const user = useSelector((state: RootState) => state.user);
  const { isLogged = false, userInfo = {} } = user;
  const favorites = userInfo.favorites || [];

  const dispatch = useDispatch();

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
      <Space2 />

      <FilterResult />
    </FlexContent>
  );

  const recents = () => (
    <FlexContent>
      <FlexContent>
        <Space3 />
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
                <Subtitle2 color={theme.colors.secondDarkColor}>
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
    <Screen noScroll>
      <Container>
        <SearchBar type="Filter" />
        {isFiltered || isLoading ? filterResult() : recents()}
      </Container>
    </Screen>
  );
};

export default withTheme(Search);
