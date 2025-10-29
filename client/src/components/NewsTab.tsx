import { useState, useMemo } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Bug, RefreshCw, Bell } from 'lucide-react';
import { updates } from '../data/models';

type NewsCategory = 'all' | 'New features' | 'Updates' | 'Bug fixes';

interface NewsItem {
  date: string;
  title: string;
  note?: string;
  image?: string;
  tag: string;
}

export function NewsTab() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [userReactions, setUserReactions] = useState<Record<number, Set<string>>>({});

  // Normalize tag names to match design
  const normalizeTag = (tag: string): string => {
    const lower = tag.toLowerCase();
    if (lower === 'new features' || lower === 'new-features' || lower === 'new') return 'New features';
    if (lower === 'bug fixes' || lower === 'bug-fixes' || lower === 'bug') return 'Bug fixes';
    if (lower === 'updates' || lower === 'update') return 'Updates';
    return 'Updates';
  };

  const newsItems: NewsItem[] = useMemo(() => {
    // Parse date and sort by latest first
    const parseDate = (dateStr: string): Date => {
      // Convert "Sept 1st, 2025" to a Date object
      const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
      return new Date(cleaned);
    };

    return updates
      .map(item => ({
        ...item,
        tag: normalizeTag(item.tag)
      }))
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  }, []);

  const filteredNews = selectedCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.tag === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'New features': return <Sparkles className="w-3 h-3" />;
      case 'Updates': return <RefreshCw className="w-3 h-3" />;
      case 'Bug fixes': return <Bug className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'New features': return 'bg-green-100 text-green-700 border-green-200';
      case 'Updates': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Bug fixes': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleReaction = (index: number, reactionType: string) => {
    setUserReactions(prev => {
      const newReactions = { ...prev };
      // Create a new Set instance to ensure React detects the change
      const currentSet = new Set(newReactions[index] || []);

      if (currentSet.has(reactionType)) {
        currentSet.delete(reactionType);
      } else {
        currentSet.add(reactionType);
      }

      newReactions[index] = currentSet;
      return newReactions;
    });
  };

  const hasReacted = (index: number, reactionType: string) => {
    return userReactions[index]?.has(reactionType) || false;
  };

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === 'New features' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('New features')}
          className="gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          New features
        </Button>
        <Button
          variant={selectedCategory === 'Updates' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Updates')}
          className="gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Updates
        </Button>
        <Button
          variant={selectedCategory === 'Bug fixes' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Bug fixes')}
          className="gap-1.5"
        >
          <Bug className="w-3.5 h-3.5" />
          Bug fixes
        </Button>
      </div>

      <div className="relative">
        {filteredNews.map((item, index) => {
          const showDate = index === 0 || filteredNews[index - 1].date !== item.date;

          return (
            <div key={index} className="flex gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center w-24 flex-shrink-0 relative">
                <div className="text-gray-600 text-sm mb-2 whitespace-nowrap h-5">
                  {showDate && item.date}
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 relative z-10" />
                {index !== filteredNews.length - 1 && (
                  <div className="absolute w-0.5 bg-gray-200 left-1/2 -translate-x-1/2 top-8 bottom-0" />
                )}
              </div>

              <Card className="flex-1 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-gray-900">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className={`flex-shrink-0 gap-1 ${getCategoryColor(item.tag)}`}
                  >
                    {getCategoryIcon(item.tag)}
                    {item.tag}
                  </Badge>
                </div>

                {item.note && <p className="text-gray-600 mb-4">{item.note}</p>}

                {item.image && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <img src={item.image} alt="" className="w-full" />
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleReaction(index, 'celebration')}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      hasReacted(index, 'celebration')
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    🎉
                  </button>
                  <button
                    onClick={() => toggleReaction(index, 'heart')}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      hasReacted(index, 'heart')
                        ? 'bg-red-50 border-red-200'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => toggleReaction(index, 'thumbsUp')}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      hasReacted(index, 'thumbsUp')
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    👍
                  </button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
