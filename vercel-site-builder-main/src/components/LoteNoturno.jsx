import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Wine, Beer, Martini, GlassWater, ShoppingCart, X, Plus, Minus,
  Clock, Flame, Package, ChevronDown, Check, AlertTriangle, Boxes,
  Sparkles, ArrowRight, Lock, ChevronLeft, CreditCard, QrCode, FileText,
  Truck, Store, Copy, ShieldCheck, CheckCircle2, Building2, Search, Instagram,
} from "lucide-react";



const DATAURI_CRISTALLIS_JABUTICABA = "/images/cristallis_jabuticaba.jpg";

const DATAURI_CRISTALLIS_TANGERINA = "/images/cristallis_tangerina.jpg";

const DATAURI_MILHETO_COQUETEL_MILHO = "/images/milheto_coquetel_milho.jpg";

const IMG_CRISTALLIS_LIMAO = "/images/cristallis_limao_siciliano.jpg";
const IMG_CRISTALLIS_CACHACA = "/images/cristallis_cachaca.jpg";
const IMG_LIMONCELLO = "/images/limoncello.jpg";
const IMG_AMARUKA = "/images/amaruka.jpg";
const IMG_CHOCOAVELA = "/images/chocoavela.jpg";
const IMG_DOCELEITE = "/images/doceleite.jpg";
const IMG_CAIPIROSKA = "/images/caipiroska.jpg";
const IMG_OLD_GOLD = "/images/old_gold.jpg";
const IMG_GAIA_VODKA = "/images/gaia_vodka.jpg";
const IMG_COCOBOM = "/images/cocobom.jpg";
const IMG_CARVALHINHO_AMBURANA = "/images/carvalhinho_amburana.jpg";
const IMG_CARVALHINHO_CARVALHO = "/images/carvalhinho_carvalho.jpg";
const IMG_HERO_FAMILIA = "/images/familia_coqueteis.jpg";




/* ---------------------------------------------------------------------
   Mãe Gaia — adega & distribuidora
   Paleta: preto quente (#120F0B), dourado envelhecido (#D9A94B),
   vinho (#8B2635), creme (#EFE7D6). Cada garrafa carrega um nº de lote:
   a numeração dos cards não é decorativa, é o próprio rastreio de estoque.
--------------------------------------------------------------------- */

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "licores", label: "Licores" },
  { id: "coqueteis", label: "Coquetéis" },
  { id: "vodka", label: "Vodka" },
  { id: "cachaca", label: "Cachaça" },
  { id: "bourbon", label: "Bourbon" },
];

const ICONS = { licores: Wine, coqueteis: Martini, vodka: GlassWater, cachaca: Flame, bourbon: Beer };

const GRADIENTS = {
  licores: "from-[#7A1F3A] via-[#3A0F1E] to-[#120F0B]",
  coqueteis: "from-[#8A6A10] via-[#3D2E0B] to-[#120F0B]",
  vodka: "from-[#2B5B7A] via-[#132B3A] to-[#120F0B]",
  cachaca: "from-[#3E6B2E] via-[#1E3316] to-[#120F0B]",
  bourbon: "from-[#8C5A1F] via-[#452C0E] to-[#120F0B]",
};

// Paleta viva por categoria — usada em badges, bordas, ícones e barras de estoque
const ACCENTS = {
  licores:    { text: "text-[#E8698A]", border: "border-[#E8698A]/40", borderHover: "hover:border-[#E8698A]/70", bg: "bg-[#E8698A]/10", bar: "from-[#B33957] to-[#E8698A]", pill: "border-[#E8698A] bg-[#E8698A]/10 text-[#E8698A]" },
  coqueteis:  { text: "text-[#F0C572]", border: "border-[#F0C572]/40", borderHover: "hover:border-[#F0C572]/70", bg: "bg-[#F0C572]/10", bar: "from-[#D9A94B] to-[#F0C572]", pill: "border-[#F0C572] bg-[#F0C572]/10 text-[#F0C572]" },
  vodka:      { text: "text-[#7EC8F0]", border: "border-[#7EC8F0]/40", borderHover: "hover:border-[#7EC8F0]/70", bg: "bg-[#7EC8F0]/10", bar: "from-[#3D8CBF] to-[#7EC8F0]", pill: "border-[#7EC8F0] bg-[#7EC8F0]/10 text-[#7EC8F0]" },
  cachaca:    { text: "text-[#9BD16C]", border: "border-[#9BD16C]/40", borderHover: "hover:border-[#9BD16C]/70", bg: "bg-[#9BD16C]/10", bar: "from-[#5F9E3B] to-[#9BD16C]", pill: "border-[#9BD16C] bg-[#9BD16C]/10 text-[#9BD16C]" },
  bourbon:    { text: "text-[#E0A24C]", border: "border-[#E0A24C]/40", borderHover: "hover:border-[#E0A24C]/70", bg: "bg-[#E0A24C]/10", bar: "from-[#B37A2E] to-[#E0A24C]", pill: "border-[#E0A24C] bg-[#E0A24C]/10 text-[#E0A24C]" },
};

