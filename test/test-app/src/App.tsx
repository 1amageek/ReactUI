import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { HostView, Spacer, Text, HStack, VStack, NavigationView, ScrollView, List, Button, Axis, NavigationBar, NavigationBarTitle, NavigationBarItem, NavigationBarAlignment, SplitView } from 'web-ui'


const Text0View = ({ children }: { children: any }) => {
  const ref = (self: HTMLDivElement) => {
    console.log(self)
  }
  return (
    <div className="text0" ref={ref}>
      {children}
    </div>
  )
}

const Text1View = ({ children }: { children: any }) => {
  const ref = (self: HTMLDivElement) => {
    console.log(self)
  }
  return (
    <div className="text1" ref={ref}>
      {children}
    </div>
  )
}

const Text2View = () => {
  const [show, setShow] = useState(false)

  const onClick = () => {
    console.log("aaa")
    setShow(!show)
    // ReactDOM.render((<Text2View>a</Text2View>), document.getElementsByClassName('text1')[0])
  }
  return (
    <HStack>
      <Text>trailing</Text>
      {show && <Spacer />}
      <Button action={onClick}>
        <Text>trailing</Text>
      </Button>
    </HStack>
  )
}

const App: React.FC = () => {

  const [show, setShow] = useState(false)

  const onClick = () => {
    console.log("aaa")
    setShow(!show)
    // ReactDOM.render((<Text2View>a</Text2View>), document.getElementsByClassName('text1')[0])
  }

  return (

    // <Text0View>
    //   <Text1View>
    //     <button onClick={onClick}>button</button>
    //     {show && <Text2View>hoge</Text2View>}
    //   </Text1View>
    // </Text0View>


    <HostView style={{ margin: 0, padding: 0, height: "100%", width: "100%", position: "absolute" }}>

      {/* <NavigationView>
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
        </List>
      </NavigationView> */}


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
          </List>
        </NavigationView>
      </SplitView>

    </HostView>
  );
}

export default App;