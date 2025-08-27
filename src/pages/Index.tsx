import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ConversionProgress } from '@/components/ConversionProgress';
import { FileComparison } from '@/components/FileComparison';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ConversionState = 'idle' | 'processing' | 'completed' | 'error';

interface FileData {
  name: string;
  size: number;
}

const Index = () => {
  const [state, setState] = useState<ConversionState>('idle');
  const [progress, setProgress] = useState(0);
  const [originalFile, setOriginalFile] = useState<FileData | null>(null);
  const [convertedFile, setConvertedFile] = useState<FileData | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setOriginalFile({
      name: file.name,
      size: file.size
    });
    startConversion(file);
  };

  const startConversion = (file: File) => {
    setState('processing');
    setProgress(0);

    // Simulate conversion process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate converted file (typically slightly larger due to metadata)
          const convertedSize = Math.floor(file.size * (1.1 + Math.random() * 0.3));
          const convertedName = file.name.replace('.pdf', '.docx');
          
          setConvertedFile({
            name: convertedName,
            size: convertedSize
          });
          
          setState('completed');
          toast({
            title: "Conversion Complete!",
            description: "Your PDF has been successfully converted to Word format.",
          });
          
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const handleDownload = () => {
    // In a real implementation, this would download the converted file
    toast({
      title: "Download Started",
      description: "Your Word document is being downloaded.",
    });
  };

  const handleReset = () => {
    setState('idle');
    setProgress(0);
    setOriginalFile(null);
    setConvertedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PDF to Word Converter</h1>
              <p className="text-muted-foreground">
                Convert your PDF documents to editable Word files easily
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {state === 'idle' && (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Upload Your PDF</h2>
                <p className="text-muted-foreground">
                  Choose a PDF file to convert to Word format
                </p>
              </div>
              <FileUpload 
                onFileSelect={handleFileSelect} 
                isProcessing={false}
              />
            </>
          )}

          {(state === 'processing' || state === 'error') && originalFile && (
            <>
              <ConversionProgress
                progress={progress}
                status={state === 'error' ? 'error' : 'processing'}
                fileName={originalFile.name}
              />
              {state === 'error' && (
                <div className="text-center">
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </>
          )}

          {state === 'completed' && originalFile && convertedFile && (
            <>
              <FileComparison
                originalFile={originalFile}
                convertedFile={convertedFile}
                onDownload={handleDownload}
              />
              <div className="text-center">
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Convert Another File
                </Button>
              </div>
            </>
          )}

          {/* Features */}
          <Card className="p-6 mt-8">
            <h3 className="font-semibold mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Fast conversion process</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Preserves text formatting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>File size comparison</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>Quality analysis</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;