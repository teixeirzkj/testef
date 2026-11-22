import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { offerConfig } from "@/config/offer";
import { formatBRL } from "@/lib/format";
import { LegalPage, Fill } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Termos de uso da ${siteConfig.name}.`,
};

/**
 * Modelo inicial. Revise com um profissional antes de publicar
 * e preencha os dados em src/config/site.ts.
 */
export default function TermosPage() {
  const { legal, supportEmail, name, appleDisclaimer } = siteConfig;
  const { productName, price, accessMonths, platform, checkoutProvider } = offerConfig;
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao acessar esta página e adquirir o <strong>{productName}</strong>, você concorda com os termos abaixo.
        Responsável: <Fill value={legal.companyName} label="razão social / responsável" /> (
        <Fill value={legal.document} label="CNPJ/CPF" />).
      </p>

      <h2>1. O que é o produto</h2>
      <p>
        O {productName} é um produto digital que dá acesso, por {accessMonths} meses, a um grupo VIP no {platform} onde
        são publicadas promoções do mercado de iPhones. <strong>O produto não inclui aparelhos físicos</strong>: nenhum
        aparelho é vendido ou enviado por meio desta compra.
      </p>

      <h2>2. Promoções</h2>
      <p>
        Preços e disponibilidade das promoções podem variar. A {name} não garante a disponibilidade de um produto,
        preço ou condição específica, nem resultados financeiros com compra ou revenda.
      </p>

      <h2>3. Pagamento e acesso</h2>
      <p>
        Pagamento único{price !== null && <> de <strong>{formatBRL(price)}</strong></>}, processado pela{" "}
        {checkoutProvider}, sem parcelamento e sem renovação automática. O acesso começa após a confirmação do pagamento
        e dura {accessMonths} meses. Ao final desse período o acesso se encerra, sem nova cobrança.
      </p>

      <h2>4. Reembolso</h2>
      <p>
        <Fill value="" label="descrever a política de reembolso (o CDC prevê 7 dias de arrependimento para compras online)" />
      </p>

      <h2>5. Marcas</h2>
      <p>{appleDisclaimer}</p>

      <h2>6. Contato</h2>
      <p>
        <Fill value={supportEmail} label="e-mail de contato" />
      </p>
    </LegalPage>
  );
}
