# Backend Order POST Contract

## 1. Scope

This document defines the **single POST request** the Cobalt frontend will send when a customer submits an order / service request.

| In scope | Out of scope |
| -------- | ------------ |
| Frontend → Backend `POST` order payload | Any `GET` APIs |
| Data the frontend already collects | Backend providing services/packages to FE |
| Exact IDs/fields from frontend source | Admin / auth / payment / status APIs |
| Client-side prices marked as untrusted | Database / backend architecture |

**Architecture rule**

- The **frontend** displays services, packages, add-ons, questionnaires, calculator, and bundles; collects all inputs; builds the payload.
- The **backend** receives the POST, validates it, recalculates prices, and stores/processes the order.
- The backend does **not** need GET endpoints to discover what the customer selected — that data is inside the POST body.

**Current submission behavior (as implemented today)**

There is **no HTTP POST** yet. Checkout builds a WhatsApp message from cart + customer form (`CheckoutModal`). Cart lines are shaped by `CartItem` / `addToCart` (`src/types/index.ts`, `src/context/CartContext.tsx`).

This document describes the POST body the frontend should send, based on data the frontend **already has**, without inventing new services, IDs, or fields.

---

## 2. Endpoint

```http
POST /api/orders
```

This is a **placeholder route**. The backend developer may change the path to match their API conventions. The request **body contract** below is what matters.

---

## 3. Request Headers

| Header | Required | Notes |
| ------ | -------: | ----- |
| `Content-Type: application/json` | Yes | JSON body |

No authentication headers exist in the frontend today. Do not invent auth for this contract.

---

## 4. Complete Request Body

```json
{
  "customer": {
    "fullName": "سارة الدوسري",
    "phone": "+966512345678",
    "email": "sara@example.com",
    "notes": "يفضل التواصل مساءً"
  },
  "paymentMethod": "mada",
  "currency": "SAR",
  "couponCode": "COBALT20",
  "items": [
    {
      "serviceId": "social-media-posts",
      "packageId": "posts_8",
      "addonIds": ["addon_fast_delivery"],
      "quantity": 1,
      "details": {
        "الخدمة": "السوشيال ميديا (تصميم وإدارة محتوى)",
        "المنصات المطلوبة": "انستقرام Instagram",
        "مجال النشاط": "متجر تجميل",
        "الجمهور المستهدف": "نساء 18-35",
        "نوع الخدمة": "محتوى + تصميم",
        "الهدف الرئيسي": "مبيعات Direct Sales, انتشار Brand Awareness",
        "أهم الخدمات والمنتجات": "سيروم",
        "هل توجد عروض؟": "لا توجد عروض",
        "اللغة": "العربية (Arabic)",
        "Tone of Voice": "عصري وشبابي",
        "روابط الحسابات الحالية": "غير مدخل",
        "الشعار المرفوع": "سيتم إرساله لاحقاً",
        "ملفات الهوية والمرفقات": "لا يوجد",
        "الحسابات المرجعية": "لا يوجد"
      },
      "serviceTitle": "تصميم وإدارة منشورات السوشيال ميديا",
      "selectedOption": "8 منشورات متكاملة",
      "selectedAddons": ["تسليم فوري مستعجل خلال 24 ساعة"],
      "unitPriceSAR": 439,
      "notes": "باقة: 8 منشورات متكاملة",
      "image": "/assets/cobalt_social_cover_1787772934272.jpg",
      "uploadedFiles": []
    }
  ],
  "clientPricing": {
    "subtotalSAR": 439,
    "discountPercentage": 20,
    "discountSAR": 88,
    "grandTotalSAR": 351
  }
}
```

### Field categories in each item

| Category | Fields | Backend trust |
| -------- | ------ | ------------- |
| **Business / input** | `serviceId`, `packageId`, `addonIds`, `quantity`, `details`, calculator structured fields (when present), `couponCode`, `customer` | Authoritative for “what was selected” |
| **Display / derived** | `serviceTitle`, `selectedOption`, `selectedAddons` (titles), `image`, `notes`, `unitPriceSAR`, `clientPricing.*` | Non-authoritative; for display/audit only |

---

## 5. Request Field Reference

### Top level

| Field | Type | Required | Source | Description |
| ----- | ---- | -------: | ------ | ----------- |
| `customer.fullName` | string | Yes | `CheckoutModal` | Customer name |
| `customer.phone` | string | Yes | `CheckoutModal` | Mobile number |
| `customer.email` | string | No* | `CheckoutModal` | Email (*HTML `required` exists; JS submit only enforces name + phone) |
| `customer.notes` | string | No | `CheckoutModal` | Checkout notes |
| `paymentMethod` | string | Yes (always set) | `CheckoutModal` default | Currently always `"mada"` (payment UI commented out) |
| `currency` | `"SAR"` \| `"USD"` \| `"AED"` \| `"EGP"` | Yes | `CurrencyContext` | UI display currency |
| `couponCode` | string \| `null` | No | `CartState.appliedCoupon` | Exact codes: `COBALT20`, `WELCOME10`, `VIP25` |
| `items` | array | Yes (≥1) | `CartState.items` | One or more cart lines |
| `clientPricing.subtotalSAR` | number | No | Cart math | **CLIENT-SIDE / NOT TRUSTED** |
| `clientPricing.discountPercentage` | number | No | Cart state | **CLIENT-SIDE / NOT TRUSTED** |
| `clientPricing.discountSAR` | number | No | Cart math | **CLIENT-SIDE / NOT TRUSTED** |
| `clientPricing.grandTotalSAR` | number | No | Cart math | **CLIENT-SIDE / NOT TRUSTED** |

