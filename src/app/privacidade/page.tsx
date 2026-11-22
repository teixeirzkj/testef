import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LegalPage, Fill } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${siteConfig.name} trata dados pessoais.`,
};

/**
 * Modelo inicial. Revise com um profissional antes de publicar
 * e preencha os dados em src/config/site.ts.
 */
export default function PrivacidadePage() {
  const { legal, supportEmail, name } = siteConfig;
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        Esta política descreve como a <strong>{name}</strong>, responsável:{" "}
        <Fill value={legal.companyName} label="razão social / responsável" /> (
        <Fill value={legal.document} label="CNPJ/CPF" />), trata as informações de quem visita esta página, de acordo
        com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>1. Dados coletados nesta página</h2>
      <p>
        Esta landing page <strong>não possui formulários</strong> e não coleta nome, CPF, dados de cartão ou dados
        bancários. O navegador pode guardar, durante a sessão, a informação de que a oferta já foi liberada, apenas para não
        exigir que assista novamente.
      </p>

      <h2>2. Pagamento</h2>
      <p>
        A compra é realizada no checkout da PagueZy, que coleta e trata os dados necessários para o pagamento conforme
        a política de privacidade própria da PagueZy.
      </p>

      <h2>3. Ferramentas de terceiros</h2>
      <p>
        <Fill value="" label="Liste aqui pixels / ferramentas de análise utilizadas (ex.: Meta Pixel, Google Analytics), se houver" />
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Você pode solicitar acesso, correção ou exclusão de dados pessoais a qualquer momento pelo contato:{" "}
        <Fill value={supportEmail} label="e-mail de contato" />.
      </p>
    </LegalPage>
  );
}
