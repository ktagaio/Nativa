import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f4f3ed] text-[#0d1823]">
        <Helmet>
  <title>Política de Privacidade | Nativa</title>
  <meta
    name="description"
    content="Política de Privacidade da Nativa sobre coleta, uso, armazenamento e proteção de dados pessoais enviados por formulários e canais digitais."
  />
  <link
    rel="canonical"
    href="https://www.nativaag.com.br/politica-de-privacidade"
  />
  <meta name="robots" content="index, follow" />
</Helmet>
      <header className="mx-auto flex max-w-[980px] items-start justify-between gap-4 px-5 py-5 md:px-6 md:py-6">
        <Link to="/" className="block min-w-0">
          <div className="text-[24px] font-semibold leading-none tracking-[0.2em] text-[#174d21] md:text-[28px]">
            NATIVA
          </div>
          <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#344134] md:text-[10px] md:tracking-[0.14em]">
            Make agtech native to Brazil
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-[#174d21]/20 bg-white px-4 py-3 text-[11px] font-semibold uppercase text-[#174d21] shadow-sm transition hover:bg-[#eef3eb] md:px-5 md:text-[12px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </header>

      <main className="mx-auto max-w-[980px] px-5 pb-16 pt-6 md:px-6 md:pt-10">
        <section className="rounded-[28px] bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.06)] md:p-10">
          <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#56724f]">
            Privacidade
          </div>

          <h1 className="mt-4 text-[38px] font-semibold leading-tight tracking-[-0.05em] text-[#08131f] md:text-[56px]">
            Política de Privacidade
          </h1>

          <p className="mt-5 text-[16px] leading-7 text-[#465149]">
            Esta Política de Privacidade explica como a Nativa coleta, utiliza,
            armazena e protege informações pessoais enviadas por meio de seus
            formulários e canais digitais.
          </p>

          <div className="mt-8 space-y-8 text-[#344134]">
            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                1. Quais dados coletamos
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                Podemos coletar informações como nome, e-mail, telefone ou
                WhatsApp, empresa, instituição, cidade, estado, perfil de
                atuação, áreas de interesse e mensagens enviadas voluntariamente
                pelos usuários nos formulários do site.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                2. Para que usamos os dados
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                Utilizamos os dados para responder contatos, avaliar possíveis
                oportunidades de conexão, compreender o perfil dos interessados,
                realizar curadoria de aderência e comunicar iniciativas
                relacionadas à Nativa, à Rede Nativa e a oportunidades de
                inovação no agro.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                3. Base legal
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                O tratamento dos dados ocorre com base no consentimento do
                titular ao enviar voluntariamente as informações nos formulários
                e/ou no legítimo interesse da Nativa em responder solicitações,
                organizar contatos e desenvolver conexões profissionais
                relacionadas ao seu objeto de atuação.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                4. Compartilhamento de dados
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                A Nativa não vende dados pessoais. As informações poderão ser
                utilizadas internamente para análise e contato. Quando houver
                potencial conexão com terceiros, como empresas de tecnologia,
                parceiros ou participantes do ecossistema, a Nativa buscará
                conduzir a aproximação de forma adequada ao contexto e à
                finalidade informada.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                5. Armazenamento e segurança
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                Adotamos medidas razoáveis para proteger as informações contra
                acesso não autorizado, perda, alteração ou uso indevido. Os dados
                serão mantidos pelo tempo necessário para cumprir as finalidades
                descritas nesta política, salvo solicitação de exclusão ou
                necessidade de retenção por obrigação legal, regulatória ou para
                proteção de direitos.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                6. Direitos dos titulares
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                O titular dos dados pode solicitar confirmação de tratamento,
                acesso, correção, atualização, exclusão, revogação de
                consentimento ou outras informações relacionadas ao tratamento de
                seus dados pessoais, conforme aplicável pela LGPD.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                7. Cookies e métricas
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                O site pode utilizar ferramentas de análise, como Google
                Analytics e Vercel Analytics, para compreender acessos, páginas
                visitadas, origem de tráfego e interações gerais. Essas
                informações ajudam a melhorar o site, os conteúdos e a
                experiência dos visitantes.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                8. Contato
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                Para dúvidas, solicitações ou exercício de direitos relacionados
                a dados pessoais, entre em contato pelo e-mail{" "}
                <a
                  href="mailto:contact@nativaag.com.br"
                  className="font-semibold text-[#174d21] underline underline-offset-4"
                >
                  contact@nativaag.com.br
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#102513]">
                9. Atualizações
              </h2>
              <p className="mt-3 text-[16px] leading-7">
                Esta política poderá ser atualizada periodicamente para refletir
                mudanças no site, nos serviços, nas práticas da Nativa ou na
                legislação aplicável.
              </p>
              <p className="mt-4 text-[14px] leading-6 text-[#667064]">
                Última atualização: abril de 2026.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}