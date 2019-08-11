import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Axis } from 'web-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <List>
        <HStack>
          <Text>hoge</Text>
          <Spacer/>
          <Text>hoge</Text>
        </HStack>
      </List>

    </HostView>
  );
}

export default App;