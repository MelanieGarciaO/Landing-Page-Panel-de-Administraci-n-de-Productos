import { useEffect, useMemo, useState } from "react";
import { getProducts, CATEGORIAS, BASE_URL } from "../api/products";
import Reveal from "../components/Reveal.jsx";
import AdminAccessModal from "../components/AdminAccessModal.jsx";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaFire,
  FaStar,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1761271046396-97d231b59dd7?fm=jpg&q=70&w=2000&auto=format&fit=crop";
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1775059956734-78ffd2075cec?fm=jpg&q=70&w=1200&auto=format&fit=crop";

const HOURS = [
  { day: "Lunes - Viernes", hours: "7:00 am – 8:00 pm", dow: [1, 2, 3, 4, 5], open: 7, close: 20 },
  { day: "Sábado", hours: "8:00 am – 9:00 pm", dow: [6], open: 8, close: 21 },
  { day: "Domingo", hours: "8:00 am – 6:00 pm", dow: [0], open: 8, close: 18 },
];

const ADDRESS = "Av. Siempre Viva 123, Guayaquil, Ecuador";
const WHATSAPP_NUMBER = "593991234567";
const INSTAGRAM_HANDLE = "cafearoma.ec";

const TIMELINE = [
  { year: "2013", text: "Abrimos nuestras puertas con una tostadora prestada y muchas ganas." },
  { year: "2016", text: "Compramos nuestra primera tostadora propia y ampliamos la carta." },
  { year: "2019", text: "Ampliamos el local para tener más espacio para trabajar y compartir." },
  { year: "Hoy", text: "Seguimos tostando en pequeños lotes y horneando cada día." },
];

function isOpenNow() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const block = HOURS.find((h) => h.dow.includes(day));
  if (!block) return false;
  return hour >= block.open && hour < block.close;
}

function getProductRating(id) {
  const base = 4.2 + ((id * 7) % 8) * 0.1;
  return Math.min(base, 5).toFixed(1);
}

function Navbar({ onAdminClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = (
    <>
      <a href="#nosotros" onClick={() => setMenuOpen(false)} className="hover:text-coffee-200 transition">Nosotros</a>
      <a href="#menu" onClick={() => setMenuOpen(false)} className="hover:text-coffee-200 transition">Menú</a>
      <a href="#contacto" onClick={() => setMenuOpen(false)} className="hover:text-coffee-200 transition">Contacto</a>
      <button
        onClick={() => {
          setMenuOpen(false);
          onAdminClick();
        }}
        className="px-4 py-2 rounded-lg bg-coffee-500 hover:bg-coffee-400 transition font-semibold text-center"
      >
        Panel Admin
      </button>
    </>
  );

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-coffee-900/95 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between text-cream-50">
        <span className="font-display text-xl font-bold flex items-center gap-2">
          <span></span> Café Aroma
        </span>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {links}
        </div>

        <button
          className="sm:hidden p-2 -mr-2"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-4 px-6 pb-6 text-cream-50 text-sm font-medium">
          {links}
        </div>
      )}
    </nav>
  );
}

