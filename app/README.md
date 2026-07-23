# BalancerX — Setup Guide

This guide will help you set up and run BalancerX on your own machine.

## Prerequisites

- Node.js v22 or higher

## 1. Clone the Repository

```bash
git clone https://github.com/hii-mansu/balancerx.git
cd balancerx/app
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Open `.env` and set the port you want BalancerX to run on:

```env
PORT=5000
```

## 4. Configure Backend Targets

Create a `config.yaml` file from the example:

```bash
cp config.yaml.example config.yaml
```

Open `config.yaml` and configure it according to your servers:

```yaml
algorithm: round-robin

targets:
  - http://localhost:5001
  - http://localhost:5002
  - http://localhost:5003

healthCheck:
  interval: 5000
  timeout: 5000
```

### Configuration Options

| Field | Description | Values |
|---|---|---|
| `algorithm` | Load balancing strategy | `round-robin` or `least-connections` |
| `targets` | List of your backend server URLs | Valid HTTP URLs |
| `healthCheck.interval` | How often to check server health (ms) | Default: `5000` |
| `healthCheck.timeout` | Max wait time for health response (ms) | Default: `5000` |

### Algorithms Explained

| Algorithm | Best For |
|---|---|
| **round-robin** | Servers with equal capacity — distributes requests evenly in order |
| **least-connections** | Servers with varying load — sends requests to the server handling the lowest active connections |

## 5. Start BalancerX

```bash
npm run dev
```

You should see:

```
BalancerX running on PORT 5000
[Health] http://localhost:5001 -> Healthy
[Health] http://localhost:5002 -> Healthy
```

Now all traffic to `http://localhost:5000` will be distributed across your backend servers.

## Health Check Behavior

- BalancerX pings each target's `/health` endpoint at the configured interval
- **Healthy** servers receive traffic
- **Unhealthy** servers are automatically removed from the pool
- When an unhealthy server comes back up, it's automatically added back

## Example

If you have two Express/Node servers running on ports 5001 and 5002:

```
Client Request → http://localhost:5000
                        │
              BalancerX (Load Balancer)
                        │
           ┌────────────┴────────────┐
           ▼                         ▼
   http://localhost:5001     http://localhost:5002
      (Server 1)                (Server 2)
```

## Stopping BalancerX

Press `Ctrl + C` in the terminal. BalancerX will gracefully wait for all active requests to finish before shutting down.
