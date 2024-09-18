module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
        'react-hooks/exhaustive-deps': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react/self-closing-comp': ['off'],
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
        'jsx-quotes': 'off',
        quotes: 'off',
        'no-catch-shadow': 'off',
      },
    },
  ],
};
