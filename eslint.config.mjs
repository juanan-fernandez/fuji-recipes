import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

const compat = new FlatCompat({ baseDirectory: process.cwd() })

export default [
	// Ignore patterns
	{
		ignores: [
			'node_modules/',
			'dist/',
			'packages/shared/dist',
			'.env',
			'.vscode/',
			'apps/backend/drizzle.config.ts'
		]
	},
	/*** Backend Node + TS*/
	{
		files: ['apps/backend/**/*.ts', 'apps/backend/**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				tsconfigRootDir: path.resolve('./apps/backend'),
				project: './tsconfig.json',
				ecmaVersion: 2022,
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier: prettier
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/explicit-function-return-type': 'off'
		}
	},

	/**
	 * Frontend React / Astro + TS
	 */
	{
		files: ['apps/frontend/**/*.ts', 'apps/frontend/**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				tsconfigRootDir: path.resolve('./apps/frontend'),
				project: './tsconfig.json',
				ecmaVersion: 2022,
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier: prettier
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/explicit-function-return-type': 'off'
		}
	},

	/**
	 * Packages compartidos (shared) + otros TS
	 */
	{
		files: ['packages/shared/**/*.ts', 'packages/shared/**/*.tsx'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				tsconfigRootDir: path.resolve('./packages/shared'),
				project: './tsconfig.json',
				ecmaVersion: 2022,
				sourceType: 'module'
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			prettier: prettier
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/explicit-function-return-type': 'off'
		}
	}
]
