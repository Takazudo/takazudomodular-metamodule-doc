---
description: Run pre-push validation (typecheck, lint, format, build)
---

Run `pnpm b4push` to execute pre-push validation checks.

This command runs:

- Code quality checks (typecheck, lint, format)
- Build verification

**Instructions:**

1. Execute `pnpm b4push` using the Bash tool (working directory: doc/)
2. If the command succeeds, report success to the user
3. If errors or warnings occur:
   - Analyze the errors/warnings
   - If they are fixable code issues (linting errors, type errors), fix them automatically
   - If they appear to be configuration issues, ask the user how to proceed
4. After fixing issues, run `pnpm b4push` again to verify the fixes
