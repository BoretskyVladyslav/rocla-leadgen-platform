import { resolveLocale, type Locale } from "@/lib/i18n";

export type AdvantageIcon = "delivery" | "warranty" | "service";

export interface Dictionary {
  header: {
    catalog: string;
    requestQuote: string;
    language: string;
  };
  hero: {
    brand: string;
    title: string;
    subtitle: string;
    browseCatalog: string;
    requestQuote: string;
    badges: Array<{ label: string; value: string; tone: "gold" | "dark" }>;
    imageAlt: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    requestQuote: string;
    imageFallback: string;
  };
  advantages: {
    eyebrow: string;
    title: string;
    items: Array<{
      icon: AdvantageIcon;
      label: string;
      description: string;
    }>;
  };
  clients: {
    eyebrow: string;
    title: string;
    logos: Array<{ name: string; imageSrc: string }>;
  };
  reviews: {
    eyebrow: string;
    title: string;
    items: Array<{ company: string; author: string; text: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    quantity: string;
    filesLabel: string;
    filesHint: string;
    submit: string;
  };
  product: {
    eyebrow: string;
    requestQuote: string;
    specifications: string;
    imagePlaceholder: string;
    thumbPlaceholder: string;
  };
  footer: {
    tagline: string;
    locale: string;
  };
}

const DICTIONARY_UK: Dictionary = {
  header: {
    catalog: "Каталог",
    requestQuote: "Запит ціни",
    language: "Мова",
  },
  hero: {
    brand: "Rocla",
    title: "Купити роклу — німецька якість для складу",
    subtitle:
      "Гідравлічні рохлі, штабелери та складська техніка з доставкою по Україні, гарантією та офіційним сервісом.",
    browseCatalog: "Перейти до каталогу",
    requestQuote: "Запит ціни",
    badges: [
      { label: "Вантаж", value: "до 2.5 т", tone: "gold" },
      { label: "Вила", value: "1150–1500 мм", tone: "dark" },
      { label: "Гарантія", value: "до 24 міс.", tone: "gold" },
      { label: "Відповідь", value: "за 24 год", tone: "dark" },
    ],
    imageAlt: "Гідравлічна рохля на складі",
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Складська техніка",
    subtitle: "Оберіть модель, щоб відкрити сторінку з характеристиками та формою замовлення.",
    requestQuote: "Запит ціни",
    imageFallback: "Зображення",
  },
  advantages: {
    eyebrow: "Переваги",
    title: "Чому обирають нас",
    items: [
      {
        icon: "delivery",
        label: "Оперативна доставка",
        description:
          "Доставка по Києву в день звернення, по Україні — від 1 дня після оплати з повним комплектом документів.",
      },
      {
        icon: "warranty",
        label: "Гарантія до 24 місяців",
        description:
          "12 місяців базової гарантії; розширена гарантія 24 місяці на штабелери, рокли та навантажувачі.",
      },
      {
        icon: "service",
        label: "Офіційний сервіс",
        description:
          "Стаціонарний і виїзний сервіс по всій Україні, склади комплектуючих для рокл і штабелерів.",
      },
    ],
  },
  clients: {
    eyebrow: "Довіра",
    title: "Наші постійні клієнти",
    logos: [
      { name: "БКЛ", imageSrc: "/images/clients/client-1.jpg" },
      { name: "Пром", imageSrc: "/images/clients/client-2.jpg" },
      { name: "Строймаг", imageSrc: "/images/clients/client-3.jpg" },
      { name: "Партнер 4", imageSrc: "/images/clients/client-4.jpg" },
      { name: "Партнер 5", imageSrc: "/images/clients/client-5.jpg" },
      { name: "Партнер 6", imageSrc: "/images/clients/client-6.jpg" },
    ],
  },
  reviews: {
    eyebrow: "Відгуки",
    title: "Що кажуть клієнти",
    items: [
      {
        company: "ТОВ «ЛАЙФСЕ ЛЛ»",
        author: "Язиджи Ісмет",
        text: "Купували самохідний штабелер. Показали модель до оплати, доставили за 2 дні — чітко й організовано.",
      },
      {
        company: "ТОВ «НОША»",
        author: "Гнатенко Сергій",
        text: "Роклу доставили в Ужгород через два дні. Техніка відмінна, консультація з збірки допомогла.",
      },
      {
        company: "ТОВ «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитро",
        text: "Запропонували варіант із змінною АКБ, показали на складі й навіть тест-драйв. Працюватимемо далі.",
      },
    ],
  },
  faq: {
    eyebrow: "Підтримка",
    title: "Часті запитання",
    items: [
      {
        question: "Які файли можна додати до заявки?",
        answer: "PDF, JPG і PNG — реквізити, креслення чи специфікації в межах типових поштових вкладень.",
      },
      {
        question: "Як швидко відповідаєте на заявки?",
        answer: "Менеджер зв’язується протягом робочого дня, зазвичай протягом 24 годин.",
      },
      {
        question: "Чи є доставка по Україні?",
        answer: "Так. Київ — часто в день звернення; регіони — від 1 дня після оплати з документами.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Замовити консультацію",
    subtitle: "Залиште контакти та корпоративні реквізити (.pdf, .jpg, .png).",
    fullName: "ПІБ",
    email: "Email",
    phone: "Телефон",
    company: "Компанія",
    message: "Повідомлення",
    quantity: "Кількість",
    filesLabel: "Корпоративні реквізити",
    filesHint: "Приймаємо: .pdf, .jpg, .png",
    submit: "Надіслати заявку",
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запит ціни",
    specifications: "Характеристики",
    imagePlaceholder: "Зображення відсутнє",
    thumbPlaceholder: "Мініатюра",
  },
  footer: {
    tagline: "B2B-платформа заявок на складську техніку.",
    locale: "Локаль",
  },
};

const DICTIONARY_RU: Dictionary = {
  header: {
    catalog: "Каталог",
    requestQuote: "Запрос цены",
    language: "Язык",
  },
  hero: {
    brand: "Rocla",
    title: "Купить роклу — немецкое качество для склада",
    subtitle:
      "Гидравлические рохли, штабелёры и складская техника с доставкой по Украине, гарантией и официальным сервисом.",
    browseCatalog: "Перейти в каталог",
    requestQuote: "Запрос цены",
    badges: [
      { label: "Груз", value: "до 2.5 т", tone: "gold" },
      { label: "Вилы", value: "1150–1500 мм", tone: "dark" },
      { label: "Гарантия", value: "до 24 мес.", tone: "gold" },
      { label: "Ответ", value: "за 24 ч", tone: "dark" },
    ],
    imageAlt: "Гидравлическая рохля на складе",
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Складская техника",
    subtitle: "Выберите модель, чтобы открыть страницу с характеристиками и формой заказа.",
    requestQuote: "Запрос цены",
    imageFallback: "Изображение",
  },
  advantages: {
    eyebrow: "Преимущества",
    title: "Почему выбирают нас",
    items: [
      {
        icon: "delivery",
        label: "Оперативная доставка",
        description:
          "Доставка по Киеву в день обращения, по Украине — от 1 дня после оплаты с полным комплектом документов.",
      },
      {
        icon: "warranty",
        label: "Гарантия до 24 месяцев",
        description:
          "12 месяцев базовой гарантии; расширенная гарантия 24 месяца на штабелёры, роклы и погрузчики.",
      },
      {
        icon: "service",
        label: "Официальный сервис",
        description:
          "Стационарный и выездной сервис по всей Украине, склады комплектующих для рокл и штабелёров.",
      },
    ],
  },
  clients: {
    eyebrow: "Доверие",
    title: "Наши постоянные клиенты",
    logos: [
      { name: "БКЛ", imageSrc: "/images/clients/client-1.jpg" },
      { name: "Пром", imageSrc: "/images/clients/client-2.jpg" },
      { name: "Строймаг", imageSrc: "/images/clients/client-3.jpg" },
      { name: "Партнёр 4", imageSrc: "/images/clients/client-4.jpg" },
      { name: "Партнёр 5", imageSrc: "/images/clients/client-5.jpg" },
      { name: "Партнёр 6", imageSrc: "/images/clients/client-6.jpg" },
    ],
  },
  reviews: {
    eyebrow: "Отзывы",
    title: "Что говорят клиенты",
    items: [
      {
        company: "ООО «ЛАЙФСЕ ЛЛ»",
        author: "Языджи Исмет",
        text: "Покупали самоходный штабеллер. Показали модель до оплаты, доставили за 2 дня — чётко и организованно.",
      },
      {
        company: "ООО «НОША»",
        author: "Гнатенко Сергей",
        text: "Роклу доставили в Ужгород через два дня. Техника отличная, консультация по сборке помогла.",
      },
      {
        company: "ООО «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитрий",
        text: "Предложили вариант с переменной АКБ, показали на складе и даже тест-драйв. Будем сотрудничать.",
      },
    ],
  },
  faq: {
    eyebrow: "Поддержка",
    title: "Частые вопросы",
    items: [
      {
        question: "Какие файлы можно приложить к заявке?",
        answer: "PDF, JPG и PNG — реквизиты, чертежи или спецификации в пределах типичных почтовых вложений.",
      },
      {
        question: "Как быстро отвечаете на заявки?",
        answer: "Менеджер связывается в течение рабочего дня, обычно в течение 24 часов.",
      },
      {
        question: "Есть ли доставка по Украине?",
        answer: "Да. Киев — часто в день обращения; регионы — от 1 дня после оплаты с документами.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Заказать консультацию",
    subtitle: "Оставьте контакты и корпоративные реквизиты (.pdf, .jpg, .png).",
    fullName: "ФИО",
    email: "Email",
    phone: "Телефон",
    company: "Компания",
    message: "Сообщение",
    quantity: "Количество",
    filesLabel: "Корпоративные реквизиты",
    filesHint: "Принимаем: .pdf, .jpg, .png",
    submit: "Отправить заявку",
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запрос цены",
    specifications: "Характеристики",
    imagePlaceholder: "Изображение отсутствует",
    thumbPlaceholder: "Миниатюра",
  },
  footer: {
    tagline: "B2B-платформа заявок на складскую технику.",
    locale: "Локаль",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  uk: DICTIONARY_UK,
  ru: DICTIONARY_RU,
};

export function getDictionary(lang: string): Dictionary {
  return DICTIONARIES[resolveLocale(lang)];
}
