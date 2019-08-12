import React, { CSSProperties } from "react"
import { typeAlias } from "@babel/types";
import { number } from "prop-types";

interface LayoutConstraints {
	minWidth?: number
	minHeight?: number
	maxWidth?: number
	maxHeight?: number
	width?: number
	height?: number
}

interface UnsolvedElements {
	vertical: HTMLElement[]
	horizontal: HTMLElement[]
}

interface LayoutInformation {
	unsolvedElements: UnsolvedElements
	layoutConstraints: LayoutConstraints
}

interface Size {
	width: number
	height: number
}

interface ConstraintSize {
	width?: number
	height?: number
}

interface ChidrenResult {
	size: Size
	element: HTMLElement
	unresolved: HTMLElement[]
}

export default ({ children, style }: { children: any, style?: CSSProperties }) => {

	const getPaddingTop = (element: HTMLElement): number => {
		const paddingTop = element.style.paddingTop
		if (paddingTop) {
			if (paddingTop.includes("%")) {
				const percentage: number = parseInt(paddingTop.replace("%", ""))
				return element.getBoundingClientRect().height * percentage
			}
			return parseInt(paddingTop)
		}
		return 0
	}

	const getPaddingBottom = (element: HTMLElement): number => {
		const paddingBottom = element.style.paddingBottom
		if (paddingBottom) {
			if (paddingBottom.includes("%")) {
				const percentage: number = parseInt(paddingBottom.replace("%", ""))
				return element.getBoundingClientRect().height * percentage
			}
			return parseInt(paddingBottom)
		}
		return 0
	}

	const getPaddingLeft = (element: HTMLElement): number => {
		const paddingLeft = element.style.paddingLeft
		if (paddingLeft) {
			if (paddingLeft.includes("%")) {
				const percentage: number = parseInt(paddingLeft.replace("%", ""))
				return element.getBoundingClientRect().height * percentage
			}
			return parseInt(paddingLeft)
		}
		return 0
	}

	const getPaddingRight = (element: HTMLElement): number => {
		const paddingRight = element.style.paddingRight
		if (paddingRight) {
			if (paddingRight.includes("%")) {
				const percentage: number = parseInt(paddingRight.replace("%", ""))
				return element.getBoundingClientRect().height * percentage
			}
			return parseInt(paddingRight)
		}
		return 0
	}

	const getPaddingVertical = (element: HTMLElement): number => {
		return getPaddingTop(element) + getPaddingBottom(element)
	}

	const getPaddingHorizontal = (element: HTMLElement): number => {
		return getPaddingLeft(element) + getPaddingRight(element)
	}

	const getConstraintSize = (element: HTMLElement): ConstraintSize => {
		let constraintHeight
		let constraintWidth
		const height = element.style.height
		if (height) {
			if (height.includes("%")) {
				constraintHeight = element.getBoundingClientRect().height
			} else {
				constraintHeight = parseInt(height)
			}
		}
		const width = element.style.width
		if (width) {
			if (width.includes("%")) {
				constraintWidth = element.getBoundingClientRect().width
			} else {
				constraintWidth = parseInt(width)
			}
		}
		return { width: constraintWidth, height: constraintHeight }
	}

	const getInstrinsicWidth = (element: HTMLElement): number => {
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
		const elements = Array.from(element.children)
			.map((item) => {
				const element = (item as HTMLElement)
				const width = element.style.width
				if (width) {
					if (width.includes("%")) {
						return element.getBoundingClientRect().width
					}
					return parseInt(width)
				}
				return getInstrinsicWidth(element)
			})
		if (element.className.includes("column")) {
			return elements.reduce((prev, current) => Math.max(prev, current), 0)
		}
		return elements.reduce((prev, current) => prev + current, 0)
	}

	const getInstrinsicHeight = (element: HTMLElement): number => {
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
		const elements = Array.from(element.children)
			.map((item) => {
				const element = (item as HTMLElement)
				const height = element.style.height
				if (height) {
					if (height.includes("%")) {
						return element.getBoundingClientRect().height
					}
					return parseInt(height)
				}
				return getInstrinsicHeight(element)
			})
		if (element.className.includes("row")) {
			return elements.reduce((prev, current) => Math.max(prev, current), 0)
		}
		return elements.reduce((prev, current) => prev + current, 0)
	}

	const explore = (element: HTMLElement, parent?: HTMLElement): void => {
		console.log("-------------------------------")
		console.log(element)
		const elements = Array.from(element.children).map(item => (item as HTMLElement))
		if (elements.length === 0) {
			return
		}

		const unresolved: HTMLElement[] = elements.filter(item => item.className.includes("expandable"))
		const constraintSize: ConstraintSize = getConstraintSize(element)
		if (constraintSize.width) {
			const HorizontalUnresolved = unresolved.filter(item => item.className.includes("horizontal"))
			const HorizontalResolved = elements.filter(item =>
				!(item.className.includes("horizontal") && item.className.includes("expandable")) &&
				!(item.className.includes("applicatal"))
			)
			if (HorizontalUnresolved.length > 0) {
				const constraintLength = constraintSize.width || 0
				const elementCount = element.className.includes("column") ? 1 : HorizontalUnresolved.length
				const insideElementLength = element.className.includes("column") ? 0 : HorizontalResolved.map(item => getInstrinsicWidth(item)).reduce((prev, current) => prev + current, 0)
				const padding = getPaddingHorizontal(element)
				const length = (constraintLength - insideElementLength - padding) / elementCount
				HorizontalUnresolved.forEach(item => item.style.width = `${length}px`)

				// console.log("HorizontalUnresolved", HorizontalUnresolved)
				// console.log("HorizontalResolved", HorizontalResolved)
				// console.log("constraintSize.width", constraintSize.width)
				// console.log("constraintLength", constraintLength)
				// console.log("elementCount", elementCount)
				// console.log("insideElementLength", insideElementLength)
				// console.log("length", length)
			}
		}

		if (constraintSize.height) {
			const VerticalUnresolved = unresolved.filter(item => item.className.includes("vertical"))
			const VerticalResolved = elements.filter(item =>
				!(item.className.includes("vertical") && item.className.includes("expandable")) &&
				!(item.className.includes("applicatal"))
			)
			if (VerticalUnresolved.length > 0) {
				const constraintLength = constraintSize.height || 0
				const elementCount = element.className.includes("row") ? 1 : VerticalUnresolved.length
				const insideElementLength = element.className.includes("row") ? 0 : VerticalResolved.map(item => getInstrinsicHeight(item)).reduce((prev, current) => prev + current, 0)
				const padding = getPaddingVertical(element)
				const length = (constraintLength - insideElementLength - padding) / elementCount
				VerticalUnresolved.forEach(item => item.style.height = `${length}px`)

				// console.log("VerticalUnresolved", VerticalUnresolved)
				// console.log("VerticalResolved", VerticalResolved)
				// console.log("constraintSize.height", constraintSize.height)
				// console.log("constraintLength", constraintLength)
				// console.log("elementCount", elementCount)
				// console.log("insideElementLength", insideElementLength)
				// console.log("length", length)
			}
		}

		unresolved.forEach(item => explore(item))
	}


	/// Investigate where layout needs to be expanded
	const prepareExpandable = (element: HTMLElement) => {
		// console.log("prepareExpandable", element)
		const parent = element.parentElement as HTMLElement
		if (element.className.includes("spacer")) {
			if (parent.className.includes("v-stack")) {
				element.className += " vertical"
				parent.className += " expandable vertical"
				prepareExpandable(parent)
			}
			if (parent.className.includes("h-stack")) {
				element.className += " horizontal"
				parent.className += " expandable horizontal"
				prepareExpandable(parent)
			}
		}
		if (!parent.className.includes("host-view")) {
			if (element.className.includes("expandable")) {
				if (element.className.includes("horizontal") && !parent.style.width) {
					if (!parent.className.includes("expandable")) {
						parent.className += " expandable"
					}
					if (!parent.className.includes("horizontal")) {
						parent.className += " horizontal"
					}
					prepareExpandable(parent)
				}
				if (element.className.includes("vertical") && !parent.style.height) {
					if (!parent.className.includes("expandable")) {
						parent.className += " expandable"
					}
					if (!parent.className.includes("vertical")) {
						parent.className += " vertical"
					}
					prepareExpandable(parent)
				}
			}
		}
	}

	const prepare = (element: HTMLElement, parent?: HTMLElement) => {
		const elements = Array.from(element.children)
		if (elements.length === 0) {
			return
		}
		elements.forEach(child => {
			prepareExpandable((child as HTMLElement))
			prepare((child as HTMLElement), element)
		})
	}

	const ref = (host: HTMLDivElement) => {
		prepare(host)
		explore(host)
	}

	return (
		<div className="host-view" style={style} ref={ref}>
			{children}
		</div>
	)
}