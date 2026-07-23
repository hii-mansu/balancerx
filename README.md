<div align="center">

# ⚡ BalancerX

**A lightweight, HTTP load balancer built from scratch with Node.js**

[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/)

*Distribute traffic. Zero dependencies on Express or any framework.*

---

</div>

## 🧑‍💻 About the Creator

Built by **Himanshu Singh** ([@hii-mansu](https://github.com/hii-mansu)) as a systems-level engineering project to deeply understand how load balancers work under the hood — no frameworks, no shortcuts, just raw Node.js.

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
| 🐳 **Docker Ready** | Pull the image and run with a single command |
| 🪶 **Zero Framework** | Built entirely on Node.js native `http` module — no Express, no Fastify |

## 🛠️ Tech Stack

- **Runtime**: Node.js (v22+)
- **HTTP**: Native `node:http` module (no frameworks)
- **Config**: YAML
- **Containerization**: Docker
- **Language**: JavaScript

## 📁 Project Structure

```
balancerx/
├── app/            → Clone-ready source code for users
├── package/        → Full project (source, tests, Docker, configs)
└── website/        → React.js marketing page & documentation (coming soon)
```

| Folder | Who is it for? | What's inside? |
|---|---|---|
| **`/app`** | Users who want to **clone and run** the load balancer for their own servers | Source code + example configs + setup guide |
| **`/package`** | Developers and contributors | Complete project with tests, Docker setup, and development files |
| **`/website`** | Everyone | Frontend landing page, documentation, and usage guides |

## 🚀 Quick Start

### Option 1 — Clone & Run

Head to the `/app` directory for the complete setup guide.

```bash
git clone https://github.com/hii-mansu/balancerx.git
cd balancerx/app
```

📖 Follow the step-by-step instructions in [`app/README.md`](./app/README.md)

### Option 2 — Docker

```bash
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -v ./config.yaml:/app/config.yaml \
  hii-mansu/balancerx
```

## 🔧 How It Works

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
        └──────────┘     └──────────┘     └──────────┘
```

---

<div align="center">

**Built with ❤️ by [Himanshu Singh](https://github.com/hii-mansu)**

</div>
