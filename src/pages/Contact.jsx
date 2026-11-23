import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import TopNavigation from "../components/TopNavigation";
import WhatsAppFloatingWidget, { WhatsAppIcon } from "../components/WhatsAppFloatingWidget";

import { redsealContactDetails } from "../contactDetails";

function Contact() {
    const renderHeading = () => {
        // Introduces the contact page and its purpose.
        // Parameters: None.
        // Returns: JSX.Element.
        // Example return: <header>...</header>.

        return (
            <header className="mb-8 max-w-3xl sm:mb-12">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-600">
                    <span
                        aria-hidden="true"
                        className="h-0.5 w-6 rounded-full bg-red-500"
                    />
                    Contact Redseal
                </p>
                <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                    Let’s talk <strong className="shimmer-text-red">workplace safety.</strong>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
                    Book accredited training, request a quote, or speak to our team about safety and compliance for your workplace.
                </p>
            </header>
        );
    };

    const renderHeadquarters = () => {
        // Renders headquarters details, direct contact links, and an embedded map.
        // Parameters: None.
        // Returns: JSX.Element.
        // Example return: <section aria-labelledby="headquarters">...</section>.

        return (
            <section
                aria-labelledby="headquarters"
                className="min-w-0 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-lg shadow-neutral-950/5"
            >
                <div className="p-5 sm:p-8">
                    <h2
                        id="headquarters"
                        className="text-2xl font-bold tracking-tight text-neutral-950"
                    >
                        Redseal Headquarters
                    </h2>
                    <address className="mt-5 grid gap-5 text-sm text-neutral-700 not-italic">
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 size-5 shrink-0 text-red-600" />
                            <div>
                                <p className="font-semibold text-neutral-900">Visit us</p>
                                <p className="mt-1">{redsealContactDetails.address}</p>
                                <a
                                    href={redsealContactDetails.directionsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open directions to Redseal Headquarters in Google Maps"
                                    className="mt-1 inline-flex items-center gap-1 font-semibold text-red-700 underline-offset-4 hover:underline"
                                >
                                    Get directions
                                    <ArrowUpRight className="size-4" />
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="mt-0.5 size-5 shrink-0 text-red-600" />
                            <div>
                                <p className="font-semibold text-neutral-900">Call us</p>
                                <a
                                    href={redsealContactDetails.phoneLink}
                                    title="Call Redseal Headquarters"
                                    className="mt-1 inline-block underline-offset-4 hover:text-red-700 hover:underline"
                                >
                                    {redsealContactDetails.phone}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex size-5 shrink-0 items-center text-emerald-700">
                                <WhatsAppIcon />
                            </span>
                            <div>
                                <p className="font-semibold text-neutral-900">WhatsApp</p>
                                <a
                                    href={redsealContactDetails.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Chat with Redseal Headquarters on WhatsApp"
                                    className="mt-1 inline-block underline-offset-4 hover:text-emerald-700 hover:underline"
                                >
                                    {redsealContactDetails.phone}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="mt-0.5 size-5 shrink-0 text-red-600" />
                            <div className="min-w-0">
                                <p className="font-semibold text-neutral-900">Email us</p>
                                <ul className="mt-1 space-y-1">
                                    {
                                        redsealContactDetails.emails.map(email => (
                                            <li key={email}>
                                                <a
                                                    href={`mailto:${email}`}
                                                    title={`Email ${email}`}
                                                    className="break-all underline-offset-4 hover:text-red-700 hover:underline"
                                                >
                                                    {email}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="mt-0.5 size-5 shrink-0 text-red-600" />
                            <div>
                                <p className="font-semibold text-neutral-900">Office hours</p>
                                <p className="mt-1">{redsealContactDetails.hours}</p>
                                <p className="mt-1">Weekend training on request</p>
                            </div>
                        </div>
                    </address>
                </div>
                <iframe
                    src={redsealContactDetails.mapEmbed}
                    title="Map of Redseal Headquarters in Westville"
                    className="block h-64 w-full border-0 border-t border-neutral-200 bg-neutral-100"
                    loading="lazy"
                    allowFullScreen
                />
            </section>
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <TopNavigation />
            <main className="home-surface flex-1 bg-neutral-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {renderHeading()}
                    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-8">
                        <ContactForm />
                        {renderHeadquarters()}
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppFloatingWidget />
        </div>
    );
}

export default Contact;
