import React, { useState, useEffect } from 'react';
import { Users, Video, Clock, CheckCircle, TrendingUp, Download, Eye } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  totalVideos: number;
  pendingVideos: number;
  deliveredVideos: number;
  mostActiveUser: string;
  recentUploads: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalVideos: 0,
    pendingVideos: 0,
    deliveredVideos: 0,
    mostActiveUser: 'No data',
    recentUploads: []
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch videos count and status breakdown
      const { count: videosCount } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true });

      const { count: pendingCount } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: deliveredCount } = await supabase
        .from('videos')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'delivered');

      // Fetch most active user
      const { data: userActivity } = await supabase
        .from('videos')
        .select('user_id')
        .order('created_at', { ascending: false });

      // Count uploads per user
      const userCounts = userActivity?.reduce((acc: any, video: any) => {
        const userId = video.user_id;
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
      }, {});

      const mostActiveUserId = userCounts ? Object.keys(userCounts).reduce((a, b) => 
        userCounts[a] > userCounts[b] ? a : b
      ) : null;

      // Get most active user profile
      let mostActiveUserName = 'No data';
      if (mostActiveUserId) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', mostActiveUserId)
          .single();
        
        mostActiveUserName = userProfile?.display_name || 'Unknown User';
      }

      // Fetch recent uploads
      const { data: recentUploads } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Get user profiles for recent uploads
      const recentUploadsWithProfiles = [];
      if (recentUploads) {
        for (const upload of recentUploads) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, email, avatar_url')
            .eq('user_id', upload.user_id)
            .single();
          
          recentUploadsWithProfiles.push({
            ...upload,
            profiles: profile
          });
        }
      }

      setStats({
        totalUsers: usersCount || 0,
        totalVideos: videosCount || 0,
        pendingVideos: pendingCount || 0,
        deliveredVideos: deliveredCount || 0,
        mostActiveUser: mostActiveUserName,
        recentUploads: recentUploadsWithProfiles
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading dashboard...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Videos</CardTitle>
              <Video className="w-5 h-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground">Video uploads</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              <Clock className="w-5 h-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pendingVideos}</div>
              <p className="text-xs text-muted-foreground">Awaiting editing</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:shadow-medium transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.deliveredVideos}</div>
              <p className="text-xs text-muted-foreground">Completed orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Most Active User */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Most Active User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-foreground">{stats.mostActiveUser}</p>
            <p className="text-sm text-muted-foreground">User with most uploads</p>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-secondary" />
              Recent Uploads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUploads.length > 0 ? (
                stats.recentUploads.map((upload: any) => (
                  <div key={upload.id} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{upload.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {upload.profiles?.display_name || 'Unknown'} • {formatFileSize(upload.file_size || 0)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(upload.status)}>
                        {upload.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No recent uploads</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;