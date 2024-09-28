"use client";

import React, { ReactNode, useState } from "react";
import * as z from "zod";
import { FormDataSchema } from "@/lib/validations";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRightIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";

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

  const form = useForm<FormInputs>({
    resolver: zodResolver(FormDataSchema),
  });

  return (
    <div className="absolute inset-0 flex flex-col p-24 space-y-14">
      <div className="space-y-4 md:flex md:space-x-8 md:space-y-0">
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
                <span className="text-sm font-medium">{step.name}</span>
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

      <Form {...form}>
        <form onSubmit={() => {}}>
          {currStep === 0 && (
            <AnimatedFormStep diff={diff}>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide your personal details.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="johndoe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AnimatedFormStep>
          )}
          {currStep === 1 && (
            <AnimatedFormStep diff={diff}>XD2</AnimatedFormStep>
          )}
          {currStep === 2 && (
            <AnimatedFormStep diff={diff}>XD3</AnimatedFormStep>
          )}

          <div className="mt-8 pt-5">
            <div className="flex justify-end space-x-2">
              {currStep !== 0 && <Button variant="outline">Previous</Button>}
              {currStep !== formSteps.length - 1 && (
                <Button>
                  Next
                  <ArrowRightIcon className="ml-1" />
                </Button>
              )}

              {currStep === formSteps.length - 1 && (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

const AnimatedFormStep = ({
  diff,
  children,
}: {
  diff: number;
  children: ReactNode;
}) => {
  return (
    <motion.div
      initial={{ x: diff >= 0 ? "50%" : "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
