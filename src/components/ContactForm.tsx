'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

// ▶ Replace with your Formspree form ID (from formspree.io/forms)
const FORMSPREE_ID = 'mkovjpvd';

type Status = 'idle' | 'sending' | 'success' | 'error';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
  }),
};

const inputBase =
  'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#3fbad2] focus:bg-white focus:ring-2 focus:ring-[#3fbad2]/20 resize-none';

export const ContactForm: React.FC = () => {
  const t = useTranslations('contact.form');

  const [status, setStatus] = useState<Status>('idle');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={ { opacity: 0, scale: 0.97 } }
        animate={ { opacity: 1, scale: 1 } }
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-[#3fbad2]/15 flex items-center justify-center">
          <CheckCircle className="text-[#3fbad2]" size={ 28 } />
        </div>
        <p className="text-gray-900 font-medium text-lg">{ t('success') }</p>
      </motion.div>
    );
  }

  const formFields = [
    { key: 0, name: 'name', label: t('name'), placeholder: t('namePlaceholder'), type: 'text', col: 'md:col-span-1' },
    { key: 1, name: 'email', label: t('email'), placeholder: t('emailPlaceholder'), type: 'email', col: 'md:col-span-1' },
    { key: 2, name: 'phone', label: t('phone'), placeholder: t('phonePlaceholder'), type: 'tel', col: 'md:col-span-1' },
    { key: 3, name: 'subject', label: t('subject'), placeholder: t('subjectPlaceholder'), type: 'text', col: 'md:col-span-1' },
  ] as const;

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        { formFields.map((f) => (
          <motion.div
            key={ f.key }
            custom={ f.key }
            variants={ fadeUp }
            initial="hidden"
            whileInView="visible"
            viewport={ { once: true } }
            className={ `flex flex-col gap-1.5 ${f.col}` }
          >
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              { f.label }
            </label>
            <input
              name={ f.name }
              type={ f.type }
              placeholder={ f.placeholder }
              value={ fields[f.name] }
              onChange={ handleChange }
              className={ inputBase }
              autoComplete="off"
            />
          </motion.div>
        )) }
      </div>

      <motion.div
        custom={ 4 }
        variants={ fadeUp }
        initial="hidden"
        whileInView="visible"
        viewport={ { once: true } }
        className="flex flex-col gap-1.5"
      >
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          { t('message') }
        </label>
        <textarea
          name="message"
          rows={ 5 }
          placeholder={ t('messagePlaceholder') }
          value={ fields.message }
          onChange={ handleChange }
          className={ inputBase }
        />
      </motion.div>

      { status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={ 15 } />
          { t('error') }
        </div>
      ) }

      <motion.div
        custom={ 5 }
        variants={ fadeUp }
        initial="hidden"
        whileInView="visible"
        viewport={ { once: true } }
      >
        <button
          type="submit"
          disabled={ status === 'sending' }
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm
                     bg-[#3fbad2] text-black hover:bg-[#7ee8f8] disabled:opacity-60
                     transition-colors duration-200"
        >
          { status === 'sending' ? (
            t('sending')
          ) : (
            <>
              { t('submit') }
              <Send
                size={ 15 }
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          ) }
        </button>
      </motion.div>
    </form>
  );
};
