# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Project Structure

The `src` directory is organized as follows:

```
src/
├── assets/            # Static assets like images and SVGs
├── features/          # Feature-based modules
│   ├── auth/          # Authentication feature
│   │   ├── components # UI elements scoped to auth
│   │   ├── pages      # auth-related pages/routes
│   │   ├── hooks.ts   # React hooks for auth functionality
│   │   ├── index.ts   # Public API exports for the auth feature
│   │   ├── model.ts   # Types, interfaces, and constants for auth
│   │   └── services.ts # API services and data fetching for auth
│   └── dashboard/     # Dashboard feature (similar structure)
├── shared/            # Shared utilities and components
│   └── components/    # Truly reusable components
│   └── lib/           # Utility libraries
│       └── utils.ts   # Common utility functions
│   └── styles/        # Global styles or theme
├── App.css            # Main application styles
├── App.tsx            # Main application component
├── index.css          # Global styles
├── main.tsx           # Application entry point
├── routes.ts          # Centralized route configuration
└── vite-env.d.ts      # TypeScript declarations for Vite
```

### Key Files

- **main.tsx**: Application entry point that renders the App component
- **App.tsx**: Main component that demonstrates API data fetching
- **routes.ts**: Centralized route configuration (placeholder)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable
type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also
install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
