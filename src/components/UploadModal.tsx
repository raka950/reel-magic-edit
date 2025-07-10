import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Video, FileText, CheckCircle, X } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a video file smaller than 100MB.",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user || !title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a video file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Save video metadata to database
      const { error: dbError } = await supabase
        .from('videos')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          file_url: publicUrl,
          file_size: file.size,
          status: 'pending'
        });

      if (dbError) {
        throw dbError;
      }

      setUploadSuccess(true);
      toast({
        title: "Upload successful!",
        description: "Your video has been uploaded and is being processed.",
      });

      // Reset form after success
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setUploadSuccess(false);
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Upload Your Travel Video
          </DialogTitle>
        </DialogHeader>

        {uploadSuccess ? (
          <div className="text-center py-8 space-y-4" data-aos="zoom-in">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600">Upload Successful!</h3>
            <p className="text-muted-foreground">
              Your video has been uploaded and is being processed. We'll notify you when it's ready!
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-6">
            {/* File Upload Area */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Video File</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                  file ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/50'
                }`}
              >
                {file ? (
                  <div className="space-y-2">
                    <Video className="w-8 h-8 mx-auto text-primary" />
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose Video File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        MP4, MOV, AVI up to 100MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Video Title *
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a catchy title for your video"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-2 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Tell us about your travel experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] bg-background/50 border-2 focus:border-primary/50 resize-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={uploading || !file || !title.trim()}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300"
            >
              {uploading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </div>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};