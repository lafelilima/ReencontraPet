import {
  BellIcon,
  HelpCircleIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

export function Perfil() {
  return (
    <>
      <header className="mb-8">
        <h1 className="font-['Poppins'] text-6xl font-extrabold leading-[59px] tracking-[-0.98px]">
          Perfil
        </h1>
        <p className="mt-5 font-['Poppins'] text-[19.7px] font-light leading-[29.6px] text-[#617775]">
          Gerencie suas informações e configurações da conta.
        </p>
      </header>

      {/* Profile card */}
      <Card className="mb-6 rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b]">
        <CardContent className="flex items-center gap-6 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2a7b9b]/30 bg-[#f7f7f2]">
            <UserIcon className="h-10 w-10 text-[#2a7b9b]" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-['Poppins'] text-[28px] font-bold text-[#2c3e50]">
              Visitante
            </h2>
            <p className="mt-1 font-['Poppins'] text-[15px] text-[#617775]">
              Você está usando o ReencontraPet como visitante.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Settings list */}
      <Card className="rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b]">
        <CardContent className="p-2">
          <h3 className="px-6 pb-2 pt-4 font-['Poppins'] text-[16px] font-bold text-[#2a7b9b]">
            Configurações
          </h3>
          <div className="divide-y divide-slate-100">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <SettingsIcon className="h-5 w-5 text-[#2a7b9b]" />
              <div className="flex-1">
                <p className="font-['Poppins'] text-[15px] font-medium text-[#2c3e50]">
                  Preferências da conta
                </p>
                <p className="font-['Poppins'] text-[13px] text-[#617775]">
                  Idioma, região e exibição
                </p>
              </div>
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <BellIcon className="h-5 w-5 text-[#2a7b9b]" />
              <div className="flex-1">
                <p className="font-['Poppins'] text-[15px] font-medium text-[#2c3e50]">
                  Notificações
                </p>
                <p className="font-['Poppins'] text-[13px] text-[#617775]">
                  Alertas de pets próximos e atualizações
                </p>
              </div>
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <ShieldIcon className="h-5 w-5 text-[#2a7b9b]" />
              <div className="flex-1">
                <p className="font-['Poppins'] text-[15px] font-medium text-[#2c3e50]">
                  Privacidade e segurança
                </p>
                <p className="font-['Poppins'] text-[13px] text-[#617775]">
                  Como seus dados são protegidos
                </p>
              </div>
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <HelpCircleIcon className="h-5 w-5 text-[#2a7b9b]" />
              <div className="flex-1">
                <p className="font-['Poppins'] text-[15px] font-medium text-[#2c3e50]">
                  Ajuda e suporte
                </p>
                <p className="font-['Poppins'] text-[13px] text-[#617775]">
                  Dúvidas frequentes e contato
                </p>
              </div>
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-red-50"
            >
              <LogOutIcon className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="font-['Poppins'] text-[15px] font-medium text-red-500">
                  Sair da conta
                </p>
                <p className="font-['Poppins'] text-[13px] text-[#9aa9a8]">
                  Encerrar sessão no dispositivo
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      <p className="mt-6 text-center font-['Poppins'] text-[13px] text-[#9aa9a8]">
        ReencontraPet — Lavras, MG · v1.0
      </p>
    </>
  );
}
