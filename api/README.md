# Contact API for Azure Static Web Apps

This folder is an Azure Functions v4 Node.js/TypeScript API for the site's contact form.

## Endpoint

`POST /api/contact`

Expected JSON:

```json
{
  "fullName": "Example User",
  "email": "user@example.com",
  "phone": "+1 555 000 0000",
  "subject": "Website Design & Development",
  "message": "Hello"
}
```

`subject` must match one of the values in `src/config/contact.ts`.

## Local setup

1. Run `npm install` inside this `api` folder.
2. Put your local values in `local.settings.json`.
3. Run `npm run build` to verify TypeScript compilation.
4. To run with Azure Functions Core Tools installed, run `npm start`.

Never commit `local.settings.json` or SMTP credentials.

## Azure Static Web Apps

Set these application settings in Azure:

- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO`

Set the Static Web Apps workflow `api_location` to `api`.

The frontend should POST to `/api/contact`.
