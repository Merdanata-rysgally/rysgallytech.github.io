'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

// Compose email locally; do not transmit to an unverified third-party form owner.

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = fields.subject || 'Rysgally Tehnologiýa';
    const body = `${fields.name}\n${fields.email}\n${fields.phone}\n\n${fields.message}`;
    window.location.href = `mailto:info@rysgallytech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('success');
  };

  const formFields = [
    { key: 0, name: 'name', label: t('name'), placeholder: t('namePlaceholder'), type: 'text', col: 'md:col-span-1' },
    { key: 1, name: 'email', label: t('email'), placeholder: t('emailPlaceholder'), type: 'email', col: 'md:col-span-1' },
    { key: 2, name: 'phone', label: t('phone'), placeholder: t('phonePlaceholder'), type: 'tel', col: 'md:col-span-1' },
    { key: 3, name: 'subject', label: t('subject'), placeholder: t('subjectPlaceholder'), type: 'text', col: 'md:col-span-1' },
  ] as const;

  return (
    <form onSubmit={ handleSubmit } className="flex flex-col gap-5">
      <p className="text-sm text-gray-600">{t('note')}</p>
      {status === 'success' && <p role="status" className="text-sm text-gray-700">{t('success')}</p>}
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
            <label htmlFor={f.name} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              { f.label }
            </label>
            <input
              id={ f.name }
              required={f.name === 'name' || f.name === 'email'}
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
        <label htmlFor="message" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          { t('message') }
        </label>
        <textarea
          id="message"
          required
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
