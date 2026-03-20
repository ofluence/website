/**
 * Prettier Configuration
 * This file configures code formatting rules for the project
 *
 * Using CommonJS format (.cjs) with require.resolve() to fix plugin resolution
 * issues with pnpm's strict node_modules structure in VS Code/Cursor.
 *
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  /**
   * Line Ending Configuration
   * Normalizes line endings to 'lf' (Unix-style) instead of 'crlf' (Windows-style)
   * This ensures consistent line endings across different operating systems
   */
  endOfLine: 'lf',

  /**
   * Trailing Comma Configuration
   * Adds trailing commas where valid in ES5 (objects, arrays, etc.)
   * This makes version control diffs cleaner and makes it easier to add new items
   * Options: 'none' | 'es5' | 'all'
   */
  trailingComma: 'es5',

  /**
   * Indentation Configuration
   * Sets the number of spaces for each indentation level
   * Using 2 spaces is a common standard in JavaScript/TypeScript projects
   */
  tabWidth: 2,

  /**
   * Semicolon Configuration
   * Configures whether to print semicolons at the ends of statements
   * When false, semicolons are only added where necessary to prevent ASI failures
   */
  semi: false,

  /**
   * Quote Style Configuration
   * Uses single quotes instead of double quotes for string literals
   * This is a common style choice in JavaScript/TypeScript projects
   */
  singleQuote: true,

  /**
   * Line Length Configuration
   * Sets the maximum line length before wrapping
   * Helps maintain readable line lengths and consistent code style
   */
  printWidth: 100,

  /**
   * Object Literal Spacing Configuration
   * Adds spaces between brackets in object literals
   * Example: { foo: bar } instead of {foo: bar}
   */
  bracketSpacing: true,

  /**
   * JSX Bracket Configuration
   * Controls the position of closing brackets in JSX elements
   * When false, puts the closing bracket on a new line for better readability
   * Example:
   * <button
   *   className="btn"
   * >
   */
  bracketSameLine: false,

  /**
   * Arrow Function Parentheses Configuration
   * Always includes parentheses around arrow function parameters
   * Example: (x) => x instead of x => x
   * This improves consistency and makes it clearer when functions have parameters
   */
  arrowParens: 'always',

  /**
   * Plugins Configuration
   * Using require.resolve() to explicitly resolve plugin paths
   * This fixes pnpm's strict symlink resolution issues with VS Code/Cursor
   */
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],

  // Specifies which syntax features to support when parsing imports
  importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx', 'classProperties'],

  /**
   * Import Order Configuration
   * Defines the order in which different types of imports should be sorted
   * This helps maintain a consistent and organized import structure
   */
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(react-dom/(.*)$)|^(react-dom$)',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/types/(.*)$',
    '^@/services/(.*)$',
    '',
    '^@/utils/(.*)$',
    '^@/hooks/(.*)$',
    '',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/pages/(.*)$',
    '^@/assets/(.*)$',
    '^@/styles/(.*)$',
    '',
    // Other absolute imports using the @ alias
    '^@/(.*)$',
    '',
    // Relative imports (lowest priority)
    '^[./]',
  ],
}
