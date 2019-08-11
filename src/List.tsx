import React, { CSSProperties } from "react"
import ScrollView from "./ScrollView"
import * as LayoutEngine from "./LayoutEngine"
import { Axis } from ".";

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const ref = (self: HTMLUListElement) => { }

	return (
		<ScrollView axes={[Axis.horizontal, Axis.vertical]}>
			<ul className="list column" style={style} ref={ref}>
				{React.Children.map(children, (child, index) => {
					return (
						<li className="list-cell" key={index}>
							<div className="list-cell-content-view" style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "4px", paddingBottom: "4px" }}>{child}</div>
						</li>
					)
				})}
			</ul>
		</ScrollView>
	)
}