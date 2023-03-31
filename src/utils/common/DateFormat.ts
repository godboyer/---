import   dayjs from 'dayjs'

export function dateFormat(time: string | number | Date) {
    return dayjs(time).format("YY年MM月DD日 HH:mm:ss") || ''
}

export function dateFormatYMd(time: string | number | Date) {
    return dayjs(time).format("YY年MM月DD日") || ''
}