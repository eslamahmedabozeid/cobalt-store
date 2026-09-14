'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR = [
  '.reveal-on-scroll',
  '.reveal-fade-up',
  '.reveal-scale',
  '.reveal-slide-right',
  '.reveal-slide-left',
  '.service-card',
  '.feature-card',
  '.step-card',
  '.portfolio-item',
  '.review-card',
  '.calculator-widget',
  '.bundle-card',
  '.price-card',
  '.service-hero',
  '.store-hero',
  '.cta-banner-card',
  '.guarantee-card',
  '.process-step-card',
  '.comparison-card'
].join(', ');

/**
 * Ports HTML app.js visual behaviors: scroll reveal, header scrolled,
 * counters, ripples, 3D tilt, executive dock, header scroll spy.
 */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // --- Scroll reveal (critical: CSS starts at opacity 0) ---
    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );

    const observeRevealTargets = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (observed.has(el) || el.classList.contains('revealed')) return;
        observed.add(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add('revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    observeRevealTargets();

    const mutationObserver = new MutationObserver(() => {
      observeRevealTargets();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    cleanups.push(() => {
      observer.disconnect();
      mutationObserver.disconnect();
    });

    // --- Header scrolled state ---
    const header = document.querySelector('.header');
    if (header) {
      let ticking = false;
      const handleScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 35);
          ticking = false;
        });
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      cleanups.push(() => window.removeEventListener('scroll', handleScroll));
    }

    // --- Button ripple ---
    const rippleSelector =
      '.btn-primary, .btn-outline, .btn-add-cart, .btn-checkout, .btn-icon-quick, .btn-cta-primary, .btn-cta-whatsapp, .btn-cobalt-primary';
    const onRippleClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const mouseEvent = e as MouseEvent;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = `${mouseEvent.clientX - rect.left}px`;
      ripple.style.top = `${mouseEvent.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 600);
    };
    const rippleButtons = document.querySelectorAll(rippleSelector);
    rippleButtons.forEach((btn) => btn.addEventListener('click', onRippleClick));
    cleanups.push(() => {
      rippleButtons.forEach((btn) => btn.removeEventListener('click', onRippleClick));
    });

    // --- Soft 3D tilt on cards ---
    const tiltSelector =
      '.service-card, .hero-3d-poster, .step-card, .portfolio-item, .calculator-widget, .feature-card, .bundle-card, .price-card, .cta-banner-card';
    const tiltCards = document.querySelectorAll<HTMLElement>(tiltSelector);
    const tiltCleanups: Array<() => void> = [];

    tiltCards.forEach((card) => {
      let ticking = false;
      const onMove = (e: MouseEvent) => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;
          card.style.transition =
            'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.3s ease';
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale(1.012)`;
          card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
          card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
          ticking = false;
        });
      };
      const onLeave = () => {
        card.style.transition =
          'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
        card.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      tiltCleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
    cleanups.push(() => tiltCleanups.forEach((fn) => fn()));

    // --- Animated counters ---
    const statElements = document.querySelectorAll('.hero-stat-value, .stat-number');
    if (statElements.length) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const targetText = el.innerText.trim();
            const numericVal = parseFloat(targetText.replace(/[^0-9.]/g, ''));
            const suffix = targetText.replace(/[0-9.]/g, '');

            if (!isNaN(numericVal) && !el.classList.contains('counted')) {
              el.classList.add('counted');
              let current = 0;
              const duration = 1600;
              const stepTime = 20;
              const steps = duration / stepTime;
              const increment = numericVal / steps;

              const timer = window.setInterval(() => {
                current += increment;
                if (current >= numericVal) {
                  current = numericVal;
                  window.clearInterval(timer);
                }
                el.innerText =
                  (Number.isInteger(numericVal)
                    ? Math.floor(current)
                    : current.toFixed(1)) + suffix;
              }, stepTime);
            }
          });
        },
        { threshold: 0.5 }
      );
      statElements.forEach((el) => counterObserver.observe(el));
      cleanups.push(() => counterObserver.disconnect());
    }

    // --- Executive side dock (home only) ---
    const isHome = pathname === '/';
    document.querySelector('.executive-side-system')?.remove();

    if (isHome) {
      const container = document.createElement('div');
      container.className = 'executive-side-system';
      container.innerHTML = `
        <div class="executive-progress-wrapper" title="مؤشر إنجاز التصفح">
          <div class="executive-progress-badge" id="execProgressBadge">0%</div>
          <div class="executive-progress-track">
            <div class="executive-progress-bar" id="execProgressBar"></div>
          </div>
        </div>
        <div class="executive-dock-wrapper">
          <div class="executive-dock-track">
            <button type="button" class="exec-dock-item active" data-target="top">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">الرئيسية</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="catalogSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">الخدمات الرقمية</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="calculatorSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">حاسبة الأسعار</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="bundlesSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">باقات التأسيس</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="portfolioSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">معرض الأعمال</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="processSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">آلية الشراء والتسليم</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="guaranteesSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">ضمانات الموثوقية</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="comparisonSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">المقارنة المباشرة</span>
            </button>
            <button type="button" class="exec-dock-item" data-target="reviewsSection">
              <span class="dock-dot"></span>
              <span class="dock-tooltip">آراء العملاء</span>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(container);

      const bar = document.getElementById('execProgressBar');
      const badge = document.getElementById('execProgressBadge');
      const dockItems = container.querySelectorAll('.exec-dock-item');
      let dockTicking = false;

      const updateScrollState = () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(
          100,
          Math.max(0, (scrollTop / Math.max(docHeight, 1)) * 100)
        );

        if (bar) bar.style.height = `${progress}%`;
        if (badge) badge.innerText = `${Math.round(progress)}%`;

        const sections = [
          'reviewsSection',
          'comparisonSection',
          'guaranteesSection',
          'processSection',
          'portfolioSection',
          'bundlesSection',
          'calculatorSection',
          'catalogSection'
        ];
        let currentActive = 'top';

        for (const secId of sections) {
          const el = document.getElementById(secId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45) {
              currentActive = secId;
              break;
            }
          }
        }

        dockItems.forEach((item) => {
          item.classList.toggle(
            'active',
            item.getAttribute('data-target') === currentActive
          );
        });
      };

      const onDockScroll = () => {
        if (dockTicking) return;
        dockTicking = true;
        window.requestAnimationFrame(() => {
          updateScrollState();
          dockTicking = false;
        });
      };

      window.addEventListener('scroll', onDockScroll, { passive: true });
      updateScrollState();

      const onDockClick = (e: Event) => {
        const item = e.currentTarget as HTMLElement;
        const targetId = item.getAttribute('data-target');
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const targetEl = targetId ? document.getElementById(targetId) : null;
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      };

      dockItems.forEach((item) => item.addEventListener('click', onDockClick));

      cleanups.push(() => {
        window.removeEventListener('scroll', onDockScroll);
        dockItems.forEach((item) =>
          item.removeEventListener('click', onDockClick)
        );
        container.remove();
      });
    }

    // --- Header nav scroll spy ---
    const navContainer = document.querySelector('.header-nav-links');
    const headerNavLinks = document.querySelectorAll(
      '.header-nav-links .header-nav-link'
    );

    if (navContainer && headerNavLinks.length) {
      let indicator = navContainer.querySelector(
        '.header-nav-indicator'
      ) as HTMLElement | null;
      if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'header-nav-indicator';
        navContainer.appendChild(indicator);
      }

      const isMainPage = !!document.getElementById('catalogSection');

      const moveIndicatorToLink = (targetLink: Element | null) => {
        if (!targetLink || !indicator || !navContainer) return;
        const parentRect = navContainer.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        indicator.style.left = `${linkRect.left - parentRect.left}px`;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.opacity = '1';
      };

      const sectionMap = [
        { secId: 'reviewsSection', href: '/#reviewsSection' },
        { secId: 'comparisonSection', href: '/#reviewsSection' },
        { secId: 'guaranteesSection', href: '/#reviewsSection' },
        { secId: 'portfolioSection', href: '/#portfolioSection' },
        { secId: 'bundlesSection', href: '/#bundlesSection' },
        { secId: 'calculatorSection', href: '/#calculatorSection' },
        { secId: 'catalogSection', href: '/#catalogSection' }
      ];

      const updateActiveHeaderLink = () => {
        let activeLink: Element = headerNavLinks[0];

        if (isMainPage) {
          const scrollY = window.scrollY;
          let activeHref = '/';

          if (scrollY > 160) {
            for (const item of sectionMap) {
              const el = document.getElementById(item.secId);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.45) {
                  activeHref = item.href;
                  break;
                }
              }
            }
          }

          headerNavLinks.forEach((link) => {
            const linkHref = link.getAttribute('href') || '';
            const matches =
              linkHref === activeHref ||
              (activeHref === '/' &&
                (linkHref === '/' || linkHref === '#' || linkHref.endsWith('/')));
            link.classList.toggle('active', matches);
            if (matches) activeLink = link;
          });
        } else {
          const currentlyActive = navContainer.querySelector(
            '.header-nav-link.active'
          );
          if (currentlyActive) activeLink = currentlyActive;
        }

        moveIndicatorToLink(activeLink);
      };

      let spyTicking = false;
      const onSpyScroll = () => {
        if (spyTicking) return;
        spyTicking = true;
        window.requestAnimationFrame(() => {
          updateActiveHeaderLink();
          spyTicking = false;
        });
      };

      window.addEventListener('scroll', onSpyScroll, { passive: true });
      window.addEventListener('resize', updateActiveHeaderLink, { passive: true });
      const timer = window.setTimeout(updateActiveHeaderLink, 150);

      cleanups.push(() => {
        window.clearTimeout(timer);
        window.removeEventListener('scroll', onSpyScroll);
        window.removeEventListener('resize', updateActiveHeaderLink);
      });
    }

    // Handle hash navigation after route change
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const el = document.getElementById(hash);
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('revealed');
        }, 120);
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
