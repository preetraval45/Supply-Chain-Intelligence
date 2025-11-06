# Run Without Docker - Local Development

## Prerequisites

You need to install:
1. **Node.js 20+** - https://nodejs.org/
2. **Python 3.11+** - https://www.python.org/downloads/
3. **PostgreSQL 15+** - https://www.postgresql.org/download/windows/

## Setup Instructions

### Step 1: Install PostgreSQL

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Set password: `postgres`
   - Port: `5432`
   - Remember the installation directory

### Step 2: Create Database

Open **SQL Shell (psql)** from Start Menu:

```sql
-- Login with password: postgres
CREATE DATABASE supply_chain;
\c supply_chain
```

Then run the schema:
```sql
\i 'C:/Users/raval/OneDrive - University of North Carolina at Charlotte/Documents/GitHub/CODE-RUN-HACKATHON/database/init.sql'
\i 'C:/Users/raval/OneDrive - University of North Carolina at Charlotte/Documents/GitHub/CODE-RUN-HACKATHON/database/seed_data.sql'
```

### Step 3: Install Node.js Dependencies

Open PowerShell in the project folder:

```powershell
cd frontend
npm install
```

### Step 4: Install Python Dependencies

```powershell
cd ..\backend
pip install -r requirements.txt
```

### Step 5: Set Environment Variables

Create `.env` file in root:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=supply_chain
GOOGLE_API_KEY=your-key-here
```

### Step 6: Start Backend

Open **PowerShell Terminal 1**:

```powershell
cd backend
uvicorn main:socket_app --host 0.0.0.0 --port 8000 --reload
```

Keep this running!

### Step 7: Start Frontend

Open **PowerShell Terminal 2**:

```powershell
cd frontend
npm run dev
```

Keep this running!

### Step 8: Open Browser

http://localhost:3000

## Automated Startup Script

See `run_local.ps1` for automated version.

