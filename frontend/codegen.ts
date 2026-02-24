import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // 1. Point this to your running Spring Boot server
  schema: 'http://localhost:8080/graphql',

  // 2. Tell it where to look for your queries and mutations
  documents: [ 'app/**/*.tsx', 'components/**/*.tsx', 'lib/**/*.ts' ],

  // 3. Define where the generated types should go
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
  // Ignore the generated files so it doesn't parse them endlessly
  ignoreNoDocuments: true,
};

export default config;