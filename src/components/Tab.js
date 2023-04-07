import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { H3 } from './Typography';

const Container = styled.View`
  flex: 1;
`;

const Tab = styled.View`
  width: 100%;
  flex-flow: row;
`;

const TabItem = styled(TouchableOpacity)`
  flex: 1;
  border-color: ${(props) =>
    props.isActive
      ? props.theme.colors.primaryDarkColor
      : 'transparent'};
  border-bottom-width: 1.5px;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space.space1};
`;

export default function Tabs({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Tab>
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            onPress={() => setActiveTab(index)}
            isActive={index === activeTab}
          >
            <H3>{tab}</H3>
          </TabItem>
        ))}
      </Tab>
      <Container>
        {React.Children.map(children, (child, index) =>
          index === activeTab ? child : null
        )}
      </Container>
    </Container>
  );
}
