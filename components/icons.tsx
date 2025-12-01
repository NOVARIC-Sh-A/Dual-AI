import React from 'react';

export const GeminiIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C12 4.5 15.75 6 17.25 9C18.75 12 15 15.75 12 19.5C9 15.75 5.25 12 6.75 9C8.25 6 12 4.5 12 4.5Z" fill="url(#gemini-gradient-1)" />
    <path d="M12 4.5C12 4.5 8.25 6 6.75 9C5.25 12 9 15.75 12 19.5C15 15.75 18.75 12 17.25 9C15.75 6 12 4.5 12 4.5Z" fill="url(#gemini-gradient-2)" opacity="0.7" />
    <defs>
      <linearGradient id="gemini-gradient-1" x1="12" y1="4.5" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8E44AD" />
        <stop offset="1" stopColor="#3498DB" />
      </linearGradient>
      <linearGradient id="gemini-gradient-2" x1="12" y1="4.5" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F1C40F" />
        <stop offset="1" stopColor="#E74C3C" />
      </linearGradient>
    </defs>
  </svg>
);

export const ChatGPTIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.2085 18.2917C34.2085 17.5685 33.9185 16.8746 33.3985 16.3546C32.8785 15.8346 32.1846 15.5417 31.4615 15.5417H21.2885C20.9314 15.5417 20.5891 15.4023 20.3392 15.1524C20.0893 14.9025 19.9498 14.5601 19.9498 14.203V4.03002C19.9498 3.30685 19.6598 2.61293 19.1398 2.09293C18.6198 1.57293 17.9259 1.28002 17.2027 1.28002C16.4795 1.28002 15.7856 1.57002 15.2656 2.09002L1.86558 15.49C1.34558 16.01 1.05267 16.7039 1.05267 17.4271C1.05267 18.1502 1.34267 18.8441 1.86267 19.3641L15.2627 32.7641C15.7827 33.2841 16.4766 33.5771 17.1998 33.5771C17.9229 33.5771 18.6168 33.2871 19.1368 32.7671C19.6568 32.2471 19.9498 31.5531 19.9498 30.83V22.7083H29.1668C29.8899 22.7083 30.5838 22.4183 31.1038 21.8983C31.6238 21.3783 31.9168 20.6844 31.9168 19.9613V19.6144C31.9168 19.199 32.0791 18.8005 32.3653 18.5143C32.6515 18.2281 33.05 18.0658 33.4654 18.0658H34.2085C36.0152 18.0658 37.6435 18.7731 38.8252 19.9548C40.0069 21.1365 40.7141 22.7648 40.7141 24.5714C40.7141 26.3781 40.0069 28.0064 38.8252 29.1881C37.6435 30.3698 36.0152 31.0771 34.2085 31.0771H31.4615C30.7383 31.0771 30.0444 31.3671 29.5244 31.8871C29.0044 32.4071 28.7115 33.101 28.7115 33.8242V36.5711C28.7115 37.2942 29.0015 37.9881 29.5215 38.5081C30.0415 39.0281 30.7354 39.3211 31.4585 39.3211H34.2085C36.9556 39.3211 39.4685 38.229 41.3498 36.3477C43.231 34.4664 44.3231 31.9535 44.3231 29.1881V24.5714C44.3231 19.8914 40.2319 18.2917 34.2085 18.2917Z" fill="#75A99F" />
  </svg>
);

export const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);
