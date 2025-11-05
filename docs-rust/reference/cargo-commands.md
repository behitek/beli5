# Essential Cargo Commands

A comprehensive reference guide for Cargo, Rust's package manager and build system.

## Table of Contents
- [Project Management](#project-management)
- [Building and Running](#building-and-running)
- [Testing](#testing)
- [Documentation](#documentation)
- [Dependencies](#dependencies)
- [Publishing](#publishing)
- [Workspace Management](#workspace-management)
- [Useful Flags and Options](#useful-flags-and-options)
- [Configuration](#configuration)

## Project Management

### Creating New Projects
```bash
# Create a new binary project
cargo new my_project

# Create a new library project
cargo new my_library --lib

# Initialize in existing directory
cargo init

# Initialize as library
cargo init --lib

# Specify edition
cargo new my_project --edition 2021
```

### Project Structure
```
my_project/
├── Cargo.toml       # Package manifest
├── Cargo.lock       # Dependency lock file (committed for binaries)
├── src/
│   ├── main.rs      # Binary entry point
│   └── lib.rs       # Library entry point
├── tests/           # Integration tests
├── benches/         # Benchmarks
└── examples/        # Example code
```

## Building and Running

### Basic Build Commands
```bash
# Build in debug mode (default)
cargo build

# Build in release mode (optimized)
cargo build --release

# Build for specific target
cargo build --target x86_64-unknown-linux-gnu

# Build all targets (lib, bins, examples, tests, benches)
cargo build --all-targets

# Build specific package in workspace
cargo build -p package_name

# Build with verbose output
cargo build --verbose

# Build with additional features
cargo build --features "feature1 feature2"

# Build with all features
cargo build --all-features

# Build with no default features
cargo build --no-default-features
```

### Running
```bash
# Build and run the main binary
cargo run

# Run in release mode
cargo run --release

# Run with arguments
cargo run -- arg1 arg2

# Run specific binary
cargo run --bin binary_name

# Run example
cargo run --example example_name

# Run with features
cargo run --features "feature1 feature2"
```

### Checking Code
```bash
# Check if code compiles (faster than build)
cargo check

# Check in release mode
cargo check --release

# Check all targets
cargo check --all-targets

# Check specific package
cargo check -p package_name
```

### Cleaning
```bash
# Remove build artifacts
cargo clean

# Clean specific target
cargo clean --target x86_64-unknown-linux-gnu

# Clean release artifacts only
cargo clean --release
```

## Testing

### Running Tests
```bash
# Run all tests
cargo test

# Run tests in release mode (faster execution)
cargo test --release

# Run specific test
cargo test test_name

# Run tests matching pattern
cargo test pattern

# Run tests in specific file/module
cargo test module::test_name

# Run ignored tests
cargo test -- --ignored

# Run all tests including ignored
cargo test -- --include-ignored

# Show output from successful tests
cargo test -- --show-output

# Run tests with single thread (for debugging)
cargo test -- --test-threads=1

# Run only doc tests
cargo test --doc

# Run only library tests
cargo test --lib

# Run only integration tests
cargo test --test test_name

# Run only unit tests (no integration tests)
cargo test --bins
```

### Test Options
```bash
# Verbose test output
cargo test --verbose

# Don't capture output
cargo test -- --nocapture

# Run benchmarks
cargo bench

# Run specific benchmark
cargo bench bench_name

# Test with specific features
cargo test --features "feature1"

# Test all features
cargo test --all-features

# Test with no default features
cargo test --no-default-features
```

## Documentation

### Generating Documentation
```bash
# Build documentation
cargo doc

# Build and open in browser
cargo doc --open

# Include private items
cargo doc --document-private-items

# Don't build dependencies' docs
cargo doc --no-deps

# Build specific package docs
cargo doc -p package_name

# Build with all features
cargo doc --all-features
```

### Documentation Testing
```bash
# Test code examples in documentation
cargo test --doc

# Test specific doc tests
cargo test --doc pattern
```

## Dependencies

### Managing Dependencies
```bash
# Add a dependency
cargo add serde

# Add with specific version
cargo add serde@1.0

# Add with features
cargo add serde --features derive

# Add as dev dependency
cargo add --dev criterion

# Add as build dependency
cargo add --build cc

# Remove a dependency
cargo remove serde

# Update dependencies
cargo update

# Update specific dependency
cargo update -p serde

# Show outdated dependencies
cargo outdated  # Requires cargo-outdated plugin
```

### Checking Dependencies
```bash
# Show dependency tree
cargo tree

# Show dependency tree for specific package
cargo tree -p serde

# Show inverted tree (what depends on X)
cargo tree -i serde

# Show dependencies with specific depth
cargo tree --depth 2

# Check for security vulnerabilities
cargo audit  # Requires cargo-audit plugin

# Show unused dependencies
cargo udeps  # Requires cargo-udeps plugin
```

## Publishing

### Publishing Workflow
```bash
# Login to crates.io
cargo login <api_token>

# Package crate (creates tarball)
cargo package

# Package and verify contents
cargo package --list

# Check if package can be published
cargo publish --dry-run

# Publish to crates.io
cargo publish

# Yank a version (prevent new projects from using it)
cargo yank --vers 1.0.1

# Un-yank a version
cargo yank --vers 1.0.1 --undo
```

### Pre-publish Checks
```bash
# Verify package builds
cargo package

# Check that tarball builds
cargo publish --dry-run

# Check documentation builds
cargo doc --no-deps

# Run all tests
cargo test --all-features

# Check with clippy
cargo clippy --all-features
```

## Workspace Management

### Workspace Commands
```bash
# Build all workspace members
cargo build --workspace

# Test all workspace members
cargo test --workspace

# Check all workspace members
cargo check --workspace

# Build specific workspace package
cargo build -p package_name

# List workspace members
cargo metadata --format-version 1 | jq '.workspace_members'
```

### Workspace Cargo.toml
```toml
[workspace]
members = [
    "crate1",
    "crate2",
    "tools/*",
]

exclude = [
    "experimental",
]

[workspace.dependencies]
serde = "1.0"

[workspace.package]
version = "1.0.0"
edition = "2021"
```

## Useful Flags and Options

### Common Flags

| Flag | Description |
|------|-------------|
| `--release` | Build with optimizations |
| `--verbose` or `-v` | Verbose output |
| `--quiet` or `-q` | Minimal output |
| `--all-targets` | Build/check all targets |
| `--all-features` | Enable all features |
| `--no-default-features` | Disable default features |
| `--features "f1 f2"` | Enable specific features |
| `--target <triple>` | Build for specific target |
| `-p <package>` | Specific package in workspace |
| `--workspace` | All workspace members |
| `--lib` | Library only |
| `--bin <name>` | Specific binary |
| `--example <name>` | Specific example |
| `--test <name>` | Specific test |
| `--bench <name>` | Specific benchmark |
| `-j <N>` or `--jobs <N>` | Number of parallel jobs |
| `--offline` | Don't access network |
| `--frozen` | Require Cargo.lock is up-to-date |
| `--locked` | Require Cargo.lock is unchanged |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CARGO_TARGET_DIR` | Override target directory |
| `CARGO_HOME` | Cargo home directory |
| `CARGO_BUILD_JOBS` | Number of parallel jobs |
| `RUSTFLAGS` | Additional compiler flags |
| `CARGO_INCREMENTAL` | Enable/disable incremental compilation |
| `CARGO_PROFILE_<PROFILE>_<OPTION>` | Set profile options |

### Compiler Flags via RUSTFLAGS
```bash
# Enable all warnings
RUSTFLAGS="-W warnings" cargo build

# Treat warnings as errors
RUSTFLAGS="-D warnings" cargo build

# Set optimization level
RUSTFLAGS="-C opt-level=3" cargo build

# Enable link-time optimization
RUSTFLAGS="-C lto" cargo build

# Set target CPU
RUSTFLAGS="-C target-cpu=native" cargo build
```

## Configuration

### Cargo.toml Sections

#### Package Metadata
```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
description = "A short description"
documentation = "https://docs.rs/my_project"
repository = "https://github.com/user/my_project"
license = "MIT OR Apache-2.0"
keywords = ["cli", "tool"]
categories = ["command-line-utilities"]
readme = "README.md"
homepage = "https://example.com"
```

#### Dependencies
```toml
[dependencies]
serde = "1.0"
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
my_local_crate = { path = "../my_local_crate" }
my_git_crate = { git = "https://github.com/user/repo" }

[dev-dependencies]
criterion = "0.5"
proptest = "1.0"

[build-dependencies]
cc = "1.0"
```

#### Features
```toml
[features]
default = ["feature1"]
feature1 = []
feature2 = ["dep:optional_dep"]
full = ["feature1", "feature2"]

[dependencies]
optional_dep = { version = "1.0", optional = true }
```

#### Profile Configuration
```toml
[profile.dev]
opt-level = 0
debug = true

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
strip = true  # Strip symbols
panic = "abort"

[profile.test]
opt-level = 1

[profile.bench]
opt-level = 3

# Custom profile
[profile.production]
inherits = "release"
lto = "fat"
codegen-units = 1
```

### Config File (.cargo/config.toml)
```toml
# Build target
[build]
target = "x86_64-unknown-linux-gnu"
jobs = 4

# Target-specific configuration
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=-fuse-ld=lld"]

# Registry configuration
[registry]
default = "crates-io"

# Network configuration
[net]
retry = 2
git-fetch-with-cli = true

# Alias commands
[alias]
b = "build"
c = "check"
t = "test"
r = "run"
br = "build --release"
rr = "run --release"
```

## Cargo Extensions

### Useful Cargo Plugins

| Plugin | Installation | Purpose |
|--------|--------------|---------|
| cargo-watch | `cargo install cargo-watch` | Auto-rebuild on file changes |
| cargo-edit | `cargo install cargo-edit` | Add/remove dependencies via CLI |
| cargo-outdated | `cargo install cargo-outdated` | Check for outdated dependencies |
| cargo-audit | `cargo install cargo-audit` | Security vulnerability scanner |
| cargo-expand | `cargo install cargo-expand` | Expand macros |
| cargo-flamegraph | `cargo install cargo-flamegraph` | Generate flame graphs |
| cargo-bloat | `cargo install cargo-bloat` | Find what takes space in binary |
| cargo-udeps | `cargo install cargo-udeps` | Find unused dependencies |
| cargo-deny | `cargo install cargo-deny` | Lint dependencies |
| cargo-tree | Built-in | Show dependency tree |
| cargo-clippy | Built-in | Linting tool |
| cargo-fmt | Built-in | Code formatter |

### Using Extensions
```bash
# Auto-rebuild on file changes
cargo watch -x check -x test

# Expand macros
cargo expand

# Find binary bloat
cargo bloat --release

# Find unused dependencies
cargo udeps

# Generate flame graph
cargo flamegraph

# Lint dependencies
cargo deny check
```

## Common Workflows

### Development Workflow
```bash
# 1. Create project
cargo new my_project
cd my_project

# 2. Add dependencies
cargo add serde --features derive

# 3. Fast check during development
cargo watch -x check

# 4. Run tests
cargo test

# 5. Check with clippy
cargo clippy

# 6. Format code
cargo fmt

# 7. Build release
cargo build --release
```

### CI/CD Workflow
```bash
# Check formatting
cargo fmt -- --check

# Lint
cargo clippy -- -D warnings

# Build
cargo build --verbose --all-features

# Test
cargo test --verbose --all-features

# Check documentation
cargo doc --no-deps --all-features

# Security audit
cargo audit

# Check for outdated deps
cargo outdated --exit-code 1
```

### Release Workflow
```bash
# 1. Update version in Cargo.toml

# 2. Update CHANGELOG.md

# 3. Run all checks
cargo test --all-features
cargo clippy -- -D warnings
cargo fmt -- --check

# 4. Build release
cargo build --release

# 5. Package and verify
cargo package --list
cargo publish --dry-run

# 6. Publish
cargo publish

# 7. Tag release
git tag v1.0.0
git push --tags
```

## Quick Tips

1. **Use `cargo check`** for fast feedback during development
2. **Use `cargo watch`** to auto-rebuild on file changes
3. **Use `cargo clippy`** to catch common mistakes
4. **Use `cargo fmt`** to maintain consistent code style
5. **Set up aliases** in `.cargo/config.toml` for common commands
6. **Use `--all-features`** when testing to catch feature-specific bugs
7. **Use `cargo tree`** to understand dependency relationships
8. **Use `cargo audit`** regularly to check for vulnerabilities
9. **Cache dependencies** in CI/CD with `Cargo.lock`
10. **Use workspaces** for managing multiple related crates

## Performance Tips

```bash
# Faster linking (add to .cargo/config.toml)
[target.x86_64-unknown-linux-gnu]
linker = "clang"
rustflags = ["-C", "link-arg=-fuse-ld=lld"]

# Parallel compilation
cargo build -j 8

# Incremental compilation (enabled by default in debug)
CARGO_INCREMENTAL=1 cargo build

# Share build cache across projects
export CARGO_TARGET_DIR=/tmp/cargo-target

# Use sccache for distributed compilation
export RUSTC_WRAPPER=sccache
```

## Troubleshooting

```bash
# Clear build cache
cargo clean

# Update dependencies
cargo update

# Check what cargo is doing
cargo build -vv

# Offline build (use cached deps only)
cargo build --offline

# Ignore lock file
cargo build --locked

# Force rebuild
cargo clean && cargo build

# Check why a dependency is included
cargo tree -i dependency_name

# Find duplicate dependencies
cargo tree -d
```
