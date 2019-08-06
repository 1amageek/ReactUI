import React, { CSSProperties } from "react"
import ReactDOM from "react-dom"
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
			if (height.indexOf("%")) {
				return outsideDeterminedElement.getBoundingClientRect().height
			}
			return parseInt(height)
		}
		return 0
	}

	const getOutsideElementsLength = (element: HTMLElement): number => {
		const parent = (element.parentElement as HTMLElement)
		const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element))/* && (item.className !== "spacer")*/)
		const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().height).reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const getInsideElementsLength = (element: HTMLElement): number => {
		const elements = Array.from(element.children)//.filter(item => item.className !== "spacer")
		const elementsLength = elements.map((item) => {
			const element = (item as HTMLElement)
			const height = element.style.height
			if (height) {
				if (height.indexOf("%")) {
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
		const spacers = getOutsideDeterminedElement(self).querySelectorAll("div.spacer")
		if (spacers.length > 0) {
			const maxLength = getOutsideDeterminedLength(self)
			const outsideElementsLength = getOutsideElementsLength(self)
			const inseideElementsLength = getInsideElementsLength(self)
			const growthableLength = maxLength - outsideElementsLength - inseideElementsLength
			const spacerLength = growthableLength / spacers.length
			spacers.forEach(element => {
				const spacer = (element as HTMLElement)
				if (!spacer.style.height) {
					spacer.setAttribute("style", `height: ${spacerLength}px`)
				}
			})
		}
	}

	return (
		<div className={"v-stack " + alignment} style={style} ref={ref}>
			{children}
		</div>
	)
}