### Each `items[]` entry

| Field | Type | Required | Source | Description |
| ----- | ---- | -------: | ------ | ----------- |
| `serviceId` | string | Yes | `service.id` / calculator / bundle | Stable service id when from catalog |
| `packageId` | string \| `null` | Cond. | `selectedPackageId` in `ServiceDetailLayout` | Exact package id from `src/data/services.ts` when a catalog package was chosen |
| `addonIds` | string[] | No (default `[]`) | `selectedAddonIds` in `ServiceDetailLayout` | Exact addon ids from catalog |
| `quantity` | number | Yes | `CartItem.qty` | ≥ 1; service detail page uses `1`; cart drawer can change qty |
| `details` | object | Cond. | `validateFields().customData` → cart `customDetails` | Service questionnaire answers (Arabic keys). Omitted for calculator/bundle/quick-add |
| `serviceTitle` | string | Display | `service.title` | **Display only** |
| `selectedOption` | string | Display / legacy | Package **name** or special label | Currently what cart stores instead of relying only on `packageId` |
| `selectedAddons` | string[] | Display / legacy | Addon **titles** or calculator fee labels | Currently what cart stores instead of relying only on `addonIds` |
| `unitPriceSAR` | number | Display | Client price calc | **CLIENT-SIDE / NOT TRUSTED** |
| `notes` | string | No | Line notes | Free text; do not parse as business input |
| `image` | string | Display | Asset path | **Display only** |
| `uploadedFiles` | string[] | No | `CartItem.uploadedFiles` | Usually `[]`; see Files |

### Stable catalog IDs that exist in frontend source (`src/data/services.ts`)

**Services (`id` = `slug`):**

- `social-media-posts`
- `website-design`
- `ecommerce-store`
- `motion-graphics`
- `digital-marketing`

**Packages / addons:** see §7 per service (exact ids from source).

---

## 6. Order Items

The cart supports **multiple items**. The POST `items` array mirrors that.

How a line is created in the frontend:

```text
Service page:
  selectedPackageId + selectedAddonIds + customDetails
  → addToCart({ serviceId, selectedOption: package.name, selectedAddons: titles, unitPriceSAR, customDetails })

Calculator:
  serviceId + speed + multilingual
  → addToCart({ selectedOption: "طلب مخصص من حاسبة الأسعار", selectedAddons: fee labels, unitPriceSAR })

Bundle:
  title + priceSAR
  → addToCart({ serviceId: "bundle_" + title, selectedOption: "باقة مجمعة شاملة", unitPriceSAR })
```

**Critical implementation fact**

At service-detail add-to-cart time, the UI **already holds**:

- `selectedPackageId` (stable)
- `selectedAddonIds` (stable)

…but `CartItem` currently persists **`selectedOption` (name)** and **`selectedAddons` (titles)** only — not the ids.

For a correct POST, the frontend must include `packageId` / `addonIds` from that existing state (see **Implementation Gaps**). The IDs themselves are **not invented**; they already exist in `services.ts` and component state.

---

## 7. Service-Specific Payloads

For each dedicated questionnaire, `details` is exactly the `customData` object produced by that page’s `validateFields()` (Arabic keys, string values).

---

### 7.1 `social-media-posts`

**Service ID:** `social-media-posts`

**Packages (exact ids):**

| packageId | name (display) | priceSAR |
| --------- | -------------- | -------: |
| `posts_4` | 4 منشورات احترافية | 199 |
| `posts_8` | 8 منشورات متكاملة | 349 |
| `posts_12` | 12 منشور تسويقي VIP | 480 |

**Addons (exact ids):**

| addonId | title (display) | priceSAR |
| ------- | --------------- | -------: |
| `addon_reels_cover` | تصميم أغطية ريلز وفيديوهات (3 تصاميم) | 80 |
| `addon_motion_intro` | إنترو موشن جرافيك للشعار (5 ثوانٍ) | 150 |
| `addon_fast_delivery` | تسليم فوري مستعجل خلال 24 ساعة | 90 |

**Required questionnaire inputs (FE validation):**

| Input state | Stored in `details` as | Allowed values / rules |
| ----------- | ---------------------- | ---------------------- |
| `platforms` (≥1) | `المنصات المطلوبة` | `انستقرام Instagram`, `سناب شات Snapchat`, `تيك توك TikTok`, `إكس / تويتر X`, `لينكد إن LinkedIn`, `فيسبوك Facebook`, `يوتيوب YouTube`, `بينترست Pinterest` |
| `activityField` | `مجال النشاط` | non-empty string |
| `targetAudience` | `الجمهور المستهدف` | non-empty string |
| `mainGoals` (≥1) | `الهدف الرئيسي` | `مبيعات Direct Sales`, `انتشار Brand Awareness`, `تفاعل Engagement`, `جمع بيانات عملاء Leads`, `زيارات للموقع / المتجر Traffic` |
| `keyProducts` | `أهم الخدمات والمنتجات` | non-empty string |
| `serviceType` | `نوع الخدمة` | `محتوى + تصميم` \| `تصميم فقط` \| `إدارة كاملة` |
| `language` | `اللغة` | `العربية (Arabic)` \| `الإنجليزية (English)` \| `ثنائي اللغة (عربي + إنجليزي)` \| `لغة أخرى` |
| `hasOffers` | `هل توجد عروض؟` | `yes`/`no` → formatted string |

