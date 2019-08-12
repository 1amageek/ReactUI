import React from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Button, Axis, NavigationBar, NavigationBarTitle, NavigationBarItem, NavigationBarAlignment } from 'web-ui'

const App: React.FC = () => {

  const onClick = () => {
    console.log("aaa")
  }

  return (
    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <NavigationView>
        <NavigationBar>
          <NavigationBarItem alignment={NavigationBarAlignment.trailing}>
            <Button action={onClick}>
              <Text>trailing</Text>
            </Button>
          </NavigationBarItem>

          <NavigationBarTitle>
            <Text>Title</Text>
          </NavigationBarTitle>
        </NavigationBar>
        <List>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
          <Text>a</Text>
        </List>
      </NavigationView>


    </HostView>
  );
}

export default App;