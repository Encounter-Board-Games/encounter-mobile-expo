/* eslint-disable max-len */
import React, { useState } from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import ProductStatus from './components/ProductStatus';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge';
import Dice from '../../components/Dice';
import Carrossel from '../../components/Carrossel';
import { useSelector, useDispatch } from 'react-redux';
import ScreePopup from '../../components/ScreePopup';
import VideoPlayerScreen from './components/VideoPlayer';
import { Image, ScrollView } from 'react-native';
import { handleAddProduct } from '../../store/actions/cart/cartAddProduct';
import { handleRemoveProduct } from '../../store/actions/cart/cart';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { H2, Subtitle3 } from '../../components/Typography';
import { Space } from '../../components/Space';
import { handleToggleLike } from '../../store/actions/user/handlers/handleToogleLike';
import { handleRememberProduct } from '../../store/actions/user/handlers/handleRememberProducts';
import { useNavigation } from '@react-navigation/native';
import { handleOpenEvaluationProduct } from '../..//store/actions/product';
import config from '../../config';
import Icons from '../../components/IconsComponent';

import { handleLoadDeliveryMethods } from '../../store/actions/cart/cartLoadDeliveryMethods';
import { RootState } from '../../types/actionUserTypes';
import {
  Container,
  CarrosselContainer,
  Line,
  Icon,
  MainLine,
  Price,
  Dices,
  DicesNumber,
  VideoPlayer,
  VideoPlayerText,
  Tags,
  Description,
  ButtonContent,
} from './ProductDetailsStyles';

interface Props {
  theme: DefaultTheme;
}

export function ProductDetails({ theme }: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo = {}, rememberProductKeys = [] } = useSelector(
    (state: State) => state.user
  );
  const { products: productsOnCart = [] } = useSelector(
    (state: State) => state.cart
  );
  const { favorites = [] } = userInfo;
  const products = useSelector((state: State) => state.products.products);
  const currentProductKey = useSelector(
    (state: State) => state.products.currentProductKey
  );
  const product = products[currentProductKey];

  const isFavorite = favorites.includes(currentProductKey);
  const onCart = productsOnCart.includes(currentProductKey);
  const [currentImage, setCurrentImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const h2Size = +theme.sizes.h2.replace('px', '');

  const loading = () => {
    if (!product) return <H2>Carregando...</H2>;
    if (!product.isLoad && false);
    return (
      <ScreePopup noScroll>
        <Container>
          <Placeholder style={{ flex: 1 }} Animation={Fade}>
            <CarrosselContainer isPlaceholder>
              <PlaceholderMedia size={'100%'} />
            </CarrosselContainer>
            <Space n={1} />

            <PlaceholderLine noMargin height={h2Size * 2} />
            <Space n={1} />
            <PlaceholderLine noMargin height={h2Size} />
            <Space n={1} />
            <PlaceholderLine noMargin height={32} />
            <Space n={3} />
            <ScrollView flex={1}>
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} width={20} />
            </ScrollView>
          </Placeholder>
        </Container>
      </ScreePopup>
    );
  };

  const tags_ = [
    product.age,
    ...(config.hideNumberOfPlayers ? [] : [product.numberOfPlayersFormated]),
    product.matchTimeAverageFormated,
    product.complexity,
    product.language,
    ...(product.categories || []),
    ...(product.tags || []),
  ].filter((value) => value && value !== '--');

  const addProduct = () => {
    dispatch(handleLoadDeliveryMethods());
    dispatch(
      handleAddProduct(
        product.key,
        [...product.categories, ...product.tags].filter(
          (value) => value !== '--'
        )
      )
    ).then((option: boolean) => option && navigation.goBack());
  };

  const getButton = () => {
    if (!product.available) {
      if (rememberProductKeys.includes(product.key))
        return (
          <Button
            type={'ComplementButton-Big'}
            onPress={() => dispatch(handleRememberProduct(product.key))}
          >
            Cancelar aviso
          </Button>
        );
      return (
        <Button
          type={'ComplementButton-Outline'}
          onPress={() => dispatch(handleRememberProduct(product.key))}
        >
          Me avise quando disponível
        </Button>
      );
    }

    return onCart ? (
      <Button
        type={'ComplementButton-Big'}
        onPress={() => dispatch(handleRemoveProduct(product.key))}
      >
        Remover da sacola
      </Button>
    ) : (
      <Button type={'CallToAction-Light'} onPress={() => addProduct()}>
        {' '}
        <Icons name="handbag" size={16} color="white" />
        {'  '}Adicionar à sacola
      </Button>
    );
  };

  return (
    <ScreePopup noScroll>
      {showVideo && (
        <VideoPlayerScreen
          video={product.video}
          onBackgroundPress={() => setShowVideo(false)}
        />
      )}
      <ScrollView>
        <Container>
          <CarrosselContainer>
            <Carrossel
              stepperDown
              padding={32}
              noMargin
              current={currentImage}
              onCurrentChange={(n) => setCurrentImage(n)}
            >
              {(product.images || [product.mainImage]).map((image, index) => (
                <Image
                  key={index}
                  resizeMode={'contain'}
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: image }}
                />
              ))}
            </Carrossel>
          </CarrosselContainer>
          <Space n={1} />
          <Line>
            {config.favorites && (
              <Icon
                onPress={() => dispatch(handleToggleLike(currentProductKey))}
              >
                <Ionicons
                  name={isFavorite ? 'ios-heart' : 'ios-heart-empty'}
                  color={theme.colors.darkColor}
                  size={18}
                />
              </Icon>
            )}
            <H2>{product.name}</H2>
          </Line>

          <Space n={1} />
          <Line style={{ alignItems: 'center' }}>
            <MainLine>
              <ProductStatus available={product.available} />
            </MainLine>
            {product.priceValueFormated && (
              <Price>{product.priceValueFormated}</Price>
            )}
          </Line>
          {config.evaluation && (
            <React.Fragment>
              <Space n={1} />
              <Line>
                <MainLine>
                  <Dices>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Dice
                        size={1}
                        isSelected={product.evaluation >= i}
                        key={i}
                        number={i}
                      />
                    ))}
                    {product.numberOfEvaluation > 0 && (
                      <DicesNumber>{product.numberOfEvaluation} </DicesNumber>
                    )}
                  </Dices>
                </MainLine>
                <Button
                  type={'CallToAction-Orange-Small'}
                  onPress={() =>
                    dispatch(handleOpenEvaluationProduct(product.key))
                  }
                >
                  Avaliar
                </Button>
              </Line>
            </React.Fragment>
          )}
          {product.video && (
            <VideoPlayer onPress={() => setShowVideo(true)}>
              <MaterialCommunityIcons
                size={24}
                color={theme.colors.darkColor}
                name="play-circle"
              />
              <VideoPlayerText>Vídeo do jogo</VideoPlayerText>
            </VideoPlayer>
          )}

          <Tags>
            {tags.map((i: string, index: number) => (
              <Badge isSelected={true} key={index}>
                {i}
              </Badge>
            ))}
          </Tags>

          <Description>
            {(product.description || '').split('</br>').map((d, i) => (
              <Subtitle3 key={i} type="secondDarkColor">
                {d}
              </Subtitle3>
            ))}
          </Description>
        </Container>
      </ScrollView>
      <ButtonContent>{getButton()}</ButtonContent>
    </ScreePopup>
  );
}

export default withTheme(ProductDetails);
