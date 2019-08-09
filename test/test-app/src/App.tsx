import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Axis } from 'web-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <ScrollView axes={[Axis.horizontal]} style={{background: "green"}}>
        <div style={{width: "40px", height: "1000px", background: "red"}}>
        </div>
      </ScrollView>

      {/* <VStack>
        <ScrollView style={{background: "red"}}>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
          <Text>hoge</Text>
        </ScrollView>
        <Spacer />
      </VStack> */}


      {/* <List>
        <HStack>
          <Text style={{paddingLeft: "100px"}}>hoge</Text>
          <Spacer />
          <Text>hoge</Text>
        </HStack>
        <HStack>
          <Text style={{paddingLeft: "100px"}}>hoge</Text>
          <Spacer />
          <Text>hoge</Text>
        </HStack>
        <HStack>
          <Text style={{paddingLeft: "100px"}}>hoge</Text>
          <Spacer />
          <Text>hoge</Text>
        </HStack>
      </List> */}

      {/* <VStack>
        <HStack style={{ background: "green" }}>
          <Text>Hoge</Text>
          <Spacer />
          <Text>Hoge</Text>
        </HStack>
        <VStack style={{ background: "red" }}>
          <Text>Hoge</Text>
          <Spacer />
          <Text>Hoge</Text>
        </VStack>
      </VStack> */}


    </HostView>
  );
}

export default App;