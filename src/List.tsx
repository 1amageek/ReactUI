import React, { CSSProperties } from "react"
import ScrollView from "./ScrollView"
import * as LayoutEngine from "./LayoutEngine"

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const ref = (self: HTMLUListElement) => {
		const width = LayoutEngine.getOutsideDeterminedWidth(self)
		const height = LayoutEngine.getOutsideDeterminedHeight(self)
		if (!self.style.height || self.style.width) {
			self.style.width = `${width}px`
			self.style.height = `${height}px`
		}
	}

	return (
		<ScrollView>
			<ul className="list" style={style} ref={ref}>
				{React.Children.map(children, (child, index) => {
					return (
						<li className="list-cell" key={index}>
							<div className="list-cell-content-view" style={{paddingLeft: "16px", paddingRight: "16px", paddingTop: "4px", paddingBottom: "4px"}}>{child}</div>
						</li>
					)
				})}
			</ul>
		</ScrollView>
	)
}