import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Axis } from 'web-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <VStack>
        <HStack style={{background: "red"}}>
          <Text>aaa</Text>
          <Spacer />
          <Text>bbb</Text>
        </HStack>
        <VStack style={{background: "green"}}>
          <Text>aaa</Text>
          <Spacer />
          <Text>bbb</Text>
        </VStack>
        <HStack style={{background: "red"}}>
          <Text>aaa</Text>
          <Spacer />
          <Text>bbb</Text>
        </HStack>
      </VStack>
    </HostView>
  );
}

export default App;