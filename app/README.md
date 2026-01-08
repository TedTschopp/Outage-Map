# Outage Map - MVP Application

A mobile-first web application for real-time outage awareness and notification management.

## 🎯 Overview

The Outage Map is a customer-facing web application that provides:
- **Location-aware outage detection**: Automatically centers on user location and checks for outages
- **Real-time status updates**: Clear visual indicators for outage vs. no-outage states
- **Push notification support**: Opt-in for proactive outage alerts
- **Mobile-first design**: Optimized for iOS, Android, and Web with responsive layout
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and focus states
- **Internationalization**: Ready for multiple languages (English and Spanish scaffolding included)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 7+
- Modern web browser with geolocation support

### Installation

```bash
cd app
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

The built files will be in the `app/dist` directory.

### Testing

Run linting:

```bash
npm run lint
```

Run tests (basic smoke test):

```bash
npm run test
```

## 📁 Project Structure

```
app/
├── public/
│   └── service-worker.js       # Service worker for push notifications
├── src/
│   ├── adapters/
│   │   └── OutageProvider.ts   # Outage data provider abstraction
│   ├── components/
│   │   ├── MapComponent.tsx    # OpenStreetMap display component
│   │   ├── OutageStatusDisplay.tsx  # Outage status UI
│   │   ├── NotificationControl.tsx  # Push notification controls
│   │   └── *.css               # Component styles
│   ├── hooks/
│   │   └── useGeolocation.ts   # Custom hook for geolocation
│   ├── services/
│   │   ├── outageService.ts    # Outage data service layer
│   │   └── pushNotificationService.ts  # Push notification service
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── i18n.ts             # Internationalization utilities
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Main application styles
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build configuration
```

## 🏗️ Architecture

### Outage Provider Abstraction

The application uses an adapter pattern for outage data providers, making it easy to swap implementations:

#### Current Implementation: MockOutageProvider

Located in `src/adapters/OutageProvider.ts`, the `MockOutageProvider` class provides deterministic test data:

- **Mock Logic**: Simulates an outage for coordinates in the Los Angeles area (lat: 33.0-34.0, lng: -118.5--117.5)
- **Data Structure**: Returns `OutageStatus` with outage details or no-outage status

#### Future Implementation: SCEOutageProvider

The `SCEOutageProvider` class is a placeholder for integration with Southern California Edison's outage data:

**TODO**: Implement reverse-engineered integration with:
- Source: `https://www.sce.com/outages-safety/outage-center/check-outage-status`
- Steps:
  1. Capture network requests from SCE website
  2. Identify authentication/rate limiting requirements
  3. Implement endpoint calls with proper error handling
  4. Parse response data to match `OutageStatus` interface
  5. Add retry logic and caching

#### Swapping Providers

To use a different provider, modify `src/services/outageService.ts`:

```typescript
import { SCEOutageProvider } from '../adapters/OutageProvider';

// Change this line:
this.provider = provider || new SCEOutageProvider();
```

### Web Push Notification Scaffolding

The application includes a complete client-side push notification system:

#### Components

1. **Service Worker** (`public/service-worker.js`)
   - Handles push events
   - Displays notifications
   - Manages notification clicks

2. **Push Notification Service** (`src/services/pushNotificationService.ts`)
   - Manages subscription lifecycle
   - Stores subscriptions locally (localStorage)
   - Provides placeholder for backend integration

#### Current Storage

Push subscriptions are currently stored in **localStorage** with these keys:
- `outage_map_push_subscription`: Subscription data (endpoint, keys)
- `outage_map_notification_preferences`: User preferences (location, advance notice hours)

#### Backend Integration (TODO)

To integrate with a backend API:

1. **Implement the placeholder method** in `src/services/pushNotificationService.ts`:

```typescript
private async sendSubscriptionToBackend(subscription: PushSubscriptionData): Promise<void> {
  await fetch('YOUR_API_ENDPOINT/push/subscribe', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN' // TODO: Implement OAuth
    },
    body: JSON.stringify(subscription),
  });
}
```

2. **Update VAPID keys**: Replace the placeholder VAPID public key in `pushNotificationService.ts` with your actual key

3. **Add OAuth/Authentication**: Implement user identity management to tie subscriptions to specific users

#### Notification Flow

1. User clicks "Enable Notifications"
2. Browser requests notification permission
3. Service worker subscribes to push manager
4. Subscription data captured and stored locally
5. (Future) Subscription sent to backend API
6. User preferences saved (advance notice hours, location)

### Internationalization (i18n)

The i18n system is located in `src/utils/i18n.ts`:

#### Current Languages

- **English (en)**: Complete translations
- **Spanish (es)**: Partial translations (can be expanded)

#### Auto-detection

The app automatically detects the browser's language setting and uses the appropriate translation dictionary.

#### Adding Translations

To add a new language:

1. Add the language code to the `Language` type
2. Add translations to the `translations` object
3. Update the detection logic if needed

Example:

```typescript
type Language = 'en' | 'es' | 'fr'; // Add French

const translations: Record<Language, Translations> = {
  en: { /* ... */ },
  es: { /* ... */ },
  fr: {
    'app.title': 'Carte des Pannes',
    // ... more translations
  }
};
```

#### Using in Components

```typescript
import { useTranslation } from '../utils/i18n';

const { t } = useTranslation();
return <h1>{t('app.title')}</h1>;
```

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliance**: Proper contrast ratios, focus states, and semantic HTML
- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support for all features
- **Screen Reader Support**: Proper role attributes and live regions for dynamic content
- **Touch-Friendly**: Minimum 44px tap targets for mobile devices
- **Reduced Motion**: Respects user's motion preferences

## 🌍 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 📋 Acceptance Criteria Status

- ✅ `npm install` and `npm run dev` starts the app
- ✅ App prompts for location permission on load
- ✅ Map centers on user's location and renders a marker
- ✅ UI indicates outage status based on mocked provider
- ✅ User can enable push notifications
- ✅ Subscription status is visible in UI
- ✅ Clear separation of concerns (UI, services, adapters)
- ✅ Mobile-first responsive design
- ✅ WCAG AA accessibility compliance
- ✅ i18n scaffolding ready for expansion

## 🔐 Security Considerations

- **Location Privacy**: Location data is only used client-side for outage checks
- **No Data Persistence**: No outage data is stored locally (per DG-001 requirement)
- **HTTPS Required**: Service workers require HTTPS in production
- **VAPID Keys**: Push notification keys should be rotated regularly
- **Rate Limiting**: Future backend should implement rate limiting to prevent abuse

## 🚧 Future Enhancements

1. **SCE Integration**: Implement reverse-engineered outage data provider
2. **Backend API**: Build server-side push notification management
3. **OAuth Integration**: Add user authentication for personalized subscriptions
4. **Advanced Notifications**: Implement 12/24/36/48/72-hour advance notice
5. **Analytics**: Track user engagement and outage patterns
6. **PWA**: Add manifest for progressive web app capabilities
7. **Offline Support**: Cache map tiles for offline viewing
8. **Multi-location**: Allow users to save multiple locations
9. **Historical Data**: Show past outage information
10. **Real-time Updates**: WebSocket integration for live outage status

## 📄 License

[Add license information]

## 👥 Contributing

[Add contribution guidelines]

## 📞 Support

For questions or issues, please refer to the [Product Requirements Document](../DOCS/PRD/PRD.md).
