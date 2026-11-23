import { useRef, useState, useEffect } from "react";
import { ChevronDown, Mail, MapPin, Menu, Phone, ReceiptText } from "lucide-react";

import { redsealContactDetails } from "../contactDetails";

const navigationLinks = [
    {
        label: "Home",
        href: "/",
        hasDropdown: false
    },
    {
        label: "Services",
        href: "/services",
        hasDropdown: true
    },
    {
        label: "Bookings",
        href: "bookings",
        hasDropdown: false
    },
    {
        label: "Gallery",
        href: "gallery",
        hasDropdown: false
    },
    {
        label: "Contact",
        href: "/contact",
        hasDropdown: false
    }
];
const socialMediaLinks = [
    {
        name: "Instagram",
        href: "https://instagram.com",
        icon: <svg width="21px" height="21px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0F0F0F"/><path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F"/><path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#0F0F0F"/></svg>
    },
    {
        name: "Facebook",
        href: "https://facebook.com",
        icon: <svg width="20px" height="20px" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-385.000000, -7399.000000)" fill="#000000"><g transform="translate(56.000000, 160.000000)"><path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"></path></g></g></g></svg>
    },
    {
        name: "X",
        href: "https://x.com",
        icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px"><path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path></svg>
    },
    {
        name: "WhatsApp",
        href: "https://wa.me/27842084966",
        icon: <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#000000"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#000000"></path> </g></svg>
    }
];

