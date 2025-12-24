
import React from 'react';
import { ContentData } from '../types';
import { MessageCircle, Mail, Github, Newspaper, Vote, Phone, Globe, Flag, ArrowUpRight, Copy, Linkedin, Twitter, Youtube, Rss } from 'lucide-react';

interface SocialHubProps {
    data: ContentData;
}

const iconMap: Record<string, React.ReactNode> = {
    'MessageCircle': <MessageCircle className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Mail': <Mail className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Github': <Github className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Newspaper': <Newspaper className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Vote': <Vote className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Phone': <Phone className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Globe': <Globe className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Flag': <Flag className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Linkedin': <Linkedin className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Twitter': <Twitter className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Video': <Youtube className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />,
    'Rss': <Rss className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
};

const SocialHub: React.FC<SocialHubProps> = ({ data }) => {
  
  const handleAction = (e: React.MouseEvent, social: any) => {
     if (social.platform.includes('WeChat') || social.platform.includes('手机') || social.platform.includes('微信') && !social.platform.includes('公众号')) {
         e.preventDefault();
         navigator.clipboard.writeText(social.username);
         alert(`Copied ${social.username} to clipboard`);
     }
  };

  return (
    <div className="w-full pb-6 sm:pb-8">
        <div className="flex flex-col gap-2 sm:gap-3">
            {data.socials.map((social, idx) => {
                const isCopyable = (social.platform.includes('WeChat') || social.platform.includes('手机') || social.platform.includes('微信')) && !social.platform.includes('公众号');

                return (
                <a
                    key={idx}
                    href={social.url}
                    target={social.url.startsWith('http') ? "_blank" : "_self"}
                    rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                    onClick={(e) => handleAction(e, social)}
                    className="glass-panel p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-5 hover:border-brand-300 hover:shadow-md transition-all group bg-white/60 cursor-pointer"
                >
                    {/* Icon Box */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-sm ${social.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {iconMap[social.icon] || <Globe className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-0.5 sm:gap-1 md:gap-4">
                        <div className="flex flex-col">
                             <div className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-brand-600 transition-colors">{social.platform}</div>
                             <div className="text-xs sm:text-sm text-slate-500 font-medium font-mono truncate">{social.username}</div>
                        </div>
                    </div>

                    {/* Action Icon */}
                    <div className="text-slate-300 group-hover:text-brand-500 transition-colors pr-1 sm:pr-2">
                        {isCopyable ? <Copy size={18} className="sm:w-5 sm:h-5" /> : <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />}
                    </div>
                </a>
            )})}
        </div>
    </div>
  );
};

export default SocialHub;
