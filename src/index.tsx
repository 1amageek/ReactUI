import "./style.css"

import { prepareLayout, layout } from "./LayoutEngine"
import { HostView } from "./HostView"
import { NavigationView } from "./NavigationView"
import { NavigationBar } from "./NavigationBar"
import { NavigationBarItem } from "./NavigationBarItem"
import { NavigationBarTitle } from "./NavigationBarTitle"
import { Form } from "./Form"
import { TextField } from "./TextField"
import { ScrollView } from "./ScrollView"
import { SplitView } from "./SplitView"
import { Spacer } from "./Spacer"
import { Text } from "./Text"
import { HStack } from "./HStack"
import { VStack } from "./VStack"
import { List, Cell } from "./List"
import { Button } from "./Button"
import { Toggle } from "./Toggle"
import { Indicator } from "./Indicator"

export { prepareLayout, layout }
export { HostView }
export { NavigationView }
export { NavigationBar }
export { NavigationBarItem }
export { NavigationBarTitle }
export { Form }
export { TextField }
export { ScrollView }
export { SplitView }
export { Spacer }
export { Text }
export { HStack }
export { VStack }
export { List, Cell }
export { Button }
export { Toggle }
export { Indicator }

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

export enum TextFieldType {
	text = "text",
	password = "password"
}

export enum Axis {
	horizontal = "horizontal",
	vertical = "vertical"
}