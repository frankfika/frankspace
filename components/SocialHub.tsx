
import React from 'react';
import { ContentData } from '../types';
import { MessageCircle, Mail, Github, Newspaper, Vote, Phone, Globe, Flag, ArrowUpRight, Copy, Linkedin, Twitter, Youtube, Rss } from 'lucide-react';

interface SocialHubProps {
    data: ContentData;
}

const iconMap: Record<string, React.ReactNode> = {
    'MessageCircle': <MessageCircle size={22} />,
    'Mail': <Mail size={22} />,
    'Github': <Github size={22} />,
    'Newspaper': <Newspaper size={22} />,
    'Vote': <Vote size={22} />,
    'Phone': <Phone size={22} />,
    'Globe': <Globe size={22} />,
    'Flag': <Flag size={22} />,
    'Linkedin': <Linkedin size={22} />,
    'Twitter': <Twitter size={22} />,
    'Video': <Youtube size={22} />,
    'Rss': <Rss size={22} />
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
    <div className="w-full pb-8">
        <div className="flex flex-col gap-3">
            {data.socials.map((social, idx) => {
                const isCopyable = (social.platform.includes('WeChat') || social.platform.includes('手机') || social.platform.includes('微信')) && !social.platform.includes('公众号');
                
                return (
                <a 
                    key={idx} 
                    href={social.url}
                    target={social.url.startsWith('http') ? "_blank" : "_self"}
                    rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                    onClick={(e) => handleAction(e, social)}
                    className="glass-panel p-4 rounded-xl flex items-center gap-5 hover:border-brand-300 hover:shadow-md transition-all group bg-white/60 cursor-pointer"
                >
                    {/* Icon Box */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm ${social.color} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        {iconMap[social.icon] || <Globe size={22} />}
                    </div>
                    
                    {/* Text Content */}
                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
                        <div className="flex flex-col">
                             <div className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">{social.platform}</div>
                             <div className="text-sm text-slate-500 font-medium font-mono">{social.username}</div>
                        </div>
                    </div>

                    {/* Action Icon */}
                    <div className="text-slate-300 group-hover:text-brand-500 transition-colors pr-2">
                        {isCopyable ? <Copy size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                </a>
            )})}
        </div>
    </div>
  );
};

export default SocialHub;
