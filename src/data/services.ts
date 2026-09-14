import { ServiceItem } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'social-media-posts',
    slug: 'social-media-posts',
    title: 'تصميم وإدارة منشورات السوشيال ميديا',
    category: 'social',
    categoryName: 'السوشيال ميديا',
    badge: '⭐ مبيعات وتفاعل',
    delivery: '⚡ تسليم في 48 ساعة',
    rating: 4.95,
    reviewsCount: 64,
    image: '/assets/cobalt_social_cover_1787772934272.jpg',
    priceSAR: 199,
    oldPriceSAR: 350,
    shortDesc: 'تصاميم جرافيك وإدارة احترافية لكافة منصات التواصل لزيادة المبيعات والوصول للجمهور المستهدف.',
    deliverables: [
      'تصاميم مقاسات مخصصة (بوستات، ستوريز، ريلز)',
      'صياغة الكابشن والهاشتاجات النشطة الموجهة',
      'تسليم ملفات الجرافيك بدقة عالية PNG + قوالب التعديل'
    ],
    packageTypes: [
      { id: 'posts_4', name: '4 منشورات احترافية', priceSAR: 199, description: '4 تصاميم بوستات + كتابة كابشن وهاشتاجات' },
      { id: 'posts_8', name: '8 منشورات متكاملة', priceSAR: 349, description: '8 تصاميم بوستات/ستوريز + خطة نشر متكاملة' },
      { id: 'posts_12', name: '12 منشور تسويقي VIP', priceSAR: 480, description: '12 تصميم + هايلايتس + كتابة محتوى بيعي' }
    ],
    addons: [
      { id: 'addon_reels_cover', title: 'تصميم أغطية ريلز وفيديوهات (3 تصاميم)', priceSAR: 80, desc: 'أغلفة جذابة لريلز انستقرام وتيك توك' },
      { id: 'addon_motion_intro', title: 'إنترو موشن جرافيك للشعار (5 ثوانٍ)', priceSAR: 150, desc: 'تحريك شعار براندك باحترافية' },
      { id: 'addon_fast_delivery', title: 'تسليم فوري مستعجل خلال 24 ساعة', priceSAR: 90, desc: 'أولوية تنفيذ عاجلة' }
    ]
  },
  {
    id: 'website-design',
    slug: 'website-design',
    title: 'تصميم وتطوير المواقع الإلكترونية والشركات',
    category: 'web',
    categoryName: 'تصميم موقع إلكتروني',
    badge: '🚀 الأكثر طلباً للشركات',
    delivery: '⚡ تسليم في 5-7 أيام',
    rating: 4.97,
    reviewsCount: 54,
    image: '/assets/cobalt_web_cover_1787772997952.jpg',
    priceSAR: 1499,
    oldPriceSAR: 2400,
    shortDesc: 'تصميم مواقع تعريفية وصفحات هبوط عصرية سريعة، متجاوبة 100% مع كافة الجوالات ومجهزة بالكامل.',
    deliverables: [
      'تصميم عصري متجاوب 100% مع الجوال والشاشات المختلفة',
      'ربط استمارة التواصل والواتساب وخرائط جوجل',
      'استضافة ودومين مجاني للسنة الأولى مع شهادة SSL'
    ],
    packageTypes: [
      { id: 'landing_page', name: 'صفحة هبوط تسويقية (Landing Page)', priceSAR: 999, description: 'صفحة واحدة فائقة الإقناع والسرعة لحملاتك' },
      { id: 'company_site', name: 'موقع شركة متكامل (5-8 صفحات)', priceSAR: 1499, description: 'موقع مؤسسي تعريفي فاخر بكامل الأقسام' },
      { id: 'booking_services', name: 'موقع خدمات وحجوزات متقدم', priceSAR: 1899, description: 'موقع مع نظام حجز واستقبال طلبات أونلاين' }
    ],
    addons: [
      { id: 'addon_multilingual', title: 'إضافة لغة إضافية (إنجليزي / عربي)', priceSAR: 350, desc: 'ترجمة كاملة وضبط واجهة اللغات' },
      { id: 'addon_seo_pro', title: 'تهيئة محركات البحث المتقدمة (SEO Pro)', priceSAR: 250, desc: 'أرشفة جوجل وميتا تاج وسرعة خارقة' },
      { id: 'addon_chat_widget', title: 'تكامل المحادثة الفورية والذكاء الاصطناعي', priceSAR: 180, desc: 'بوت دردشة واستقبال عملاء 24/7' }
    ]
  },
  {
    id: 'ecommerce-store',
    slug: 'ecommerce-store',
    title: 'تصميم وتجهيز المتاجر الإلكترونية المتكاملة',
    category: 'store',
    categoryName: 'المتجر الإلكتروني',
    badge: '🛍️ تجارة إلكترونية متكاملة',
    delivery: '⚡ تسليم في 5-8 أيام',
    rating: 4.98,
    reviewsCount: 68,
    image: '/assets/cobalt_web_cover_1787772997952.jpg',
    priceSAR: 1999,
    oldPriceSAR: 3200,
    shortDesc: 'متجر إلكتروني احترافي متكامل مهيأ للمبيعات، مربوط ببوابات الدفع (مدى، Apple Pay) وشركات الشحن.',
    deliverables: [
      'تجهيز وضبط المنتجات والتصنيفات وسياسات المتجر',
      'ربط بوابات الدفع الإلكتروني (مدى، فيزا، تابي، تمارا)',
      'ربط خيارات وشركات الشحن وحساب الضريبة التلقائي'
    ],
    packageTypes: [
      { id: 'store_starter', name: 'متجر مبتدئ (حتى 50 منتج)', priceSAR: 1999, description: 'إعداد المتجر + ربط الدفع والشحن + ضبط التصنيفات' },
      { id: 'store_pro', name: 'متجر احترافي غير محدود (Pro Store)', priceSAR: 2899, description: 'متجر فاخر غير محدود المنتجات + ثيم مدفوع + ربط التسويق' }
    ],
    addons: [
      { id: 'addon_product_upload', title: 'إدخال وضبط 50 منتج إضافي مع الصور', priceSAR: 300, desc: 'تفريغ وتنسيق صور المنتجات والأسعار' },
      { id: 'addon_tabby_tamara', title: 'توثيق وربط أقساط تابي وتمارا رسمي', priceSAR: 200, desc: 'زيادة المبيعات بنظام الدفع الآجل' },
      { id: 'addon_pixels_tracking', title: 'ربط سناب وتيك توك وفيسبوك بيكسل', priceSAR: 150, desc: 'تتبع شامل للأحداث والتحويلات' }
    ]
  },
  {
    id: 'motion-graphics',
    slug: 'motion-graphics',
    title: 'إنتاج فيديوهات الموشن جرافيك والمونتاج',
    category: 'motion',
    categoryName: 'موشن جرافيك / فيديو',
    badge: '🎬 فيديو إعلاني مبهر',
    delivery: '⚡ تسليم في 3-5 أيام',
    rating: 4.94,
    reviewsCount: 46,
    image: '/assets/cobalt_marketing_cover_1787773021459.jpg',
    priceSAR: 850,
    oldPriceSAR: 1400,
    shortDesc: 'فيديوهات موشن جرافيك 2D/3D إعلانية جذابة مع كتابة السيناريو الاحترافي والتعليق الصوتي الفاخر.',
    deliverables: [
      'كتابة سيناريو إعلاني جذاب (Scriptwriting)',
      'تعليق صوتي فخم بمختلف اللهجات واللغات',
      'تحريك ورسوم بصرية عالية الدقة 4K / Full HD'
    ],
    packageTypes: [
      { id: 'motion_15s', name: 'فيديو إعلاني قصير 15 ثانية', priceSAR: 550, description: 'مناسب لستوريز وتيك توك وسناب شات' },
      { id: 'motion_30s', name: 'فيديو إعلاني قياسي 30 ثانية', priceSAR: 850, description: 'الخيار الأكثر طلباً للشرح والتسويق المتكامل' },
      { id: 'motion_60s', name: 'فيديو تسويقي شامل 60 ثانية', priceSAR: 1450, description: 'شرح مفصل للتطبيقات والمشاريع الكبيرة' }
    ],
    addons: [
      { id: 'addon_multiple_aspects', title: 'تصدير الفيديو بمقاسين مختلفين (عمودي + أفقي)', priceSAR: 120, desc: 'مقاس 9:16 للجوال و16:9 لليوتيوب' },
      { id: 'addon_soundtrack_license', title: 'موسيقى ومؤثرات صوتية مرخصة تجارياً', priceSAR: 100, desc: 'أصوات ومؤثرات حصرية بدون حقوق' },
      { id: 'addon_english_subtitles', title: 'ترجمة نصية وتفريغ كابشن إنجليزي', priceSAR: 80, desc: 'إضافة نصوص مترجمة متحركة' }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'إدارة حملات التسويق الرقمي والإعلانات الممولة',
    category: 'marketing',
    categoryName: 'التسويق والإعلانات',
    badge: '📈 مضاعفة المبيعات',
    delivery: '⚡ إطلاق فوري خلال 24 ساعة',
    rating: 4.96,
    reviewsCount: 59,
    image: '/assets/cobalt_marketing_cover_1787773021459.jpg',
    priceSAR: 750,
    oldPriceSAR: 1200,
    shortDesc: 'إطلاق وإدارة الحملات الإعلانية على سناب شات، تيك توك، انستقرام، وجوجل لتحقيق أعلى عائد مبيعات.',
    deliverables: [
      'تحديد واستهداف الجمهور والشرائح الأكثر شراءً بدقة',
      'إعداد وتجهيز الإعلانات والتتبع التحليلي المباشر',
      'تقارير أداء يومية وأسبوعية لتحسين تكلفة النتائج'
    ],
    packageTypes: [
      { id: 'campaign_single', name: 'إدارة حملة منصة واحدة (سناب أو تيك توك)', priceSAR: 750, description: 'استهداف دقيق + إطلاق الإعلانات + تحسين مستمر أسبوعين' },
      { id: 'campaign_multi', name: 'إدارة حملات متكاملة متعددة المنصات', priceSAR: 1400, description: 'إدارة إعلانية متكاملة لـ 3 منصات لمدة شهر كامل' }
    ],
    addons: [
      { id: 'addon_ad_creatives', title: 'تصميم 4 بنرات إعلانية احترافية للحملة', priceSAR: 220, desc: 'تصاميم موجهة لرفع نسبة النقر CTR' },
      { id: 'addon_competitor_audit', title: 'تحليل المنافسين وسلوك السوق المتعمق', priceSAR: 180, desc: 'تقرير شامل عن إعلانات المنافسين وثغرات السوق' }
    ]
  }
];
