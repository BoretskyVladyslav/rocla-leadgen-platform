import { resolveLocale, type Locale } from "@/lib/i18n";

export interface Dictionary {
  header: {
    brand: string;
    tagline: string;
    nav: {
      about: string;
      catalog: string;
      promos: string;
      services: string;
      reviews: string;
      contacts: string;
    };
    phone: string;
    requestCall: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    submit: string;
    success: string;
    imageAlt: string;
    errors: {
      fullName: string;
      phone: string;
    };
  };
  categories: {
    title: string;
    items: Array<{
      title: string;
      imageSrc: string;
      imageAlt: string;
      productSlug?: string;
    }>;
  };
  catalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    requestQuote: string;
    imageFallback: string;
  };
  advantages: {
    title: string;
    items: Array<{
      label: string;
      description: string;
    }>;
  };
  clients: {
    title: string;
    logos: Array<{ name: string }>;
  };
  caseStudy: {
    title: string;
    paragraphs: string[];
    readMore: string;
    imageSrc: string;
    imageAlt: string;
  };
  delivery: {
    title: string;
    from: string;
    to: string;
    phone: string;
    submit: string;
    success: string;
    partners: string[];
    errors: {
      from: string;
      to: string;
      phone: string;
    };
  };
  reviews: {
    title: string;
    items: Array<{
      company: string;
      author: string;
      text: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  };
  faq: {
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
    citiesLabel: string;
    citiesHint: string;
    cities: Array<{ id: string; label: string }>;
    filesLabel: string;
    filesHint: string;
    filesBrowse: string;
    filesDrag: string;
    filesMaxSize: string;
    submit: string;
    successTitle: string;
    successBody: string;
    successReset: string;
    errors: {
      fullName: string;
      email: string;
      phone: string;
      fileType: string;
      fileSize: string;
    };
  };
  product: {
    eyebrow: string;
    requestQuote: string;
    specifications: string;
    imagePlaceholder: string;
    thumbPlaceholder: string;
  };
  footer: {
    brand: string;
    phone: string;
    email: string;
    catalogTitle: string;
    catalogLinks: Array<{ label: string; href: string }>;
    navTitle: string;
    navLinks: Array<{ label: string; href: string }>;
    addressTitle: string;
    address: string;
    copyright: string;
  };
}

const LEAD_CITIES_UK: Dictionary["leadForm"]["cities"] = [
  { id: "dnipro", label: "Дніпро" },
  { id: "kharkiv", label: "Харків" },
  { id: "kyiv", label: "Київ" },
  { id: "odesa", label: "Одеса" },
  { id: "zaporizhzhia", label: "Запоріжжя" },
];

const LEAD_CITIES_RU: Dictionary["leadForm"]["cities"] = [
  { id: "dnipro", label: "Днепр" },
  { id: "kharkiv", label: "Харьков" },
  { id: "kyiv", label: "Киев" },
  { id: "odesa", label: "Одесса" },
  { id: "zaporizhzhia", label: "Запорожье" },
];

const CATEGORY_IMAGES = {
  pallet: "/images/products/pallet-truck-2t-1.jpg",
  stacker: "/images/products/pallet-truck-long-1.jpg",
  table: "/images/products/pallet-truck-2t-2.jpg",
  service: "/images/products/pallet-truck-long-2.jpg",
  reach: "/images/products/pallet-truck-heavy-1.jpg",
  forklift: "/images/products/pallet-truck-heavy-2.jpg",
  lift: "/images/products/pallet-truck-2t-1.jpg",
  parts: "/images/products/pallet-truck-long-2.jpg",
} as const;

