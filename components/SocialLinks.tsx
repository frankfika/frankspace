import React from 'react';
import { ContentData } from '../types';
import { MessageCircle, Mail, Github, Newspaper, Vote, Phone, Globe, Linkedin, Twitter, Youtube, Rss } from 'lucide-react';

interface SocialLinksProps {
    data: ContentData;
}

const iconMap: Record<string, React.ReactNode> = {
    'MessageCircle': <MessageCircle size={18} />,
    'Mail': <Mail size={18} />,
    'Github': <Github size={18} />,
    'Newspaper': <Newspaper size={18} />,
    'Vote': <Vote size={18} />,
    'Phone': <Phone size={18} />,
    'Globe': <Globe size={18} />,
    'Linkedin': <Linkedin size={18} />,
    'Twitter': <Twitter size={18} />,
    'Video': <Youtube size={18} />,
    'Rss': <Rss size={18} />
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
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 group ${social.color}`}
            >
                <span className="group-hover:rotate-12 transition-transform duration-300">
                    {iconMap[social.icon] || <Globe size={18} />}
                </span>
            </a>
        )})}
    </div>
  );
};

export default SocialLinks;
