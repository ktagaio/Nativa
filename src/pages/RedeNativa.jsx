import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Globe2,
  Leaf,
  MapPin,
  Network,
  Scale,
  SearchCheck,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Target,
  Truck,
  Users,
  Wifi,
} from "lucide-react";
import { trackEvent } from "../lib/analytics";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const profiles = [
  "Produtor rural",
  "Revenda / distribuidor",
  "Cooperativa",
  "Consultor / agrônomo",
  "Associação / entidade",
  "Empresa agroindustrial",
  "Hub / aceleradora / investidor",
  "Outro",
];

const solutionTypes = [
  {
    label: "Gestão agrícola",
    icon: BarChart3,
  },
  {
    label: "Agricultura de precisão",
    icon: Sprout,
  },
  {
    label: "Sensoriamento remoto / imagens de satélite",
    icon: Globe2,
  },
  {
    label: "Fintech, crédito e seguros",
    icon: Scale,
  },
  {
    label: "Biológicos",
    icon: Leaf,
  },
  {
    label: "Carbono e sustentabilidade",
    icon: ShieldCheck,
  },
  {
    label: "IoT e conectividade",
    icon: Wifi,
  },
  {
    label: "Marketplaces",
    icon: ShoppingBag,
  },
  {
    label: "Logística e supply chain",
    icon: Truck,
  },
  {
    label: "Compliance e rastreabilidade",
    icon: Cpu,
  },
];

const objectives = [
  "Quero conhecer novas soluções",
  "Quero testar tecnologias em campo",
  "Quero encontrar soluções para meus clientes",
  "Quero trazer inovação para minha rede/cooperativa",
  "Tenho uma dor específica para resolver",
  "Quero me conectar ao ecossistema de inovação agro",
];

const audienceCards = [
  "Produtores rurais",
  "Revendas e distribuidores",
  "Cooperativas",
  "Consultores e agrônomos",
  "Associações e entidades",
  "Empresas agroindustriais",
  "Hubs e aceleradoras",
  "Investidores e parceiros",
];

