# Contributing to ExecuHire

First off, thank you for considering contributing to ExecuHire! It's people like you that make ExecuHire such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript styleguide
* Include screenshots in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Development Process

1. Fork the repo
2. Create a new branch from `main`
3. Make your changes
4. Run the tests
5. Push to your fork and submit a pull request

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/execuhire.git

# Add upstream remote
git remote add upstream https://github.com/original/execuhire.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Setup database
npx prisma migrate dev

# Run development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test-file.test.ts

# Run tests in watch mode
npm test -- --watch
```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all files
* Use interface over type when possible
* Use async/await over promises
* Use const assertions for literals
* Use optional chaining and nullish coalescing
* Follow the existing code style

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/)
* Reference methods and classes in markdown with backticks
* Use code blocks for examples

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

* `bug` - Issues for bugs in the code
* `documentation` - Issues for improving or updating documentation
* `enhancement` - Issues for new features or improvements
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - Issues that are invalid or non-relevant
* `question` - Further information is requested

## Recognition

Contributors who have made significant contributions will be recognized in our README.md file.

Thank you for contributing to ExecuHire! 🚀
