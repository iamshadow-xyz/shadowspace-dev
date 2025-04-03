"use client"

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "destructive";
}

export default function SubmitButton({
  text,
  icon,
  className,
  variant,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button variant={variant} className={`${className} cursor-pointer`} disabled={pending}>
        <div className="flex items-center gap-2">
          {pending && <Loader2 className="animate-spin" />}
          {icon}
          {text}
        </div>
      </Button>
    </div>
  );
}
