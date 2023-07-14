import { describeText, testDescription } from '../tests/tests-naming'
import { epochToReadableDate } from './string-transformations'

describe(describeText('epochToReadableDate'), () => {
  test(testDescription('various tests'), async () => {
    // Prepare
    expect(epochToReadableDate('978343890')).toEqual('2001-01-01T08:11:30-02:00')
    expect(epochToReadableDate('978343891')).toEqual('2001-01-01T08:11:31-02:00')
  })
})
