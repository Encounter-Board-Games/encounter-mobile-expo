import React from 'react';
import Screen from '../../components/ScreenComponent';
import Tab from '../../components/Tab';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import OrdersList from './components/OrdersList';
import NotLoggedBox from '../user/components/NotLoggedBox';
import { translation } from '../../texts';

const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
`;

const TabContent = styled.View`
  flex: 1;
  padding-top: ${(props) => props.theme.space.space2};
`;

export default () => {
  const { isLogged = false } = useSelector((state) => state.user);

  const isNotLoggedContent = () => (
    <React.Fragment>
      <TabContent>
        <NotLoggedBox title={translation('orders.notLogged.title')} />
      </TabContent>
    </React.Fragment>
  );

  const isLoggedContent = () => {
    const dispatch = useDispatch();

    return (
      <React.Fragment>
        <TabContent>
          <OrdersList type={'Current'} />
        </TabContent>
        <TabContent>
          <OrdersList type={'History'} />
        </TabContent>
      </React.Fragment>
    );
  };

  return (
    <Screen>
      <Container>
        <Tab tabs={['Em andamento', 'Anteriores']}>
          {isLogged ? isLoggedContent() : isNotLoggedContent()}
        </Tab>
      </Container>
    </Screen>
  );
};
