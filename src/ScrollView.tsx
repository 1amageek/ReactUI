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

	const ref = (self: HTMLDivElement) => {

		// LayoutEngine.markSpacer(self)

		// const horizontalExpandables = LayoutEngine.getHorizontalExpandableChildren(self)
		// const width = LayoutEngine.getOptimizedExpandableWidth(self)
		// horizontalExpandables.forEach(element => {
		// 	const expandable = (element as HTMLElement)
		// 	if (!expandable.style.width) {
		// 		expandable.style.width = `${width}px`
		// 	}
		// })
		// const verticalExpandables = LayoutEngine.getVerticalExpandableChildren(self)
		// const height = LayoutEngine.getOptimizedExpandableHeight(self)
		// verticalExpandables.forEach(element => {
		// 	const expandable = (element as HTMLElement)
		// 	if (!expandable.style.height) {
		// 		expandable.style.height = `${height}px`
		// 	}
		// })
	}

	return (
		<div className={"scroll-view " + axes.join(" ")} style={style} ref={ref}>
			<InnerView axes={axes}>
				<ContentView>
					{children}
				</ContentView>
			</InnerView>
		</div >
	)
}