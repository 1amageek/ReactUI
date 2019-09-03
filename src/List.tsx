import React, { CSSProperties } from "react"
import { ScrollView } from "./ScrollView"
import { Axis } from "."
import { prepareLayout } from "./LayoutEngine"

export const List = ({ children, style }: { children: any, style?: CSSProperties }) => {

	const ref = (element: HTMLElement | null) => {
		if (element) {
			prepareLayout(element)
		}
	}

	const contetViewRef = (element: HTMLElement | null) => {
		if (element) {
			const elements = Array.from(element.children).map(item => (item as HTMLElement))
			elements.forEach(item => {
				if (!item.className.includes("row")) {
					item.className += " row"
				}
				if (!item.className.includes("expandable")) {
					item.className += " expandable"
				}
				if (!item.className.includes("horizontal")) {
					item.className += " horizontal"
				}
			})
		}
	}
	
	const cleanChild = (element: any): any => {
		if (element.type === "a") {
			return element.props.children
		} else if (element.props.href) {
			return cleanChild(element.props.children)
		}
		return element
	}

	return (
		<ScrollView axes={[Axis.horizontal, Axis.vertical]} style={style}>
			<ul className="list column expandable horizontal vertical" ref={ref}>
				{React.Children.map(children, (child, index) => {

					let children = child
					

					return (
						<li className="list-cell row expandable horizontal" key={`${index}`} style={style}>
							<a className="row expandable horizontal" onClick={child.props.onClick} href={child.props.href}>
								<div className="list-cell-content-view row expandable horizontal" style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "4px", paddingBottom: "4px" }} ref={contetViewRef}>
									{cleanChild(child)}
								</div>
							</a>
						</li>
					)
				})}
			</ul>
		</ScrollView>
	)
}