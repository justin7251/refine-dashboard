# Property Agent

Welcome to the Property Agent project! This application is designed to facilitate the management of properties, allowing agents to list, update, and track properties efficiently. Built with a modern tech stack, this project aims to provide a seamless experience for real estate agents and clients.

## Features

- **Property Management**: Agents can create, update, and delete property listings.
- **User Authentication**: Secure login and registration system for agents and clients.
- **Interactive Charts**: Visual representations of property data using dynamic charts.
- **Responsive Design**: Optimized for various devices, ensuring a smooth user experience.
- **Real-time Updates**: Changes in property listings are updated in real-time across the platform.

## Getting Started

To get a local copy up and running using Docker, follow these simple steps.

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/property-agent.git
   ```
2. Navigate to the project directory:
   ```bash
   cd property-agent
   ```
3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

Now, the application should be running on `http://localhost:3000` for the client and `http://localhost:8080` for the server.

## Available Scripts

In the project directory, you can run:

- `docker-compose up`: Builds, (re)creates, starts, and attaches to containers for a service.
- `docker-compose down`: Stops containers and removes containers, networks, volumes, and images created by `up`.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - Document-based database.
- [MUI](https://mui.com/) - React UI framework for faster and easier web development.
- [Docker](https://www.docker.com/) - A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## License

Distributed under the MIT License. See `LICENSE` for more information.