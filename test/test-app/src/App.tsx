import React, { useState } from 'react';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Button, Axis, NavigationBar, NavigationBarTitle, NavigationBarItem, NavigationBarAlignment, SplitView } from 'web-ui'

const App: React.FC = () => {

  const [show, setShow] = useState(false)

  const onClick = () => {
    console.log("aaa")
    setShow(!show)
    // ReactDOM.render((<Text2View>a</Text2View>), document.getElementsByClassName('text1')[0])
  }

  return (

    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      <SplitView primaryColumnWidth={320}>
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
          </List>
        </NavigationView>
      </SplitView>

    </HostView>
  );
}

export default App;