import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrazilAgtechMarketEntry() {
  return (
    <div className="min-h-screen bg-[#f4f3ed] text-[#0d1823]">
      <header className="mx-auto flex max-w-[1120px] items-start justify-between px-6 py-6">
        <Link to="/" className="block">
          <div className="text-[28px] font-semibold leading-none tracking-[0.22em] text-[#174d21]">
            NATIVA
          </div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#344134]">
            MAKE AGTECH NATIVE TO BRAZIL
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-[#174d21]/20 bg-white px-5 py-3 text-[12px] font-semibold uppercase text-[#174d21] shadow-sm transition hover:bg-[#eef3eb]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
      </header>

      <main>
        <section className="mx-auto max-w-[1120px] px-6 pb-10 pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#56724f]">
                Brazil Market Entry
              </div>

              <h1 className="mt-4 max-w-[820px] text-[46px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#08131f] md:text-[68px]">
                Brazil Agtech Market Entry Guide
              </h1>

              <p className="mt-6 max-w-[720px] text-[20px] leading-8 text-[#334138]">
                What international agtech startups need to know before
                expanding into Brazil — and how to validate the market before
                committing to a full local operation.
              </p>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#56724f]">
                In this guide
              </div>

              <div className="mt-5 space-y-4 text-[15px] leading-6 text-[#27342d]">
                {[
                  "Why Brazil matters for agtech startups",
                  "Why Brazil is not one single agriculture market",
                  "Common mistakes international founders make",
                  "How to validate before building a local team",
                  "How to design a first market-entry pilot",
                  "How Nativa helps",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#174d21]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/55">
          <div className="mx-auto grid max-w-[1120px] gap-6 px-6 py-8 md:grid-cols-3">
            <div>
              <div className="text-[30px] font-semibold text-[#174d21]">
                Top 3
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#344134]">
                Brazil is among the world’s most relevant agricultural markets
                by scale, diversity and innovation demand.
              </p>
            </div>

            <div>
              <div className="text-[30px] font-semibold text-[#174d21]">
                Local fit
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#344134]">
                Product-market fit elsewhere does not automatically translate
                into local-market fit in Brazil.
              </p>
            </div>

            <div>
              <div className="text-[30px] font-semibold text-[#174d21]">
                Pilot first
              </div>
              <p className="mt-2 text-[14px] leading-6 text-[#344134]">
                The smartest path is to validate, adapt and build traction
                before investing in a full local team.
              </p>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-[860px] px-6 py-14">
          <div className="space-y-12">
            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                Why Brazil matters for agtech startups
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#344134]">
                Brazil is one of the most important agricultural markets in the
                world, with large-scale production, diverse crops, sophisticated
                growers, strong agribusiness groups and constant pressure for
                productivity, sustainability and operational efficiency.
              </p>
              <p className="mt-4 text-[17px] leading-8 text-[#344134]">
                For international agtech startups, Brazil can represent a major
                growth opportunity. But it is also a complex market where
                commercial channels, agronomic realities, decision-making
                processes and regional differences require local understanding.
              </p>
            </section>

            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                Brazil is not one single agriculture market
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#344134]">
                A common mistake is treating Brazil as one uniform market. In
                reality, agriculture in Brazil varies significantly by crop,
                region, farm size, technology adoption, distribution model and
                buying behavior.
              </p>
              <p className="mt-4 text-[17px] leading-8 text-[#344134]">
                A solution that works well for row crops in one region may need
                different positioning, integrations, partnerships or pricing to
                succeed in another. Understanding this complexity early reduces
                risk and improves the quality of market-entry decisions.
              </p>
            </section>

            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                Common mistakes international founders make
              </h2>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Assuming translation is localization",
                    text: "Language is only one part of localization. Sales motion, support model, agronomic assumptions, integrations and commercial positioning also need adaptation.",
                  },
                  {
                    title: "Skipping local validation",
                    text: "Entering the market with a fixed playbook can lead to wasted time and budget. Early validation helps identify what needs to change before scaling.",
                  },
                  {
                    title: "Choosing partners too late",
                    text: "In Brazilian agriculture, relationships and channels matter. The right local partners can accelerate trust, access and execution.",
                  },
                  {
                    title: "Hiring before traction",
                    text: "Building a full local team before proving demand can increase cost and complexity. A pilot-first approach often makes more sense.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-black/10 bg-white p-5"
                  >
                    <h3 className="text-[20px] font-semibold text-[#14311b]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#465149]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                Why local validation matters before building a local team
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#344134]">
                Before committing to local hiring, office setup or large-scale
                commercial investment, international agtech startups should
                answer a few critical questions: Who is the real buyer? What
                problem is most urgent? Which channel can create trust fastest?
                What needs to be adapted? What would a successful pilot prove?
              </p>
              <p className="mt-4 text-[17px] leading-8 text-[#344134]">
                Local validation creates evidence. It helps founders make better
                decisions about product adaptation, pricing, partnerships,
                customer segments and go-to-market priorities.
              </p>
            </section>

            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                How to design a first market-entry pilot
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#344134]">
                A good pilot should not be a generic demo. It should be designed
                to answer specific market-entry questions and create evidence
                for the next investment decision.
              </p>

              <div className="mt-6 rounded-[22px] bg-[#102513] p-6 text-white">
                <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#bfd7bf]">
                  Pilot design checklist
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {[
                    "Define the target customer segment",
                    "Clarify the business problem",
                    "Select the right local partner",
                    "Adapt the value proposition",
                    "Set measurable success criteria",
                    "Capture commercial and product learnings",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-[15px]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9fd36a]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[34px] font-semibold tracking-[-0.03em] text-[#0d1823]">
                How Nativa helps
              </h2>
              <p className="mt-5 text-[17px] leading-8 text-[#344134]">
                Nativa helps international agtech startups enter, validate and
                grow in Brazil through local market strategy, partnerships,
                pilot design and execution support.
              </p>
              <p className="mt-4 text-[17px] leading-8 text-[#344134]">
                The goal is simple: less guesswork, more traction. We help
                founders understand the market, adapt their approach and build a
                practical path from first validation to sustainable growth.
              </p>
            </section>

            <section className="rounded-[28px] bg-[#174d21] p-8 text-white md:p-10">
              <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.03em]">
                Planning to bring your agtech solution to Brazil?
              </h2>
              <p className="mt-4 max-w-[620px] text-[17px] leading-8 text-white/86">
                Let’s discuss your market-entry goals, target segment and the
                best way to validate your opportunity in Brazil.
              </p>

              <Link
                to="/#contact"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-[14px] font-semibold uppercase text-[#174d21] transition hover:bg-[#eef3eb]"
              >
                Talk to Nativa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}