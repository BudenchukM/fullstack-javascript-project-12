import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5 text-center">
      <h2>{t('notFound.title')}</h2>
      <p>
        {t('notFound.back')}{' '}
        <Link to="/">{t('notFound.main')}</Link>.
      </p>
    </div>
  );
};

export default NotFoundPage;
