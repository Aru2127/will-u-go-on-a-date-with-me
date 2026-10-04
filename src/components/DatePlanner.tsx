import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { DATE_ACTIVITIES } from '../data/memories';

export interface DatePlanData {
  activity: string;
  activityLabel: string;
  activityEmoji: string;
  date: string;
  time: string;
  customNote?: string;
}

interface DatePlannerProps {
  onPlanConfirmed: (data: DatePlanData) => void;
}

export const DatePlanner: React.FC<DatePlannerProps> = ({ onPlanConfirmed }) => {
  const [selectedActivity, setSelectedActivity] = useState(DATE_ACTIVITIES[0].id);

  // Generate upcoming days for the custom calendar selector
  const generateUpcomingDays = () => {
    const days = [];
    const now = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      days.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return days;
  };

  const upcomingDays = generateUpcomingDays();
  const [selectedDay, setSelectedDay] = useState(upcomingDays[2].fullDate); // default to a few days out
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [specialNote, setSpecialNote] = useState('');

  const timeSlots = [
    '12:30 PM (Lunch)',
    '4:00 PM (Sunset walk)',
    '6:00 PM (Evening)',
    '7:30 PM (Dinner time)',
    '9:00 PM (Late night drive)',
  ];

  const handleConfirm = () => {
    const activityObj = DATE_ACTIVITIES.find((a) => a.id === selectedActivity) || DATE_ACTIVITIES[0];
    const dayObj = upcomingDays.find((d) => d.fullDate === selectedDay) || upcomingDays[0];

    onPlanConfirmed({
      activity: selectedActivity,
      activityLabel: activityObj.label,
      activityEmoji: activityObj.emoji,
      date: `${dayObj.dayName}, ${dayObj.month} ${dayObj.dayNum}`,
      time: selectedTime,
      customNote: specialNote,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 bg-[#F7F2EA] bg-grain select-none">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif italic text-base text-[#76545B]"
          >
            chapter two
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl text-[#292627] font-normal"
          >
            okay, now we actually have to plan this.
          </motion.h2>
          <p className="font-handwriting text-xl text-[#76545B]/80">
            pick whatever you want, you have total control
          </p>
        </div>

        {/* Step 1: What are we doing? */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#292627] uppercase tracking-wider">
            <span>1. what are we doing?</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DATE_ACTIVITIES.map((act) => {
              const isSelected = selectedActivity === act.id;
              return (
                <motion.div
                  key={act.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedActivity(act.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#76545B] shadow-md ring-2 ring-[#76545B]/20'
                      : 'bg-[#FFFDF9]/60 border-[#D9C8B5]/60 hover:bg-[#FFFDF9] hover:border-[#D9C8B5]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-2xl mb-1">{act.emoji}</div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#76545B] text-white flex items-center justify-center">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  <div className="font-serif text-lg text-[#292627] font-medium capitalize">
                    {act.label}
                  </div>
                  <div className="text-xs text-[#76545B] mt-0.5 font-sans leading-tight">
                    {act.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Custom Date Selector */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#292627] uppercase tracking-wider">
            <CalendarIcon size={16} className="text-[#CFA5A1]" />
            <span>2. when?</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {upcomingDays.map((d) => {
              const isSelected = selectedDay === d.fullDate;
              return (
                <button
                  key={d.fullDate}
                  onClick={() => setSelectedDay(d.fullDate)}
                  className={`flex-1 min-w-[70px] py-3 px-2 rounded-xl text-center border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#76545B] text-white border-[#76545B] shadow-md'
                      : 'bg-[#FFFDF9] text-[#292627] border-[#D9C8B5]/60 hover:border-[#76545B]'
                  }`}
                >
                  <div className="text-[11px] uppercase font-mono tracking-wider opacity-80">
                    {d.dayName}
                  </div>
                  <div className="text-xl font-serif font-bold my-0.5">
                    {d.dayNum}
                  </div>
                  <div className="text-[10px] opacity-80">
                    {d.month}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Time Selector */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#292627] uppercase tracking-wider">
            <Clock size={16} className="text-[#CFA5A1]" />
            <span>3. what time?</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FFFDF9] border-[#76545B] text-[#76545B] font-semibold ring-2 ring-[#76545B]/20 shadow-xs'
                      : 'bg-[#FFFDF9]/60 border-[#D9C8B5]/60 text-[#292627] hover:bg-[#FFFDF9]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional cute note */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-medium text-[#76545B] font-sans">
            any special conditions or cute demands? (optional)
          </label>
          <input
            type="text"
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="e.g. you have to buy me dessert or wear a nice shirt..."
            className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#D9C8B5]/70 text-sm text-[#292627] focus:outline-none focus:border-[#76545B] focus:ring-1 focus:ring-[#76545B]"
          />
        </div>

        {/* Confirmation Button */}
        <div className="pt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="px-10 py-4 rounded-full bg-[#76545B] text-white font-serif text-xl tracking-wide shadow-lg hover:shadow-xl hover:bg-[#5b3e45] cursor-pointer transition-all duration-300"
          >
            yes, it's a date ♡
          </motion.button>
          <div className="mt-2 text-xs font-handwriting text-[#CFA5A1]">
            sealed with a promise
          </div>
        </div>
      </div>
    </div>
  );
};
