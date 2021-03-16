export interface IUserProfile {
	nickname: string
	name: string
	picture: string
	updated_at: string
	email: string
	email_verified: boolean
	sub: string
}

export class UserProfileModel {
	public nickname: string = ''
	public name: string = ''
	public picture: string = ''
	public updated_at: string = ''
	public email: string = ''
	public email_verified: boolean = false
	public sub: string = ''

	constructor(data: IUserProfile) {
		this.nickname = data.nickname || ''
		this.name = data.name || ''
		this.picture = data.picture || ''
		this.updated_at = data.updated_at || ''
		this.email = data.email || ''
		this.email_verified = data.email_verified || false
		this.sub = data.sub || ''
	}
}
