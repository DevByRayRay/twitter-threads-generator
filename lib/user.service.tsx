import { UserProfileModel } from '../components/user/types'
async function getUserProfile(BASE_URL, userId): Promise<UserProfileModel> {
	return new Promise(async (resolve, reject) => {
		try {
			const call = await fetch(`${BASE_URL}/get-user?id=${userId}`)
			const user = await call.json()
			const { data } = user

			resolve(data)
		} catch (error) {
			reject(error)
		}
	})
}
export { getUserProfile }