// ⚠️ PREÇO ainda é PLACEHOLDER — troquem pelos valores reais de vocês.
// Estoque dos 3 produtos: 100 unidades cada (confirmado por vocês).
const PRODUCTS = [
  {
    id: 1,
    lote: "001",
    nome: "Cristallis — Licor Cristalizado de Jabuticaba",
    categoria: "licores",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 65.9, // TODO: preço real
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100, // confirmado por vocês
    estoqueMax: 100,
    imagem: DATAURI_CRISTALLIS_JABUTICABA,
  },
  {
    id: 2,
    lote: "002",
    nome: "Cristallis Dolce — Licor de Tangerina",
    categoria: "licores",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 65.9, // TODO: preço real
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100, // confirmado por vocês
    estoqueMax: 100,
    imagem: DATAURI_CRISTALLIS_TANGERINA,
  },
  {
    id: 3,
    lote: "003",
    nome: "Milheto — Coquetel de Milho",
    categoria: "coqueteis",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 49.8, // TODO: preço real
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100, // confirmado por vocês
    estoqueMax: 100,
    imagem: DATAURI_MILHETO_COQUETEL_MILHO,
  },
  {
    id: 4,
    lote: "004",
    nome: "Cristallis Dolce — Licor Cristalizado de Limão Siciliano",
    categoria: "licores",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 65.9,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CRISTALLIS_LIMAO,
  },
  {
    id: 5,
    lote: "005",
    nome: "Cristallis Dolce — Licor de Cachaça",
    categoria: "licores",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 65.9,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CRISTALLIS_CACHACA,
  },
  {
    id: 6,
    lote: "006",
    nome: "Limoncello — Licor Fino de Limão Siciliano",
    categoria: "licores",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 53.8,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_LIMONCELLO,
  },
  {
    id: 7,
    lote: "007",
    nome: "Amaruka — Coquetel de Marula",
    categoria: "coqueteis",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 59.9,
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_AMARUKA,
  },
  {
    id: 8,
    lote: "008",
    nome: "ChocoAvelã — Coquetel Alcoólico",
    categoria: "coqueteis",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 55.7,
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CHOCOAVELA,
  },
  {
    id: 9,
    lote: "009",
    nome: "DoceLeite — Coquetel Alcoólico",
    categoria: "coqueteis",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 55.7,
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_DOCELEITE,
  },
  {
    id: 10,
    lote: "010",
    nome: "Caipiroska — Batida de Limão com Vodka",
    categoria: "coqueteis",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 32.9,
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CAIPIROSKA,
  },
  {
    id: 11,
    lote: "011",
    nome: "Old Gold — Destilado de Cereais Envelhecido",
    categoria: "bourbon",
    origem: "Gaia Bebidas Artesanais",
    precoVarejo: 89.9,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_OLD_GOLD,
  },
  {
    id: 12,
    lote: "012",
    nome: "Gaia Vodka — Álcool de Cereais Tricamada",
    categoria: "vodka",
    origem: "Gaia Bebidas Artesanais",
    precoVarejo: 54.8,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_GAIA_VODKA,
  },
  {
    id: 13,
    lote: "013",
    nome: "CocoBom — Coquetel de Coco",
    categoria: "coqueteis",
    origem: "Gaia Bebidas Artesanais",
    precoVarejo: 49.8,
    descontoAtacado: 0,
    minAtacado: 12,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_COCOBOM,
  },
  {
    id: 14,
    lote: "014",
    nome: "Cachaça Carvalhinho Amburana",
    categoria: "cachaca",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 69.8,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CARVALHINHO_AMBURANA,
  },
  {
    id: 15,
    lote: "015",
    nome: "Cachaça Carvalhinho Carvalho",
    categoria: "cachaca",
    origem: "Mãe Gaia Bebidas Especiais",
    precoVarejo: 69.8,
    descontoAtacado: 0,
    minAtacado: 6,
    estoque: 100,
    estoqueMax: 100,
    imagem: IMG_CARVALHINHO_CARVALHO,
  },
];

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function stockStatus(available, max) {
  const pct = available / max;
  if (available <= 0) return { label: "Esgotado", tone: "wine" };
  if (available <= 3) return { label: "Raro", tone: "wine" };
  if (pct <= 0.25) return { label: "Últimas unidades", tone: "gold" };
  if (pct <= 0.5) return { label: "Estoque baixo", tone: "amber" };
  return null;
}

const pad = (n) => String(n).padStart(2, "0");

