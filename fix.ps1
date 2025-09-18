Write-Host "🔧 Cleaning project and reinstalling dependencies..."

# .next folder हटाओ
if (Test-Path ".next") {
    Write-Host "Deleting .next..."
    rd /s /q .next
}

# node_modules folder हटाओ
if (Test-Path "node_modules") {
    Write-Host "Deleting node_modules..."
    rd /s /q node_modules
}

# npm cache clean
Write-Host "Cleaning npm cache..."
npm cache clean --force

# temp files clean
Write-Host "Cleaning temp files..."
if (Test-Path $env:TEMP) {
    rd /s /q $env:TEMP
}

# dependencies reinstall
Write-Host "Installing dependencies..."
npm install

# server start
Write-Host "Starting development server..."
npm run dev