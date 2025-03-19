# Worker URL Guide

The Flux Schnell application requires a Cloudflare Worker URL to function properly. This guide will help you deploy the Cloudflare Worker and obtain the required URL.

## Method 1: Using Automated Scripts (Recommended)

Flux Schnell provides convenient scripts that can automatically deploy the Worker and get the URL.

### Using the Main Startup Script

1. Double-click to run `start-flux-schnell.bat`
2. In the main menu, select "2. Deploy Worker and get URL, then start WeiUI"
3. The system will automatically install dependencies and start the deployment process
4. A browser will open during deployment, please login to your Cloudflare account and authorize
5. After successful deployment, the command line will display the Worker URL, and it will be automatically saved to the `saved_worker_url.txt` file
6. The application will automatically start WeiUI, where you can enter the URL just obtained

### Auto-extract URLs from Recent Deployments

If you've already deployed the Worker but need to extract the URL:

1. Double-click to run `start-flux-schnell.bat`
2. Select "3. Auto-extract Worker URL from recent deployment"
3. The script will search for recent deployment logs and extract the URL
4. The URL will be saved to `saved_worker_url.txt`

### Using the URL Retrieval Tool Separately

If you only want to get the Worker URL without starting WeiUI:

1. Double-click to run `get-worker-url.bat`
2. Follow the on-screen instructions to complete deployment
3. The deployment process will open a browser for login and authorization
4. After successful deployment, the script will extract and save the Worker URL automatically

## Method 2: Manual Deployment

If the automated scripts do not meet your needs, you can also manually deploy the Worker:

1. Make sure you have Node.js and npm installed
2. Open a command prompt and run the following commands:

```
cd cf-flux-schnell
npm install
npx wrangler deploy
```

3. During deployment, the system will automatically open a browser requesting login to your Cloudflare account and authorization
4. After login and authorization, the deployment will continue
5. Upon successful deployment, the command line will display something like:
   ```
   Deploying your application to Cloudflare's global network...
   ✨ Success! Uploaded cf-flux-schnell (2.34 sec)
   Worker URL: https://cf-flux-schnell.xxx.workers.dev
   ```
6. Copy the displayed Worker URL for use in WeiUI

## Method 3: Get URL from Cloudflare Dashboard

If your Worker has already been deployed, you can get the URL directly from the Cloudflare dashboard:

1. Visit https://dash.cloudflare.com/
2. Login to your Cloudflare account
3. Click on "Workers & Pages" in the sidebar
4. Find "cf-flux-schnell" in the Workers list
5. Copy the displayed URL (usually in the format `https://cf-flux-schnell.xxx.workers.dev`)

## Common Issues

### Q: Browser doesn't open automatically during deployment?

A: You can manually visit the URL displayed in the command line to login, or directly visit https://dash.cloudflare.com/ to login to your account.

### Q: Error "A project with this name already exists"?

A: You may have deployed this Worker before. You can resolve this by:
1. Deleting the existing Worker from the Cloudflare dashboard, then redeploying
2. Getting the URL of the existing Worker directly from the Cloudflare dashboard

### Q: Can't find the Worker URL after deployment?

A: There are several solutions:
1. Search for "Worker URL" in the deployment output log
2. Check the automatically created `saved_worker_url.txt` file
3. Login to the Cloudflare dashboard and look in the Workers & Pages section

## Getting Help

If you encounter other issues, please:

1. Check the command line output for error messages
2. View the complete deployment log for detailed information
3. Visit the Cloudflare Worker documentation: https://developers.cloudflare.com/workers/ 