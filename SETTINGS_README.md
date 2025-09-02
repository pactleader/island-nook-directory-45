# Settings Modal & User Preferences System

## Overview
This system provides a comprehensive user preferences modal that allows users to set their language, island preference, and visitor type. All preferences are automatically saved to cookies and can be accessed throughout the application.

## Features

### 🎯 **Settings Modal**
- **Language Preference**: English, Korean, Japanese, Chinese
- **Island Preference**: All Islands, Saipan, Tinian, Rota
- **Visitor Type**: Visitor, Local
- **Auto-save**: Preferences are saved immediately when changed
- **Cookie Storage**: All preferences stored for 365 days

### 🔧 **Navigation Integration**
- **Desktop**: Settings icon (gear) appears before login/signup buttons
- **Mobile**: Settings icon in mobile menu header + dedicated settings button
- **Accessibility**: Hover effects and proper ARIA labels

### 💾 **Data Persistence**
- **Cookies**: All preferences stored in browser cookies
- **Duration**: 365 days expiration
- **Automatic**: No manual save required (auto-saves on change)

## Components

### 1. SettingsModal (`src/components/SettingsModal.tsx`)
The main modal component that displays and manages user preferences.

**Props:**
```typescript
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Radio button selection for each preference type
- Real-time preference updates
- Auto-save functionality
- Responsive design

### 2. useUserPreferences Hook (`src/hooks/useUserPreferences.ts`)
Custom React hook for accessing and managing user preferences throughout the app.

**Usage:**
```typescript
import { useUserPreferences } from '@/hooks/useUserPreferences';

const MyComponent = () => {
  const { preferences, updatePreference, savePreferences } = useUserPreferences();
  
  // Access current preferences
  console.log(preferences.language); // "English"
  console.log(preferences.island); // "Saipan"
  console.log(preferences.visitorType); // "Visitor"
  
  // Update a single preference
  updatePreference('language', 'Korean');
  
  // Save multiple preferences at once
  savePreferences({
    language: 'Japanese',
    island: 'Tinian',
    visitorType: 'Local'
  });
};
```

**Return Values:**
- `preferences`: Current user preferences object
- `loadPreferences()`: Reload preferences from cookies
- `savePreferences(prefs)`: Save new preferences
- `updatePreference(type, value)`: Update single preference

### 3. PreferencesDemo (`src/components/PreferencesDemo.tsx`)
Example component showing how to display current preferences.

## Implementation Details

### Cookie Storage
Preferences are stored in the following cookies:
- `userLanguage`: Language preference
- `userIsland`: Island preference  
- `userVisitorType`: Visitor type preference

### State Management
- **Local State**: Modal maintains local state for unsaved changes
- **Global State**: Hook provides app-wide access to saved preferences
- **Auto-sync**: Changes are immediately reflected across all components

### Styling
- **Design**: Matches the provided image with blue accent colors
- **Responsive**: Works on both desktop and mobile
- **Accessibility**: Proper focus states and keyboard navigation

## Usage Examples

### Basic Preference Access
```typescript
const { preferences } = useUserPreferences();

// Conditional rendering based on preferences
if (preferences.language === 'Korean') {
  return <KoreanContent />;
}

// Island-specific content
if (preferences.island === 'Saipan') {
  return <SaipanSpecificContent />;
}

// Visitor type customization
if (preferences.visitorType === 'Local') {
  return <LocalUserContent />;
}
```

### Dynamic Content Loading
```typescript
const { preferences } = useUserPreferences();

useEffect(() => {
  // Load content based on user preferences
  loadLocalizedContent(preferences.language);
  loadIslandSpecificData(preferences.island);
  customizeForVisitorType(preferences.visitorType);
}, [preferences]);
```

### Form Pre-filling
```typescript
const { preferences } = useUserPreferences();

const [formData, setFormData] = useState({
  language: preferences.language,
  island: preferences.island,
  visitorType: preferences.visitorType
});
```

## Future Enhancements

### Potential Additions
- **Theme Preferences**: Light/dark mode
- **Notification Settings**: Email, push, SMS preferences
- **Content Filters**: Age-appropriate content, content categories
- **Accessibility**: Font size, contrast, screen reader preferences

### Integration Opportunities
- **Backend Sync**: Save preferences to user account
- **Analytics**: Track preference changes for UX improvements
- **A/B Testing**: Test different default preferences
- **Localization**: Dynamic language switching without page reload

## Troubleshooting

### Common Issues
1. **Preferences not saving**: Check if cookies are enabled
2. **Modal not opening**: Verify SettingsModal is properly imported
3. **Hook not working**: Ensure useUserPreferences is called within React component

### Debug Mode
Add this to any component to debug preferences:
```typescript
const { preferences } = useUserPreferences();
console.log('Current preferences:', preferences);
```

## Browser Support
- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Cookie Support**: Required for preference storage
- **JavaScript**: ES6+ features used throughout

---

**Note**: This system is designed to be lightweight and performant, with preferences loaded only when needed and cached appropriately for optimal user experience.
