import React from 'react';
import { ContentData } from '../types';
import { MessageCircle, Mail, Github, Newspaper, Vote, Phone, Globe, Linkedin, Twitter, Youtube, Rss } from 'lucide-react';

interface SocialLinksProps {
    data: ContentData;
}

const iconMap: Record<string, React.ReactNode> = {
    'MessageCircle': <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Mail': <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Github': <Github className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Newspaper': <Newspaper className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Vote': <Vote className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Phone': <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Globe': <Globe className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Linkedin': <Linkedin className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Twitter': <Twitter className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Video': <Youtube className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
    'Rss': <Rss className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
};

const SocialLinks: React.FC<SocialLinksProps> = ({ data }) => {

  const handleAction = (e: React.MouseEvent, social: any) => {
     if (social.platform.includes('WeChat') || social.platform.includes('手机') || social.platform.includes('微信') && !social.platform.includes('公众号')) {
         e.preventDefault();
         navigator.clipboard.writeText(social.username);
         const message = data.lang === 'zh' ? `已复制 ${social.username}` : `Copied ${social.username}`;
         alert(message);
     }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {data.socials.map((social, idx) => {
            return (
            <a
                key={idx}
                href={social.url}
                target={social.url.startsWith('http') ? "_blank" : "_self"}
                rel={social.url.startsWith('http') ? "noopener noreferrer" : ""}
                onClick={(e) => handleAction(e, social)}
                title={`${social.platform}: ${social.username}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 group ${social.color}`}
            >
                <span className="group-hover:rotate-12 transition-transform duration-300">
                    {iconMap[social.icon] || <Globe className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
                </span>
            </a>
        )})}
    </div>
  );
};

export default SocialLinks;
