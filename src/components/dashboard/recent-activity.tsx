import { FileCheck, Upload, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
    id: string;
    type: 'graded' | 'published' | 'delivered' | 'updated';
    title: string;
    timestamp: string;
    metadata?: {
        score?: number;
    };
}

interface RecentActivityProps {
    activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'graded':
                return <FileCheck className="h-4 w-4 text-orange-500" />;
            case 'published':
                return <Upload className="h-4 w-4 text-green-500" />;
            case 'delivered':
                return <Send className="h-4 w-4 text-blue-500" />;
            default:
                return <FileCheck className="h-4 w-4 text-muted-foreground" />;
        }
    };

    const getBadge = (activity: Activity) => {
        switch (activity.type) {
            case 'graded':
                return (
                    <Badge variant="outline" className="text-xs">
                        Score: {activity.metadata?.score}%
                    </Badge>
                );
            case 'published':
                return (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                        Published
                    </Badge>
                );
            case 'delivered':
                return (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
                        Delivered
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <span className="text-lg">🕐</span>
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between rounded-lg border p-3"
                        >
                            <div className="flex items-center gap-3">
                                {getIcon(activity.type)}
                                <div>
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Timestamp • {activity.timestamp}
                                    </p>
                                </div>
                            </div>
                            {getBadge(activity)}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
