# monorepo-rust-typescript

> A monorepo project scaffolding that combines Rust and Typescript

**English** | [中文](./README.Zh_CN.md)

## Details

- Implement monorepo based on turbo-repo, please check the turbo project for details
- Used dprint to format code, which can format js and rs code

## Related command template

```bash
# clone code installs npm for the first time
pnpm i

# Add package to project
pnpm i @vadxq/utils -r --filter feapp

# run
pnpm --filter feapp dev
```

```bash
# run
# alpha environment
pnpm --filter feapp dev:alpha
# test environment
pnpm --filter feapp dev:test


# Pack
# test environment
pnpm --filter feapp build:test
# prod environment
pnpm --filter feapp build
```

Rust project commands

```bash
cargo run -p ci
cargo build -p ci
```

## Introduction to each package

### ci

ci tool

### configs

Common configuration items

### eslint-config-custon

Common eslint configuration items

### style

Universal style file

### tsconfig

Extracted common tsconfig file

### utils

Extracted general function methods
