import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import neverthrowPlugin from "eslint-plugin-neverthrow";

export default [
  {
    // Exclude generated code from ESLint checks
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/src/interfaces/generated/**"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      neverthrow: neverthrowPlugin
    },
    rules: {
      // TypeScript recommended rules (basic)
      ...tseslint.configs.recommended.rules,

      // neverthrow plugin rules (exclude rules that require type checking)
      "neverthrow/must-use-result": "off",
      "neverthrow/must-use-result-in-async-scope": "off",

      // Basic rules
      semi: ["error", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "comma-dangle": "off",
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-var-requires": "error",

      // Restrict class usage (error classes are exceptions)
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowConstructorOnly: false,
          allowEmpty: false,
          allowStaticOnly: false,
          allowWithDecorator: false
        }
      ],

      // Prefer function factory pattern
      "prefer-arrow-callback": "warn",
      "func-style": ["warn", "expression", { allowArrowFunctions: true }],

      // Error handling
      "no-throw-literal": "error",

      // Code quality
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-destructuring": ["warn", { object: true, array: false }],

      // Import order (manually managed, ESLint only warns)
      "sort-imports": [
        "warn",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"]
        }
      ]
    }
  },
  {
    // Allow function declarations for exported handlers and factory functions
    files: [
      "**/handlers/**/*.ts",
      "**/services/**/*.ts",
      "**/entities/**/*.ts",
      "**/value-objects/**/*.ts",
      "**/repositories/**/*.ts"
    ],
    rules: {
      "func-style": "off"
    }
  }
];
