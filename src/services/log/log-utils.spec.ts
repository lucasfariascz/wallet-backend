import { describeText, testDescription } from '@/shared/tests/tests-naming'
import { hideSensitiveInfo } from './log-utils'

const password = 'teste123'
const apiKey = 'teste123'
const mustBeRemovedFromLogs = 'teste'

describe(describeText('hide args from log'), () => {
  test(testDescription('hide password and apikey'), () => {
    // Prepare
    const args = [
      {
        password: password,
        apiKey: apiKey
      }
    ]
    // Act
    const info = JSON.parse(hideSensitiveInfo(args))

    // expect
    expect(info[0].password).toBe('****')
    expect(info[0].apiKey).toBe('****')
    expect.assertions(2)
  })

  test(testDescription('no hide other args with password and apikey'), () => {
    // Prepare
    const args = [
      {
        password: password,
        apiKey: apiKey
      },
      'AGB',
      false
    ]
    // Act
    const info = JSON.parse(hideSensitiveInfo(args))

    // expect
    expect(info[0].password).toBe('****')
    expect(info[0].apiKey).toBe('****')
    expect(info[1]).toBe('AGB')
    expect(info[2]).toBe(false)
    expect.assertions(4)
  })

  test(testDescription('no hide args'), () => {
    // Prepare
    const args = ['AGB']
    // Act
    const info = JSON.parse(hideSensitiveInfo(args))

    // expect
    expect(info[0]).toBe('AGB')
    expect.assertions(1)
  })

  test(testDescription('hide additional args'), () => {
    // Prepare
    const args = [mustBeRemovedFromLogs, mustBeRemovedFromLogs, 'AGB']
    // Act
    const info = JSON.parse(hideSensitiveInfo(args, [1, 2]))

    // expect
    expect(info[0]).toBe('teste')
    expect(info[1]).toBe('')
    expect(info[2]).toBe('')

    expect.assertions(3)
  })

  test(testDescription('hide apiKey, password and additional args'), () => {
    // Prepare
    const args = [
      {
        password: password,
        apiKey: apiKey
      },
      mustBeRemovedFromLogs,
      mustBeRemovedFromLogs,
      'AGB'
    ]
    // Act
    const info = JSON.parse(hideSensitiveInfo(args, [2, 3]))

    // expect
    expect(info[0].password).toBe('****')
    expect(info[0].apiKey).toBe('****')
    expect(info[1]).toBe('teste')
    expect(info[2]).toBe('')
    expect(info[3]).toBe('')

    expect.assertions(5)
  })
})
