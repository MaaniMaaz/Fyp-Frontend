"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Flag, ExternalLink, Eye, EyeOff, AlertTriangle, MoreHorizontal, Play } from "lucide-react"
import { apiService } from "../../services/api"

// Default flagged videos for fallback
const defaultFlaggedVideos = [
  {
    id: "1",
    title: "Mature Gaming Content - Violence and Strong Language",
    channel: "GameZone Pro",
    description: "This video contains explicit violence, strong language, and mature themes not suitable for younger audiences.",
    flagReason: "Contains explicit violence, strong language (F-word used 15+ times), mature themes, and graphic content",
    ageRating: "18+",
    duration: "25:43",
    timestamp: "1 hour ago",
    videoUrl: "https://youtube.com/watch?v=example1",
    thumbnail: "/placeholder.svg?height=90&width=120",
    severity: "high",
    viewedBy: "Mike (Son), Age 16",
  }
];

export default function FlaggedVideos() {
  const [hiddenVideos, setHiddenVideos] = useState<string[]>([])
  const [flaggedVideos, setFlaggedVideos] = useState(defaultFlaggedVideos)
  const [loading, setLoading] = useState(true)

  // Fetch flagged videos from backend
  useEffect(() => {
    const fetchFlaggedVideos = async () => {
      try {
        try {
          const data = await apiService.getFlaggedVideos();
          const formattedVideos = data.data?.videos?.map((video: any) => ({
            id: video.id,
            title: video.title,
            channel: video.channel,
            description: video.description || 'No description available',
            flagReason: video.reason,
            ageRating: video.ageRating,
            duration: video.duration,
            timestamp: new Date(video.flaggedAt).toLocaleString(),
            videoUrl: video.videoUrl,
            thumbnail: video.thumbnail,
            severity: video.severity,
            viewedBy: "Test User (You)", // This would come from user context
          })) || [];
          
          setFlaggedVideos(formattedVideos);
        } catch (error) {
          console.log('Using mock data for flagged videos');
          // Fallback to mock data
          const mockData = await apiService.getMockData();
          const mockVideos = mockData.data?.videos?.filter((video: any) => video.classification?.flagged?.length > 0) || [];
          const formattedMockVideos = mockVideos.map((video: any) => {
            const latestFlag = video.classification.flagged[video.classification.flagged.length - 1];
            return {
              id: video._id,
              title: video.title,
              channel: video.channelTitle,
              description: video.description || 'No description available',
              flagReason: latestFlag.reason,
              ageRating: video.classification.ageRating,
              duration: video.duration,
              timestamp: new Date(latestFlag.flaggedAt).toLocaleString(),
              videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
              thumbnail: video.thumbnails?.medium || '/placeholder.svg',
              severity: latestFlag.severity,
              viewedBy: "Test User (You)",
            };
          });
          setFlaggedVideos(formattedMockVideos);
        }
      } catch (error) {
        console.error('Error fetching flagged videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlaggedVideos();
  }, []);

  const handleHideVideo = (videoId: string) => {
    setHiddenVideos([...hiddenVideos, videoId])
  }

  const handleMarkAsSafe = async (videoId: string) => {
    try {
      const video = flaggedVideos.find(v => v.id === videoId);
      if (video) {
        const youtubeVideoId = video.videoUrl.split('v=')[1];
        await apiService.unflagVideo(youtubeVideoId);
        console.log(`Video ${videoId} marked as safe`);
        setHiddenVideos([...hiddenVideos, videoId]);
      }
    } catch (error) {
      console.error('Error marking video as safe:', error);
    }
  }

  const visibleVideos = flaggedVideos.filter((video) => !hiddenVideos.includes(video.id))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flagged videos...</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-orange-200 bg-orange-50"
      default:
        return "border-yellow-200 bg-yellow-50"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High Risk
          </Badge>
        )
      case "medium":
        return <Badge className="text-xs bg-orange-100 text-orange-800">Medium Risk</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Low Risk
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Flagged Videos ({visibleVideos.length})
          </h2>
          <p className="text-gray-600">AI-detected inappropriate content requiring review</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Auto-flagged by AI
          </Badge>
        </div>
      </div>

      {visibleVideos.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Flagged Videos</h3>
            <p className="text-gray-600">Great! No inappropriate content has been detected recently.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {visibleVideos.map((video) => (
            <Card key={video.id} className={`border-l-4 ${getSeverityColor(video.severity)}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">{video.duration}</div>
                  </div>

                  {/* Video Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(video.severity)}
                          <Badge variant="outline" className="text-xs bg-red-100 text-red-800">
                            {video.ageRating}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
                            Viewed by: {video.viewedBy}
                          </Badge>
                          <span className="text-xs text-gray-500">{video.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-3 rounded-lg border">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Video Description:</h4>
                      <p className="text-sm text-gray-700 mb-2">{video.description}</p>
                    </div>

                    {/* Flag Reason */}
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <h4 className="text-sm font-medium text-red-900 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Why this was flagged:
                      </h4>
                      <p className="text-sm text-red-800">{video.flagReason}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(video.videoUrl, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Video
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsSafe(video.id)}
                        className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Eye className="w-4 h-4" />
                        Mark as Safe
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleHideVideo(video.id)}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <EyeOff className="w-4 h-4" />
                        Hide
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Report False Flag</DropdownMenuItem>
                          <DropdownMenuItem>Block Channel</DropdownMenuItem>
                          <DropdownMenuItem>Add to Whitelist</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {flaggedVideos.filter((v) => v.severity === "high").length}
            </div>
            <p className="text-sm text-gray-600">High Risk Videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {flaggedVideos.filter((v) => v.severity === "medium").length}
            </div>
            <p className="text-sm text-gray-600">Medium Risk Videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{hiddenVideos.length}</div>
            <p className="text-sm text-gray-600">Hidden/Resolved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
