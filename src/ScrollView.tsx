import React, { CSSProperties } from "react"
import { Axis } from "."
import * as LayoutEngine from "./LayoutEngine"

const ContentView = ({ children, style }: { children: any, style?: CSSProperties }) => {
	const ref = (self: HTMLDivElement) => {
		if (!self.style.height || self.style.width) {
			const rect = self.getBoundingClientRect()
			const width = rect.width
			const height = rect.height
			self.style.width = `${width}px`
			self.style.height = `${height}px`
		}
	}
	return (
		<div className={"scroll-view-content-view"} style={style} ref={ref}>
			{children}
		</div>
	)
}

export default ({ children, style, axes = [Axis.vertical] }: { children: any, style?: CSSProperties, axes?: Axis[] }) => {

	const ref = (self: HTMLDivElement) => {

		LayoutEngine.markSpacer(self)

		const horizontalExpandables = LayoutEngine.getHorizontalExpandableChildren(self)
		const width = LayoutEngine.getOptimizedExpandableWidth(self)
		horizontalExpandables.forEach(element => {
			const expandable = (element as HTMLElement)
			if (!expandable.style.width) {
				expandable.style.width = `${width}px`
			}
		})
		const verticalExpandables = LayoutEngine.getVerticalExpandableChildren(self)
		const height = LayoutEngine.getOptimizedExpandableHeight(self)
		verticalExpandables.forEach(element => {
			const expandable = (element as HTMLElement)
			if (!expandable.style.height) {
				expandable.style.height = `${height}px`
			}
		})

		// if (!self.style.width && !self.style.height) {
		// 	const rect = self.getBoundingClientRect()
		// 	const width = LayoutEngine.get
		// 	const height = rect.height
		// 	self.style.width = `${width}px`
		// 	self.style.height = `${height}px`
		// }
	}

	const axesString: string = axes.join(" ")

	return (
		<div className={"scroll-view"} style={style} ref={ref}>
			<div className={"expandable " + axesString}>
				<ContentView>
					{children}
				</ContentView>
			</div>
		</div >
	)
}