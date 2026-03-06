<<<<<<< HEAD
README - Node.js Backend Fundamentals

Node.js Backend Fundamentals
A repository dedicated to mastering the core concepts of Node.js backend development, specifically focused on building applications without heavy reliance on high-level frameworks. This project emphasizes understanding the runtime, its internal modules, and architectural patterns.

---

Project Purpose
The primary goal is to decouple backend logic from framework-specific abstractions. By building with minimal dependencies, the codebase remains portable, easier to test, and provides a deeper understanding of how Node.js handles I/O, networking, and the file system.

---

Core Features
• Framework-Agnostic Design: Core logic is isolated from third-party libraries.

• TypeScript Integration: Strongly typed interfaces for predictable data flow.

• CLI Utilities: Custom command-line tools for local development and automation.

• Data Persistence: Direct interaction with databases using Prisma for schema safety.

---

Roadmap
Phase 1: Foundations

• Implement custom HTTP server logic using the native `http` module.

• Establish a standard project structure (src/dist).

• Configure TypeScript and Node.js type definitions.

Phase 2: Data & Persistence

• Integrate Prisma ORM with PostgreSQL.

• Implement basic CRUD operations.

• Handle environment variables and configuration management.

Phase 3: Advanced Core Concepts

• Implement custom Error Handling middleware.

• Explore the Stream API for efficient data processing.

• Develop a CLI tool for internal task management.

Phase 4: Production Readiness

• Add comprehensive unit testing.

• Implement logging and monitoring.

• Document API endpoints and CLI commands.

---

CLI Tools (To-do)
• Implementar comandos base para gestão de tarefas via terminal.

• Configurar leitura de argumentos e flags nativas do Node.js.

• Integrar persistência de dados do CLI com o banco de dados via Prisma.

• Adicionar suporte a output formatado (tabelas/json) no terminal.

---

Installation
```

npm install

```

Build
```

npm run build

```

Development
```

npm run dev

=======
# Node.js Backend Fundamentals

A repository dedicated to mastering the core concepts of Node.js backend development, specifically focused on building applications without heavy reliance on high-level frameworks. This project emphasizes understanding the runtime, its internal modules, and architectural patterns.

## Project Purpose
The primary goal is to decouple backend logic from framework-specific abstractions. By building with minimal dependencies, the codebase remains portable, easier to test, and provides a deeper understanding of how Node.js handles I/O, networking, and the file system.

## Core Features
• Framework-Agnostic Design: Core logic is isolated from third-party libraries.  
• TypeScript Integration: Strongly typed interfaces for predictable data flow.  
• CLI Utilities: Custom command-line tools for local development and automation.  
• Data Persistence: Direct interaction with databases using Prisma for schema safety.

## Roadmap

### Phase 1: Foundations
• Implement custom HTTP server logic using the native http module.  
• Establish a standard project structure (src/dist). ✅  
• Configure TypeScript and Node.js type definitions. ✅

### Project Structure
```text
node-cli/
├── dist/          # Compiled JavaScript (Distribution)
├── src/           # TypeScript source code
│   └── index.ts   # Main entry point
├── package.json
└── tsconfig.json
```

---

### Phase 2: Data & Persistence
• Integrate Prisma ORM with PostgreSQL.  
• Implement basic CRUD operations.  
• Handle environment variables and configuration management.

### Phase 3: Advanced Core Concepts
• Implement custom Error Handling middleware.  
• Explore the Stream API for efficient data processing.  
• Develop a CLI tool for internal task management.

### Phase 4: Production Readiness
• Add comprehensive unit testing.  
• Implement logging and monitoring.  
• Document API endpoints and CLI commands.

## Installation
```bash
npm install
```

## Build
```bash
npm run build
```

## Development
```bash
npm run dev
>>>>>>> 439639e (chore: restructure project to src/dist and update tsconfig)
```