function TopNavigation() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTopSectionHidden, setIsTopSectionHidden] = useState(false);
    const [topSectionHeight, setTopSectionHeight] = useState(48);
    const topSectionReference = useRef(null);
    const previousScrollYReference = useRef(0);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Handles keyboard escape key to dismiss the mobile sidebar menu.
            // Parameters: event (KeyboardEvent) - Keyboard press event.
            // Returns: undefined - Updates state.
            // Example return: undefined.

            if(event.key === "Escape") setIsSidebarOpen(false);
        };

        if(isSidebarOpen) {
            window.addEventListener("keydown", handleKeyDown);

            document.body.style.overflow = "hidden";
        }
        else document.body.style.overflow = "unset";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);

            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        const updateTopSectionHeight = () => {
            // Measures the actual height of the top navigation bar for smooth scroll translation.
            // Parameters: None.
            // Returns: undefined - Updates topSectionHeight state.
            // Example return: undefined.

            if(topSectionReference.current) {
                setTopSectionHeight(topSectionReference.current.offsetHeight);
            }
        };

        updateTopSectionHeight();
        window.addEventListener("resize", updateTopSectionHeight);

        const handleWindowScroll = () => {
            // Smoothly hides the top contact section on downward scroll and reveals it on upward scroll.
            // Parameters: None.
            // Returns: undefined - Updates isTopSectionHidden state.
            // Example return: undefined.

            const currentScrollY = window.scrollY;

            if(currentScrollY <= 10) {
                setIsTopSectionHidden(false);
            }
            else if(currentScrollY > previousScrollYReference.current && currentScrollY > 40) {
                setIsTopSectionHidden(true);
            }
            else if(currentScrollY < previousScrollYReference.current) {
                setIsTopSectionHidden(false);
            }

            previousScrollYReference.current = currentScrollY;
        };

        window.addEventListener("scroll", handleWindowScroll, { passive: true });

        return () => {
            window.removeEventListener("resize", updateTopSectionHeight);
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, []);

    const renderTopSection = () => {
        // Renders the top black contact and social media bar matching the RedSeal header layout.
        // Parameters: None.
        // Returns: JSX.Element - The rendered top contact bar element.
        // Example return: <div className="w-full bg-black...">...</div>.

        return (
            <div className="w-full bg-black px-4 py-2 text-white sm:px-6">
                <div className="flex w-full flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                        <a
                            href={redsealContactDetails.directionsLink}
                            rel="noopener noreferrer"
                            target="_blank"
                            title="View Redseal location on Google Maps"
                            className="hidden items-center gap-3 sm:flex"
                        >
                            <MapPin className="w-5.5 h-5.5 text-red-600" />
                            <div className="flex flex-col -space-y-1">
                                <p className="text-[16px] font-bold text-red-600">
                                    Durban
                                </p>
                                <p className="text-xs text-white">
                                    Westville
                                </p>
                            </div>
                        </a>
                        <div className="flex flex-col leading-tight">
                            <a
                                href="tel:+27842084966"
                                title="Call Redseal SA"
                                className="text-xs text-white transition hover:text-red-500"
                            >
                                (+27) 84 208 4966
                            </a>
                            <a
                                href="mailto:marketing@redsealsa.com"
                                title="Email Redseal SA"
                                className="text-xs text-white transition hover:text-red-500"
                            >
                                marketing@redsealsa.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            socialMediaLinks.map((social, index) => (
                                <a
                                    key={`${social.name}-${index}`}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Visit Redseal SA on ${social.name}`}
                                    aria-label={social.name}
                                    className="flex h-7 w-7 items-center justify-center rounded bg-white text-black transition hover:bg-red-600 hover:text-white"
                                >
                                    {social.icon}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    };

    const renderBottomSection = () => {
        // Renders the white main navigation bar with logo, links, and action button.
        // Parameters: None.
        // Returns: JSX.Element - The rendered bottom navigation bar element.
        // Example return: <div className="w-full border-b...">...</div>.

        return (
            <div className="w-full border-b border-slate-200 bg-white/95 px-4 py-0.5 backdrop-blur-sm">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            title="Open Navigation Menu"
                            aria-label="Open Navigation Menu"
                            aria-expanded={isSidebarOpen}
                            onClick={() => setIsSidebarOpen(previousState => !previousState)}
                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-900 transition hover:border-red-600 hover:text-red-600 lg:hidden"
                        >
                            <Menu className="w-4 h-4" />
                        </button>
                        <a
                            href="/"
                            title="Home"
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/src/assets/RedSeal Logo Transparent.png"
                                alt="Redseal SA Logo"
                                className="h-20 w-20 object-contain"
                            />
                            <div className="flex flex-col leading-tight">
                                <span className="text-3xl font-semibold tracking-tight">
                                    Redseal
                                </span>
                                <span className="text-xs font-semibold text-slate-400 sm:text-sm">
                                    Subject Matter Experts
                                </span>
                            </div>
                        </a>
                    </div>
                    <nav
                        aria-label="Primary Navigation"
                        className="hidden items-center gap-7 lg:flex"
                    >
                        {
                            navigationLinks.map((navigationItem, index) => (
                                <a
                                    key={`${navigationItem.label}-${index}`}
                                    href={navigationItem.href}
                                    title={`Navigate to ${navigationItem.label}`}
                                    className="flex items-center gap-1 text-sm font-normal text-black transition hover:text-red-600"
                                >
                                    <span>{navigationItem.label}</span>
                                    {
                                        navigationItem.hasDropdown && <ChevronDown className="w-4 h-4" />
                                    }
                                </a>
                            ))
                        }
                    </nav>
                    <div className="hidden items-center sm:flex">
                        <a
                            href="/contact"
                            title="Request a Quote from RedSeal"
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-md font-bold text-white transition hover:bg-red-700"
                        >
                            <p>Get A Quote</p>
                            <ReceiptText className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    const renderSidebarMenu = () => {
        // Renders the mobile slide-over sidebar menu and blurred darkened backdrop overlay.
        // Parameters: None.
        // Returns: JSX.Element - The rendered mobile sidebar slide-over menu element.
        // Example return: <div className="fixed inset-0 z-[9999]...">...</div>.

        return (
            <div className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${isSidebarOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"}`}>
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                    className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
                />
                <aside
                    aria-label="Mobile Navigation Sidebar"
                    className={`fixed inset-y-0 left-0 z-[10000] flex w-86 max-w-[85vw] flex-col justify-between border-r border-white/20 bg-black shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between pb-4">
                            <a
                                href="/"
                                title="Home"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src="/src/assets/RedSeal Logo.jpg"
                                    alt="Redseal SA Logo"
                                    className="h-20 w-20 object-contain rounded-full"
                                />
                                <div className="flex flex-col leading-tight">
                                    <p className="text-3xl font-bold tracking-tight text-white">
                                        Redseal
                                    </p>
                                    <p className="text-sm font-medium text-white">
                                        Subject Matter Experts
                                    </p>
                                </div>
                            </a>
                            <button
                                type="button"
                                title="Close Navigation Menu"
                                aria-label="Close Navigation Menu"
                                onClick={() => setIsSidebarOpen(false)}
                                className="rounded-lg p-2 text-white transition hover:text-red-500"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                        <nav
                            aria-label="Mobile Navigation Links"
                            className="mt-6 flex flex-col space-y-1.5"
                        >
                            {
                                navigationLinks.map((navigationItem, index) => (
                                    <a
                                        key={`${navigationItem.label}-${index}`}
                                        href={navigationItem.href}
                                        title={`Navigate to ${navigationItem.label}`}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="flex items-center justify-between px-3 py-2.5 font-bold text-3xl text-white uppercase"
                                    >
                                        <span>{navigationItem.label}</span>
                                    </a>
                                ))
                            }
                            <a
                                href="/contact"
                                title="Request a Quote"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center justify-between px-3 py-2.5 font-bold text-3xl text-red-500 uppercase"
                            >
                                <span>REQUEST A QUOTE</span>
                            </a>
                        </nav>
                    </div>
                    <div className="border-t border-white/20 text-sm text-white/60">
                        <div className="bg-white/5 p-6 flex flex-col gap-2">
                            <a
                                className="mb-1 font-normal flex items-center gap-2"
                                href={redsealContactDetails.directionsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Visit Redseal on Google Maps"
                            >
                                <MapPin className="w-4 h-4" />
                                <p>Durban, Westville</p>
                            </a>
                            <a
                                className="mb-1 font-normal flex items-center gap-2"
                                href="mailto:marketing@redsealsa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Email Redseal marketing"
                            >
                                <Mail className="w-4 h-4" />
                                <p>marketing@redsealsa.com</p>
                            </a>
                            <a
                                className="mb-1 font-normal flex items-center gap-2"
                                href="tel:+27842084966"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Call Redseal office"
                            >
                                <Phone className="w-4 h-4" />
                                <p>(+27) 84 208 4966</p>
                            </a>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    };

    return (
        <>
            <header
                style={{
                    transform: isTopSectionHidden ? `translateY(-${topSectionHeight}px)` : "translateY(0)"
                }}
                className="sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out"
            >
                <div ref={topSectionReference}>
                    {renderTopSection()}
                </div>
                {renderBottomSection()}
            </header>
            {renderSidebarMenu()}
        </>
    );
}

export default TopNavigation;
