import { Download, FileText, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileComparisonProps {
  originalFile: {
    name: string;
    size: number;
  };
  convertedFile: {
    name: string;
    size: number;
  };
  onDownload: () => void;
}

export const FileComparison = ({ originalFile, convertedFile, onDownload }: FileComparisonProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSizeComparison = () => {
    if (convertedFile.size > originalFile.size) {
      return {
        text: 'The Word document is larger than the original PDF',
        color: 'text-warning'
      };
    } else if (convertedFile.size < originalFile.size) {
      return {
        text: 'The Word document is smaller than the original PDF',
        color: 'text-success'
      };
    } else {
      return {
        text: 'The files are the same size',
        color: 'text-muted-foreground'
      };
    }
  };

  const comparison = getSizeComparison();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Conversion Complete!</h3>
          <p className="text-muted-foreground">
            Your PDF has been successfully converted to a Word document.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original File */}
          <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
            <FileX className="h-8 w-8 text-error" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{originalFile.name}</p>
              <p className="text-sm text-muted-foreground">
                Original PDF • {formatFileSize(originalFile.size)}
              </p>
            </div>
          </div>

          {/* Converted File */}
          <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg">
            <FileText className="h-8 w-8 text-success" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{convertedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                Word Document • {formatFileSize(convertedFile.size)}
              </p>
            </div>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <p className={`font-medium ${comparison.color}`}>
            💡 {comparison.text}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            DOCX files often include extra metadata, which can affect file size.
          </p>
        </div>

        {/* Download Button */}
        <div className="text-center">
          <Button onClick={onDownload} size="lg" className="w-full md:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Download Word Document
          </Button>
        </div>

        {/* Quality Check Note */}
        <div className="text-center p-4 border border-primary/20 rounded-lg bg-primary/5">
          <h4 className="font-medium mb-2">📋 Quality Check Reminder</h4>
          <p className="text-sm text-muted-foreground">
            Please review both documents side-by-side to ensure formatting, fonts, and layout were preserved correctly.
          </p>
        </div>
      </div>
    </Card>
  );
};