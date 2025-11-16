# 003 - Host on Hetzner Dedicated Server Initially

- Date: 2025-11-16

## Context

The Niyyah platform must be discreet, cost-conscious, and under tight operational control. In the early stages of the project, traffic levels are expected to be modest, and the primary priorities are:

- Keeping infrastructure simple enough to operate reliably.
- Having predictable, relatively low hosting costs.
- Maintaining control over data location and deployment configuration.

Cloud-native options (Kubernetes clusters, fully managed PaaS, or serverless platforms) provide strong scaling characteristics but introduce additional operational complexity and potentially higher or less predictable costs at low to medium scale.

Hetzner provides affordable dedicated servers in European data centers, with good performance and flexibility for self-managed deployments. A single dedicated server is expected to be sufficient for early phases of the platform.

## Decision

We will host the application on a Hetzner dedicated server until the platform needs to scale beyond the capacity or operational comfort of this setup.

Specifically:

- A Hetzner dedicated server will run the primary SvelteKit application and supporting services (such as database, reverse proxy, and monitoring) using a straightforward deployment stack (e.g., Docker/containers or systemd-based services).
- The server will be configured with appropriate security hardening (firewall, SSH access controls, regular updates) and backups.
- Infrastructure-as-code (e.g., Ansible, Terraform, or similar) may be introduced to codify server provisioning and configuration as the setup stabilizes.

## Consequences

- Hosting costs remain relatively low and predictable in the early stages, which is important for a project that may not have large-scale usage initially.
- Operational control is high: we control the OS, network configuration, and deployment strategy.
- The single-server setup is a deliberate simplicity choice; high availability and horizontal scaling are limited until we invest in more sophisticated infrastructure.
- When traffic or reliability needs outgrow a single dedicated server, we will need a follow-up ADR to describe the scaling path (for example, moving to managed databases, load-balanced application instances, or a cloud provider with autoscaling capabilities).
- Migration off a single Hetzner server later will require careful planning (data migration, cutover strategies), but this is considered an acceptable future cost given current constraints and priorities.
