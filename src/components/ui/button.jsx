function Button({ type = "button", ...properties }) {
    return (
        <button
            type={type}
            data-slot="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:pointer-events-none disabled:opacity-50"
            {...properties}
        />
    );
}

export { Button };
