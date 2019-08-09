import React, { CSSProperties } from "react"
import * as LayoutEngine from "./LayoutEngine"
import { HorizontalAlignment } from "."
import { number } from "prop-types";

export default ({ children, style, alignment = HorizontalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: HorizontalAlignment }) => {

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
		if (!self.style.width) {
			const rect = self.getBoundingClientRect()
			const width = rect.width
			const height = rect.height
			self.style.width = `${width}px`
			self.style.height = `${height}px`
		}
	}

	return (
		<div className={"h-stack " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}