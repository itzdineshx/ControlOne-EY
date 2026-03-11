# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

**Frontend:**
- Vite
- TypeScript  
- React
- shadcn-ui
- Tailwind CSS

**Backend:**
- Django 5.x
- Django REST Framework
- SQLite/PostgreSQL
- Python 3.10+

## Environment Setup

### Frontend Environment

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Key frontend environment variables:**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_APP_NAME=ControlOne Dashboard
   VITE_DEV_MODE=true
   VITE_ENABLE_DEBUG_LOGS=true
   ```

### Backend Environment

1. **Navigate to backend and copy environment template:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Key backend environment variables:**
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
   API_PORT=8000
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

### Full Stack Setup

1. **Install and run backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py seed_data
   python manage.py runserver 8000
   ```

2. **Install and run frontend:**
   ```bash
   npm i
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - API: http://localhost:8000/api/
   - Admin: http://localhost:8000/admin/

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
