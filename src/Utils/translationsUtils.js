import { appTranslations } from '../Translations/appTranslations/';
import { goodsListElementTranslations }
  from '../Translations/goodsListElementTranslations';
import { goodsListFormTranslations }
  from '../Translations/goodsListFormTranslations';

const userLocale = navigator.language ?? 'en-US';
const __ = (tag, locale = userLocale) => {
  const translations = {
    ...appTranslations[locale],
    ...goodsListElementTranslations[locale],
    ...goodsListFormTranslations[locale],
  };

  return (translations[tag]) ? translations[tag] : tag;
};

export default __;
