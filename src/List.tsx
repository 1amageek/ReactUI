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
								<div className="list-cell-content-view" style={{ paddingLeft: "16px", paddingRight: "42px", paddingTop: "4px", paddingBottom: "4px" }}>
									{child}
								</div>
								<svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg">
									<title>arrow</title>
									<desc>Created with Sketch.</desc>
									<g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<g id="Group" transform="translate(10.000000, 5.000000)" fill="#E0E0E0">
											<rect id="Rectangle" transform="translate(7.000000, 7.500000) rotate(45.000000) translate(-7.000000, -7.500000) " x="-1" y="6" width="16" height="3" rx="1.5"></rect>
											<rect id="Rectangle" transform="translate(7.000000, 17.000000) rotate(-45.000000) translate(-7.000000, -17.000000) " x="-1" y="15.5" width="16" height="3" rx="1.5"></rect>
										</g>
									</g>
								</svg>
							</a>
						</li>
					)
				})}
			</ul>
		</ScrollView>
	)
}