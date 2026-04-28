import { useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Globe,
  Leaf,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Truck,
  Users,
  Wifi,
  Check,
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    privacyConsent: false,
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacyConsent) {
      setStatus({
        loading: false,
        success: false,
        error: "Please accept the Privacy Policy before submitting.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
body: JSON.stringify({
  access_key: import.meta.env.VITE_WEB3FORMS_KEY,
  subject: "New contact from Nativa website",
  from_name: "Nativa Website",

  form_origin: "Nativa homepage contact form",
  privacy_policy_url: "https://www.nativaag.com.br/politica-de-privacidade",
  privacy_policy_version: "2026-04",
  page_url: window.location.href,
  user_agent: navigator.userAgent,

  name: formData.name,
  phone: formData.phone,
  email: formData.email,
  message: formData.message,

  privacy_consent: formData.privacyConsent
    ? "LGPD/privacy consent granted by user"
    : "Not granted",
  consent_text:
    "I agree that Nativa may process the information submitted in this form to contact me about market entry, validation and growth opportunities in Brazil, according to the Privacy Policy.",
  consent_date: new Date().toISOString(),
}),
      });

      const result = await response.json();

      if (result.success) {
        trackEvent("contact_form_submit_success", {
          source: "contact_form",
        });

        trackEvent("generate_lead", {
          source: "contact_form",
        });

        setStatus({ loading: false, success: true, error: "" });

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          privacyConsent: false,
        });
      } else {
        trackEvent("contact_form_submit_error", {
          source: "contact_form",
          error_type: "api_response_error",
        });

        setStatus({
          loading: false,
          success: false,
          error: "Something went wrong. Please try again.",
        });
      }
    } catch {
      trackEvent("contact_form_submit_error", {
        source: "contact_form",
        error_type: "network_or_runtime_error",
      });

      setStatus({
        loading: false,
        success: false,
        error: "Unable to send message right now.",
      });
    }
  };

  const cards = [
    {
      icon: Globe,
      title: "International agtech startups expanding into Brazil",
      text1: "From the U.S., Canada, Europe, Asia and other markets",
      text2: "You bring innovation. We bring the local advantage.",
      image: "/images/international-agtech.png",
    },
    {
      icon: Leaf,
      title: "Across all agtech segments",
      text1:
        "From farm management to fintech, biologicals to marketplaces, and beyond.",
      text2: "Any solution that drives impact in agriculture.",
      image: "/images/across-segments.png",
    },
    {
      icon: Users,
      title: "Founders seeking traction before local commitment.",
      text1:
        "Validate, learn and build momentum before investing in a local team or infrastructure.",
      text2: "De-risk entry. Maximize chances of success.",
      image: "/images/founders.png",
    },
  ];

  const expertise = [
    { icon: Sprout, top: "Farm", bottom: "Management" },
    { icon: Leaf, top: "Inputs &", bottom: "Biologicals" },
    { icon: ShieldCheck, top: "Fintech &", bottom: "Insurance" },
    { icon: ShoppingBag, top: "Marketplaces &", bottom: "E-commerce" },
    { icon: BarChart3, top: "Data &", bottom: "Analytics" },
    { icon: Cpu, top: "IoT & Remote", bottom: "Sensing" },
    { icon: Wifi, top: "Infrastructure &", bottom: "Connectivity" },
    { icon: Leaf, top: "Sustainability &", bottom: "Carbon" },
    { icon: Scale, top: "Regulatory &", bottom: "Compliance" },
    { icon: Truck, top: "Logistics &", bottom: "Supply Chain" },
  ];

  const steps = [
    {
      number: "1",
      title: "EXPLORE",
      subtitle: "Understand. Validate. De-risk.",
      bullets: [
        "Market & customer insights",
        "Landscape & competitive analysis",
        "Regulatory & technical assessment",
        "Go-to-market strategy",
      ],
      outcome: "A clear entry roadmap",
      icon: Globe,
    },
    {
      number: "2",
      title: "LAUNCH",
      subtitle: "Localize. Test. Adapt.",
      bullets: [
        "Value proposition & positioning",
        "Partnerships & pilot execution",
        "Localization & product adaptation",
        "Demand generation & awareness",
      ],
      outcome: "Validated traction",
      icon: Rocket,
    },
    {
      number: "3",
      title: "GROW",
      subtitle: "Scale. Expand. Succeed.",
      bullets: [
        "Commercial expansion strategy",
        "Channel & partner development",
        "Operational & team support",
        "Ongoing advisory & optimization",
      ],
      outcome: "Sustainable growth",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f3ed] text-[#0d1823]">
      <div className="mx-auto max-w-[1180px] px-6 pb-8 pt-5">
        <header>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[28px] font-semibold leading-none tracking-[0.22em] text-[#174d21]">
                NATIVA
              </div>
              <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#344134]">
                MAKE AGTECH NATIVE TO BRAZIL
              </div>
            </div>

            <nav className="hidden items-center gap-10 pt-2 text-[12px] font-medium uppercase text-[#1e2b35] md:flex">
              <a href="#about">ABOUT</a>
              <a href="#help">HOW WE HELP</a>
              <a href="#approach">OUR APPROACH</a>
              <a href="#contact">CONTACT</a>
            </nav>

            <a
              href="#contact"
              onClick={() =>
                trackEvent("cta_lets_talk_click", {
                  location: "header",
                })
              }
              className="shrink-0 whitespace-nowrap rounded-xl bg-[#144c1f] px-4 py-3 text-[12px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#1a5c27] sm:px-7 sm:py-4 sm:text-[13px]"
            >
              LET’S TALK
            </a>
          </div>
        </header>

        <section className="mt-4 grid items-stretch gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="flex flex-col justify-between py-8">
            <div>
              <h1 className="max-w-[430px] text-[64px] font-semibold uppercase leading-[0.93] tracking-[-0.05em] text-[#08131f] md:text-[74px]">
                WE MAKE YOUR AGTECH{" "}
                <span className="text-[#295f27]">NATIVE</span> TO BRAZIL
              </h1>

              <p className="mt-8 max-w-[330px] text-[19px] leading-[1.7] text-[#28313a]">
                Market entry and growth strategies for international agtech
                startups.
              </p>
              <p className="mt-1 max-w-[330px] text-[19px] leading-[1.7] text-[#28313a]">
                Less guesswork. More traction.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    onClick={() =>
                      trackEvent("cta_lets_talk_click", {
                        location: "hero",
                      })
                    }
                    className="inline-flex items-center gap-4 rounded-xl bg-[#215f23] px-8 py-5 text-[14px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#2a6d2d]"
                  >
                    LET’S TALK
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    to="/rede-nativa"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#174d21]/20 bg-white px-5 py-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#174d21] shadow-sm transition hover:bg-[#eef3eb]"
                  >
                    Brazil Network
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <Link
                  to="/brazil-agtech-market-entry"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#174d21] underline underline-offset-4 hover:text-[#2a6d2d]"
                >
                  Read the Brazil Agtech Market Entry Guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6f757c]">
                WHY NATIVA
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6 text-[#2c3440]">
                <div>
                  <div className="text-[26px] font-semibold text-[#174d21]">
                    +10 yrs
                  </div>
                  <div className="text-[13px] leading-5">
                    Digital ag & product experience
                  </div>
                </div>
                <div>
                  <div className="text-[26px] font-semibold text-[#174d21]">
                    Brazil-first
                  </div>
                  <div className="text-[13px] leading-5">
                    Deep local market understanding
                  </div>
                </div>
                <div>
                  <div className="text-[26px] font-semibold text-[#174d21]">
                    Execution
                  </div>
                  <div className="text-[13px] leading-5">
                    Not just strategy — real traction
                  </div>
                </div>
                <div>
                  <div className="text-[26px] font-semibold text-[#174d21]">
                    Ag focused
                  </div>
                  <div className="text-[13px] leading-5">
                    Built specifically for agtech
                  </div>
                </div>
              </div>
            </div>
          </div>

<div className="relative min-h-[720px] overflow-hidden rounded-[30px] border border-white/20 bg-[#d8ccb9] shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:min-h-[680px] lg:min-h-[720px]">
  {/* Paisagem de fundo */}
  <img
    src="/images/hero-landscape.jpg"
    alt="Brazilian agricultural landscape"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ec]/45 via-[#e8d2b1]/16 to-[#0d1823]/30" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_26%,rgba(255,225,160,0.28),transparent_30%),radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.12),transparent_28%)]" />
  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.13)_100%)]" />

  {/* Mapa do Brasil */}
  <div className="absolute left-1/2 top-[7%] z-10 w-[78%] max-w-[285px] -translate-x-1/2 sm:top-[6%] sm:w-[76%] sm:max-w-[460px] lg:top-[6%] lg:w-[92%] lg:max-w-[690px]">
    <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6d48f]/25 blur-3xl" />
    <img
      src="/images/brazil-3d-polygon.png"
      alt="Stylized 3D polygon map of Brazil"
      className="hero-map-float relative z-10 w-full object-contain drop-shadow-[0_30px_56px_rgba(0,0,0,0.38)]"
    />
  </div>

  {/* Cards inferiores */}
  <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-1 gap-3 sm:inset-x-6 sm:bottom-6 sm:grid-cols-2 lg:grid-cols-[1.34fr_0.62fr_0.62fr] lg:items-end">
    {/* Card principal glass */}
    <div className="relative overflow-hidden rounded-[26px] border border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.34))] p-4 shadow-[0_14px_46px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:col-span-2 sm:p-5 lg:col-span-1 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.62),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]" />

      <div className="relative z-10">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5b451b] drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]">
          Brazil Entry
        </div>

        <h3 className="mt-2 text-[18px] font-semibold leading-snug text-[#102b19] sm:text-[21px]">
          Strategy with local execution
        </h3>

        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[#263d2d] sm:text-[14px]">
          <li>• Go-to-market adapted to Brazil</li>
          <li>• Local partnerships and pilots</li>
          <li>• Faster learning, less risk</li>
        </ul>
      </div>
    </div>

    {/* Card verde glass 1 */}
    <div className="relative flex min-h-[84px] flex-col justify-center overflow-hidden rounded-[22px] border border-white/22 bg-[linear-gradient(135deg,rgba(23,77,33,0.76),rgba(12,49,19,0.50))] p-4 text-white shadow-[0_12px_34px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:min-h-[104px] lg:min-h-[102px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,0.20),transparent_36%)]" />
      <div className="relative z-10">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#dceccf]">
          Learn Fast
        </div>
        <div className="mt-2 text-[18px] font-semibold leading-[1.12] sm:text-[20px]">
          Validate locally
        </div>
      </div>
    </div>

    {/* Card verde glass 2 */}
    <div className="relative flex min-h-[84px] flex-col justify-center overflow-hidden rounded-[22px] border border-white/22 bg-[linear-gradient(135deg,rgba(16,63,24,0.78),rgba(6,38,14,0.52))] p-4 text-white shadow-[0_12px_34px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:min-h-[104px] lg:min-h-[102px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,0.18),transparent_36%)]" />
      <div className="relative z-10">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#dceccf]">
          Grow Smart
        </div>
        <div className="mt-2 text-[18px] font-semibold leading-[1.12] sm:text-[20px]">
          Scale with confidence
        </div>
      </div>
    </div>
  </div>

  {/* Borda elegante */}
  <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/20" />
</div>     

</section>

        <section id="about" className="pt-10">
          <div className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#56724f]">
            WHO NATIVA IS FOR
          </div>
          <h2 className="mt-3 max-w-[700px] text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#0d1823] md:text-[42px]">
            Built for founders with strong products and limited local context.
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-[16px] border border-black/8 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-[165px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#144c1f] text-white shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-5">
                    <h3 className="text-[20px] font-semibold leading-[1.22] tracking-[-0.02em] text-[#111c26]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-[#404953]">
                      {card.text1}
                    </p>
                    <p className="mt-5 text-[14px] leading-[1.7] text-[#404953]">
                      {card.text2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="help" className="pt-8">
          <div className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#56724f]">
            SOLUTIONS & EXPERTISE
          </div>
          <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-[#0d1823] md:text-[32px]">
            Deep expertise across the agtech ecosystem.
          </h2>

          <div className="mt-6 border-y border-black/10 py-5">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 md:grid-cols-5 lg:grid-cols-10">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.top + item.bottom}
                    className={`flex min-h-[92px] flex-col items-center justify-start px-1 text-center ${
                      index < expertise.length - 1
                        ? "lg:border-r lg:border-black/10"
                        : ""
                    }`}
                  >
                    <Icon className="h-7 w-7 text-[#56724f]" />

                    <div className="mt-2 max-w-[96px] text-[10.5px] font-medium leading-[1.28] text-[#1d2831] sm:text-[11px] md:max-w-[115px] md:text-[11.5px]">
                      <div>{item.top}</div>
                      <div>{item.bottom}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-center text-[14px] leading-[1.7] text-[#596168]">
            We combine sector knowledge, local relationships and execution
            experience to turn your solution into real growth in Brazil.
          </div>
        </section>

        <section id="approach" className="pt-8">
          <div className="rounded-[16px] bg-[#ecefe5] px-5 py-5 md:px-6 md:py-6">
            <div className="text-[14px] font-semibold uppercase tracking-[0.2em] text-[#56724f]">
              HOW IT WORKS
            </div>

            <div className="mt-4 grid gap-5 lg:grid-cols-[230px_1fr]">
              <div>
                <h2 className="max-w-[210px] text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#0d1823]">
                  A clear path to real traction in Brazil.
                </h2>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title + idx} className="contents">
                      <div className="rounded-[14px] border border-black/8 bg-white px-4 pb-4 pt-3 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#144c1f] text-[14px] font-semibold text-white">
                            {step.number}
                          </div>
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#b7c9b1] text-[#56724f]">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="mt-3 text-[26px] font-semibold leading-none tracking-[-0.03em] text-[#16341b]">
                          {step.title}
                        </div>
                        <div className="mt-1 text-[12px] font-medium text-[#56724f]">
                          {step.subtitle}
                        </div>

                        <div className="mt-3 space-y-2 border-t border-black/8 pt-3">
                          {step.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex items-start gap-2 text-[12px] leading-[1.45] text-[#3b4650]"
                            >
                              <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-[#2d6a2f]" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 border-t border-black/8 pt-3 text-[12px] text-[#4b555d]">
                          <span className="font-semibold text-[#16341b]">
                            Outcome:
                          </span>{" "}
                          {step.outcome}
                        </div>
                      </div>

                      {idx < steps.length - 1 && (
                        <div className="hidden items-center justify-center lg:flex">
                          <ArrowRight className="h-7 w-7 text-[#0d1823]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8">
          <div className="overflow-hidden rounded-[22px] border border-[#174d21]/12 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
            <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr]">
              <div className="p-7 md:p-9">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#56724f]">
                  Brazil Network
                </div>

                <h2 className="mt-3 max-w-[620px] text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#0d1823] md:text-[40px]">
                  Are you part of the Brazilian agribusiness ecosystem?
                </h2>

                <p className="mt-4 max-w-[620px] text-[16px] leading-7 text-[#465149]">
                  Join the Nativa Network to discover, evaluate and connect with
                  agtech solutions entering Brazil.
                </p>

                <Link
                  to="/rede-nativa"
                  className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#174d21] px-6 py-4 text-[13px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#215f23]"
                >
                  Join the Brazil Network
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative min-h-[260px] bg-[#102513]">
                <img
                  src="/images/hero-main.png"
                  alt="Brazil agribusiness innovation network"
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-[#102513]/45" />

                <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/20 bg-white/12 p-4 text-white backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    For Brazilian partners
                  </div>
                  <div className="mt-1 text-[20px] font-semibold leading-tight">
                    Producers, retailers, cooperatives, consultants and
                    agribusiness organizations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="pt-8">
          <div className="relative overflow-hidden rounded-[22px] bg-[#102513] px-7 py-8 md:px-10 md:py-10">
            <img
              src="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=80"
              alt="Field texture"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-[#102513]/82" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bfd7bf]">
                    Contact
                  </div>

                  <h2 className="mt-3 max-w-[420px] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[42px]">
                    Let’s discuss your agtech entry into Brazil.
                  </h2>

                  <p className="mt-4 max-w-[430px] text-[16px] leading-7 text-white/82">
                    Share a few details about your company, product, and goals.
                    We will use this as the starting point for an initial
                    conversation about market entry, localization, and execution
                    in Brazil.
                  </p>
                </div>

                <div className="mt-8 max-w-[430px] rounded-2xl border border-white/12 bg-white/[0.07] p-4 text-white/88 backdrop-blur-sm lg:mt-12">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bfd7bf]">
                    Prefer email?
                  </div>
                  <p className="mt-2 text-[14px] leading-6">
                    Contact us directly at{" "}
                    <a
                      href="mailto:contact@nativaag.com.br"
                      onClick={() =>
                        trackEvent("contact_email_click", {
                          location: "contact_section",
                        })
                      }
                      className="font-semibold text-white underline underline-offset-4 hover:text-[#d8e7d1]"
                    >
                      contact@nativaag.com.br
                    </a>
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[24px] border border-white/12 bg-white/95 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4b5c51]">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full rounded-[14px] border border-[#d9e1d7] bg-white px-4 py-3.5 text-[15px] text-[#16221a] outline-none transition focus:border-[#5f8a61] focus:ring-2 focus:ring-[#dbe8da]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4b5c51]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone"
                      className="w-full rounded-[14px] border border-[#d9e1d7] bg-white px-4 py-3.5 text-[15px] text-[#16221a] outline-none transition focus:border-[#5f8a61] focus:ring-2 focus:ring-[#dbe8da]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4b5c51]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="w-full rounded-[14px] border border-[#d9e1d7] bg-white px-4 py-3.5 text-[15px] text-[#16221a] outline-none transition focus:border-[#5f8a61] focus:ring-2 focus:ring-[#dbe8da]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4b5c51]">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your startup, solution, and objectives in Brazil"
                      required
                      className="w-full rounded-[14px] border border-[#d9e1d7] bg-white px-4 py-3.5 text-[15px] text-[#16221a] outline-none transition focus:border-[#5f8a61] focus:ring-2 focus:ring-[#dbe8da]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  {status.success && (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] leading-6 text-green-800">
                      Message sent successfully.
                    </div>
                  )}

                  {status.error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] leading-6 text-red-700">
                      {status.error}
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-[20px] border border-[#d9ddd8] bg-[#f8f8f5] p-4">
                  <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-6 text-[#304133]">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 shrink-0 accent-[#174d21]"
                    />

                    <span>
                      I agree that Nativa may process the information submitted
                      in this form to contact me about market entry, validation,
                      and growth opportunities in Brazil, according to the{" "}
                      <Link
                        to="/politica-de-privacidade"
                        className="font-semibold text-[#174d21] underline underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <div className="mt-5 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] leading-5 text-[#667064]">
                    We only use your information to evaluate your request and get
                    back to you.
                  </p>

                  <button
                    type="submit"
                    disabled={status.loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#174d21] px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-[#215f23] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[190px]"
                  >
                    {status.loading ? "Sending..." : "Send message"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}