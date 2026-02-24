# Notes

A high-performance, self-hosted personal note-taking application. Built for speed, deep customization, and a "minimalist-power" workflow.

## Tech Stack

### Frontend

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **State Management:** [Apollo Client](https://www.apollographql.com/docs/react/)
- **Rich Text Editor:** [BlockNote](https://www.blocknotejs.org/) (Shadcn/UI integration)
- **Icons:** [Hugeicons](https://hugeicons.com/) (React & Core Free)

### Backend

- **Core:** [Spring Boot 4](https://spring.io/projects/spring-boot) (Kotlin)
- **GraphQL Engine:** [Netflix DGS Framework](https://netflix.github.io/dgs/)
- **Processing:** [FFmpeg](https://ffmpeg.org/) (Server-side video-to-GIF conversion)
- **Reverse Proxy:** [Caddy](https://caddyserver.com/) (Tailscale SSL)

## Specialized Features

- **Dynamic Banners:** Supports high-res image uploads and external URL links.
- **Video Banners (FFmpeg):** Integrated server-side processing that converts video uploads into optimized GIFs for
  low-latency, animated note banners.
- **Secure "Locked" Layer:** A dedicated password-protected state for sensitive notes. Includes a custom GraphQL access
  layer and session-based Command Menu for secure browsing.
- **Priority Pins:** Pin critical notes to the top of your sidebar with instant Apollo state synchronization.
- **Emoji-First Identity:** Every note uses a customizable emoji as its primary icon, reflected instantly across the
  search menu and sidebar.
- **Unified Command Palette:** Search notes, manage the trash, or access locked content through a centralized `cmdk`
  interface.
- **Smart Tagging:** Multi-select tagging system with real-time backend synchronization and quick-remove actions.
- **Advanced Cache Sync:** Uses `optimisticResponse` and `refetchQueries` to ensure the Sidebar updates instantly
  without requiring manual page refreshes.

# Home Screen

## Dark

![Home Screen](/screenshots/home.jpeg)

## Light

![Home Screen](/screenshots/home_light_mode.jpeg)

# Sidebar

## Desktop

![Sidebar](/screenshots/sidebar_desktop.jpeg)

## Mobile

![Sidebar](/screenshots/sidebar_mobile.jpeg)

# Notes

## Desktop

![Notes](/screenshots/note_desktop_1.jpeg)
![Notes](/screenshots/note_desktop_2.jpeg)

## Mobile

![Notes](/screenshots/note_mobile_1.jpeg)