export default function LoteNoturno() {
  const [mode, setMode] = useState("varejo"); // 'varejo' | 'atacado'
  const [category, setCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({}); // id -> qty
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  

  // -------- checkout / pagamento --------
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("entrega"); // 'entrega' | 'pagamento' | 'confirmacao'
  const [deliveryMethod, setDeliveryMethod] = useState("entrega"); // 'entrega' | 'retirada'
  const [form, setForm] = useState({ nome: "", documento: "", telefone: "", cep: "", endereco: "", cidade: "", estado: "" });
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cardForm, setCardForm] = useState({ numero: "", nomeCartao: "", validade: "", cvv: "", parcelas: "1" });
  const [reservationSeconds, setReservationSeconds] = useState(600);
  const [orderNumber, setOrderNumber] = useState(null);
  const [confirmedEntries, setConfirmedEntries] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  useEffect(() => {
    if (!checkoutOpen || checkoutStep === "confirmacao") return;
    if (reservationSeconds <= 0) {
      setCheckoutOpen(false);
      setToast({ type: "warn", text: "Sua reserva expirou. Revise a disponibilidade dos lotes." });
      return;
    }
    const id = setInterval(() => setReservationSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [checkoutOpen, checkoutStep, reservationSeconds]);

  function openCheckout() {
    setCartOpen(false);
    setCheckoutStep("entrega");
    setReservationSeconds(600);
    setCheckoutOpen(true);
  }

  function finalizePayment() {
    const num = `LN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    setConfirmedEntries(cartEntries);
    setConfirmedTotal(cartTotal);
    setCheckoutStep("confirmacao");
  }

  function closeCheckoutAndReset() {
    setCheckoutOpen(false);
    setCart({});
    setForm({ nome: "", documento: "", telefone: "", cep: "", endereco: "", cidade: "", estado: "" });
    setCardForm({ numero: "", nomeCartao: "", validade: "", cvv: "", parcelas: "1" });
    setPaymentMethod("pix");
    setOrderNumber(null);
  }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const productsById = useMemo(() => {
    const map = {};
    PRODUCTS.forEach((p) => (map[p.id] = p));
    return map;
  }, []);

  const filtered = useMemo(() => {
    const byCategory = category === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.categoria === category);
    if (!searchQuery.trim()) return byCategory;
    const q = searchQuery.trim().toLowerCase();
    return byCategory.filter((p) => p.nome.toLowerCase().includes(q));
  }, [category, searchQuery]);

  const totalStockToday = useMemo(
    () => PRODUCTS.reduce((sum, p) => sum + p.estoque, 0),
    []
  );
  const raroCount = useMemo(() => PRODUCTS.filter((p) => p.estoque <= 3).length, []);

  // Estatísticas do programa de atacado, calculadas a partir dos produtos reais
  const wholesaleStats = useMemo(() => {
    const minUnidades = Math.min(...PRODUCTS.map((p) => p.minAtacado));
    const maxUnidades = Math.max(...PRODUCTS.map((p) => p.minAtacado));
    const maxDesconto = Math.max(...PRODUCTS.map((p) => p.descontoAtacado));
    return {
      unidadesLabel: minUnidades === maxUnidades ? `${minUnidades}` : `${minUnidades}–${maxUnidades}`,
      descontoLabel: `${Math.round(maxDesconto * 100)}%`,
    };
  }, []);

  function addToCart(product, qty) {
    const current = cart[product.id] || 0;
    const desired = Math.min(current + qty, product.estoque);
    if (desired === current) {
      setToast({ type: "warn", text: `Estoque máximo de "${product.nome}" já está no carrinho.` });
      return;
    }
    setCart((c) => ({ ...c, [product.id]: desired }));
    setToast({ type: "ok", text: `${product.nome} adicionado ao carrinho.` });
  }

  function setQty(id, qty) {
    const product = productsById[id];
    if (qty <= 0) {
      setCart((c) => {
        const next = { ...c };
        delete next[id];
        return next;
      });
      return;
    }
    const clamped = Math.min(qty, product.estoque);
    setCart((c) => ({ ...c, [id]: clamped }));
  }

  function lineUnitPrice(product, qty) {
    if (mode === "atacado" && qty >= product.minAtacado) {
      return product.precoVarejo * (1 - product.descontoAtacado);
    }
    return product.precoVarejo;
  }

  const cartEntries = Object.entries(cart).map(([id, qty]) => {
    const product = productsById[id];
    const unit = lineUnitPrice(product, qty);
    return { product, qty, unit, subtotal: unit * qty };
  });

  const cartCount = cartEntries.reduce((s, e) => s + e.qty, 0);
  const cartTotal = cartEntries.reduce((s, e) => s + e.subtotal, 0);
  const atacadoSavings = cartEntries.reduce((s, e) => {
    if (mode === "atacado" && e.qty >= e.product.minAtacado) {
      return s + (e.product.precoVarejo - e.unit) * e.qty;
    }
    return s;
  }, 0);

  if (checkoutOpen) {
    return (
      <CheckoutPage
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        mode={mode}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        form={form}
        setForm={setForm}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardForm={cardForm}
        setCardForm={setCardForm}
        reservationSeconds={reservationSeconds}
        cartEntries={cartEntries}
        cartTotal={cartTotal}
        atacadoSavings={atacadoSavings}
        orderNumber={orderNumber}
        confirmedEntries={confirmedEntries}
        confirmedTotal={confirmedTotal}
        finalizePayment={finalizePayment}
        closeCheckoutAndReset={closeCheckoutAndReset}
        setCheckoutOpen={setCheckoutOpen}
        setCartOpen={setCartOpen}
        setToast={setToast}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#120F0B] text-[#EFE7D6] font-body">
      <ThemeStyles />

      {/* ---------------- FAIXA DE PROMOÇÃO ---------------- */}
      <div className="bg-gradient-to-r from-[#B3872F] via-[#D9A94B] to-[#E3963E] text-[#120F0B]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:px-8">
          <Truck className="h-3.5 w-3.5 shrink-0" />
          Frete grátis em pedidos de atacado acima de {formatBRL(500)} · Entrega discreta e segura
        </div>
      </div>

      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-30 border-b border-[#D9A94B]/15 bg-[#120F0B]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9A94B]/40 bg-gradient-to-br from-[#2A210C] to-[#120F0B]">
              <Wine className="h-5 w-5 text-[#D9A94B]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-xl font-semibold leading-none tracking-wide text-[#EFE7D6]">Mãe Gaia</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#9C9584]">bebidas especiais</p>
            </div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:flex">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7566]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar rótulos, sabores…"
              className="w-full rounded-full border border-[#D9A94B]/20 bg-[#1B1712] py-2.5 pl-10 pr-4 text-sm text-[#EFE7D6] outline-none placeholder:text-[#7A7566] focus:border-[#D9A94B]/50"
            />
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            {/* Alternador Varejo / Atacado */}
            <div className="relative flex items-center rounded-full border border-[#D9A94B]/25 bg-[#1B1712] p-1 text-xs sm:text-sm">
              <button
                onClick={() => setMode("varejo")}
                className={`relative z-10 rounded-full px-3 py-1.5 font-medium transition-colors sm:px-4 ${
                  mode === "varejo" ? "text-[#120F0B]" : "text-[#9C9584] hover:text-[#EFE7D6]"
                }`}
              >
                Varejo
              </button>
              <button
                onClick={() => setMode("atacado")}
                className={`relative z-10 rounded-full px-3 py-1.5 font-medium transition-colors sm:px-4 ${
                  mode === "atacado" ? "text-[#120F0B]" : "text-[#9C9584] hover:text-[#EFE7D6]"
                }`}
              >
                Atacado
              </button>
              <span
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] transition-all duration-300 ${
                  mode === "varejo" ? "left-1" : "left-[calc(50%+2px)]"
                }`}
              />
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full border border-[#D9A94B]/30 bg-[#1B1712] px-3 py-2 text-sm text-[#EFE7D6] transition-colors hover:border-[#D9A94B]/60 sm:px-4"
            >
              <ShoppingCart className="h-4 w-4 text-[#D9A94B]" strokeWidth={1.75} />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8B2635] px-1 font-mono text-[10px] font-bold text-[#EFE7D6]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {mode === "atacado" && (
          <div className="border-t border-[#D9A94B]/10 bg-[#1B1712] px-5 py-1.5 text-center font-mono text-[11px] uppercase tracking-wider text-[#D9A94B] sm:px-8">
            Modo atacado ativo — descontos aplicados ao atingir a quantidade mínima por lote
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-[#D9A94B]/10">
        <div className="grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-[#8B2635]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-[-5%] h-72 w-72 rounded-full bg-[#D9A94B]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="animate-fadeUp">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D9A94B]/30 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#D9A94B]">
                <Sparkles className="h-3.5 w-3.5" />
                curadoria de lote único
              </div>
              <h1 className="font-display text-4xl font-semibold leading-[1.08] text-[#EFE7D6] sm:text-5xl lg:text-6xl">
                Cada garrafa tem um número.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#B3AC9B] sm:text-base">
                Licores artesanais, coquetéis engarrafados e destilados especiais, feitos em lotes
                pequenos pela Mãe Gaia Bebidas Especiais. Sem reposição automática — o que está
                disponível é o que existe. Compre por unidade ou feche caixa em condição de atacado.
              </p>

              {/* Ofertas sempre disponíveis */}
              <div className="animate-fadeUp mt-8 inline-flex items-center gap-4 rounded-2xl border border-[#D9A94B]/20 bg-gradient-to-br from-[#1B1712] to-[#221C15] px-5 py-4 seal-shadow">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D9A94B]" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9C9584]">
                    ofertas sempre disponíveis
                  </p>
                  <p className="mt-0.5 font-mono text-lg font-semibold text-[#D9A94B]">
                    Compre quando quiser, sem limite de tempo
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#9C9584]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D9A94B]" /> Procedência garantida
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#D9A94B]" /> Caixa fechada c/ desconto
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#catalogo"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] px-6 py-3 text-sm font-semibold text-[#120F0B] transition-transform hover:scale-[1.02]"
                >
                  Ver catálogo disponível
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <div className="flex items-center gap-2 rounded-full border border-[#D9A94B]/20 px-5 py-3 font-mono text-xs text-[#9C9584]">
                  <Boxes className="h-4 w-4 text-[#D9A94B]" />
                  {totalStockToday} garrafas disponíveis agora
                </div>
              </div>
            </div>

            {/* Destaque em foto real */}
            <div className="animate-fadeUp relative h-[260px] overflow-hidden rounded-3xl border border-[#D9A94B]/20 seal-shadow sm:h-[320px]">
              <img
                src={IMG_HERO_FAMILIA}
                alt="Linha de coquetéis Gaia: DoceLeite, CocoBom, Amaruka, Milheto e ChocoAvelã"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120F0B] via-[#120F0B]/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#D9A94B]">Destaque</p>
                  <p className="font-display mt-1 text-2xl text-[#EFE7D6]">Linha de Coquetéis Gaia</p>
                  <p className="mt-0.5 text-sm text-[#B3AC9B]">DoceLeite · CocoBom · Amaruka · Milheto · ChocoAvelã</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#8B2635]/40 bg-[#2A0D14] px-3 py-1 font-mono text-[11px] font-semibold text-[#E88A9A]">
                  <Flame className="h-3 w-3" /> Feito em lote
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FILTROS ---------------- */}
      <section id="catalogo" className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-3xl text-[#EFE7D6]">Catálogo</h2>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  category === c.id
                    ? c.id === "todos"
                      ? "border-[#D9A94B] bg-[#D9A94B]/10 text-[#D9A94B]"
                      : ACCENTS[c.id].pill
                    : "border-[#D9A94B]/15 text-[#9C9584] hover:border-[#D9A94B]/40 hover:text-[#EFE7D6]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CATÁLOGO ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              mode={mode}
              inCart={cart[p.id] || 0}
              onAdd={(qty) => addToCart(p, qty)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-[#8A8377]">Nenhum lote nesta categoria no momento.</p>
        )}
      </section>

      {/* ---------------- PROGRAMA ATACADO ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl border border-[#D9A94B]/15 bg-gradient-to-br from-[#1B1712] to-[#221C15] p-8 seal-shadow sm:p-12">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#D9A94B] to-[#F0C572]">
              <Package className="h-6 w-6 text-[#120F0B]" />
            </div>
            <div className="min-w-64 flex-1">
              <h3 className="font-display text-3xl text-[#EFE7D6]">Programa Atacado</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9C9584] sm:text-base">
                Restaurantes, bares, distribuidores e revendedores. Ao atingir a caixa fechada do
                rótulo, o preço muda automaticamente com{" "}
                <span className="font-semibold text-[#D9A94B]">até {wholesaleStats.descontoLabel} de desconto</span>.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { n: wholesaleStats.unidadesLabel, l: "unid. mín." },
                { n: wholesaleStats.descontoLabel, l: "off máx." },
                { n: "48h", l: "entrega" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl border border-[#D9A94B]/15 bg-[#120F0B]/50 px-4 py-3">
                  <p className="font-display text-2xl text-[#D9A94B]">{k.n}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[#7A7566]">{k.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RODAPÉ ---------------- */}
      <footer className="border-t border-[#D9A94B]/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10 text-sm text-[#9C9584] sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572]">
              <Wine className="h-4 w-4 text-[#120F0B]" />
            </div>
            <span className="font-display text-lg text-[#EFE7D6]">Mãe Gaia</span>
            <span>· Bebidas Especiais</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/maegaiabebidasespeciais"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[#D9A94B]"
            >
              <Instagram className="h-4 w-4" /> @maegaiabebidasespeciais
            </a>
          </div>
        </div>
      </footer>

      {/* ---------------- TOAST ---------------- */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs shadow-lg animate-fadeUp ${
            toast.type === "ok"
              ? "border-[#D9A94B]/40 bg-[#1B1712] text-[#EFE7D6]"
              : "border-[#8B2635]/50 bg-[#2A0D14] text-[#EFE7D6]"
          }`}
        >
          {toast.type === "ok" ? <Check className="h-3.5 w-3.5 text-[#D9A94B]" /> : <AlertTriangle className="h-3.5 w-3.5 text-[#C2495F]" />}
          {toast.text}
        </div>
      )}

      {/* ---------------- CART SLIDE-OVER ---------------- */}
      {cartOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="animate-slideIn absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#120F0B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D9A94B]/20 px-5 py-4">
              <div>
                <p className="font-display text-lg text-[#EFE7D6]">Sua seleção</p>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#D9A94B]/70">
                  modo {mode === "atacado" ? "atacado" : "varejo"}
                </p>
              </div>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-2 text-[#EFE7D6]/60 hover:bg-[#D9A94B]/10 hover:text-[#D9A94B]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartEntries.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <Package className="h-10 w-10 text-[#D9A94B]/30" strokeWidth={1.25} />
                  <p className="text-sm text-[#EFE7D6]/60">O carrinho está vazio. Escolha um lote no catálogo.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartEntries.map(({ product, qty, unit, subtotal }) => {
                    const atacadoAtivo = mode === "atacado" && qty >= product.minAtacado;
                    const faltam = product.minAtacado - qty;
                    return (
                      <div key={product.id} className="rounded-xl border border-[#D9A94B]/20 bg-[#1B1712] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {product.imagem && (
                              <img
                                src={product.imagem}
                                alt={product.nome}
                                loading="lazy"
                                className="h-16 w-12 flex-none rounded-md object-cover ring-1 ring-[#D9A94B]/25"
                              />
                            )}
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-[#D9A94B]/60">Lote {product.lote}</p>
                              <p className="font-display text-base text-[#EFE7D6]">{product.nome}</p>
                            </div>
                          </div>
                          <button onClick={() => setQty(product.id, 0)} className="text-[#EFE7D6]/40 hover:text-[#C2495F]">
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-[#D9A94B]/30 bg-[#120F0B] px-1.5 py-1">
                            <button
                              onClick={() => setQty(product.id, qty - 1)}
                              className="rounded-full p-1 text-[#D9A94B] hover:bg-[#D9A94B]/15"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center font-mono text-sm text-[#EFE7D6]">{qty}</span>
                            <button
                              onClick={() => setQty(product.id, qty + 1)}
                              disabled={qty >= product.estoque}
                              className="rounded-full p-1 text-[#D9A94B] hover:bg-[#D9A94B]/15 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-sm font-semibold text-[#EFE7D6]">{formatBRL(subtotal)}</p>
                            <p className="font-mono text-[10px] text-[#EFE7D6]/45">{formatBRL(unit)} / un.</p>
                          </div>
                        </div>

                        {qty >= product.estoque && (
                          <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-[#E8698A]">
                            <AlertTriangle className="h-3 w-3" /> limite do estoque disponível atingido
                          </p>
                        )}

                        {mode === "atacado" && (
                          atacadoAtivo ? (
                            <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-[#D9A94B]">
                              <Check className="h-3 w-3" /> preço de atacado aplicado (-{Math.round(product.descontoAtacado * 100)}%)
                            </p>
                          ) : (
                            <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-[#EFE7D6]/45">
                              <Lock className="h-3 w-3" /> faltam {faltam} un. para desbloquear atacado
                            </p>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartEntries.length > 0 && (
              <div className="border-t border-[#D9A94B]/20 px-5 py-5">
                {atacadoSavings > 0 && (
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-[#D9A94B]">
                    <span>economia de atacado</span>
                    <span>- {formatBRL(atacadoSavings)}</span>
                  </div>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-lg text-[#EFE7D6]">Total</p>
                  <p className="font-mono text-xl font-bold text-[#EFE7D6]">{formatBRL(cartTotal)}</p>
                </div>
                <button
                  onClick={openCheckout}
                  className="w-full rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] py-3.5 text-sm font-semibold text-[#120F0B] transition-transform hover:scale-[1.01]"
                >
                  Fechar pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
      .font-display { font-family: 'Cormorant Garamond', serif; }
      .font-body { font-family: 'Inter', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      .seal-shadow { box-shadow: 0 0 0 1px rgba(217,169,75,0.25), 0 8px 24px -8px rgba(0,0,0,0.6); }
      .grain { background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 3px 3px; }
      @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .animate-slideIn { animation: slideIn 0.35s cubic-bezier(0.22,1,0.36,1); }
      .animate-fadeUp { animation: fadeUp 0.3s ease-out; }
    `}</style>
  );
}

function CheckoutPage({
  checkoutStep, setCheckoutStep, mode, deliveryMethod, setDeliveryMethod,
  form, setForm, paymentMethod, setPaymentMethod, cardForm, setCardForm,
  reservationSeconds, cartEntries, cartTotal, atacadoSavings, orderNumber,
  confirmedEntries, confirmedTotal, finalizePayment, closeCheckoutAndReset,
  setCheckoutOpen, setCartOpen, setToast,
}) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0E0C09] text-[#EFE7D6] font-body">
      <ThemeStyles />
      <div className="grain pointer-events-none fixed inset-0 opacity-30" />

      {/* Barra de reserva */}
      {checkoutStep !== "confirmacao" && (
        <div className="sticky top-0 z-10 border-b border-[#D9A94B]/15 bg-[#161310]/95 backdrop-blur w-full max-w-full overflow-hidden">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
            <button
              onClick={() => {
                if (checkoutStep === "entrega") {
                  setCheckoutOpen(false);
                  setCartOpen(true);
                } else {
                  setCheckoutStep("entrega");
                }
              }}
              className="flex items-center gap-1.5 font-mono text-xs text-[#9C9584] hover:text-[#EFE7D6]"
            >
              <ChevronLeft className="h-4 w-4" />
              {checkoutStep === "entrega" ? "voltar à sacola" : "voltar"}
            </button>
            <div className={`flex items-center gap-1.5 font-mono text-xs ${reservationSeconds <= 60 ? "text-[#C2495F]" : "text-[#D9A94B]"}`}>
              <Clock className="h-3.5 w-3.5" />
              reserva válida por {pad(Math.floor(reservationSeconds / 60))}:{pad(reservationSeconds % 60)}
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-5xl w-full px-4 py-6 sm:px-8 sm:py-12 overflow-x-hidden">
        {/* Indicador de etapas — travado para não estourar no mobile */}
        <div className="mb-8 flex w-full items-center justify-between gap-1 overflow-hidden">
          {[
            { id: "entrega", n: "01", label: "Entrega" },
            { id: "pagamento", n: "02", label: "Pagamento" },
            { id: "confirmacao", n: "03", label: "Confirmação" },
          ].map((s, i, arr) => {
            const order = ["entrega", "pagamento", "confirmacao"];
            const active = order.indexOf(checkoutStep) >= i;
            return (
              <React.Fragment key={s.id}>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                      active ? "bg-gradient-to-r from-[#D9A94B] to-[#F0C572] text-[#120F0B]" : "border border-[#D9A94B]/20 text-[#7A7566]"
                    }`}
                  >
                    {active && order.indexOf(checkoutStep) > i ? <Check className="h-3.5 w-3.5" /> : s.n}
                  </span>
                  <span className={`hidden font-mono text-xs uppercase tracking-wider sm:inline ${active ? "text-[#EFE7D6]" : "text-[#7A7566]"}`}>
                    {s.label}
                  </span>
                </div>
                {i < arr.length - 1 && <span className="h-px min-w-[10px] flex-1 bg-[#D9A94B]/15" />}
              </React.Fragment>
            );
          })}
        </div>

        {checkoutStep === "entrega" && (
          <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] w-full max-w-full">
            <div className="animate-fadeUp w-full max-w-full overflow-hidden">
              <h2 className="font-display text-2xl text-[#EFE7D6]">Como você quer receber?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryMethod("entrega")}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-sm ${
                    deliveryMethod === "entrega" ? "border-[#D9A94B] bg-[#D9A94B]/10 text-[#EFE7D6]" : "border-[#D9A94B]/15 text-[#9C9584]"
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  Entrega
                </button>
                <button
                  onClick={() => setDeliveryMethod("retirada")}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-sm ${
                    deliveryMethod === "retirada" ? "border-[#D9A94B] bg-[#D9A94B]/10 text-[#EFE7D6]" : "border-[#D9A94B]/15 text-[#9C9584]"
                  }`}
                >
                  <Store className="h-5 w-5" />
                  Retirar na adega
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nome completo" value={form.nome} onChange={(v) => setForm((f) => ({ ...f, nome: v }))} full />
                <Field
                  label={mode === "atacado" ? "CNPJ" : "CPF"}
                  value={form.documento}
                  onChange={(v) => setForm((f) => ({ ...f, documento: v }))}
                />
                <Field label="Telefone" value={form.telefone} onChange={(v) => setForm((f) => ({ ...f, telefone: v }))} />
                {deliveryMethod === "entrega" && (
                  <>
                    <Field label="CEP" value={form.cep} onChange={(v) => setForm((f) => ({ ...f, cep: v }))} />
                    <Field label="Endereço e número" value={form.endereco} onChange={(v) => setForm((f) => ({ ...f, endereco: v }))} full />
                    <Field label="Cidade" value={form.cidade} onChange={(v) => setForm((f) => ({ ...f, cidade: v }))} />
                    <Field label="Estado" value={form.estado} onChange={(v) => setForm((f) => ({ ...f, estado: v }))} />
                  </>
                )}
              </div>

              {mode === "atacado" && (
                <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#D9A94B]/20 bg-[#1B1712] p-4 font-mono text-xs text-[#9C9584]">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A94B]" />
                  Pedidos de atacado passam por confirmação de CNPJ antes do faturamento. Condições de prazo disponíveis no pagamento.
                </div>
              )}

              <button
                onClick={() => setCheckoutStep("pagamento")}
                disabled={
                  !form.nome ||
                  !form.documento ||
                  !form.telefone ||
                  (deliveryMethod === "entrega" && (!form.cep || !form.endereco || !form.cidade || !form.estado))
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] py-3.5 text-sm font-semibold text-[#120F0B] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:w-auto sm:px-8"
              >
                Continuar para pagamento
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <OrderSummary entries={cartEntries} total={cartTotal} savings={atacadoSavings} mode={mode} />
          </div>
        )}

        {checkoutStep === "pagamento" && (
          <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] w-full max-w-full">
            <div className="animate-fadeUp w-full max-w-full overflow-hidden">
              <h2 className="font-display text-2xl text-[#EFE7D6]">Forma de pagamento</h2>

              {/* Botões ajustados para mobile */}
              <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-full">
                {[
                  { id: "pix", label: "Pix", Icon: QrCode },
                  { id: "cartao", label: "Cartão", Icon: CreditCard },
                  { id: "boleto", label: "Boleto", Icon: FileText },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-xs sm:text-sm ${
                      paymentMethod === id ? "border-[#D9A94B] bg-[#D9A94B]/10 text-[#EFE7D6]" : "border-[#D9A94B]/15 text-[#9C9584]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-6 w-full max-w-full overflow-hidden">
                {paymentMethod === "pix" && <PixPanel total={cartTotal} onToast={setToast} />}
                {paymentMethod === "cartao" && <CardPanel cardForm={cardForm} setCardForm={setCardForm} total={cartTotal} />}
                {paymentMethod === "boleto" && <BoletoPanel mode={mode} total={cartTotal} />}
              </div>

              {/* Aviso formatado com break-words */}
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-[#D9A94B]/15 bg-[#1B1712] p-3.5 font-mono text-[11px] text-[#7A7566] w-full max-w-full overflow-hidden">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#D9A94B]" />
                <span className="min-w-0 flex-1 break-words">Ambiente de demonstração — nenhum dado de pagamento é processado ou armazenado de verdade.</span>
              </div>

              <button
                onClick={finalizePayment}
                disabled={
                  paymentMethod === "cartao" &&
                  (!cardForm.numero || !cardForm.nomeCartao || !cardForm.validade || !cardForm.cvv)
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] py-3.5 text-sm font-semibold text-[#120F0B] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:w-auto sm:px-8"
              >
                Finalizar pagamento — {formatBRL(cartTotal)}
              </button>
            </div>

            <OrderSummary entries={cartEntries} total={cartTotal} savings={atacadoSavings} mode={mode} />
          </div>
        )}

        {checkoutStep === "confirmacao" && (
          <div className="animate-fadeUp mx-auto max-w-lg text-center w-full max-w-full overflow-hidden">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D9A94B]/40 bg-[#D9A94B]/10">
              <CheckCircle2 className="h-8 w-8 text-[#D9A94B]" />
            </div>
            <h2 className="mt-5 font-display text-2xl text-[#EFE7D6] sm:text-3xl">Pedido confirmado</h2>
            <p className="mt-2 font-mono text-sm text-[#9C9584]">
              pedido nº <span className="text-[#D9A94B]">{orderNumber}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-[#D9A94B]/15 bg-[#1B1712] p-5 text-left w-full max-w-full overflow-hidden">
              <div className="space-y-2.5">
                {confirmedEntries.map(({ product, qty, subtotal }) => (
                  <div key={product.id} className="flex items-center justify-between font-mono text-xs text-[#B3AC9B]">
                    <span className="min-w-0 flex-1 truncate pr-2">lote {product.lote} · {product.nome} × {qty}</span>
                    <span className="shrink-0 text-[#EFE7D6]">{formatBRL(subtotal)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#D9A94B]/10 pt-3">
                <span className="font-display text-base text-[#EFE7D6]">Total pago</span>
                <span className="font-mono text-lg font-bold text-[#EFE7D6]">{formatBRL(confirmedTotal)}</span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#8A8377]">
              {deliveryMethod === "entrega"
                ? "Seus lotes serão separados e a entrega será combinada pelo telefone informado."
                : "Seus lotes ficarão reservados na adega para retirada em até 48 horas."}
            </p>

            <button
              onClick={closeCheckoutAndReset}
              className="mt-8 rounded-full border border-[#D9A94B]/30 px-8 py-3 text-sm font-semibold text-[#EFE7D6] hover:border-[#D9A94B] hover:bg-[#D9A94B]/10"
            >
              Voltar à loja
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, full }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[#7A7566]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#D9A94B]/20 bg-[#1B1712] px-3.5 py-2.5 text-sm text-[#EFE7D6] outline-none placeholder:text-[#5B5648] focus:border-[#D9A94B]/60"
      />
    </label>
  );
}

function OrderSummary({ entries, total, savings, mode }) {
  return (
    <div className="h-fit rounded-2xl border border-[#D9A94B]/15 bg-[#1B1712] p-5">
      <p className="font-display text-base text-[#EFE7D6]">Resumo do pedido</p>
      <div className="mt-4 space-y-3 border-b border-[#D9A94B]/10 pb-4">
        {entries.map(({ product, qty, subtotal }) => (
          <div key={product.id} className="flex items-center justify-between font-mono text-xs text-[#9C9584]">
            <span className="pr-2">lote {product.lote} · {product.nome} × {qty}</span>
            <span className="shrink-0 text-[#EFE7D6]">{formatBRL(subtotal)}</span>
          </div>
        ))}
      </div>
      {savings > 0 && (
        <div className="mt-3 flex items-center justify-between font-mono text-xs text-[#D9A94B]">
          <span>economia de atacado</span>
          <span>- {formatBRL(savings)}</span>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-base text-[#EFE7D6]">Total</span>
        <span className="font-mono text-lg font-bold text-[#EFE7D6]">{formatBRL(total)}</span>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#7A7566]">modo {mode}</p>
    </div>
  );
}

function PixPanel({ total, onToast }) {
  const code = "00020126580014BR.GOV.BCB.PIX0136LOTE-NOTURNO-DEMO52040000530398654" + Math.floor(total * 100);
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[#D9A94B]/15 bg-[#1B1712] p-6 text-center">
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border border-[#D9A94B]/25 bg-[#120F0B]">
        <QrCode className="h-20 w-20 text-[#D9A94B]/70" strokeWidth={1} />
      </div>
      <p className="mt-4 text-sm text-[#B3AC9B]">Escaneie o QR code ou copie o código Pix abaixo.</p>
      
      {/* Botão ajustado com min-w-0 e break-all para conter a string no mobile */}
      <button
        onClick={() => {
          if (navigator.clipboard) navigator.clipboard.writeText(code);
          onToast({ type: "ok", text: "Código Pix copiado." });
        }}
        className="mt-4 flex w-full max-w-full items-center justify-between gap-2 overflow-hidden rounded-lg border border-[#D9A94B]/25 bg-[#120F0B] px-3 py-2.5 font-mono text-[11px] text-[#9C9584] hover:border-[#D9A94B]/50"
      >
        <span className="min-w-0 flex-1 truncate text-left">{code}</span>
        <Copy className="h-3.5 w-3.5 shrink-0 text-[#D9A94B]" />
      </button>
      
      <p className="mt-3 font-mono text-[10px] text-[#7A7566]">o pagamento é confirmado automaticamente em até 2 minutos</p>
    </div>
  );
}

function CardPanel({ cardForm, setCardForm, total }) {
  const parcelas = [1, 2, 3].map((n) => ({ n, valor: total / n }));
  return (
    <div className="space-y-4 rounded-2xl border border-[#D9A94B]/15 bg-[#1B1712] p-5">
      <Field label="Número do cartão" value={cardForm.numero} onChange={(v) => setCardForm((f) => ({ ...f, numero: v }))} full />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome impresso no cartão" value={cardForm.nomeCartao} onChange={(v) => setCardForm((f) => ({ ...f, nomeCartao: v }))} full />
        <Field label="Validade (MM/AA)" value={cardForm.validade} onChange={(v) => setCardForm((f) => ({ ...f, validade: v }))} />
        <Field label="CVV" value={cardForm.cvv} onChange={(v) => setCardForm((f) => ({ ...f, cvv: v }))} />
      </div>
      <label className="block">
        <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-[#7A7566]">Parcelas</span>
        <select
          value={cardForm.parcelas}
          onChange={(e) => setCardForm((f) => ({ ...f, parcelas: e.target.value }))}
          className="w-full rounded-lg border border-[#D9A94B]/20 bg-[#120F0B] px-3.5 py-2.5 text-sm text-[#EFE7D6] outline-none focus:border-[#D9A94B]/60"
        >
          {parcelas.map(({ n, valor }) => (
            <option key={n} value={n}>
              {n}x de {formatBRL(valor)} {n === 1 ? "à vista" : "sem juros"}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function BoletoPanel({ mode, total }) {
  const vencimento = new Date();
  vencimento.setDate(vencimento.getDate() + (mode === "atacado" ? 28 : 3));
  return (
    <div className="rounded-2xl border border-[#D9A94B]/15 bg-[#1B1712] p-5">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-[#D9A94B]" strokeWidth={1.25} />
        <div>
          <p className="text-sm text-[#EFE7D6]">Boleto gerado no valor de {formatBRL(total)}</p>
          <p className="font-mono text-[11px] text-[#7A7566]">vencimento em {vencimento.toLocaleDateString("pt-BR")}</p>
        </div>
      </div>
      {mode === "atacado" && (
        <p className="mt-4 font-mono text-[11px] text-[#D9A94B]">
          condição especial de atacado: prazo de 28 dias para clientes com CNPJ aprovado.
        </p>
      )}
    </div>
  );
}

function ProductCard({ product, mode, inCart, onAdd }) {
  const accent = ACCENTS[product.categoria];
  const available = product.estoque - inCart;
  const status = stockStatus(available, product.estoqueMax);
  const Icon = ICONS[product.categoria];
  const pct = Math.max(4, Math.round((available / product.estoqueMax) * 100));
  const atacadoPrice = product.precoVarejo * (1 - product.descontoAtacado);
  const quickQty = mode === "atacado" ? product.minAtacado : 1;
  const disabled = available <= 0;

  const toneClasses = {
    wine: "border-[#8B2635]/50 bg-[#2A0D14] text-[#E88A9A]",
    gold: `border-[#D9A94B]/50 bg-[#2A210C] ${accent.text}`,
    amber: `${accent.border} ${accent.bg} ${accent.text}`,
  };

  return (
    <div className={`group flex flex-col overflow-hidden rounded-2xl border border-[#D9A94B]/12 bg-[#181410] transition-colors ${accent.borderHover}`}>
      <div className={`relative flex items-center justify-center overflow-hidden ${product.imagem ? "aspect-[1290/2293] bg-[#0C0A08]" : `h-40 bg-gradient-to-br ${GRADIENTS[product.categoria]}`}`}>
        {product.imagem ? (
          <img
            src={product.imagem}
            alt={product.nome}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${product.imagemFit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <>
            <div className="grain pointer-events-none absolute inset-0 opacity-30" />
            <Icon className={`h-14 w-14 text-[#EFE7D6]/25 transition-transform duration-300 group-hover:scale-110 group-hover:${accent.text}`} strokeWidth={1} />
          </>
        )}
        {product.imagem && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        )}
        <span className={`absolute left-3 top-3 rounded-full border bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-widest backdrop-blur ${accent.border} ${accent.text}`}>
          LOTE Nº {product.lote}
        </span>
        {status && (
          <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide ${toneClasses[status.tone]}`}>
            {status.label}
          </span>
        )}
        {mode === "atacado" && (
          <span className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-[#D9A94B] to-[#F0C572] px-2.5 py-1 font-mono text-[11px] font-bold text-[#120F0B]">
            -{Math.round(product.descontoAtacado * 100)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className={`font-mono text-[10px] uppercase tracking-widest ${accent.text}`}>
          {CATEGORIES.find((c) => c.id === product.categoria)?.label}
        </p>
        <h3 className="mt-0.5 font-display text-lg leading-tight text-[#EFE7D6]">{product.nome}</h3>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[#7A7566]">{product.origem}</p>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-[#EFE7D6]">
              {formatBRL(mode === "atacado" ? atacadoPrice : product.precoVarejo)}
            </span>
            {mode === "atacado" && (
              <span className="font-mono text-xs text-[#7A7566] line-through">{formatBRL(product.precoVarejo)}</span>
            )}
          </div>
          {mode === "atacado" ? (
            <p className={`mt-0.5 font-mono text-[10px] ${accent.text}`}>
              -{Math.round(product.descontoAtacado * 100)}% a partir de {product.minAtacado} un.
            </p>
          ) : (
            <p className="mt-0.5 font-mono text-[10px] text-[#7A7566]">
              atacado: {formatBRL(atacadoPrice)}/un. a partir de {product.minAtacado} un.
            </p>
          )}
        </div>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-[#8A8377]">
            <span>estoque</span>
            <span className={inCart > 0 ? accent.text : ""}>
              {available} un. restantes{inCart > 0 ? ` · ${inCart} na sacola` : ""}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#221C15]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${available <= 3 ? "bg-[#8B2635]" : `bg-gradient-to-r ${accent.bar}`}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => onAdd(quickQty)}
          disabled={disabled}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-semibold text-[#EFE7D6] transition-colors disabled:cursor-not-allowed disabled:opacity-30 sm:text-sm ${accent.border} ${accent.borderHover} hover:${accent.bg}`}
        >
          <Plus className={`h-3.5 w-3.5 ${accent.text}`} />
          {disabled
            ? "Esgotado"
            : mode === "atacado"
            ? `Adicionar caixa (${product.minAtacado} un.)`
            : "Adicionar"}
        </button>
      </div>
    </div>
  );
}
