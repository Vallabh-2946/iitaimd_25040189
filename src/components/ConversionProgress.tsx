import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface ConversionProgressProps {
  progress: number;
  status: 'processing' | 'completed' | 'error';
  fileName: string;
}

export const ConversionProgress = ({ progress, status, fileName }: ConversionProgressProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Converting your PDF to Word document...';
      case 'completed':
        return 'Conversion completed successfully!';
      case 'error':
        return 'Conversion failed. Please try again.';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'text-primary';
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-error';
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1">
            <h3 className="font-medium">{fileName}</h3>
            <p className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </p>
          </div>
        </div>
        
        {status === 'processing' && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              {progress}% complete
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};