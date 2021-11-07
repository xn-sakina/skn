# Sakina(咲奈)

通用依赖包管理工具，支持 npm/yarn/pnpm ，高兼容、高定制、高拓展、高收束。

## Install

```bash
  pnpm add -g @fz6m/skn
```

## Feature

 - `skn`: npm / yarn / pnpm 的通体

 - `skx`: npx / pnpx / pnpm dlx 的通体

 - `sakina`: 同 `skn`

## Usage

基础的依赖管理命令抹平了各工具间的差异，自带兜底，收束度高，老年健忘症必备。

### install deps

```bash
  skn
  # or
  skn i
  # or
  skn install
```

### add deps

```bash
  skn add lodash
  # or
  skn global add vue-cli
  # or
  skn add -g vue-cli
```

### remove deps

```bash
  skn remove lodash
  # or
  skn uninstall lodash
  # or
  skn remove -g vue-cli
  # or
  skn global remove vue-cli
```

### run script

```bash
  skn start
  # or
  skn run start
```

### npx

```bash
  skx create-react-app
  # or
  skx dlx create-react-app
```

### other

其余均走降级策略，把他当成对应的工具用，只有你想不到，没有做不到：

```bash
  skn publish
  skn login
  skn ls lodash
```

## Config

对于旧项目，默认根据 `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` 依赖锁定文件进行判定当前依赖管理工具选择方式。

对于新项目，默认读取最近的 `.npmrc` 或全局 npm 配置选用初始化工具，当未配置时，默认使用 `pnpm` ，你可以使用命令行设定：

```bash
  skn config set skn_pkg_mng yarn # or npm / pnpm
```

## Custom

对于企业，私有源用户，定制需要两步：

1. 先给你的私有源开发一个设定好内网源环境变量的 npm 包或者采用 alias 设定 `registry` ，比如 `cnpm` 。

2. fork 一份代码，将 `src/base/index.ts` 内的 `CMD_IMPL` 改成你的命令主体即可，比如 `npm` -> `cnpm` ，最后自己在内网构建发包。




