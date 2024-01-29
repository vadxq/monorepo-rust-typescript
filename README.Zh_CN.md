# monorepo-rust-typescript

> 一个集合了Rust和Typescript的monorepo项目脚手架

**中文** | [English](./README.md)

## 详情

- 基于turbo-repo来实现monorepo，具体可查看turbo项目
- 使用了dprint来格式化代码，可格式化js和rs代码

## 相关命令template

```bash
# clone代码第一次安装npm
pnpm i

# 添加包到项目里
pnpm i @vadxq/utils -r --filter feapp

# 运行
pnpm --filter feapp dev
```

```bash
# 运行
#alpha环境
pnpm --filter feapp dev:alpha
# 测试环境
pnpm --filter feapp dev:test


# 打包
# 测试环境
pnpm --filter feapp build:test
#正式环境
pnpm --filter feapp build
```

Rust项目命令

```bash
cargo run -p ci
cargo build -p ci
```

## 各个package介绍

### ci

ci工具

### configs

通用配置项

### eslint-config-custon

通用eslint配置项

### style

通用样式文件

### tsconfig

抽离出的通用的tsconfig文件

### utils

抽离出的通用的函数方法
