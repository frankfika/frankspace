
import React, { useState } from 'react';
import { ContentData } from '../types';
import { Sparkles, CheckCircle2, X, QrCode } from 'lucide-react';

interface ConsultationProps {
  data: ContentData;
}

const Consultation: React.FC<ConsultationProps> = ({ data }) => {
  const { consultation } = data;
  const [showQR, setShowQR] = useState(false);

  // In a real app, you would replace this URL with your actual WeChat QR code image
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChat:fchen2020";

  return (
    <div className="w-full">
        {/* Light Theme Card to match app aesthetic */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-brand-900/5 p-8 md:p-12 group animate-in fade-in slide-in-from-bottom-4 duration-700">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-50 via-transparent to-transparent rounded-full opacity-60 pointer-events-none -mr-20 -mt-20" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-between">
                
                {/* Left Content */}
                <div className="flex-1 space-y-8">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles size={14} className="fill-amber-400 text-amber-500" />
                        Premium Service
                    </div>

                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                            {consultation.title}
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                            {consultation.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {consultation.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="mt-1 p-1 bg-brand-100 rounded-full shrink-0">
                                     <CheckCircle2 size={14} className="text-brand-600" />
                                </div>
                                <span className="text-slate-700 font-medium">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Pricing Card */}
                <div className="shrink-0 w-full lg:w-auto min-w-[320px]">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-accent-500" />
                        
                        <div className="text-center mb-8">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Investment</span>
                            <div className="text-3xl font-bold mt-2 text-slate-900 font-mono tracking-tight">
                                {consultation.price}
                            </div>
                             {/* <div className="text-sm text-slate-500 mt-2 font-medium">Per Session</div> */}
                        </div>

                        <button 
                            onClick={() => setShowQR(true)}
                            className="w-full py-4 px-6 bg-slate-900 hover:bg-brand-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 flex items-center justify-center gap-2 group mb-4"
                        >
                            <QrCode size={18} />
                            {consultation.cta}
                        </button>

                         <p className="text-xs text-slate-400 text-center px-4 leading-relaxed">
                            Via WeChat / Alipay.<br/>
                            Priority scheduling for founders.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                    <button 
                        onClick={() => setShowQR(false)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900">Scan to Connect</h3>
                            <p className="text-sm text-slate-500">Add me on WeChat to schedule your session.</p>
                        </div>
                        
                        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-inner inline-block">
                             <img 
                                src={qrCodeUrl} 
                                alt="Consultation QR Code" 
                                className="w-48 h-48"
                             />
                        </div>

                        <div className="text-xs text-slate-500 font-mono bg-slate-50 py-2 px-4 rounded-lg border border-slate-100">
                            WeChat ID: fchen2020
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Consultation;
