# DevFest '25 Ticketing - Amethyst 🔮

Welcome to the **DevFest '25 Ticketing** codebase! This is a [Next.js](https://nextjs.org/) project, structured for scalability and ease of collaboration. This guide will walk you through getting started with the project and highlight some important development practices to follow.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:GDG-W/Amethyst.git
cd Amethyst
```

---

### 2. Install Dependencies

This project uses `npm`. Make sure you're using Node.js v18+ or whatever version is defined in `.nvmrc` if present.

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

This will start the app at [http://localhost:3000](http://localhost:3000) or any available port.

---

## 🧪 Running Tests

Tests are colocated with components. To run all tests:

```bash
npm test
```

---

## 🛠 Troubleshooting

Here are some common setup issues and their fixes:

- **Dependencies not installing?**
  - Delete `node_modules` and `package-lock.json`, then reinstall:

    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

- **Environment issues?**
  - Make sure you’ve created a `.env.local` file if one is required.
  - Ask a teammate or check the team docs for the necessary environment variables.

- **Hook not running on commit?**

- Verify `core.hooksPath`

```bash
git config core.hooksPath  # Should return ".husky"
```

- Ensure the hook is executable

```bash
chmod +x .husky/pre-commit
```

- Test manually

```bash
./.husky/pre-commit
```

- Got `"No staged files match"` error?

- Make sure you've staged changes:

  ```bash
  git add .
  ```

- Ensure your `lint-staged` patterns match your files.

- Permission issues?

Run the following command:

```bash
chmod -R +x .husky/
```

- **App not starting?**
  - Confirm your Node.js version matches the one defined in `.nvmrc` or `package.json > engines`.
  - Use `nvm` to switch versions:

    ```bash
    nvm use 20
    npm run dev
    ```

---

## 🧭 Project Guidelines

To ensure consistency across the team, please follow these conventions:

### ✅ Co-locate Tests

Place test files (e.g., `index.test.tsx`) in the same directory as the component they test. This improves discoverability and encourages modular structure.

```
components/
  └── Button/
      ├── index.tsx
      ├── index.test.tsx
```

---

### ✅ Use React Component Icons

Use icons as React components rather than importing SVGs as raw images. This enables styling and better integration with the component tree.

```tsx
const SelectIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='16'
    height='17'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M13.3334 5.83301L8.25128 11.0592C8.2183 11.0932 8.17913 11.1201 8.13602 11.1385C8.09291 11.1569 8.04669 11.1663 8.00002 11.1663C7.95335 11.1663 7.90713 11.1569 7.86402 11.1385C7.82091 11.1201 7.78174 11.0932 7.74876 11.0592L2.66669 5.83301'
      stroke='currentColor'
      strokeWidth='1.33'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default SelectIcon; // remember to export as default
```

---

### ✅ Additional Notes

- Use [Tailwind CSS](https://tailwindcss.com/docs) utility classes for styling. Inline color, font, etc. declarations are highly discouraged.
  Make good use of Tailwind's native classes and extended classes as specified in `tailwind.config.ts`
- Keep component files focused. If it’s doing too much, break it into smaller parts.
- Name components and files descriptively.
- Keep your code DRY
- Do NOT attempt to bypass code quality checks. Doing so will result in immediate ejection from the project.
- Prefer `async/await` over promise chains for readability.
- Use TypeScript strictly: aim for full type coverage and no `any`.

---

## 🤝 Contributing

If you're adding new features or fixing bugs, make sure to:

1. Prefix your branches with:

- `feature/` - for a feature
- `fix/` - for fixes
- `improvement/` - for improvements
- `chore/ `- for updates, cleanups, components, config, etc
  and suffix them with
- `-ui` - for purely UI work
- `-integration` - for purely integration work

2. Write/update tests
3. Follow existing code style and conventions; clean, accessible and quality code is non-negotiable
4. Describe changes clearly in your PR following the provided template
5. Prioritize smaller commits and small PRs; Make it easy for reviewers to review your work. Large PRs are discouraged and will automatically be rejected
6. Add appropriate labels to your PRs. See available labels on the remote repository
7. Watch out for merge conflicts.
8. Ask a teammate or check the team docs for clarity if confused on anything.

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)
