import { createFileRoute } from "@tanstack/react-router";
import LoteNoturno from "@/components/LoteNoturno.jsx";

const title = "Mãe Gaia — adega & distribuidora";
const description =
  "Lotes limitados de bebidas artesanais Mãe Gaia: hidroméis, coquetéis e fermentados especiais no varejo e no atacado, com entrega e retirada.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LoteNoturno />;
}
