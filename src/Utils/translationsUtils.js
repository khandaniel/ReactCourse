import { appTranslations } from '../Translations/appTranslations/';
import { goodsListElementTranslations }
  from '../Translations/goodsListElementTranslations';
import { goodsListFormTranslations }
  from '../Translations/goodsListFormTranslations';

const locale = navigator.language ?? 'en-US';
const translations = {
  ...appTranslations[locale],
  ...goodsListElementTranslations[locale],
  ...goodsListFormTranslations[locale],
};

const __ = (tag) => {
  return (translations[tag]) ? translations[tag] : tag;
};

export default __;
