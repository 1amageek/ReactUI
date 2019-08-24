import React from 'react';
import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Button, Axis, NavigationBar, NavigationBarTitle, NavigationBarItem, NavigationBarAlignment, SplitView, Indicator } from '@1amageek/react-ui'

const App: React.FC = () => {
  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <HStack>
        <List>
          <VStack>
            <HStack>
              <Text>aaa</Text>
              <Spacer />
              <Text>aaa</Text>
              <Indicator />
            </HStack>
            <HStack>
              <Text>aaa</Text>
              <Spacer />
              <Text>aaa</Text>
              <Indicator />
            </HStack>
          </VStack>
        </List>
        <Text>aaa</Text>
      </HStack>

      {/* <SplitView primaryColumnWidth={320}>
        <NavigationView>
          <NavigationBar>
            <NavigationBarItem alignment={NavigationBarAlignment.trailing}>
              <Text>trailing</Text>
            </NavigationBarItem>

            <NavigationBarTitle>
              <Text>Title</Text>
            </NavigationBarTitle>
          </NavigationBar>
          <List>
            <VStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
            </VStack>
            <VStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
              <HStack>
                <Text>aaa</Text>
                <Spacer />
                <Text>aaa</Text>
              </HStack>
            </VStack>
          </List>
        </NavigationView>
        
      </SplitView> */}

    </HostView>
  );
}

export default App;
