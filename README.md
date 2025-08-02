# AgriAssist: A Farmer-First Digital Platform

AgriAssist is a comprehensive, AI-powered web application designed to empower farmers by providing them with cutting-edge tools for market intelligence, agronomic support, financial services, and direct market access.

## ✨ Key Features

The platform is divided into three main user experiences: **Farmer**, **Buyer**, and **Admin**.

### Farmer Dashboard
- **Home:** A personalized overview of farm activities and quick access to key features.
- **Market Prices:** Real-time commodity prices with AI-powered forecasting to help farmers sell at the optimal time.
- **Marketplace:** A hub for buying certified farm inputs and, for Pro users, listing produce for sale directly to buyers.
- **Ask Synth (AI Agronomist):** An AI-powered tool to diagnose crop pests and diseases from a simple photo upload.
- **Knowledge Hub:** A library of expert guides, videos, and audio content on various farming topics.
- **Community:** A forum for farmers to connect, share knowledge, and ask questions.
- **Finance Hub:** A digital wallet for managing transactions, with access to credit and loan applications for Pro users.
- **Buyers:** A network to connect directly with verified produce buyers and exporters.
- **Analytics (Pro):** An advanced dashboard with data visualizations on yield performance, spending, and revenue forecasts.

### Buyer Dashboard
- **Connect with Farmers:** Discover and connect with individual farmers and cooperatives to source produce.
- **Verified Profile:** A dedicated profile to build trust within the farmer community.

### Admin Dashboard
- **Comprehensive Oversight:** A suite of dashboards to manage all aspects of the platform.
- **User Management:** View, edit, and manage farmer, buyer, and admin accounts.
- **Financial Control:** Track platform revenue, subscription numbers, and marketplace sales.
- **Content Management:** Add, edit, and manage all educational content in the Knowledge Hub.
- **Logistics:** Oversee marketplace orders, from processing to fulfillment.
- **And much more...**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation & Running Locally
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

### 🧑‍💻 Demo Logins

To explore the different roles, use the following credentials on the login page:

| Role   | Email                     | Password   |
|--------|---------------------------|------------|
| Farmer | `farmer@agriassist.app`   | `farmerpass` |
| Buyer  | `buyer.user@agriassist.app` | `buyerpass`  |
| Admin  | `admin@agriassist.app`    | `adminpass`  |

## ⚖️ Usage, Attribution, and Copyright

This frontend template is provided for demonstration and educational purposes. While you are free to learn from and adapt the code, the following rules strictly apply:

### Attribution
If you use this template, or any significant portion of its code or design, as the foundation for your own project (commercial or non-commercial), you **must** provide clear and visible attribution to the original developer. The required attribution is:

**"Frontend developed by Kato Geoffrey, Synthilogic Enterprise."**

This notice must be placed in the footer of your application or on an "About" page that is easily accessible to users.

### Copyright Policy
© 2024, Synthilogic Enterprise. All rights reserved.

The code, design, and assets included in this template are the intellectual property of Synthilogic Enterprise. Unauthorized copying, redistribution, or use of this template without proper attribution is strictly prohibited. For inquiries about licensing or commercial use beyond the scope of the attribution rule, please contact Synthilogic Enterprise directly.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Generative AI:** Google Genkit
- **Authentication:** Simulated in-memory auth
- **State Management:** Zustand
