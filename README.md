# Outage Map

A customer-tailorable, location-aware outage map experience for real-time and proactive outage awareness.

## 🎯 Project Overview

This repository contains the implementation of the Outage Map Website - a mobile-first web application that provides customers with:

- **One-tap launch** of outage map on mobile devices
- **Automatic location detection** and map centering
- **Real-time outage status** detection at current location  
- **Push notification opt-in** for outage updates
- **Proactive notifications** for future outages (12/24/36/48/72 hours in advance)

See the [Product Requirements Document](DOCS/PRD/PRD.md) for complete project specifications.

## 🚀 Quick Start

### Two Ways to Run

#### 1. **Standalone (No NPM Required)** ⚡

Simply open the file in your browser - no build tools needed:

```bash
# Clone and open
git clone https://github.com/TedTschopp/Outage-Map.git
cd Outage-Map
# Open index.html in your browser (double-click or use a local server)
```

Or use Python's built-in server:
```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

**Features available:**
- ✅ OpenStreetMap integration
- ✅ Geolocation and map centering
- ✅ Outage detection (mocked)
- ✅ Basic push notifications
- ✅ Mobile-responsive design

#### 2. **Enhanced Version (NPM)** 🚀

For the full-featured React application with advanced capabilities:

**Prerequisites:**
- Node.js 16+ and npm 7+
- Modern web browser with geolocation support

**Installation & Development:**

```bash
cd app
npm install
npm run dev
```

The enhanced application will be available at `http://localhost:5173/`

**Additional features:**
- ✅ React 19 with TypeScript
- ✅ Advanced state management
- ✅ Service Worker for enhanced push notifications
- ✅ Internationalization (i18n) support
- ✅ Hot module replacement (HMR)
- ✅ Optimized production builds
- ✅ Component-based architecture

For complete setup and architecture documentation, see [app/README.md](app/README.md).

## 📋 Project Structure

```
Outage-Map/
├── index.html                  # 🌟 Standalone version (no build required)
├── DOCS/
│   └── PRD/
│       └── PRD.md              # Product Requirements Document
├── app/                        # 🚀 Enhanced React version (requires NPM)
│   ├── src/
│   │   ├── adapters/          # Outage data provider abstraction
│   │   ├── components/        # React components
│   │   ├── services/          # Business logic services
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions (i18n)
│   │   └── hooks/             # Custom React hooks
│   └── README.md              # Detailed app documentation
└── README.md                   # This file
```

## 🎨 Progressive Enhancement

This project follows a **progressive enhancement** approach:

### Baseline Experience (index.html)
- Works in any modern browser
- No build tools or dependencies required
- Core functionality: map, geolocation, outage detection
- ~16KB single HTML file
- Perfect for quick deployment or testing

### Enhanced Experience (app/)
- Advanced React architecture with TypeScript
- Component-based design for maintainability
- Hot module replacement for development
- Internationalization support (EN/ES)
- Service Worker for advanced push notifications
- Optimized production builds (363KB gzipped)
- Full test coverage and linting

**Choose based on your needs:**
- **Quick demo or simple deployment?** → Use `index.html`
- **Full-featured production app?** → Use `app/` with NPM

## ✨ Key Features (MVP)

### 1. Mobile-First Map Interface
- OpenStreetMap integration via Leaflet
- Automatic geolocation with user permission
- Responsive design for all device sizes
- Touch-friendly controls (minimum 44px tap targets)

### 2. Outage Detection
- **Adapter Pattern**: Swappable outage data providers
- **Mock Provider**: Deterministic test data based on lat/lng
- **Future SCE Integration**: Placeholder for reverse-engineered endpoints from https://www.sce.com/outages-safety/outage-center/check-outage-status

### 3. Push Notifications
- Service Worker implementation
- Client-side subscription management
- localStorage for subscription storage
- Placeholder API client for backend integration
- Support for advance notice preferences

### 4. Accessibility & i18n
- WCAG 2.1 AA compliance
- ARIA labels and semantic HTML
- Keyboard navigation support
- English and Spanish language support (expandable)
- Auto-detection of browser language

## 🏗️ Architecture Highlights

### Separation of Concerns

- **Components**: UI presentation layer
- **Services**: Business logic and state management
- **Adapters**: Data provider abstraction (outage sources)
- **Hooks**: Reusable React logic (geolocation, etc.)
- **Utils**: Shared utilities (i18n, etc.)

### Outage Provider Pattern

The application uses an adapter pattern allowing easy swapping of outage data sources:

```typescript
// Current: Mock provider for development
import { MockOutageProvider } from './adapters/OutageProvider';

// Future: SCE provider for production
import { SCEOutageProvider } from './adapters/OutageProvider';
```

See [app/README.md](app/README.md) for detailed architecture documentation.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## ✅ MVP Acceptance Criteria

- ✅ `npm install` and `npm run dev` starts the app
- ✅ On load, app prompts for location and centers map
- ✅ UI renders marker at user's location
- ✅ UI indicates outage status based on mocked provider
- ✅ User can enable push notifications
- ✅ Subscription status is visible in UI
- ✅ Code organized with clear separation (UI vs services vs adapters)
- ✅ Mobile-first responsive design
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ i18n scaffolding for multiple languages

## 🚧 Future Work

### Phase 1: Data Integration
- [ ] Reverse-engineer SCE outage API endpoints
- [ ] Implement SCEOutageProvider with real data
- [ ] Add error handling and retry logic
- [ ] Implement caching for outage data

### Phase 2: Backend Services
- [ ] Build push notification backend API
- [ ] Implement OAuth for user authentication
- [ ] Store subscriptions server-side
- [ ] Add analytics and monitoring

### Phase 3: Advanced Features
- [ ] Multiple location monitoring
- [ ] Historical outage data
- [ ] PWA manifest for app installation
- [ ] Offline map tile caching
- [ ] Real-time WebSocket updates

See [DOCS/PRD/PRD.md](DOCS/PRD/PRD.md) for complete feature roadmap.

## 🔐 Security & Compliance

- **CCPA Compliance**: Privacy controls for customer data
- **Rate Limiting**: Future backend will prevent abuse
- **No Data Persistence**: Outage data not stored locally (per DG-001)
- **HTTPS Required**: Service workers require secure context
- **Location Privacy**: Geolocation used only client-side

## 📚 Documentation

- [Product Requirements Document](DOCS/PRD/PRD.md) - Complete project specifications
- [Application README](app/README.md) - Detailed technical documentation
- [Outage Provider Guide](app/README.md#outage-provider-abstraction) - How to swap data providers
- [Push Notification Guide](app/README.md#web-push-notification-scaffolding) - Backend integration steps
- [i18n Guide](app/README.md#internationalization-i18n) - Adding new languages

## 🤝 Contributing

[Add contribution guidelines]

## 📄 License

[Add license information]

## 👥 Team & Stakeholders

- **Product Owner**: Grant Littman
- **Executive Sponsor**: Chief Customer Officer (CCO)
- **Development**: [Add team information]

For questions or support, please contact the project team.

