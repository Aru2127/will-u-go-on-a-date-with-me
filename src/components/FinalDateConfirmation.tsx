import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Heart, RotateCcw } from 'lucide-react';
import { DatePlanData } from './DatePlanner';

interface FinalDateConfirmationProps {
  plan: DatePlanData;
  onRestart: () => void;
}

export const FinalDateConfirmation: React.FC<FinalDateConfirmationProps> = ({
  plan,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Hey Vivaan! It's a date ♡\nActivity: ${plan.activityEmoji} ${plan.activityLabel}\nWhen: ${plan.date} at ${plan.time}${plan.customNote ? `\nDemand: "${plan.customNote}"` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center bg-[#F7F2EA] bg-grain select-none">
      <div className="max-w-md w-full mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="space-y-2"
        >
          <div className="text-xs uppercase font-mono tracking-widest text-[#76545B]">
            sealed & official
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal">
            it's official.
          </h2>
        </motion.div>

        {/* Vintage Ticket / Memory Pass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative bg-[#FFFDF9] p-6 sm:p-8 rounded-2xl border border-[#D9C8B5]/70 shadow-lg space-y-6 text-left"
        >
          {/* Top ticket header */}
          <div className="flex items-center justify-between border-b border-[#D9C8B5]/40 pb-4">
            <div className="font-serif text-xl font-bold tracking-wider text-[#292627]">
              AKSHITA + VIVAAN
            </div>
            <div className="w-8 h-8 rounded-full bg-[#E9C9C3]/40 flex items-center justify-center text-[#76545B]">
              <Heart size={16} className="fill-current" />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-sans uppercase tracking-wider text-[#76545B]">
                the plan
              </div>
              <div className="font-serif text-xl text-[#292627] flex items-center gap-2 mt-0.5 capitalize">
                <span>{plan.activityEmoji}</span>
                <span>{plan.activityLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#76545B]">
                  date
                </div>
                <div className="font-serif text-lg text-[#292627] mt-0.5">
                  {plan.date}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#76545B]">
                  time
                </div>
                <div className="font-serif text-lg text-[#292627] mt-0.5">
                  {plan.time}
                </div>
              </div>
            </div>

            {plan.customNote && (
              <div className="pt-2 border-t border-[#D9C8B5]/30">
                <div className="text-[11px] font-sans uppercase tracking-wider text-[#76545B]">
                  note
                </div>
                <div className="font-handwriting text-lg text-[#292627] mt-0.5">
                  "{plan.customNote}"
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-dashed border-[#D9C8B5]/60 flex items-center justify-between text-xs text-[#76545B] font-mono">
            <span>PASS #001</span>
            <span>NON-REFUNDABLE ♡</span>
          </div>
        </motion.div>

        {/* Peaceful Closing Prose */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="space-y-4 pt-2"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#292627]">
            one little date.
          </p>
          <p className="font-serif italic text-lg text-[#76545B]">
            hopefully the first of many.
          </p>
          <p className="font-handwriting text-3xl sm:text-4xl text-[#76545B] pt-2">
            i love you. ♡
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#FFFDF9] border border-[#D9C8B5] text-[#76545B] hover:text-[#292627] hover:bg-[#F2E9DD] text-xs font-medium flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to clipboard!' : 'Copy Date Details'}</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-[#76545B]/80 hover:text-[#292627] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Relive Memories</span>
          </button>
        </div>
      </div>
    </div>
  );
};
