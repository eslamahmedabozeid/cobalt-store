import { PortfolioItem } from '@/types';

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'تصميم موقع شركة متكامل - نماء للحلول الذكية',
    tag: 'web',
    categoryName: 'تصميم موقع إلكتروني',
    client: 'شركة نماء للحلول الذكية - الرياض',
    duration: '5 أيام عمل',
    serviceUrl: '/services/website-design',
    desc: 'تصميم موقع تعريفي متكامل سريع متجاوب مع الجوالات، مربوط باستمارة الحجز والواتساب مع تهيئة محركات البحث SEO وشهادة SSL.',
    image: '/assets/cobalt_web_cover_1787772997952.jpg',
    features: ['سرعة تحميل قياسية < 1.2 ثانية', 'تجاوب فائق مع جميع الشاشات', 'ربط فوري بنظام إشعارات الواتساب']
  },
  {
    id: 'portfolio-2',
    title: 'تصميم متجر إلكتروني متكامل - متجر سدير ستايل',
    tag: 'store',
    categoryName: 'المتجر الإلكتروني',
    client: 'متجر سدير ستايل للأزياء - الخبر',
    duration: '6 أيام عمل',
    serviceUrl: '/services/ecommerce-store',
    desc: 'تصميم متجر إلكتروني فائق السرعة والتجاوب مربوط بجميع بوابات الدفع (مدى، Apple Pay) وشركات الشحن ومكتمل بكافة المنتجات.',
    image: '/assets/cobalt_web_cover_1787772997952.jpg',
    features: ['بوابات دفع مدى وApple Pay', 'ربط شركات الشحن وسمسا وأرامكس', 'نظام إدارة المخزون الذكي']
  },
  {
    id: 'portfolio-3',
    title: 'تصاميم وإدارة السوشيال ميديا - عيادات دبي الطبية',
    tag: 'social',
    categoryName: 'السوشيال ميديا',
    client: 'مجموعة عيادات ريم الطبية - دبي',
    duration: '48 ساعة',
    serviceUrl: '/services/social-media-posts',
    desc: 'حزمة منشورات إعلانية مبتكرة للانستغرام والسناب شات مع كتابة المحتوى التسويقي أدت إلى زيادة نسبة الحجوزات بمعدل 40%.',
    image: '/assets/cobalt_social_cover_1787772934272.jpg',
    features: ['هوية بصرية موحدة', 'كتابة محتوى إعلاني جذاب', 'تصاميم بأعلى دقة 4K']
  },
  {
    id: 'portfolio-4',
    title: 'فيديو موشن جرافيك 60 ثانية - تطبيق وصلني',
    tag: 'motion',
    categoryName: 'موشن جرافيك / فيديو',
    client: 'تطبيق وصلني للخدمات اللوجستية',
    duration: '4 أيام عمل',
    serviceUrl: '/services/motion-graphics',
    desc: 'إنتاج فيديو إعلاني موشن جرافيك 60 ثانية يشمل كتابة السيناريو الإعلاني، والتعليق الصوتي الفخم، والتحريك البصري الـ 2D المبتكر.',
    image: '/assets/cobalt_marketing_cover_1787773021459.jpg',
    features: ['تعليق صوتي استوديو احترافي', 'مؤثرات صوتية مرخصة', 'إخراج وتسليم بجودة 4K UHD']
  },
  {
    id: 'portfolio-5',
    title: 'إدارة حملات إعلانية ممولة - براند نايس كير',
    tag: 'marketing',
    categoryName: 'التسويق والإعلانات',
    client: 'براند نايس لمنتجات العناية - جدة',
    duration: 'إطلاق فوري 24 ساعة',
    serviceUrl: '/services/digital-marketing',
    desc: 'إطلاق حملات ممولة موجهة على تيك توك وسناب شات حققت ROAS 4.8x ومضاعفة مبيعات المتجر الإلكتروني 3 أضعاف.',
    image: '/assets/cobalt_marketing_cover_1787773021459.jpg',
    features: ['عائد إعلاني ROAS 4.8x', 'استهداف دقيق للشريحة الشرائية', 'تقارير أداء وتتبع لحظي']
  }
];
