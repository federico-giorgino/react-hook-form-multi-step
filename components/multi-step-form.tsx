"use client";

import React, { useState } from "react";
import * as z from "zod";
import { FormDataSchema } from "@/lib/validations";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormInputs = z.infer<typeof FormDataSchema>;

const formSteps = [
  {
    id: "1",
    name: "Personal Information",
    fields: ["firstName", "lastName", "email"],
  },
  {
    id: "2",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "3", name: "Complete" },
];

export default function MultiStepForm() {
  const [prevStep, setPrevStep] = useState(0);
  const [currStep, setCurrStep] = useState(0);

  const diff = currStep - prevStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(FormDataSchema),
  });
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-24">
      <nav aria-label="Progress">
        <div
          role="list"
          className="space-y-4 md:flex md:space-x-8 md:space-y-0"
        >
          {formSteps.map((step, index) => (
            <div key={step.name} className="md:flex-1">
              {currStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-bold text-primary transition-colors ">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-bold text-primary">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-bold">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
