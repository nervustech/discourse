import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ClassPerformanceProps {
    overallStatus: 'Good' | 'Average' | 'Needs Attention';
    trend: number;
    subjects: Array<{
        subject: string;
        score: number;
    }>;
    insights: string[];
}

export function ClassPerformance({
    overallStatus,
    trend,
    subjects,
    insights,
}: ClassPerformanceProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Good':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
            case 'Average':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
            default:
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
        }
    };

    const getBarColor = (score: number) => {
        if (score >= 70) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <span className="text-lg">📊</span>
                    Class Performance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Overall status */}
                    <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                        <Badge className={getStatusColor(overallStatus)}>
                            {overallStatus}
                        </Badge>
                        <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            +{trend}%
                        </div>
                    </div>

                    {/* Subject bars */}
                    <div className="space-y-3">
                        {subjects.map((item) => (
                            <div key={item.subject} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>{item.subject}</span>
                                    <span className="font-medium">{item.score}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className={`h-full rounded-full ${getBarColor(item.score)}`}
                                        style={{ width: `${item.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Insights */}
                    <div>
                        <h4 className="mb-2 text-sm font-medium uppercase text-muted-foreground">
                            Insights
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {insights.map((insight, index) => (
                                <li key={index} className="flex gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
