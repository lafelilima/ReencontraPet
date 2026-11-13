import {
  CheckCircleIcon,
  PawPrintIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { supabase } from "../../lib/supabase";
import {
  type PetRecord,
  type PetStatus,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../lib/types";

export function MeusCasos() {
  const [pets, setPets] = useState<PetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    void fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("lost_pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError("Erro ao carregar seus registros.");
    } else {
      setPets((data as PetRecord[]) ?? []);
    }
    setLoading(false);
  };

  const handleMarkReunited = async (id: string) => {
    setActionError("");
    const { error: err } = await supabase
      .from("lost_pets")
      .update({ status: "reencontrado" })
      .eq("id", id);

    if (err) {
      setActionError("Erro ao atualizar o registro.");
      return;
    }

    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "reencontrado" } : p)),
    );
  };

  const handleDelete = async (id: string) => {
    setActionError("");
    const { error: err } = await supabase
      .from("lost_pets")
      .delete()
      .eq("id", id);

    if (err) {
      setActionError("Erro ao excluir o registro.");
      return;
    }

    setPets((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="font-['Poppins'] text-6xl font-extrabold leading-[59px] tracking-[-0.98px]">
          Meus casos
        </h1>
        <p className="mt-5 font-['Poppins'] text-[19.7px] font-light leading-[29.6px] text-[#617775]">
          Acompanhe e gerencie os registros que você publicou.
        </p>
      </header>

      {actionError && (
        <div className="mb-4 rounded-[12px] bg-red-50 p-4">
          <p className="font-['Poppins'] text-[14px] font-medium text-red-600">
            {actionError}
          </p>
        </div>
      )}

      {loading && (
        <div className="flex h-64 items-center justify-center">
          <p className="font-['Poppins'] text-[18px] text-[#617775]">Carregando...</p>
        </div>
      )}

      {error && (
        <div className="flex h-64 items-center justify-center">
          <p className="font-['Poppins'] text-[18px] text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && pets.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <PawPrintIcon className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
          <p className="font-['Poppins'] text-[18px] text-[#617775]">
            Você ainda não publicou nenhum registro.
          </p>
        </div>
      )}

      {!loading && !error && pets.length > 0 && (
        <div className="space-y-4">
          {pets.map((pet) => {
            const isReunited = pet.status === "reencontrado";
            return (
              <Card
                key={pet.id}
                className="overflow-hidden rounded-[16px] border-0 bg-white shadow-[0px_4px_10px_#0000002b] transition-all hover:shadow-lg"
              >
                <CardContent className="flex items-center gap-6 p-5">
                  <div className="h-[100px] w-[130px] shrink-0 overflow-hidden rounded-[12px] bg-slate-100">
                    {pet.photo_url ? (
                      <img
                        src={pet.photo_url}
                        alt={pet.animal_name ?? "Animal"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <PawPrintIcon className="h-8 w-8 text-slate-300" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-['Poppins'] text-[22px] font-bold text-[#2c3e50]">
                        {pet.animal_name ?? "Sem nome"}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 font-['Poppins'] text-[12px] font-semibold ${STATUS_COLORS[pet.status as PetStatus]}`}
                      >
                        {STATUS_LABELS[pet.status as PetStatus]}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-5 font-['Poppins'] text-[14px] text-[#617775]">
                      {pet.species && <span>Espécie: {pet.species}</span>}
                      {pet.breed && <span>Raça: {pet.breed}</span>}
                      {pet.region && <span>Região: {pet.region}</span>}
                      {pet.address && <span>Endereço: {pet.address}</span>}
                      {pet.lost_date && <span>Data: {pet.lost_date}</span>}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <Button
                      type="button"
                      disabled={isReunited}
                      onClick={() => void handleMarkReunited(pet.id)}
                      className={`h-10 cursor-pointer rounded-[10px] px-4 font-['Poppins'] text-[14px] font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                        isReunited
                          ? "bg-green-100 text-green-700"
                          : "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
                      }`}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      {isReunited ? "Reencontrado" : "Marcar reencontrado"}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => void handleDelete(pet.id)}
                      className="h-10 cursor-pointer rounded-[10px] bg-red-500 px-4 font-['Poppins'] text-[14px] font-medium text-white transition-all hover:bg-red-600 hover:shadow-md"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
