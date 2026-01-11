# Playlist Transfer Frontend

[Try the mock-up here!](https://milesbb.github.io/playlist-transfer-frontend/)

![croppedwebimg](https://github.com/user-attachments/assets/f943f917-311f-4079-8a33-58412443b4c8)

This repository contains the **frontend** for the Playlist Transfer website, built using **React**, **Vite**, and **Tailwind CSS** (also using **HCaptcha** for extra security).

The project's main goal is to make it easy for people to archive and transfer their music playlists between apps/providers. Down with the walls between music providers!

This is part of a wider full-stack project, [check out the backend here](https://github.com/milesbb/playlist-transfer-backend) and [check out the python based playlist import/export service here](https://github.com/milesbb/playlist-import-export-service)!

**Currently in early infancy and under construction, come back later!**

---

## Architectural Flow Diagrams

Below are the main architectural flows that describe how the system interacts across services.

If you're trying to view these locally on VSCode and it's not rendering, use [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)

Check out the mentioned repositories here:

- [playlist-transfer-frontend](https://github.com/milesbb/playlist-transfer-frontend)
- [playlist-transfer-backend](https://github.com/milesbb/playlist-transfer-backend)
- [playlist-import-export-service](https://github.com/milesbb/playlist-import-export-service)

---

### 1. Third Party Music Service OAuth Flow (Spotify Example)

```mermaid
sequenceDiagram
    participant U as User
    participant F as playlist-transfer-frontend
    participant B as playlist-transfer-backend
    participant S as Spotify
    participant DB as Postgres DB

    U->>F: Clicks "Connect Spotify"
    F->>B: Request OAuth URL
    B->>S: Redirect to Spotify OAuth
    S-->>U: Login page
    U->>S: Authenticate + approve
    S->>B: Redirect with auth code
    B->>S: Exchange code for tokens
    S-->>B: Access + Refresh tokens
    B->>DB: Save encrypted refresh token (type=spotify)
    B-->>F: Success, spotifyAuthenticated=true
    F-->>U: UI updated (Spotify connected)
```

---

### 2. User Imports Playlist from Spotify

```mermaid
sequenceDiagram
    participant U as User
    participant F as playlist-transfer-frontend
    participant B as playlist-transfer-backend
    participant DB as Postgres DB
    participant S as Spotify
    participant Q as SQS Queue
    participant W as playlist-import-export-service

    U->>F: Choose "Import from Spotify"
    F->>B: Call /me
    B->>DB: Check refresh token
    alt Authenticated
        B-->>F: spotifyAuthenticated=true
    else Not authenticated
        B-->>F: Redirect to OAuth flow
    end

    F->>B: /playlists/list {serviceType:spotify}
    B->>DB: Load refresh token
    B->>S: Exchange for access token
    B->>S: Get user playlists
    S-->>B: Playlist list
    B-->>F: Send playlists

    U->>F: Select playlist to import
    F->>B: /playlists/import {playlistName, serviceType:spotify}
    B->>DB: Insert job row {status:queued, type:IMPORT}
    B->>Q: Send SQS event with job_id, user_id, type IMPORT

    Q->>W: Trigger Import Worker
    W->>DB: Update job status=in_progress
    W->>DB: Load refresh token
    W->>S: Get access token
    W->>S: Fetch playlist tracks
    alt Playlist empty
        W->>DB: Update job status=errored + error details
    else Has tracks
        W->>DB: For each track: check/add by ISRC<br/>or name/artist/album
        W->>DB: Insert new playlist + playlist_tracks rows
        W->>DB: Update job status=complete
    end

    F->>B: /jobs/status/:jobId
    B->>DB: Lookup job
    DB-->>B: Job status
    B-->>F: Return status
    F-->>U: Show status in UI
```

---

### 3. User Exports Playlist to Spotify

```mermaid
sequenceDiagram
    participant U as User
    participant F as playlist-transfer-frontend
    participant B as playlist-transfer-backend
    participant DB as Postgres
    participant S as Spotify
    participant Q as SQS Queue
    participant W as playlist-import-export-service

    U->>F: Choose "Export to Spotify"
    F->>B: /playlists/list {serviceType:playlistTransfer}
    B->>DB: Get user playlists
    B-->>F: Return playlists
    U->>F: Select playlist + target Spotify
    F->>B: Call /me
    B->>DB: Check refresh token
    alt Authenticated
        B-->>F: spotifyAuthenticated=true
    else Not authenticated
        B-->>F: Redirect to OAuth flow
    end

    F->>B: /playlists/export {playlistName, serviceType:spotify}
    B->>DB: Insert job {status:queued, type:EXPORT}
    B->>Q: Send SQS event {job_id, user_id, type EXPORT}

    Q->>W: Trigger Export Worker
    W->>DB: Update job status=in_progress
    W->>DB: Load refresh token
    W->>S: Get access token
    W->>S: Create new Spotify playlist
    W->>S: Add tracks in batches
    W->>DB: Update job status=complete

    F->>B: /jobs/status/:jobId
    B->>DB: Lookup job
    DB-->>B: Job status
    B-->>F: Return status
    F-->>U: Show status in UI
```

---

# Wanting to Contribute?

This is not a super serious project and still in it's early infancy. In the future, I may begin to create small 'easy first issue' issues that people can pick up to get some experience working on a project. In general though feel free to comment on anything, always down to discuss and learn!

Feel free to also hit me up/learn more at [my website 'milesbb.tech'](https://milesbb.tech) or on [LinkedIn](https://www.linkedin.com/in/milesbaileybraendgaard/)!

# License

This project is licensed under the MIT License.
