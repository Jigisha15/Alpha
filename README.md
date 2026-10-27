# Alpha — Contact Management Dashboard

A responsive contact management application designed for small teams to organize, view, and manage business contacts through **Table and Kanban Board views**.

Built with React, TypeScript, Tailwind CSS, shadcn/ui, and Syncfusion React Kanban.

## Overview

Alpha is a frontend prototype for a small team that needs a simple way to manage business contacts and track their progress through different stages.

The application uses 15 dummy contacts stored in a local JSON file. On the initial mount, the data is initialized in `localStorage`, which serves as the application's data source for subsequent operations.

Users can switch between a traditional table layout and a Kanban board, filter contacts by role, search for specific contacts, and update or delete existing records.

## Features

- **Dual Views:** Switch between a tabular view and a Kanban board.
- **Contact Management:** View, edit, and delete existing contacts.
- **Search & Filtering:** Search contacts using a query and filter them by role.
- **Kanban Board:** Organize contacts into stages based on their assigned roles.
- **Persistent Local Storage:** Store contact data in the browser's `localStorage` to retain changes across page reloads.
- **Responsive UI:** Responsive layouts for the table, dialogs, and other interface elements.
- **Loading States:** Provide loading feedback during data operations.
- **Table Skeletons:** Display skeleton placeholders while the table is loading.
- **Reusable Components:** Maintain a structured component hierarchy with reusable UI elements.

## Tech Stack

| Technology              | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| React + Vite            | UI development and build tooling             |
| TypeScript              | Type safety and maintainable code            |
| Tailwind CSS            | Utility-first styling and responsive layouts |
| shadcn/ui               | Reusable UI components                       |
| Syncfusion React Kanban | Kanban board visualization                   |
| Browser localStorage    | Client-side data persistence                 |

## Views

### 1. Table View

Displays business contacts in a structured, tabular layout.

- View all contacts and their details.
- Search and filter the contact list.
- Edit contact information.
- Delete contacts with a confirmation dialog.
- Display skeleton placeholders during loading.

### 2. Kanban Board View

Displays contacts as cards organized into columns according to their assigned role.

- Visualize contacts across different stages.
- View contact details in a board-based layout.
- Edit and delete contacts.
- Switch between the board and table views.

## Data Model

Each contact follows the `UserInterface` TypeScript interface:

```typescript
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  company: string;
  role: ROLE;
  owner: string;
  labels: string;
  stage: string;
  notes: string;
}
```

The available roles are defined as a constant object:

```typescript
export const ROLE = {
  Lead: "Lead",
  Prospect: "Prospect",
  Qualified: "Qualified",
  Customer: "Customer",
} as const;
```

The application starts with 15 dummy contacts defined in a local JSON file.

### Data Persistence

On the initial mount, the application initializes the `contacts` item in `localStorage` using the dummy dataset. Subsequent contact operations read from and update this stored data.

**Storage key:** `contacts`

> Note: This is a frontend-only prototype. Contact data is stored locally in the browser and is not synchronized across users or devices.

## Project Structure

```text
src/
├── components/
│   ├── board                 # Reusable components for board
│   ├── table                 # Reusable components for table
│   ├── common                # Commonly reusable components
│   └── ui/                   # shadcn/ui components
├── data/
│   └── data.json             # Dummy contact dataset
├── interfaces/
│   └── UserInterface.ts      # TypeScript interfaces and role definitions
├── pages/
│   ├── BoardPage.tsx         # Board View Page
│   ├── TablePage.tsx         # Table View Page
├── App.tsx
└── main.tsx
```

The project follows a feature-oriented organization of reusable components, mock data, shared type definitions, and page-level views. This keeps the application easier to navigate and extend.

*Note: Replace the placeholder filenames with the actual filenames in your repository if they differ.*

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

### Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Current Limitations & Future Improvements

The current implementation covers the core contact management workflow. The following improvements remain on the roadmap:

- [ ] Implement contact creation functionality.
- [ ] Add pagination to the table view.
- [ ] Improve Kanban board responsiveness on mobile phones and tablets.
- [ ] Refine the alert dialog UI within the table view.
- [ ] Refactor shared update and delete logic to reduce component duplication.
- [ ] Implement skeleton loading states for the Kanban board.

## Development Notes

### What Went Well

- **Familiarity with Kanban libraries:** Having explored Kanban libraries previously helped me quickly identify Syncfusion React Kanban as a suitable choice for the board view.
- **Hands-on experience with TypeScript and Tailwind CSS:** Familiarity with both technologies helped accelerate implementation and styling.
- **Component organization:** Separating reusable components, data, interfaces, and pages helped establish a clean project structure.

### What I Want to Explore Next

I plan to explore Syncfusion React Kanban more deeply, particularly its configuration options, component attributes, and responsive behavior across screen sizes. I also want to improve the component architecture by extracting shared CRUD logic and making the board experience more polished on mobile and tablet devices.

### Design Approach

Rather than strictly following a Figma reference, I used a design direction I had already envisioned for the application. This allowed me to focus on implementing the core workflows and creating a consistent interface across both views.

## Development Timeline

| Activity                          | Time     |
| --------------------------------- | -------- |
| Project development started       | 7:00 PM  |
| Core development completed        | 10:00 PM |
| Hosting and documentation started | 10:30 PM |

The core implementation was completed in approximately **3 hours**, followed by hosting and documentation.

## Project Status

**Status:** Frontend prototype — core viewing, editing, filtering, and deletion workflows implemented.

The application currently uses mock data and browser-based persistence. Contact creation, pagination, and further responsive and architectural improvements are planned for future iterations.

---

Built as a practical exploration of React, TypeScript, reusable UI components, and Kanban-based contact management.
