[![build-test](https://github.com/asgeirn/increment-semantic-version/actions/workflows/test.yml/badge.svg)](https://github.com/asgeirn/increment-semantic-version/actions/workflows/test.yml)

# Increment Semantic Version

This is a GitHub action to bump a given semantic version, depending on a given version fragment.

Inspired by christian-draeger/increment-semantic-version

## Inputs

### `current-version`

**Required** The current semantic version you want to increment. (e.g. 3.12.5)

### `version-fragment`

**Required** The versions fragment you want to increment.

Possible options are **[ major | feature | bug | alpha | beta | rc ]**

## Outputs

### `next-version`

The incremented version.

## Example usage

    - name: Bump release version
      id: bump_version
      uses: asgeirn/increment-semantic-version@1.0.3
      with:
        current-version: '2.11.7-alpha.3'
        version-fragment: 'feature'
    - name: Do something with your bumped release version
      run: echo ${{ steps.bump_version.outputs.next-version }}
      # will print 2.12.0

## input / output Examples

| version-fragment | current-version |   | output         |
| ---------------- | --------------- | - | -------------- |
| major            | 2.11.7          |   | 3.0.0          |
| major            | 2.11.7-alpha.3  |   | 3.0.0          |
| feature          | 2.11.7          |   | 2.12.0         |
| feature          | 2.11.7-alpha.3  |   | 2.12.0         |
| bug              | 2.11.7          |   | 2.11.8         |
| bug              | 2.11.7-alpha.3  |   | 2.11.8         |
| alpha            | 2.11.7          |   | 2.11.8-alpha.1 |
| alpha            | 2.11.7-alpha.3  |   | 2.11.7-alpha.4 |
| beta             | 2.11.7          |   | 2.11.8-beta.1  |
| beta             | 2.11.7-alpha.3  |   | 2.11.7-beta.1  |
| rc               | 2.11.7          |   | 2.11.8-rc.1    |
| rc               | 2.11.7-alpha.3  |   | 2.11.7-rc.1    |

# License
The scripts and documentation in this project are released under the [MIT License](LICENSE)

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  current-version: 1.2.3
  version-fragment: feature
```

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
