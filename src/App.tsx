import { AppProvider } from '@/contexts/AppContext';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { LibraryPage } from '@/components/LibraryPage';
import { NewReleasesPage } from '@/components/NewReleasesPage';
import { YouTubersPage } from '@/components/YouTubersPage';
import { SettingsPage } from '@/components/SettingsPage';

function AppContent() {
  const { settings, activeSection } = useApp();

  return (
    <div
      className={`theme-${settings.theme} h-screen w-screen overflow-hidden`}
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'var(--font-body)' }}
    >
      <Layout>
        {activeSection === 'library' && <LibraryPage />}
        {activeSection === 'releases' && <NewReleasesPage />}
        {activeSection === 'youtubers' && <YouTubersPage />}
        {activeSection === 'settings' && <SettingsPage />}
      </Layout>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
