"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { HolidayCalendar } from "@/components/HolidayCalendar";
import { CEIM_EMAIL, CEIM_MAPS_URL } from "@/lib/ceim-contact";
import { CEIM_LOGO_SRC } from "@/lib/ceim-logo";

type PageKey = "inicio" | "historia" | "mision" | "feriados" | "galeria" | "contacto";

const pages: Array<{ key: PageKey; label: string }> = [
  { key: "inicio", label: "Inicio" },
  { key: "historia", label: "Historia" },
  { key: "mision", label: "Misión" },
  { key: "feriados", label: "Feriados" },
  { key: "galeria", label: "Galería" },
  { key: "contacto", label: "Contacto" },
];

export function CeimBook() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const startX = useRef<number | null>(null);

  const total = pages.length;

  const canPrev = current > 0;
  const canNext = current < total - 1;

  const transform = useMemo(() => `translateX(-${current * 100}vw)`, [current]);

  function goTo(index: number) {
    if (isTransitioning || index === current) return;
    if (index < 0 || index >= total) return;
    setIsTransitioning(true);
    setCurrent(index);
  }

  useEffect(() => {
    const id = window.setTimeout(() => setIsTransitioning(false), 650);
    return () => window.clearTimeout(id);
  }, [current]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (canNext) goTo(current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (canPrev) goTo(current - 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canNext, canPrev, current]);

  function dismissSwipeHint() {
    setShowSwipeHint(false);
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    let hideTimer: number | undefined;

    function showHintIfMobile() {
      if (!mq.matches) {
        setShowSwipeHint(false);
        return;
      }
      setShowSwipeHint(true);
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(dismissSwipeHint, 4200);
    }

    showHintIfMobile();
    mq.addEventListener("change", showHintIfMobile);

    return () => {
      mq.removeEventListener("change", showHintIfMobile);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="ceim-body">
      <nav className="ceim-nav" aria-label="Navegación principal">
        <a
          href="#"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            goTo(0);
          }}
        >
          <img
            className="nav-logo-img"
            src={CEIM_LOGO_SRC}
            alt="Logo C.E.I.M."
            width={48}
            height={48}
            style={{ width: 48, height: 48, objectFit: "contain", borderRadius: "50%" }}
          />
          <div className="nav-logo-text">
            C.E.I.M. &quot;Padre Gabriel
            <br />
            Figueras Llagostera&quot;
          </div>
        </a>

        <ul className="ceim-navLinks">
          {pages.map((p, i) => (
            <li key={p.key}>
              <a
                href="#"
                className="ceim-navLink"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(i);
                }}
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ceim-book" aria-label="Secciones">
        <div
          className="ceim-pages"
          style={{ transform }}
          onTouchStart={(e) => {
            if (showSwipeHint) dismissSwipeHint();
            startX.current = e.changedTouches[0]?.screenX ?? null;
          }}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0]?.screenX ?? null;
            const s = startX.current;
            startX.current = null;
            if (s == null || endX == null) return;
            const diff = s - endX;
            const threshold = 50;
            if (Math.abs(diff) <= threshold) return;
            if (diff > 0 && canNext) goTo(current + 1);
            if (diff < 0 && canPrev) goTo(current - 1);
          }}
        >
          <div className="ceim-page" id="pagina-inicio">
            <section id="hero" className="hero-screen">
              <div className="hero-layout">
                <div className="hero-text">
                  <span className="hero-eyebrow">Porlamar · Nueva Esparta · Desde 1949</span>
                  <h1 className="hero-title">
                    Formando niños y
                    <br />
                    niñas con <em>valores</em>
                    <br />
                    para Venezuela
                  </h1>
                  <p className="hero-desc">
                    Educación inicial integral para niños de 2 a 6 años, en un ambiente de
                    respeto, tolerancia y convivencia que fortalece su desarrollo personal y
                    social.
                  </p>
                  <div className="hero-ctas">
                    <button type="button" className="btn-primary" onClick={() => goTo(1)}>
                      Conoce nuestra historia
                    </button>
                    <button type="button" className="btn-outline" onClick={() => goTo(5)}>
                      Contáctanos
                    </button>
                  </div>
                  <div className="hero-info-cards">
                    <div className="hic">
                      <span className="hic-icon">🏛️</span>
                      <strong>Dependencia</strong>
                      <span>Alcaldía del Municipio Mariño</span>
                    </div>
                    <div className="hic">
                      <span className="hic-icon">🕗</span>
                      <strong>Horario</strong>
                      <span>Lun–Vie · 7:30 – 3:30</span>
                    </div>
                    <div className="hic">
                      <span className="hic-icon">👶</span>
                      <strong>Edades</strong>
                      <span>Niños de 2 a 6 años</span>
                    </div>
                    <div className="hic">
                      <span className="hic-icon">📍</span>
                      <strong>Dirección</strong>
                      <span>Calle Gómez cruce c/ Marcano</span>
                    </div>
                  </div>
                </div>

                <div className="hero-visual">
                  <div className="hero-logo-display">
                    <div className="hero-shield-float">
                      <img
                        className="hero-shield"
                        src={CEIM_LOGO_SRC}
                        alt="Escudo C.E.I.M."
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="hero-card">
                      <div className="card-icon">🌟</div>
                      <h3>Centro de Educación Inicial Municipal</h3>
                      <p>
                        Atención integral con valores sólidos y compromiso con la
                        transformación del país.
                      </p>
                      <div className="stats-row">
                        <div className="stat-item">
                          <span className="stat-num">75+</span>
                          <span className="stat-label">Años de historia</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-num">2–6</span>
                          <span className="stat-label">Años de edad</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-num">6</span>
                          <span className="stat-label">Valores clave</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="ceim-page" id="pagina-historia">
            <section className="ceim-section historia-screen" id="historia">
              <div className="section-inner">
                <span className="section-tag">Reseña Histórica</span>
                <h2 className="section-title">
                  Una trayectoria de
                  <br />
                  más de siete décadas
                </h2>
                <p className="section-lead">
                  Desde su fundación en 1949 como Casa-Cuna, nuestra institución ha crecido y
                  evolucionado junto a la comunidad de Porlamar, adaptándose siempre a las
                  necesidades de las familias venezolanas.
                </p>

                <div className="timeline">
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">1 de abril de 1949</div>
                    <div className="tl-text">
                      Fundación de la <strong>Casa-Cuna</strong> bajo el nombre de Consejo
                      Venezolano del Niño (C.V.N.), en la calle Zamora, municipio Mariño del
                      estado Nueva Esparta.
                    </div>
                  </div>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">1978</div>
                    <div className="tl-text">
                      Traslado a la calle Igualdad y adopción del nombre{" "}
                      <strong>Instituto Nacional de Atención al Menor (I.N.A.M.)</strong>. El 17
                      de julio, el Dr. Antonio Narváez le otorga el nombre de Jardín de Infancia{" "}
                      <em>&quot;Dr. Francisco Antonio Risquez&quot;</em>, en honor al ilustre médico
                      venezolano.
                    </div>
                  </div>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">2004</div>
                    <div className="tl-text">
                      La institución recibe el nombre de{" "}
                      <strong>Centro de Educación Inicial &quot;Papagayo&quot;</strong>, bajo la
                      dirección de la profesora Anaelvira Brito Guerra.
                    </div>
                  </div>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">1 de enero de 2008</div>
                    <div className="tl-text">
                      Pasa a depender de la <strong>Alcaldía del municipio Mariño</strong>, con
                      horario integral de 7:30 a.m. a 3:30 p.m.
                    </div>
                  </div>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">Febrero de 2018</div>
                    <div className="tl-text">
                      La magíster <strong>Brigette Rodríguez</strong> asume la dirección del
                      plantel, manteniéndose en el cargo hasta marzo de 2022.
                    </div>
                  </div>
                  <div className="tl-item">
                    <div
                      className="tl-dot"
                      style={{
                        background: "var(--yellow-deep)",
                        boxShadow: "0 0 0 3px rgba(212,146,10,0.30)",
                      }}
                    />
                    <div className="tl-year" style={{ color: "var(--yellow-deep)" }}>
                      25 de septiembre de 2023
                    </div>
                    <div className="tl-text">
                      En cumplimiento de la resolución 078 del Ministerio del Poder Popular para
                      la Educación, la institución adopta su nombre actual:{" "}
                      <strong>
                        C.E.I.M. &quot;Padre Gabriel Figueras Llagostera&quot;
                      </strong>
                      , bajo la dirección de la profesora Dubraska López.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="ceim-page" id="pagina-mvv">
            <section className="ceim-section mvv-screen" id="mvv">
              <div className="section-inner">
                <span className="section-tag">Identidad Institucional</span>
                <h2 className="section-title">
                  Lo que nos guía
                  <br />
                  cada día
                </h2>

                <div className="mvv-grid">
                  <div className="mvv-card mision">
                    <div className="mvv-icon">🎯</div>
                    <h3>Misión</h3>
                    <p>
                      Somos una institución comprometida con la atención integral de niños y niñas
                      de 2 a 6 años. Planificamos actividades y proyectos orientados a fortalecer
                      el proceso de enseñanza-aprendizaje, formando individuos con valores capaces
                      de incorporarse a la sociedad de manera participativa.
                    </p>
                  </div>

                  <div className="mvv-card vision">
                    <div className="mvv-icon">🌱</div>
                    <h3>Visión</h3>
                    <p>
                      Ser un referente en la educación inicial, comprometidos con el desarrollo
                      integral de los niños y niñas, fomentando su crecimiento personal y social
                      en un ambiente de respeto, tolerancia y convivencia.
                    </p>
                  </div>

                  <div className="mvv-card valores">
                    <div className="mvv-icon">💛</div>
                    <h3>Valores</h3>
                    <p>Los principios que definen nuestra comunidad educativa:</p>
                    <div className="values-pills">
                      <span className="pill">Respeto</span>
                      <span className="pill">Tolerancia</span>
                      <span className="pill">Convivencia</span>
                      <span className="pill">Responsabilidad</span>
                      <span className="pill">Honestidad</span>
                      <span className="pill">Compromiso</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="ceim-page" id="pagina-feriados">
            <section className="ceim-section feriados-screen" id="feriados">
              <div className="section-inner">
                <span className="section-tag">Calendario Escolar</span>
                <h2 className="section-title">
                  Feriados Nacionales
                  <br />
                  de Venezuela
                </h2>
                <p className="section-lead">
                  Conoce los días feriados y fechas patrias que marcamos en nuestro calendario
                  escolar. Momentos ideales para compartir en familia y fortalecer nuestra
                  identidad nacional.
                </p>
                <HolidayCalendar />
              </div>
            </section>
          </div>

          <div className="ceim-page" id="pagina-galeria">
            <section className="ceim-section ceim-galeria galeria-screen" id="galeria">
              <div className="section-inner">
                <span className="section-tag">Galería</span>
                <h2 className="section-title">Nuestra institución</h2>
                <p className="section-lead">
                  Espacios y momentos que hacen parte de nuestra comunidad educativa.
                </p>
                <GalleryCarousel />
              </div>
            </section>
          </div>

          <div className="ceim-page" id="pagina-contacto">
            <section className="ceim-section contacto-screen" id="contacto">
              <div className="section-inner">
                <span className="section-tag">Contáctanos</span>
                <h2 className="section-title">
                  Estamos en
                  <br />
                  Porlamar, Nueva Esparta
                </h2>
                <p className="section-lead">
                  ¿Tienes preguntas sobre inscripciones o nuestra propuesta educativa? Con gusto
                  te atendemos.
                </p>

                <div className="contact-grid">
                  <div>
                    <div className="contact-detail">
                      <div className="contact-ico" aria-hidden>
                        📍
                      </div>
                      <div>
                        <strong>Dirección</strong>
                        <a
                          href={CEIM_MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Calle Gómez cruce con Calle Marcano,
                          <br />
                          Municipio Mariño, Porlamar, N.E. ↗
                        </a>
                      </div>
                    </div>
                    <div className="contact-detail">
                      <div className="contact-ico" aria-hidden>
                        ✉️
                      </div>
                      <div>
                        <strong>Correo Electrónico</strong>
                        <a href={`mailto:${CEIM_EMAIL}`}>{CEIM_EMAIL}</a>
                      </div>
                    </div>
                    <div className="contact-detail">
                      <div className="contact-ico" aria-hidden>
                        🕐
                      </div>
                      <div>
                        <strong>Horario</strong>
                        <span>Lunes a Viernes · 7:30 a.m. – 3:30 p.m.</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={CEIM_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map"
                  >
                    <div className="map-icon" aria-hidden>
                      🗺️
                    </div>
                    <p>
                      Calle Gómez cruce con Calle Marcano
                      <br />
                      Porlamar, Nueva Esparta, Estado Nueva Esparta
                      <br />
                      República Bolivariana de Venezuela
                    </p>
                    <p className="contact-map-hint">Toca para abrir en Google Maps ↗</p>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <button
        className="ceim-navBtn ceim-prev"
        onClick={() => goTo(current - 1)}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={!canPrev}
        aria-label="Página anterior"
      >
        ‹
      </button>
      <button
        className="ceim-navBtn ceim-next"
        onClick={() => goTo(current + 1)}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={!canNext}
        aria-label="Página siguiente"
      >
        ›
      </button>

      <div className="ceim-indicator" role="tablist" aria-label="Indicador de páginas">
        {pages.map((p, i) => (
          <button
            key={p.key}
            className={`ceim-dot ${i === current ? "ceim-dotActive" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir a ${p.label}`}
            aria-current={i === current ? "page" : undefined}
          />
        ))}
      </div>

      <footer className="ceim-footer">
        <div className="footer-brand">
          C.E.I.M. &quot;Padre Gabriel Figueras Llagostera&quot;
        </div>
        <small>© 2026 · Todos los derechos reservados · Porlamar, Nueva Esparta</small>
      </footer>

      {showSwipeHint ? (
        <div className="ceim-swipe-hint" role="status" aria-live="polite">
          <div className="ceim-swipe-hint-gesture" aria-hidden="true">
            <span className="ceim-swipe-hint-hand">👆</span>
          </div>
          <p className="ceim-swipe-hint-text">Desliza hacia los lados para explorar</p>
        </div>
      ) : null}
    </div>
  );
}

