import Link from 'next/link';
import { FileText, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function QuickActions() {
    return (
        <>
            {/* Generate Notes */}
            <Link href="/ai-hub?cmd=generate">
                <Card className="h-full transition-colors hover:bg-accent">
                    <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 rounded-lg bg-muted p-3">
                            <FileText className="h-6 w-6 text-foreground" />
                        </div>
                        <h3 className="font-semibold">Generate Notes</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Generate notes for documents, templating with documentation.
                        </p>
                    </CardContent>
                </Card>
            </Link>

            {/* Evaluate Work */}
            <Link href="/ai-hub?cmd=evaluate">
                <Card className="h-full transition-colors hover:bg-accent">
                    <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <div className="mb-3 rounded-lg bg-muted p-3">
                            <CheckSquare className="h-6 w-6 text-foreground" />
                        </div>
                        <h3 className="font-semibold">Evaluate Work</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Evaluate work or evaluate work to amend the work and evaluations.
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    );
}
