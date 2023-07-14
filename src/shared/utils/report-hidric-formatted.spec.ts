import { describeText, testDescription } from '../tests/tests-naming'
import { toFixedNumber } from './report-hidric-formatted'

describe(describeText('toFixedNumber'), () => {
  test(testDescription('various tests'), async () => {
    // Prepare
    expect(toFixedNumber(27.21321421, 2)).toEqual(27.21)
    expect(toFixedNumber(27.21321421, 3)).toEqual(27.213)
    expect(toFixedNumber(25.0, 3)).toEqual(25.0)
    expect(toFixedNumber(undefined, 2)).toEqual(0.0)
    expect(toFixedNumber(null, 1)).toEqual(0.0)
    expect(toFixedNumber(23, 0)).toEqual(23.0)
    expect(toFixedNumber(0.012944533355522085, 3)).toEqual(0.013)
    expect(toFixedNumber(0.0, 2)).toEqual(0.0)
    expect(toFixedNumber(0, 2)).toEqual(0.0)
  })
})