**Optional:**

| Input | `details` key | Notes |
| ----- | ------------- | ----- |
| `currentAccounts` | `روابط الحسابات الحالية` | URLs joined by ` \| `, or `"غير مدخل"` |
| `toneOfVoice` | `Tone of Voice` | `عصري وشبابي` \| `رسمي ومؤسسي` \| `ودود وقريب للعميل` \| `تسويقي ومحفز` \| `فاخر وراقي` |
| `refAccounts` | `الحسابات المرجعية` | or `"لا يوجد"` |
| file name strings | `الشعار المرفوع`, `ملفات الهوية والمرفقات` | filename metadata only |

**Conditional:**

```text
IF hasOffers === "yes" THEN offersDetails required
→ details["هل توجد عروض؟"] = "نعم - ({offersDetails})"
ELSE
→ details["هل توجد عروض؟"] = "لا توجد عروض"
```

**Example item**

```json
{
  "serviceId": "social-media-posts",
  "packageId": "posts_8",
  "addonIds": ["addon_fast_delivery"],
  "quantity": 1,
  "details": {
    "الخدمة": "السوشيال ميديا (تصميم وإدارة محتوى)",
    "المنصات المطلوبة": "انستقرام Instagram, تيك توك TikTok",
    "روابط الحسابات الحالية": "غير مدخل",
    "مجال النشاط": "متجر عطور",
    "الجمهور المستهدف": "نساء 25-40",
    "نوع الخدمة": "محتوى + تصميم",
    "الهدف الرئيسي": "مبيعات Direct Sales",
    "أهم الخدمات والمنتجات": "عطور نسائية",
    "هل توجد عروض؟": "لا توجد عروض",
    "اللغة": "العربية (Arabic)",
    "Tone of Voice": "فاخر وراقي",
    "الشعار المرفوع": "سيتم إرساله لاحقاً",
    "ملفات الهوية والمرفقات": "لا يوجد",
    "الحسابات المرجعية": "لا يوجد"
  },
  "serviceTitle": "تصميم وإدارة منشورات السوشيال ميديا",
  "selectedOption": "8 منشورات متكاملة",
  "selectedAddons": ["تسليم فوري مستعجل خلال 24 ساعة"],
  "unitPriceSAR": 439
}
```

Frontend price for this example: `349 + 90 = 439` (**CLIENT-SIDE / NOT TRUSTED**).

---

### 7.2 `website-design`

**Service ID:** `website-design`

**Packages:** `landing_page` (999), `company_site` (1499), `booking_services` (1899)  
**Addons:** `addon_multilingual` (350), `addon_seo_pro` (250), `addon_chat_widget` (180)

**Required FE validation:**

- `projectName`, `activityDesc`
- `pages` ≥ 1, `features` ≥ 1
- if `hasCurrentSite === "yes"` → `currentSiteUrl`
- if `hasDomain === "yes"` → `domainName`
- if `hasHosting === "yes"` → `hostingProvider`

**Allowed values (exact):**

- **siteType / `نوع الموقع`:** `شركة (Corporate Website)` \| `صفحة هبوط (Landing Page)` \| `معرض أعمال (Portfolio)` \| `موقع خدمات (Services Site)` \| `موقع حجوزات ومواعيد (Booking)` \| `أخرى (Other)`
- **pages:** `الرئيسية (Home)`, `من نحن (About Us)`, `الخدمات (Services)`, `سابقة الأعمال / المعرض (Portfolio)`, `المدونة والمقالات (Blog)`, `اتصل بنا (Contact Us)`, `الأسئلة الشائعة (FAQ)`, `فريق العمل (Our Team)`, `حجز موعد / استشارة (Booking)`, `صفحة أخرى مخصصة`
- **features:** `استمارة تواصل (Contact / Form)`, `زر واتساب مباشر (WhatsApp)`, `بوابة دفع إلكتروني (Payment)`, `نظام حجز ومواعيد (Booking)`, `خرائط جوجل (Google Maps)`, `مدونة مقالات (Blog)`, `شات ومحادثة حية (Live Chat)`, `نشرة بريدية (Newsletter)`, `حسابات وتسجيل أعضاء (User Accounts)`, `تعدد اللغات (Multilingual)`, `خصائص برمجية أخرى (Other)`
- **contentReady / `حالة المحتوى`:** `نعم` \| `جزئي` \| `لا`
- **language:** `العربية (Arabic)` \| `الإنجليزية (English)` \| `ثنائي اللغة (عربي + إنجليزي)` \| `لغات أخرى`

**Conditional UI (content files):** shown when `contentReady` ∈ {`نعم`,`جزئي`} — **not** enforced as required by FE validation.

**`details` keys:**  
`الخدمة`, `نوع الموقع`, `اسم المشروع`, `وصف النشاط`, `هل يوجد موقع حالي؟`, `الصفحات المطلوبة`, `حالة المحتوى`, `اللغة`, `الوظائف المطلوبة`, `الدومين`, `الاستضافة`, `الشعار والمرفقات`, `المواقع المرجعية`

**Example item**

