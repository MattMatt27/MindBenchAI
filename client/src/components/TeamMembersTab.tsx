import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Mail, Linkedin, Github } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  initials: string;
  bio: string;
  email?: string;
}

// API response interface
interface TeamMemberAPI {
  id: string;
  user_id: string;
  display_name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  image_storage_path: string | null;
  sort_order: number | null;
  start_date: string | null;
  end_date: string | null;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  } | null;
  expertise: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export function TeamMembersTab() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.communityTeamMembers);

        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }

        const result = await response.json();
        setTeamMembers(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Helper to get initials from display name
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Helper to extract department from role (or expertise)
  const getDepartmentFromMember = (member: TeamMemberAPI): string => {
    // Try to extract from expertise if available
    if (member.expertise && Array.isArray(member.expertise) && member.expertise.length > 0) {
      const expertise = member.expertise[0];
      if (expertise.toLowerCase().includes('research')) return 'Research';
      if (expertise.toLowerCase().includes('engineer')) return 'Engineering';
      if (expertise.toLowerCase().includes('design')) return 'Design';
      if (expertise.toLowerCase().includes('product')) return 'Product';
      if (expertise.toLowerCase().includes('community')) return 'Community';
    }
    // Default based on role
    if (member.role.toLowerCase().includes('research')) return 'Research';
    return 'Research'; // Default
  };

  const getDepartmentColor = (department: string) => {
    switch (department.toLowerCase()) {
      case 'product':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'engineering':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'design':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'community':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'research':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading team members...</p>
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
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Meet the Team</h2>
        <p className="text-gray-600">The people behind the product</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const department = getDepartmentFromMember(member);
          const initials = getInitials(member.display_name);

          return (
            <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.avatar_url || undefined} alt={member.display_name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-gray-900 mb-1">{member.display_name}</h3>
                <p className="text-gray-600 text-sm mb-3">{member.role}</p>

                <Badge variant="outline" className={`mb-4 ${getDepartmentColor(department)}`}>
                  {department}
                </Badge>

                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                <div className="flex gap-2 mt-auto">
                  {member.social_links?.email && (
                    <a
                      href={`mailto:${member.social_links.email}`}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                  {member.social_links?.linkedin && (
                    <a
                      href={member.social_links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                  {member.social_links?.github && (
                    <a
                      href={member.social_links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
