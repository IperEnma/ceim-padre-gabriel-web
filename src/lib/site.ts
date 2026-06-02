export const site = {
  shortName: "Colegio PG",
  name: "Colegio Padre Gabriel",
  description:
    "Colegio con propuesta integral, acompañamiento cercano y una comunidad educativa comprometida. Consultá por vacantes e inscripciones.",
  url: "https://example.com",
  keywords: [
    "colegio",
    "escuela",
    "inscripciones",
    "admisiones",
    "jardin",
    "primaria",
    "secundaria",
  ],
  contact: {
    phoneDisplay: "+54 11 0000-0000",
    phoneE164: "+541100000000",
    whatsappDisplay: "+54 11 0000-0000",
    email: "info@colegiopadregabriel.edu.ar",
    addressLine1: "Calle 123",
    addressLine2: "Ciudad, Provincia",
    hours: "Lun a Vie 8:00 a 16:00",
  },
  links: {
    whatsapp:
      "https://wa.me/541100000000?text=Hola%20%E2%80%94%20quiero%20recibir%20informaci%C3%B3n%20sobre%20inscripciones.",
    maps: "https://maps.google.com",
  },
  hero: {
    title: "Una educación con valores, exigencia y acompañamiento real.",
    subtitle:
      "Aprendizajes significativos, proyectos, convivencia cuidada y comunicación cercana con las familias.",
    bullets: [
      "Seguimiento personalizado",
      "Proyectos y talleres",
      "Equipo docente cercano",
      "Comunidad y valores",
    ],
    cardSubtitle: "Información rápida para familias",
    cardPoints: [
      {
        title: "Vacantes y visitas",
        text: "Coordinamos entrevista y recorrido por el colegio.",
      },
      {
        title: "Admisiones",
        text: "Acompañamos el proceso y respondemos tus dudas.",
      },
      {
        title: "Comunicación",
        text: "Canales claros con dirección y docentes.",
      },
    ],
  },
  valueProp: {
    title: "Lo que nos diferencia",
    subtitle:
      "Una propuesta clara, con criterios pedagógicos y un clima escolar cuidado.",
  },
  features: [
    {
      title: "Proyecto pedagógico",
      text: "Planificación por objetivos, evaluación formativa y seguimiento de trayectorias.",
    },
    {
      title: "Convivencia cuidada",
      text: "Acuerdos de convivencia, mediación y trabajo con familias.",
    },
    {
      title: "Inglés y tecnología",
      text: "Progresión por niveles y herramientas digitales con propósito.",
    },
    {
      title: "Deportes y vida saludable",
      text: "Actividades físicas, hábitos y espacios de juego.",
    },
    {
      title: "Arte y proyectos",
      text: "Muestras, talleres y proyectos interdisciplinarios.",
    },
    {
      title: "Acompañamiento",
      text: "Orientación escolar y comunicación frecuente con las familias.",
    },
  ],
  levels: [
    {
      name: "Inicial",
      ages: "Sala de 3, 4 y 5",
      text: "Juego, lenguaje, motricidad y primeras nociones de convivencia y autonomía.",
      highlights: ["Talleres", "Rutinas cuidadas", "Comunicación con familias"],
    },
    {
      name: "Primaria",
      ages: "1° a 7°",
      text: "Alfabetización sólida, matemática, ciencias, proyectos y hábitos de estudio.",
      highlights: ["Proyecto lector", "Inglés", "Tecnología con propósito"],
    },
    {
      name: "Secundaria",
      ages: "1° a 5°/6°",
      text: "Orientación, pensamiento crítico, proyectos, acompañamiento y preparación para lo que sigue.",
      highlights: ["Tutorías", "Proyectos", "Acompañamiento vocacional"],
    },
  ],
  admissions: {
    steps: [
      {
        n: 1,
        title: "Consulta inicial",
        text: "Escribinos por WhatsApp o completá el formulario.",
      },
      {
        n: 2,
        title: "Entrevista / visita",
        text: "Coordinamos día y horario según disponibilidad.",
      },
      {
        n: 3,
        title: "Documentación",
        text: "Te compartimos la lista según nivel y situación.",
      },
      {
        n: 4,
        title: "Confirmación",
        text: "Te guiamos con la reserva de vacante y fechas.",
      },
    ],
    docs: [
      "DNI del alumno/a y adulto responsable",
      "Partida de nacimiento",
      "Certificado de vacunas / apto médico (según nivel)",
      "Pase / libreta (si corresponde)",
    ],
  },
  nav: [
    { label: "Propuesta", href: "#propuesta" },
    { label: "Niveles", href: "#niveles" },
    { label: "Admisiones", href: "#admisiones" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;

