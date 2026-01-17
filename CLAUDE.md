# CLAUDE.md

## Project Overview

Japanese translation documentation site for [4ms MetaModule](https://github.com/4ms/metamodule).

**Target URL**: https://takazudomodular.com/pj/metamodule-doc/

## Important Notes

- Conversation with AI is in English
- Documentation content is in Japanese (lang="ja")
- Original source: https://github.com/4ms/metamodule

## Project Structure

```
zmetadoc/
├── vendor/
│   └── metamodule/     # Git submodule (upstream source)
│       └── docs/       # Source English docs
├── doc/                # Docusaurus site
│   ├── docs/
│   │   └── document/   # Translated Japanese docs
│   ├── src/
│   │   └── css/
│   ├── static/
│   │   └── img/
│   ├── plugins/
│   ├── sub-packages/
│   │   └── mdx-formatter/  # Markdown/MDX formatter
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   └── package.json
├── .github/
│   ├── actions/
│   │   ├── build-docusaurus/
│   │   └── deploy-netlify/
│   └── workflows/
│       └── main-deploy.yml
└── .claude/
    └── commands/
        └── update-doc.md  # /update-doc command
```

## Commands

- `/update-doc` - Update translations from upstream

## Development

```bash
cd doc
pnpm install
pnpm start
```

Local URL: http://zmetadoc.localhost:6737/pj/metamodule-doc/

## Building

```bash
cd doc
pnpm build
```

## Code Quality

```bash
cd doc
pnpm run check       # Run all checks
pnpm run check:fix   # Fix auto-fixable issues
```

## Git Submodule

Update the metamodule submodule:

```bash
git submodule update --remote vendor/metamodule
```
