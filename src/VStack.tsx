import React, { CSSProperties } from "react"
import { LayoutEngine, Axis } from "./LayoutEngine"
import { VerticalAlignment } from "."
import { number } from "prop-types";

export default ({ children, style, alignment = VerticalAlignment.center, }: { children: any, style?: CSSProperties, alignment?: VerticalAlignment }) => {

	const getOutsideDeterminedElement = (element: HTMLElement): HTMLElement => {
		const height = element.style.height
		if (height) {
			return element
		}
		return getOutsideDeterminedElement(element.parentElement as HTMLElement)
	}

	const getOutsideDeterminedLength = (element: HTMLElement): number => {
		const outsideDeterminedElement = getOutsideDeterminedElement(element)
		const height = outsideDeterminedElement.style.height
		if (height) {
			if (height.includes("%")) {
				return outsideDeterminedElement.getBoundingClientRect().height
			}
			return parseInt(height)
		}
		return 0
	}

	const getOutsideElementsLength = (element: HTMLElement): number => {
		const parent = (element.parentElement as HTMLElement)
		if (parent.className.includes("h-stack")) {
			return 0
		}
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && (!item.className.includes("expandable")))
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().height).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const getInsideElementsLength = (element: HTMLElement): number => {
		const elements = Array.from(element.children)
		const elementsLength = elements.map((item) => {
			const element = (item as HTMLElement)
			const height = element.style.height
			if (height) {
				if (height.includes("%")) {
					return element.getBoundingClientRect().height
				}
				return parseInt(height)
			}
			if (Array.from(element.children).length === 0) {
				return element.getBoundingClientRect().height
			}
			return getInsideElementsLength(element)
		})
			.reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const ref = (self: HTMLDivElement) => {
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
		// const expandables = Array.from(getOutsideDeterminedElement(self).querySelectorAll(".expandable")).filter((item) => (item.parentElement as HTMLElement).className.includes("v-stack"))
		// if (expandables.length > 0) {
		// 	const maxLength = getOutsideDeterminedLength(self)
		// 	const outsideElementsLength = getOutsideElementsLength(self)
		// 	const inseideElementsLength = getInsideElementsLength(self)
		// 	const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
		// 	const length = LayoutEngine.getOptimizedExpandableHeight(self, Axis.vertical)//growthableLength / expandables.length
		// 	expandables.forEach(element => {
		// 		const expandable = (element as HTMLElement)
		// 		if (!expandable.style.height) {
		// 			expandable.style.height = `${length}px`
		// 		}
		// 	})
		// }
		if (!self.style.height) {
			const rect = self.getBoundingClientRect()
			const width = rect.width
			const height = rect.height
			self.style.width = `${width}px`
			self.style.height = `${height}px`
		}
	}

	return (
		<div className={"v-stack " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}