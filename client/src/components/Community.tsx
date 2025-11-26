import { useState } from 'react';
import { NewsTab } from './NewsTab';
import { SuggestionsTab } from './SuggestionsTab';
import { TeamMembersTab } from './TeamMembersTab';
import '../styles/community.css';

type TabValue = 'news' | 'suggestions' | 'team';

export default function Community() {
  const [activeTab, setActiveTab] = useState<TabValue>('news');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 pb-0">
        <div className="mb-8">
          <h1 className="text-gray-900 text-3xl font-semibold mb-2">
            Community Hub
          </h1>
          <p className="text-gray-600">
            Stay updated with the latest news, share suggestions, and meet the team
          </p>
        </div>
      </div>

      {/* Simple tabs navigation */}
      <div className="max-w-7xl mx-auto px-6">
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
