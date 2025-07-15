import React, { useState, useEffect } from 'react';
import { Users, Eye, Mail, Calendar, User } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  email: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  video_count?: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userVideos, setUserVideos] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get video counts for each user
      const usersWithCounts = [];
      if (profiles) {
        for (const profile of profiles) {
          const { count } = await supabase
            .from('videos')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', profile.user_id);
          
          usersWithCounts.push({
            ...profile,
            video_count: count || 0
          });
        }
      }

      setUsers(usersWithCounts);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVideos = async (userId: string) => {
    try {
      const { data: videos, error } = await supabase
        .from('videos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUserVideos(videos || []);
    } catch (error) {
      console.error('Error fetching user videos:', error);
      toast({
        title: "Error",
        description: "Failed to load user videos",
        variant: "destructive"
      });
    }
  };

  const handleViewUploads = (user: UserProfile) => {
    setSelectedUser(user);
    fetchUserVideos(user.user_id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-700';
      case 'in_progress': return 'bg-blue-500/20 text-blue-700';
      case 'delivered': return 'bg-green-500/20 text-green-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <AdminLayout title="Users Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading users...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Users Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Registered Users ({users.length})
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Users Table */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Uploads</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar_url} alt={user.display_name} />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.display_name || 'No Name'}</div>
                          <div className="text-sm text-muted-foreground">ID: {user.user_id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.video_count} videos</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(user.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewUploads(user)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Uploads
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* User Videos Modal/Section */}
        {selectedUser && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-secondary" />
                {selectedUser.display_name}'s Uploads
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUser(null)}
                className="w-fit"
              >
                Close
              </Button>
            </CardHeader>
            <CardContent>
              {userVideos.length > 0 ? (
                <div className="space-y-4">
                  {userVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {video.description || 'No description'} • {formatFileSize(video.file_size || 0)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {formatDate(video.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(video.status)}>
                          {video.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No uploads found for this user</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;