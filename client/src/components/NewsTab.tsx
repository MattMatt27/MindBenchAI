import { useState, useMemo, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Bug, RefreshCw, Bell } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

type NewsCategory = 'all' | 'Announcement' | 'Features' | 'Bug fix' | 'Improvement';

interface NewsItem {
  date: string;
  title: string;
  note?: string;
  image?: string;
  tag: string;
}

// API response interface
interface UpdateAPI {
  id: string;
  date: string;
  title: string;
  category: string;
  note: string | null;
  image_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  slug: string | null;
  created_at: string;
  reaction_count: number;
}

export function NewsTab() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [userReactions, setUserReactions] = useState<Record<number, Set<string>>>({});
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [updates, setUpdates] = useState<UpdateAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch updates from API
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.communityUpdates);

        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }

        const result = await response.json();
        setUpdates(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load updates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Normalize tag names to match design
  const normalizeTag = (category: string): string => {
    const lower = category.toLowerCase();
    if (lower === 'feature') return 'Features';
    if (lower === 'bug_fix') return 'Bug fix';
    if (lower === 'improvement') return 'Improvement';
    if (lower === 'announcement' || lower === 'research' || lower === 'community') return 'Announcement';
    return 'Announcement';
  };

  const newsItems: NewsItem[] = useMemo(() => {
    // Format date as "Month DDth, YYYY"
    const formatDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      const day = date.getDate();
      const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                     day === 2 || day === 22 ? 'nd' :
                     day === 3 || day === 23 ? 'rd' : 'th';
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
    };

    return updates
      .map(item => ({
        date: formatDate(item.date),
        title: item.title,
        note: item.note || undefined,
        image: item.image_url || undefined,
        tag: normalizeTag(item.category),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [updates]);

  const filteredNews = selectedCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.tag === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Announcement': return <Bell className="w-3 h-3" />;
      case 'Features': return <Sparkles className="w-3 h-3" />;
      case 'Bug fix': return <Bug className="w-3 h-3" />;
      case 'Improvement': return <RefreshCw className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Announcement': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Features': return 'bg-green-100 text-green-700 border-green-200';
      case 'Bug fix': return 'bg-red-100 text-red-700 border-red-200';
      case 'Improvement': return 'bg-purple-100 text-purple-700 border-purple-200';
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

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      return newExpanded;
    });
  };

  const isExpanded = (index: number) => {
    return expandedItems.has(index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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
          variant={selectedCategory === 'Announcement' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Announcement')}
          className="gap-1.5"
        >
          <Bell className="w-3.5 h-3.5" />
          Announcement
        </Button>
        <Button
          variant={selectedCategory === 'Features' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Features')}
          className="gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Features
        </Button>
        <Button
          variant={selectedCategory === 'Bug fix' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Bug fix')}
          className="gap-1.5"
        >
          <Bug className="w-3.5 h-3.5" />
          Bug fix
        </Button>
        <Button
          variant={selectedCategory === 'Improvement' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('Improvement')}
          className="gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Improvement
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
                  <h3 className="text-gray-900 font-bold">{item.title}</h3>
                  <Badge
                    variant="outline"
                    className={`flex-shrink-0 gap-1 ${getCategoryColor(item.tag)}`}
                  >
                    {getCategoryIcon(item.tag)}
                    {item.tag}
                  </Badge>
                </div>

                {item.note && (
                  <div className="mb-4">
                    {item.note.length > 200 && !isExpanded(index) ? (
                      <div className="relative">
                        <p className="text-gray-600 line-clamp-3">
                          {item.note}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <p className="text-gray-600">{item.note}</p>
                    )}
                    {item.note.length > 200 && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                      >
                        {isExpanded(index) ? 'See less' : 'See more'}
                      </button>
                    )}
                  </div>
                )}

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
