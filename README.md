<div align="center">

# ⚡ BalancerX

**A lightweight, high-performance HTTP load balancer built from scratch with Node.js**

[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/mansu217/balancerx)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

*Distribute traffic. Maximize uptime. Zero dependencies on Express or any framework.*

---

</div>

## 🧑‍💻 About the Creator

Built by **Himanshu Singh** as a systems-level engineering project to deeply understand how HTTP load balancers work under the hood — no frameworks, no shortcuts, just raw Node.js.

- **GitHub**: [@hii-mansu](https://github.com/hii-mansu)
- **LinkedIn**: [mansu-singh](https://www.linkedin.com/in/mansu-singh/)
- **Email**: [mail@mansusingh.in](mailto:mail@mansusingh.in)

## 🤔 What Problem Does It Solve?

When you run multiple instances of your backend server, you need a way to distribute incoming requests evenly across them. Without a load balancer:

- ❌ A single server gets overwhelmed while others sit idle
- ❌ If one server crashes, all traffic is lost
- ❌ You can't scale horizontally

**BalancerX** sits in front of your backend servers and intelligently routes every incoming request to the healthiest, least-busy server — automatically.

## ✨ Features

| Feature | Description |
|---|---|
| 🔄 **Round Robin** | Distributes requests evenly in a circular order |
| 📉 **Least Connections** | Routes traffic to the server handling the fewest active requests |
| 💓 **Health Checks** | Periodically pings backend servers and removes unhealthy ones from the pool |
| 🔁 **Auto Retry** | Automatically retries safe requests (GET, HEAD, OPTIONS) on the next server if one fails |
| 🛑 **Graceful Shutdown** | Waits for active requests to finish before shutting down |
| 📊 **Request Logging** | Logs every request with method, path, target, status code, and response time |
| ⚙️ **YAML Config** | Simple, human-readable configuration via `config.yaml` |
| 🐳 **Docker Ready** | Pull the image from Docker Hub (`mansu217/balancerx`) and run with a single command |
| 🪶 **Zero Framework** | Built entirely on Node.js native `http` module — no Express, no Fastify |

## 🛠️ Tech Stack

- **Runtime**: Node.js (v22+)
- **HTTP Engine**: Native `node:http` module (no frameworks)
- **Configuration**: YAML (`config.yaml`)
- **Containerization**: Docker (`mansu217/balancerx`)
- **Frontend & Web Docs**: React.js, Tailwind CSS, Vite

## 📁 Project Structure

```
balancerx/
├── app/            → Clone-ready standalone source code for users
├── package/        → Full project (source, tests, Dockerfile, configs)
└── website/        → React.js landing page & documentation UI
```

| Folder | Who is it for? | What's inside? |
|---|---|---|
| **`/app`** | Users who want to **clone and run** the load balancer | Standalone source code + example configs + setup guide |
| **`/package`** | Developers and contributors | Complete project with tests, Docker setup, and dev files |
| **`/website`** | Everyone | React landing page, live simulator, and docs |

## 🚀 Quick Start Guide

### Option 1 — Git Clone (/app)

```bash
# 1. Clone repository
git clone https://github.com/hii-mansu/balancerx.git
cd balancerx/app

# 2. Install dependencies
npm install

# 3. Create .env and config.yaml files
cp .env.example .env
cp config.yaml.example config.yaml

# 4. Start BalancerX
npm run dev
```

📖 Follow the full step-by-step guide in [`app/README.md`](./app/README.md)

---

### Option 2 — Docker CLI

```bash
# 1. Create a config.yaml file locally
# 2. Run the container with volume mount:
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -v ./config.yaml:/app/config.yaml \
  mansu217/balancerx
```

---

### Option 3 — Docker Compose

```yaml
version: '3.8'

services:
  balancerx:
    image: mansu217/balancerx
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    volumes:
      - ./config.yaml:/app/config.yaml
    restart: always
```

```bash
docker compose up -d
```

## 🔧 Architecture & Request Flow

```
                         ┌──────────────┐
                         │   Client     │
                         └──────┬───────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │    BalancerX        │
                     │   (Load Balancer)   │
                     │                     │
                     │  ┌───────────────┐  │
                     │  │  Algorithm    │  │
                     │  │  Selection    │  │
                     │  └───────┬───────┘  │
                     │          │          │
                     │  ┌───────┴───────┐  │
                     │  │ Health Check  │  │
                     │  └───────┬───────┘  │
                     └──────────┼──────────┘
                                │
               ┌────────────────┼────────────────┐
               ▼                ▼                ▼
        ┌──────────┐     ┌──────────┐     ┌──────────┐
        │ Server 1 │     │ Server 2 │     │ Server 3 │
        └──────────└     └──────────┘     └──────────┘
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Himanshu Singh](https://github.com/hii-mansu)**

</div>
