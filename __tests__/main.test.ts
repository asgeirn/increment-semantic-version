import {expect, test} from '@jest/globals'
import {updateVersion} from '../src/version'

test('Invalid version', async () => {
  const current = 'foobar'
  const fragment = 'major'
  expect(() => updateVersion({current, fragment})).toThrowError()
})

test('Bump major 1.2.3', async () => {
  const current = '1.2.3'
  const fragment = 'major'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('2.0.0')
})

test('Bump feature 1.2.3', async () => {
  const current = '1.2.3'
  const fragment = 'feature'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.3.0')
})

test('Bump bug 1.2.3', async () => {
  const current = '1.2.3'
  const fragment = 'bug'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.2.4')
})

test('Bump beta 1.2.3-beta.2', async () => {
  const current = '1.2.3-beta.2'
  const fragment = 'beta'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.2.3-beta.3')
})

test('Bump rc 1.2.3-beta.2', async () => {
  const current = '1.2.3-beta.2'
  const fragment = 'rc'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.2.3-rc.1')
})

test('Bump alpha 1.2.3-beta.2', async () => {
  const current = '1.2.3-beta.2'
  const fragment = 'alpha'
  expect(() => updateVersion({current, fragment})).toThrowError()
})

test('Bump bug 1.2.3+abc', async () => {
  const current = '1.2.3+abc'
  const fragment = 'bug'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.2.4+abc')
})

test('Bump rc 1.2.3-beta.2+abc', async () => {
  const current = '1.2.3-beta.2+abc'
  const fragment = 'rc'
  const next = updateVersion({current, fragment})
  expect(next).toEqual('1.2.3-rc.1+abc')
})
