# 008 - Mailpit for Local Email Testing

- Date: 2025-12-25

## Context

The Niyyah platform uses email-based authentication (magic links) for secure, passwordless login across multiple applications. During local development, sending real emails is impractical and creates friction:

- Developers would need to configure real SMTP credentials
- Email delivery delays would slow down development and testing
- Testing multiple email scenarios would require managing multiple real inboxes
- Automated E2E tests cannot easily verify email content without external services

## Decision

We will use **Mailpit** as a local email testing tool for development environments:

### Mailpit Configuration

- **Service**: [Mailpit](https://github.com/axllent/mailpit) (axllent/mailpit Docker image)
- **SMTP Server**: Port 1025 (for applications to send emails)
- **Web UI**: Port 9025 (for developers to view emails)
  - Port 9025 is chosen outside the reserved application port ranges (8010-8059)
- **Docker Compose**: Mailpit will be added as a service in the root `docker-compose.yml`

### Integration Pattern

Applications will:

1. Connect to Mailpit's SMTP server (`localhost:1025`) in development mode
2. Send emails normally using SMTP (no code changes needed between dev/production)
3. Developers view sent emails via Mailpit's web UI at `http://localhost:9025`
4. E2E tests can fetch emails via Mailpit's REST API for verification

### Configuration

```yaml
mailpit:
  image: axllent/mailpit
  restart: always
  ports:
    - 9025:8025 # Web UI (remapped from 8025 to 9025)
    - 1025:1025 # SMTP server
  environment:
    MP_SMTP_AUTH_ACCEPT_ANY: 1
    MP_SMTP_AUTH_ALLOW_INSECURE: 1
```

Environment variables:

- `SMTP_HOST=localhost` (development only)
- `SMTP_PORT=1025` (development only)
- `SMTP_FROM=noreply@niyyah.se` (shared across all apps)

## Consequences

### Positive

- **Fast Development**: Emails appear instantly in Mailpit without network delays
- **Easy Debugging**: Developers can view email content, headers, and HTML rendering in the web UI
- **E2E Testing**: Automated tests can verify email content via Mailpit's API
- **No External Dependencies**: Works completely offline without SMTP credentials
- **Realistic Testing**: Emails are sent via real SMTP, so the code path matches production
- **Multi-Application Support**: All applications can share the same Mailpit instance
- **Clean Port Allocation**: Uses port 9025, outside the reserved application ranges (8010-8059)

### Negative

- **Development-Only**: Mailpit is not suitable for production (emails are stored in memory)
  - _Mitigation_: Applications must use environment-based configuration to switch between Mailpit (dev) and real SMTP (production)
- **Email Persistence**: Emails are lost when Mailpit container restarts
  - _Mitigation_: Not a concern for development; developers can restart the container to clear test emails

### Neutral

- **Docker Dependency**: Developers must run Mailpit via Docker Compose
- **Web UI**: Extra browser tab needed to view emails during development
- **API Integration**: E2E tests need to integrate with Mailpit's REST API
