import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./components/Layout";
import { Explorar } from "./screens/Explorar";
import { MeusCasos } from "./screens/MeusCasos";
import { Perfil } from "./screens/Perfil";
import { PetForm } from "./screens/PetForm";
import { type Page, type PetFormMode } from "./lib/types";

function App() {
  const [page, setPage] = useState<Page>("formulario");
  const [formMode, setFormMode] = useState<PetFormMode>("perdido");

  const navigate = (target: Page) => {
    setPage(target);
  };

  const openForm = (mode: PetFormMode) => {
    setFormMode(mode);
    setPage("formulario");
  };

  return (
    <StrictMode>
      <Layout currentPage={page} onNavigate={navigate} onOpenForm={openForm}>
        {page === "formulario" && (
          <PetForm mode={formMode} onBack={() => openForm("perdido")} />
        )}
        {page === "explorar" && <Explorar />}
        {page === "meus-casos" && <MeusCasos />}
        {page === "perfil" && <Perfil />}
      </Layout>
    </StrictMode>
  );
}

createRoot(document.getElementById("app") as HTMLElement).render(<App />);
