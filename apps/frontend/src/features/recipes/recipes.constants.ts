import type { RecipeFormState } from '@/features/recipes/recipes.types'

export const cameraSensorOptions = ['X-Trans III', 'X-Trans IV', 'X-Trans V', 'Bayer']
export const filmOptions = [
	'Provia',
	'Velvia',
	'Astia',
	'Classic Chrome',
	'Classic Neg.',
	'Nostalgic Neg.',
	'ETERNA / Cinema',
	'Acros',
	'Monochrome',
	'Sepia',
	'Reala Ace'
]
export const grainOptions = [
	'Off',
	'Weak / Small',
	'Weak / Large',
	'Strong / Small',
	'Strong / Large'
]
export const colorChromeOptions = ['Off', 'Weak', 'Strong']
export const whiteBalanceOptions = [
	'Auto',
	'Daylight',
	'Shade',
	'Fluorescent 1',
	'Fluorescent 2',
	'Fluorescent 3',
	'Incandescent',
	'Underwater',
	'Kelvin'
]
export const dynamicRangeOptions = ['Auto', 'DR100', 'DR200', 'DR400']
export const isoOptions = [
	'Auto',
	'ISO 160',
	'ISO 320',
	'ISO 640',
	'ISO 1250',
	'ISO 2500',
	'ISO 5000'
]
export const expCompOptions = [
	'-3',
	'-2 2/3',
	'-2 1/3',
	'-2',
	'-1 2/3',
	'-1 1/3',
	'-1',
	'-2/3',
	'-1/3',
	'0',
	'+1/3',
	'+2/3',
	'+1',
	'+1 1/3',
	'+1 2/3',
	'+2',
	'+2 1/3',
	'+2 2/3',
	'+3'
]

export const tonalRangeOptions = ['-2', '-1', '0', '+1', '+2', '+3', '+4']
export const clarityOptions = ['-5', '-4', '-3', '-2', '-1', '0', '+1', '+2', '+3', '+4', '+5']

export const initialFormState: RecipeFormState = {
	recipeName: '',
	author: '',
	url: '',
	cameraSensor: 'X-Trans V',
	film: 'Classic Chrome',
	grain: 'Off',
	colorChromeEffect: 'Off',
	colorChromeFxBlue: 'Off',
	whiteBalance: 'Auto',
	dynamicRange: 'Auto',
	highlight: '0',
	shadow: '0',
	color: '0',
	sharpness: '0',
	nr: '0',
	clarity: '0',
	expCompensation: '0',
	iso: 'Auto',
	notes: ''
}
