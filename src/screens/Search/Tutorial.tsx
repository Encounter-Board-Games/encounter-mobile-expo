import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { Space } from '../../components/Space';
import * as Animatable from 'react-native-animatable';
import { H2 } from '../../components/Typography';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { translation } from '../../texts/translations';
import { SafeAreaView } from 'react-native-safe-area-context';
import handleCloseTutorial from '../../store/reducers/infoReducer';
import { TutorialView, Content, Arrow, ContentArea } from './TutorialStyles';

interface TutorialProps {}

const Tutorial: React.FC<TutorialProps> = () => {
  const dispatch = useDispatch();
  const [taps, setTaps] = useState(0);

  const close = () => {
    if (taps >= 1) dispatch(handleCloseTutorial());
    setTaps(taps + 1);
  };

  return (
    <TutorialView>
      <SafeAreaView>
        <Content>
          <SearchBar disabled type="Filter" />
          <Space n={3} />
          <Animatable.View
            duration={500}
            animation={'fadeInUp'}
            style={{ flex: 1 }}
          >
            <Arrow>
              <Image
                resizeMode="contain"
                style={{ width: '100%', height: 80 }}
                source={require('../../assets/img/undo.png')}
              />
            </Arrow>
            <H2 type="light">Filtros de busca</H2>
            <Space n={3} />
            <H2 type="light">
              Dica{' '}
              <H2 noBold type="light">
                : {translation('tutorial')}{' '}
              </H2>{' '}
            </H2>
            <Space n={0} />
            <H2 type="light" noBold>
              Use sem moderação :)
            </H2>
          </Animatable.View>

          <ContentArea>
            <TouchableWithoutFeedback
              onPress={close}
              flex={1}
              style={{ width: '100%', height: '100%' }}
            >
              <View flex={1}></View>
            </TouchableWithoutFeedback>
          </ContentArea>
        </Content>
      </SafeAreaView>
    </TutorialView>
  );
};

export default Tutorial;
