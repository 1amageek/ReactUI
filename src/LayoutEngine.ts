import { element } from "prop-types";

const isHorizontalExpandable = (element: HTMLElement): boolean => {
	return element.className.includes("horizontal") && element.className.includes("expandable")
}

const isVerticalExpandable = (element: HTMLElement): boolean => {
	return element.className.includes("vertical") && element.className.includes("expandable")
}

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

const getOutsideDeterminedPaddingVertical = (element: HTMLElement, padding: number): number => {
	const height = element.style.height
	const _padding = padding + getPaddingVertical(element)
	if (height) {
		return _padding
	}
	return getOutsideDeterminedPaddingVertical(element.parentElement as HTMLElement, _padding)
}

const getOutsideDeterminedPaddingHorizontal = (element: HTMLElement, padding: number): number => {
	const width = element.style.width
	const _padding = padding + getPaddingHorizontal(element)
	if (width) {
		return _padding
	}
	return getOutsideDeterminedPaddingHorizontal(element.parentElement as HTMLElement, _padding)
}

const getOutsideHeightDeterminedElement = (element: HTMLElement): HTMLElement => {
	const height = element.style.height
	if (height) {
		return element
	}
	return getOutsideHeightDeterminedElement(element.parentElement as HTMLElement)
}

const getOutsideWidthDeterminedElement = (element: HTMLElement): HTMLElement => {
	const width = element.style.width
	if (width) {
		return element
	}
	return getOutsideWidthDeterminedElement(element.parentElement as HTMLElement)
}

export const getOutsideDeterminedHeight = (element: HTMLElement): number => {
	const outsideDeterminedElement = getOutsideHeightDeterminedElement(element)
	const height = outsideDeterminedElement.style.height
	if (height) {
		if (height.includes("%")) {
			return outsideDeterminedElement.getBoundingClientRect().height
		}
		return parseInt(height)
	}
	return 0
}

export const getOutsideDeterminedWidth = (element: HTMLElement): number => {
	const outsideDeterminedElement = getOutsideWidthDeterminedElement(element)
	const width = outsideDeterminedElement.style.width
	if (width) {
		if (width.includes("%")) {
			return outsideDeterminedElement.getBoundingClientRect().width
		}
		return parseInt(width)
	}
	return 0
}

const getOutsideElementsHeight = (element: HTMLElement): number => {
	const parent = (element.parentElement as HTMLElement)
	if (parent.className.includes("h-stack")) {
		return 0
	}
	const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && !isHorizontalExpandable(item as HTMLElement))
	const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().height || 0).reduce((prev, current) => prev + current, 0)
	return elementsLength
}

const getOutsideElementsWidth = (element: HTMLElement): number => {
	const parent = (element.parentElement as HTMLElement)
	if (parent.className.includes("v-stack")) {
		return 0
	}
	const elements = Array.from(parent.children).filter(item => (!item.isEqualNode(element)) && !isVerticalExpandable(item as HTMLElement))
	const elementsLength = elements.map((element) => (element as HTMLElement).getBoundingClientRect().width || 0).reduce((prev, current) => prev + current, 0)
	return elementsLength
}

const getInsideElementsHeight = (element: HTMLElement): number => {
	if (element.className.includes("scroll-view")) {
		return 0
	}
	if (element.className.includes("h-stack")) {
		const height = element.style.height
		if (height) {
			if (height.includes("%")) {
				return element.getBoundingClientRect().height
			}
			return parseInt(height)
		}
		return element.getBoundingClientRect().height
	}
	const elements = Array.from(element.children)
		.filter(item => !item.className.includes("expandable"))
	const elementsLength = elements
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
			return getInsideElementsHeight(element)
		})
		.reduce((prev, current) => prev + current, 0)
	return elementsLength
}

const getInsideElementsWidth = (element: HTMLElement): number => {
	if (element.className.includes("scroll-view")) {
		return 0
	}
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

export const getVerticalExpandableElements = (element: HTMLElement) => {
	return Array.from(getOutsideHeightDeterminedElement(element).querySelectorAll(".expandable.vertical"))
}

export const getHorizontalExpandableElements = (element: HTMLElement) => {
	return Array.from(getOutsideWidthDeterminedElement(element).querySelectorAll(".expandable.horizontal"))
}

export const getVerticalExpandableChildren = (element: HTMLElement) => {
	return Array.from(element.querySelectorAll(".expandable.vertical"))
}

export const getHorizontalExpandableChildren = (element: HTMLElement) => {
	return Array.from(element.querySelectorAll(".expandable.horizontal"))
}

export const markSpacer = (element: HTMLElement) => {
	const verticalExpandables = Array.from(getOutsideHeightDeterminedElement(element).querySelectorAll(".spacer"))
		.filter(item => {
			return ((item.parentElement as HTMLElement).className.includes("v-stack")) && (!item.className.includes("vertical"))
		})
	verticalExpandables.map(item => {
		item.className += " vertical"
	})

	const horizontalExpandables = Array.from(getOutsideWidthDeterminedElement(element).querySelectorAll(".spacer"))
		.filter(item => {
			return ((item.parentElement as HTMLElement).className.includes("h-stack")) && (!item.className.includes("horizontal"))
		})
	horizontalExpandables.map(item => {
		item.className += " horizontal"
	})
}

export const getOptimizedExpandableHeight = (element: HTMLElement): number => {
	const expandables = getVerticalExpandableElements(element)
	if (expandables.length === 0) {
		return 0
	}
	const maxLength = getOutsideDeterminedHeight(element)
	const paddingLength = getOutsideDeterminedPaddingVertical(element, 0)
	const outsideElementsLength = getOutsideElementsHeight(element)
	const inseideElementsLength = getInsideElementsHeight(element)
	const growthableLength = maxLength - outsideElementsLength - inseideElementsLength - paddingLength
	const length = growthableLength / expandables.length
	// console.log("-------")
	// console.log(element)
	// console.log(maxLength)
	// console.log("outsideElementsLength", outsideElementsLength)
	// console.log("paddingLength", paddingLength)
	// console.log("inseideElementsLength", inseideElementsLength)
	// console.log(growthableLength)
	// console.log(expandables)
	return length
}

export const getOptimizedExpandableWidth = (element: HTMLElement): number => {
	const expandables = getHorizontalExpandableElements(element)
	if (expandables.length === 0) {
		return 0
	}
	const maxLength = getOutsideDeterminedWidth(element)
	const paddingLength = getOutsideDeterminedPaddingHorizontal(element, 0)
	const outsideElementsLength = getOutsideElementsWidth(element)
	const inseideElementsLength = getInsideElementsWidth(element)
	const growthableLength = maxLength - outsideElementsLength - inseideElementsLength - paddingLength
	const length = growthableLength / expandables.length
	// console.log("-------")
	// console.log(element)
	// console.log(maxLength)
	// console.log(outsideElementsLength)
	// console.log("p", paddingLength)
	// console.log(inseideElementsLength)
	// console.log(growthableLength)
	// console.log(expandables)
	return length
}
