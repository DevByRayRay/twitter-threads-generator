export enum UserType {
	social = 'social',
	email = 'email',
}
export interface IUserProfile {
	nickname: string
	name: string
	picture: string
	updated_at: string
	email: string
	email_verified: boolean
	sub: string
	user_metadata?: IUserMeta
	type: UserType
}

export interface IUserMeta {
	geo: IUserGeo
}

export interface IUserGeo {
	city_name: string
	continent_code: string
	country_code: string
	country_code3: string
	country_name: string
	latitude: number
	longitude: number
	time_zone: string
}

function userType(userId: string) : UserType {
	return userId.includes('twitter') ? UserType.social : UserType.email
}
export class UserProfileModel {
	public nickname: string = ''
	public name: string = ''
	public picture: string = ''
	public updated_at: string = ''
	public email: string = ''
	public email_verified: boolean = false
	public sub: string = ''
	public user_metadata?: IUserMeta = null
	public type: UserType

	constructor(data: IUserProfile) {
		this.nickname = data.nickname || ''
		this.name = data.name || ''
		this.picture = data.picture || ''
		this.updated_at = data.updated_at || ''
		this.email = data.email || ''
		this.email_verified = data.email_verified || false
		this.sub = data.sub || ''
		this.user_metadata = data.user_metadata || null
		this.type = userType(data.sub)
	}
}