```json
{
  "serviceId": "website-design",
  "packageId": "company_site",
  "addonIds": ["addon_seo_pro"],
  "quantity": 1,
  "details": {
    "الخدمة": "تصميم وتطوير موقع إلكتروني",
    "نوع الموقع": "شركة (Corporate Website)",
    "اسم المشروع": "شركة النور",
    "وصف النشاط": "خدمات استشارية",
    "هل يوجد موقع حالي؟": "لا",
    "الصفحات المطلوبة": "الرئيسية (Home), من نحن (About Us), الخدمات (Services), اتصل بنا (Contact Us)",
    "حالة المحتوى": "جزئي",
    "اللغة": "العربية (Arabic)",
    "الوظائف المطلوبة": "زر واتساب مباشر (WhatsApp), استمارة تواصل (Contact / Form), خرائط جوجل (Google Maps)",
    "الدومين": "غير محجوز (مطلوب جديد)",
    "الاستضافة": "غير متوفرة (مطلوبة جديدة)",
    "الشعار والمرفقات": "لا يوجد",
    "المواقع المرجعية": "لا يوجد"
  },
  "selectedOption": "موقع شركة متكامل (5-8 صفحات)",
  "selectedAddons": ["تهيئة محركات البحث المتقدمة (SEO Pro)"],
  "unitPriceSAR": 1749
}
```

---

### 7.3 `ecommerce-store`

**Service ID:** `ecommerce-store`

**Packages:** `store_starter` (1999), `store_pro` (2899)  
**Addons:** `addon_product_upload` (300), `addon_tabby_tamara` (200), `addon_pixels_tracking` (150)

**Required FE validation:**

- `productsCount` parseInt ≥ 1
- `categoriesText` non-empty
- `paymentMethods` ≥ 1
- `targetCountries` ≥ 1
- `shippingZones` non-empty

**Allowed values:**

- **paymentMethods:** `مدى (Mada)`, `Apple Pay`, `فيزا وماستركارد (Visa/MasterCard)`, `تمارا (Tamara)`, `تابي (Tabby)`, `الدفع عند الاستلام (COD)`, `STC Pay`, `تحويل بنكي مباشر`, `باي بال (PayPal)`
- **targetCountries:** `المملكة العربية السعودية`, `الإمارات العربية المتحدة`, `الكويت`, `قطر`, `البحرين`, `سلطنة عمان`, `مصر`, `كافة دول الخليج العربي`, `شحن دولي لكافة أنحاء العالم`
- **inventoryType:** `متجر سلة (Salla)`, `منصة زد (Zid)`, `شوبيفاي (Shopify)`, `ووكومرس (WooCommerce)`, `ربط عبر نظام ERP / API`, `ملف إكسيل منفصل`
- **storeCurrency:** `SAR (ريال سعودي)`, `AED (درهم إماراتي)`, `USD (دولار أمريكي)`, `KWD (دينار كويتي)`, `QAR (ريال قطري)`, `BHD (دينار بحريني)`, `OMR (ريال عماني)`, `EGP (جنيه مصري)`
- **hasVat:** `yes` \| `no` (no child conditional fields)

**`details` keys:**  
`الخدمة`, `عدد المنتجات`, `تصنيفات المنتجات`, `ملف المنتجات`, `صور المنتجات`, `ملف الأسعار`, `المخزون والمنصة`, `طرق الدفع المطلوبة`, `الدول المستهدفة`, `مناطق الشحن`, `شركات الشحن`, `الضريبة`, `العملة الأساسية`, `سياسة الشحن`, `سياسة الاسترجاع`, `سياسة الخصوصية`

**Example item**

```json
{
  "serviceId": "ecommerce-store",
  "packageId": "store_starter",
  "addonIds": [],
  "quantity": 1,
  "details": {
    "الخدمة": "المتجر الإلكتروني",
    "عدد المنتجات": "30 منتج تقريباً",
    "تصنيفات المنتجات": "عطور رجالية، عطور نسائية",
    "ملف المنتجات": "سيتم إرفاقه",
    "صور المنتجات": "سيتم إرفاقها",
    "ملف الأسعار": "محدد في ملف المنتجات",
    "المخزون والمنصة": "متجر سلة (Salla)",
    "طرق الدفع المطلوبة": "مدى (Mada), Apple Pay",
    "الدول المستهدفة": "المملكة العربية السعودية",
    "مناطق الشحن": "جميع مدن المملكة",
    "شركات الشحن": "حسب الأفضلية",
    "الضريبة": "نعم (15% ضريبة مضافة)",
    "العملة الأساسية": "SAR (ريال سعودي)",
    "سياسة الشحن": "صياغة نموذج كوبالت القياسي",
    "سياسة الاسترجاع": "صياغة نموذج كوبالت القياسي",
    "سياسة الخصوصية": "صياغة نموذج كوبالت القياسي"
  },
  "selectedOption": "متجر مبتدئ (حتى 50 منتج)",
  "selectedAddons": [],
  "unitPriceSAR": 1999
}
```

---

### 7.4 `motion-graphics`

**Service ID:** `motion-graphics`

**Packages:** `motion_15s` (550), `motion_30s` (850), `motion_60s` (1450)  
**Addons:** `addon_multiple_aspects` (120), `addon_soundtrack_license` (100), `addon_english_subtitles` (80)

**Required FE validation:**

- `videoGoal`, `videoProduct`, `keyMessage`
- `platforms` ≥ 1
- if `isScriptReady === "yes"` → `scriptText` **OR** script file names required

**Allowed values:**

