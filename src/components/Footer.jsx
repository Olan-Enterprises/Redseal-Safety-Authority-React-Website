import { useState } from "react";

const navigationLinks = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "About",
        href: "about"
    },
    {
        label: "Services",
        href: "/services"
    },
    {
        label: "Gallery",
        href: "gallery"
    },
    {
        label: "Contact",
        href: "contact"
    }
];
const companyAddressLines = [
    "1 Mottramdale Road",
    "Westwood Westvill",
    "3629"
];

function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState("");

    const renderHeaderSection = () => {
        // Renders the top footer section with the main call-to-action heading and the newsletter subscription pill

        return (
            <div className="flex flex-col items-start justify-between gap-8 pb-16 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Let's Build a <strong>Safer Workplace Together</strong>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
                        Together, we'll design and deliver accredited training and compliance solutions that perfectly match your industry, workforce, and regulatory standards. From concept to completion, we're here to bring your safety goals to life.
                    </p>
                </div>
                <form
                    onSubmit={event => {
                        event.preventDefault();

                        setNewsletterEmail("");
                    }}
                    className="flex w-full items-center rounded-full bg-white p-1.5 shadow-md sm:w-auto sm:min-w-[24rem]"
                >
                    <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={event => setNewsletterEmail(event.target.value)}
                        placeholder="Enter your Email"
                        title="Enter your email address to subscribe"
                        className="w-full flex-1 bg-transparent px-5 py-2.5 text-sm text-neutral-800 placeholder-neutral-700 outline-none"
                    />
                    <button
                        type="submit"
                        title="Subscribe to Redseal safety updates"
                        className="flex-shrink-0 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-black shadow-xs transition-colors hover:bg-red-700 active:scale-95"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        );
    };

    const renderMainColumns = () => {
        // Renders the four main footer columns including company branding, navigation, utility pages, and contact details

        return (
            <div className="flex flex-wrap gap-12 pt-12 border-t border-neutral-800/80">
                <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
                    <div>
                        <a
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <img
                                src="src/assets/RedSeal Logo.jpg"
                                alt="Redseal Logo"
                                className="h-12 w-12 object-contain rounded-full"
                            />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Redseal
                            </span>
                        </a>
                        <div className="flex gap-3 sm:gap-4 mt-2">
                            <div className="w-[0.15rem] flex-shrink-0 rounded-full bg-red-600 translate-y-[8px]" />
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
                                Revolutionising workplace safety with accredited training, expert compliance auditing, and specialised solutions to protect your workforce and create zero-harm environments.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Redseal on Instagram"
                            aria-label="Instagram"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-xs transition-colors hover:bg-red-700 active:scale-95"
                        >
                            <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0F0F0F"/><path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F"/><path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#0F0F0F"/></svg>
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Redseal on Facebook"
                            aria-label="Facebook"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xs transition-colors hover:bg-red-600 hover:text-white active:scale-95"
                        >
                            <svg width="20px" height="20px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-385.000000, -7399.000000)" fill="#000000"><g transform="translate(56.000000, 160.000000)"><path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"></path></g></g></g></svg>
                        </a>
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Redseal on X"
                            aria-label="X"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xs transition-colors hover:bg-red-600 hover:text-white active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px"><path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path></svg>
                        </a>
                        <a
                            href="https://wa.me/27842084966"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Redseal on WhatsApp"
                            aria-label="WhatsApp"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 shadow-xs transition-colors hover:bg-red-600 hover:text-white active:scale-95"
                        >
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#000000"></path> </g></svg>
                        </a>
                    </div>
                </div>
                <div className="lg:col-span-2 lg:col-start-7">
                    <h3 className="text-base font-semibold text-white">
                        Navigation
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
                        {
                            navigationLinks.map((navItem, index) => (
                                <li key={`${navItem.label}-${index}`}>
                                    <a
                                        href={navItem.href}
                                        title={navItem.label}
                                        className="transition-colors hover:text-white"
                                    >
                                        {navItem.label}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="lg:col-span-3">
                    <h3 className="text-base font-semibold text-white">
                        Services
                    </h3>
                    <div className="mt-4 space-y-2.5 text-sm text-neutral-400">
                        <p className="pt-1">
                            Safety Training & Consulting
                        </p>
                        <p>
                            Working At Heights
                        </p>
                        <p>
                            Safety Files
                        </p>
                        <p>
                            Occupational Health & Safety
                        </p>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <h3 className="text-base font-semibold text-white">
                        Contact
                    </h3>
                    <div className="mt-4 space-y-2.5 text-sm text-neutral-400">
                        <a
                            href="https://maps.app.goo.gl/3T7dk1eAVDQFYxyi9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-white"
                        >
                            {
                                companyAddressLines.map((addressLine, index) => (
                                    <p key={`${addressLine}-${index}`}>
                                        {addressLine}
                                    </p>
                                ))
                            }
                        </a>
                        <p className="pt-1">
                            <a
                                href="mailto:marketing@redsealsa.com"
                                title="Email Redseal at marketing@redsealsa.com"
                                className="transition-colors hover:text-white"
                            >
                                marketing@redsealsa.com
                            </a>
                        </p>
                        <p>
                            <a
                                href="tel:+27842084966"
                                title="Call Redseal at (+27) 84 208 4966"
                                className="transition-colors hover:text-white"
                            >
                                (+27) 84 208 4966
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const renderBottomBar = () => {
        // Renders the footer bottom bar with copyright and legal policy links

        return (
            <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800/80 pt-6 text-xs text-neutral-400 sm:flex-row">
                <p>
                    Copyright @ Redseal {new Date().getFullYear()}. All rights reserved.
                </p>
                {/* <div className="flex items-center gap-6">
                    <a
                        href="#terms"
                        title="Read our Terms of Service"
                        className="transition-colors hover:text-white"
                    >
                        Term of service
                    </a>
                    <a
                        href="#privacy"
                        title="Read our Privacy Policy"
                        className="transition-colors hover:text-white"
                    >
                        Privacy Policy
                    </a>
                </div> */}
            </div>
        );
    };

    return (
        <footer className="rounded-t-3xl w-full bg-black px-12 pb-6 pt-12 text-neutral-300">
            <div className="mx-auto max-w-7xl">
                {renderHeaderSection()}
                {renderMainColumns()}
                {renderBottomBar()}
            </div>
        </footer>
    );
}

export default Footer;
