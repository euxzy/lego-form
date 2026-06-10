# Lego Form: Schema-Driven Modular Form

This project is a demonstration of an enterprise-scale dynamic form generation architecture using a "Schema-Driven" approach. The entire form UI, validation rules, and conditional logic are automatically built based on JSON configurations (schemas). 

This architecture is specifically designed to solve common issues in complex forms, such as prop-drilling, memory leaks caused by stale global states, and mass re-renders that lead to performance degradation (lagging) during user input.

## Key Features

- **Schema-Driven UI**: Automatically renders input components based on configuration object definitions, supporting grid layout customization with Tailwind CSS.
- **Context-Bounded Zustand**: Isolates the Zustand store within a React Context. This ensures that memory is automatically garbage-collected when the user navigates away, preventing state leaks (memory leaks).
- **Atomic Selectors**: Prevents mass re-renders across the entire form when a single field changes, maintaining optimal performance even with hundreds of fields.
- **Dynamic Zod Compiler**: Instantly compiles validation rules from JSON into executable Zod schemas upon form submission or step transitions.
- **Conditional Logic**: Reactively controls the visibility (show/hide) and interactivity (enable/disable) of a field based on the values of other fields.
- **Dynamic Array Fields**: Manages nested data structures to dynamically add or remove input rows without disrupting the index order.
- **Multi-Step Wizard**: Combines all the features above into a step-by-step form completion scenario (wizard) with secure data persistence between steps.

## Tech Stack

- **Framework**: React Router v7
- **State Management**: Zustand (Vanilla Store + React Context)
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager & Runtime**: Bun

## Project Structure

Below are the main directories that build the Lego Form architecture:

```text
/app
├── /components
│   ├── /modular-forms       # Core architecture (Engine)
│   │   ├── /blocks          # Collection of base input components (text, number, array, etc.)
│   │   ├── compiler.ts      # Runtime Zod schema compiler function
│   │   ├── registry.tsx     # Mapping of string input types to React components
│   │   ├── types.ts         # Zod schema definitions for JSON metadata structure
│   │   └── utils.ts         # Helper functions (e.g., grid mapper)
│   └── /shared              # Utility components (such as FormStateDebugger)
├── /constants
│   └── /mock-forms          # Collection of JSON data serving as blueprints for each form page
├── /contexts
│   └── form.tsx             # React Context wrapper to scope the Zustand store
├── /stores
│   └── form.ts              # Zustand vanilla store declaration (logic for set, register, unregister)
├── /routes                  # React Router v7 application pages
│   ├── /_layouts            # Main layout (navigation sidebar)
│   ├── /basic-form          # Basic form example
│   ├── /conditional-form    # Form example with show/hide and enable/disable logic
│   ├── /dynamic-form        # Dynamic array form example
│   ├── /grid-form           # Form example with column span configurations
│   ├── /validation-form     # Form example with Zod compiler validation
│   └── /multi-step-form     # Step-by-step wizard form example

## Getting Started

### Installation

Install the dependencies:

```bash
bun install
```

### Development

Start the development server with HMR:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
bun run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t lego-form .

# Run the container
docker run -p 3000:3000 lego-form
```
