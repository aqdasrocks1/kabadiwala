# ?? Kabadiwala Scrap Management Web App

This is a full-stack scrap collection management system designed for Indian households and scrap dealers.

## ?? Project Structure

- `kabadiwala-backend/` – Node.js/Express + MongoDB backend with email/SMS notifications.
- `kabadiwala-frontend/` – React app for requesting scrap pickup.

## ?? Features

- ?? Request scrap pickups
- ?? Twilio SMS + Gmail email notifications
- ?? MongoDB Atlas for cloud DB
- ?? Admin panel (coming soon)

## ?? Deployment Instructions

### 1. Set up MongoDB Atlas
- Create an account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Add a free cluster, whitelist IPs, and create a user
- Get the connection URI and paste it in `.env`

### 2. DigitalOcean App Platform
- Push this repo to GitHub
- Go to [https://cloud.digitalocean.com/apps](https://cloud.digitalocean.com/apps)
- Click **Create App** ? choose GitHub ? select this repo
- Set the root directory for:
  - Backend: `/kabadiwala-backend`
  - Frontend: `/kabadiwala-frontend`
- Configure environment variables in the UI (`.env` values)
- Hit **Deploy**

### 3. Environment Variables Required

#### Backend:
