// import "./style.css"

import HostView from "./HostView"
import NavigationView from "./NavigationView"
import NavigationBar from "./NavigationBar"
import NavigationBarItem from "./NavigationBarItem"
import NavigationBarTitle from "./NavigationBarTitle"
import ScrollView from "./ScrollView"
import SplitView from "./SplitView"
import Spacer from "./Spacer"
import Text from "./Text"
import HStack from "./HStack"
import VStack from "./VStack"
import List from "./List"
import Button from "./Button"

export { HostView }
export { NavigationView }
export { NavigationBar }
export { NavigationBarItem }
export { NavigationBarTitle }
export { ScrollView }
export { SplitView }
export { Spacer }
export { Text }
export { HStack }
export { VStack }
export { List }
export { Button }

export enum VerticalAlignment {
	top = "top",
	center = "center",
	bottom = "bottom"
}

export enum HorizontalAlignment {
	leading = "leading",
	center = "center",
	trailing = "trailing"
}

export enum NavigationBarAlignment {
	leading = "leading",
	trailing = "trailing"
}

export enum Axis {
	horizontal = "horizontal",
	vertical = "vertical"
}