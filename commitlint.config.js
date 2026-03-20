export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // Matches: "branchName: type(scope): subject" or "type(scope): subject"
      headerPattern: /^(?:[\w/.#-]+: )?(\w*)(?:\(([\w$.\-* ]*)\))?!?: (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'scope-enum': [
      2,
      'always',
      ['package', 'auth', 'user', 'tenant', 'store', 'component', 'query', 'config', 'ci', 'deps'],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
  },
  prompt: {
    settings: {
      enableMultipleScopes: false,
    },
    messages: {
      skip: '(press enter to skip)',
      max: 'upper %d chars',
      emptyWarning: 'can not be empty',
    },
  },
}
