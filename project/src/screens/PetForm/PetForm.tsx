import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CameraIcon,
  MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { supabase } from "../../lib/supabase";
import {
  type PetFormData,
  type PetFormMode,
  CHARACTERISTICS,
  EMPTY_FORM,
} from "../../lib/types";

type PetFormProps = {
  mode: PetFormMode;
  onBack: () => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function PetForm({ mode, onBack }: PetFormProps) {
  const isLost = mode === "perdido";
  const title = isLost ? "Registrar animal perdido" : "Registrar animal encontrado";
  const subtitle = isLost
    ? "Ajude seu pet a voltar para casa. Preencha todos os campos abaixo."
    : "Ajude a localizar o tutor. Preencha todos os campos abaixo.";
  const submitLabel = isLost ? "Publicar alerta" : "Publicar registro";

  const [reviewed, setReviewed] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [formData, setFormData] = useState<PetFormData>({ ...EMPTY_FORM });

  const updateField = (key: keyof PetFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!formData.photo_url.trim()) errors.push("Foto do animal");
    if (!formData.species.trim()) errors.push("Espécie");
    if (!formData.size.trim()) errors.push("Porte");
    if (!formData.color.trim()) errors.push("Cor");
    if (!formData.marks.trim()) errors.push("Marcas");
    if (!formData.breed.trim()) errors.push("Raça");
    if (isLost && !formData.animal_name.trim()) errors.push("Nome do animal");
    if (!formData.region.trim()) errors.push("Região aproximada");
    if (!formData.address.trim()) errors.push("Endereço");
    if (!formData.lost_date.trim()) errors.push("Data");
    if (!formData.lost_time.trim()) errors.push("Hora");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setSubmitState("error");
      setErrorMessage("Preencha todos os campos antes de publicar.");
      return;
    }

    setSubmitState("submitting");
    setErrorMessage("");
    setValidationErrors([]);

    try {
      const { error } = await supabase.from("lost_pets").insert({
        photo_url: formData.photo_url.trim() || null,
        species: formData.species.trim() || null,
        size: formData.size.trim() || null,
        color: formData.color.trim() || null,
        marks: formData.marks.trim() || null,
        breed: formData.breed.trim() || null,
        animal_name: isLost ? formData.animal_name.trim() || null : null,
        region: formData.region.trim() || null,
        address: formData.address.trim() || null,
        lost_date: formData.lost_date.trim() || null,
        lost_time: formData.lost_time.trim() || null,
        status: mode,
      });

      if (error) throw error;

      setSubmitState("success");
      setReviewed(false);
      setFormData({ ...EMPTY_FORM });
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Erro ao salvar o registro.",
      );
    }
  };

  const fieldHasError = (fieldName: string) => validationErrors.includes(fieldName);

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex cursor-pointer items-center gap-2 font-['Poppins'] text-[15px] font-medium text-[#2a7b9b] transition-colors hover:text-[#1a5a75]"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar
      </button>

      <header className="mb-8">
        <p className="font-['Poppins'] text-[13.6px] font-black tracking-[1.76px] text-[#f28e2b]">
          COMUNIDADE DE LAVRAS, MG
        </p>
        <p className="mt-3 font-['Poppins'] text-[18px] font-medium">
          <span className="text-[#ffd166]">Preencher</span>
          <span className="text-[#2a7b9b]">
            {" "}
            &nbsp;&nbsp;|&nbsp;&nbsp; Revisar&nbsp;&nbsp; |&nbsp;&nbsp;
            Publicar
          </span>
        </p>
        <h1 className="mt-7 font-['Poppins'] text-6xl font-extrabold leading-[59px] tracking-[-0.98px]">
          {title}
        </h1>
        <p className="mt-5 font-['Poppins'] text-[19.7px] font-light leading-[29.6px]">
          {subtitle}
        </p>
      </header>

      <div className="grid grid-cols-[736px_615px] gap-7">
        {/* Photo & characteristics card */}
        <Card className="h-[570px] rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b]">
          <CardContent className="relative h-full p-8">
            <h2 className="font-['Poppins'] text-[18px] font-medium text-[#2a7b9b]">
              Foto do animal *
            </h2>
            <div className="absolute left-8 top-[77px] flex h-[150px] w-[190px] items-center justify-center overflow-hidden rounded-[11px] bg-slate-100">
              <CameraIcon className="h-12 w-12 text-slate-400" strokeWidth={1.5} />
            </div>
            <div className="absolute left-[246px] top-20 w-[458px]">
              <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                Arquivo da foto
              </label>
              <Input
                className={`h-10 ${fieldHasError("Foto do animal") ? "border-2 border-red-400" : ""}`}
                placeholder="selecione uma foto"
                value={formData.photo_url}
                onChange={(e) => updateField("photo_url", e.target.value)}
              />
              <p className="mt-3 font-['Poppins'] text-sm leading-normal text-[#617775]">
                Prefira a foto mais recente. Foto nítida, sem pessoas ou
                dados pessoais. JPG ou PNG, até 10 MB.
              </p>
            </div>
            <h2 className="absolute left-8 top-[249px] font-['Poppins'] text-[18px] font-medium text-[#2a7b9b]">
              Características do animal
            </h2>
            <p className="absolute left-8 top-[284px] font-['Poppins'] text-sm text-[#617775]">
              Selecione as características que ajudam a reconhecer seu pet.
            </p>
            <div className="absolute left-8 top-[321px] flex flex-wrap gap-3">
              {CHARACTERISTICS.map((item) =>
                item.options.length > 0 ? (
                  <Select
                    key={item.label}
                    value={formData[item.key]}
                    onValueChange={(val) => updateField(item.key, val)}
                  >
                    <SelectTrigger
                      className={`${item.width} h-10 cursor-pointer rounded-[12px] border-0 bg-slate-200 px-3.5 ${fieldHasError(item.label.replace(":", "")) ? "ring-2 ring-red-400" : ""}`}
                    >
                      <SelectValue placeholder={item.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="cursor-pointer"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    key={item.label}
                    className={`${item.width} h-10 rounded-[12px] border-0 bg-slate-200 px-3.5 ${fieldHasError(item.label.replace(":", "")) ? "border-2 border-red-400" : ""}`}
                    placeholder={item.label}
                    value={formData[item.key]}
                    onChange={(e) => updateField(item.key, e.target.value)}
                  />
                ),
              )}
            </div>
            {isLost && (
              <div className="absolute left-8 top-[443px] w-[672px]">
                <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                  Nome do animal *
                </label>
                <Input
                  className={`h-10 ${fieldHasError("Nome do animal") ? "border-2 border-red-400" : ""}`}
                  placeholder="Informe o nome do animal"
                  value={formData.animal_name}
                  onChange={(e) => updateField("animal_name", e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location & date card */}
        <Card className="h-[570px] rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b]">
          <CardContent className="relative h-full p-8">
            <h2 className="font-['Poppins'] text-[18px] font-medium text-[#2a7b9b]">
              {isLost
                ? "Onde seu animal desapareceu? *"
                : "Onde o animal foi encontrado? *"}
            </h2>

            {/* Region field */}
            <div className="absolute left-8 top-[70px] w-[551px]">
              <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                Região aproximada *
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  className={`h-10 pl-10 ${fieldHasError("Região aproximada") ? "border-2 border-red-400" : ""}`}
                  placeholder="Ex: Centro, Lavras MG"
                  value={formData.region}
                  onChange={(e) => updateField("region", e.target.value)}
                />
              </div>
              <p className="mt-2 font-['Poppins'] text-sm text-[#617775]">
                Mostramos só uma região aproximada publicamente.
              </p>
            </div>

            {/* Address field */}
            <div className="absolute left-8 top-[200px] w-[551px]">
              <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                Endereço *
              </label>
              <Input
                className={`h-10 ${fieldHasError("Endereço") ? "border-2 border-red-400" : ""}`}
                placeholder="Ex: Rua das Flores, 123"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
              <p className="mt-2 flex items-start gap-1.5 font-['Poppins'] text-sm text-[#617775]">
                <MapPinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2a7b9b]" />
                <span>
                  Seu endereço completo fica oculto. Apenas a região aproximada
                  é exibida publicamente.
                </span>
              </p>
            </div>

            {/* Date & time */}
            <div className="absolute left-8 top-[370px] w-[316px]">
              <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                {isLost ? "Data do desaparecimento *" : "Data do encontro *"}
              </label>
              <Input
                className={`h-10 ${fieldHasError("Data") ? "border-2 border-red-400" : ""}`}
                value={formData.lost_date}
                onChange={(e) => updateField("lost_date", e.target.value)}
              />
            </div>
            <div className="absolute left-[364px] top-[370px] w-[219px]">
              <label className="mb-2 block font-['Poppins'] text-sm font-medium">
                Hora *
              </label>
              <Input
                className={`h-10 ${fieldHasError("Hora") ? "border-2 border-red-400" : ""}`}
                value={formData.lost_time}
                onChange={(e) => updateField("lost_time", e.target.value)}
              />
            </div>
            <p className="absolute left-8 top-[460px] font-['Poppins'] text-[12.5px] text-[#617775]">
              Data e hora preenchidas automaticamente. Você pode editar.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Validation error summary */}
      {validationErrors.length > 0 && (
        <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-red-50 p-4">
          <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="font-['Poppins'] text-[14px] font-semibold text-red-600">
              Campos obrigatórios não preenchidos:
            </p>
            <p className="mt-1 font-['Poppins'] text-[13px] text-red-500">
              {validationErrors.join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Footer action bar */}
      <Card className="mt-6 h-28 rounded-[20px] border-0 bg-white shadow-[0px_4px_10px_#0000002b]">
        <CardContent className="flex h-full items-center justify-between px-8">
          <div>
            <p className="font-['Poppins'] text-[14px] font-medium text-[#2a7b9b]">
              Contato: chat do app por padrão. Seu telefone fica oculto.
            </p>
            <p className="mt-2 whitespace-pre-line font-['Poppins'] text-sm text-[#617775]">
              • Confirme os sinais do pet antes de combinar o reencontro.{"\n"}
              • Combine o reencontro em um local público e seguro.
            </p>
            {submitState === "success" && (
              <p className="mt-2 font-['Poppins'] text-[13px] font-semibold text-green-600">
                Registro publicado com sucesso!
              </p>
            )}
            {submitState === "error" && validationErrors.length === 0 && (
              <p className="mt-2 font-['Poppins'] text-[13px] font-semibold text-red-600">
                {errorMessage || "Erro ao publicar o registro."}
              </p>
            )}
          </div>
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={onBack}
              className="flex cursor-pointer items-center gap-1 font-['Poppins'] text-[13px] font-semibold text-[#2a7b9b] transition-colors hover:text-[#1a5a75]"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Voltar
            </button>
            <Button
              type="button"
              className="h-auto cursor-pointer rounded-[10px] bg-[#f28e2b] px-[18px] py-1.5 font-['Poppins'] text-[28px] font-normal leading-[42px] text-white transition-all hover:bg-[#df7d20] hover:shadow-lg disabled:opacity-60"
              disabled={submitState === "submitting"}
              onClick={() => {
                if (reviewed) {
                  void handleSubmit();
                } else {
                  setReviewed(true);
                }
              }}
            >
              {submitState === "submitting"
                ? "Publicando..."
                : reviewed
                  ? submitLabel
                  : "Revisar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
