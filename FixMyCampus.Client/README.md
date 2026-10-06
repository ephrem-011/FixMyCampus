# FixMyCampus Client

Angular frontend for the FixMyCampus campus facilities and maintenance platform. The app lets users report issues, track work orders, and manage ticket assignments across different roles.

## Overview

This frontend is built with Angular 22 and provides a role-based portal for:

- Reporter: login/register, submit issues, view their tickets, campus feed
- Technician: dashboard, assigned work, monitoring status, resolve tickets
- Admin: dashboard, ticket queue, technician assignment, maintenance management

## Tech stack

- Angular 22
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
- Vitest for unit tests

## Project structure

```text
FixMyCampus.Client/
├── src/
│   ├── app/
│   │   ├── core/              # auth, guards, models
│   │   ├── features/          # auth, reporter, technician, admin, tickets
│   │   └── shared/            # reusable UI components
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── proxy.conf.json
├── tsconfig.json
└── README.md
```

## Features

- Authentication with login/register flows
- Role-based route guards
- Ticket creation and detail views
- Campus-wide ticket feed
- Technician assignment workflow
- Status tracking and updates
- Building and maintenance-related ticket data

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the app in development mode:

```bash
npm start
```

The app runs locally at:

```text
http://localhost:4200/
```

3. If the backend is running separately, the Angular app proxies `/api` requests to:

```text
http://localhost:5143
```

This is configured in `proxy.conf.json`.

## Available scripts

```bash
npm start       # ng serve
npm run build   # production build
npm run watch   # watch-mode build
npm test        # run unit tests


## Notes

- The app uses localStorage-based session persistence for auth data.
- Routes are protected by `AuthGuard` and `RoleGuard` based on user role.
- This frontend expects the backend API to expose ticket and auth endpoints under `/api`.

## License

This project is intended for internal campus operations use and is not published as a standalone product package.
```
