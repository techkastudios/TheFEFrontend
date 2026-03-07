Analyze the entire provided codebase before generating documentation.
Do not respond until full analysis is complete.



You are a Senior Nuxt.js (Nuxt 2) Architect and Technical Documentation Expert.

I am working on an existing Nuxt 2 project that was developed by another developer. 
There is no documentation, and I need to generate comprehensive technical documentation 
and a high-level project overview for long-term maintenance and feature development.

Your task is to analyze the entire codebase and produce structured, professional documentation.

---

# 🎯 OBJECTIVES

1. Generate a high-level project overview
2. Document architecture and folder structure
3. Identify and document features
4. Map components and their responsibilities
5. Document state management (Pinia)
6. Document routing and middleware
7. Document API integrations
8. Identify technical debt and risks
9. Provide onboarding documentation for new developers
10. Suggest improvement and refactoring opportunities

---

# 📦 REQUIRED OUTPUT STRUCTURE

Use the exact structure below in your output.

---

# 1. Project Overview

- Project purpose (inferred from code)
- Target users
- Core business domain
- Application type (SPA / SSR / Static)
- Key technologies used
- Deployment assumptions

---

# 2. Architecture Overview

## 2.1 Nuxt Mode
- SSR or SPA
- Static generation usage (if any)
- Runtime config usage

## 2.2 Folder Structure Explanation
Explain purpose of:
- pages/
- components/
- layouts/
- store/
- middleware/
- plugins/
- assets/
- static/
- modules/
- utils/ (if exists)
- services/ (if exists)

Highlight custom patterns introduced by previous developer.

---

# 3. Feature Documentation

Identify major features and describe:

For each feature:
- Feature name
- Business purpose
- Pages involved
- Components involved
- Store modules used
- APIs used
- Middleware used
- Dependencies
- Potential risks or weaknesses

Group features logically.

---

# 4. Component Inventory

Create a categorized list:

## Global Components
## Layout Components
## Page-Level Components
## Shared UI Components

For important components include:
- Props
- Emits
- Pinia usage
- External dependencies
- Reusability rating (Low / Medium / High)

---

# 5. State Management (Pinia)

For each store module:
- State structure
- Mutations
- Actions
- Getters
- API dependencies
- Cross-module coupling
- Anti-patterns (if any)

Explain data flow patterns.

---

# 6. Routing & Navigation

- Route structure
- Dynamic routes
- Nested routes
- Middleware usage
- Auth guards
- Route-based code splitting
- Navigation risks

---

# 7. API & External Integrations

- List all API services
- Authentication mechanism
- Axios configuration
- Error handling pattern
- Environment variable usage
- Third-party services (Stripe, Firebase, etc.)

Highlight security concerns if visible.

---

# 8. Plugins & Global Configuration

- Custom plugins
- Global mixins
- Injected services
- Nuxt modules used
- Global CSS strategy
- i18n (if exists)

---

# 9. Performance & Technical Debt Analysis

Identify:
- Anti-patterns
- Tight coupling
- Large components
- Business logic inside UI
- Direct API calls inside components
- Missing abstraction layers
- Duplicate logic
- Missing error handling
- Missing loading states

Categorize severity:
- Low
- Medium
- High
- Critical

---

# 10. Improvement & Refactoring Roadmap

Provide:

## Quick Wins (1–3 days)
## Mid-term Improvements
## Long-term Architecture Improvements

Include:
- Refactoring suggestions
- Modularization suggestions
- TypeScript migration feasibility
- Composition API migration feasibility
- Testing strategy recommendations

---

# 11. Onboarding Guide for New Developers

Include:
- How to install
- How to run locally
- Environment variables
- Project conventions
- Deployment process (if inferred)
- Where to add new features
- Where to add new API integrations
- Coding standards inferred from project

---

# 12. Risk Assessment Summary

Provide:
- Maintainability score (1–10)
- Scalability score (1–10)
- Code quality summary
- Bus factor risk
- Upgrade complexity (Nuxt 2 → Nuxt 3)

---

# 📋 OUTPUT REQUIREMENTS

- Be structured and professional
- Use Markdown formatting
- Include tables where helpful
- Be analytical, not generic
- Infer architecture patterns from actual code
- Call out inconsistencies explicitly
- Do NOT hallucinate features that do not exist
- If something is unclear, state assumptions

---

# 🔍 IMPORTANT

Base conclusions strictly on the analyzed code.
If patterns are inconsistent, highlight them.
If architectural decisions are unclear, note that explicitly.

This documentation will be used for:
- Stakeholder overview
- Technical audit
- Refactoring roadmap
- Future developer onboarding

Act as a senior-level technical architect reviewing production code.

Generate the documentation now.



After the overview is generated, run follow-ups like:

Now deeply analyze only the Pinia store modules.
Focus on data flow, coupling, anti-patterns, and refactoring strategy.

Now perform a component architecture audit.
Identify reusability issues, prop drilling, business logic leakage, and abstraction problems.

Provide a brutally honest senior-level technical debt evaluation.
Score maintainability, scalability, and upgrade difficulty.