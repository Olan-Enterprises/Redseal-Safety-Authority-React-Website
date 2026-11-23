import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

function SelectTrigger({ children, ...properties }) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-xl border border-neutral-300 bg-white px-3 text-left text-base text-neutral-950 shadow-xs outline-none transition-[border-color,box-shadow] focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/25 aria-invalid:border-red-600 data-[placeholder]:text-neutral-500 [&>span:first-child]:truncate"
            {...properties}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="size-4 shrink-0 text-neutral-600" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({ children }) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                position="popper"
                align="start"
                sideOffset={6}
                className="z-50 max-h-(--radix-select-content-available-height) w-(--radix-select-trigger-width) overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-xl"
            >
                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
                    <ChevronUp className="size-4" />
                </SelectPrimitive.ScrollUpButton>
                <SelectPrimitive.Viewport className="p-1">
                    {children}
                </SelectPrimitive.Viewport>
                <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
                    <ChevronDown className="size-4" />
                </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectItem({ children, ...properties }) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className="relative flex min-h-10 cursor-default items-center rounded-lg py-2 pr-8 pl-3 text-sm outline-hidden select-none data-highlighted:bg-red-50 data-highlighted:text-red-900 data-disabled:opacity-50"
            {...properties}
        >
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center">
                <Check className="size-4 text-red-600" />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
}

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
