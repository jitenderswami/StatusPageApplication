import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <VisuallyHidden asChild>
        <DialogTitle>Modal</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto",
          "fixed sm:max-w-[425px]",
          // Mobile styles (default)
          "bottom-0 top-auto translate-y-0 rounded-b-none",
          // Desktop styles (sm and up)
          "sm:top-[50%] sm:bottom-auto sm:translate-y-[-50%] sm:rounded-lg"
        )}
      >
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
