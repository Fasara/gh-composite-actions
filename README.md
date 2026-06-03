## Different Types of Custom Actions

### 👩🏼‍🍳 JavaScript Actions

The action runs directly on the runner (the VM that executes your workflow) using Node.js.
GitHub provides a toolkit (@actions/core, @actions/github, etc.) to interact with inputs, outputs, and the workflow context. 

**How it works**:

You write a JS/TS file, point action.yml at it via `runs.using: node20`, and GitHub executes it natively.
```
action.yml

runs:
  using: node20
  main: dist/index.js
```

**Pros**

- Fast startup — no Docker overhead
- First-class GitHub toolkit support
- Works on all runner OS types (Linux, Windows, macOS)

**Cons**

- You're tied to whatever Node version the runner supports
- Dependencies need to be bundled (usually with esbuild or ncc) since you typically commit dist/

**Best for**: 

Anything that needs to be fast and cross-platform — parsing inputs, calling APIs, posting PR comments, interacting with the GitHub API.


### 👩🏼‍🍳 Docker Actions

The action runs inside a Docker container that you define. 

GitHub builds (or pulls) the image and runs your entrypoint script inside it.

```
action.yml
runs:
  using: docker
  image: Dockerfile  # or a pre-built image: docker://alpine:3.18
```

**Pros**

- Full control over the environment — any language, any dependency, any OS tool
- Reproducible and hermetic — the container is the environment
- Great for wrapping CLIs or tools that have complex setup

**Cons**

- Slower — Docker build/pull adds startup time
- Linux runners only (Docker containers can't run on Windows/macOS GitHub-hosted runners)
- Heavier to maintain if you own the Dockerfile

**Best for**: 

Actions that depend on specific system tools (e.g. AWS CLI, Terraform, custom Python environments) or where environment consistency is critical.

### 👩🏼‍🍳 Composite Actions

Rather than running code, a composite action chains together other steps — shell commands, other actions — into a single reusable unit.

Think of it as extracting a block of workflow steps into its own named action.

```
# action.yml
runs:
  using: composite
  steps:
    - run: npm ci
      shell: bash
    - uses: actions/setup-node@v4
      with:
        node-version: 20
    - run: npm run build
      shell: bash
```

**Pros**

- No code required — pure YAML
- Easy to extract repeated workflow logic (install → build → test) into one reusable thing
- Runs on any OS since it delegates to the steps themselves

**Cons**

- Less powerful than JS/Docker for complex logic
- Error handling and conditional logic are more limited than writing actual code
- `shell` must be explicitly set on every run step

**Best for**: 

DRY-ing up repeated setup sequences across workflows — e.g. a standard "checkout + install + configure AWS" block you use in 10 pipelines.


________________

![GitHub Actions Certificate](./public/GH-Actions-Certificate.png)
