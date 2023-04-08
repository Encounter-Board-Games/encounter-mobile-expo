import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import ProductStatus from "./components/ProductStatus";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import Dice from "../../components/Dice";
import Carrossel from "../../components/Carrossel";
import { useSelector, useDispatch } from "react-redux";
import ScreePopup from "../../components/ScreePopup";
import VideoPlayerScreen from "./components/VideoPlayer";
import { Image, ScrollView } from "react-native";

import {
  handleAddProduct,
  handleLoadDeliveryMethods,
  handleRemoveProduct,
} from "../../store/actions/cart";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { H2, Subtitle3 } from "../../components/Typography";
import {
  handleToggleLike,
  handleRememberProduct,
} from "../../store/actions/user";
import { useNavigation } from "@react-navigation/native";
import { handleOpenEvaluationProduct } from "../../store/actions/product";
import config from "../../../config";
import Icons from "../../components/Icons";

const Container = styled.View`
  padding: 16px;
  padding-top: 0;
  width: 100%;
  min-height: 100%;
`;
const Tags = styled.View`
  width: 100%;
  flex-flow: row;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Line = styled.View`
  flex-flow: row;
  width: 100%;
  height: auto;
`;

const MainLine = styled.View`
  flex: 1;
`;

const ToolBar = styled.View`
    flex-flow: row;
    margin-top: 16px;
    margin-bottom: 16px;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`;

const Dices = styled.View`
    flex-flow: row;
    align-items: center;
    flex: 1;
    margin-right: 24px;
`;

const DicesNumber = styled.Text`
  font-size: 12px;
  color: "#6D6E71";
  margin-left: 4px;
`;

const Icon = styled.TouchableOpacity`
    padding-right: 8px;
    align-items:center;
    justify-content: center;
`;

const Price = styled.Text`
  font-size: 16px;
  color:  #414042;
  text-align: right;
  font-family: Nunito-Bold;
`;

const VideoPlayer = styled.TouchableOpacity`
  flex-flow: row;
  margin-top: 16px;
  align-items: center;
  height: 24px;
`;

const VideoPlayerText = styled.Text`
  font-size: 12px;
  font-family: Nunito;
  margin-left: 8px;
  color: "#6D6E71";
  text-decoration: underline;
  text-decoration-color: "#6D6E71";
`;

const Description = styled.View`
  margin-top: 16px;
  font-family: Nunito;
`;

const CarrosselContainer = styled.View`
  height: auto;
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
  padding: 16px;
`;

const ButtonContent = styled.View`
  width: 100%;
  padding: 16px;
  padding-top: 0;
`;

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo = {}, rememberProductKeys = [] } = useSelector(
    (state) => state.user
  );
  const { products: productsOnCart = {} } = useSelector((state) => state.cart);
  const { favorites = [] } = userInfo;
  const products = useSelector((state) => state.products.products);
  const currentProductKey = useSelector(
    (state) => state.products.currentProductKey
  );
  const product = products[currentProductKey];

  const isFavorite = favorites.includes(currentProductKey);
  const onCart = productsOnCart.find((p) => p == currentProductKey);
  const [currentImage, setCurrentImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const h2Size = "18px";

  if (!product) return <H2>Carregando...</H2>;
  if (!product.isLoad && false)
    return (
      <ScreePopup noScroll>
        <Container>
          <Placeholder style={{ flex: 1 }} Animation={Fade}>
            <CarrosselContainer isPlaceholder>
              <PlaceholderMedia size={"100%"} />
            </CarrosselContainer>
           

            <PlaceholderLine noMargin height={h2Size * 2} />
           
            <PlaceholderLine noMargin height={h2Size} />
           
            <PlaceholderLine noMargin height={32} />
           
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
  // const contentOffset = (width - Title.WIDTH) / 2;
  // const contentOffset = (width - CustomComponent.WIDTH) / 2;

  const tags_ = [
    product.age,
    ...(config.hideNumberOfPlayers ? [] : [product.numberOfPlayersFormated]),
    product.matchTimeAverageFormated,
    product.complexity,
    product.language,

    ...(product.categories || []),
    ...(product.tags || []),
  ].filter((value) => value && value !== "--");

  const addProduct = () => {
    dispatch(handleLoadDeliveryMethods());
    dispatch(
      handleAddProduct(
        product.key,
        [...product.categories, ...product.tags].filter(
          (value) => value !== "--"
        )
      )
    ).then((option) => option && navigation.goBack());
  };

  const getButton = () => {
    if (!product.available) {
      if (rememberProductKeys.includes(product.key))
        return (
          <Button
            type={"ComplementButton-Big"}
            onPress={() => dispatch(handleRememberProduct(product.key))}
          >
            Cancelar aviso
          </Button>
        );

      return (
        <Button
          type={"ComplementButton-Outline"}
          onPress={() => dispatch(handleRememberProduct(product.key))}
        >
          Me avise quando disponível
        </Button>
      );
    }

    return onCart ? (
      <Button
        type={"ComplementButton-Big"}
        onPress={() => dispatch(handleRemoveProduct(product.key))}
      >
        Remover da sacola
      </Button>
    ) : (
      <Button type={"CallToAction-Light"} onPress={() => addProduct()}>
        {" "}
        <Icons name="handbag" size={16} color="white" />
        {"  "}Adicionar à sacola
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
                  resizeMode={"contain"}
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: image }}
                />
              ))}
            </Carrossel>
          </CarrosselContainer>
         
          <Line>
            {config.favorites && (
              <Icon
                onPress={() => dispatch(handleToggleLike(currentProductKey))}
              >
                <Ionicons
                  name={isFavorite ? "ios-heart" : "ios-heart-empty"}
                  color= '#414042'
                  size={18}
                />
              </Icon>
            )}
            <H2>{product.name}</H2>
          </Line>

         
          <Line style={{ alignItems: "center" }}>
            <MainLine>
              <ProductStatus available={product.available} />
            </MainLine>
            {product.priceValueFormated && (
              <Price>{product.priceValueFormated}</Price>
            )}
          </Line>
          {config.evaluation && (
            <React.Fragment>
             
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
                      <DicesNumber>
                        {product.numberOfEvaluation}{" "}
                        {product.numberOfEvaluation == 1
                          ? "avaliação"
                          : "avaliações"}
                      </DicesNumber>
                    )}
                  </Dices>
                </MainLine>
                <Button
                  type={"CallToAction-Orange-Small"}
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
                color= '#414042'
                name="play-circle"
              />
              <VideoPlayerText>Vídeo do jogo</VideoPlayerText>
            </VideoPlayer>
          )}

          <Tags>
            {tags_.map((i, index) => (
              <Badge isSelected={true} key={index}>
                {i}
              </Badge>
            ))}
          </Tags>

          <Description>
            {(product.description || "").split("</br>").map((d, i) => (
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
};

export default withTheme(ProductDetails);
