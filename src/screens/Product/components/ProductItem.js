import React, { useEffect, useState } from "react";
import styled, { withTheme } from "styled-components";
import { Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductStatus from "./ProductStatus";
import { useSelector, useDispatch } from "react-redux";
import { handleSetCurrentProduct } from "../../../store/actions/product";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { Subtitle3 } from "../../../components/Typography";
import { handleRememberProduct } from "../../../store/actions/user";
import { View } from "react-native-animatable";

// border-radius: '8px';
const ProductImage = styled.View`
  height: auto;
  width: auto;
`;

const Container = styled.TouchableOpacity`
  width: auto;
`;
const Content = styled.View``;

const ProductPrice = styled.Text`
  max-width: 100%;
  font-size: 14px;
  font-family: Nunito;
  color: #414042;
`;

const ProductStatusContent = styled.Text``;

export default withTheme((props) => {
  const products = useSelector((state) => state.products.products);
  const { rememberProductKeys = [] } = useSelector((state) => state.user);
  const product = products[props.id];
  const [showImage, setShowImage] = useState(false);
  const hasAlert = rememberProductKeys.includes(props.id);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openProduct = () => {
    props.onPress && props.onPress();
    dispatch(handleSetCurrentProduct(props.id));
    navigation.navigate("ProductDetails");
  };

  useEffect(() => {
    if (props.showImage) setShowImage(props.showImage);
  }, [props.showImage]);
  const Subtitle3Size = "12px";
  // if (props.isLoading ) return null;
  if (props.isLoading)
    return (
      <Container {...props}>
        <Placeholder style={{ flex: 1 }} Animation={Fade}>
          <View style={{ alignItems: "center" }}>
            <ProductImage>
              <PlaceholderMedia size={"100%"} />
            </ProductImage>
          </View>
         
          <PlaceholderLine noMargin height={Subtitle3Size * 2} />
         
          {props.showPrice && (
            <PlaceholderLine noMargin height={Subtitle3Size * 1.5} />
          )}
         
          {!props.spotlight && (
            <PlaceholderLine noMargin height={Subtitle3Size * 1.5} />
          )}
        </Placeholder>
      </Container>
    );

  if (!product)
    return (
      <Container {...props}>
        <Text></Text>
      </Container>
    );

  return (
    <Container {...props} onPress={() => openProduct()}>
      <View style={{ alignItems: "center" }}>
        <ProductImage spotlight={props.spotlight}>
          {showImage && (
            <Image
              resizeMode="center"
              style={{ height: "100%", width: "100%" }}
              source={{ uri: product.mainImage }}
            />
          )}
        </ProductImage>
      </View>
     
      <Content style={{ flex: props.noFlex ? undefined : 1 }}>
        <Subtitle3
          numberOfLines={props.numberOfLines ? props.numberOfLines : 2}
        >
          {product.name}
        </Subtitle3>
      </Content>
      {(props.showPrice || !props.spotlight) }

      {props.showPrice && (
        <ProductPrice>{product.priceValueFormated}</ProductPrice>
      )}
      {!props.spotlight && (
        <ProductStatus
          onPress={() => dispatch(handleRememberProduct(product.key))}
          hasAlert={hasAlert}
          company={product.age}
          rememberMe={props.showRemember && !product.available}
          available={product.available}
        />
      )}
    </Container>
  );
});
