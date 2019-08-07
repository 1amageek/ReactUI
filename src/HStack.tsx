import React, { CSSProperties } from "react"
import { LayoutEngine, Axis } from "./LayoutEngine"
import { HorizontalAlignment } from "."
import { number } from "prop-types";

export default ({ children, style, alignment = HorizontalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: HorizontalAlignment }) => {

	const getOutsideDeterminedElement = (element: HTMLElement): HTMLElement => {
		const width = element.style.width
		if (width) {
			return element
		}
		return getOutsideDeterminedElement(element.parentElement as HTMLElement)
	}

	const getOutsideDeterminedLength = (element: HTMLElement): number => {
		const outsideDeterminedElement = getOutsideDeterminedElement(element)
		const width = outsideDeterminedElement.style.width
		if (width) {
			if (width.includes("%")) {
				return outsideDeterminedElement.getBoundingClientRect().width
			}
			return parseInt(width)
		}
		return 0
	}

	const getOutsideElementsLength = (element: HTMLElement): number => {
		const parent = (element.parentElement as HTMLElement)
		if (parent.className.includes("v-stack")) {
			return 0
		}
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && (!item.className.includes("expandable")))
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().width).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const getInsideElementsLength = (element: HTMLElement): number => {
		const elements = Array.from(element.children)
		const elementsLength = elements.map((item) => {
			const element = (item as HTMLElement)
			const width = element.style.width
			if (width) {
				if (width.includes("%")) {
					return element.getBoundingClientRect().width
				}
				return parseInt(width)
			}
			if (Array.from(element.children).length === 0) {
				return element.getBoundingClientRect().width
			}
			return getInsideElementsLength(element)
		})
			.reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const ref = (self: HTMLDivElement) => {
		// const expandables = Array.from(getOutsideDeterminedElement(self)
		// 	.querySelectorAll(".expandable"))
		// 	.filter((item) => (item.parentElement as HTMLElement).className.includes("h-stack"))

		const horizontalExpandables = LayoutEngine.getWidthExpandableElements(self, Axis.horizontal)
		const width = LayoutEngine.getOptimizedExpandableWidth(self, Axis.horizontal)
		horizontalExpandables.forEach(element => {
			const expandable = (element as HTMLElement)
			if (!expandable.style.width) {
				expandable.style.width = `${width}px`
			}
		})
		const verticalExpandables = LayoutEngine.getHeightExpandableElements(self, Axis.horizontal)
		const height = LayoutEngine.getOptimizedExpandableHeight(self, Axis.horizontal)
		console.log("!!", height)
		verticalExpandables.forEach(element => {
			const expandable = (element as HTMLElement)
			if (!expandable.style.height) {
				expandable.style.height = `${height}px`
			}
		})
		console.log(horizontalExpandables)
		console.log(verticalExpandables)
		// if (horizontalExpandables.length > 0) {
		// 	const maxLength = getOutsideDeterminedLength(self)
		// 	const outsideElementsLength = getOutsideElementsLength(self)
		// 	const inseideElementsLength = getInsideElementsLength(self)
		// 	const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
		// 	const width = LayoutEngine.getOptimizedExpandableWidth(self, Axis.vertical)

		// 	console.log("------")
		// 	console.log(self)
		// 	console.log(maxLength)
		// 	console.log(outsideElementsLength)
		// 	console.log(inseideElementsLength)
		// 	console.log(growthableLength)
		// 	console.log(width)


		// 	horizontalExpandables.forEach(element => {
		// 		const expandable = (element as HTMLElement)
		// 		if (!expandable.style.width) {
		// 			expandable.style.width = `${width}px`
		// 		}
		// 	})
		// 	// const height = LayoutEngine.getOptimizedExpandableHeight(self, Axis.vertical)
		// 	// verticalExpandables.forEach(element => {
		// 	// 	const expandable = (element as HTMLElement)
		// 	// 	if (!expandable.style.height) {
		// 	// 		expandable.style.height = `${height}px`
		// 	// 	}
		// 	// })

		// }
		if (!self.style.width) {
			const rect = self.getBoundingClientRect()
			const width = rect.width
			const height = rect.height
			self.style.width = `${width}px`
			self.style.height = `${height}px`
			console.log(self.style.width)
		}
	}

	return (
		<div className={"h-stack " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}