export default function RedeNativa() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    profile: "",
    interests: [],
    objective: "",
    message: "",
    privacyConsent: false,
  });

  const [formStarted, setFormStarted] = useState(false);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  function handleFormStart() {
    if (formStarted) return;

    setFormStarted(true);

    trackEvent("rede_nativa_form_start", {
      source: "rede_nativa_form",
      form_origin: "Rede Nativa signup form",
      page_path: window.location.pathname,
      page_location: window.location.href,
      form_type: "client_network_signup",
    });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleInterestChange(value) {
    setFormData((current) => {
      const alreadySelected = current.interests.includes(value);

      return {
        ...current,
        interests: alreadySelected
          ? current.interests.filter((item) => item !== value)
          : [...current.interests, value],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.privacyConsent) {
      setStatus({
        loading: false,
        success: false,
        error: "Você precisa aceitar a Política de Privacidade antes de enviar.",
      });
      return;
    }

    setStatus({
      loading: true,
      success: false,
      error: "",
    });

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: "Novo cadastro - Rede Nativa",
        from_name: "Nativa Website",

        form_origin: "Rede Nativa signup form",
        privacy_policy_url:
          "https://www.nativaag.com.br/politica-de-privacidade",
        privacy_policy_version: "2026-04",
        page_url: window.location.href,
        user_agent: navigator.userAgent,

        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        profile: formData.profile,
        interests: formData.interests.join(", "),
        objective: formData.objective,
        message: formData.message,

        privacy_consent: formData.privacyConsent
          ? "Aceite LGPD concedido pelo usuário"
          : "Não concedido",
        consent_text:
          "Declaro que li e concordo que a Nativa trate as informações enviadas neste formulário para entrar em contato sobre oportunidades, conexões e iniciativas relacionadas à Rede Nativa, conforme a Política de Privacidade.",
        consent_date: new Date().toISOString(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        const successParams = {
          source: "rede_nativa_form",
          form_origin: "Rede Nativa signup form",
          page_path: window.location.pathname,
          page_location: window.location.href,
          form_type: "client_network_signup",
        };

        trackEvent("rede_nativa_signup_success", successParams);

        trackEvent("generate_lead", successParams);

        setStatus({
          loading: false,
          success: true,
          error: "",
        });

        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          location: "",
          profile: "",
          interests: [],
          objective: "",
          message: "",
          privacyConsent: false,
        });

        setFormStarted(false);

        return;
      }

      trackEvent("rede_nativa_signup_error", {
        source: "rede_nativa_form",
        form_origin: "Rede Nativa signup form",
        page_path: window.location.pathname,
        page_location: window.location.href,
        form_type: "client_network_signup",
        error_type: "api_response_error",
        status_code: response.status,
      });

      setStatus({
        loading: false,
        success: false,
        error: "Não foi possível enviar agora. Tente novamente.",
      });
    } catch {
      trackEvent("rede_nativa_signup_error", {
        source: "rede_nativa_form",
        form_origin: "Rede Nativa signup form",
        page_path: window.location.pathname,
        page_location: window.location.href,
        form_type: "client_network_signup",
        error_type: "network_or_runtime_error",
      });

      setStatus({
        loading: false,
        success: false,
        error: "Não foi possível enviar agora. Tente novamente.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f3ed] text-[#0d1823]">
      <Helmet>
        <title>Rede Nativa de Inovação Agro | Nativa</title>
        <meta
          name="description"
          content="A Rede Nativa conecta produtores, revendas, cooperativas, consultores e empresas do agro a tecnologias agrícolas inovadoras com potencial de gerar valor no Brasil."
        />
        <link rel="canonical" href="https://www.nativaag.com.br/rede-nativa" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.nativaag.com.br/rede-nativa"
        />
        <meta
          property="og:title"
          content="Rede Nativa de Inovação Agro | Nativa"
        />
        <meta
          property="og:description"
          content="Conecte sua empresa a tecnologias agrícolas inovadoras com potencial de gerar valor no Brasil."
        />
        <meta
          property="og:image"
          content="https://www.nativaag.com.br/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rede Nativa de Inovação Agro | Nativa"
        />
        <meta
          name="twitter:description"
          content="Conecte sua empresa a tecnologias agrícolas inovadoras com potencial de gerar valor no Brasil."
        />
        <meta
          name="twitter:image"
          content="https://www.nativaag.com.br/og-image.png"
        />
      </Helmet>

      <header className="mx-auto flex max-w-[1180px] items-start justify-between gap-4 px-5 py-5 md:px-6 md:py-6">
        <Link to="/" className="block min-w-0">
          <div className="text-[24px] font-semibold leading-none tracking-[0.2em] text-[#174d21] md:text-[28px]">
            NATIVA
          </div>
          <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#344134] md:text-[10px] md:tracking-[0.14em]">
            Make agtech native to Brazil
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#174d21]/20 bg-white px-3 py-3 text-[10px] font-semibold uppercase text-[#174d21] shadow-sm transition hover:bg-[#eef3eb] sm:px-4 md:px-5 md:text-[12px]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>

          <a
            href="#cadastro"
            onClick={() =>
              trackEvent("rede_nativa_cta_click", {
                location: "header",
                source: "rede_nativa_page",
                page_path: window.location.pathname,
                page_location: window.location.href,
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#174d21] px-3 py-3 text-[10px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#215f23] sm:px-4 md:px-5 md:text-[12px]"
          >
            <span>Cadastrar-se</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1180px] px-5 pb-10 pt-5 md:px-6 md:pb-12 md:pt-8">
          <div className="grid gap-7 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#174d21]/20 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#174d21] md:px-4 md:text-[12px] md:tracking-[0.18em]">
                Rede Nativa de Inovação Agro
              </div>

              <h1 className="mt-5 max-w-[760px] text-[40px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#08131f] sm:text-[48px] md:text-[68px]">
                Conecte-se às tecnologias que podem transformar o agro
                brasileiro.
              </h1>

              <p className="mt-5 max-w-[720px] text-[17px] leading-7 text-[#334138] md:text-[19px] md:leading-8">
                A Nativa aproxima produtores, revendas, cooperativas,
                consultores, associações e empresas do agro de soluções
                inovadoras em busca de validação, adaptação e crescimento no
                Brasil.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cadastro"
                  onClick={() =>
                    trackEvent("rede_nativa_cta_click", {
                      location: "hero",
                      source: "rede_nativa_page",
                      page_path: window.location.pathname,
                      page_location: window.location.href,
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#174d21] px-6 py-4 text-[13px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#215f23] sm:w-auto md:px-7 md:text-[14px]"
                >
                  Quero fazer parte da rede
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="mailto:contact@nativaag.com.br"
                  onClick={() =>
                    trackEvent("contact_email_click", {
                      location: "rede_nativa_hero",
                      source: "rede_nativa_page",
                      page_path: window.location.pathname,
                      page_location: window.location.href,
                    })
                  }
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[#174d21]/25 bg-white px-6 py-4 text-[13px] font-semibold text-[#174d21] transition hover:bg-[#eef3eb] sm:w-auto md:px-7 md:text-[14px]"
                >
                  Falar com a Nativa
                </a>
              </div>
            </div>

            <div className="rounded-[26px] bg-[#102513] p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] md:rounded-[30px] md:p-7">
              <div className="grid gap-3">
                {[
                  {
                    icon: Users,
                    title: "Rede curada",
                    text: "Conexão com produtores, revendas, cooperativas, consultores e empresas do agro.",
                  },
                  {
                    icon: SearchCheck,
                    title: "Aderência real",
                    text: "Mapeamento de desafios, contexto local e tecnologias com maior potencial de encaixe.",
                  },
                  {
                    icon: Network,
                    title: "Conexões qualificadas",
                    text: "Aproximação para conversas, demonstrações, validações ou pilotos quando houver fit.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[20px] border border-white/12 bg-white/[0.06] p-4 md:rounded-[22px] md:p-5"
                    >
                      <Icon className="h-6 w-6 text-[#b7d8a3] md:h-7 md:w-7" />
                      <h3 className="mt-3 text-[19px] font-semibold md:mt-4 md:text-[21px]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-6 text-white/74 md:text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/55">
          <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-6 md:py-12">
            <div className="max-w-[760px]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#56724f] md:text-[12px] md:tracking-[0.2em]">
                Para quem é
              </div>
              <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#0d1823] md:text-[38px]">
                Uma rede para quem busca inovação aplicada ao agro.
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 md:mt-8 md:gap-4 lg:grid-cols-4">
              {audienceCards.map((item) => (
                <div
                  key={item}
                  className="rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_8px_25px_rgba(0,0,0,0.04)] md:rounded-[20px] md:p-5"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#174d21]" />
                  <div className="mt-3 text-[15px] font-semibold leading-5 text-[#13291a] md:mt-4 md:text-[18px]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-6 md:py-14">
          <div className="grid gap-7 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#56724f] md:text-[12px] md:tracking-[0.2em]">
                Por que participar
              </div>
              <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#0d1823] md:text-[38px]">
                Acesso a conexões mais relevantes com inovação agro.
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-[#344134] md:mt-5 md:text-[17px] md:leading-8">
                Participar da Rede Nativa permite que sua empresa conheça
                oportunidades de conexão com tecnologias agrícolas inovadoras
                antes de uma entrada ampla no mercado brasileiro.
              </p>
            </div>

            <div className="grid gap-3 md:gap-4">
              {[
                "Conhecer soluções internacionais com potencial para o Brasil",
                "Avaliar tecnologias alinhadas às suas dores reais",
                "Participar de conversas, demonstrações ou pilotos",
                "Contribuir com feedback local para adaptação das soluções",
                "Conectar sua empresa a um ecossistema de inovação agro",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-[16px] border border-black/10 bg-white p-4 md:gap-4 md:rounded-[18px] md:p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#174d21] md:h-6 md:w-6" />
                  <div className="text-[15px] leading-6 text-[#27342d] md:text-[17px] md:leading-7">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#102513] py-10 text-white md:py-14">
          <div className="mx-auto max-w-[1180px] px-5 md:px-6">
            <div className="max-w-[760px]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b7d8a3] md:text-[12px] md:tracking-[0.2em]">
                Tipos de soluções
              </div>
              <h2 className="mt-3 text-[31px] font-semibold leading-tight tracking-[-0.04em] md:text-[38px]">
                Diferentes tecnologias para diferentes desafios do agro.
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 md:mt-8 md:gap-4 lg:grid-cols-5">
              {solutionTypes.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[17px] border border-white/12 bg-white/[0.06] p-4 md:rounded-[18px] md:p-5"
                  >
                    <Icon className="h-6 w-6 text-[#b7d8a3]" />
                    <div className="mt-3 text-[14px] font-semibold leading-5 md:mt-4 md:text-[15px] md:leading-6">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-5 py-10 md:px-6 md:py-14">
          <div className="max-w-[760px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#56724f] md:text-[12px] md:tracking-[0.2em]">
              O que buscamos entender
            </div>
            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#0d1823] md:text-[38px]">
              A conexão certa começa com contexto.
            </h2>
            <p className="mt-4 text-[16px] leading-7 text-[#344134] md:text-[17px] md:leading-8">
              Antes de aproximar qualquer tecnologia, a Nativa busca entender
              onde existe aderência real entre a solução, o perfil do usuário e
              os desafios do mercado brasileiro.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:mt-9 md:grid-cols-3 md:gap-5">
            {[
              {
                icon: MapPin,
                title: "Região e contexto",
                text: "Onde você atua, quais culturas ou operações estão envolvidas e quais características tornam seu contexto específico.",
              },
              {
                icon: Target,
                title: "Desafios prioritários",
                text: "Quais dores, oportunidades ou gargalos fazem mais sentido para uma solução tecnológica resolver.",
              },
              {
                icon: SearchCheck,
                title: "Potencial de aderência",
                text: "Quais categorias de tecnologia podem gerar valor prático antes de qualquer conversa, demonstração ou piloto.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.05)] md:rounded-[24px] md:p-6"
                >
                  <Icon className="h-6 w-6 text-[#174d21]" />
                  <h3 className="mt-4 text-[22px] font-semibold leading-tight text-[#13291a] md:mt-5 md:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#465149] md:mt-4">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-[20px] border border-[#174d21]/15 bg-[#eef3eb] p-5 md:mt-8 md:rounded-[22px] md:p-6">
            <div className="flex gap-3 md:gap-4">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#174d21] md:h-6 md:w-6" />
              <p className="text-[15px] leading-7 text-[#27342d] md:text-[16px]">
                Participar da Rede Nativa não gera obrigação de contratar,
                testar ou adquirir nenhuma solução. A proposta é criar conexões
                qualificadas quando houver aderência real entre o seu perfil e
                uma tecnologia em avaliação.
              </p>
            </div>
          </div>
        </section>

        <section
          id="cadastro"
          className="relative overflow-hidden bg-[#071b0d] px-5 py-12 md:px-6 md:py-16"
        >
          <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[#2f7a35]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#b7d8a3]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.36fr_0.64fr] xl:gap-12">
            <div className="text-white">
              <div className="inline-flex rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b7d8a3] md:text-[11px]">
                Cadastro
              </div>

              <h2 className="mt-5 max-w-[520px] text-[34px] font-semibold leading-tight tracking-[-0.04em] md:text-[42px]">
                Conte-nos sobre você.
              </h2>

              <p className="mt-4 max-w-[560px] text-[16px] leading-7 text-white/76 md:text-[17px] md:leading-8">
                O cadastro ajuda a Nativa a entender seu perfil e identificar
                possíveis conexões com tecnologias que estejam avaliando entrada
                ou crescimento no Brasil.
              </p>

              <div className="mt-6 rounded-[22px] border border-white/12 bg-white/[0.05] p-5">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#b7d8a3]" />
                  <p className="text-[14px] leading-7 text-white/70">
                    Seus dados serão usados apenas para curadoria de
                    oportunidades e contato relacionado à Rede Nativa.
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-[560px] text-[14px] leading-7 text-white/64">
                Prefere falar diretamente? Envie uma mensagem para{" "}
                <a
                  href="mailto:contact@nativaag.com.br"
                  onClick={() =>
                    trackEvent("contact_email_click", {
                      location: "rede_nativa_signup_section",
                      source: "rede_nativa_page",
                      page_path: window.location.pathname,
                      page_location: window.location.href,
                    })
                  }
                  className="font-semibold text-white underline underline-offset-4"
                >
                  contact@nativaag.com.br
                </a>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              onFocus={handleFormStart}
              className="rounded-[26px] bg-white p-5 shadow-[0_22px_60px_rgba(0,0,0,0.22)] md:rounded-[30px] md:p-8 lg:self-start"
            >
              <div className="mb-6 border-b border-black/10 pb-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#56724f]">
                  Rede Nativa
                </div>
                <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#0d1823] md:text-[30px]">
                  Cadastre seu interesse
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#5b665d]">
                  Leva menos de dois minutos. Quanto melhor o contexto, melhor a
                  curadoria.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    Nome
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    Empresa / instituição
                  </label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    E-mail
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    WhatsApp
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    Cidade / Estado
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                    placeholder="Ex: Campinas/SP"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                    Perfil
                  </label>
                  <select
                    name="profile"
                    value={formData.profile}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-[#174d21]"
                  >
                    <option value="">Selecione</option>
                    {profiles.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 md:mt-6">
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                  Áreas de interesse
                </label>

                <div className="mt-3 grid gap-2 sm:grid-cols-2 md:gap-3">
                  {solutionTypes.map((item) => (
                    <label
                      key={item.label}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-black/10 p-3 text-[14px] leading-5 text-[#27342d] transition hover:bg-[#f4f3ed]"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(item.label)}
                        onChange={() => handleInterestChange(item.label)}
                        className="mt-1"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5 md:mt-6">
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                  Principal objetivo
                </label>
                <select
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-[#174d21]"
                >
                  <option value="">Selecione</option>
                  {objectives.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 md:mt-6">
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334138] md:text-[12px] md:tracking-[0.18em]">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 outline-none transition focus:border-[#174d21]"
                  placeholder="Conte brevemente quais desafios ou oportunidades você gostaria de resolver com tecnologia."
                />
              </div>

              <div className="mt-5 min-h-[24px] text-[14px]">
                {status.error && (
                  <p className="text-red-600">{status.error}</p>
                )}

                {status.success && (
                  <p className="text-[#174d21]">
                    Cadastro enviado com sucesso. A Nativa entrará em contato
                    quando houver oportunidades aderentes ao seu perfil.
                  </p>
                )}

                {!status.error && !status.success && (
                  <p className="text-[#5b665d]">
                    Usaremos essas informações apenas para entender seu perfil e
                    possíveis conexões com tecnologias aderentes.
                  </p>
                )}
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-black/10 bg-[#f8f8f4] p-4 text-[13px] leading-6 text-[#465149]">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <span>
                  Declaro que li e concordo que a Nativa trate as informações
                  enviadas neste formulário para entrar em contato sobre
                  oportunidades, conexões e iniciativas relacionadas à Rede
                  Nativa, conforme a{" "}
                  <Link
                    to="/politica-de-privacidade"
                    className="font-semibold text-[#174d21] underline underline-offset-4"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={status.loading}
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#174d21] px-7 py-4 text-[14px] font-semibold uppercase text-white transition hover:bg-[#215f23] disabled:cursor-not-allowed disabled:opacity-60 md:mt-6"
              >
                {status.loading ? "Enviando..." : "Enviar cadastro"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}