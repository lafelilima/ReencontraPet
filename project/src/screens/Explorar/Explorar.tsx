import { SearchIcon, MapPinIcon, MessageCircleIcon, PawPrintIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { supabase } from "../../lib/supabase";
import {
  type PetRecord,
  type PetStatus,
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../lib/types";

type FilterStatus = "todos" | PetStatus;

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "Todos", value: "todos" },
  { label: "Perdidos", value: "perdido" },
  { label: "Encontrados", value: "encontrado" },
  { label: "Reencontrados", value: "reencontrado" },
];

export function Explorar() {
  const [pets, setPets] = useState<PetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("todos");
  const [search, setSearch] = useState("");
  const [contactPet, setContactPet] = useState<PetRecord | null>(null);

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
      setError("Erro ao carregar registros.");
    } else {
      setPets((data as PetRecord[]) ?? []);
    }
    setLoading(false);
  };

  const filteredPets = pets.filter((pet) => {
    const matchesFilter = filter === "todos" || pet.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      [pet.animal_name, pet.species, pet.breed, pet.region, pet.color]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <header className="mb-8">
        <h1 className="font-['Poppins'] text-6xl font-extrabold leading-[59px] tracking-[-0.98px]">
          Explorar pets
        </h1>
        <p className="mt-5 font-['Poppins'] text-[19.7px] font-light leading-[29.6px] text-[#617775]">
          Veja todos os animais perdidos e encontrados na comunidade de Lavras, MG.
        </p>
      </header>

      {/* Search + filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative w-[340px]">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-11 rounded-[12px] border-0 bg-white pl-10 shadow-sm"
            placeholder="Buscar por nome, espécie, raça, região..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`cursor-pointer rounded-full px-4 py-2 font-['Poppins'] text-[14px] font-medium transition-all ${
                filter === f.value
                  ? "bg-[#2a7b9b] text-white shadow-md"
                  : "bg-white text-[#2c3e50] shadow-sm hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
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

      {!loading && !error && filteredPets.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <PawPrintIcon className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
          <p className="font-['Poppins'] text-[18px] text-[#617775]">
            Nenhum registro encontrado.
          </p>
        </div>
      )}

      {!loading && !error && filteredPets.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card
              key={pet.id}
              className="overflow-hidden rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b] transition-all hover:shadow-lg"
            >
              <div className="relative h-[200px] w-full overflow-hidden bg-slate-100">
                {pet.photo_url ? (
                  <img
                    src={pet.photo_url}
                    alt={pet.animal_name ?? "Animal"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <PawPrintIcon className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
                  </div>
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 font-['Poppins'] text-[12px] font-semibold ${STATUS_COLORS[pet.status as PetStatus]}`}
                >
                  {STATUS_LABELS[pet.status as PetStatus]}
                </span>
              </div>
              <CardContent className="p-5">
                <h3 className="font-['Poppins'] text-[20px] font-bold text-[#2c3e50]">
                  {pet.animal_name ?? "Sem nome"}
                </h3>
                <div className="mt-2 space-y-1 font-['Poppins'] text-[14px] text-[#617775]">
                  {pet.species && <p>Espécie: {pet.species}</p>}
                  {pet.breed && <p>Raça: {pet.breed}</p>}
                  {pet.color && <p>Cor: {pet.color}</p>}
                  {pet.size && <p>Porte: {pet.size}</p>}
                </div>
                <div className="mt-3 flex items-center gap-1.5 font-['Poppins'] text-[13px] text-[#2a7b9b]">
                  <MapPinIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{pet.region ?? "Região não informada"}</span>
                </div>
                <p className="mt-1 font-['Poppins'] text-[12px] text-[#9aa9a8]">
                  {pet.lost_date ?? "Data não informada"}
                  {pet.lost_time ? ` às ${pet.lost_time}` : ""}
                </p>
                <Button
                  type="button"
                  onClick={() => setContactPet(pet)}
                  className="mt-4 h-10 w-full cursor-pointer rounded-[10px] bg-[#2a7b9b] font-['Poppins'] text-[14px] font-medium text-white transition-all hover:bg-[#236b87] hover:shadow-md"
                >
                  <MessageCircleIcon className="h-4 w-4" />
                  Entrar em contato
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Contact modal */}
      {contactPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setContactPet(null)}
        >
          <div
            className="w-[440px] rounded-[20px] bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Poppins'] text-[24px] font-bold text-[#2c3e50]">
              Entrar em contato
            </h3>
            <p className="mt-3 font-['Poppins'] text-[15px] text-[#617775]">
              Sobre: <strong className="text-[#2c3e50]">{contactPet.animal_name ?? "Animal sem nome"}</strong>
              {contactPet.species && ` — ${contactPet.species}`}
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[12px] bg-[#f7f7f2] p-4">
                <p className="font-['Poppins'] text-[14px] font-medium text-[#2a7b9b]">
                  Chat do app
                </p>
                <p className="mt-1 font-['Poppins'] text-[13px] text-[#617775]">
                  O contato é feito pelo chat do app. Seu telefone e endereço
                  permanecem ocultos.
                </p>
              </div>
              <Button
                type="button"
                className="h-11 w-full cursor-pointer rounded-[10px] bg-[#f28e2b] font-['Poppins'] text-[16px] font-medium text-white transition-all hover:bg-[#df7d20] hover:shadow-md"
                onClick={() => setContactPet(null)}
              >
                Iniciar conversa
              </Button>
              <button
                type="button"
                onClick={() => setContactPet(null)}
                className="w-full cursor-pointer font-['Poppins'] text-[14px] font-medium text-[#617775] transition-colors hover:text-[#2c3e50]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
