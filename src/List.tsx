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

	return (
		<ScrollView axes={[Axis.horizontal, Axis.vertical]} style={style}>
			<ul className="list column expandable horizontal vertical" ref={ref}>
				{React.Children.map(children, (child, index) => {
					return (
						<li className="list-cell row expandable horizontal" key={index}>
							<a className="row expandable horizontal">
								<div className="list-cell-content-view" style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "4px", paddingBottom: "4px" }}>
									{child}
								</div>
							</a>
						</li>
					)
				})}
			</ul>
		</ScrollView>
	)
}