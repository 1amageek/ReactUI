import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
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
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && (item.className !== "spacer"))
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().width).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const getInsideElementsLength = (element: HTMLElement): number => {
		const elements = Array.from(element.children)//.filter(item => item.className !== "spacer")
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
		const spacers = Array.from(getOutsideDeterminedElement(self).querySelectorAll("div.spacer")).filter((item) => (item.parentElement as HTMLElement).className.includes("h-stack"))
		if (spacers.length > 0) {
			const maxLength = getOutsideDeterminedLength(self)
			const outsideElementsLength = getOutsideElementsLength(self)
			const inseideElementsLength = getInsideElementsLength(self)
			const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
			const spacerLength = growthableLength / spacers.length
			spacers.forEach(element => {
				const spacer = (element as HTMLElement)
				if (!spacer.style.height && !spacer.style.width) {
					spacer.style.width = `${spacerLength}px`
				}
			})
		}
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