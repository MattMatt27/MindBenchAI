import { useState, useMemo } from 'react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ChevronUp } from 'lucide-react';
import { suggestions } from '../data/models';

type SuggestionStatus = 'planned' | 'in-progress' | 'open vote' | 'open-vote';

interface Suggestion {
  title: string;
  desc?: string;
  status: string;
  vote?: number;
}

export function SuggestionsTab() {
  const [userVotes, setUserVotes] = useState<Set<number>>(new Set());

  const suggestionsList = useMemo(() =>
    suggestions.map((s, idx) => ({ ...s, _idx: idx })),
    []
  );

  const sortedSuggestions = useMemo(() => {
    return [...suggestionsList].sort((a, b) => {
      const aVotes = (a.vote || 0) + (userVotes.has(a._idx) ? 1 : 0);
      const bVotes = (b.vote || 0) + (userVotes.has(b._idx) ? 1 : 0);
      return bVotes - aVotes;
    });
  }, [suggestionsList, userVotes]);

  const toggleVote = (idx: number) => {
    setUserVotes(prev => {
      const newVotes = new Set(prev);
      if (newVotes.has(idx)) {
        newVotes.delete(idx);
      } else {
        newVotes.add(idx);
      }
      return newVotes;
    });
  };

  const hasVoted = (idx: number) => {
    return userVotes.has(idx);
  };

  const normalizeStatus = (status: string): SuggestionStatus => {
    const lower = status.toLowerCase();
    if (lower === 'in-progress' || lower === 'in progress') return 'in-progress';
    if (lower === 'planned') return 'planned';
    return 'open-vote';
  };

  const getStatusBadge = (status: string) => {
    const normalized = normalizeStatus(status);

    switch (normalized) {
      case 'planned':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
            Planned
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5" />
            Open vote
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {sortedSuggestions.map((suggestion) => {
        const voted = hasVoted(suggestion._idx);
        const currentVotes = (suggestion.vote || 0) + (voted ? 1 : 0);

        return (
          <Card key={suggestion._idx} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <button
                onClick={() => toggleVote(suggestion._idx)}
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 transition-all flex-shrink-0 ${
                  voted
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <ChevronUp className={`w-5 h-5 mb-1 ${voted ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={voted ? 'font-semibold' : ''}>{currentVotes}</span>
              </button>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-gray-900">{suggestion.title}</h3>
                  {getStatusBadge(suggestion.status)}
                </div>
                {suggestion.desc && <p className="text-gray-600">{suggestion.desc}</p>}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
