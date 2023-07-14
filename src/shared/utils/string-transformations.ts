import moment from 'moment'

export function emptyIfUndefined(s: string): string {
  return s || ''
}

export function convertArrayCharacterToUpperCase(v: string[]): string[] {
  const value = []
  if (v.length > 0) {
    for (let i = 0; i < v.length; i++) {
      value.push(v[i].toUpperCase())
    }
  }
  return value
}

export function epochToReadableDate(s: string, format?: string): string {
  const myDate = new Date(Number(s) * 1000)
  const str = moment(myDate).locale('pt').format(format)
  return str
}

export function hourToMs(hour: number): number {
  return hour * 3600 * 1000
}

export function minToMs(min: string): number {
  const minNumber = min.split(':')
  return Number(minNumber[1]) * 60 * 1000
}
