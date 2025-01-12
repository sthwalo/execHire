# Contributing to ExecuHire

First off, thank you for considering contributing to ExecuHire! It's people like you that make ExecuHire such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the ExecuHire Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots and animated GIFs if possible

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
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the TypeScript and React styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

1. Fork the repo
2. Create a new branch (git checkout -b feature/your-feature)
3. Make your changes
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin feature/your-feature)
6. Create a new Pull Request

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

* Use TypeScript for all new code
* Prefer interfaces over type aliases
* Use explicit type annotations
* Avoid using `any`
* Use functional components with hooks
* Implement proper error handling

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

const UserComponent: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>;
};

// Bad
type User = any;

function UserComponent(props) {
  return <div>{props.user.name}</div>;
}
```

### React Styleguide

* Use functional components
* Use hooks for state and side effects
* Keep components small and focused
* Use proper prop types
* Implement error boundaries
* Use meaningful component names

```typescript
// Good
const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};

// Bad
function Form(props) {
  let data = props.data;
  return <form>{/* Form fields */}</form>;
}
```

### Testing Styleguide

* Write meaningful test descriptions
* Test component behavior, not implementation
* Use React Testing Library
* Mock external dependencies
* Test error cases

```typescript
// Good
describe('BookingForm', () => {
  it('should submit form data when valid', async () => {
    const onSubmit = jest.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    
    // Test implementation
  });
});

// Bad
describe('form', () => {
  it('works', () => {
    // Vague test implementation
  });
});
```

## Project Structure

```
execuHire/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Auth-related pages
│   └── components/        # Shared components
├── components/            # Global components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── src/                   # Source files
    ├── services/          # API services
    └── store/             # Redux store
```

## Setting Up Development Environment

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. Start development server:
```bash
npm run dev
```

## Review Process

* All submissions require review
* Changes will be merged after approval
* Reviewers will look for:
  * Code quality and style
  * Test coverage
  * Documentation
  * Performance implications
  * Security considerations

## Community

* Join our [Discord](https://discord.gg/execuhire)
* Follow us on [Twitter](https://twitter.com/execuhire)
* Read our [Blog](https://blog.execuhire.com)

## Questions?

If you have any questions, please feel free to contact the maintainers:

* Email: maintainers@execuhire.com
* Discord: [ExecuHire Server](https://discord.gg/execuhire)

Thank you for contributing to ExecuHire! 🚀
