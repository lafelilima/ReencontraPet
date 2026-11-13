import {
  ChevronRightIcon,
  DogIcon,
  HomeIcon,
  MenuIcon,
  PawPrintIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { type Page, type PetFormMode } from "../lib/types";

type LayoutProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenForm: (mode: PetFormMode) => void;
  children: React.ReactNode;
};

export function Layout({ currentPage, onNavigate, onOpenForm, children }: LayoutProps) {
  const isFormActive = currentPage === "formulario";

  return (
    <main className="min-h-screen min-w-[1180px] overflow-x-auto bg-[#f7f7f2] text-[#2c3e50]">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[320px] flex-col bg-[#f7f7f2] px-[21px]">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onOpenForm("perdido")}
          className="flex h-[72px] cursor-pointer items-center justify-center border-b border-[#e6e6e6] transition-opacity hover:opacity-80"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e74c3c]">
              <PawPrintIcon className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-['Rammetto_One'] text-[28px] leading-none text-[#2c3e50]">
              Reencontra<span className="text-[#e74c3c]">Pet</span>
            </span>
          </div>
        </button>

        {/* Action buttons */}
        <nav className="mt-[55px] flex flex-col gap-4" aria-label="Ações">
          <button
            type="button"
            onClick={() => onOpenForm("perdido")}
            className={`flex h-[99px] w-full cursor-pointer items-center justify-between rounded-[14px] px-[18px] text-left shadow-[0px_4px_10px_#00000040] transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] ${
              isFormActive
                ? "bg-[#236b87] ring-2 ring-[#2a7b9b]/40"
                : "bg-[#2a7b9b] hover:bg-[#236b87]"
            }`}
          >
            <span className="flex items-center gap-3">
              <div className="flex h-[54px] w-[62px] items-center justify-center rounded-[12px] bg-white/15">
                <PawPrintIcon className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
              <span className="flex flex-col gap-1">
                <strong className="font-['Poppins'] text-[20px] leading-5 text-white">
                  Perdi um pet
                </strong>
                <small className="font-['Poppins'] text-[14px] font-light text-white/75">
                  Publique um alerta
                </small>
              </span>
            </span>
            <ChevronRightIcon className="h-7 w-7 text-white/80" />
          </button>

          <button
            type="button"
            onClick={() => onOpenForm("encontrado")}
            className="flex h-[99px] w-full cursor-pointer items-center justify-between rounded-[14px] bg-[#ffd166] px-[18px] text-left shadow-[0px_4px_10px_#00000040] transition-all hover:scale-[1.02] hover:bg-[#f4c55b] hover:shadow-lg active:scale-[0.99]"
          >
            <span className="flex items-center gap-3">
              <div className="flex h-[54px] w-[62px] items-center justify-center rounded-[12px] bg-[#2c3e50]/10">
                <DogIcon className="h-8 w-8 text-[#2c3e50]" strokeWidth={2} />
              </div>
              <span className="flex flex-col gap-1">
                <strong className="font-['Poppins'] text-[20px] leading-[19px] text-[#2c3e50]">
                  Encontrei um
                  <br />
                  pet
                </strong>
                <small className="font-['Poppins'] text-[13px] font-light text-[#2c3e50]/75">
                  Ajude a localizar o tutor
                </small>
              </span>
            </span>
            <ChevronRightIcon className="h-7 w-7 text-[#2c3e50]/60" />
          </button>
        </nav>

        {/* Safety section */}
        <section
          className="mt-6 rounded-[14px] bg-slate-200 p-4"
          aria-label="Informação de segurança"
        >
          <div className="flex gap-3">
            <ShieldIcon
              className="mt-1.5 h-7 w-7 shrink-0 text-[#2a7b9b]"
              strokeWidth={2}
            />
            <div>
              <h2 className="font-['Poppins'] text-[14px] font-bold text-[#2a7b9b]">
                Sua segurança primeiro
              </h2>
              <p className="mt-1 font-['Poppins'] text-[12.5px] font-light leading-[19px] text-[#617775]">
                Endereços e telefones nunca
                <br />
                são exibidos publicamente.
              </p>
              <button
                type="button"
                className="mt-2 cursor-pointer font-['Poppins'] text-[12.5px] font-bold text-[#2a7b9b] transition-colors hover:text-[#1a5a75]"
              >
                Saiba mais
              </button>
            </div>
          </div>
        </section>
      </aside>

      {/* Header */}
      <header className="fixed left-[320px] right-0 top-0 z-20 flex h-[72px] items-center justify-end gap-8 border-b border-[#e5e5e5] bg-white px-10">
        <button
          type="button"
          onClick={() => onNavigate("explorar")}
          className={`flex cursor-pointer items-center gap-2 font-['Poppins'] text-[18px] transition-colors ${
            currentPage === "explorar"
              ? "font-semibold text-[#2a7b9b]"
              : "text-[#2c3e50] hover:text-[#2a7b9b]"
          }`}
        >
          <HomeIcon className="h-4 w-4" />
          Explorar
        </button>
        <button
          type="button"
          onClick={() => onNavigate("meus-casos")}
          className={`flex cursor-pointer items-center gap-2 font-['Poppins'] text-[18px] transition-colors ${
            currentPage === "meus-cos"
              ? "font-semibold text-[#2a7b9b]"
              : "text-[#2c3e50] hover:text-[#2a7b9b]"
          }`}
        >
          <MenuIcon className="h-4 w-4" />
          Meus casos
        </button>
        <button
          type="button"
          onClick={() => onNavigate("perfil")}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all hover:scale-105 active:scale-95 ${
            currentPage === "perfil"
              ? "border-[#2a7b9b] bg-[#2a7b9b]/10"
              : "border-[#2a7b9b]/30 bg-[#f7f7f2] hover:border-[#2a7b9b] hover:bg-[#2a7b9b]/10"
          }`}
        >
          <UserIcon className="h-5 w-5 text-[#2a7b9b]" strokeWidth={2} />
        </button>
      </header>

      <section className="ml-[320px] min-h-screen px-[82px] pb-12 pt-[94px]">
        <div className="mx-auto max-w-[1366px]">{children}</div>
      </section>
    </main>
  );
}
