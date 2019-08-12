import "./style.css"

import HostView from "./HostView"
import NavigationView from "./NavigationView"
import NavigationBar from "./NavigationBar"
import ScrollView from "./ScrollView"
import Spacer from "./Spacer"
import Text from "./Text"
import HStack from "./HStack"
import VStack from "./VStack"
import List from "./List"

export { HostView }
export { NavigationView }
export { NavigationBar }
export { ScrollView }
export { Spacer }
export { Text }
export { HStack }
export { VStack }
export { List }

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

export enum Axis {
	horizontal = "horizontal",
	vertical = "vertical"
}