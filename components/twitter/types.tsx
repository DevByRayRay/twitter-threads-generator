export enum sendState {
	sending = 'sending',
	recieved = 'recieved',
	error = 'error',
}
export interface iSendingState {
	state: sendState
}
