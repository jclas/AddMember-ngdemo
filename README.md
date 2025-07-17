# Member Management System

A modern Angular Single Page Application (SPA) for managing member information with a clean, multi-step form interface.

## 🚀 Features

- **5-Page Workflow**: Intuitive step-by-step member registration process
- **Data Persistence**: LocalStorage integration for data retention between sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation**: Real-time validation with user-friendly error handling
- **Modern UI**: Clean, professional interface with smooth navigation
- **HTTPS Support**: Secure development server configuration

## 📋 Pages Overview

1. **Main Page** (`/members`) - Member list with add button
2. **Basic Info** (`/add-member/basic`) - Email, display name, first/last name
3. **Address** (`/add-member/address`) - Street address, city, state, postal code
4. **Contact** (`/add-member/contact`) - Phone number and birth date
5. **Review** (`/add-member/review`) - Review and save member information

## 🛠 Tech Stack

- **Angular 17** - Modern TypeScript framework
- **Standalone Components** - Latest Angular architecture
- **Reactive Forms** - Form handling with validation
- **Angular Router** - Navigation between pages
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **CSS3** - Modern styling and responsive design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AddMember-ngdemo
   ```

2. **Navigate to the Angular project**
   ```bash
   cd member-add
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Server (HTTP)
```bash
npm start
```
Application will be available at `http://localhost:4200/`

### Development Server (HTTPS)
```bash
npm run start:https
```
Application will be available at `https://localhost:4200/`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## 📁 Project Structure

```
AddMember-ngdemo/
├── member-add/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Angular components
│   │   │   │   ├── member-list/
│   │   │   │   ├── member-basic-info/
│   │   │   │   ├── member-address/
│   │   │   │   ├── member-contact/
│   │   │   │   └── member-review/
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   ├── services/       # Angular services
│   │   │   ├── app.component.*
│   │   │   └── app.routes.ts
│   │   ├── styles.css         # Global styles
│   │   └── index.html
│   ├── angular.json           # Angular configuration
│   ├── package.json          # Dependencies and scripts
│   └── tsconfig.json         # TypeScript configuration
└── README.md                 # This file
```

## 💾 Data Storage

The application uses **localStorage** for data persistence:

- **Automatic Saving**: Member data is automatically saved when added
- **Session Persistence**: Data survives browser restarts and page refreshes
- **No Backend Required**: Perfect for demos and prototyping
- **Browser Storage**: Data is stored locally in the browser

## 🔧 Development

### Key Components

- **MemberService**: Handles data management and localStorage integration
- **Member Model**: TypeScript interface defining member structure
- **Routing**: Navigation configuration between pages
- **Form Validation**: Real-time validation on each step

### Available Scripts

- `npm start` - Start development server (HTTP)
- `npm run start:https` - Start development server (HTTPS)
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## 🌟 Features in Detail

### Multi-Step Form
- Progressive data collection across 4 steps
- Navigation between steps with data preservation
- Form validation on each step
- Review page with edit capabilities

### Data Management
- LocalStorage integration for persistence
- Reactive data flow with RxJS
- Type-safe data models
- Automatic ID generation

### User Experience
- Responsive design for all screen sizes
- Loading states and smooth transitions
- Clear navigation and progress indicators
- Professional, clean interface

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Export/Import functionality
- [ ] Advanced search and filtering
- [ ] Member categories and tags
- [ ] Bulk operations
- [ ] Data validation improvements
- [ ] PWA capabilities

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Developer

Created with Angular CLI and modern web development best practices.

---

**Note**: This is a demonstration project showcasing Angular development capabilities with a focus on user experience and modern web development patterns.
