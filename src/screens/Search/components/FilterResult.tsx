import React, { useState } from 'react';
import ProductItem from '../../product/components/ProductItem';
// eslint-disable-next-line max-len
import { handleSetRecentsFilteringText } from '../../../store/actions/filters/handleSetFilters';
import { useSelector, useDispatch } from 'react-redux';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { Subtitle3 } from '../../../components/Typography';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';
import { translation } from '../../../texts';
import { Space2, Space } from '../SearchStyles';
import { ContentLine } from './SearchBarStyles';

export interface Props {
  results?: Array<number>;
  isLoading?: boolean;
}

const FilterResult: React.FC<Props> = ({ results = [], isLoading = false }) => {
  const filters = useSelector((state: any) => state.filters);
  const dispatch = useDispatch();
  const [productsShow, setProductsShow] = useState<Array<number>>([]);

  const ids = isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : results;

  const idsLines = [];
  let index = 0;
  for (let i = 0; i < ids.length / 2; i++) {
    idsLines.push({
      ids: [ids[i * 2], ids[i * 2 + 1]].filter((c) => c),
      index: index,
    });
    index++;
  }

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    console.log(viewableItems);
    setProductsShow(viewableItems.map((i: any) => i.index));
  });
  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 20,
  });

  return (
    <>
      {results.length > 0 && !isLoading && (
        <Subtitle3 type="secondDarkColor">
          {results.length} resultado{results.length === 1 ? '' : 's'}
        </Subtitle3>
      )}
      {results.length === 0 && !isLoading && (
        <Subtitle3 type="secondDarkColor">
          {translation('search.noResult')}
        </Subtitle3>
      )}
      {isLoading && (
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={25} noMargin height={24} />
        </Placeholder>
      )}
      <FlatList
        style={{ flex: 1, width: '100%' }}
        showsVerticalScrollIndicator={false}
        data={idsLines}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item, index }) => (
          <View style={{ minHeight: 220 }}>
            <Space2 />
            <ContentLine>
              <ProductItem
                showRemember
                numberOfLines={1}
                isLoading={isLoading}
                onPress={() => dispatch(handleSetRecentsFilteringText())}
                flex
                showPrice
                id={item.ids[0]}
                showImage={productsShow.includes(index)}
              />
              <Space />
              <ProductItem
                showRemember
                numberOfLines={1}
                isLoading={isLoading}
                onPress={() => dispatch(handleSetRecentsFilteringText())}
                flex
                showPrice
                id={item.ids.length === 2 ? item.ids[1] : undefined}
                showImage={productsShow.includes(index)}
              />
            </ContentLine>
          </View>
        )}
        keyExtractor={(item, index) => '' + item.index}
      />
    </>
  );
};

export default FilterResult;
