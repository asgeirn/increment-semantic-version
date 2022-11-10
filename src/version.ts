import * as core from '@actions/core'

export type Fragments = 'major' | 'feature' | 'bug' | 'rc' | 'beta' | 'alpha'

export type UpdateProps = {
  current: string
  fragment: Fragments
}

const SemVer =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

const PreRelease = /^(alpha|beta|rc)\.(0|[1-9]\d*)$/

const format = (
  major: number,
  minor: number,
  patch: number,
  prerelease: string,
  build: string
): string => {
  let version = `${major}.${minor}.${patch}`
  if (prerelease) {
    version = `${version}-${prerelease}`
  }
  if (build) {
    version = `${version}+${build}`
  }
  return version
}

export const updateVersion = ({current, fragment}: UpdateProps): string => {
  const matches = current.match(SemVer)
  if (matches === null) {
    throw new Error(`Not a valid SemVer: ${current}`)
  }
  const [, major, minor, patch, prerelease, build] = matches

  core.debug(`Matches: ${matches}`)

  switch (fragment) {
    case 'major':
      return format(Number(major) + 1, 0, 0, '', build)
    case 'feature':
      return format(Number(major), Number(minor) + 1, 0, '', build)
    case 'bug':
      return format(Number(major), Number(minor), Number(patch) + 1, '', build)
  }

  const pre = prerelease.match(PreRelease)
  core.debug(`prerelease: ${pre}`)

  if (pre) {
    const [, level, increment] = pre
    if (level === fragment) {
      return format(
        Number(major),
        Number(minor),
        Number(patch),
        `${level}.${Number(increment) + 1}`,
        build
      )
    } else if (fragment > level) {
      return format(
        Number(major),
        Number(minor),
        Number(patch),
        `${fragment}.1`,
        build
      )
    }
  }

  throw new Error('Invalid SemVer transition')
}
