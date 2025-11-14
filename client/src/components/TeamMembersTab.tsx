import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Mail, Linkedin, Github } from 'lucide-react';

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

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Team Member',
    role: 'Project Lead',
    department: 'Product',
    initials: 'TM',
    bio: 'Leading the MindBench.ai project',
    email: 'team@mindbench.ai'
  },
];

export function TeamMembersTab() {
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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-gray-900 mb-1">Meet the Team</h2>
        <p className="text-gray-600">The people behind the product</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {member.initials}
                </AvatarFallback>
              </Avatar>

              <h3 className="text-gray-900 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{member.role}</p>

              <Badge variant="outline" className={`mb-4 ${getDepartmentColor(member.department)}`}>
                {member.department}
              </Badge>

              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

              <div className="flex gap-2 mt-auto">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Github className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
