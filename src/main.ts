import * as core from '@actions/core'
import {Fragments, updateVersion} from './version'

async function run(): Promise<void> {
  try {
    const current: string = core.getInput('current-version')
    const fragment: Fragments = core.getInput('version-fragment') as Fragments
    core.debug(`Bumping ${current} with ${fragment} ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.setOutput('next-version', updateVersion({current, fragment}))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
