<!--- Copyright Todd LLC, All rights reserved. -->

# Contributing guidelines

**Important**: Every single file must have "Copyright Todd LLC, All rights reserved." at the top of the file. This may be commented in whatever manner you prefer, but it must be present.

## Setup

Prerequisites:

- Node.js >= 20.00
- npm >= 10.00
- Git = latest stable version

```bash
# In Bash...

git clone https://github.com/toddagriscience/psylocke.git
cd psylocke
npm i

# Create any necessary environment variables -- none as of 10/05/2025

npm run validate
npm start
```

## Workflow

1. Open an issue/discussion with _complete_ context. No "add api route for getting customers" issues. Your issue should ideally completely describe your solution/suggestion/idea.
2. Create a branch, following conventional commits as specified [below](##standardsgeneral-information)
3. Draft a PR. A draft PR should be made when your first commit is made, even if you're nowhere near close to merging.
4. Request review and convert draft PR into a PR.
5. Merge to main!

A few notes:

- We generally avoid directly interacting with others' PRs. If you see an issue, leave a comment/review
- Smaller/more focused PRs are generally preferred -- we'd rather see 5 small PRs than 1 ginormous one
- When drafting/creating a PR, consider:
  - Have I updated documentation accordingly?
  - Are tests passing?
  - Is my code readable and could I or someone else build off of my code 1+ years from now?

## Usage of AI (Copilot, ChatGPT, etc.)

Regarding this repository specifically (i.e. no others):

- If AI can comfortably speed up your workflow, then use it
- Absolutely no vibe-coded/primarily AI generated PRs. `CLAUDE.md`/`.cursorrules` doesn't exist for a reason. Security is too much of a concern to allow entirely vibe-coded PRs to be merged.

## Standards/General information

`psylocke` follows and uses conventional commits (here's a [cheatsheet](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3)). If this is completely new to you, read [this article](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/) as an introduction.

When creating a branch... follow conventional commits in the following format (all lowercase): `commit-type/branch-summary` Ex:

Bad:
`Feature/add-new-page`
`carousel-logic`
`feat/add-the-page-for-privacy-and-other-pages-related-to-privacy`

Good:
`feat/add-new-page`
`refactor/carousel-logic`
`feat/add-privacy-pages`

### Testing

Test _everything_, and follow general best practices. Ex. if a bug is fixed, add a test for that bug.

Testing related commands:

- `npm run test`
- `npm run test:coverage`

However, husky/workflows will handle the majority of code validation/testing for you.

### Formatting/Styling

- Follow AirBNB's JavaScript style [guide](https://github.com/airbnb/javascript) for all JavaScript/TypeScript
- JSDoc _everything_ -- even with TypeScript. There should be no confusion in variable purpose or meaning
- Format all code with `prettier`. Additionally ensure that your formatter is using the configuration found in `.prettierrc`

Formatting/style related commands:

- `npm run lint:fix`
- `npm run format`
- `npm run format:check`
- `npm run lint`

#### Commenting

Comment all code that could cause confusion, or provide an expanded commented version. However, JSDoc should handle the majority of scenarios where extensive commenting is needed.

### Code of Conduct

If in doubt, follow the [Arch Linux Code of Conduct](https://terms.archlinux.org/docs/code-of-conduct/).

TLDR; be professional and polite.
