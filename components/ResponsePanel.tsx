import React from 'react';
import { LoadingSpinner } from './icons';

interface ResponsePanelProps {
  title: string;
  icon: React.ReactNode;
  content: string | null;
  isLoading: boolean;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ title, icon, content, isLoading }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col flex-1 min-h-[300px] lg:min-h-0">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="flex-grow overflow-y-auto text-gray-300 pr-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : content ? (
          <div className="whitespace-pre-wrap font-mono text-sm">{content}</div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            AI response will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;
