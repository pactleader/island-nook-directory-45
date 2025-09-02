import { useUserPreferences } from '@/hooks/useUserPreferences';

const PreferencesDemo = () => {
  const { preferences } = useUserPreferences();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Current User Preferences</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Language:</span>
          <span className="font-medium">{preferences.language}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Island:</span>
          <span className="font-medium">{preferences.island}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Visitor Type:</span>
          <span className="font-medium">{preferences.visitorType}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        These preferences are automatically saved to cookies and can be used throughout the app to customize the user experience.
      </p>
    </div>
  );
};

export default PreferencesDemo;
