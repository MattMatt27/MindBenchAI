import { useState } from 'react';
import { NewsTab } from './NewsTab';
import { SuggestionsTab } from './SuggestionsTab';
import { TeamMembersTab } from './TeamMembersTab';
import '../styles/community.css';

type TabValue = 'news' | 'suggestions' | 'team';

export default function Community() {
  const [activeTab, setActiveTab] = useState<TabValue>('news');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#111827', marginBottom: '0.5rem', lineHeight: 1.5 }}>
            Community Hub
          </h1>
          <p style={{ color: '#6b7280' }}>
            Stay updated with the latest news, share suggestions, and meet the team
          </p>
        </div>

        {/* Simple tabs navigation */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#ececf0',
          borderRadius: '0.75rem',
          padding: '3px',
          marginBottom: '1.5rem',
          height: '2.25rem'
        }}>
          <button
            onClick={() => setActiveTab('news')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              borderRadius: '0.75rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid transparent',
              background: activeTab === 'news' ? '#fff' : 'transparent',
              color: activeTab === 'news' ? '#111827' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.15s',
              height: 'calc(100% - 1px)'
            }}
          >
            What's New
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              borderRadius: '0.75rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid transparent',
              background: activeTab === 'suggestions' ? '#fff' : 'transparent',
              color: activeTab === 'suggestions' ? '#111827' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.15s',
              height: 'calc(100% - 1px)'
            }}
          >
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab('team')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              borderRadius: '0.75rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid transparent',
              background: activeTab === 'team' ? '#fff' : 'transparent',
              color: activeTab === 'team' ? '#111827' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.15s',
              height: 'calc(100% - 1px)'
            }}
          >
            Team Members
          </button>
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'suggestions' && <SuggestionsTab />}
          {activeTab === 'team' && <TeamMembersTab />}
        </div>
      </div>
    </div>
  );
}
