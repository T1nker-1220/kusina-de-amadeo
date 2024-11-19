# Facebook Authentication Setup Guide

## Step 1: Facebook Developer Console

1. Go to [Facebook Developers Console](https://developers.facebook.com)
2. Select your app (or create a new one if you haven't already)
3. Go to Settings > Basic

## Step 2: Configure App Domains

Add the following domains under "App Domains":
- `localhost`
- `<your-project-id>.firebaseapp.com`

## Step 3: Configure OAuth Settings

1. Go to Facebook Login > Settings
2. Under "Valid OAuth Redirect URIs", add:
   - `http://localhost:3000/auth/callback`
   - `https://<your-project-id>.firebaseapp.com/__/auth/handler`
3. Make sure "Client OAuth Login" is ON
4. Make sure "Web OAuth Login" is ON

## Step 4: Save Changes

1. Click "Save Changes" at the bottom of the page
2. Wait a few minutes for the changes to propagate

## Step 5: Testing

1. Clear your browser cache
2. Try logging in with Facebook again
3. If you still encounter issues:
   - Check that your Facebook App ID and Secret are correctly set in your Firebase Console
   - Verify that Facebook Authentication is enabled in your Firebase Console
   - Make sure you're using the correct Facebook App ID in your application

## Common Issues

1. "URL Blocked" Error:
   - This means your redirect URI isn't properly whitelisted
   - Double-check all URLs in the OAuth settings
   - Make sure there are no typos
   - Ensure all domains are added to App Domains

2. "App Not Set Up" Error:
   - Your app might be in development mode
   - Add test users or make the app public

3. "Domain Not Allowed" Error:
   - Add your domain to both App Domains and Valid OAuth Redirect URIs
   - Wait a few minutes for changes to take effect

## Security Notes

- Keep your Facebook App Secret secure
- Don't commit sensitive credentials to version control
- Use environment variables for sensitive information
- Regularly review your app's security settings

## Additional Resources

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Firebase Facebook Auth Guide](https://firebase.google.com/docs/auth/web/facebook-login)
