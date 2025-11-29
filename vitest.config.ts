import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'happy-dom',
          root: './lib/tests',
          environment: 'happy-dom',
        },
      },
      {
        test: {
          name: 'node',
          root: './lib/store/tests',
          environment: 'node',
        },
      },
    ],
    coverage: {
      reporter: ["text", "html", "lcov"],
      include: ['lib/**/*.ts']
    },
  },
})