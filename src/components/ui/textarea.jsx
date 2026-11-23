function Textarea(properties) {
    return (
        <textarea
            data-slot="textarea"
            className="min-h-28 w-full resize-y rounded-xl border border-neutral-300 bg-white px-3 py-3 text-base text-neutral-950 shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-neutral-500 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/25 disabled:opacity-50"
            {...properties}
        />
    );
}

export { Textarea };
