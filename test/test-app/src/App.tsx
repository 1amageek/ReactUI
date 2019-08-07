import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, List } from 'web-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <VStack>
        <List>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
          <Text>aaaa</Text>
        </List>
      </VStack>



      {/* <VStack style={{ background: "green" }}>
        <Spacer />
        <HStack style={{ background: "red" }}>
          <p>Hello World</p>
          <Spacer />
          <p>Hello World</p>
        </HStack>
        <Spacer />
      </VStack> */}

      {/* <VStack style={{ background: "green" }}>
        <HStack style={{ background: "blue" }}>
          <Text>Hello World</Text>
          <Spacer />
          <Text>Hello World</Text>
        </HStack>
        <VStack style={{ background: "red" }}>
          <Text>Hello World</Text>
          <Spacer />
          <Text>Hello World</Text>
        </VStack>
      </VStack> */}

      {/* <VStack style={{ background: "red" }}>
        <Text>Hello World</Text>
        <Spacer />
        <Text>Hello World</Text>
        <VStack style={{ background: "green" }}>
          <Text>Hello World</Text>
          <Spacer />
          <Text>Hello World</Text>
        </VStack>
      </VStack> */}

      {/* <HStack>
        <Text>Hello World</Text>
        <Spacer />
        <Text>Hello World</Text>
      </HStack> */}

    </HostView>
  );
}

export default App;