- **platforms (motion — different strings from social):** `انستقرام (Instagram)`, `سناب شات (Snapchat)`, `تيك توك (TikTok)`, `يوتيوب (YouTube)`, `إكس / تويتر (X)`, `شاشات عرض ومؤتمرات`, `تلفزيون (TV)`
- **aspectRatio:** `9:16 (طولي - ستوريز وتيك توك وريلز)` \| `16:9 (أفقي - يوتيوب وشاشات عرض)` \| `1:1 (مربع - انستقرام وبوستات)` \| `أكثر من مقاس (متعدد الأحجام)`
- **voiceLang:** `عربية فصحى راقية` \| `لهجة سعودية خليجية` \| `لهجة مصرية حيوية` \| `لهجة شامية` \| `إنجليزية أمريكية (US English)` \| `إنجليزية بريطانية (UK English)` \| `أخرى`
- **voiceGender:** `صوت رجالي (Male Voice)` \| `صوت نسائي (Female Voice)` \| `اترك الاختيار لفريق كوبالت`

**Conditionals:**

```text
IF isScriptReady === "yes" THEN script text OR script file required
IF hasVoiceOver === "yes" THEN voiceLang + voiceGender included in details string
IF isScriptReady === "no" THEN details["حالة السيناريو"] = "مطلوب كتابته من كوبالت (مجاناً)"
```

**`details` keys:**  
`الخدمة`, `الهدف من الفيديو`, `المنتج / الخدمة`, `منصات النشر`, `المقاس`, `حالة السيناريو`, `الرسالة الأساسية`, `الدعوة لإجراء CTA`, `التعليق الصوتي Voice Over`, `الشعار المرفوع`, `الملفات المرفقة`, `الفيديوهات المرجعية`

**Example item**

```json
{
  "serviceId": "motion-graphics",
  "packageId": "motion_30s",
  "addonIds": ["addon_multiple_aspects"],
  "quantity": 1,
  "details": {
    "الخدمة": "موشن جرافيك / فيديو إعلاني",
    "الهدف من الفيديو": "إطلاق تطبيق",
    "المنتج / الخدمة": "تطبيق توصيل",
    "منصات النشر": "انستقرام (Instagram), تيك توك (TikTok)",
    "المقاس": "9:16 (طولي - ستوريز وتيك توك وريلز)",
    "حالة السيناريو": "مطلوب كتابته من كوبالت (مجاناً)",
    "الرسالة الأساسية": "أسرع توصيل في مدينتك",
    "الدعوة لإجراء CTA": "حسب رؤية فريق الإخراج",
    "التعليق الصوتي Voice Over": "نعم (لهجة سعودية خليجية - اترك الاختيار لفريق كوبالت)",
    "الشعار المرفوع": "سيتم إرساله",
    "الملفات المرفقة": "لا يوجد",
    "الفيديوهات المرجعية": "لا يوجد"
  },
  "selectedOption": "فيديو إعلاني قياسي 30 ثانية",
  "selectedAddons": ["تصدير الفيديو بمقاسين مختلفين (عمودي + أفقي)"],
  "unitPriceSAR": 970
}
```

---

### 7.5 `digital-marketing`

**Service ID:** `digital-marketing`

**Packages:** `campaign_single` (750), `campaign_multi` (1400)  
**Addons:** `addon_ad_creatives` (220), `addon_competitor_audit` (180)

**Required FE validation:**

- `productDesc`
- `budgetAmount` parseInt ≥ 100
- `durationDays` parseInt ≥ 1
- `audienceDesc`
- `targetCountries` ≥ 1
- if `hasRunAdsBefore === "yes"` → `prevPlatforms` ≥ 1

**Allowed values:**

- **campaignGoal:** `مبيعات مباشرة (Purchases / E-commerce Sales)` \| `توليد عملاء محتملين (Leads Generation)` \| `محادثات واتساب مباشرة (WhatsApp Messages)` \| `تحميل وتثبيت التطبيقات (App Installs)` \| `شهرة وانتشار العلامة (Brand Awareness)` \| `زيارات للموقع أو الفرع (Traffic / Store Visits)` \| `أخرى`
- **budgetCurrency:** `SAR (ريال سعودي)` \| `AED (درهم إماراتي)` \| `USD (دولار)` \| `KWD (دينار)` \| `EGP (جنيه)`
- **targetCountries:** `المملكة العربية السعودية`, `الإمارات العربية المتحدة`, `الكويت`, `قطر`, `البحرين`, `سلطنة عمان`, `مصر`, `الأردن`, `دول الخليج كافة`
- **ageBrackets:** `18 - 24 سنة`, `25 - 34 سنة`, `35 - 44 سنة`, `45 - 54 سنة`, `55+ سنة`
- **prevPlatforms:** `سناب شات (Snapchat)`, `انستقرام (Instagram)`, `تيك توك (TikTok)`, `إعلانات جوجل (Google Ads)`, `فيسبوك (Facebook Ads)`, `إكس / تويتر (X Ads)`, `لينكد إن (LinkedIn Ads)`
- **gender:** `الجميع (رجال وسيدات)` \| `رجال فقط` \| `سيدات فقط`

**Note:** `budgetAmount` is **ad media budget**, not Cobalt’s service fee. Service fee = package + addons.

**`details` keys:**  
`الخدمة`, `هدف الحملة`, `المنتج / الخدمة`, `الميزانية الإعلانية`, `مدة الحملة`, `رابط الهبوط`, `وصف الجمهور المستهدف`, `الدول المستهدفة`, `المدن المستهدفة`, `الفئات العمرية`, `الجنس`, `العرض الترويجي`, `سعر المنتج المعلن`, `طلب تصميم Creatives`, `إعلانات سابقة`, `حسابات السوشيال`, `المنافسون`, `الملفات المرفقة`

