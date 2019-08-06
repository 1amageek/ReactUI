import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack } from 'web-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>


      <VStack style={{ background: "green" }}>
        <Spacer />
        <VStack style={{ background: "red", padding: "16px" }}>
          <Text>Hello World</Text>
          <Spacer />
          <Text>Hello World</Text>
        </VStack>
        <Spacer />
      </VStack>

      {/* <HStack style={{ background: "green" }}>
        <Spacer />
        <HStack style={{ background: "red" }}>
          <p>Hello World</p>
          <Spacer />
          <p>Hello World</p>
        </HStack>
        <Spacer />
      </HStack> */}

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