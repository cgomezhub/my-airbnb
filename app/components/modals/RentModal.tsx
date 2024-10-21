"use client";

import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";
import { FieldValues, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";

import { categories } from "../navbar/Categories";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");


  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Crear";
    }

    return "Siguiente";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Regresar";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Qué tipo de propiedad deseas publicar?"
        subtitle="Selecciona una categoría"
      />
      <div
        className="
      grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
              onClick={(category) => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Dónde está ubicada tu propiedad?"
          subtitle="Ingresa la dirección"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.lalng} />
      
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb tu casa"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      disabled={false}
    />
    // <div>

    // </div>
  );
};

export default RentModal;
