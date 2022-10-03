# 工作流

安装typescript

npm install typescript@3.8.3 -S

创建配置文件

tsconfig.json

```
{
    "compilerOptions": {
        "module": "commonjs",
        "declaration": true,
        "removeComments": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "target": "es2017",
        "sourceMap": true,
        "outDir": "./dist",
        "baseUrl": "./",
        "incremental": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

### 类型

安装npm install @types/node --save-dev

安装express的类型定义 npm install @types/express@4.17.3 --save-dev

### 检视文件变化

npm install tsc-watch@4.2.3 -S