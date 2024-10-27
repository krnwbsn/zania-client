# Zania Client - Frontend

## Overview

This project is a client-side application built with **React** and styled using **Chakra UI**. It features drag-and-drop functionality and interacts with an API for updating data. The application fetches data from the API and periodically syncs any changes, such as dragging items to reorder them or clicking on images.

## Features

- **Drag-and-Drop Reordering**: Users can drag and reorder items, and the new order is sent to the API after 5 seconds if changes are detected.
- **Image Click Action**: Clicking on an image shows a larger version of the image in a modal.
- **Auto Fetch & Update**: The system periodically syncs data changes with the API every 5 seconds if changes have been made.

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Chakra UI**: Simple and modular component library for React
- **React Query**: Data-fetching library for React to manage server state
- **Bun**: A fast all-in-one toolkit for JavaScript & TypeScript apps

## Installation

To get the project up and running locally:

1. Clone the repository:

```bash
git clone https://github.com/krnwbsn/zania-client.git
cd zania-client
```

2. Install the dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun --bun run dev
```

By default, the application will run on `http://localhost:5173`.

## API Integration

The application interacts with an API to fetch and update the sequence of items:

- The **data-management API** is used to retrieve and update the sequence of documents.
- API endpoints are dynamically handled using `axios`.

### Example API Call

The application sends a `PUT` request to update the sequence of items after a drag-and-drop action:

```bash
PUT {API_URL}/v1/data-management/update-sequence
Content-Type: application/json

{
  "sequence": [
    { "id": 1, "sequence": 3 },
    { "id": 2, "sequence": 2 },
    { "id": 3, "sequence": 1 },
    { "id": 4, "sequence": 0 },
    { "id": 5, "sequence": 4 }
  ]
}
```

## Architectural Decisions

The architecture of this project is designed with simplicity and reusability in mind. The core aspects include:

- **React Query for Data Fetching**: React Query is used for efficient data fetching and caching. This allows for better handling of server state, particularly in scenarios where data needs to be kept fresh.
- **Axios for API Requests**: Axios is used to handle HTTP requests, with a custom instance for easier configuration and error handling.
- **Chakra UI for Styling**: Chakra UI was chosen for its simplicity and flexibility, allowing for easy creation of reusable components with minimal CSS.
- **Auto-Sync on User Actions**: Any changes made by the user (such as drag-and-drop) are automatically synced to the server after 5 seconds if changes are detected. This ensures that data consistency is maintained without requiring manual saves.

## BACKEND REPOSITORY

The backend code for this project is also available:

Backend Repository: https://github.com/krnwbsn/zania-api
Deployed Backend API: https://zania-api-production.up.railway.app
The backend is deployed using Railway and is responsible for handling the data management API.

## License

This project is licensed under the MIT License.