function Hero({ onAdminClick }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-900/90 via-coffee-900/75 to-coffee-700/60" />

      <div className="relative z-10 max-w-4xl xl:max-w-5xl mx-auto text-center px-6 text-cream-50 py-28">
        <p className="uppercase tracking-[0.3em] text-coffee-200 text-sm lg:text-base mb-4">
          Tostado artesanal · Desde el barrio
        </p>
        <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold leading-tight mb-5">
          El aroma que despierta<br />tu día
        </h1>
        <p className="text-coffee-100 text-lg lg:text-xl mb-8 max-w-xl lg:max-w-2xl mx-auto">
          Café de especialidad, postres horneados a diario y un rincón cálido
          para trabajar, conversar o simplemente hacer una pausa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#menu"
            className="px-8 py-3 lg:px-10 lg:py-4 lg:text-lg rounded-full bg-coffee-400 text-coffee-900 font-bold hover:bg-coffee-300 hover:scale-105 active:scale-95 transition-all shadow-lg animate-soft-pulse"
          >
            Ver el menú
          </a>
          <button
            onClick={onAdminClick}
            className="px-8 py-3 lg:px-10 lg:py-4 lg:text-lg rounded-full border border-cream-100/40 text-cream-50 font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            Ir al panel de administración
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 lg:gap-10 max-w-lg lg:max-w-2xl mx-auto border-t border-cream-100/20 pt-6">
          {[
            { value: "12+", label: "Años de experiencia" },
            { value: "50k+", label: "Cafés servidos" },
            { value: "8k+", label: "Clientes felices" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold">{s.value}</p>
              <p className="text-xs sm:text-sm lg:text-base text-coffee-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <img
            src={ABOUT_IMAGE}
            alt="Interior de Café Aroma"
            className="rounded-2xl shadow-lg w-full h-[26rem] lg:h-[32rem] object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-coffee-500 font-semibold uppercase tracking-wide text-sm lg:text-base mb-2">
            Nuestra historia
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-coffee-900 mb-4">
            Más de una década tostando con cariño
          </h2>

          <blockquote className="border-l-4 border-coffee-400 pl-4 italic text-coffee-800 lg:text-lg mb-6">
            "Creemos que una buena taza de café puede cambiar el resto del
            día de alguien. Esa es nuestra misión, taza tras taza."
          </blockquote>

          <p className="text-coffee-700 lg:text-lg leading-relaxed mb-8">
            Café Aroma nació en 2013 como un pequeño local de barrio. Hoy
            seguimos seleccionando granos de origen, tostándolos en pequeños
            lotes y horneando cada día para que cada visita se sienta como en casa.
          </p>

          <ol className="relative border-l-2 border-coffee-200 space-y-6 ml-2">
            {TIMELINE.map((item) => (
              <li key={item.year} className="ml-6">
                <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-coffee-500 border-2 border-cream-50" />
                <p className="font-bold text-coffee-900">{item.year}</p>
                <p className="text-coffee-600 text-sm">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function MenuSection() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const newestIds = useMemo(() => {
    return [...products]
      .sort((a, b) => b.id - a.id)
      .slice(0, 2)
      .map((p) => p.id);
  }, [products]);

  const filtered = useMemo(() => {
    if (activeCategory === "todos") return products;
    return products.filter((p) => p.categoria === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="menu" className="py-24 lg:py-32 bg-coffee-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-coffee-500 font-semibold uppercase tracking-wide text-sm lg:text-base mb-2">
              Nuestra carta
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-coffee-900">
              Menú del día
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === "todos"
                ? "bg-coffee-700 text-white scale-105"
                : "bg-white text-coffee-700 border border-coffee-200 hover:bg-coffee-100"
            }`}
          >
            Todos
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.value
                  ? "bg-coffee-700 text-white scale-105"
                  : "bg-white text-coffee-700 border border-coffee-200 hover:bg-coffee-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-coffee-600">Cargando menú...</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-coffee-600">
            Pronto agregaremos productos en esta categoría.
          </p>
        )}

        <div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 animate-fade-in-up"
        >
          {filtered.map((product) => {
            const imageUrl = product.image_url
              ? `${BASE_URL}${product.image_url}`
              : `${BASE_URL}/static/img/default.jpg`;
            const isBestSeller = product.id % 3 === 0;
            const isNew = newestIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md border border-coffee-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={imageUrl}
                    alt={product.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="flex items-center gap-1 text-xs font-bold bg-coffee-700 text-white px-2 py-1 rounded-full shadow">
                    <FaFire className="text-sm" />
                    Más vendido
                  </span>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {isBestSeller && (
                      <span className="text-xs font-bold bg-coffee-700 text-white px-2 py-1 rounded-full shadow">
                        <FaFire className="text-sm" />
                        Más vendido
                      </span>
                    )}
                    {isNew && (
                      <span className="text-xs font-bold bg-green-600 text-white px-2 py-1 rounded-full shadow">
                        <HiSparkles className="text-sm" />
                        Nuevo
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-coffee-900">{product.nombre}</h3>
                    <span className="font-bold text-coffee-600">${product.precio}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-coffee-500 text-xs uppercase tracking-wide">
                      {product.categoria_display}
                    </p>
                    <span className="text-xs text-coffee-600 flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {getProductRating(product.id)}
                    </span>
                  </div>
                  <p className="text-coffee-700 text-sm flex-1">{product.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpenNow());
    const interval = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(interval);
  }, []);

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero reservar una mesa en Café Aroma")}`;
  const instagramUrl = `https://www.instagram.com/cafearoma.ec`;

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-coffee-900 text-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 lg:gap-20">
        <Reveal>
          <p className="text-coffee-300 font-semibold uppercase tracking-wide text-sm lg:text-base mb-2">
            Visítanos
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Contacto y horario
          </h2>
          <ul className="space-y-3 text-coffee-100 mb-6">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="mt-1 text-coffee-300" /> {ADDRESS}
            </li>
            <li className="flex gap-3">
              <FaPhoneAlt className="mt-1 text-coffee-300" /> +{WHATSAPP_NUMBER}
            </li>
            <li className="flex gap-3">
              <FaEnvelope className="mt-1 text-coffee-300" />hola@cafearoma.com
            </li>
          </ul>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 transition font-semibold"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition font-semibold"
            >
              <FaInstagram />
              Instagram
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cream-100/40 hover:bg-white/10 transition font-semibold"
            >
              Cómo llegar
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-56 lg:h-72">
            <iframe
              title="Ubicación de Café Aroma"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-coffee-800 rounded-2xl p-8 lg:p-10 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Horario de atención</h3>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  open ? "bg-green-600 text-white" : "bg-red-500/80 text-white"
                }`}
              >
                {open ? "Abierto ahora" : "Cerrado ahora"}
              </span>
            </div>
            <ul className="divide-y divide-coffee-700">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between py-3 text-coffee-100">
                  <span>{h.day}</span>
                  <span className="font-semibold">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTASection() {
  const reserveUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero reservar una mesa en Café Aroma")}`;
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-coffee-700 to-coffee-500">
      <Reveal className="max-w-3xl lg:max-w-4xl mx-auto text-center px-6 text-cream-50">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          ¿Listo para tu próxima taza?
        </h2>
        <p className="text-coffee-100 lg:text-lg mb-8">
          Ven a visitarnos o reserva tu mesa para una experiencia completa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="px-8 py-3 rounded-full bg-white text-coffee-800 font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Ver Menú Completo
          </a>
          <a
            href={reserveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-cream-100/50 text-cream-50 font-semibold hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            Reservar Mesa
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ onAdminClick }) {
  const instagramUrl = `https://www.instagram.com/cafearoma.ec`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="bg-coffee-900 border-t border-coffee-800 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-3 gap-8 lg:gap-12 text-coffee-300 text-sm mb-8">
        <div>
          <h4 className="font-display text-lg font-bold text-cream-50 mb-3">
            Café Aroma
          </h4>
          <p>Café de especialidad y postres artesanales desde 2013.</p>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-cream-50 mb-3">Enlaces rápidos</h4>
          <ul className="space-y-2">
            <li><a href="#nosotros" className="hover:text-cream-50 transition">Nosotros</a></li>
            <li><a href="#menu" className="hover:text-cream-50 transition">Menú</a></li>
            <li><a href="#contacto" className="hover:text-cream-50 transition">Contacto</a></li>
            <li>
              <button onClick={onAdminClick} className="hover:text-cream-50 transition">
                Panel administrativo
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-cream-50 mb-3">Contacto</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
               <FaPhoneAlt />
               +{WHATSAPP_NUMBER}
            </li>
            <li  className="flex items-center gap-2">
               <FaEnvelope />
               hola@cafearoma.com
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-coffee-700 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-coffee-700 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-coffee-700 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 border-t border-coffee-800 text-center text-coffee-400 text-xs">
        © {new Date().getFullYear()} Café Aroma. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default function Landing() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const openAdminModal = () => setShowAdminModal(true);

  return (
    <div>
      <Navbar onAdminClick={openAdminModal} />
      <Hero onAdminClick={openAdminModal} />
      <About />
      <MenuSection />
      <Contact />
      <CTASection />
      <Footer onAdminClick={openAdminModal} />
      <AdminAccessModal open={showAdminModal} onClose={() => setShowAdminModal(false)} />
    </div>
  );
}
