"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type HolidayType = "fijo" | "movible" | "patrio" | "religioso";
type Holiday = { nombre: string; tipo: HolidayType; icon: string; desc: string };

const feriados2026: Record<number, Record<number, Holiday>> = {
  0: {
    1: {
      nombre: "Año Nuevo",
      tipo: "fijo",
      icon: "🎄",
      desc: "Celebración del inicio del nuevo año. Día de descanso nacional.",
    },
    6: {
      nombre: "Día de Reyes",
      tipo: "religioso",
      icon: "👑",
      desc: "Celebración de la Epifanía y la llegada de los Reyes Magos.",
    },
  },
  1: {
    16: {
      nombre: "Carnaval",
      tipo: "movible",
      icon: "🎭",
      desc: "Fiesta popular con comparsas, disfraces y tradiciones de la región.",
    },
    17: {
      nombre: "Carnaval",
      tipo: "movible",
      icon: "🎭",
      desc: "Fiesta popular con comparsas, disfraces y tradiciones de la región.",
    },
  },
  3: {
    2: {
      nombre: "Jueves Santo",
      tipo: "movible",
      icon: "✝️",
      desc: "Conmemoración de la pasión, muerte y resurrección de Jesucristo.",
    },
    3: {
      nombre: "Viernes Santo",
      tipo: "movible",
      icon: "✝️",
      desc: "Conmemoración de la pasión, muerte y resurrección de Jesucristo.",
    },
    19: {
      nombre: "Declaración de la Independencia",
      tipo: "patrio",
      icon: "📜",
      desc: "Conmemoración del 19 de abril de 1810, primer paso hacia la independencia de Venezuela.",
    },
  },
  4: {
    1: {
      nombre: "Día del Trabajador",
      tipo: "fijo",
      icon: "👷",
      desc: "Reconocimiento a la lucha y los derechos de los trabajadores venezolanos.",
    },
  },
  5: {
    24: {
      nombre: "Batalla de Carabobo",
      tipo: "patrio",
      icon: "⚔️",
      desc: "Conmemoración de la Batalla de Carabobo de 1821, que selló la independencia de Venezuela.",
    },
  },
  6: {
    5: {
      nombre: "Día de la Independencia",
      tipo: "patrio",
      icon: "🇻🇪",
      desc: "Firma del Acta de la Independencia de Venezuela en 1811. Fecha máxima de la patria.",
    },
    24: {
      nombre: "Natalicio de Simón Bolívar",
      tipo: "patrio",
      icon: "🎂",
      desc: "Nacimiento del Libertador Simón Bolívar en 1783. Celebración nacional.",
    },
  },
  9: {
    12: {
      nombre: "Día de la Resistencia Indígena",
      tipo: "fijo",
      icon: "🌊",
      desc: "Reconocimiento a la resistencia de los pueblos originarios frente a la conquista española.",
    },
  },
  11: {
    24: {
      nombre: "Nochebuena",
      tipo: "fijo",
      icon: "🎅",
      desc: "Víspera de Navidad. Celebración familiar con tradiciones venezolanas.",
    },
    25: {
      nombre: "Navidad",
      tipo: "fijo",
      icon: "🎁",
      desc: "Celebración del nacimiento de Jesús. Día de unión familiar y descanso nacional.",
    },
    31: {
      nombre: "Fin de Año",
      tipo: "fijo",
      icon: "🎉",
      desc: "Despedida del año con tradiciones, uvas y reuniones familiares.",
    },
  },
};

const nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

function firstDayAdjusted(year: number, month: number) {
  const firstDayIndex = new Date(year, month, 1).getDay(); // Dom=0..Sab=6
  return firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Lun=0..Dom=6
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const CALENDAR_YEAR = 2026;

function readToday() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  };
}

