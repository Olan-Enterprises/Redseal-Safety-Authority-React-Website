const contactServiceOptions = [
    "Working at Heights & Fall Protection",
    "Basic & Advanced Fire Fighting",
    "First Aid Levels 1, 2 & 3",
    "Legal Liability (OHS Act 16.1 & 16.2)",
    "Hazard Identification & Risk Assessment (HIRA)",
    "Hazardous Chemicals (HAZCHEM)",
    "Power Tools Safety",
    "Health & Safety Files and Compliance Audits",
    "General Occupational Safety Consultation"
];
const headquartersAddress = "1 Mottramdale Road, Westwood, Westville, 3629";
const whatsappNumber = "27842084966";
const marketingEmail = "marketing@redsealsa.com";
const redsealContactDetails = {
    address: headquartersAddress,
    phone: "(+27) 84 208 4966",
    phoneLink: `tel:+${whatsappNumber}`,
    whatsappLink: `https://wa.me/${whatsappNumber}`,
    email: marketingEmail,
    emails: [
        marketingEmail,
        "admin@redsealsa.com",
        "taze@redsealsa.com"
    ],
    hours: "Monday – Friday, 08:00 – 17:00",
    mapEmbed: `https://maps.google.com/maps?q=${encodeURIComponent(headquartersAddress)}&z=15&output=embed`,
    directionsLink: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(headquartersAddress)}`
};

export { contactServiceOptions, redsealContactDetails };
