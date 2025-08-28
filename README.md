# YNABOAB - Finance & Budget Tracker

A personal finance and budget tracking application inspired by YNAB (You Need A Budget). Built with Vue.js 3 as a learning project with potential for public release.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jhoang304/YNABOAB.git
   cd YNABOAB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Run the following SQL commands in your Supabase SQL editor:

   ```sql
   -- Enable Row Level Security
   ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

   -- Categories Table
   CREATE TABLE categories (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID REFERENCES auth.users(id),
       name VARCHAR(100) NOT NULL,
       color VARCHAR(7),
       icon VARCHAR(50),
       budget_amount DECIMAL(10, 2),
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Transactions Table
   CREATE TABLE transactions (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID REFERENCES auth.users(id),
       category_id UUID REFERENCES categories(id),
       amount DECIMAL(10, 2) NOT NULL,
       description TEXT,
       transaction_date DATE NOT NULL,
       type VARCHAR(10) CHECK (type IN ('income', 'expense')),
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Budgets Table
   CREATE TABLE budgets (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID REFERENCES auth.users(id),
       month_year VARCHAR(7) NOT NULL, -- Format: YYYY-MM
       total_budget DECIMAL(10, 2),
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW(),
       UNIQUE(user_id, month_year)
   );

   -- Budget Categories Table
   CREATE TABLE budget_categories (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       budget_id UUID REFERENCES budgets(id),
       category_id UUID REFERENCES categories(id),
       amount DECIMAL(10, 2) NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       UNIQUE(budget_id, category_id)
   );

   -- Row Level Security Policies
   CREATE POLICY "Users can manage their own categories" ON categories
       FOR ALL USING (auth.uid() = user_id);

   CREATE POLICY "Users can manage their own transactions" ON transactions
       FOR ALL USING (auth.uid() = user_id);

   CREATE POLICY "Users can manage their own budgets" ON budgets
       FOR ALL USING (auth.uid() = user_id);

   CREATE POLICY "Users can manage their own budget categories" ON budget_categories
       FOR ALL USING (
           budget_id IN (
               SELECT id FROM budgets WHERE user_id = auth.uid()
           )
       );

   -- Enable RLS on all tables
   ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
   ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
   ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   ├── transactions/        # Transaction-specific components
│   ├── budgets/            # Budget-specific components
│   └── reports/            # Report-specific components
├── views/                  # Page components
├── stores/                 # Pinia state management
├── services/               # API and external services
├── utils/                  # Utility functions
├── router/                 # Vue Router configuration
└── assets/                 # Static assets and styles
```

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Framework**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Icons**: Heroicons

## ✨ Features

- **Authentication**: Email/password sign-up and sign-in
- **Transaction Management**: Add, edit, and delete income/expense transactions
- **Category Management**: Create and manage spending categories
- **Budget Tracking**: Set monthly budgets and track spending
- **Reports & Analytics**: View spending patterns and trends
- **Responsive Design**: Mobile-first approach

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Conventions

- Use Vue 3 Composition API with `<script setup>`
- Follow Vue Style Guide recommendations
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Write semantic HTML with accessibility best practices

## 🔒 Security

- All database queries are filtered by user ID
- Row Level Security (RLS) enabled in Supabase
- Input validation on both client and server
- Secure session management through Supabase Auth

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🎯 Roadmap

- [ ] Set up Supabase backend
- [ ] Implement authentication flow
- [ ] Add transaction CRUD operations
- [ ] Create budget management system
- [ ] Build reports and analytics
- [ ] Add data export functionality
- [ ] Implement recurring transactions
- [ ] Add PWA capabilities
- [ ] Mobile app with Capacitor

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using Vue.js 3 and Supabase