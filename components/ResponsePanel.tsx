import React from 'react';

interface ResponsePanelProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  isLoading: boolean;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ title, icon, content, isLoading }) => {
  const SkeletonLoader = () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-700 rounded w-full"></div>
      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-slate-800 rounded-2xl flex-1 flex flex-col min-w-0">
      <div className="flex items-center gap-3 p-4 border-b border-slate-700">
        {icon}
        <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed whitespace-pre-wrap break-words">
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;
