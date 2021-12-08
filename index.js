/**
 * 1. 整体规则上Airbnb为基础
 *
 * 2. 假设Airbnb中eslint/import/react的规则限制是完备的
 *
 * 3. 补充其它plugin规则限制, 优先以plugin内recommended为基础进行补充限制
 *
 * 4. 整体风格简洁, 简化为主
 */
module.exports = {
  parser: '@babel/eslint-parser',
  plugins: [
    'import',
    'promise',
    'css-modules',
    '@typescript-eslint',
    'react',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: [require.resolve('babel-preset-react-app/prod')],
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  // 扩展配置规则 https://cn.eslint.org/docs/user-guide/configuring#extending-configuration-files
  // 先后顺序不可随意调整, 影响前后覆盖. 排序在后的为主
  extends: [
    'airbnb', // 针对ES代码规则集合
    'eslint:recommended',
    'react-app', // 针对react项目的规定集合
    'plugin:promise/recommended', // promise 相关规则集
  ],

  overrides: [{
    files: ['**/*.ts?(x)'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.json'],
      // typescript-eslint specific options
      warnOnUnsupportedTypeScriptVersion: true,
    },
    extends: [
      /** 以下三库针对TS代码规则集合 */
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/typescript', // 针对TS文件的import规则修订
    ],

    rules: {
      // Add TypeScript specific rules (and turn off ESLint equivalents)
      semi: 'off',
      '@typescript-eslint/semi': ['error', 'never'], // 分号能省则删
      '@typescript-eslint/unbound-method': 'off', // 显示绑定this值, 影响函数作为值本身使用
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'], // 变量
      '@typescript-eslint/array-type': ['error'],
      '@typescript-eslint/ban-tslint-comment': ['error'],
      '@typescript-eslint/consistent-indexed-object-style': ['error'],
      '@typescript-eslint/consistent-type-assertions': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['error'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      // '@typescript-eslint/explicit-function-return-type': ['error'], // 默认的非return, 省掉是一种undefined的return习惯
      '@typescript-eslint/explicit-member-accessibility': ['error'],
      '@typescript-eslint/member-delimiter-style': ['error'],
      '@typescript-eslint/member-ordering': ['error'],
      '@typescript-eslint/method-signature-style': ['error'],
      // '@typescript-eslint/naming-convention': ['error'], // 命名习惯 -> 组件命名PascalCase, 其它camelCase
      '@typescript-eslint/no-base-to-string': ['error'], // 限制toString被空对象调用
      '@typescript-eslint/no-confusing-non-null-assertion': ['error'], // 在易混淆的地方禁用非空断言操作符 Postfix!
      '@typescript-eslint/no-confusing-void-expression': ['error'],
      '@typescript-eslint/no-dynamic-delete': ['error'],
      '@typescript-eslint/no-extraneous-class': ['error'],
      '@typescript-eslint/no-invalid-void-type': ['error'], // void限制在泛型或返回值
      '@typescript-eslint/no-meaningless-void-operator': ['error'],
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],
      '@typescript-eslint/no-parameter-properties': ['error'],
      '@typescript-eslint/no-require-imports': ['error'], // 禁用require引入
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'], // boolean值比较没必要的字面量比较
      '@typescript-eslint/no-unnecessary-condition': ['error'], // 针对永真or永假
      '@typescript-eslint/no-unnecessary-qualifier': ['error'],
      '@typescript-eslint/no-unnecessary-type-arguments': ['error'],
      '@typescript-eslint/non-nullable-type-assertion-style': ['error'],
      '@typescript-eslint/prefer-enum-initializers': ['error'], // enums显式初始化
      '@typescript-eslint/prefer-function-type': ['error'],
      '@typescript-eslint/prefer-includes': ['error'],
      '@typescript-eslint/prefer-literal-enum-member': ['error'],
      '@typescript-eslint/prefer-nullish-coalescing': ['error'],
      '@typescript-eslint/prefer-optional-chain': ['error'],
      '@typescript-eslint/prefer-readonly': ['error'],
      // '@typescript-eslint/prefer-readonly-parameter-types': ['error'], // 函数参数的read only
      '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
      '@typescript-eslint/prefer-regexp-exec': ['error'],
      '@typescript-eslint/prefer-return-this-type': ['error'],
      '@typescript-eslint/prefer-string-starts-ends-with': ['error'],
      '@typescript-eslint/prefer-ts-expect-error': ['error'],
      '@typescript-eslint/promise-function-async': ['error'],
      '@typescript-eslint/require-array-sort-compare': ['error'],
      '@typescript-eslint/sort-type-union-intersection-members': ['error'],
      '@typescript-eslint/strict-boolean-expressions': ['error'],
      '@typescript-eslint/switch-exhaustiveness-check': ['error'],
      '@typescript-eslint/type-annotation-spacing': ['error'],
      '@typescript-eslint/unified-signatures': ['warn'],

      'import/extensions': ['error', 'ignorePackages', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }],

      /** React规则: 主要修订继承的Airbnb规则 */
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    },
  }],

  rules: {
    // http://eslint.org/docs/rules/#stylistic-issues
    complexity: ['error', 10],
    'max-statements': ['error', 60, {
      ignoreTopLevelFunctions: true,
    }],
    'max-statements-per-line': ['error', { max: 1 }],
    'max-depth': ['error', 3],
    'max-lines': ['error', {
      max: 200,
      skipBlankLines: true,
      skipComments: true,
    }],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 3],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-void': 'off',
    'max-len': ['error', 200, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'consistent-return': 'off',
    semi: ['error', 'never'],

    /** import plugin 规则: 主要修订继承Airbnb规则 */
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // 禁止props展开
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    // props需要设置prototype(大概这个意思)
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/control-has-associated-label': 'off',

    'promise/always-return': 'off', // 与省去return空语句有冲突;
    'promise/prefer-await-to-then': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',

    // css-modules
    'css-modules/no-unused-class': [2, { camelCase: 'only' }],
    'css-modules/no-undef-class': [2, { camelCase: 'only' }],

  },
}
