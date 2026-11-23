import { useId, useRef, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { WhatsAppIcon } from "./WhatsAppFloatingWidget";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import { contactServiceOptions, redsealContactDetails } from "../contactDetails";

const contactFields = [
    {
        name: "firstName",
        label: "First name",
        autoComplete: "given-name"
    },
    {
        name: "surname",
        label: "Surname",
        autoComplete: "family-name"
    },
    {
        name: "phone",
        label: "Phone number",
        type: "tel",
        autoComplete: "tel"
    },
    {
        name: "email",
        label: "Email address",
        type: "email",
        autoComplete: "email"
    }
];

function ContactForm() {
    const formId = useId();
    const serviceTriggerReference = useRef(null);
    const [selectedService, setSelectedService] = useState("");
    const [hasServiceError, setHasServiceError] = useState(false);

    const handleServiceChange = (service) => {
        // Stores the selected service and clears its validation error.
        // Parameters: service (string) - The service selected in the dropdown.
        // Returns: undefined.
        // Example return: undefined.

        setSelectedService(service);
        setHasServiceError(false);
    };

    const handleSubmit = (event) => {
        // Opens WhatsApp with a structured enquiry containing all populated form fields.
        // Parameters: event (React.FormEvent) - The enquiry form's submit event.
        // Returns: undefined.
        // Example return: undefined.

        event.preventDefault();

        if(!selectedService) {
            setHasServiceError(true);
            serviceTriggerReference.current.focus();
            return;
        }

        const formData = new FormData(event.currentTarget);
        const firstName = formData.get("firstName").trim();
        const surname = formData.get("surname").trim();
        const phone = formData.get("phone").trim();
        const email = formData.get("email").trim();
        const message = formData.get("message").trim();
        const enquiry = [
            "*Redseal Safety Authority enquiry*",
            "",
            `*Name:* ${firstName} ${surname}`,
            `*Phone:* ${phone}`,
            `*Email:* ${email}`,
            `*Service:* ${selectedService}`,
            "",
            "*Message:*",
            message
        ].join("\n");

        window.open(`${redsealContactDetails.whatsappLink}?text=${encodeURIComponent(enquiry)}`, "_blank", "noopener,noreferrer");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-0 rounded-3xl border border-neutral-200 bg-white p-5 shadow-lg shadow-neutral-950/5 sm:p-8"
        >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                Send an enquiry
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                We’ll prepare your message for you to review and send in WhatsApp.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {
                    contactFields.map(field => (
                        <div
                            key={field.name}
                            className="min-w-0 space-y-1.5"
                        >
                            <label
                                htmlFor={`${formId}-${field.name}`}
                                className="block text-sm font-semibold text-neutral-800"
                            >
                                {field.label}
                            </label>
                            <Input
                                id={`${formId}-${field.name}`}
                                name={field.name}
                                type={field.type}
                                autoComplete={field.autoComplete}
                                title={field.label}
                                pattern={field.type === "email" ? undefined : ".*\\S.*"}
                                required
                            />
                        </div>
                    ))
                }
                <div className="min-w-0 space-y-1.5 sm:col-span-2">
                    <label
                        htmlFor={`${formId}-service`}
                        className="block text-sm font-semibold text-neutral-800"
                    >
                        Service of interest
                    </label>
                    <Select
                        value={selectedService}
                        onValueChange={handleServiceChange}
                    >
                        <SelectTrigger
                            id={`${formId}-service`}
                            ref={serviceTriggerReference}
                            title="Select a Redseal service"
                            aria-required="true"
                            aria-invalid={hasServiceError}
                            aria-describedby={hasServiceError ? `${formId}-service-error` : undefined}
                        >
                            <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                contactServiceOptions.map(service => (
                                    <SelectItem
                                        key={service}
                                        value={service}
                                    >
                                        {service}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    {
                        hasServiceError &&
                        (
                            <p
                                id={`${formId}-service-error`}
                                role="alert"
                                className="text-sm text-red-700"
                            >
                                Choose a service to continue.
                            </p>
                        )
                    }
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                    <label
                        htmlFor={`${formId}-message`}
                        className="block text-sm font-semibold text-neutral-800"
                    >
                        Message
                    </label>
                    <Textarea
                        id={`${formId}-message`}
                        name="message"
                        title="Enter your enquiry"
                        placeholder="Tell us about your team, training needs, or preferred dates."
                        rows={4}
                        required
                    />
                </div>
                <div className="mt-1 sm:col-span-2">
                    <Button
                        type="submit"
                        title="Open your enquiry in WhatsApp"
                    >
                        <WhatsAppIcon />
                        Continue to WhatsApp
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
