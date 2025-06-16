# deploy.ps1
# Purpose: Build and Deploy WSRN Dashboard to Firebase Hosting

Write-Host "🚀 Starting WSRN Dashboard Deployment" -ForegroundColor Green

# Step 1: Navigate to Project Folder
Set-Location C:\Users\User\wrsn-recruitment

# Step 2: Clean Install Dependencies
Write-Host "🗑 Clearing node_modules and package-lock.json..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Build Production Version
Write-Host "🏗 Building production version..." -ForegroundColor Cyan
npm run build

# Step 4: Deploy to Firebase Hosting
Write-Host "🌐 Deploying to Firebase Hosting..." -ForegroundColor Magenta
firebase deploy --only hosting

# Step 5: Final Message
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "Your WSRN dashboard is now live at https://wsrn-recruitment.web.app"  -ForegroundColor Blue