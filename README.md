Centralized Patient Resource Management System (Prototype for UDAL)

Full-Stack Healthcare Management Web Application  
React + TypeScript | Node.js | PostgreSQL

Built a complete hospital management system prototype for UDAL that helps hospitals manage patients, resources, and emergencies in real-time.

What It Does:
•  Patient Queue Management: Tracks patient tokens by department with real-time status updates (waiting, in-progress, completed)
•  Inventory Control: Manages drug and blood bank supplies with automatic low-stock alerts
•  Emergency Alerts: Handles Code Blue/Red emergency notifications across hospital departments
•  Multi-User System: Different dashboards for doctors, operators, and administrators

Technical Stack:
•  Frontend: React 19 with TypeScript, TailwindCSS for styling
•  Backend: Node.js/Express REST API with JWT authentication
•  Database: PostgreSQL with Prisma ORM for data management
•  Deployment: Frontend on Vercel, backend with CORS configuration

Key Features Built:
1. Token System: Digital queue management where patients get numbered tokens and can see their status on department screens
2. Drug Inventory: Track medicine stock levels, set reorder points, and get alerts when supplies run low
3. Blood Bank: Monitor blood units by type (A+, O-, etc.) with critical level warnings
4. Emergency Alerts: Real-time Code Blue/Red notifications that appear instantly across all screens
5. Role-Based Access: Different permissions for admins, doctors, and operators
