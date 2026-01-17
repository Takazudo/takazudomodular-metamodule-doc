#!/bin/bash
set -e

echo "======================================"
echo "⚡ Running pre-push checks"
echo "======================================"
echo

# Step 1: Run code quality checks
echo "✨ Running code quality checks..."
pnpm run check
echo "✅ Code quality checks passed"
echo

# Step 2: Build check
echo "🔨 Testing build..."
pnpm run build
echo "✅ Build succeeded"
echo

echo "======================================"
echo "✅ All checks passed!"
echo "======================================"
