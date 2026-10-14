import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "АРКА 123 - пространство для событий в Минске" },
      {
        name: "description",
        content:
          "АРКА 123 - архитектурная площадка для мастер-классов, семинаров и событий в Минске. ул. Мстиславца, 10, напротив Национальной библиотеки.",
      },
      {
        property: "og:title",
        content: "АРКА 123 - пространство для встреч, которые имеют значение",
      },
      {
        property: "og:description",
        content:
          "Площадка для мастер-классов, семинаров и событий. Встречаемся напротив Библиотеки.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: "АРКА 123" },
      { property: "og:image", content: "/assets/arka-123-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "АРКА 123 - пространство для событий в Минске" },
      {
        name: "twitter:description",
        content: "Архитектурная площадка для мастер-классов, семинаров и событий в Минске.",
      },
      { name: "twitter:image", content: "/assets/arka-123-logo.png" },
      { name: "theme-color", content: "#203642" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#about", label: "О пространстве" },
  { href: "#gallery", label: "Галерея" },
  { href: "#formats", label: "Форматы" },
  { href: "#location", label: "Как добраться" },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function PhotoSlot({
  label,
  className = "",
  dark = false,
  arch = false,
  src,
}: {
  label: string;
  className?: string;
  dark?: boolean;
  arch?: boolean;
  src?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-end overflow-hidden ${!src ? (dark ? "placeholder-dark text-ivory/60" : "placeholder-photo text-graphite/55") : "text-ivory/60"} ${arch ? "arch" : ""} ${className}`}
    >
      {src && <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {src && dark && <div className="absolute inset-0 bg-graphite/20" aria-hidden />}
    </div>
  );
}

function Logo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  function playLogoAnimation() {
    setHovered(true);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play();
    }
  }

  function stopLogoAnimation() {
    setHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  return (
    <a
      href="#top"
      className="group relative flex h-16 w-16 items-center justify-center overflow-hidden bg-ivory"
      aria-label="АРКА 123 - на главную"
      onMouseEnter={playLogoAnimation}
      onMouseLeave={stopLogoAnimation}
      onFocus={playLogoAnimation}
      onBlur={stopLogoAnimation}
    >
      <img
        src="/assets/arka-123-logo.png"
        alt="АРКА 123"
        className="relative z-10 h-16 w-16 object-contain"
      />
      <video
        ref={videoRef}
        src="/assets/arka-123-logo-shine-sweep.webm"
        muted
        playsInline
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}
      />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-ivory">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Logo />
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="eyebrow text-graphite transition-opacity hover:opacity-60"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#booking"
            className="eyebrow hidden border border-graphite px-5 py-3 text-graphite transition-colors hover:bg-graphite hover:text-ivory sm:inline-block"
          >
            Обсудить мероприятие
          </a>
          <button
            className="eyebrow text-graphite lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-ivory px-6 py-8 lg:hidden"
          aria-label="Мобильная навигация"
        >
          <ul className="space-y-5">
            {[...NAV, { href: "#booking", label: "Обсудить мероприятие" }].map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-graphite"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-graphite text-ivory">
      <PhotoSlot
        dark
        src="/assets/arka-123-photos/19.png"
        label="Главный интерьер, арочные окна"
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-graphite/20"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-24">
        <p className="eyebrow animate-rise text-wood">Минск · ул. Мстиславца, 10</p>
        <h1
          className="font-display animate-rise mt-6 max-w-5xl text-[13vw] leading-[0.92] md:text-[7.5vw] xl:text-[7.2rem]"
          style={{ animationDelay: "120ms" }}
        >
          Пространство для встреч, <em className="text-wood">которые имеют значение</em>
        </h1>
        <div
          className="animate-rise mt-10 grid gap-10 border-t border-ivory/20 pt-8 md:grid-cols-12"
          style={{ animationDelay: "260ms" }}
        >
          <p className="max-w-md text-lg leading-relaxed text-ivory/80 md:col-span-5">
            АРКА 123 - площадка для мастер-классов, семинаров и событий в Минске
          </p>
          <p className="font-display text-2xl italic text-ivory/70 md:col-span-3">
            Встречаемся напротив Библиотеки
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <a
              href="#booking"
              className="eyebrow bg-ivory px-6 py-4 text-graphite transition-colors hover:bg-wood"
            >
              Обсудить мероприятие
            </a>
            <a
              href="#about"
              className="eyebrow border border-ivory/50 px-6 py-4 transition-colors hover:border-ivory"
            >
              Исследовать пространство
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-muted-foreground">
      <span className="eyebrow">{n}</span>
      <span className="h-px w-12 bg-current opacity-40" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <SectionLabel n="01">О пространстве</SectionLabel>
            <h2 className="font-display mt-10 text-5xl leading-[1] md:text-7xl">
              Свет, высота <br />и <em className="text-wood-deep">арки</em>
            </h2>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-muted-foreground">
              Архитектурная площадка напротив Национальной библиотеки Беларуси. Огромные арочные
              окна наполняют зал естественным светом, а высокие потолки дают событию воздух и
              масштаб.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-16 grid grid-cols-2 border-t border-border">
            <div className="border-r border-border py-8 pr-6">
              <p className="font-display text-6xl md:text-7xl">
                4,5<span className="text-3xl"> м</span>
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">высота потолков - до</p>
            </div>
            <div className="py-8 pl-6">
              <p className="font-display text-6xl md:text-7xl">
                4×3<span className="text-3xl"> м</span>
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">арочные окна - около</p>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-6 gap-4 md:col-span-7 md:gap-6">
          <Reveal className="col-span-4">
            <PhotoSlot
              arch
              src="/assets/arka-123-photos/3.png"
              label="Арочное окно"
              className="aspect-[3/4]"
            />
          </Reveal>
          <Reveal delay={200} className="col-span-2 self-end">
            <PhotoSlot
              src="/assets/arka-123-photos/10.png"
              label="Деталь интерьера"
              className="aspect-[2/3]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const GALLERY: { label: string; cls: string; src: string; arch?: boolean }[] = [
  {
    label: "главный зал",
    src: "/assets/arka-123-photos/6.png",
    cls: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
    arch: true,
  },
  {
    label: "арочные окна",
    src: "/assets/arka-123-photos/4.png",
    cls: "md:col-span-5 aspect-[4/3]",
  },
  {
    label: "свет из окон",
    src: "/assets/arka-123-photos/8.png",
    cls: "md:col-span-5 aspect-[4/3]",
  },
  { label: "рассадка", src: "/assets/arka-123-photos/12.png", cls: "md:col-span-4 aspect-square" },
  {
    label: "вид на Библиотеку",
    src: "/assets/arka-123-photos/5.png",
    cls: "md:col-span-8 aspect-[16/9]",
  },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a! + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setActive((a) => (a! - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [active]);

  return (
    <section id="gallery" className="bg-graphite py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 text-ivory/50">
              <span className="eyebrow">02</span>
              <span className="h-px w-12 bg-current" />
              <span className="eyebrow">Галерея</span>
            </div>
            <h2 className="font-display mt-10 text-5xl md:text-7xl">Залы и фасад</h2>
          </div>
          <p className="max-w-xs text-sm text-ivory/60">
            Реальные фотографии площадки. Нажмите на кадр, чтобы открыть его крупно.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-12 md:gap-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.label} delay={i * 80} className={g.cls}>
              <button
                onClick={() => setActive(i)}
                className="group block h-full w-full overflow-hidden text-left"
                aria-label={`Открыть: ${g.label}`}
              >
                <PhotoSlot
                  dark
                  arch={!!g.arch}
                  src={g.src}
                  label={g.label}
                  className="h-full min-h-[240px] w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[active]?.label ?? ""}
          className="fixed inset-0 z-[60] flex flex-col bg-graphite/95 p-6 md:p-12"
          onClick={() => setActive(null)}
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ivory/60">
              {String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
            </span>
            <button autoFocus className="eyebrow text-ivory" onClick={() => setActive(null)}>
              Закрыть ✕
            </button>
          </div>
          <div className="flex flex-1 items-center gap-4 py-6" onClick={(e) => e.stopPropagation()}>
            <button
              className="eyebrow text-ivory/70 hover:text-ivory"
              aria-label="Предыдущее"
              onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
            >
              ←
            </button>
            <PhotoSlot
              dark
              src={GALLERY[active]?.src}
              label={GALLERY[active]?.label ?? ""}
              className="h-full flex-1"
            />
            <button
              className="eyebrow text-ivory/70 hover:text-ivory"
              aria-label="Следующее"
              onClick={() => setActive((active + 1) % GALLERY.length)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ScrollExperience() {
  // Module prepared for future scroll-controlled venue video.
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section
      ref={ref}
      aria-label="Прогулка по пространству"
      className="relative h-[220vh] bg-graphite"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/arka-123-venue-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Видео пространства АРКА 123"
          style={{ transform: `scale(${1 + p * 0.06})` }}
        />
        <div className="absolute inset-0 bg-graphite/55" aria-hidden />
        <div className="relative px-6 text-center text-ivory">
          <p className="eyebrow text-wood">Видео-прогулка</p>
          <p className="font-display mt-6 text-5xl md:text-8xl">Войти через арку</p>
          <p className="mx-auto mt-6 max-w-sm text-sm text-ivory/60">
            Пространство АРКА 123 в движении.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 h-px w-40 -translate-x-1/2 bg-ivory/20">
          <div className="h-full bg-wood" style={{ width: `${p * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

const FORMATS: { t: string; d: string }[] = [
  {
    t: "Мастер-классы",
    d: "Практика в естественном свете: ремесла, искусство, гастрономия, телесные практики.",
  },
  {
    t: "Семинары",
    d: "Лекции и обучающие программы в пространстве, которое помогает слушать и думать.",
  },
  {
    t: "Деловые встречи",
    d: "Стратегические сессии, презентации и переговоры в спокойной архитектурной среде.",
  },
  {
    t: "Творческие события",
    d: "Показы, съемки, камерные вечера и выставки - арки становятся частью сценария.",
  },
];

function Formats() {
  return (
    <section id="formats" className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
      <Reveal>
        <SectionLabel n="03">Форматы</SectionLabel>
        <h2 className="font-display mt-10 max-w-3xl text-5xl leading-[1] md:text-7xl">
          Что здесь происходит
        </h2>
      </Reveal>
      <ol className="mt-20 border-t border-graphite">
        {FORMATS.map((f, i) => (
          <li key={f.t}>
            <Reveal className="group grid items-baseline gap-4 border-b border-border py-10 transition-colors hover:bg-card md:grid-cols-12 md:py-14">
              <span className="eyebrow text-wood-deep md:col-span-1">0{i + 1}</span>
              <h3
                className={`font-display text-4xl md:col-span-6 md:text-6xl ${i % 2 ? "md:italic" : ""}`}
              >
                {f.t}
              </h3>
              <p className="max-w-md leading-relaxed text-muted-foreground md:col-span-4">{f.d}</p>
              <a
                href="#booking"
                className="eyebrow text-graphite opacity-60 transition-opacity group-hover:opacity-100 md:col-span-1 md:text-right"
                aria-label={`Обсудить: ${f.t}`}
              >
                →
              </a>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Host() {
  return (
    <section aria-label="Хозяйка пространства" className="bg-card">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-28 md:grid-cols-12 md:px-12 md:py-36">
        <Reveal className="md:col-span-5 md:col-start-2">
          <img
            src="/assets/arka-123-brand-host-master.png"
            alt="Хозяйка пространства АРКА 123"
            className="arch block aspect-[3/4] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={150} className="md:col-span-5 md:col-start-8">
          <SectionLabel n="04">Голос пространства</SectionLabel>
          <blockquote className="font-display mt-10 text-4xl leading-tight md:text-5xl">
            «Я встречу вас у арок и покажу, каким может стать ваше событие».
          </blockquote>
          <p className="mt-8 text-muted-foreground">Хозяйка АРКИ 123</p>
        </Reveal>
      </div>
    </section>
  );
}

function Location() {
  const map =
    "https://yandex.by/maps/?text=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9C%D1%81%D1%82%D0%B8%D1%81%D0%BB%D0%B0%D0%B2%D1%86%D0%B0%2C%2010";
  return (
    <section id="location" className="mx-auto max-w-[1440px] px-6 py-28 md:px-12 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <SectionLabel n="05">Как добраться</SectionLabel>
          <h2 className="font-display mt-10 text-5xl leading-[1] md:text-7xl">
            Встречаемся напротив <em className="text-wood-deep">Библиотеки</em>
          </h2>
          <address className="mt-12 not-italic">
            <p className="eyebrow text-muted-foreground">Адрес</p>
            <p className="font-display mt-3 text-3xl">Минск, ул. Мстиславца, 10</p>
            <p className="mt-2 text-muted-foreground">Напротив Национальной библиотеки Беларуси</p>
          </address>
          <a
            href={map}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-10 inline-block border-b border-graphite pb-1 hover:text-wood-deep"
          >
            Открыть на карте ↗
          </a>
        </Reveal>
        <Reveal delay={150} className="md:col-span-6">
          <a
            href={map}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden border border-border placeholder-photo"
            aria-label="Открыть карту: Минск, ул. Мстиславца, 10"
          >
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 h-full w-full text-graphite/25"
              aria-hidden
            >
              <path
                d="M0 210 L400 150 M120 0 L170 300 M0 80 L400 110 M290 0 L250 300"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <polygon
                points="275,40 330,75 310,135 250,120 240,65"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="eyebrow absolute right-[18%] top-[16%] text-graphite/60">
              Библиотека
            </span>
            <span className="absolute left-[44%] top-[52%] flex flex-col items-center">
              <span className="arch h-8 w-6 bg-graphite transition-transform group-hover:-translate-y-1" />
              <span className="eyebrow mt-2 bg-ivory px-2 py-1">АРКА 123</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const TYPES = ["Мастер-класс", "Семинар", "Деловая встреча", "Творческое событие", "Другое"];
type Errors = Partial<Record<"name" | "contact" | "type" | "date", string>>;

function Booking() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Errors = {};
    if (String(f.get("name") || "").trim().length < 2) er.name = "Укажите имя";
    const c = String(f.get("contact") || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(c) && c.replace(/\D/g, "").length < 7)
      er.contact = "Укажите телефон или e-mail";
    if (!f.get("type")) er.type = "Выберите формат";
    const d = String(f.get("date") || "");
    if (d && d < today) er.date = "Дата не может быть в прошлом";
    setErrors(er);
    if (Object.keys(er).length === 0) setDone(true);
  }

  const field =
    "w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory placeholder:text-ivory/35 focus:border-wood focus:outline-none";
  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-2 text-sm text-wood">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="booking" className="bg-graphite text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-28 md:grid-cols-12 md:px-12 md:py-40">
        <div className="md:col-span-5">
          <p className="eyebrow text-wood">06 - Бронирование</p>
          <h2 className="font-display mt-10 text-6xl leading-[0.95] md:text-8xl">
            Обсудить мероприятие
          </h2>
          <p className="mt-8 max-w-sm text-ivory/60">
            Расскажите о задумке - мы ответим и подберем формат.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {done ? (
            <div role="status" className="border border-ivory/20 p-10">
              <p className="font-display text-4xl">Заявка заполнена</p>
              <p className="mt-4 text-ivory/70">
                Отправка заявок пока не подключена, поэтому данные никуда не переданы. Скоро здесь
                появятся контакты для связи.
              </p>
              <button
                onClick={() => setDone(false)}
                className="eyebrow mt-8 border-b border-ivory pb-1"
              >
                Вернуться к форме
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-ivory/60">Имя *</span>
                <input
                  name="name"
                  autoComplete="name"
                  className={field}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-err"
                />
                <Err k="name" />
              </label>
              <label className="block">
                <span className="eyebrow text-ivory/60">Телефон или e-mail *</span>
                <input
                  name="contact"
                  autoComplete="email"
                  className={field}
                  aria-invalid={!!errors.contact}
                  aria-describedby="contact-err"
                />
                <Err k="contact" />
              </label>
              <label className="block">
                <span className="eyebrow text-ivory/60">Формат *</span>
                <select
                  name="type"
                  defaultValue=""
                  className={`${field} [&>option]:text-graphite`}
                  aria-invalid={!!errors.type}
                  aria-describedby="type-err"
                >
                  <option value="" disabled>
                    Выберите
                  </option>
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Err k="type" />
              </label>
              <label className="block">
                <span className="eyebrow text-ivory/60">Дата</span>
                <input
                  type="date"
                  name="date"
                  min={today}
                  className={`${field} [color-scheme:dark]`}
                  aria-invalid={!!errors.date}
                  aria-describedby="date-err"
                />
                <Err k="date" />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow text-ivory/60">Сообщение</span>
                <textarea
                  name="message"
                  rows={3}
                  className={`${field} resize-none`}
                  placeholder="Сколько гостей, какой формат, пожелания"
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="eyebrow bg-ivory px-8 py-5 text-graphite transition-colors hover:bg-wood"
                >
                  Обсудить мероприятие →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-ivory text-graphite">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-4 md:px-12">
        <Logo />
        <div>
          <p className="eyebrow text-graphite/50">Адрес</p>
          <p className="mt-3">Минск, ул. Мстиславца, 10</p>
        </div>
        <div>
          <p className="eyebrow text-graphite/50">Связь</p>
          <p className="mt-3 text-graphite/50">Телефон · будет добавлен</p>
          <p className="text-graphite/50">E-mail · будет добавлен</p>
        </div>
        <p className="eyebrow self-end text-graphite/40 md:text-right">
          © {new Date().getFullYear()} АРКА 123
        </p>
      </div>
    </footer>
  );
}

function SitePreloader({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const fallback = window.setTimeout(onComplete, 2800);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play();
    }
    return () => window.clearTimeout(fallback);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite"
      role="status"
      aria-label="Загрузка АРКА 123"
    >
      <video
        ref={videoRef}
        src="/assets/arka-123-logo-shine-sweep.webm"
        muted
        autoPlay
        playsInline
        onEnded={onComplete}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
      />
    </div>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const completeLoading = useCallback(() => {
    setPreloaderDone(true);
    window.setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`transition-opacity duration-500 ${preloaderDone ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <SitePreloader onComplete={completeLoading} />
        </div>
      )}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ivory focus:p-3"
      >
        К содержанию
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <ScrollExperience />
        <Formats />
        <Host />
        <Location />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