**Example item**

```json
{
  "serviceId": "digital-marketing",
  "packageId": "campaign_single",
  "addonIds": ["addon_ad_creatives"],
  "quantity": 1,
  "details": {
    "الخدمة": "التسويق والإعلانات الممولة",
    "هدف الحملة": "مبيعات مباشرة (Purchases / E-commerce Sales)",
    "المنتج / الخدمة": "متجر عطور",
    "الميزانية الإعلانية": "2500 SAR (ريال سعودي)",
    "مدة الحملة": "14 يوماً",
    "رابط الهبوط": "غير محدد",
    "وصف الجمهور المستهدف": "مهتمات بالتجميل",
    "الدول المستهدفة": "المملكة العربية السعودية, الإمارات العربية المتحدة",
    "المدن المستهدفة": "كافة المدن الرئيسية",
    "الفئات العمرية": "25 - 34 سنة, 35 - 44 سنة",
    "الجنس": "الجميع (رجال وسيدات)",
    "العرض الترويجي": "لا يوجد عرض خاص",
    "سعر المنتج المعلن": "غير محدد",
    "طلب تصميم Creatives": "نعم (مطلوب من كوبالت)",
    "إعلانات سابقة": "لا توجد سوابق إعلانية",
    "حسابات السوشيال": "لا يوجد",
    "المنافسون": "لا يوجد",
    "الملفات المرفقة": "لا يوجد"
  },
  "selectedOption": "إدارة حملة منصة واحدة (سناب أو تيك توك)",
  "selectedAddons": ["تصميم 4 بنرات إعلانية احترافية للحملة"],
  "unitPriceSAR": 970
}
```

---

### 7.6 Generic `/services/[slug]` fallback

When a catalog service uses `GenericServiceOrder`:

**Required:** `projectTitle`, `projectDetails`  
**Optional enum `preferredTimeline`:**  
`عاجل (خلال أيام قليلة)` \| `عادي (حسب جدول التسليم القياسي)` \| `مرن (لدينا متسع من الوقت)`

**`details` keys:**  
`الخدمة` (= `service.title`), `اسم المشروع`, `تفاصيل الطلب`, `الوقت المفضل للتسليم`, `الملفات المرفقة`

Still uses that service’s real `packageId` / `addonIds` from catalog.

---

## 8. Calculator Payload

**Component:** `PriceCalculator`  
**User inputs that exist in frontend state:**

| State | Type | Values |
| ----- | ---- | ------ |
| `selectedServiceId` | string | one of the 5 catalog `service.id` values |
| `speedOption` | `"normal"` \| `"express"` \| `"vip"` | |
| `hasMultilingual` | boolean | |

**Frontend price formula (CLIENT-SIDE / NOT TRUSTED):**

```text
unitPriceSAR = service.priceSAR
             + (express ? 150 : vip ? 250 : 0)
             + (hasMultilingual ? 200 : 0)
```

Uses catalog **`priceSAR`**, not a package id.

### What the frontend currently puts into the cart

| Cart field | Current value |
| ---------- | ------------- |
| `serviceId` | selected catalog id |
| `selectedOption` | `"طلب مخصص من حاسبة الأسعار"` (display label) |
| `selectedAddons` | human-readable fee labels, e.g. `"تسليم عاجل (+150 ر.س)"`, `"تسليم فوري VIP (+250 ر.س)"`, `"دعم متعدد اللغات (+200 ر.س)"` |
| `unitPriceSAR` | calculated total |
| `notes` | `"حاسبة الأسعار: …"` free text |
| `customDetails` / `details` | **not set** |
| Structured `speed` / `hasMultilingual` | **not stored on cart** |

### What the backend needs to receive (structured)

Do **not** require parsing business meaning from display strings or `notes`.

Ideal calculator item fields (values already exist in `PriceCalculator` state — **not invented**):

```json
{
  "serviceId": "website-design",
  "packageId": null,
  "addonIds": [],
  "quantity": 1,
  "details": {},
  "calculator": {
    "speed": "express",
    "hasMultilingual": true
  },
  "selectedOption": "طلب مخصص من حاسبة الأسعار",
  "selectedAddons": [
    "تسليم عاجل (+150 ر.س)",
    "دعم متعدد اللغات (+200 ر.س)"
  ],
  "unitPriceSAR": 1849,
  "notes": "حاسبة الأسعار: تسليم عاجل (+150 ر.س) + متعدد اللغات"
}
```

`calculator.speed` and `calculator.hasMultilingual` are **not currently on `CartItem`**. A **frontend change is required** before the POST can send them cleanly. Until then, only the display strings above are available.

---

## 9. Bundles

**Component:** `BundlesSection`  
**No stable bundle IDs in source.** Titles are hardcoded; cart id is generated as `` `bundle_${title}` ``.

| Title (exact) | unitPriceSAR | Struck (display only) | Generated `serviceId` |
| ------------- | -----------: | --------------------: | --------------------- |
| `موقع إلكتروني + 12 بوست سوشيال ميديا` | 1699 | 2500 | `bundle_موقع إلكتروني + 12 بوست سوشيال ميديا` |
| `متجر إلكتروني + موشن جرافيك + إدارة إعلانات` | 3200 | 4800 | `bundle_متجر إلكتروني + موشن جرافيك + إدارة إعلانات` |

**Current cart / POST fields:**

