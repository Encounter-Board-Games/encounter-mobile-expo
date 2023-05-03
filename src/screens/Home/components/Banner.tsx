import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { handleProcessActions } from '../../../store/actions/shared';
import Carrossel from '../../../components/Carrossel';
import { AnyAction } from 'redux';

export const BannerContainer = styled.View`
  width: 100%;
  height: 200px;
  max-height: 200px;
`;

export interface BannerItem {
  url: string;
  action?: string;
}

export interface RootState {
  shelves: {
    banners: {
      items: BannerItem[];
    };
  };
}

interface BannerProps {
  isLoading?: boolean;
}

const Banner: React.FC<BannerProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const banners = useSelector(
    (state: RootState) => state.shelves.banners?.items || []
  );

  if (isLoading) {
    return (
      <BannerContainer>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia size={'100%' as unknown as number} />
        </Placeholder>
      </BannerContainer>
    );
  }

  const handleBannerPress = (banner: BannerItem) => {
    if (banner.action && banner.action !== 'no_action') {
      dispatch(handleProcessActions(banner.action) as unknown as AnyAction);
    }
  };

  return (
    <Carrossel>
      {banners.map((banner, index) => (
        <BannerContainer key={index}>
          {banner.url && (
            <TouchableOpacity
              onPress={() => handleBannerPress(banner)}
              style={{ width: '100%', height: '100%' }}
            >
              <Image
                source={{ uri: banner.url }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          )}
        </BannerContainer>
      ))}
    </Carrossel>
  );
};

export default Banner;
