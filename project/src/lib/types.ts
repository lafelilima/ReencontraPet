export type PetStatus = "perdido" | "encontrado" | "reencontrado";

export type PetFormMode = "perdido" | "encontrado";

export type Page = "formulario" | "explorar" | "meus-casos" | "perfil";

export type PetRecord = {
  id: string;
  photo_url: string | null;
  species: string | null;
  size: string | null;
  color: string | null;
  marks: string | null;
  breed: string | null;
  animal_name: string | null;
  region: string | null;
  address: string | null;
  lost_date: string | null;
  lost_time: string | null;
  status: PetStatus;
  created_at: string;
};

export type PetFormData = {
  photo_url: string;
  species: string;
  size: string;
  color: string;
  marks: string;
  breed: string;
  animal_name: string;
  region: string;
  address: string;
  lost_date: string;
  lost_time: string;
};

export const EMPTY_FORM: PetFormData = {
  photo_url: "",
  species: "",
  size: "",
  color: "",
  marks: "",
  breed: "",
  animal_name: "",
  region: "",
  address: "",
  lost_date: new Date().toLocaleDateString("pt-BR"),
  lost_time: new Date().toTimeString().slice(0, 5),
};

export const STATUS_LABELS: Record<PetStatus, string> = {
  perdido: "Perdido",
  encontrado: "Encontrado",
  reencontrado: "Reencontrado",
};

export const STATUS_COLORS: Record<PetStatus, string> = {
  perdido: "bg-[#e74c3c] text-white",
  encontrado: "bg-[#2a7b9b] text-white",
  reencontrado: "bg-green-600 text-white",
};

export const SPECIES_OPTIONS = [
  { label: "Cachorro", value: "Cachorro" },
  { label: "Gato", value: "Gato" },
  { label: "Pássaro", value: "Pássaro" },
  { label: "Coelho", value: "Coelho" },
  { label: "Outro", value: "Outro" },
];

export const SIZE_OPTIONS = [
  { label: "Pequeno", value: "Pequeno" },
  { label: "Médio", value: "Médio" },
  { label: "Grande", value: "Grande" },
];

export const CHARACTERISTICS: {
  label: string;
  width: string;
  key: keyof PetFormData;
  options: { label: string; value: string }[];
}[] = [
  { label: "Espécie:", width: "w-[196px]", key: "species", options: SPECIES_OPTIONS },
  { label: "Porte:", width: "w-[170px]", key: "size", options: SIZE_OPTIONS },
  { label: "Cor:", width: "w-[250px]", key: "color", options: [] },
  { label: "Marcas:", width: "w-[275px]", key: "marks", options: [] },
  { label: "Raça:", width: "w-[275px]", key: "breed", options: [] },
];