```json
{
  "serviceId": "bundle_موقع إلكتروني + 12 بوست سوشيال ميديا",
  "packageId": null,
  "addonIds": [],
  "quantity": 1,
  "details": {},
  "serviceTitle": "موقع إلكتروني + 12 بوست سوشيال ميديا",
  "selectedOption": "باقة مجمعة شاملة",
  "selectedAddons": [],
  "unitPriceSAR": 1699,
  "notes": "طلب باقة ترويجية: موقع إلكتروني + 12 بوست سوشيال ميديا",
  "image": "/assets/cobalt_cards_cover_1787772953354.jpg"
}
```

Do **not** invent a fake `bundle_presence_360` id. The frontend has no such constant. A frontend change would be required to introduce a stable bundle id.

---

## 10. Coupons

| couponCode | discountPercentage (FE) |
| ---------- | ----------------------: |
| `COBALT20` | 20 |
| `WELCOME10` | 10 |
| `VIP25` | 25 |

FE math:

```text
discountSAR = Math.round(subtotalSAR * discountPercentage / 100)
grandTotalSAR = max(0, subtotalSAR - discountSAR)
```

**Send:** `couponCode` (authoritative input for “which code was entered”).  
**Also may send:** `clientPricing.discountPercentage` / `discountSAR` / `grandTotalSAR` — **CLIENT-SIDE / NOT TRUSTED**.  
Backend must validate the coupon independently.

---

## 11. Customer Data

From `CheckoutModal`:

| Field | Required by FE JS | Notes |
| ----- | ----------------: | ----- |
| `fullName` | Yes | |
| `phone` | Yes | |
| `email` | No in JS | HTML attribute `required` present |
| `notes` | No | |
| `paymentMethod` | Always `"mada"` | UI for other methods is commented out (`mada`, `apple_pay`, `credit_card`, `bank` exist only in comments) |

Toast if name/phone missing: `"يرجى تزويدنا بالاسم ورقم الجوال"`.

---

## 12. Files

| Fact | Detail |
| ---- | ------ |
| Multipart / binary upload in order flow | **No** |
| What FE stores | Strings like `"logo.png (12.5 KB)"` |
| Where they appear | Inside `details` values (e.g. `الشعار المرفوع`, `الملفات المرفقة`) |
| `uploadedFiles` on cart item | Typed field; service add-to-cart usually leaves it `[]` |

> This POST contract does **not** upload binary files unless the frontend implementation is changed to support `multipart/form-data` or another upload mechanism.

---

## 13. Validation

### Frontend (must be re-done on backend)

- Checkout: `fullName`, `phone`
- Per-service questionnaire rules in §7
- Calculator / bundles: no form validation beyond always-addable selections
- File “required” UI badges are largely **not** enforced in `validateFields` (exception: motion script text-or-file)

### Backend (mandatory)

- Accept only known `serviceId` / `packageId` / `addonIds` from catalog
- Re-validate questionnaire conditionals and allowed values
- Recalculate prices from `serviceId` + `packageId` + `addonIds` (or calculator inputs / bundle title)
- Validate `couponCode` independently
- Do not trust `unitPriceSAR` or `clientPricing`

---

## 14. Client-Calculated Values (NOT TRUSTED)

| Field | How FE computes it |
| ----- | ------------------ |
| `items[].unitPriceSAR` | package.priceSAR + sum(addon.priceSAR), or calculator formula, or hard-coded bundle price |
| `clientPricing.subtotalSAR` | Σ(unitPriceSAR × quantity) |
| `clientPricing.discountSAR` | round(subtotal × coupon %) |
| `clientPricing.grandTotalSAR` | subtotal − discount |
| `clientPricing.discountPercentage` | from local coupon map |

Currency conversion rates in FE are display-only (`SAR/USD/AED/EGP`). Prices in cart are always stored as **SAR numbers**.

---

## 15. Complete Examples

### 15.1 Normal service order (no addons)

```json
{
  "customer": {
    "fullName": "أحمد العتيبي",
    "phone": "+9665xxxxxxx",
    "email": "",
    "notes": ""
  },
  "paymentMethod": "mada",
  "currency": "SAR",
  "couponCode": null,
  "items": [
    {
      "serviceId": "website-design",
      "packageId": "landing_page",
      "addonIds": [],
      "quantity": 1,
      "details": {
        "الخدمة": "تصميم وتطوير موقع إلكتروني",
        "نوع الموقع": "صفحة هبوط (Landing Page)",
        "اسم المشروع": "عرض الصيف",
        "وصف النشاط": "حملة تسويقية",
        "هل يوجد موقع حالي؟": "لا",
        "الصفحات المطلوبة": "الرئيسية (Home), اتصل بنا (Contact Us)",
        "حالة المحتوى": "لا",
        "اللغة": "العربية (Arabic)",
        "الوظائف المطلوبة": "زر واتساب مباشر (WhatsApp), استمارة تواصل (Contact / Form)",
        "الدومين": "غير محجوز (مطلوب جديد)",
        "الاستضافة": "غير متوفرة (مطلوبة جديدة)",
        "الشعار والمرفقات": "لا يوجد",
        "المواقع المرجعية": "لا يوجد"
      },
      "selectedOption": "صفحة هبوط تسويقية (Landing Page)",
      "selectedAddons": [],
      "unitPriceSAR": 999
    }
  ],
  "clientPricing": {
    "subtotalSAR": 999,
    "discountPercentage": 0,
    "discountSAR": 0,
    "grandTotalSAR": 999
  }
}
```

### 15.2 Service with package + addons

