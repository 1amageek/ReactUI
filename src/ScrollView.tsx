import React, { CSSProperties } from "react"
import { Axis } from "."
import * as LayoutEngine from "./LayoutEngine"

const ContentView = ({ children, style, axes }: { children: any, style?: CSSProperties, axes?: Axis[] }) => {
	const ref = (self: HTMLDivElement) => { }
	return (
		<div className={"scroll-view-content-view"} style={style} ref={ref}>
			{children}
		</div>
	)
}

const InnerView = ({ children, style, axes }: { children: any, style?: CSSProperties, axes: Axis[] }) => {
	const ref = (self: HTMLDivElement) => {}
	return (
		<div className={"inner-view expandable " + axes.join(" ")} style={style} ref={ref}>
			{children}
		</div>
	)
}

export default ({ children, style, axes = [Axis.vertical] }: { children: any, style?: CSSProperties, axes?: Axis[] }) => {

	return (
		<div className={"scroll-view expandable " + axes.join(" ")} style={style}>
			<InnerView axes={axes}>
				<ContentView>
					{children}
				</ContentView>
			</InnerView>
		</div >
	)
}