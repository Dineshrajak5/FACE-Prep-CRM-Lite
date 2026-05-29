# FACE Prep CRM — Launch Guide
### Zero gaps. 10 reps. Production-ready.

---

## What you're setting up

| Service | What it does | Cost |
|---|---|---|
| **Supabase** | Database (real Postgres). All CRM data lives here — shared across all reps, survives page refresh, works on any device. | Free (500 MB) |
| **EmailJS** | Sends approval emails to Ops and Finance from the browser. No backend needed. | Free (200 emails/month) — upgrade if needed |
| **Vercel** | Hosts your app at a real URL. Auto-deploys when you push code. | Free |

Estimated total setup time: **45 minutes** (first time). Later deployments: 2 minutes.

---

## STEP 1 — Set up Supabase (your database)

### 1.1 — Create account & project

1. Go to **[supabase.com](https://supabase.com)** → click **Start your project**
2. Sign up (GitHub sign-in is fastest)
3. Click **New project**
4. Fill in:
   - **Name:** `faceprep-crm` (or anything)
   - **Database Password:** create a strong password (save it somewhere, you may need it later)
   - **Region:** choose the closest to India — `Southeast Asia (Singapore)` or `South Asia (Mumbai)` if available
5. Click **Create new project**
6. Wait about 60 seconds while the project spins up

### 1.2 — Create the database table

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Paste this SQL exactly and click **Run** (▶):

```sql
-- Create the key-value store table
CREATE TABLE crm_store (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE crm_store ENABLE ROW LEVEL SECURITY;

-- Allow all operations (internal team app — tighten later if needed)
CREATE POLICY "allow_all" ON crm_store
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
```

4. You should see "Success. No rows returned." — that means it worked.

### 1.3 — Get your API credentials

1. In the left sidebar click **Settings** → **API**
2. Copy and save two values:
   - **Project URL** — looks like `https://xyzabcdef.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`

> ⚠️ The `anon` key is safe to expose in the browser. Do NOT use the `service_role` key.

---

## STEP 2 — Set up EmailJS

### 2.1 — Create account

1. Go to **[emailjs.com](https://www.emailjs.com)** → **Sign Up Free**
2. Verify your email

### 2.2 — Connect an email service

1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** (recommended) or Outlook
3. Follow the OAuth popup to connect your sending email address
4. Note the **Service ID** shown after connection (e.g. `service_abc1234`)

### 2.3 — Create an email template

1. Dashboard → **Email Templates** → **Create New Template**
2. Set these fields exactly:

   - **To email:** `{{to_email}}`
   - **Subject:** `{{subject}}`
   - **Reply To:** (leave blank or your email)

3. In the **Content** area, select **HTML** and paste:

```html
{{{html_body}}}
```

   (Triple curly braces — this lets the CRM send its formatted HTML table)

4. Click **Save**
5. Note the **Template ID** (e.g. `template_xyz9876`)

### 2.4 — Get your public key

1. Dashboard → **Account** → **API Keys**
2. Copy your **Public Key** (not Secret Key)

---

## STEP 3 — Set up the project on your computer

### 3.1 — Install Node.js (if not already installed)

1. Go to **[nodejs.org](https://nodejs.org)** → Download the **LTS** version
2. Install it (next → next → finish)
3. Open a terminal (Command Prompt / PowerShell on Windows, Terminal on Mac)
4. Check it worked: type `node -v` → should show something like `v20.x.x`

### 3.2 — Create the Vite + React project

Open a terminal and run these commands one by one:

```bash
npm create vite@latest faceprep-crm -- --template react
```

When it asks "Ok to proceed?", press **Enter**.

```bash
cd faceprep-crm
npm install
```

### 3.3 — Replace the app file

1. Open the `faceprep-crm` folder in your file explorer
2. Go inside `src/`
3. Delete the existing `App.jsx`
4. Copy your downloaded **`faceprep-crm.jsx`** (the file provided here) into `src/`
5. Rename it to `App.jsx`

### 3.4 — Update main.jsx

Open `src/main.jsx` and replace everything with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 3.5 — Update index.html

Open `index.html` (in the root of your project) and find the `<title>` tag. Change it to:

```html
<title>FACE Prep CRM</title>
```

### 3.6 — Create the environment variables file

In the root of your `faceprep-crm` folder (not inside `src/`), create a new file called `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJyour-anon-key-here
```

Replace the values with your actual Supabase credentials from Step 1.3.

> ℹ️ On Windows: Make sure the file is literally named `.env` with no other extension. In File Explorer, go to View → check "File name extensions" to confirm.

### 3.7 — Test locally

```bash
npm run dev
```

Open your browser to **http://localhost:5173** — you should see the CRM login screen.

Log in with:
- User: `Dinesh Raja Krishnasamy` (admin)
- Password: `admin123`

Create a test institution and deal. Refresh the page — if data survives the refresh, Supabase is working.

---

## STEP 4 — Configure EmailJS in the CRM

1. Log in as admin
2. Go to **Settings** → **Email Config**
3. Fill in:
   - **Service ID:** your EmailJS service ID from Step 2.2
   - **Template ID:** your EmailJS template ID from Step 2.3
   - **Public Key:** your EmailJS public key from Step 2.4
   - **Operations Team Email:** the email address that receives ops notifications
   - **Finance Team Email:** the email address that receives finance notifications
4. Click **Save Email Config**

To test: create a deal, approve it (as admin), and check that emails arrive.

---

## STEP 5 — Deploy to Vercel

### 5.1 — Create a Vercel account

1. Go to **[vercel.com](https://vercel.com)** → **Sign Up**
2. Sign up with GitHub (recommended) or email

### Option A: Deploy via GitHub (recommended — auto-deploys on changes)

1. Create a free account at **[github.com](https://github.com)** if you don't have one
2. On GitHub: click **+** → **New repository** → name it `faceprep-crm` → **Create repository**
3. In your terminal (inside the `faceprep-crm` folder):

```bash
git init
git add .
git commit -m "Initial CRM setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/faceprep-crm.git
git push -u origin main
```

4. On Vercel: **New Project** → **Import Git Repository** → select `faceprep-crm`
5. Vercel will auto-detect it's a Vite project. Don't change the settings.
6. **Before clicking Deploy**, add environment variables:
   - Click **Environment Variables**
   - Add: `VITE_SUPABASE_URL` → your Supabase URL
   - Add: `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
7. Click **Deploy**

### Option B: Deploy directly (no GitHub needed)

```bash
npm run build
npx vercel --prod
```

Follow the prompts. When done, Vercel prints your live URL.

Then add environment variables in Vercel:
1. Go to your project on vercel.com → **Settings** → **Environment Variables**
2. Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Go to **Deployments** → click the three dots on the latest → **Redeploy**

---

## STEP 6 — Share with your team

Your CRM is now live at a URL like `https://faceprep-crm.vercel.app`.

Share this URL with your reps. Everyone uses the same URL and sees the same data in real time.

### Default credentials to change FIRST

| User | Login ID | Default Password | Role |
|---|---|---|---|
| Dinesh Raja Krishnasamy | `dinesh` | `admin123` | Admin |
| Rep 1 | `rep1` | `rep123` | Rep |
| Rep 2 | `rep2` | `rep456` | Rep |

To add or remove reps: **Settings** → **Users** → **Add User**.

---

## Troubleshooting

### "Data disappears on refresh"
→ Supabase connection is failing. Check:
1. Is `.env` in the root folder (not inside `src/`)?
2. Do the variable names start with `VITE_`?
3. Did you add the environment variables in Vercel (not just locally)?
4. Go to Supabase → SQL Editor → run `SELECT * FROM crm_store;` — does the table exist?

### "Emails not sending"
→ Check EmailJS settings in CRM Settings → Email Config. Make sure all three IDs are filled in. Also check your EmailJS dashboard for error logs.

### "Page not loading after deploy"
→ In Vercel, go to your project → **Deployments** → click the failed deployment → check **Build Logs** for error messages.

### "200 email limit hit"
→ Upgrade EmailJS to the Personal plan (~$15/month for 1,000 emails/month). With 10 reps and typical approval volumes, you'll likely hit this within 1–2 months.

---

## Storage keys reference

All CRM data is stored in Supabase under these keys in `crm_store`:

| Key | Contents |
|---|---|
| `crm_institutions` | All college records |
| `crm_contacts` | All contacts per institution |
| `crm_deals` | All OIF / deal records |
| `crm_users` | User accounts (merged with defaults) |
| `crm_field_defs` | Custom OIF field definitions |
| `crm_emailjs_config` | EmailJS credentials + team emails |

To export all data: use the **CSV Export** button in the Pipeline view.

---

*Guide version: May 2026 — for FACE Prep CRM v1.0 (Supabase edition)*
