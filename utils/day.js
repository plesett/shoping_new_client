import dayjs from 'dayjs'

export function ForMat(time) {
	return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}