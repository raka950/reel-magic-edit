import React, { useState, useEffect } from 'react';
import { Video, Download, Eye, Edit, CheckCircle, Clock, AlertCircle, User, Calendar, FileText, HardDrive } from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface VideoWithProfile {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  duration: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles?: {
    display_name: string;
    email: string;
    avatar_url: string;
  };
}

const AdminVideos = () => {
  const [videos, setVideos] = useState<VideoWithProfile[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoWithProfile | null>(null);
  const [deliveryFile, setDeliveryFile] = useState<File | null>(null);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [uploadingDelivery, setUploadingDelivery] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.status === statusFilter));
    }
  }, [statusFilter, videos]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      
      // Fetch all videos
      const { data: videosData, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user profiles for each video
      const videosWithProfiles = [];
      if (videosData) {
        for (const video of videosData) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, email, avatar_url')
            .eq('user_id', video.user_id)
            .single();
          
          videosWithProfiles.push({
            ...video,
            profiles: profile
          });
        }
      }

      setVideos(videosWithProfiles);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Error",
        description: "Failed to load videos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateVideoStatus = async (videoId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', videoId);

      if (error) throw error;

      // Update local state
      setVideos(videos.map(video => 
        video.id === videoId 
          ? { ...video, status: newStatus, updated_at: new Date().toISOString() }
          : video
      ));

      toast({
        title: "Success",
        description: `Video status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating video status:', error);
      toast({
        title: "Error",
        description: "Failed to update video status",
        variant: "destructive"
      });
    }
  };

  const handleDeliveryUpload = async () => {
    if (!selectedVideo || !deliveryFile) return;

    try {
      setUploadingDelivery(true);
      
      // Upload delivery file to Supabase Storage
      const fileExt = deliveryFile.name.split('.').pop();
      const fileName = `${selectedVideo.id}_delivery.${fileExt}`;
      const filePath = `deliveries/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, deliveryFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      // Update video with delivery info
      const { error: updateError } = await supabase
        .from('videos')
        .update({
          status: 'delivered',
          updated_at: new Date().toISOString(),
          // You might want to add delivery_url and delivery_note fields to your videos table
        })
        .eq('id', selectedVideo.id);

      if (updateError) throw updateError;

      // Update local state
      setVideos(videos.map(video => 
        video.id === selectedVideo.id 
          ? { ...video, status: 'delivered', updated_at: new Date().toISOString() }
          : video
      ));

      toast({
        title: "Success",
        description: "Delivery uploaded successfully and video marked as delivered",
      });

      // Reset form
      setSelectedVideo(null);
      setDeliveryFile(null);
      setDeliveryNote('');
    } catch (error) {
      console.error('Error uploading delivery:', error);
      toast({
        title: "Error",
        description: "Failed to upload delivery file",
        variant: "destructive"
      });
    } finally {
      setUploadingDelivery(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openWhatsApp = (phoneNumber: string, message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <AdminLayout title="Video Management">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading videos...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Video Management">
      <div className="space-y-6">
        {/* Header with filters */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-secondary" />
                Video Uploads ({filteredVideos.length})
              </CardTitle>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        {/* Videos Table */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video Details</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>File Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{video.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {video.description || 'No description'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{video.profiles?.display_name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">{video.profiles?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{formatFileSize(video.file_size || 0)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{formatDuration(video.duration)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={video.status}
                        onValueChange={(newStatus) => updateVideoStatus(video.id, newStatus)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(video.status)}>
                            {getStatusIcon(video.status)}
                            {video.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(video.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(video.file_url, video.title)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Video Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Title</Label>
                                  <p className="text-sm">{video.title}</p>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <Badge className={getStatusColor(video.status)}>
                                    {video.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p className="text-sm">{video.description || 'No description'}</p>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>File Size</Label>
                                  <p className="text-sm">{formatFileSize(video.file_size || 0)}</p>
                                </div>
                                <div>
                                  <Label>Duration</Label>
                                  <p className="text-sm">{formatDuration(video.duration)}</p>
                                </div>
                                <div>
                                  <Label>Created</Label>
                                  <p className="text-sm">{formatDate(video.created_at)}</p>
                                </div>
                              </div>
                              <div>
                                <Label>User</Label>
                                <p className="text-sm">{video.profiles?.display_name} ({video.profiles?.email})</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleDownload(video.file_url, video.title)}
                                  className="flex items-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Download Original
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => openWhatsApp('916287116458', `Hi! Your video "${video.title}" has been updated. Please check your account for the latest status.`)}
                                >
                                  Contact User
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedVideo(video)}
                              disabled={video.status === 'delivered'}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Mark as Delivered</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Upload Delivery File</Label>
                                <Input
                                  type="file"
                                  accept="video/*"
                                  onChange={(e) => setDeliveryFile(e.target.files?.[0] || null)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Delivery Note (Optional)</Label>
                                <Textarea
                                  placeholder="Add any notes about the delivery..."
                                  value={deliveryNote}
                                  onChange={(e) => setDeliveryNote(e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleDeliveryUpload}
                                  disabled={!deliveryFile || uploadingDelivery}
                                  className="flex items-center gap-2"
                                >
                                  {uploadingDelivery ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                  {uploadingDelivery ? 'Uploading...' : 'Mark as Delivered'}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => updateVideoStatus(video.id, 'delivered')}
                                >
                                  Mark Delivered (No File)
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredVideos.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                {statusFilter === 'all' 
                  ? 'No videos have been uploaded yet' 
                  : `No videos with status "${statusFilter}"`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVideos;