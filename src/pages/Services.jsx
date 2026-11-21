import Lenis from "lenis";
import { useRef, useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, ArrowUpRight, Award, BriefcaseMedical, Building2, Calendar, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, Clock, Compass, Drill, FileSpreadsheet, Flame, FolderCheck, Hammer, HardHat, MapPin, Phone, Scale, ShieldAlert, ShieldCheck, Truck, Users } from "lucide-react";

import Footer from "../components/Footer";
import TopNavigation from "../components/TopNavigation";

const HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS = 7000;
const HERO_CAROUSEL_PAUSE_MILLISECONDS = 3000;
const LOGO_SLIDER_NORMAL_VELOCITY_PIXELS = 1.6;
const LOGO_SLIDER_DECELERATION_FACTOR = 0.05;
const LOGO_SLIDER_ACCELERATION_FACTOR = 0.05;
const LOGO_SLIDER_ITEM_SPACING_PIXELS = 64;
const COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS = 7000;

const heroSpotlightSlides = [
    {
        category: "Accredited Safety Training",
        title: "In-Premises & External Safety Courses",
        description: "21+ accredited occupational health and safety short courses delivered at your workplace or our dedicated venue.",
        badge: "Durban (031) Travel Included",
        imageSource: "/src/assets/hero_slide_1.jpg",
        imageAltText: "Redseal accredited safety instructors leading workplace training"
    },
    {
        category: "OHS Consulting & Audits",
        title: "Independent Audits, HIRA & Legal Advisory",
        description: "Workplace inspections, risk assessments, compliance verification, and statutory advisory tailored to your site.",
        badge: "Subject Matter Experts",
        imageSource: "/src/assets/about_blueprints.jpg",
        imageAltText: "Redseal safety consultant reviewing occupational compliance plans"
    },
    {
        category: "Safety File Building",
        title: "Turnkey Site-Specific Health & Safety Files",
        description: "Custom-compiled compliance files structured for seamless principal contractor and Department of Labour sign-off.",
        badge: "100% Site Ready",
        imageSource: "/src/assets/about_inspectors.jpg",
        imageAltText: "Safety inspectors verifying compiled workplace health and safety files"
    }
];
const accreditationLogos = [
    {
        name: "QCTO - Quality Council for Trades and Occupations",
        imageSource: "/src/assets/accreditations/qcto.svg",
        imageAltText: "Quality Council for Trades and Occupations QCTO logo"
    },
    {
        name: "SAQA - South African Qualifications Authority",
        imageSource: "/src/assets/accreditations/saqa.svg",
        imageAltText: "South African Qualifications Authority SAQA logo"
    },
    {
        name: "Department of Employment and Labour",
        imageSource: "/src/assets/accreditations/labour.svg",
        imageAltText: "Department of Employment and Labour Republic of South Africa logo"
    },
    {
        name: "CETA - Construction Education and Training Authority",
        imageSource: "/src/assets/accreditations/ceta.svg",
        imageAltText: "Construction Education and Training Authority CETA logo"
    },
    {
        name: "HWSETA - Health and Welfare SETA",
        imageSource: "/src/assets/accreditations/hwseta.svg",
        imageAltText: "Health and Welfare SETA HWSETA logo"
    },
    {
        name: "TETA - Transport Education Training Authority",
        imageSource: "/src/assets/accreditations/teta.svg",
        imageAltText: "Transport Education Training Authority TETA logo"
    },
    {
        name: "SAIOSH - South African Institute of Occupational Safety and Health",
        imageSource: "/src/assets/accreditations/saiosh.svg",
        imageAltText: "South African Institute of Occupational Safety and Health SAIOSH logo"
    },
    {
        name: "IWH - Institute for Work at Height",
        imageSource: "/src/assets/accreditations/iwh.svg",
        imageAltText: "Institute for Work at Height IWH logo"
    }
];
const accreditedTrainingCourses = [
    {
        id: "first-aid",
        shortLabel: "First Aid",
        title: "First Aid",
        duration: "1–2 Days",
        price: "R 1 200",
        priceNote: "Level 1: R 950 (1 Day) • Level 2: R 1 200 (2 Days)",
        description: "First Aid Training equips individuals with the essential knowledge and practical skills to respond quickly and effectively to injuries, illnesses, and medical emergencies. It prepares them to provide immediate assistance, preserve life, prevent a condition from worsening, and promote recovery until professional medical help arrives.",
        modules: [
            "The Objective of First Aid",
            "Anatomy and Physiology",
            "Cardiopulmonary Resuscitation",
            "Legal And Ethical Considerations",
            "Primary Survey"
        ],
        moreNote: "and many more.",
        imageSource: "/src/assets/services_snapshot_3.jpg",
        imageAltText: "First Aid emergency medical response and CPR training",
        Icon: BriefcaseMedical
    },
    {
        id: "basic-firefighting",
        shortLabel: "Firefighting",
        title: "Basic Firefighting Training",
        duration: "1/2 Day",
        price: "R 750",
        priceNote: "Fire Level 01 • Per Person",
        description: "Basic Firefighting Training teaches individuals how to prevent fires, identify hazards, safely use fire extinguishers, and respond effectively to fire emergencies.",
        modules: [
            "The Fire Triangle",
            "Classification of Fires",
            "P.A.S.S. Method",
            "Fire Extinguisher Methods",
            "Fire Prevention Methods"
        ],
        moreNote: "and many more.",
        imageSource: "/src/assets/services_snapshot_2.jpg",
        imageAltText: "Basic Firefighting hands-on fire extinguisher training",
        Icon: Flame
    },
    {
        id: "she-rep",
        shortLabel: "SHE Rep",
        title: "SHE Rep Training",
        duration: "1 Day",
        price: "R 1 200",
        priceNote: "SHE Representative • Per Person",
        description: "SHE Rep Training equips employees with the knowledge and skills to identify workplace hazards, report unsafe conditions, and promote Safety, Health, and Environmental (SHE) awareness to help maintain a safe and healthy working environment.",
        modules: [
            "SHE REP Duties",
            "OHS Act, 1993",
            "Legislation Framework",
            "Emergency Procedures",
            "Toolbox Topics and Register"
        ],
        moreNote: "OHS Act statutory alignment.",
        imageSource: "/src/assets/hero_slide_4.jpg",
        imageAltText: "SHE Representative occupational safety training session",
        Icon: Users
    },
    {
        id: "working-at-heights",
        shortLabel: "Working at Heights",
        title: "Working at Heights Training",
        duration: "1/2 Day",
        price: "R 700",
        priceNote: "Work at Heights • Per Person",
        description: "Working at Heights Training equips individuals with the knowledge and skills to work safely at elevated heights, identify fall hazards, use fall protection equipment correctly, and prevent falls, injuries, and fatalities in the workplace.",
        modules: [
            "Correctly demonstrate how to put on a harness",
            "Principles of Fall Arrest and attachments",
            "Principles of Restraint",
            "Visual and Tactile Inspection of a full-body harness",
            "Understand the need for emergency planning and the effects of suspension trauma"
        ],
        moreNote: "and many more modules to learn.",
        imageSource: "/src/assets/services_snapshot_1.jpg",
        imageAltText: "Working at Heights fall arrest and harness safety training",
        Icon: HardHat
    },
    {
        id: "hira",
        shortLabel: "HIRA",
        title: "HIRA (Hazard Identification and Risk Assessment)",
        duration: "1 Day",
        price: "R 1 200",
        priceNote: "Risk Assessment • Per Person",
        description: "HIRA (Hazard Identification and Risk Assessment) Training teaches individuals how to identify potential workplace hazards, evaluate the risks associated with them, and implement appropriate control measures to prevent accidents, injuries, and occupational illnesses while promoting a safer working environment.",
        modules: [
            "Understand the need for Risk Management",
            "The Processes involved in effective risk management",
            "Effectively Identify Hazards in your work areas",
            "Calculate and evaluate/categorize the risk",
            "Develop personalized safe working procedures"
        ],
        moreNote: "and many more modules.",
        imageSource: "/src/assets/services_snapshot_5.jpg",
        imageAltText: "Hazard Identification and Risk Assessment workplace safety audit",
        Icon: AlertTriangle
    },
    {
        id: "confined-space",
        shortLabel: "Confined Space",
        title: "Confined Space Training",
        duration: "1 Day",
        price: "R 750",
        priceNote: "Confined Space Work • Per Person",
        description: "Confined Space Training equips individuals with the knowledge and skills to identify confined space hazards, assess risks such as toxic gases, oxygen deficiency, and restricted entry or exit, and follow safe entry procedures, use appropriate protective equipment, and respond effectively to emergencies to prevent serious injuries and fatalities.",
        modules: [
            "Types of Confined Spaces",
            "Pre-Entry Requirements",
            "Hazard Testing",
            "Safety Controller Duties",
            "Permits and Safe Practices"
        ],
        moreNote: "and many more modules to cover.",
        imageSource: "/src/assets/hero_slide_2.jpg",
        imageAltText: "Confined Space hazard testing and safe entry training",
        Icon: ShieldAlert
    },
    {
        id: "incident-investigation",
        shortLabel: "Incident Investigation",
        title: "Incident Investigation",
        duration: "1–2 Days",
        price: "R 1 400",
        priceNote: "Root Cause & Annexure 1 • Per Person",
        description: "Incident Investigation Training teaches individuals how to investigate workplace accidents and near misses, identify root causes, and implement corrective actions to prevent recurrence and improve workplace safety.",
        modules: [
            "Legislative framework of workplace health and safety",
            "Investigation Procedures",
            "How to fill in Annexure 1",
            "Initiating the investigation",
            "Consequences for non-compliance"
        ],
        moreNote: "and many more modules.",
        imageSource: "/src/assets/about_inspectors.jpg",
        imageAltText: "Workplace incident investigation and Annexure 1 training",
        Icon: ClipboardCheck
    },
    {
        id: "legal-liability",
        shortLabel: "Legal Liability",
        title: "Legal Liability",
        duration: "1 Day",
        price: "R 1 200",
        priceNote: "OHS Act Compliance • Per Person",
        description: "Legal Liability Training educates individuals on their legal responsibilities under occupational health and safety legislation, including the consequences of non-compliance, negligence, and unsafe practices, to promote accountability and prevent workplace accidents.",
        modules: [
            "Driving Forces for Legal Compliance",
            "Criminal Liability - common law and legislation",
            "Civil Liability - common law and legislation",
            "Legal Liabilities Table",
            "Legal Compliance Management"
        ],
        moreNote: "and many more modules.",
        imageSource: "/src/assets/services_snapshot_4.webp",
        imageAltText: "Legal Liability occupational health and safety workshop",
        Icon: Scale
    },
    {
        id: "power-tools",
        shortLabel: "Power Tools",
        title: "Power Tool Training",
        duration: "1/2 Day",
        price: "R 950",
        priceNote: "Use & Maintenance • Per Person",
        description: "Power Tool Training teaches employees how to operate, inspect, and maintain power tools safely and correctly. It covers tools such as drills, grinders, circular saws, and other electrical or battery-operated equipment. The training helps to prevent injuries at work and teaches employees to identify hazards and damaged equipment.",
        modules: [
            "Correctly use electric power tools",
            "Apply safety procedures",
            "Follow procedures that apply to safe working procedures",
            "Understanding of hazards involving power tools",
            "Power Tools Checklist"
        ],
        moreNote: "and many more modules to learn.",
        imageSource: "/src/assets/services_snapshot_6.jpeg",
        imageAltText: "Safe operation and maintenance of electric power tools",
        Icon: Drill
    },
    {
        id: "hand-tools",
        shortLabel: "Hand Tools",
        title: "Hand Tools Training",
        duration: "1/2 Day",
        price: "R 700",
        priceNote: "Safe Handling & PPE • Per Person",
        description: "Hand Tools Training teaches employees how to select, inspect, handle, and use hand tools safely and correctly. It helps workers identify damaged tools, recognise potential hazards, use the appropriate PPE, prevent injuries, and maintain tools properly to promote a safe and productive working environment.",
        modules: [
            "Inspections and checklist",
            "Electrical safety",
            "Understanding the hazards involving hand tools",
            "Red tagging",
            "Safe stacking and Storage"
        ],
        moreNote: "and many more modules to learn.",
        imageSource: "/src/assets/hero_slide_3.jpg",
        imageAltText: "Hand tools inspection checklist and safe workplace practices",
        Icon: Hammer
    },
    {
        id: "fall-protection-planner",
        shortLabel: "Fall Protection Planner",
        title: "Fall Protection Planner Training",
        duration: "1–2 Days",
        price: "R 1 800",
        priceNote: "Advanced Planning • Per Person",
        description: "Fall Protection Plan Training teaches employees how to develop, understand, and implement a fall protection plan when working at heights. It covers identifying fall hazards, assessing risks, selecting suitable fall prevention and protection equipment, and planning emergency rescue procedures to prevent injuries and ensure workers' safety.",
        modules: [
            "Limitations of fall arrest equipment",
            "Perform risk assessments against a fall protection plan",
            "Complying with a fall protection plan and policy",
            "Managing safety of personnel and perform fall arrest rescue",
            "Construction regulations"
        ],
        moreNote: "and many more modules to learn.",
        imageSource: "/src/assets/quality_showcase.jpg",
        imageAltText: "Fall Protection Planner developing elevated rescue and safety plans",
        Icon: Compass
    }
];
const coursePricelistItems = [
    {
        title: "SHE Representative",
        duration: "1 day",
        price: "R 1 200"
    },
    {
        title: "Work at Heights",
        duration: "1/2 day",
        price: "R 700"
    },
    {
        title: "Confined Space Work",
        duration: "1 day",
        price: "R 750"
    },
    {
        title: "First Aid Level 01",
        duration: "1 day",
        price: "R 950"
    },
    {
        title: "First Aid Level 02",
        duration: "2 days",
        price: "R 1 200"
    },
    {
        title: "HIRA - Risk Assessment",
        duration: "1 day",
        price: "R 1 200"
    },
    {
        title: "Incident Investigation",
        duration: "1–2 days",
        price: "R 1 400"
    },
    {
        title: "Incident Management",
        duration: "1–2 days",
        price: "R 1 600"
    },
    {
        title: "Incident Management + RCAT",
        duration: "1–2 days",
        price: "R 1 800"
    },
    {
        title: "Scaffold Inspection",
        duration: "1–2 days",
        price: "R 1 200"
    },
    {
        title: "Scaffold Erecting",
        duration: "1 day",
        price: "R 950"
    },
    {
        title: "Legal Liability",
        duration: "1 day",
        price: "R 1 200"
    },
    {
        title: "Fire Level 01",
        duration: "1/2 day",
        price: "R 750"
    },
    {
        title: "Fall Protection Planner",
        duration: "1–2 days",
        price: "R 1 800"
    },
    {
        title: "Store-man",
        duration: "1–2 days",
        price: "R 1 400"
    },
    {
        title: "Stack & Storage",
        duration: "1–2 days",
        price: "R 1 200"
    },
    {
        title: "Power Tool use & maintenance",
        duration: "1/2 day",
        price: "R 950"
    },
    {
        title: "Hand Tools",
        duration: "1/2 day",
        price: "R 700"
    },
    {
        title: "HCS - Hazardous Chemical Training",
        duration: "1–2 days",
        price: "R 1 200"
    },
    {
        title: "Safety Officer",
        duration: "2 weeks",
        price: "R 15 000"
    },
    {
        title: "Construction Supervisor",
        duration: "1–2 days",
        price: "R 1 800"
    }
];

