import React from 'react';
import { Dispatch, ThunkDispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { Image, View } from 'react-native';
import { handleAnswer } from '../../store/actions/quickSearch/quickSearch';
import { Space, Bottom } from '../../components/Space';
import { H4, Subtitle1 } from '../../components/Typography';
import {
  Container,
  Content,
  ImageContent,
  Footer,
  Cancel,
} from './QuickSearchesStyles';
import { ButtonComponent } from '../../components/Button/ButtonStyles';

interface QuickSearchProps {
  dispatch: ThunkDispatch<any, any, any>;
  quickSearch: {
    key: string;
    question: string;
    image?: string;
    options?: string[];
  };
}

const QuickSearch: React.FC<QuickSearchProps> = (props: QuickSearchProps) => {
  const { dispatch, quickSearch } = props;

  const answer = (value: string | undefined) => {
    dispatch(handleAnswer(quickSearch.key));
  };

  const { options = [] } = quickSearch;

  return (
    <Container>
      <Content>
        <Space n={3} />
        <H4>{quickSearch.question}</H4>
        <Space n={3} />
        {quickSearch.image && (
          <>
            <ImageContent>
              <Image
                resizeMode={'contain'}
                style={{ height: '100%', width: '70%' }}
                source={{ uri: quickSearch.image }}
              />
            </ImageContent>
            <Space n={3} />
          </>
        )}
        <View>
          {options.map((option, index) => (
            <View key={index}>
              <Space n={2} />
              <ButtonComponent
                onPress={() => answer(option)}
                type="CallToAction-Light"
                width={'100%'}
              >
                {option}
              </ButtonComponent>
            </View>
          ))}
        </View>
        <Space n={4} />
      </Content>

      <Footer>
        <Cancel onPress={() => answer(undefined)}>
          <Subtitle1 center underline type="secondDarkColor">
            Prefiro não responder
          </Subtitle1>
        </Cancel>
      </Footer>

      <Bottom />
    </Container>
  );
};

export default QuickSearch;