const DICTIONARY_UK: Dictionary = {
  header: {
    brand: "KAISER",
    tagline: "Складська техніка",
    nav: {
      about: "Про компанію",
      catalog: "Каталог",
      promos: "Акції",
      services: "Послуги",
      reviews: "Відгуки",
      contacts: "Контакти",
    },
    phone: "+38 044 000 00 00",
    requestCall: "Замовити дзвінок",
    language: "Мова",
  },
  hero: {
    title: "Купити роклу, рохлі німецька якість",
    subtitle: "20 років на ринку в Україні",
    name: "Ім’я",
    phone: "Телефон",
    submit: "Підібрати",
    success: "Заявку прийнято. Менеджер зателефонує.",
    imageAlt: "Складська техніка KAISER",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  categories: {
    title: "Каталог техніки KAISER",
    items: [
      {
        title: "Гідравлічні візки (рохлі)",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гідравлічна рохля",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелери",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелер",
      },
      {
        title: "Гідравлічні столи",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гідравлічний стіл",
      },
      {
        title: "Обслуговування / колеса",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Обслуговування складської техніки",
      },
      {
        title: "Річтраки",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Річтрак",
      },
      {
        title: "Навантажувачі",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Навантажувач",
      },
      {
        title: "Підйомники / вишки",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Підйомник",
      },
      {
        title: "Запчастини та аксесуари",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчастини для рокл",
      },
    ],
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Каталог техніки KAISER",
    subtitle: "Оберіть модель, щоб відкрити сторінку з характеристиками та формою замовлення.",
    requestQuote: "Запит ціни",
    imageFallback: "Зображення",
  },
  advantages: {
    title: "Ваші переваги в KAISER",
    items: [
      {
        label: "Німецька якість",
        description:
          "Комплектуючі та гідравліка європейського класу для щоденної складської роботи.",
      },
      {
        label: "20 років на ринку України",
        description:
          "Постачаємо рокли, штабелери та навантажувачі підприємствам по всій країні.",
      },
      {
        label: "Доставка по Україні",
        description:
          "Київ — часто в день звернення; регіони — від 1 дня після оплати з документами.",
      },
      {
        label: "Офіційний сервіс",
        description:
          "Стаціонарний і виїзний ремонт, діагностика гідравліки та заміна вузлів.",
      },
      {
        label: "Гарантія до 24 місяців",
        description:
          "Базова гарантія 12 місяців; розширена — на штабелери, рокли та навантажувачі.",
      },
      {
        label: "Склад запчастин",
        description:
          "Колеса, підшипники, гідравлічні вузли та витратні матеріали в наявності.",
      },
      {
        label: "Підбір під задачу",
        description:
          "Менеджер підбере вантажопідйомність, довжину вил і комплектацію під ваш склад.",
      },
      {
        label: "Документи для юросіб",
        description:
          "Рахунок, видаткова, гарантійний талон і повний пакет для бухгалтерії.",
      },
    ],
  },
  clients: {
    title: "Наші постійні клієнти",
    logos: [
      { name: "McDonald's" },
      { name: "Нова Пошта" },
      { name: "OKKO" },
      { name: "Roshen" },
      { name: "Укрпошта" },
    ],
  },
  caseStudy: {
    title: "4 тисячі сімей мені вдячні",
    paragraphs: [
      "Щодня наша техніка працює на складах, у логістичних хабах і на рампі виробництва — там, де від надійної рокли залежить зміна цілої команди.",
      "Ми не просто продаємо гідравлічні візки. Ми закриваємо простої, підбираємо вузли під навантаження і тримаємо сервіс так, щоб зміна не зупинялась.",
      "За 20 років сотні підприємств стали постійними клієнтами. За кожним контрактом — люди, які годують свої сім’ї стабільною роботою на складі.",
    ],
    readMore: "Читати далі",
    imageSrc: "/images/hero/rokla-hero.jpg",
    imageAlt: "Робота з роклою на складі",
  },
  delivery: {
    title: "Розрахувати вартість доставки",
    from: "Звідки",
    to: "Куди",
    phone: "Телефон",
    submit: "Розрахувати",
    success: "Заявку на розрахунок прийнято.",
    partners: ["Ford", "Nokia", "Nike", "Shell", "Nivea", "Bosch"],
    errors: {
      from: "Вкажіть місто відправлення.",
      to: "Вкажіть місто доставки.",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  reviews: {
    title: "Відгуки наших клієнтів",
    items: [
      {
        company: "ТОВ «ЛАЙФСЕ ЛЛ»",
        author: "Язиджи Ісмет",
        text: "Купували самохідний штабелер. Показали модель до оплати, доставили за 2 дні — чітко й організовано.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Техніка KAISER у клієнта",
      },
      {
        company: "ТОВ «НОША»",
        author: "Гнатенко Сергій",
        text: "Роклу доставили в Ужгород через два дні. Техніка відмінна, консультація зі збірки допомогла.",
        imageSrc: "/images/clients/client-2.jpg",
        imageAlt: "Рокла в роботі на складі клієнта",
      },
      {
        company: "ТОВ «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитро",
        text: "Запропонували варіант із змінною АКБ, показали на складі й навіть тест-драйв. Працюватимемо далі.",
        imageSrc: "/images/clients/client-3.jpg",
        imageAlt: "Навантажувач на об’єкті клієнта",
      },
    ],
  },
  faq: {
    title: "Часті запитання",
    items: [
      {
        question: "Ємність і підйомність рокли?",
        answer:
          "Базові гідравлічні рохлі — 2000 кг, посилені моделі — до 2500 кг. Довжина вил 1150–1500 мм. Точні параметри підтверджуємо під вашу палету.",
      },
      {
        question: "Чи є доставка по Україні?",
        answer:
          "Так. Київ — часто в день звернення; регіони — від 1 дня після оплати з повним комплектом документів.",
      },
      {
        question: "Яка гарантія на техніку?",
        answer:
          "12 місяців базової гарантії. Для штабелерів, рокл і навантажувачів доступна розширена гарантія до 24 місяців.",
      },
      {
        question: "Які файли можна додати до заявки?",
        answer:
          "PDF, JPG і PNG — реквізити, креслення чи специфікації в межах типових поштових вкладень.",
      },
      {
        question: "Як швидко відповідаєте на заявки?",
        answer:
          "Менеджер зв’язується протягом робочого дня, зазвичай протягом 24 годин.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Надіслати реквізити",
    subtitle: "Залиште контакти та файл з реквізитами компанії (.pdf, .jpg, .png).",
    fullName: "ПІБ",
    email: "Email",
    phone: "Телефон",
    company: "Компанія",
    message: "Повідомлення",
    quantity: "Кількість",
    citiesLabel: "Місто",
    citiesHint: "Швидка доставка в:",
    cities: LEAD_CITIES_UK,
    filesLabel: "Прикріпити файл з реквізитами",
    filesHint: "Приймаємо: .pdf, .jpg, .png",
    filesBrowse: "Обрати файли",
    filesDrag: "Перетягніть файли сюди",
    filesMaxSize: "До 10 МБ на файл",
    submit: "Надіслати заявку",
    successTitle: "Заявка успішно відправлена",
    successBody: "Менеджер зв’яжеться з вами найближчим часом у робочі години.",
    successReset: "Надіслати ще одну заявку",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      email: "Вкажіть коректний email.",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
      fileType: "Лише PDF, JPG або PNG.",
      fileSize: "Файл перевищує 10 МБ.",
    },
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запит ціни",
    specifications: "Характеристики",
    imagePlaceholder: "Зображення відсутнє",
    thumbPlaceholder: "Мініатюра",
  },
  footer: {
    brand: "KAISER",
    phone: "+38 044 000 00 00",
    email: "sales@kaiser.ua",
    catalogTitle: "Каталог",
    catalogLinks: [
      { label: "Рохлі", href: "#catalog" },
      { label: "Штабелери", href: "#catalog" },
      { label: "Навантажувачі", href: "#catalog" },
      { label: "Запчастини", href: "#catalog" },
    ],
    navTitle: "Навігація",
    navLinks: [
      { label: "Про компанію", href: "#about" },
      { label: "Послуги", href: "#services" },
      { label: "Відгуки", href: "#reviews" },
      { label: "Контакти", href: "#contact" },
    ],
    addressTitle: "Адреса",
    address: "Україна, м. Київ, склад і сервіс KAISER",
    copyright: "© KAISER. Усі права захищено.",
  },
};

const DICTIONARY_RU: Dictionary = {
  header: {
    brand: "KAISER",
    tagline: "Складская техника",
    nav: {
      about: "О компании",
      catalog: "Каталог",
      promos: "Акции",
      services: "Услуги",
      reviews: "Отзывы",
      contacts: "Контакты",
    },
    phone: "+38 044 000 00 00",
    requestCall: "Заказать звонок",
    language: "Язык",
  },
  hero: {
    title: "Купить роклу, рохли немецкое качество",
    subtitle: "20 лет на рынке в Украине",
    name: "Имя",
    phone: "Телефон",
    submit: "Подобрать",
    success: "Заявка принята. Менеджер перезвонит.",
    imageAlt: "Складская техника KAISER",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  categories: {
    title: "Каталог техники KAISER",
    items: [
      {
        title: "Гидравлические тележки (рохли)",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гидравлическая рохля",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелёры",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелёр",
      },
      {
        title: "Гидравлические столы",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гидравлический стол",
      },
      {
        title: "Обслуживание / колёса",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Обслуживание складской техники",
      },
      {
        title: "Ричтраки",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Ричтрак",
      },
      {
        title: "Погрузчики",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Погрузчик",
      },
      {
        title: "Подъёмники / вышки",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Подъёмник",
      },
      {
        title: "Запчасти и аксессуары",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчасти для рокл",
      },
    ],
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Каталог техники KAISER",
    subtitle: "Выберите модель, чтобы открыть страницу с характеристиками и формой заказа.",
    requestQuote: "Запрос цены",
    imageFallback: "Изображение",
  },
  advantages: {
    title: "Ваши преимущества в KAISER",
    items: [
      {
        label: "Немецкое качество",
        description:
          "Комплектующие и гидравлика европейского класса для ежедневной складской работы.",
      },
      {
        label: "20 лет на рынке Украины",
        description:
          "Поставляем роклы, штабелёры и погрузчики предприятиям по всей стране.",
      },
      {
        label: "Доставка по Украине",
        description:
          "Киев — часто в день обращения; регионы — от 1 дня после оплаты с документами.",
      },
      {
        label: "Официальный сервис",
        description:
          "Стационарный и выездной ремонт, диагностика гидравлики и замена узлов.",
      },
      {
        label: "Гарантия до 24 месяцев",
        description:
          "Базовая гарантия 12 месяцев; расширенная — на штабелёры, роклы и погрузчики.",
      },
      {
        label: "Склад запчастей",
        description:
          "Колёса, подшипники, гидравлические узлы и расходники в наличии.",
      },
      {
        label: "Подбор под задачу",
        description:
          "Менеджер подберёт грузоподъёмность, длину вил и комплектацию под ваш склад.",
      },
      {
        label: "Документы для юрлиц",
        description:
          "Счёт, расходная, гарантийный талон и полный пакет для бухгалтерии.",
      },
    ],
  },
  clients: {
    title: "Наши постоянные клиенты",
    logos: [{ name: "McDonald's" }, { name: "Новая Почта" }, { name: "OKKO" }, { name: "Roshen" }, { name: "Укрпочта" }],
  },
  caseStudy: {
    title: "4 тысячи семей мне благодарны",
    paragraphs: [
      "Каждый день наша техника работает на складах, в логистических хабах и на рампе производства — там, где от надёжной роклы зависит смена целой команды.",
      "Мы не просто продаём гидравлические тележки. Мы закрываем простои, подбираем узлы под нагрузку и держим сервис так, чтобы смена не останавливалась.",
      "За 20 лет сотни предприятий стали постоянными клиентами. За каждым контрактом — люди, которые кормят свои семьи стабильной работой на складе.",
    ],
    readMore: "Читать далее",
    imageSrc: "/images/hero/rokla-hero.jpg",
    imageAlt: "Работа с роклой на складе",
  },
  delivery: {
    title: "Рассчитать стоимость доставки",
    from: "Откуда",
    to: "Куда",
    phone: "Телефон",
    submit: "Рассчитать",
    success: "Заявка на расчёт принята.",
    partners: ["Ford", "Nokia", "Nike", "Shell", "Nivea", "Bosch"],
    errors: {
      from: "Укажите город отправления.",
      to: "Укажите город доставки.",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  reviews: {
    title: "Отзывы наших клиентов",
    items: [
      {
        company: "ООО «ЛАЙФСЕ ЛЛ»",
        author: "Языджи Исмет",
        text: "Покупали самоходный штабеллер. Показали модель до оплаты, доставили за 2 дня — чётко и организованно.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Техника KAISER у клиента",
      },
      {
        company: "ООО «НОША»",
        author: "Гнатенко Сергей",
        text: "Роклу доставили в Ужгород через два дня. Техника отличная, консультация по сборке помогла.",
        imageSrc: "/images/clients/client-2.jpg",
        imageAlt: "Рокла в работе на складе клиента",
      },
      {
        company: "ООО «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитрий",
        text: "Предложили вариант с переменной АКБ, показали на складе и даже тест-драйв. Будем сотрудничать.",
        imageSrc: "/images/clients/client-3.jpg",
        imageAlt: "Погрузчик на объекте клиента",
      },
    ],
  },
  faq: {
    title: "Часто задаваемые вопросы",
    items: [
      {
        question: "Ёмкость и подъёмность роклы?",
        answer:
          "Базовые гидравлические рохли — 2000 кг, усиленные модели — до 2500 кг. Длина вил 1150–1500 мм. Точные параметры подтверждаем под ваш поддон.",
      },
      {
        question: "Есть ли доставка по Украине?",
        answer:
          "Да. Киев — часто в день обращения; регионы — от 1 дня после оплаты с полным комплектом документов.",
      },
      {
        question: "Какая гарантия на технику?",
        answer:
          "12 месяцев базовой гарантии. Для штабелёров, рокл и погрузчиков доступна расширенная гарантия до 24 месяцев.",
      },
      {
        question: "Какие файлы можно приложить к заявке?",
        answer:
          "PDF, JPG и PNG — реквизиты, чертежи или спецификации в пределах типичных почтовых вложений.",
      },
      {
        question: "Как быстро отвечаете на заявки?",
        answer:
          "Менеджер связывается в течение рабочего дня, обычно в течение 24 часов.",
      },
    ],
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Отправить реквизиты",
    subtitle: "Оставьте контакты и файл с реквизитами компании (.pdf, .jpg, .png).",
    fullName: "ФИО",
    email: "Email",
    phone: "Телефон",
    company: "Компания",
    message: "Сообщение",
    quantity: "Количество",
    citiesLabel: "Город",
    citiesHint: "Быстрая доставка в:",
    cities: LEAD_CITIES_RU,
    filesLabel: "Прикрепить файл с реквизитами",
    filesHint: "Принимаем: .pdf, .jpg, .png",
    filesBrowse: "Выбрать файлы",
    filesDrag: "Перетащите файлы сюда",
    filesMaxSize: "До 10 МБ на файл",
    submit: "Отправить заявку",
    successTitle: "Заявка успешно отправлена",
    successBody: "Менеджер свяжется с вами в ближайшее время в рабочие часы.",
    successReset: "Отправить ещё одну заявку",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      email: "Укажите корректный email.",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
      fileType: "Только PDF, JPG или PNG.",
      fileSize: "Файл превышает 10 МБ.",
    },
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запрос цены",
    specifications: "Характеристики",
    imagePlaceholder: "Изображение отсутствует",
    thumbPlaceholder: "Миниатюра",
  },
  footer: {
    brand: "KAISER",
    phone: "+38 044 000 00 00",
    email: "sales@kaiser.ua",
    catalogTitle: "Каталог",
    catalogLinks: [
      { label: "Рохли", href: "#catalog" },
      { label: "Штабелёры", href: "#catalog" },
      { label: "Погрузчики", href: "#catalog" },
      { label: "Запчасти", href: "#catalog" },
    ],
    navTitle: "Навигация",
    navLinks: [
      { label: "О компании", href: "#about" },
      { label: "Услуги", href: "#services" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Контакты", href: "#contact" },
    ],
    addressTitle: "Адрес",
    address: "Украина, г. Киев, склад и сервис KAISER",
    copyright: "© KAISER. Все права защищены.",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  uk: DICTIONARY_UK,
  ru: DICTIONARY_RU,
};

export function getDictionary(lang: string): Dictionary {
  return DICTIONARIES[resolveLocale(lang)];
}
