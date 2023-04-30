import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, Image } from 'react-native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { Banner as BannerType } from '../../../types/globals';
import { handleProcessActions } from '../../../store/actions/shared';
import { Banner } from '../HomeStyles';
import Carrossel from '../../../components/Carrossel';

type Props = {
  banners: BannerType[];
};

const BannerSection: React.FC<Props> = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);
  const dispatch = useDispatch();

  if (banners.length === 0) {
    return (
      <Banner>
        <Placeholder Animation={Fade}>
          <PlaceholderMedia size={'100%'} />
        </Placeholder>
      </Banner>
    );
  }

  return (
    <Carrossel
      current={currentBanner}
      onCurrentChange={(n) => setCurrentBanner(n)}
    >
      {banners.map((banner: BannerType, index: number) => (
        <Banner key={index}>
          {banner.action && banner.action !== 'no_action' ? (
            <TouchableOpacity
              onPress={() => dispatch(handleProcessActions(banner.action))}
              style={{ width: '100%', height: '100%' }}
            >
              <Image
                source={{ uri: banner.url }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={{ uri: banner.url }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </Banner>
      ))}
    </Carrossel>
  );
};
      
export default BannerSection;
