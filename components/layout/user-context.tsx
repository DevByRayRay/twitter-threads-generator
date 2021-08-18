import { getUserProfile } from 'lib/user.service'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { IUserProfile } from '../user/types'

export enum ThemeColors {
	light = 'light',
	dark = 'dark',
}

export interface IGeneralContextProps {
	user: IUserProfile | null
	theme: ThemeColors
	updateTheme: Dispatch<SetStateAction<ThemeColors>>
	updateUser: Dispatch<SetStateAction<IUserProfile | null>>
	fun: string
	updateFun: Dispatch<SetStateAction<string>>
	apiUrl
}

export interface GeneralContextProviderProps {
	children?: ReactNode | ReactNode[]
}

const GeneralContext = createContext<Partial<IGeneralContextProps>>({
	user: null,
	fun: '',
})

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
	const [theme, updateTheme] = useState<ThemeColors>(ThemeColors.light)
	const [user, updateUser] = useState<IUserProfile>(null)
	const [fun, updateFun] = useState<string>('')

	return (
		<GeneralContext.Provider
			value={{
				theme,
				updateTheme,
				user,
				updateUser,
				fun,
				updateFun,
			}}
		>
			{children}
		</GeneralContext.Provider>
	)
}

export default GeneralContext
