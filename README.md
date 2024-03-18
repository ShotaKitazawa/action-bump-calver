# Action Bump Calver

[![release][release-badge]][release]
[![license][license-badge]][license]

This is a GitHub Action to bump the given calver version up.

For example:

- `current_version=v20.01.0`, `now()=2021/01/01` -> `new_version=v21.01.0`
- `current_version=20.01.0`, `now()=2021/01/01` -> `new_version=21.01.0`
- `current_version=v21.01.0`, `now()=2021/01/01` -> `new_version=v21.01.1`

It would be more useful to use this with other GitHub Actions' outputs.


## Inputs

|       NAME        |                                       DESCRIPTION                                        |   TYPE   | REQUIRED | DEFAULT |
|-------------------|------------------------------------------------------------------------------------------|----------|----------|---------|
| `current_version` | The current version.                                                                     | `string` | `true`   | `N/A`   |

## Outputs

|     NAME      |        DESCRIPTION         |   TYPE   |
|---------------|----------------------------|----------|
| `new_version` | The bumped calver version. | `string` |

## Example

### Simple

```yaml
name: Push a new tag

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: actions-ecosystem/action-get-latest-tag@v1
        id: get-latest-tag

      - uses: juusopiikkila/action-bump-calver@v1
        id: bump-calver
        with:
          current_version: ${{ steps.get-latest-tag.outputs.tag }}

      - uses: actions-ecosystem/action-push-tag@v1
        with:
          tag: ${{ steps.bump-calver.outputs.new_version }}
          message: '${{ steps.bump-calver.outputs.new_version }}: PR #${{ github.event.pull_request.number }} ${{ github.event.pull_request.title }}'
```

## Note

This action is inspired by [actions-ecosystem/action-bump-semver](https://github.com/actions-ecosystem/action-bump-semver)

<!-- badge links -->

[release]: https://github.com/juusopiikkila/action-bump-calver/releases
[release-badge]: https://img.shields.io/github/v/release/juusopiikkila/action-bump-calver?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/juusopiikkila/action-bump-calver?style=for-the-badge
