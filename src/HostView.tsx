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

	const getLayoutConstraints = (element: HTMLElement, layoutConstraints: LayoutConstraints) => {

		const newLayoutConstraints: LayoutConstraints = { ...layoutConstraints }

		if (element.style.height) {
			const constraint: string = element.style.height
			if (constraint.includes("%")) {
				newLayoutConstraints.height = element.getBoundingClientRect().height
			} else {
				newLayoutConstraints.height = parseInt(constraint)
			}
		}
		if (element.style.width) {
			const constraint: string = element.style.width
			if (constraint.includes("%")) {
				newLayoutConstraints.width = element.getBoundingClientRect().width
			} else {
				newLayoutConstraints.width = parseInt(constraint)
			}
		}
		if (element.style.minHeight) {
			const constraint: string = element.style.minHeight
			if (constraint.includes("%")) {
				newLayoutConstraints.minHeight = element.getBoundingClientRect().height
			} else {
				newLayoutConstraints.minHeight = parseInt(constraint)
			}
		}
		if (element.style.minWidth) {
			const constraint: string = element.style.minWidth
			if (constraint.includes("%")) {
				newLayoutConstraints.minWidth = element.getBoundingClientRect().width
			} else {
				newLayoutConstraints.minWidth = parseInt(constraint)
			}
		}
		if (element.style.maxHeight) {
			const constraint: string = element.style.maxHeight
			if (constraint.includes("%")) {
				newLayoutConstraints.maxHeight = element.getBoundingClientRect().width
			} else {
				newLayoutConstraints.maxHeight = parseInt(constraint)
			}
		}
		if (element.style.maxWidth) {
			const constraint: string = element.style.maxWidth
			if (constraint.includes("%")) {
				newLayoutConstraints.maxWidth = element.getBoundingClientRect().width
			} else {
				newLayoutConstraints.maxWidth = parseInt(constraint)
			}
		}

		return newLayoutConstraints
	}

	const getInsideElementsWidth = (element: HTMLElement): number => {
		if (element.className.includes("v-stack")) {
			const width = element.style.width
			if (width) {
				if (width.includes("%")) {
					return element.getBoundingClientRect().width
				}
				return parseInt(width)
			}
			return element.getBoundingClientRect().width
		}
		const elements = Array.from(element.children)
			.filter(item => !item.className.includes("expandable"))
		const elementsLength = elements
			.map((item) => {
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
				return getInsideElementsWidth(element)
			})
			.reduce((prev, current) => prev + current, 0)
		return elementsLength
	}

	const getSize = (element: HTMLElement): Size => {
		let height = element.getBoundingClientRect().height
		let width = element.getBoundingClientRect().width
		const heightStr = element.style.height
		const widthStr = element.style.width
		if (heightStr) {
			if (heightStr.includes("%")) {
				height = element.getBoundingClientRect().height
			}
			height = parseInt(heightStr)
		}
		if (widthStr) {
			if (widthStr.includes("%")) {
				width = element.getBoundingClientRect().width
			}
			width = parseInt(widthStr)
		}
		return { width: width, height: height }
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
				if (Array.from(element.children).length === 0) {
					return element.getBoundingClientRect().width
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
				if (Array.from(element.children).length === 0) {
					return element.getBoundingClientRect().height
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
			const HorizontalResolved = elements.filter(item => !(item.className.includes("horizontal") && item.className.includes("expandable")))
			if (HorizontalUnresolved.length > 0) {
				const constraintLength = constraintSize.width || 0
				const elementCount = element.className.includes("column") ? 1 : HorizontalUnresolved.length
				const insideElementLength = element.className.includes("column") ? 0 : HorizontalResolved.map(item => getInstrinsicWidth(item)).reduce((prev, current) => prev + current, 0)
				const length = (constraintLength - insideElementLength) / elementCount
				HorizontalUnresolved.forEach(item => item.style.width = `${length}px`)

				console.log("HorizontalUnresolved", HorizontalUnresolved)
				console.log("HorizontalResolved", HorizontalResolved)
				console.log("constraintSize.width", constraintSize.width)
				console.log("constraintLength", constraintLength)
				console.log("elementCount", elementCount)
				console.log("insideElementLength", insideElementLength)
				console.log("length", length)
			}
		}

		if (constraintSize.height) {
			const VerticalUnresolved = unresolved.filter(item => item.className.includes("vertical"))
			const VerticalResolved = elements.filter(item => !(item.className.includes("vertical") && item.className.includes("expandable")))
			if (VerticalUnresolved.length > 0) {
				const constraintLength = constraintSize.height || 0
				const elementCount = element.className.includes("row") ? 1 : VerticalUnresolved.length
				const insideElementLength = element.className.includes("row") ? 0 : VerticalResolved.map(item => getInstrinsicHeight(item)).reduce((prev, current) => prev + current, 0)
				const length = (constraintLength - insideElementLength) / elementCount
				VerticalUnresolved.forEach(item => item.style.height = `${length}px`)

				console.log("VerticalUnresolved", VerticalUnresolved)
				console.log("VerticalResolved", VerticalResolved)
				console.log("constraintSize.height", constraintSize.height)
				console.log("constraintLength", constraintLength)
				console.log("elementCount", elementCount)
				console.log("insideElementLength", insideElementLength)
				console.log("length", length)
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