export function HolidayCalendar() {
  const today = useMemo(() => readToday(), []);
  const [month, setMonth] = useState(() =>
    today.year === CALENDAR_YEAR ? today.month : new Date().getMonth(),
  );
  const [year, setYear] = useState(CALENDAR_YEAR);
  const [mounted, setMounted] = useState(false);
  const [isTouchUi, setIsTouchUi] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const [tooltip, setTooltip] = useState<{
    active: boolean;
    mobile: boolean;
    x: number;
    y: number;
    html: string;
  }>({ active: false, mobile: false, x: 0, y: 0, html: "" });

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const lastPointer = useRef({ x: 0, y: 0 });

  const empty = useMemo(() => firstDayAdjusted(year, month), [year, month]);
  const total = useMemo(() => daysInMonth(year, month), [year, month]);
  const feriadosMes = feriados2026[month] || {};

  function buildTooltipHtml(holiday: Holiday, day: number, withClose = false) {
    const closeBtn = withClose
      ? `<button type="button" class="tooltip-close" aria-label="Cerrar detalle">×</button>`
      : "";
    return `
      ${closeBtn}
      <div class="tooltip-header">
        <div class="tooltip-icon">${holiday.icon}</div>
        <div class="tooltip-title-box">
          <div class="tooltip-title">${holiday.nombre}</div>
          <span class="event-type-badge ${holiday.tipo} tooltip-type">${holiday.tipo}</span>
        </div>
      </div>
      <div class="event-date-badge" style="margin-bottom: 0.2rem; font-size: 0.65rem;">
        ${day} de ${nombresMeses[month].toLowerCase()}
      </div>
      <div class="tooltip-desc">${holiday.desc}</div>
    `;
  }

  function clampTooltipPosition(clientX: number, clientY: number) {
    const pad = 12;
    const topInset = 76;
    const bottomInset = 92;
    const w = tooltipRef.current?.offsetWidth ?? 280;
    const h = tooltipRef.current?.offsetHeight ?? 130;

    let x = clientX + 15;
    let y = clientY + 15;

    if (x + w > window.innerWidth - pad) x = clientX - w - 15;
    if (y + h > window.innerHeight - bottomInset) y = clientY - h - 15;

    x = Math.max(pad, Math.min(x, window.innerWidth - w - pad));
    y = Math.max(topInset, Math.min(y, window.innerHeight - h - bottomInset));

    return { x, y };
  }

  function showDesktop(e: React.MouseEvent, holiday: Holiday, day: number) {
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const { x, y } = clampTooltipPosition(e.clientX, e.clientY);
    setActiveDay(day);
    setTooltip({
      active: true,
      mobile: false,
      x,
      y,
      html: buildTooltipHtml(holiday, day),
    });
  }

  function showMobile(holiday: Holiday, day: number) {
    setActiveDay(day);
    setTooltip({
      active: true,
      mobile: true,
      x: 0,
      y: 0,
      html: buildTooltipHtml(holiday, day, true),
    });
  }

  function toggleMobile(holiday: Holiday, day: number) {
    if (tooltip.active && tooltip.mobile && activeDay === day) {
      hide();
      return;
    }
    showMobile(holiday, day);
  }

  function show(e: React.MouseEvent, holiday: Holiday, day: number) {
    if (isTouchUi) return;
    showDesktop(e, holiday, day);
  }

  function move(e: React.MouseEvent) {
    if (!tooltip.active || tooltip.mobile) return;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const { x, y } = clampTooltipPosition(e.clientX, e.clientY);
    setTooltip((t) => ({ ...t, x, y }));
  }

  function hide() {
    setActiveDay(null);
    setTooltip((t) => ({ ...t, active: false, mobile: false }));
  }

  function changeMonth(delta: number) {
    let m = month + delta;
    let y = year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }

    if (y !== CALENDAR_YEAR) {
      if (y < CALENDAR_YEAR) {
        y = CALENDAR_YEAR;
        m = 0;
      } else {
        y = CALENDAR_YEAR;
        m = 11;
      }
    }

    setMonth(m);
    setYear(y);
    hide();
  }

  // Mount, detect mobile layout, dismiss desktop tooltip on scroll/resize
  useEffect(() => {
    setMounted(true);

    const touchMq = window.matchMedia("(max-width: 1024px), (pointer: coarse)");
    const updateTouchUi = () => setIsTouchUi(touchMq.matches);
    updateTouchUi();
    touchMq.addEventListener("change", updateTouchUi);

    const onScroll = () => {
      setTooltip((t) => {
        if (!t.active || t.mobile) return t;
        return { ...t, active: false };
      });
      setActiveDay(null);
    };
    const onResize = () => hide();

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onResize);

    return () => {
      touchMq.removeEventListener("change", updateTouchUi);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!tooltip.active || tooltip.mobile) return;
    const { x, y } = clampTooltipPosition(lastPointer.current.x, lastPointer.current.y);
    setTooltip((t) => ({ ...t, x, y }));
  }, [tooltip.active, tooltip.mobile, tooltip.html]);

  useEffect(() => {
    if (!tooltip.active || !tooltip.mobile) return;

    function onCloseClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest(".tooltip-close")) hide();
    }

    document.addEventListener("click", onCloseClick);
    return () => document.removeEventListener("click", onCloseClick);
  }, [tooltip.active, tooltip.mobile]);

  return (
    <>
      <div className="calendar-dashboard">
        <div className="calendar-card">
          <div className="calendar-header">
            <button
              className="cal-btn"
              onClick={() => changeMonth(-1)}
              aria-label="Mes anterior"
            >
              ←
            </button>
            <h3>
              {nombresMeses[month]} {year}
            </h3>
            <button
              className="cal-btn"
              onClick={() => changeMonth(1)}
              aria-label="Mes siguiente"
            >
              →
            </button>
          </div>

          <div className="calendar-weekdays">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
            <div>Dom</div>
          </div>

          <div className="calendar-days" aria-label="Días del mes">
            {Array.from({ length: empty }).map((_, i) => (
              <div key={`e-${i}`} className="day-cell empty" />
            ))}

            {Array.from({ length: total }).map((_, idx) => {
              const day = idx + 1;
              const holiday = feriadosMes[day];
              const isToday =
                year === CALENDAR_YEAR &&
                today.year === CALENDAR_YEAR &&
                month === today.month &&
                day === today.day;

              const cls = [
                "day-cell",
                isToday ? "today" : "",
                holiday ? `has-feriado ${holiday.tipo}` : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={day}
                  className={cls}
                  onClick={(e) => {
                    if (!holiday || !isTouchUi) return;
                    e.stopPropagation();
                    toggleMobile(holiday, day);
                  }}
                  onMouseEnter={(e) => {
                    if (!holiday) return;
                    show(e, holiday, day);
                  }}
                  onMouseMove={(e) => {
                    if (!holiday) return;
                    move(e);
                  }}
                  onMouseLeave={() => {
                    if (!holiday || isTouchUi) return;
                    hide();
                  }}
                >
                  <span className="day-number">{day}</span>
                  {holiday ? <span className="day-emoji">{holiday.icon}</span> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {mounted
        ? createPortal(
            <>
              {tooltip.active && tooltip.mobile ? (
                <button
                  type="button"
                  className="holiday-tooltip-backdrop"
                  aria-label="Cerrar detalle del feriado"
                  onClick={hide}
                />
              ) : null}
              <div
                ref={tooltipRef}
                className={[
                  "holiday-tooltip",
                  tooltip.mobile ? "holiday-tooltip-sheet" : "",
                  tooltip.active ? "active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={tooltip.mobile ? undefined : { left: tooltip.x, top: tooltip.y }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: tooltip.html || " " }}
              />
            </>,
            document.body,
          )
        : null}
    </>
  );
}

