import { useState } from "react";
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

export default function NativaLandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setStatus({
          loading: false,
          success: false,
          error: "Something went wrong. Please try again.",
        });
      }
    } catch {
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
      title: "International agtech startups",
      text1: "from the U.S. and other markets expanding into Brazil.",
      text2: "You bring innovation. We bring the local advantage.",
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: Leaf,
      title: "Across all agtech segments",
      text1:
        "From farm management to fintech, biologicals to marketplaces, and beyond.",
      text2: "Any solution that drives impact in agriculture.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: Users,
      title: "Founders seeking traction before local commitment.",
      text1:
        "Validate, learn and build momentum before investing in a local team or infrastructure.",
      text2: "De-risk entry. Maximize chances of success.",
      image:
        "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=1200&q=80",
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
              className="rounded-xl bg-[#144c1f] px-7 py-4 text-[13px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#1a5c27]"
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

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-4 rounded-xl bg-[#215f23] px-8 py-5 text-[14px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#2a6d2d]"
              >
                LET’S TALK
                <ArrowRight className="h-4 w-4" />
              </a>
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

          <div className="relative min-h-[620px] overflow-hidden rounded-sm bg-[#e7e2d7] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80"
              alt="Brazil agricultural landscape"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f3ed] via-[#f4f3ed]/80 via-[24%] to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,229,180,0.25),transparent_18%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/[0.03]" />

            <div className="absolute left-[68%] top-[46%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-[470px] w-[470px] rounded-full border border-white/18">
                <div className="absolute inset-[30px] rounded-full border border-white/14" />
                <div className="absolute inset-[60px] rounded-full border border-white/10" />

                <svg
                  viewBox="0 0 950 980"
                  className="absolute left-1/2 top-1/2 h-[360px] w-[350px] -translate-x-1/2 -translate-y-1/2 opacity-90"
                  fill="none"
                >
                  <path
                    d="M207 19L342 0L353 86L459 68L541 26L594 122L801 195L929 244L947 311L889 414L854 447L830 594L784 681L719 683L613 749L622 813L548 926L483 979L402 827L467 747L491 707L390 658L382 512L334 507L316 442L216 413L208 365L95 381L1 325L17 272L44 233L70 233L83 155L56 97L128 68L185 104L246 71L237 19L207 19Z"
                    stroke="rgba(255,255,255,0.96)"
                    strokeWidth="14"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M458 68L594 122M594 122L801 195M801 195L889 414M889 414L830 594M830 594L719 683M719 683L491 707M491 707L622 813M622 813L483 979M483 979L402 827M402 827L467 747M467 747L390 658M390 658L382 512M382 512L334 507M334 507L216 413M216 413L95 381M95 381L1 325M1 325L70 233M70 233L208 365M208 365L83 155M83 155L185 104M185 104L353 86M353 86L246 71M246 71L458 68M208 365L216 413M208 365L317 441M317 441L382 512M317 441L208 365M317 441L208 271M208 271L208 365M208 271L83 155M208 271L353 86M208 271L458 68M208 271L95 381M382 512L458 68M382 512L594 122M382 512L542 691M542 691L719 683M542 691L491 707M542 691L390 658M542 691L830 594M542 691L889 414M458 68L317 441M594 122L719 249M719 249L889 414M719 249L801 195M719 249L594 122M719 249L830 594M719 249L542 385M542 385L458 68M542 385L594 122M542 385L889 414M542 385L382 512M542 385L719 683M458 68L353 86M185 104L317 441M216 413L390 658M622 813L719 683M402 827L483 979"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[380px] rounded-[18px] border border-white/50 bg-white/92 p-4 text-[#102015] shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6b5d]">
                  BRAZIL ENTRY
                </div>

                <div className="mt-1 text-[20px] font-semibold leading-tight text-[#14311b]">
                  Strategy with local execution
                </div>

                <div className="mt-3 space-y-2 text-[13px] text-[#324238]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1f5f27] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Go-to-market adapted to Brazil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1f5f27] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Local partnerships and pilots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1f5f27] text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>Faster learning, less risk</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 self-end">
                <div className="rounded-[16px] border border-white/30 bg-[#163e1f]/78 px-4 py-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                    LEARN FAST
                  </div>
                  <div className="mt-1 text-[18px] font-semibold leading-none">
                    Validate locally
                  </div>
                </div>

                <div className="rounded-[16px] border border-white/30 bg-[#163e1f]/78 px-4 py-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
                    GROW SMART
                  </div>
                  <div className="mt-1 text-[18px] font-semibold leading-none">
                    Scale with confidence
                  </div>
                </div>
              </div>
            </div>
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
            <div className="grid grid-cols-5 gap-y-6 md:grid-cols-10">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.top + item.bottom}
                    className={`flex flex-col items-center px-2 text-center ${
                      index < expertise.length - 1
                        ? "md:border-r md:border-black/10"
                        : ""
                    }`}
                  >
                    <Icon className="h-7 w-7 text-[#56724f]" />
                    <div className="mt-2 text-[11.5px] font-medium leading-[1.45] text-[#1d2831]">
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

        <section id="contact" className="pt-8">
          <div className="relative overflow-hidden rounded-[22px] bg-[#102513] px-7 py-8 md:px-10 md:py-10">
            <img
              src="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1800&q=80"
              alt="Field texture"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-[#102513]/82" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <div>
  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bfd7bf]">
    Contact
  </div>

  <h2 className="mt-3 max-w-[420px] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[42px]">
    Let’s discuss your agtech entry into Brazil.
  </h2>

  <p className="mt-4 max-w-[430px] text-[16px] leading-7 text-white/82">
    Share a few details about your company, product, and goals. We
    will use this as the starting point for an initial conversation
    about market entry, localization, and execution in Brazil.
  </p>

  <p className="mt-45 hidden max-w-[430px] text-sm leading-6 text-white/85 lg:block">
  You can also contact us directly at{" "}
  <a
    href="mailto:contact@nativaag.com.br"
    className="font-medium text-white underline underline-offset-4 hover:text-[#d8e7d1]"
  >
    contact@nativaag.com.br
  </a>
</p>
</div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[22px] border border-white/12 bg-white/95 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-6"
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

                <div className="mt-5 flex flex-col gap-4">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="text-[13px] leading-6 text-[#66756a]">
      {status.success && (
        <p className="text-green-700">Message sent successfully.</p>
      )}
      {status.error && <p className="text-red-600">{status.error}</p>}
      {!status.success && !status.error && (
        <p>Fill out the form and we will get back to you.</p>
      )}
    </div>

    <button
      type="submit"
      disabled={status.loading}
      className="inline-flex items-center justify-center gap-3 rounded-[14px] bg-[#174d21] px-7 py-4 text-[14px] font-semibold uppercase text-white shadow-sm transition hover:bg-[#215f23] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {status.loading ? "Sending..." : "Send message"}
      <ArrowRight className="h-4 w-4" />
    </button>
  </div>

  <p className="border-t border-[#d9e1d7] pt-4 text-sm leading-6 text-[#55635a] lg:hidden">
    You can also contact us directly at{" "}
    <a
      href="mailto:contact@nativaag.com.br"
      className="font-medium text-[#174d21] underline underline-offset-4"
    >
      contact@nativaag.com.br
    </a>
  </p>
</div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}