export interface Recipe {
	id: number
	recipeName: string
	author: string
	url: string
	cameraSensor: string
	film: string
	grain: string
	colorChromeEffect: string
	colorChromeFxBlue: string
	whiteBalance: string
	dynamicRange: number
	highlight: number
	shadow: number
	color: number
	sharpness: number
	nr: number
	clarity: number
	expCompensation: string
	iso: string
	notes: string
	createdAt?: string
	updatedAt?: string
}