See §4 complete body / §7.1 example (`posts_8` + `addon_fast_delivery`).

### 15.3 Calculator order (current cart shape + required structured gap)

**What FE can send today (without frontend change):**

```json
{
  "customer": {
    "fullName": "نورة",
    "phone": "+9665xxxxxxx",
    "email": "",
    "notes": ""
  },
  "paymentMethod": "mada",
  "currency": "SAR",
  "couponCode": null,
  "items": [
    {
      "serviceId": "ecommerce-store",
      "packageId": null,
      "addonIds": [],
      "quantity": 1,
      "details": {},
      "selectedOption": "طلب مخصص من حاسبة الأسعار",
      "selectedAddons": [
        "تسليم فوري VIP (+250 ر.س)",
        "دعم متعدد اللغات (+200 ر.س)"
      ],
      "unitPriceSAR": 2449,
      "notes": "حاسبة الأسعار: تسليم فوري VIP (+250 ر.س) + متعدد اللغات"
    }
  ],
  "clientPricing": {
    "subtotalSAR": 2449,
    "discountPercentage": 0,
    "discountSAR": 0,
    "grandTotalSAR": 2449
  }
}
```

**What backend needs (requires FE to attach existing state):**

```json
"calculator": { "speed": "vip", "hasMultilingual": true }
```

### 15.4 Bundle order

```json
{
  "customer": {
    "fullName": "خالد",
    "phone": "+9665xxxxxxx",
    "email": "k@example.com",
    "notes": ""
  },
  "paymentMethod": "mada",
  "currency": "SAR",
  "couponCode": "COBALT20",
  "items": [
    {
      "serviceId": "bundle_متجر إلكتروني + موشن جرافيك + إدارة إعلانات",
      "packageId": null,
      "addonIds": [],
      "quantity": 1,
      "details": {},
      "serviceTitle": "متجر إلكتروني + موشن جرافيك + إدارة إعلانات",
      "selectedOption": "باقة مجمعة شاملة",
      "selectedAddons": [],
      "unitPriceSAR": 3200,
      "notes": "طلب باقة ترويجية: متجر إلكتروني + موشن جرافيك + إدارة إعلانات",
      "image": "/assets/cobalt_cards_cover_1787772953354.jpg"
    }
  ],
  "clientPricing": {
    "subtotalSAR": 3200,
    "discountPercentage": 20,
    "discountSAR": 640,
    "grandTotalSAR": 2560
  }
}
```

### 15.5 Multiple cart items

Same envelope; `items` may mix questionnaire services, calculator lines, and bundles. Totals are over the whole cart, then coupon.

---

## 16. Frontend → Backend Responsibilities

### Frontend sends

- Customer input (`fullName`, `phone`, `email`, `notes`)
- Selected `serviceId`
- Selected `packageId` (where a catalog package was chosen)
- Selected `addonIds` (where addons were chosen)
- Questionnaire answers in `details` (exact Arabic keys from FE)
- Calculator selections (today: mostly display strings; ideally structured `speed` / `hasMultilingual`)
- Bundle selection (today: generated `bundle_${title}`)
- `couponCode`
- `quantity`
- Display/derived fields for convenience (`serviceTitle`, titles, `unitPriceSAR`, `clientPricing`)

### Backend receives and processes

- The POST body
- Input validation
- Business validation (ids, enums, conditionals)
- Server-side price validation / recalculation
- Coupon validation
- Order creation / storage

No GET service/package/pricing APIs are required for this integration.

---

## Implementation Gaps

Gaps found in the **current frontend** (do not invent fixes here):

1. **`packageId` / `addonIds` exist in UI state but are not stored on `CartItem`.** Cart currently stores package **name** (`selectedOption`) and addon **titles** (`selectedAddons`). POST should prefer the existing stable ids; wiring them into the cart/POST requires a frontend change.
2. **Calculator selections are stored as human-readable strings** (`selectedOption`, fee labels in `selectedAddons`, text in `notes`). Structured `speed` / `hasMultilingual` exist in `PriceCalculator` state but are not on the cart line.
3. **Bundles have no stable id** — only Arabic titles and generated `serviceId = "bundle_" + title`.
4. **Questionnaire `details` use Arabic display keys** (and some pre-formatted sentence values), not separate semantic English keys. Backend should accept the exact FE object.
5. **Platform option value strings differ** across social vs motion vs marketing prev-platforms — do not assume one shared enum.
6. **No real file upload** — only filename metadata strings inside `details`.
7. **Checkout WhatsApp path currently omits `customDetails`** from the message even though cart lines contain them; the POST must still include `details` from cart.
8. **Quick-add** (catalog/hub) adds a line with first package name/price and **no** `details` questionnaire.
9. **No HTTP POST exists yet** — submission is WhatsApp-only today.

---

### Source files inspected

| Area | Path |
| ---- | ---- |
| Catalog + ids | `src/data/services.ts` |
| Cart type | `src/types/index.ts` |
| Cart / coupons | `src/context/CartContext.tsx` |
| Checkout | `src/components/ui/CheckoutModal.tsx` |
| Package/addon selection | `src/components/services/ServiceDetailLayout.tsx` |
| Questionnaires | `src/components/services/orders/*.tsx` |
| Calculator | `src/components/home/PriceCalculator.tsx` |
| Bundles | `src/components/home/BundlesSection.tsx` |
| Currency | `src/data/currencies.ts` |

---

**End of `BACKEND_ORDER_POST.md`.**  
No frontend source files were modified.
