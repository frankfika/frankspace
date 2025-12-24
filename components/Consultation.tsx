
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
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-brand-900/5 p-4 sm:p-6 md:p-8 lg:p-12 group animate-in fade-in slide-in-from-bottom-4 duration-700">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-50 via-transparent to-transparent rounded-full opacity-60 pointer-events-none -mr-20 -mt-20" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center lg:items-start justify-between">

                {/* Left Content */}
                <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
                     <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles size={12} className="fill-amber-400 text-amber-500 sm:w-3.5 sm:h-3.5" />
                        Premium Service
                    </div>

                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-2 sm:mb-3 md:mb-4">
                            {consultation.title}
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                            {consultation.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                         {consultation.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="mt-0.5 sm:mt-1 p-0.5 sm:p-1 bg-brand-100 rounded-full shrink-0">
                                     <CheckCircle2 size={12} className="text-brand-600 sm:w-3.5 sm:h-3.5" />
                                </div>
                                <span className="text-slate-700 font-medium text-sm sm:text-base">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Pricing Card */}
                <div className="shrink-0 w-full lg:w-auto lg:min-w-[280px] xl:min-w-[320px]">
                    <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-slate-200 shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-accent-500" />

                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Investment</span>
                            <div className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 text-slate-900 font-mono tracking-tight">
                                {consultation.price}
                            </div>
                             {/* <div className="text-sm text-slate-500 mt-2 font-medium">Per Session</div> */}
                        </div>

                        <button
                            onClick={() => setShowQR(true)}
                            className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-white border-2 border-brand-600 hover:border-brand-700 text-brand-600 hover:text-brand-700 font-bold rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 group mb-3 sm:mb-4 text-sm sm:text-base"
                        >
                            <QrCode size={16} className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]" />
                            {consultation.cta}
                        </button>

                         <p className="text-[10px] sm:text-xs text-slate-400 text-center px-2 sm:px-4 leading-relaxed">
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
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                    <button
                        onClick={() => setShowQR(false)}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    <div className="text-center space-y-4 sm:space-y-6">
                        <div className="space-y-1 sm:space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Scan to Connect</h3>
                            <p className="text-xs sm:text-sm text-slate-500">Add me on WeChat to schedule your session.</p>
                        </div>

                        <div className="bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-slate-100 shadow-inner inline-block">
                             <img
                                src={qrCodeUrl}
                                alt="Consultation QR Code"
                                className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48"
                             />
                        </div>

                        <div className="text-[10px] sm:text-xs text-slate-500 font-mono bg-slate-50 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md sm:rounded-lg border border-slate-100">
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