function Services() {
    const [currentHeroSlideIndex, setCurrentHeroSlideIndex] = useState(0);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [courseProgressPercent, setCourseProgressPercent] = useState(0);
    const heroProgressBarReference = useRef(null);
    const isHeroHoveredReference = useRef(false);
    const heroTimeRemainingReference = useRef(HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS);
    const heroPauseMillisecondsReference = useRef(0);
    const heroLastTimestampReference = useRef(0);
    const heroAnimationFrameReference = useRef(null);
    const logoSliderTrackReference = useRef(null);
    const logoSliderFirstSetReference = useRef(null);
    const isLogoSliderHoveredReference = useRef(false);
    const logoSliderPositionReference = useRef(0);
    const logoSliderVelocityReference = useRef(LOGO_SLIDER_NORMAL_VELOCITY_PIXELS);
    const logoSliderSingleSetWidthReference = useRef(1800);
    const logoSliderAnimationFrameReference = useRef(null);
    const isCourseHoveredReference = useRef(false);
    const courseTimeRemainingReference = useRef(COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS);
    const courseLastTimestampReference = useRef(0);
    const courseAnimationFrameReference = useRef(null);

    const triggerHeroPause = () => {
        // Pauses automatic hero carousel transitions for three seconds after manual navigation.
        // Parameters: None.
        // Returns: undefined - Resets hero timer and progress bar width.
        // Example return: undefined.

        heroPauseMillisecondsReference.current = HERO_CAROUSEL_PAUSE_MILLISECONDS;
        heroTimeRemainingReference.current = HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS;

        if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = "100%";
    };

    const handleNextHeroSlide = () => {
        // Advances the hero carousel to the next spotlight slide.
        // Parameters: None.
        // Returns: undefined - Updates currentHeroSlideIndex state.
        // Example return: undefined.

        triggerHeroPause();
        setCurrentHeroSlideIndex(previousIndex => (previousIndex + 1) % heroSpotlightSlides.length);
    };

    const handlePreviousHeroSlide = () => {
        // Moves the hero carousel to the previous spotlight slide.
        // Parameters: None.
        // Returns: undefined - Updates currentHeroSlideIndex state.
        // Example return: undefined.

        triggerHeroPause();
        setCurrentHeroSlideIndex(previousIndex => (previousIndex - 1 + heroSpotlightSlides.length) % heroSpotlightSlides.length);
    };

    const handleSelectHeroSlide = (targetIndex) => {
        // Jumps the hero carousel to a specific slide index.
        // Parameters: targetIndex (number) - Zero-based destination slide index.
        // Returns: undefined - Updates currentHeroSlideIndex state.
        // Example return: undefined.

        triggerHeroPause();
        setCurrentHeroSlideIndex(targetIndex);
    };

    const handleHeroMouseEnter = () => {
        // Pauses hero carousel auto-advance while the pointer hovers over it.
        // Parameters: None.
        // Returns: undefined - Updates hover reference flag.
        // Example return: undefined.

        isHeroHoveredReference.current = true;
        heroTimeRemainingReference.current = HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS;

        if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = "100%";
    };

    const handleHeroMouseLeave = () => {
        // Resumes hero carousel countdown when the pointer leaves.
        // Parameters: None.
        // Returns: undefined - Updates hover flag and timestamp reference.
        // Example return: undefined.

        isHeroHoveredReference.current = false;
        heroLastTimestampReference.current = performance.now();
    };

    const handleLogoSliderMouseEnter = () => {
        // Triggers smooth deceleration of the accreditation logo slider on hover.
        // Parameters: None.
        // Returns: undefined - Sets isLogoSliderHoveredReference to true.
        // Example return: undefined.

        isLogoSliderHoveredReference.current = true;
    };

    const handleLogoSliderMouseLeave = () => {
        // Restores steady motion of the accreditation logo slider after hover ends.
        // Parameters: None.
        // Returns: undefined - Sets isLogoSliderHoveredReference to false.
        // Example return: undefined.

        isLogoSliderHoveredReference.current = false;
    };

    const handleNextCourse = () => {
        // Advances the accredited courses carousel to the next course and resets its progress ring.
        // Parameters: None.
        // Returns: undefined - Updates currentCourseIndex and courseProgressPercent.
        // Example return: undefined.

        courseTimeRemainingReference.current = COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS;
        setCourseProgressPercent(0);
        setCurrentCourseIndex(previousIndex => (previousIndex + 1) % accreditedTrainingCourses.length);
    };

    const handlePreviousCourse = () => {
        // Navigates the accredited courses carousel to the previous course and resets its progress ring.
        // Parameters: None.
        // Returns: undefined - Updates currentCourseIndex and courseProgressPercent.
        // Example return: undefined.

        courseTimeRemainingReference.current = COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS;
        setCourseProgressPercent(0);
        setCurrentCourseIndex(previousIndex => (previousIndex - 1 + accreditedTrainingCourses.length) % accreditedTrainingCourses.length);
    };

    const handleSelectCourse = (targetIndex) => {
        // Selects a specific course in the accredited courses carousel and resets its cycle timer.
        // Parameters: targetIndex (number) - Zero-based index of the course to display.
        // Returns: undefined - Updates currentCourseIndex and courseProgressPercent.
        // Example return: undefined.

        courseTimeRemainingReference.current = COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS;
        setCourseProgressPercent(0);
        setCurrentCourseIndex(targetIndex);
    };

    const handleCourseMouseEnter = () => {
        // Pauses automatic advancement of the courses carousel while hovered.
        // Parameters: None.
        // Returns: undefined - Sets isCourseHoveredReference to true.
        // Example return: undefined.

        isCourseHoveredReference.current = true;
    };

    const handleCourseMouseLeave = () => {
        // Resumes automatic advancement of the courses carousel when hover ends.
        // Parameters: None.
        // Returns: undefined - Updates hover flag and timestamp reference.
        // Example return: undefined.

        isCourseHoveredReference.current = false;
        courseLastTimestampReference.current = performance.now();
    };

    useEffect(() => {
        const lenis = new Lenis();
        let animationFrameId = null;

        const handleRaf = (time) => {
            // Drives Lenis smooth scrolling on each browser animation frame.
            // Parameters: time (number) - High-resolution animation frame timestamp.
            // Returns: undefined - Updates Lenis scroll interpolation.
            // Example return: undefined.

            lenis.raf(time);
            animationFrameId = requestAnimationFrame(handleRaf);
        };

        animationFrameId = requestAnimationFrame(handleRaf);

        return () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId);

            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        heroLastTimestampReference.current = performance.now();

        const updateHeroFrame = (currentTimestamp) => {
            // Updates the hero carousel timer, progress bar width, and auto-advance transitions.
            // Parameters: currentTimestamp (number) - High-resolution animation frame timestamp.
            // Returns: undefined - Updates DOM progress bar and slide state.
            // Example return: undefined.

            const deltaMilliseconds = currentTimestamp - heroLastTimestampReference.current;

            heroLastTimestampReference.current = currentTimestamp;

            if(isHeroHoveredReference.current) {
                if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = "100%";
            }
            else if(heroPauseMillisecondsReference.current > 0) {
                heroPauseMillisecondsReference.current -= deltaMilliseconds;

                if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = "100%";
            }
            else {
                heroTimeRemainingReference.current -= deltaMilliseconds;

                const progressFraction = Math.max(0, Math.min(1, heroTimeRemainingReference.current / HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS));

                if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = `${progressFraction * 100}%`;

                if(heroTimeRemainingReference.current <= 0) {
                    heroTimeRemainingReference.current = HERO_CAROUSEL_AUTO_CYCLE_MILLISECONDS;

                    if(heroProgressBarReference.current) heroProgressBarReference.current.style.width = "100%";

                    setCurrentHeroSlideIndex(previousIndex => (previousIndex + 1) % heroSpotlightSlides.length);
                }
            }

            heroAnimationFrameReference.current = requestAnimationFrame(updateHeroFrame);
        };

        heroAnimationFrameReference.current = requestAnimationFrame(updateHeroFrame);

        return () => {
            if(heroAnimationFrameReference.current) cancelAnimationFrame(heroAnimationFrameReference.current);
        };
    }, []);

    useEffect(() => {
        const updateLogoSliderDimensions = () => {
            // Measures a single set of accreditation logos so the infinite track wraps seamlessly.
            // Parameters: None.
            // Returns: undefined - Caches measured width to logoSliderSingleSetWidthReference.
            // Example return: undefined.

            if(logoSliderFirstSetReference.current) {
                const measuredWidth = logoSliderFirstSetReference.current.getBoundingClientRect().width;

                if(measuredWidth > 0) {
                    logoSliderSingleSetWidthReference.current = measuredWidth;
                    logoSliderPositionReference.current = logoSliderPositionReference.current % measuredWidth;
                }
            }
        };

        updateLogoSliderDimensions();
        window.addEventListener("resize", updateLogoSliderDimensions);

        const updateLogoSliderFrame = () => {
            // Translates the grayscale accreditation logo marquee with smooth hover deceleration.
            // Parameters: None.
            // Returns: undefined - Applies translate3d transform to logoSliderTrackReference.
            // Example return: undefined.

            const targetVelocity = isLogoSliderHoveredReference.current ? 0.0 : LOGO_SLIDER_NORMAL_VELOCITY_PIXELS;
            const velocityDelta = targetVelocity - logoSliderVelocityReference.current;
            const accelerationFactor = isLogoSliderHoveredReference.current ? LOGO_SLIDER_DECELERATION_FACTOR : LOGO_SLIDER_ACCELERATION_FACTOR;

            logoSliderVelocityReference.current += velocityDelta * accelerationFactor;
            logoSliderPositionReference.current += logoSliderVelocityReference.current;

            if(logoSliderPositionReference.current >= logoSliderSingleSetWidthReference.current) {
                logoSliderPositionReference.current -= logoSliderSingleSetWidthReference.current;
            }

            if(logoSliderTrackReference.current) {
                const translationX = logoSliderPositionReference.current - logoSliderSingleSetWidthReference.current;

                logoSliderTrackReference.current.style.transform = `translate3d(${translationX}px, 0, 0)`;
            }

            logoSliderAnimationFrameReference.current = requestAnimationFrame(updateLogoSliderFrame);
        };

        logoSliderAnimationFrameReference.current = requestAnimationFrame(updateLogoSliderFrame);

        return () => {
            window.removeEventListener("resize", updateLogoSliderDimensions);

            if(logoSliderAnimationFrameReference.current) cancelAnimationFrame(logoSliderAnimationFrameReference.current);
        };
    }, []);

    useEffect(() => {
        courseLastTimestampReference.current = performance.now();

        const updateCourseFrame = (currentTimestamp) => {
            // Drives the countdown progress ring and automatic cycling for the accredited courses carousel.
            // Parameters: currentTimestamp (number) - High-resolution animation frame timestamp.
            // Returns: undefined - Updates courseProgressPercent and currentCourseIndex.
            // Example return: undefined.

            const deltaMilliseconds = currentTimestamp - courseLastTimestampReference.current;

            courseLastTimestampReference.current = currentTimestamp;

            if(!isCourseHoveredReference.current) {
                courseTimeRemainingReference.current -= deltaMilliseconds;

                if(courseTimeRemainingReference.current <= 0) {
                    courseTimeRemainingReference.current = COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS;
                    setCourseProgressPercent(0);
                    setCurrentCourseIndex(previousIndex => (previousIndex + 1) % accreditedTrainingCourses.length);
                }
                else {
                    const elapsedMilliseconds = COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS - courseTimeRemainingReference.current;

                    setCourseProgressPercent((elapsedMilliseconds / COURSE_CAROUSEL_AUTO_CYCLE_MILLISECONDS) * 100);
                }
            }

            courseAnimationFrameReference.current = requestAnimationFrame(updateCourseFrame);
        };

        courseAnimationFrameReference.current = requestAnimationFrame(updateCourseFrame);

        return () => {
            if(courseAnimationFrameReference.current) cancelAnimationFrame(courseAnimationFrameReference.current);
        };
    }, []);

    const renderHeroCarousel = () => {
        // Renders the hero spotlight carousel with zoom animation, inset controls, and bottom progress bar.
        // Parameters: None.
        // Returns: JSX.Element - The rendered hero spotlight carousel.
        // Example return: <div className="relative h-[24rem]...">...</div>.

        return (
            <div
                onMouseEnter={handleHeroMouseEnter}
                onMouseLeave={handleHeroMouseLeave}
                className="relative h-[24rem] w-full min-w-0 overflow-hidden rounded-3xl bg-neutral-950 shadow-2xl sm:h-[27rem]"
            >
                <div
                    className="flex h-full w-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentHeroSlideIndex * 100}%)`
                    }}
                >
                    {
                        heroSpotlightSlides.map((slideItem, slideIndex) => {
                            const isSelected = currentHeroSlideIndex === slideIndex;

                            return (
                                <div
                                    key={`${slideItem.title}-${slideIndex}`}
                                    className="relative h-full w-full min-w-full basis-full flex-shrink-0 overflow-hidden"
                                >
                                    <img
                                        src={slideItem.imageSource}
                                        alt={slideItem.imageAltText}
                                        className="h-full w-full select-none object-cover will-change-transform"
                                        style={{
                                            transform: isSelected ? "scale(1.10)" : "scale(1.00)",
                                            transition: isSelected ? "transform 7000ms ease-out" : "transform 700ms ease-in-out"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/15" />
                                    <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-neutral-950/75 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                        <span>{slideItem.badge}</span>
                                    </div>
                                    <div className="absolute right-4 bottom-5 left-4 z-10 sm:right-6 sm:bottom-6 sm:left-6">
                                        <div className="w-full rounded-2xl border border-white/15 bg-neutral-950/80 p-4 shadow-xl backdrop-blur-md">
                                            <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                                                {slideItem.category}
                                            </p>
                                            <h2 className="mt-1 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                                                {slideItem.title}
                                            </h2>
                                            <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                                                {slideItem.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="absolute top-4 left-4 z-20 flex select-none flex-col items-center gap-2.5 rounded-full border border-white/20 bg-neutral-900/75 p-1.5 text-white shadow-xl backdrop-blur-md">
                    <button
                        type="button"
                        title="Next service highlight slide"
                        onClick={handleNextHeroSlide}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 active:scale-95"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="flex flex-col items-center gap-2 py-0.5">
                        {
                            heroSpotlightSlides.map((slideItem, slideIndex) => {
                                const isSelected = currentHeroSlideIndex === slideIndex;

                                return (
                                    <button
                                        key={`hero-slide-dot-${slideIndex}`}
                                        type="button"
                                        title={`View ${slideItem.category}`}
                                        onClick={() => handleSelectHeroSlide(slideIndex)}
                                        className={`rounded-full transition-all duration-300 ${isSelected ? "h-2.5 w-2.5 scale-110 bg-red-600 ring-2 ring-red-400 ring-offset-1 ring-offset-neutral-900" : "h-2 w-2 bg-white/40 hover:scale-125 hover:bg-white"}`}
                                    />
                                );
                            })
                        }
                    </div>
                    <button
                        type="button"
                        title="Previous service highlight slide"
                        onClick={handlePreviousHeroSlide}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 active:scale-95"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-20 h-1 bg-neutral-900/50">
                    <div
                        ref={heroProgressBarReference}
                        className="h-full bg-red-600 transition-none"
                        style={{
                            width: "100%"
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderAccreditationLogoSlider = () => {
        // Renders the infinite grayscale accreditation logo marquee beneath the hero section.
        // Parameters: None.
        // Returns: JSX.Element - The rendered infinite grayscale logo slider element.
        // Example return: <div className="mt-12 sm:mt-16">...</div>.

        const logoSets = [0, 1, 2, 3];

        return (
            <div className="mt-12 sm:mt-16">
                <p className="mb-4 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                    Accredited &amp; Aligned With South African Regulatory Bodies
                </p>
                <div
                    onMouseEnter={handleLogoSliderMouseEnter}
                    onMouseLeave={handleLogoSliderMouseLeave}
                    className="relative w-full overflow-hidden border-y border-neutral-200 bg-neutral-50 py-6 select-none"
                    style={{
                        maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 86%, rgba(0, 0, 0, 0) 100%)",
                        WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 86%, rgba(0, 0, 0, 0) 100%)"
                    }}
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent sm:w-40" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent sm:w-40" />
                    <div
                        ref={logoSliderTrackReference}
                        className="flex items-center whitespace-nowrap will-change-transform"
                    >
                        {
                            logoSets.map((setIdentifier, setIndex) => (
                                <div
                                    key={`accreditation-set-${setIdentifier}-${setIndex}`}
                                    ref={setIdentifier === 0 ? logoSliderFirstSetReference : null}
                                    className="flex shrink-0 items-center"
                                >
                                    {
                                        accreditationLogos.map((logoItem, logoIndex) => (
                                            <div
                                                key={`${logoItem.name}-${setIdentifier}-${logoIndex}`}
                                                className="group flex shrink-0 items-center"
                                                style={{
                                                    marginRight: `${LOGO_SLIDER_ITEM_SPACING_PIXELS}px`
                                                }}
                                            >
                                                <div className="flex h-20 items-center justify-center rounded-2xl border border-neutral-200/80 bg-white px-6 py-3 shadow-xs transition-all duration-300 group-hover:border-neutral-300 group-hover:shadow-md">
                                                    <img
                                                        src={logoItem.imageSource}
                                                        alt={logoItem.imageAltText}
                                                        title={logoItem.name}
                                                        className="h-12 w-auto max-w-[13rem] object-contain grayscale opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-14"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    };

    const renderHero = () => {
        // Renders the services hero section with heading, primary actions, spotlight carousel, and grayscale accreditations slider.
        // Parameters: None.
        // Returns: JSX.Element - The rendered services hero section.
        // Example return: <section className="w-full bg-white pt-6 pb-8">...</section>.

        return (
            <section className="w-full bg-white pt-6 pb-8 sm:pt-8 sm:pb-12">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                        <div className="flex flex-col items-start lg:col-span-6">
                            <div className="flex items-center gap-2">
                                <span className="h-0.5 w-6 rounded-full bg-red-500" />
                                <p className="text-xs font-bold uppercase tracking-wider text-red-500 sm:text-sm">
                                    Redseal Safety Authority • Services
                                </p>
                            </div>
                            <h1 className="mt-3 text-3xl font-extrabold tracking-tight leading-tight text-neutral-900 min-[360px]:text-4xl sm:text-5xl sm:leading-[3.4rem]">
                                Accredited Safety Training, Consulting &amp;{" "}
                                <strong className="shimmer-text-red">Safety Files</strong>
                            </h1>
                            <div className="mt-5 flex gap-3.5">
                                <div className="w-[0.2rem] flex-shrink-0 rounded-full bg-red-600" />
                                <p className="text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg">
                                    In-premises and external accredited safety training, independent OHS compliance audits, and turnkey site-specific Health &amp; Safety Files engineered for zero-harm workplaces.
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <a
                                    href="#courses"
                                    title="Browse accredited safety training courses"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all hover:bg-red-700 active:scale-95 sm:text-base"
                                >
                                    <span>Explore Courses</span>
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="#pricelist"
                                    title="View the 2026 March Updated Course Pricelist"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-800 shadow-xs transition-all hover:border-neutral-400 hover:bg-neutral-50 active:scale-95 sm:text-base"
                                >
                                    <FileSpreadsheet className="h-4 w-4 text-red-600" />
                                    <span>2026 Pricelist</span>
                                </a>
                            </div>
                        </div>
                        <div className="w-full min-w-0 lg:col-span-6">
                            {renderHeroCarousel()}
                        </div>
                    </div>
                </div>
                {renderAccreditationLogoSlider()}
            </section>
        );
    };

    const renderCoreServicesBento = () => {
        // Renders a compact asymmetric Bento Grid covering Safety Training (In-Premises & External), Consulting, and Safety File Building.
        // Parameters: None.
        // Returns: JSX.Element - The rendered core services Bento Grid section.
        // Example return: <section id="services-overview" className="w-full bg-white py-14">...</section>.

        return (
            <section
                id="services-overview"
                className="w-full bg-white py-14 sm:py-16"
            >
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <div className="flex items-center gap-2">
                            <span className="h-0.5 w-6 rounded-full bg-red-500" />
                            <h3 className="text-sm font-bold uppercase text-red-500">
                                Our Service Pillars
                            </h3>
                        </div>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                            Complete <strong className="shimmer-text-red">OHS Solutions</strong> Under One Roof
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                        <div className="group relative flex min-h-[21rem] flex-col justify-between overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white shadow-xl sm:p-8 lg:col-span-7">
                            <img
                                src="/src/assets/services_snapshot_1.jpg"
                                alt="Redseal accredited workplace safety training"
                                className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />
                            <div className="relative z-10 flex items-center justify-between gap-4">
                                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-300 backdrop-blur-md">
                                    <Award className="h-3.5 w-3.5" />
                                    <span>01 • Safety Training</span>
                                </span>
                                <a
                                    href="#courses"
                                    title="View accredited safety training courses"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform hover:scale-110"
                                >
                                    <ArrowUpRight className="h-5 w-5" />
                                </a>
                            </div>
                            <div className="relative z-10 mt-8">
                                <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                    In-Premises &amp; External Training
                                </h3>
                                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-neutral-300">
                                    21+ accredited courses delivered either on-site at your workplace (Durban 031 travel included) or externally at our fully equipped training centre.
                                </p>
                                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="flex items-start gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xs">
                                        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                                        <div>
                                            <p className="text-xs font-bold text-white">
                                                In-Premises (On-Site)
                                            </p>
                                            <p className="text-[11px] text-neutral-300">
                                                Tailored to your exact site &amp; equipment
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xs">
                                        <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                                        <div>
                                            <p className="text-xs font-bold text-white">
                                                External Venue
                                            </p>
                                            <p className="text-[11px] text-neutral-300">
                                                Ideal for individuals &amp; small cohorts
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-neutral-50 p-7 shadow-xs transition-all duration-300 hover:border-red-300 hover:bg-white hover:shadow-lg sm:p-8 lg:col-span-5">
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                        <ShieldCheck className="h-6 w-6" />
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                        02 • Consulting
                                    </span>
                                </div>
                                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-neutral-900">
                                    OHS Consulting &amp; Audits
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                                    Independent compliance audits, site inspections, HIRA risk assessments, incident investigations, and OHS Act legal advisory.
                                </p>
                                <div className="mt-5 space-y-2.5">
                                    <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-800">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                                        <span>Baseline &amp; Statutory Compliance Audits</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-800">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                                        <span>Contractor Verification &amp; Site Retainers</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-800">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
                                        <span>Incident Investigation &amp; RCAT Support</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-neutral-200/70 pt-4">
                                <a
                                    href="/contact"
                                    title="Schedule an OHS compliance consultation"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600 transition-colors hover:text-red-700"
                                >
                                    <span>Book a Site Audit</span>
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-7 text-white shadow-xl sm:p-8 lg:col-span-12">
                            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
                            <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                                <div className="lg:col-span-7">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                                        <FolderCheck className="h-4 w-4 text-red-500" />
                                        <span>03 • Safety File Building</span>
                                    </span>
                                    <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                                        Turnkey Site-Specific Health &amp; Safety Files
                                    </h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
                                        Custom-compiled Health &amp; Safety Files aligned with the OHS Act 85 of 1993 and Construction Regulations — indexed and ready for principal contractor and Department of Labour inspection.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 lg:col-span-5">
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            [
                                                "Risk Assessments (HIRA)",
                                                "Safe Working Procedures",
                                                "Statutory Appointments",
                                                "Fall Protection Plans",
                                                "Emergency Plans",
                                                "Inspection Registers"
                                            ].map((fileTag, tagIndex) => (
                                                <span
                                                    key={`${fileTag}-${tagIndex}`}
                                                    className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-200"
                                                >
                                                    {fileTag}
                                                </span>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <a
                                            href="/contact"
                                            title="Order a custom Health and Safety File from Redseal"
                                            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-red-700 active:scale-95 sm:text-sm"
                                        >
                                            <span>Order a Safety File</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderMostRequestedCourses = () => {
        // Renders the interactive Most Requested Accredited Courses carousel covering all 11 core training courses.
        // Parameters: None.
        // Returns: JSX.Element - The rendered accredited courses carousel section.
        // Example return: <section id="courses" className="w-full border-t...">...</section>.

        return (
            <section
                id="courses"
                className="w-full border-t border-neutral-200/70 bg-white py-14 sm:py-20"
            >
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2">
                                <span className="h-0.5 w-6 rounded-full bg-red-500" />
                                <h3 className="text-sm font-bold uppercase text-red-500">
                                    Featured Programmes
                                </h3>
                            </div>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                Most Requested <strong className="shimmer-text-red">Accredited Courses</strong>
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-11 w-11 items-center justify-center">
                                <svg
                                    className="pointer-events-none absolute inset-0 -rotate-90"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 44 44"
                                >
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r="19"
                                        className="stroke-neutral-200"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r="19"
                                        className="stroke-red-600 transition-[stroke-dashoffset] duration-150 ease-linear"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeDasharray={120}
                                        strokeDashoffset={120 - (120 * courseProgressPercent) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <button
                                    type="button"
                                    onClick={handlePreviousCourse}
                                    title="Previous accredited course"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 hover:text-red-600 active:scale-95"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="relative flex h-11 w-11 items-center justify-center">
                                <svg
                                    className="pointer-events-none absolute inset-0 -rotate-90"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 44 44"
                                >
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r="19"
                                        className="stroke-neutral-200"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <circle
                                        cx="22"
                                        cy="22"
                                        r="19"
                                        className="stroke-red-600 transition-[stroke-dashoffset] duration-150 ease-linear"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeDasharray={120}
                                        strokeDashoffset={120 - (120 * courseProgressPercent) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <button
                                    type="button"
                                    onClick={handleNextCourse}
                                    title="Next accredited course"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-xs transition-colors hover:bg-neutral-50 hover:text-red-600 active:scale-95"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 flex flex-wrap gap-2">
                        {
                            accreditedTrainingCourses.map((courseItem, courseIndex) => {
                                const isSelected = currentCourseIndex === courseIndex;

                                return (
                                    <button
                                        key={`${courseItem.id}-${courseIndex}`}
                                        type="button"
                                        title={`View details for ${courseItem.title}`}
                                        onClick={() => handleSelectCourse(courseIndex)}
                                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                                            isSelected ?
                                            "bg-neutral-950 text-white shadow-sm" :
                                            "border border-neutral-300 bg-white text-neutral-800 hover:border-red-500 hover:text-red-600"
                                        }`}
                                    >
                                        <span>{courseItem.shortLabel}</span>
                                    </button>
                                );
                            })
                        }
                    </div>
                    <div
                        onMouseEnter={handleCourseMouseEnter}
                        onMouseLeave={handleCourseMouseLeave}
                        className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-950 shadow-xl"
                    >
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${currentCourseIndex * 100}%)`
                            }}
                        >
                            {
                                accreditedTrainingCourses.map((courseItem, courseIndex) => (
                                    <div
                                        key={`course-slide-${courseItem.id}-${courseIndex}`}
                                        className="grid w-full min-w-full flex-shrink-0 grid-cols-1 lg:grid-cols-12"
                                    >
                                        <div className="relative h-64 overflow-hidden sm:h-80 lg:col-span-5 lg:h-auto">
                                            <img
                                                src={courseItem.imageSource}
                                                alt={courseItem.imageAltText}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950/60" />
                                            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-neutral-950/80 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                                                <Clock className="h-3.5 w-3.5 text-red-500" />
                                                <span>{courseItem.duration}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between p-6 text-white sm:p-8 lg:col-span-7 lg:p-10">
                                            <div>
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                                                        <courseItem.Icon className="h-3.5 w-3.5" />
                                                        <span>In-Premises &amp; External</span>
                                                    </span>
                                                    <div>
                                                        <span className="text-2xl font-black text-white sm:text-3xl">
                                                            {courseItem.price}
                                                        </span>
                                                        <span className="ml-1.5 text-xs font-medium text-neutral-400">
                                                            / person
                                                        </span>
                                                    </div>
                                                </div>
                                                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                                    {courseItem.title}
                                                </h3>
                                                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                                                    {courseItem.description}
                                                </p>
                                                <p className="mt-5 text-xs font-bold uppercase tracking-wider text-red-400">
                                                    What the course offers:
                                                </p>
                                                <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    {
                                                        courseItem.modules.map((moduleItem, moduleIndex) => (
                                                            <li
                                                                key={`${courseItem.id}-module-${moduleIndex}`}
                                                                className="flex items-start gap-2 text-xs leading-relaxed text-neutral-200"
                                                            >
                                                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600/25 text-[10px] font-bold text-red-400">
                                                                    {moduleIndex + 1}
                                                                </span>
                                                                <span>{moduleItem}</span>
                                                            </li>
                                                        ))
                                                    }
                                                </ol>
                                                <p className="mt-2 text-xs italic text-neutral-400">
                                                    {courseItem.moreNote}
                                                </p>
                                            </div>
                                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                                                <span className="text-xs font-medium text-neutral-400">
                                                    {courseItem.priceNote}
                                                </span>
                                                <a
                                                    href="/bookings"
                                                    title={`Book ${courseItem.title}`}
                                                    className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-red-600/30 transition-all hover:bg-red-700 active:scale-95 sm:text-sm"
                                                >
                                                    <span>Book {courseItem.shortLabel}</span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderCoursePricelist = () => {
        // Renders the compact dark 2026 March Updated Course List pricelist with all 21 courses and Durban travel note.
        // Parameters: None.
        // Returns: JSX.Element - The rendered 2026 course pricelist section.
        // Example return: <section id="pricelist" className="my-10 w-full bg-black py-16 text-white">...</section>.

        return (
            <section
                id="pricelist"
                className="my-10 w-full bg-black py-16 text-white"
            >
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2">
                                <span className="h-0.5 w-6 rounded-full bg-red-500" />
                                <h3 className="text-sm font-bold uppercase text-red-500">
                                    2026 March Updated Course List
                                </h3>
                            </div>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                On-Site Short Course <strong className="shimmer-text-red">Pricelist</strong>
                            </h2>
                        </div>
                        <a
                            href="/bookings"
                            title="Request a group training quote from Redseal"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-red-700 active:scale-95 sm:text-sm"
                        >
                            <span>Request Group Quote</span>
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {
                            coursePricelistItems.map((courseRow, rowIndex) => (
                                <div
                                    key={`${courseRow.title}-${rowIndex}`}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-neutral-900/70 px-5 py-3.5 transition-colors hover:border-red-500/40 hover:bg-neutral-900"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-white sm:text-base">
                                            {courseRow.title}
                                        </p>
                                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-400">
                                            <Clock className="h-3.5 w-3.5 text-red-500" />
                                            <span className="capitalize">{courseRow.duration}</span>
                                        </p>
                                    </div>
                                    <span className="shrink-0 rounded-xl bg-white/10 px-3.5 py-1.5 text-sm font-extrabold text-white">
                                        {courseRow.price}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-red-500/25 bg-neutral-900/90 p-5">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                        <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm">
                            <strong className="font-bold text-white">Note:</strong> The above prices include travel costs within the Durban (031) area. Outside the Durban (031) area, a negotiated and agreed travel cost will be charged based on the client&apos;s requirements.
                        </p>
                    </div>
                </div>
            </section>
        );
    };

    const renderServicesCTA = () => {
        // Renders the bottom call-to-action banner prompting visitors to book training or contact Redseal.
        // Parameters: None.
        // Returns: JSX.Element - The rendered services CTA banner section.
        // Example return: <section className="w-full bg-white py-12 sm:py-16">...</section>.

        return (
            <section className="w-full bg-white py-12 sm:py-16">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16">
                        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-800/15 blur-3xl" />
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span>Zero Harm Workplace Safety</span>
                            </span>
                            <h2 className="mt-5 text-2xl font-black tracking-tight leading-tight text-white min-[360px]:text-3xl sm:text-4xl lg:text-5xl">
                                Ready to Elevate Your Workplace Compliance?
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                                Schedule accredited in-premises or external training, an independent OHS compliance audit, or a turnkey site safety file with Redseal today.
                            </p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <a
                                    href="/bookings"
                                    title="Book accredited safety training or consulting with Redseal"
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 active:scale-95 sm:w-auto sm:text-base"
                                >
                                    <Calendar className="h-5 w-5" />
                                    <span>Book Now</span>
                                </a>
                                <a
                                    href="tel:+27842084966"
                                    title="Call Redseal Safety Authority on (+27) 84 208 4966"
                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 active:scale-95 sm:w-auto sm:text-base"
                                >
                                    <Phone className="h-5 w-5" />
                                    <span>Call (+27) 84 208 4966</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <TopNavigation />
            <main className="flex-1 overflow-x-hidden">
                {renderHero()}
                {renderCoreServicesBento()}
                {renderMostRequestedCourses()}
                {renderCoursePricelist()}
                {renderServicesCTA()}
            </main>
            <Footer />
        </div>
    );
}

export default Services;
