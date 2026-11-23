import Lenis from "lenis";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ArrowRight, ArrowUpRight, Biohazard, BookBookmark, BriefcaseMedical, Calendar, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock, Drill, Flame, HardHat, History, Mail, MapPin, Phone, Play, Plus, Quote, Scale, ShieldCheck, Star, Target, Telescope, UserGroup } from "lucide-react";

import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import TopNavigation from "../components/TopNavigation";
import WhatsAppFloatingWidget from "../components/WhatsAppFloatingWidget";
import ScrollToTopFloatingWidget from "../components/ScrollToTopFloatingWidget";

import { redsealContactDetails } from "../contactDetails";

const CAROUSEL_AUTO_CYCLE_MILLISECONDS = 7000;
const CAROUSEL_USER_INTERACTION_PAUSE_MILLISECONDS = 3000;
const TICKER_NORMAL_VELOCITY_PIXELS = 5.0;
const TICKER_DECELERATION_FACTOR = 0.04;
const TICKER_ACCELERATION_FACTOR = 0.04;
const TICKER_PHRASE_SPACING_PIXELS = 80;
const REVIEW_AUTO_CYCLE_MILLISECONDS = 7000;

const tickerPhrases = [
    "ACCREDITED SAFETY TRAINING",
    "SUBJECT MATTER EXPERTS",
    "PROMISED PROFESSIONALISM",
    "RECOGNISED CERTIFICATION",
    "ZERO HARM COMMITMENT"
];
const carouselSlides = [
    {
        imageSource: "src/assets/hero_slide_1.jpg",
        imageAltText: "Safety supervisors inspecting construction blueprints on site",
        description: "Redseal delivers premier accredited occupational health, safety, and compliance training solutions designed to protect your workforce, elevate workplace standards, and ensure full regulatory compliance."
    },
    {
        imageSource: "src/assets/hero_slide_2.jpg",
        imageAltText: "Certified safety technician performing workplace risk assessment",
        description: "From certified First Aid and Fire Fighting courses to Working at Heights and detailed workplace risk assessments, our tailored safety services equip personnel with certified life-saving skills."
    },
    {
        imageSource: "src/assets/hero_slide_3.jpg",
        imageAltText: "Major industrial construction project adhering to safety standards",
        description: "Empowering over 500+ corporate clients, construction sites, and manufacturing operations across South Africa with zero-harm safety cultures, certified audits, and verifiable excellence."
    },
    {
        imageSource: "src/assets/hero_slide_4.jpg",
        imageAltText: "Redseal professional safety consultation team meeting with client",
        description: "Ready to elevate your workplace compliance or schedule custom corporate group training? Contact our certified safety advisors today for prompt quotes and customized safety packages."
    }
];
const statisticsItems = [
    {
        targetValue: 200,
        suffix: "+",
        label: "Projects Completed"
    },
    {
        targetValue: 350,
        suffix: "+",
        label: "Clients Satisfied"
    },
    {
        targetValue: 10,
        suffix: "+",
        label: "Years of Experience"
    },
    {
        targetValue: 50,
        suffix: "+",
        label: "Locations Served"
    }
];
const servicesSnapshotItems = [
    {
        title: "Working At Heights",
        unitStandard: "229998",
        shortTitle: "Working At Heights",
        saqaLink: "https://regqs.saqa.org.za/showUnitStandard.php?id=229998",
        description: "Comprehensive fall arrest, safety harness inspection, ladder safety, and certified high-angle rescue training to ensure full on-site compliance.",
        imageSource: "src/assets/services_snapshot_1.jpg",
        imageAltText: "Working At Heights accredited safety training session",
        Icon: HardHat
    },
    {
        title: "Basic Fire Fighting",
        unitStandard: "12484",
        shortTitle: "Basic Fire Fighting",
        saqaLink: "https://allqs.saqa.org.za/showUnitStandard.php?id=12484",
        description: "Essential workplace fire prevention, emergency evacuation procedures, and hands-on fire extinguisher operation for hazardous environments.",
        imageSource: "src/assets/services_snapshot_2.jpg",
        imageAltText: "Basic Fire Fighting hands-on practical training",
        Icon: Flame
    },
    {
        title: "First Aid Level I",
        unitStandard: "119567",
        shortTitle: "First Aid Level I",
        saqaLink: "https://regqs.saqa.org.za/showUnitStandard.php?id=119567",
        description: "Accredited CPR, trauma management, primary patient care, and emergency medical response certified to Department of Employment and Labour standards.",
        imageSource: "src/assets/services_snapshot_3.jpg",
        imageAltText: "First Aid Level 1, 2 and 3 training and certification",
        Icon: BriefcaseMedical
    },
    {
        title: "Legal Liability",
        unitStandard: "120344",
        shortTitle: "Legal Liability",
        saqaLink: "https://allqs.saqa.org.za/showUnitStandard.php?id=120344",
        description: "Empowering executives, managers, and safety representatives with practical understanding of the Occupational Health and Safety Act and statutory duties.",
        imageSource: "src/assets/services_snapshot_4.webp",
        imageAltText: "Legal Liability and OHS compliance workshop",
        Icon: Scale
    },
    {
        title: "Hazard Identification & Risk Assessment",
        unitStandard: "244383",
        shortTitle: "HIRA",
        saqaLink: "https://allqs.saqa.org.za/showUnitStandard.php?id=244383",
        description: "Methodological hazard identification, qualitative risk evaluation, and actionable control measures to eliminate workplace hazards and prevent incidents.",
        imageSource: "src/assets/services_snapshot_5.jpg",
        imageAltText: "Hazard Identification and Risk Assessment training",
        Icon: Biohazard
    },
    {
        title: "Power Tools",
        unitStandard: "10255",
        shortTitle: "Power Tools",
        saqaLink: "https://regqs.saqa.org.za/showUnitStandard.php?id=10255",
        description: "Comprehensive power tool safety protocols, safe equipment handling, and pre-use inspection to eliminate workplace hazards and prevent incidents.",
        imageSource: "src/assets/services_snapshot_6.jpeg",
        imageAltText: "Power Tools training",
        Icon: Drill
    }
];
const aboutSections = [
    {
        key: "mission",
        Icon: Target,
        title: "Our Mission",
        subtitle: "REDSEAL SAFETY TRAINING INSTITUTION",
        description: "Our mission is to empower individuals and organisations with essential knowledge, practical skills, and confidence to build safer, compliant, and incident-free working environments through industry-leading occupational training.",
        commitment: "Empowering People. Preventing Accidents. Protecting Lives."
    },
    {
        key: "vision",
        Icon: Telescope,
        title: "Our Vision",
        subtitle: "REDSEAL SAFETY TRAINING INSTITUTION",
        description: "To become South Africa's foremost occupational health and safety training institution, recognised for excellence in safety education, professional development, and establishing proactive zero-harm workplace cultures.",
        commitment: "Your Safety. Our Priority. Your Future."
    },
    {
        key: "history",
        Icon: History,
        title: "Our History",
        subtitle: "A DECADE OF SAFETY EXCELLENCE",
        description: "Founded to bridge the critical gap between regulatory compliance and practical life-saving skills, Redseal has grown over a decade of service into a trusted partner with 200+ completed projects and 350+ satisfied clients nationwide.",
        commitment: "A proud heritage of protecting South African workforces."
    }
];
const qualityFeatures = [
    "Excellence in Every Detail",
    "Trusted Expertise, Proven Results",
    "Innovative Solutions Tailored for You",
    "Your Vision, Our Commitment"
];
const teamMembers = [
    {
        name: "Taze Cockman",
        position: "RedSeal CEO",
        imageSource: "src/assets/team_member_ceo.jpg",
        imageAltText: "Taze Cockman, Chief Executive Officer at Redseal",
        isCeo: true
    },
    {
        name: "Sipho Dlamini",
        position: "Head of Training Operations",
        imageSource: "src/assets/team_member_1.jpg",
        imageAltText: "Sipho Dlamini, Head of Training Operations at Redseal",
        isCeo: false
    },
    {
        name: "Marco Pretorius",
        position: "Lead Risk Assessment Auditor",
        imageSource: "src/assets/team_member_2.jpg",
        imageAltText: "Marco Pretorius, Lead Risk Assessment Auditor at Redseal",
        isCeo: false
    },
    {
        name: "Elena Khumalo",
        position: "Compliance & Safety Officer",
        imageSource: "src/assets/team_member_3.jpg",
        imageAltText: "Elena Khumalo, Compliance and Safety Officer at Redseal",
        isCeo: false
    }
];
const customerReviews = [
    {
        name: "Johan Van Zyl",
        position: "SHEQ Director, AngloGold Industrial",
        avatarSource: "src/assets/review_avatar_1.jpg",
        avatarAltText: "Johan Van Zyl, SHEQ Director at AngloGold Industrial",
        rating: 5,
        reviewText: "Redseal has completely transformed the safety culture across our mining operations. Their Working at Heights and Fall Protection certification gave our teams both practical competence and the confidence to operate with zero incidents. An indispensable safety partner!"
    },
    {
        name: "Naledi Sithole",
        position: "Operations Manager, Super Group Logistics",
        avatarSource: "src/assets/review_avatar_2.jpg",
        avatarAltText: "Naledi Sithole, Operations Manager at Super Group Logistics",
        rating: 5,
        reviewText: "The hands-on Fire Fighting and First Aid training provided by Redseal was exceptional. Their instructors are true subject matter experts who tailored the drills to our actual warehouse hazards. They delivered seamless statutory compliance."
    },
    {
        name: "David Richardson",
        position: "Managing Director, Stefanutti Stocks",
        avatarSource: "src/assets/review_avatar_3.jpg",
        avatarAltText: "David Richardson, Managing Director at Stefanutti Stocks",
        rating: 5,
        reviewText: "Outstanding Legal Liability workshop. Redseal demystified the OHS Act for our senior executive team, clarifying statutory appointments and responsibilities. The depth of practical industry knowledge was truly first-class."
    },
    {
        name: "Bongani Cele",
        position: "Safety Lead, WBHO Construction",
        avatarSource: "src/assets/review_avatar_4.jpg",
        avatarAltText: "Bongani Cele, Safety Lead at WBHO Construction",
        rating: 5,
        reviewText: "We have partnered with Redseal across 15+ nationwide construction sites. Their Hazard Identification and Risk Assessment auditing consistently keeps our teams compliant and protected. Truly dedicated to zero harm."
    }
];
const faqCategories = [
    {
        key: "all",
        label: "All FAQs"
    },
    {
        key: "training",
        label: "Accredited Training"
    },
    {
        key: "compliance",
        label: "Legal & Compliance"
    },
    {
        key: "audits",
        label: "Site Audits & Files"
    },
    {
        key: "pricing",
        label: "Bookings & Pricing"
    }
];
const faqQuestions = [
    {
        category: "training",
        question: "What accredited safety training courses does Redseal offer?",
        answer: "We provide comprehensive accredited training across all primary occupational safety areas, including Working at Heights (Fall Protection), Basic & Advanced Fire Fighting, First Aid Levels 1, 2 & 3, Hazard Identification and Risk Assessment (HIRA), Legal Liability, and Construction Safety."
    },
    {
        category: "compliance",
        question: "Are Redseal training certificates legally recognised in South Africa?",
        answer: "Yes. All our training courses and certifications strictly comply with the Occupational Health and Safety (OHS) Act 85 of 1993, relevant SETA requirements, and South African statutory standards for workplace compliance."
    },
    {
        category: "audits",
        question: "Can Redseal conduct on-site safety training at our premises?",
        answer: "Absolutely. We conduct on-site group training at construction sites, mines, manufacturing plants, and corporate facilities nationwide across South Africa, tailored to your operational schedule and specific site hazards."
    },
    {
        category: "training",
        question: "How often do workplace safety certifications need to be renewed?",
        answer: "In accordance with South African occupational safety regulations, First Aid and Fire Fighting certifications typically require refresher training and re-certification every 3 years, while Working at Heights and high-risk certifications may require annual or bi-annual competency renewals."
    },
    {
        category: "audits",
        question: "Do you assist companies with health and safety compliance audits?",
        answer: "Yes. Our team of certified safety professionals provides comprehensive OHS compliance audits, site risk assessments, safety file compilation, and legal liability advisory services to ensure your business remains fully compliant."
    },
    {
        category: "pricing",
        question: "How do I book a training session or request a corporate quote?",
        answer: "You can book directly by contacting our consultation team via our contact form, requesting a quick quote online, or scheduling a 15-minute introductory consultation with our safety advisors."
    },
    {
        category: "compliance",
        question: "What is Legal Liability training and who in our organisation requires it?",
        answer: "Legal Liability (OHS Act Section 16.1 & 16.2) training is essential for directors, executives, project managers, and appointed safety supervisors to understand statutory duties, appointment requirements, and criminal liabilities in workplace incidents."
    },
    {
        category: "training",
        question: "Do learners receive hands-on practical assessments during training?",
        answer: "Yes. All our safety courses combine theoretical knowledge with rigorous hands-on practical simulations, harness inspections, fire extinguisher discharge, and real-world medical emergency scenarios."
    },
    {
        category: "audits",
        question: "What is included in a Redseal Health and Safety File compilation?",
        answer: "A complete client-specific OHS file includes risk assessments, safe work procedures, statutory appointment letters, emergency preparedness plans, inspection registers, and personnel training matrices."
    },
    {
        category: "pricing",
        question: "Do you offer corporate discounts for large team safety training?",
        answer: "Yes. We offer tiered volume rates for corporate groups, enterprise multi-site accounts, and scheduled recurring training calendars across South Africa."
    }
];
function Home() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [animatedStatistics, setAnimatedStatistics] = useState([0, 0, 0, 0]);
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [expandedAboutSection, setExpandedAboutSection] = useState("mission");
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);
    const [selectedFaqCategory, setSelectedFaqCategory] = useState("all");
    const [isPastHero, setIsPastHero] = useState(false);
    const mainReference = useRef(null);
    const heroReference = useRef(null);
    const progressBarReference = useRef(null);
    const isCarouselHoveredReference = useRef(false);
    const timeRemainingInCycleMillisecondsReference = useRef(CAROUSEL_AUTO_CYCLE_MILLISECONDS);
    const userInteractionPauseMillisecondsReference = useRef(0);
    const carouselAnimationFrameReference = useRef(null);
    const lastCarouselTimestampReference = useRef(0);
    const reviewProgressReference = useRef(null);
    const isReviewHoveredReference = useRef(false);
    const reviewTimeRemainingMillisecondsReference = useRef(REVIEW_AUTO_CYCLE_MILLISECONDS);
    const reviewLastTimestampReference = useRef(0);
    const reviewAnimationFrameReference = useRef(null);
    const sliderTrackReference = useRef(null);
    const sliderFirstSetReference = useRef(null);
    const isSliderHoveredReference = useRef(false);
    const sliderPositionReference = useRef(0);
    const sliderVelocityReference = useRef(TICKER_NORMAL_VELOCITY_PIXELS);
    const sliderSingleSetWidthReference = useRef(1400);
    const sliderAnimationFrameReference = useRef(null);
    const statisticsSectionReference = useRef(null);
    const hasAnimatedStatisticsReference = useRef(false);
    const isServicesHoveredReference = useRef(false);
    const servicePauseTimeoutReference = useRef(null);
    const aboutContainerReference = useRef(null);
    const aboutMainImageReference = useRef(null);
    const aboutInsetCardReference = useRef(null);
    const servicesSectionReference = useRef(null);
    const servicesImagesReference = useRef([]);
    const teamSectionReference = useRef(null);
    const teamImagesReference = useRef([]);

    const triggerUserInteractionPause = () => {
        // Temporarily pauses the automatic carousel cycle for three seconds following manual user interaction.
        // Parameters: None.
        // Returns: undefined - Updates timer reference values.
        // Example return: undefined.

        userInteractionPauseMillisecondsReference.current = CAROUSEL_USER_INTERACTION_PAUSE_MILLISECONDS;
        timeRemainingInCycleMillisecondsReference.current = CAROUSEL_AUTO_CYCLE_MILLISECONDS;

        if(progressBarReference.current) progressBarReference.current.style.width = "100%";
    };

    const handleNextSlide = () => {
        // Advances the carousel to the next slide and initiates a three-second pause.
        // Parameters: None.
        // Returns: undefined - Updates slide state.
        // Example return: undefined.

        triggerUserInteractionPause();
        setCurrentSlideIndex(previousSlideIndex => (previousSlideIndex + 1) % carouselSlides.length);
    };

    const handlePreviousSlide = () => {
        // Navigates the carousel to the previous slide and initiates a three-second pause.
        // Parameters: None.
        // Returns: undefined - Updates slide state.
        // Example return: undefined.

        triggerUserInteractionPause();
        setCurrentSlideIndex(previousSlideIndex => (previousSlideIndex - 1 + carouselSlides.length) % carouselSlides.length);
    };

    const handleSelectSlide = (targetSlideIndex) => {
        // Sets the carousel to a specific slide index and initiates a three-second pause.
        // Parameters: targetSlideIndex (number) - The zero-based index of the destination slide.
        // Returns: undefined - Updates slide state.
        // Example return: undefined.

        triggerUserInteractionPause();
        setCurrentSlideIndex(targetSlideIndex);
    };

    const handleCarouselMouseEnter = () => {
        // Pauses the carousel upon mouse entry and resets the transition timer and progress bar.
        // Parameters: None.
        // Returns: undefined - Sets hover reference flag.
        // Example return: undefined.

        isCarouselHoveredReference.current = true;
        timeRemainingInCycleMillisecondsReference.current = CAROUSEL_AUTO_CYCLE_MILLISECONDS;

        if(progressBarReference.current) progressBarReference.current.style.width = "100%";
    };

    const handleCarouselMouseLeave = () => {
        // Resumes the carousel countdown timer upon mouse exit.
        // Parameters: None.
        // Returns: undefined - Resets hover reference flag.
        // Example return: undefined.

        isCarouselHoveredReference.current = false;
        lastCarouselTimestampReference.current = performance.now();
    };

    const handleSliderMouseEnter = () => {
        // Flags the infinite text slider as hovered to trigger gradual deceleration.
        // Parameters: None.
        // Returns: undefined - Updates slider hover reference.
        // Example return: undefined.

        isSliderHoveredReference.current = true;
    };

    const handleSliderMouseLeave = () => {
        // Flags the infinite text slider as unhovered to trigger gradual acceleration back to standard speed.
        // Parameters: None.
        // Returns: undefined - Updates slider hover reference.
        // Example return: undefined.

        isSliderHoveredReference.current = false;
    };

    const handleServiceMouseEnter = (serviceIndex) => {
        // Pauses the automatic services cycle and enlarges the hovered service image.
        // Parameters: serviceIndex (number) - Index of the hovered service item.
        // Returns: undefined - Updates active service state.
        // Example return: undefined.

        if(servicePauseTimeoutReference.current) clearTimeout(servicePauseTimeoutReference.current);

        isServicesHoveredReference.current = true;
        setActiveServiceIndex(serviceIndex);
    };

    const handleServiceMouseLeave = () => {
        // Resumes the automatic services cycle after a brief pause.
        // Parameters: None.
        // Returns: undefined - Clears and resets hover timeout.
        // Example return: undefined.

        if(servicePauseTimeoutReference.current) clearTimeout(servicePauseTimeoutReference.current);

        servicePauseTimeoutReference.current = setTimeout(() => {
            isServicesHoveredReference.current = false;
        }, 3000);
    };

    const handleToggleAboutSection = (sectionKey) => {
        // Toggles the expansion state of an about accordion section.
        // Parameters: sectionKey (string) - The unique key of the about section to toggle.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        setExpandedAboutSection(previousSectionKey => (previousSectionKey === sectionKey ? null : sectionKey));
    };

    const resetReviewProgress = () => {
        // Restarts the review timer and clears the shared navigation progress border.
        // Parameters: None.
        // Returns: undefined.
        // Example return: undefined.

        reviewTimeRemainingMillisecondsReference.current = REVIEW_AUTO_CYCLE_MILLISECONDS;
        reviewLastTimestampReference.current = performance.now();
        reviewProgressReference.current?.setAttribute("stroke-dashoffset", "100");
    };

    const handleNextReview = () => {
        // Advances the customer review carousel to the next card and resets cycle progress.
        // Parameters: None.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        resetReviewProgress();
        setCurrentReviewIndex(previousReviewIndex => (previousReviewIndex + 1) % customerReviews.length);
    };

    const handlePreviousReview = () => {
        // Navigates the customer review carousel to the previous card and resets cycle progress.
        // Parameters: None.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        resetReviewProgress();
        setCurrentReviewIndex(previousReviewIndex => (previousReviewIndex - 1 + customerReviews.length) % customerReviews.length);
    };

    const handleSelectReview = (targetReviewIndex) => {
        // Sets the customer review carousel to a specific review index and resets cycle progress.
        // Parameters: targetReviewIndex (number) - The review index to activate.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        resetReviewProgress();
        setCurrentReviewIndex(targetReviewIndex);
    };

    const handleReviewMouseEnter = () => {
        // Pauses the customer review carousel cycle when the user hovers over a review card.
        // Parameters: None.
        // Returns: undefined - Updates reference.
        // Example return: undefined.

        isReviewHoveredReference.current = true;
    };

    const handleReviewMouseLeave = () => {
        // Resumes the customer review carousel cycle when the user leaves a review card.
        // Parameters: None.
        // Returns: undefined - Updates reference.
        // Example return: undefined.

        isReviewHoveredReference.current = false;
        reviewLastTimestampReference.current = performance.now();
    };

    const handleToggleFaq = (targetIndex) => {
        // Toggles the expansion state of a frequently asked question item.
        // Parameters: targetIndex (number) - The index of the FAQ to toggle.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        setExpandedFaqIndex(previousIndex => (previousIndex === targetIndex ? null : targetIndex));
    };

    const handleSelectFaqCategory = (categoryKey) => {
        // Updates the active FAQ category filter and resets the expanded accordion index.
        // Parameters: categoryKey (string) - The unique key of the selected FAQ category.
        // Returns: undefined - Updates state.
        // Example return: undefined.

        setSelectedFaqCategory(categoryKey);
        setExpandedFaqIndex(0);
    };

    useLayoutEffect(() => {
        // Tracks the first viewport entry of each marked homepage element.
        // Parameters: None.
        // Returns: A cleanup function when IntersectionObserver is available.
        // Example return: () => revealObserver.disconnect().

        if(!window.IntersectionObserver) return;

        const revealElements = mainReference.current.querySelectorAll("[data-home-reveal], [data-hero-icons]");
        const revealObserver = new IntersectionObserver((entries, observer) => {
            // Shows each observed element once it enters the viewport.
            // Parameters: entries (IntersectionObserverEntry[]), observer (IntersectionObserver).
            // Returns: undefined.
            // Example return: undefined.

            for(const entry of entries) {
                if(!entry.isIntersecting) continue;

                entry.target.dataset.revealed = "true";
                observer.unobserve(entry.target);
            }
        });

        for(const element of revealElements) {
            element.dataset.revealed = "false";
            revealObserver.observe(element);
        }

        return () => revealObserver.disconnect();
    }, []);

    useEffect(() => {
        // Keeps the floating widgets in sync with the hero's position on screen.
        // Parameters: None.
        // Returns: A cleanup function that removes the listeners.
        // Example return: () => window.removeEventListener("scroll", updateHeroVisibility).

        const updateHeroVisibility = () => {
            // Checks whether the bottom of the hero has passed the top of the viewport.
            // Parameters: None.
            // Returns: undefined.
            // Example return: undefined.

            setIsPastHero(heroReference.current.getBoundingClientRect().bottom <= 0);
        };

        updateHeroVisibility();
        window.addEventListener("scroll", updateHeroVisibility, {
            passive: true
        });
        window.addEventListener("resize", updateHeroVisibility);

        return () => {
            window.removeEventListener("scroll", updateHeroVisibility);
            window.removeEventListener("resize", updateHeroVisibility);
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis();
        let animationFrameId = null;

        const handleRaf = (time) => {
            // Feeds frame timing updates to the Lenis smooth scroll engine.
            // Parameters: time (number) - Current requestAnimationFrame timestamp.
            // Returns: undefined - Updates scroll state.
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
        let currentAboutInsetOffset = 0;
        let targetAboutInsetOffset = 0;
        let currentAboutMainOffset = 0;
        let targetAboutMainOffset = 0;
        let currentServicesOffset = 0;
        let targetServicesOffset = 0;
        let currentTeamOffset = 0;
        let targetTeamOffset = 0;
        let parallaxAnimationFrameId = null;

        const updateParallaxFrame = () => {
            // Calculates scroll progress and applies smooth parallax translations to about, services, and team imagery.
            // Parameters: None.
            // Returns: undefined - Updates element transform styles.
            // Example return: undefined.

            const windowHeight = window.innerHeight;

            if(aboutContainerReference.current) {
                const rect = aboutContainerReference.current.getBoundingClientRect();

                if(rect.bottom > 0 && rect.top < windowHeight) {
                    const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (windowHeight + rect.height), 0), 1);

                    targetAboutInsetOffset = (progress - 0.5) * 2 * 60;
                    targetAboutMainOffset = (progress - 0.5) * -70;
                }
            }

            if(servicesSectionReference.current) {
                const rect = servicesSectionReference.current.getBoundingClientRect();

                if(rect.bottom > 0 && rect.top < windowHeight) {
                    const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (windowHeight + rect.height), 0), 1);

                    targetServicesOffset = (progress - 0.5) * -70;
                }
            }

            if(teamSectionReference.current) {
                const rect = teamSectionReference.current.getBoundingClientRect();

                if(rect.bottom > 0 && rect.top < windowHeight) {
                    const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (windowHeight + rect.height), 0), 1);

                    targetTeamOffset = (progress - 0.5) * -50;
                }
            }

            currentAboutInsetOffset += (targetAboutInsetOffset - currentAboutInsetOffset) * 0.1;
            currentAboutMainOffset += (targetAboutMainOffset - currentAboutMainOffset) * 0.1;
            currentServicesOffset += (targetServicesOffset - currentServicesOffset) * 0.1;
            currentTeamOffset += (targetTeamOffset - currentTeamOffset) * 0.1;

            if(aboutInsetCardReference.current) {
                aboutInsetCardReference.current.style.transform = `translateY(calc(-50% + ${currentAboutInsetOffset}px))`;
            }

            if(aboutMainImageReference.current) {
                aboutMainImageReference.current.style.transform = `scale(1.15) translateY(${currentAboutMainOffset}px)`;
            }

            servicesImagesReference.current.forEach(imageElement => {
                if(imageElement) imageElement.style.transform = `scale(1.15) translateY(${currentServicesOffset}px)`;
            });

            teamImagesReference.current.forEach(imageElement => {
                if(imageElement) imageElement.style.transform = `scale(1.15) translateY(${currentTeamOffset}px)`;
            });

            parallaxAnimationFrameId = requestAnimationFrame(updateParallaxFrame);
        };

        parallaxAnimationFrameId = requestAnimationFrame(updateParallaxFrame);

        return () => {
            if(parallaxAnimationFrameId) cancelAnimationFrame(parallaxAnimationFrameId);
        };
    }, []);

    useEffect(() => {
        lastCarouselTimestampReference.current = performance.now();

        const updateCarouselFrame = (currentTimestamp) => {
            // Updates the carousel countdown timer, calculates progress bar width, and triggers transitions.
            // Parameters: currentTimestamp (number) - High-resolution DOMHighResTimeStamp from requestAnimationFrame.
            // Returns: undefined - Updates progress bar style and triggers slide advancement.
            // Example return: undefined.

            const deltaTimeMilliseconds = currentTimestamp - lastCarouselTimestampReference.current;

            lastCarouselTimestampReference.current = currentTimestamp;

            if(isCarouselHoveredReference.current) {
                if(progressBarReference.current) progressBarReference.current.style.width = "100%";
            }
            else if(userInteractionPauseMillisecondsReference.current > 0) {
                userInteractionPauseMillisecondsReference.current -= deltaTimeMilliseconds;

                if(progressBarReference.current) progressBarReference.current.style.width = "100%";
            }
            else {
                timeRemainingInCycleMillisecondsReference.current -= deltaTimeMilliseconds;

                const progressFraction = Math.max(0, Math.min(1, timeRemainingInCycleMillisecondsReference.current / CAROUSEL_AUTO_CYCLE_MILLISECONDS));
                const progressPercentageValue = progressFraction * 100;

                if(progressBarReference.current) progressBarReference.current.style.width = `${progressPercentageValue}%`;

                if(timeRemainingInCycleMillisecondsReference.current <= 0) {
                    timeRemainingInCycleMillisecondsReference.current = CAROUSEL_AUTO_CYCLE_MILLISECONDS;

                    if(progressBarReference.current) progressBarReference.current.style.width = "100%";

                    setCurrentSlideIndex(previousSlideIndex => (previousSlideIndex + 1) % carouselSlides.length);
                }
            }

            carouselAnimationFrameReference.current = requestAnimationFrame(updateCarouselFrame);
        };

        carouselAnimationFrameReference.current = requestAnimationFrame(updateCarouselFrame);

        return () => {
            if(carouselAnimationFrameReference.current) cancelAnimationFrame(carouselAnimationFrameReference.current);
        };
    }, []);

    useEffect(() => {
        const updateSliderDimensions = () => {
            // Measures the bounding client width of a single phrase set for seamless wrapping.
            // Parameters: None.
            // Returns: undefined - Caches pixel width to sliderSingleSetWidthReference.
            // Example return: undefined.

            if(sliderFirstSetReference.current) {
                const measuredWidth = sliderFirstSetReference.current.getBoundingClientRect().width;

                if(measuredWidth > 0) {
                    sliderSingleSetWidthReference.current = measuredWidth;
                    sliderPositionReference.current = sliderPositionReference.current % measuredWidth;
                }
            }
        };

        updateSliderDimensions();

        window.addEventListener("resize", updateSliderDimensions);

        const updateSliderFrame = () => {
            // Calculates smooth acceleration or deceleration physics and translates the infinite text slider.
            // Parameters: None.
            // Returns: undefined - Applies transform matrix to slider DOM node.
            // Example return: undefined.

            const targetVelocity = isSliderHoveredReference.current ? 0.0 : TICKER_NORMAL_VELOCITY_PIXELS;
            const velocityDelta = targetVelocity - sliderVelocityReference.current;
            const accelerationFactor = isSliderHoveredReference.current ? TICKER_DECELERATION_FACTOR : TICKER_ACCELERATION_FACTOR;

            sliderVelocityReference.current += velocityDelta * accelerationFactor;
            sliderPositionReference.current += sliderVelocityReference.current;

            if(sliderPositionReference.current >= sliderSingleSetWidthReference.current) sliderPositionReference.current -= sliderSingleSetWidthReference.current;

            if(sliderTrackReference.current) {
                const translationX = sliderPositionReference.current - sliderSingleSetWidthReference.current;

                sliderTrackReference.current.style.transform = `translate3d(${translationX}px, 0, 0)`;
            }

            sliderAnimationFrameReference.current = requestAnimationFrame(updateSliderFrame);
        };

        sliderAnimationFrameReference.current = requestAnimationFrame(updateSliderFrame);

        return () => {
            window.removeEventListener("resize", updateSliderDimensions);

            if(sliderAnimationFrameReference.current) cancelAnimationFrame(sliderAnimationFrameReference.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                if(entry.isIntersecting && !hasAnimatedStatisticsReference.current) {
                    hasAnimatedStatisticsReference.current = true;

                    const animationDurationMilliseconds = 5000;
                    const startTimestamp = performance.now();

                    const animateStatisticsNumbers = (currentTimestamp) => {
                        // Animates the counting numbers from 0 up to their respective target values.
                        // Parameters: currentTimestamp (number) - High-resolution DOMHighResTimeStamp from requestAnimationFrame.
                        // Returns: undefined - Updates animatedStatistics state array.
                        // Example return: undefined.

                        const elapsedMilliseconds = currentTimestamp - startTimestamp;
                        const progressFraction = Math.min(1, elapsedMilliseconds / animationDurationMilliseconds);
                        const easeOutProgress = 1 - Math.pow(1 - progressFraction, 3);

                        setAnimatedStatistics([
                            Math.round(easeOutProgress * statisticsItems[0].targetValue),
                            Math.round(easeOutProgress * statisticsItems[1].targetValue),
                            Math.round(easeOutProgress * statisticsItems[2].targetValue),
                            Math.round(easeOutProgress * statisticsItems[3].targetValue)
                        ]);

                        if(progressFraction < 1) requestAnimationFrame(animateStatisticsNumbers);
                    };

                    requestAnimationFrame(animateStatisticsNumbers);
                }
            },
            {
                threshold: 0.2
            }
        );

        if(statisticsSectionReference.current) observer.observe(statisticsSectionReference.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const servicesAutoPlayInterval = setInterval(() => {
            if(!isServicesHoveredReference.current) {
                setActiveServiceIndex(previousIndex => (previousIndex + 1) % servicesSnapshotItems.length);
            }
        }, 4000);

        return () => {
            clearInterval(servicesAutoPlayInterval);

            if(servicePauseTimeoutReference.current) clearTimeout(servicePauseTimeoutReference.current);
        };
    }, []);

    useEffect(() => {
        reviewLastTimestampReference.current = performance.now();

        const updateReviewFrame = (currentTimestamp) => {
            // Animates the customer review countdown timer and cycles to next review when expired
            // Parameters: currentTimestamp (number) - High-resolution timestamp from requestAnimationFrame.
            // Returns: undefined.
            // Example return: undefined.

            const deltaTimeMilliseconds = currentTimestamp - reviewLastTimestampReference.current;

            reviewLastTimestampReference.current = currentTimestamp;

            if(!isReviewHoveredReference.current) {
                reviewTimeRemainingMillisecondsReference.current -= deltaTimeMilliseconds;

                if(reviewTimeRemainingMillisecondsReference.current <= 0) {
                    resetReviewProgress();
                    setCurrentReviewIndex(previousReviewIndex => (previousReviewIndex + 1) % customerReviews.length);
                }
                else {
                    const remainingPercent = (reviewTimeRemainingMillisecondsReference.current / REVIEW_AUTO_CYCLE_MILLISECONDS) * 100;

                    reviewProgressReference.current?.setAttribute("stroke-dashoffset", String(remainingPercent));
                }
            }

            reviewAnimationFrameReference.current = requestAnimationFrame(updateReviewFrame);
        };

        reviewAnimationFrameReference.current = requestAnimationFrame(updateReviewFrame);

        return () => {
            if(reviewAnimationFrameReference.current) cancelAnimationFrame(reviewAnimationFrameReference.current);
        };
    }, []);

    const renderCarouselViewport = () => {
        // Renders the carousel viewport containing sliding images with slow zoom, inset full-width descriptions, in-image navigation, and the bottom progress bar.
        // Parameters: None.
        // Returns: JSX.Element - The rendered hero carousel viewport element.
        // Example return: <div className="relative aspect-[16/11]...">...</div>.

        return (
            <div
                onMouseEnter={handleCarouselMouseEnter}
                onMouseLeave={handleCarouselMouseLeave}
                className="relative aspect-[16/11] h-[25rem] w-full min-w-0 overflow-hidden rounded-xl bg-neutral-900 shadow-xl sm:aspect-[16/10]"
            >
                <div
                    className="flex h-full w-full transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlideIndex * 100}%)`
                    }}
                >
                    {
                        carouselSlides.map((slideItem, slideIndex) => {
                            const isSelected = currentSlideIndex === slideIndex;

                            return (
                                <div
                                    key={`${slideItem.imageAltText}-${slideIndex}`}
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                                    <div className="absolute right-4 bottom-5 left-4 z-10 sm:right-6 sm:bottom-6 sm:left-6">
                                        <div className="w-full rounded-xl border border-white/15 bg-neutral-900/80 p-3.5 shadow-lg backdrop-blur-md sm:p-4">
                                            <p className="text-xs leading-relaxed text-white sm:text-sm">
                                                {slideItem.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="absolute top-4 left-4 z-20 flex select-none flex-col items-center justify-between gap-2.5 rounded-full border border-white/20 bg-neutral-900/70 p-1.5 text-white shadow-xl backdrop-blur-md sm:top-5 sm:left-5 sm:gap-3 sm:p-2">
                    <button
                        type="button"
                        title="Next image in carousel"
                        onClick={handleNextSlide}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 hover:text-white active:scale-95 sm:h-9 sm:w-9"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="flex flex-col items-center gap-2 py-0.5">
                        {
                            carouselSlides.map((slideItem, slideIndex) => {
                                const isSelected = currentSlideIndex === slideIndex;

                                return (
                                    <button
                                        key={`carousel-indicator-${slideIndex}`}
                                        type="button"
                                        title={`Navigate to slide ${slideIndex + 1}`}
                                        onClick={() => handleSelectSlide(slideIndex)}
                                        className={`rounded-full transition-all duration-300 ${isSelected ? "h-2.5 w-2.5 bg-red-600 ring-2 ring-red-400 ring-offset-1 ring-offset-neutral-900 scale-110" : "h-2 w-2 bg-white/40 hover:bg-white hover:scale-125"}`}
                                    />
                                );
                            })
                        }
                    </div>
                    <button
                        type="button"
                        title="Previous image in carousel"
                        onClick={handlePreviousSlide}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-red-600 hover:text-white active:scale-95 sm:h-9 sm:w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-20 h-1 bg-neutral-900/40 backdrop-blur-xs">
                    <div
                        ref={progressBarReference}
                        className="h-full bg-red-600 transition-none"
                        style={{
                            width: "100%"
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderHeroInformationColumn = () => {
        // Renders the static information column on the right of the carousel with custom border and action buttons.
        // Parameters: None.
        // Returns: JSX.Element - The rendered hero information column element.
        // Example return: <div className="flex flex-col...">...</div>.

        return (
            <div className="flex flex-col justify-between space-y-6 sm:space-y-8 lg:py-2">
                <div
                    data-home-reveal=""
                    className="flex gap-3 sm:gap-4"
                >
                    <div className="w-[0.2rem] flex-shrink-0 rounded-full bg-red-600" />
                    <p className="text-base tracking-tighter leading-relaxed text-neutral-700 sm:text-md">
                        Our safety is our mission. RedSeal Safety Authority provides accredited training and consulting solutions that prepare teams to prevent risks, respond effectively, and create a culture of safety across industries.
                    </p>
                </div>
                <div className="flex items-center gap-3.5">
                    {/* <img
                        src="src/assets/hero_avatars.jpg"
                        alt="Redseal accredited safety specialists and trainers"
                        className="h-10 w-auto rounded-full object-contain"
                    /> */}
                    <div className="flex flex-col flex-wrap gap-3 min-[480px]:flex-row min-[480px]:items-center">
                        <div className="flex flex-col text-base font-bold text-neutral-900 min-[360px]:text-[1.25rem]">
                            <p>Training & consulting,</p>
                            <p>the professional way</p>
                        </div>
                        <ul
                            data-hero-icons=""
                            aria-hidden="true"
                            className="flex shrink-0 items-center -space-x-5 sm:-space-x-6"
                        >
                            {
                                [
                                    BriefcaseMedical,
                                    Flame,
                                    Drill,
                                    HardHat,
                                    UserGroup
                                ].map((Icon, index) => (
                                    <li
                                        key={`hero-accreditation-icon-${index}`}
                                        className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-red-500 text-black min-[360px]:h-14 min-[360px]:w-14 sm:h-16 sm:w-16"
                                        style={{
                                            animationDelay: `${index * 85}ms`,
                                            zIndex: 10 - index
                                        }}
                                    >
                                        <Icon className="h-5 w-5 min-[360px]:h-6 min-[360px]:w-6 sm:h-7 sm:w-7" />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div
                    data-home-reveal=""
                    className="flex flex-wrap items-center gap-4 pt-1"
                >
                    <a
                        href="/contact"
                        title="Book accredited safety training with Redseal"
                        className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
                    >
                        Book Now
                    </a>
                    <a
                        href="tel:+27842084966"
                        title="Call Redseal safety team at (+27) 84 208 4966"
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3.5 text-base font-semibold text-neutral-800 shadow-xs transition-all hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 active:scale-95"
                    >
                        Call Us
                    </a>
                </div>
            </div>
        );
    };

    const renderInfiniteTextSlider = () => {
        // Renders the full-width ticker beneath the hero that scrolls text infinitely from left to right.
        // Parameters: None.
        // Returns: JSX.Element - The rendered infinite text slider ticker element.
        // Example return: <div className="relative w-full...">...</div>.

        const phraseSets = [0, 1, 2, 3];

        return (
            <div
                onMouseEnter={handleSliderMouseEnter}
                onMouseLeave={handleSliderMouseLeave}
                className="relative w-full overflow-hidden border-y border-neutral-200 bg-neutral-50 py-4 select-none"
                style={{
                    maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)",
                    WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)"
                }}
            >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent sm:w-40" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent sm:w-40" />
                <div
                    ref={sliderTrackReference}
                    className="flex whitespace-nowrap will-change-transform"
                >
                    {
                        phraseSets.map((setIdentifier, index) => (
                            <div
                                key={`${setIdentifier}-${index}`}
                                ref={setIdentifier === 0 ? sliderFirstSetReference : null}
                                className="flex items-center"
                            >
                                {
                                    tickerPhrases.map((phraseText, phraseIndex) => (
                                        <div
                                            key={`${setIdentifier}-${phraseIndex}`}
                                            className="flex items-center"
                                            style={{
                                                marginRight: `${TICKER_PHRASE_SPACING_PIXELS}px`
                                            }}
                                        >
                                            <span className="text-[8rem] font-black tracking-widest text-neutral-400 uppercase">
                                                {phraseText}
                                            </span>
                                            <span
                                                className="h-4 w-4 rounded-full bg-neutral-400"
                                                style={{
                                                    marginLeft: `${TICKER_PHRASE_SPACING_PIXELS / 2}px`
                                                }}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    };

    const renderHero = () => {
        // Renders the hero heading, safety training carousel, and scrolling ticker.
        // Parameters: None.
        // Returns: JSX.Element.
        // Example return: <section>...</section>.

        return (
            <section
                ref={heroReference}
                className="w-full bg-white pt-6 pb-12 sm:pt-4 sm:pb-16"
            >
                <div className="mx-auto px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="mb-8 sm:mb-6"
                    >
                        <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-600">
                            <span
                                aria-hidden="true"
                                className="h-0.5 w-6 rounded-full bg-red-500"
                            />
                            Accredited Safety Training & Consulting
                        </p>
                        <h1 className="max-w-5xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-neutral-950 min-[360px]:text-4xl sm:text-5xl lg:text-6xl">
                            Train for the Risk. <strong className="shimmer-text-red">Work with Confidence.</strong>
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                        <div
                            data-home-reveal=""
                            className="w-full min-w-0 lg:col-span-7"
                        >
                            {renderCarouselViewport()}
                        </div>
                        <div className="w-full min-w-0 lg:col-span-5">
                            {renderHeroInformationColumn()}
                        </div>
                    </div>
                </div>
                <div className="mt-12 sm:mt-16">
                    {renderInfiniteTextSlider()}
                </div>
            </section>
        );
    };

    const renderStatisticsAndIntro = () => {
        // Renders the introductory mission paragraph and animated statistics section.
        // Parameters: None.
        // Returns: JSX.Element - The rendered statistics and intro section element.
        // Example return: <section className="w-full bg-white py-8">...</section>.

        return (
            <section
                ref={statisticsSectionReference}
                className="w-full bg-white py-8"
            >
                <div className="mx-auto max-w-5xl px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <p
                        data-home-reveal=""
                        className="text-center text-base font-medium text-neutral-600 min-[360px]:text-lg sm:text-xl lg:text-[1.5rem]"
                    >
                        At RedSeal, we are committed to revolutionising the training and consulting industry with innovative, sustainable, and professional solutions. With a proven track record of delivering exception projects, we combine{" "}
                        <span className="font-bold text-red-600">
                            state-of-the-art technology, skilled expertise, and customer-centric approaches to bring visions to life.
                        </span>
                    </p>
                    <div
                        data-home-reveal=""
                        className="mt-8 grid grid-cols-2 gap-4 text-center min-[360px]:gap-8 sm:mt-12 md:grid-cols-4 md:gap-12"
                    >
                        {
                            statisticsItems.map((statItem, index) => (
                                <div
                                    key={`${statItem.label}-${index}`}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-3xl font-black tracking-tight text-neutral-900 min-[360px]:text-4xl sm:text-5xl">
                                        {`${animatedStatistics[index]}${statItem.suffix}`}
                                    </span>
                                    <span className="mt-2 text-xs font-medium text-neutral-800 min-[360px]:text-sm sm:text-base">
                                        {statItem.label}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        );
    };

    const renderAbout = () => {
        // Renders overlapping company imagery and the mission, vision, and history accordion.
        // Parameters: None.
        // Returns: JSX.Element - The rendered about section element.
        // Example return: <section className="w-full bg-white py-16 sm:py-20">...</section>.

        return (
            <section className="home-surface w-full bg-neutral-50 py-16 sm:py-20">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
                    >
                        <div className="max-w-2xl">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 rounded-full bg-red-500"></span>
                                    <h3 className="uppercase text-red-500 text-sm font-bold">How we work</h3>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                    Learn About <strong className="shimmer-text-red">Our Company</strong>
                                </h2>
                            </div>
                            <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                                With years of experience in the occupational health, safety, and compliance industry, we specialise in delivering high-quality, accredited, and sustainable solutions tailored to the unique needs of our clients.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <a
                                href="about"
                                title="Learn more about Redseal"
                                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-lg active:scale-95"
                            >
                                <span>Learn More</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
                        <div
                            ref={aboutContainerReference}
                            data-home-reveal=""
                            className="pb-8 sm:pb-10 lg:col-span-5 lg:pb-0 xl:col-span-5"
                        >
                            <div className="group relative">
                                <div className="pointer-events-none absolute -top-8 -left-8 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />
                                <div className="relative overflow-hidden rounded-3xl border border-neutral-100 shadow-2xl">
                                    <img
                                        ref={aboutMainImageReference}
                                        src="src/assets/about_blueprints.jpg"
                                        alt="Safety consultant inspecting technical blueprints on site"
                                        className="h-[24rem] w-full object-cover will-change-transform sm:h-[30rem] lg:h-[34rem]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                                    <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5 rounded-full border border-white/30 bg-neutral-950/80 px-4 py-2 text-white shadow-xl backdrop-blur-md">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wider">
                                            Accredited Safety Experts
                                        </span>
                                    </div>
                                </div>
                                <div
                                    ref={aboutInsetCardReference}
                                    style={{
                                        top: "50%",
                                        transform: "translateY(-50%)"
                                    }}
                                    className="absolute -right-3 w-3/5 overflow-hidden rounded-3xl border-4 border-white shadow-2xl will-change-transform min-[360px]:-right-4 sm:-right-6 sm:w-1/2 sm:border-8"
                                >
                                    <div className="group/inset relative overflow-hidden">
                                        <img
                                            src="src/assets/about_inspectors.jpg"
                                            alt="Redseal safety inspectors collaborating on site"
                                            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover/inset:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-xl border border-white/40 bg-white/95 px-3 py-1 shadow-md backdrop-blur-xs min-[360px]:left-4">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-bold text-neutral-900">
                                                10+ Yrs Field Experience
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            data-home-reveal=""
                            className="flex min-w-0 flex-col gap-4 lg:col-span-7 xl:col-span-7"
                        >
                            {
                                aboutSections.map(aboutSection => {
                                    const isExpanded = expandedAboutSection === aboutSection.key;
                                    const headingId = `about-${aboutSection.key}-heading`;
                                    const panelId = `about-${aboutSection.key}-panel`;

                                    return (
                                        <article
                                            key={aboutSection.key}
                                            className={`overflow-hidden rounded-2xl border transition-colors ${
                                                isExpanded ?
                                                "border-red-200 bg-white shadow-lg shadow-red-950/5" :
                                                "border-neutral-200 bg-white/80 hover:border-red-200"
                                            }`}
                                        >
                                            <h3>
                                                <button
                                                    id={headingId}
                                                    type="button"
                                                    title={`Explore ${aboutSection.title.toLowerCase()}`}
                                                    aria-expanded={isExpanded}
                                                    aria-controls={panelId}
                                                    onClick={() => handleToggleAboutSection(aboutSection.key)}
                                                    className="group flex w-full items-center gap-4 px-4 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-500 sm:px-6"
                                                >
                                                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                                        isExpanded ? "bg-red-600 text-white" : "bg-red-50 text-red-600 group-hover:bg-red-100"
                                                    }`}>
                                                        <aboutSection.Icon className="size-5" />
                                                    </span>
                                                    <span className="flex-1 text-lg font-bold tracking-tight text-neutral-950 sm:text-xl">
                                                        {aboutSection.title}
                                                    </span>
                                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                                                        <ChevronDown className={`size-4 transition-transform motion-reduce:transition-none ${isExpanded ? "rotate-180" : ""}`} />
                                                    </span>
                                                </button>
                                            </h3>
                                            <div
                                                id={panelId}
                                                aria-labelledby={headingId}
                                                aria-hidden={!isExpanded}
                                                role="region"
                                                className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${
                                                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="mx-4 border-t border-red-100 px-2 pt-5 pb-6 sm:mx-6 sm:px-3">
                                                        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                                                            <span className="h-0.5 w-5 shrink-0 rounded-full bg-red-500" />
                                                            {aboutSection.subtitle}
                                                        </p>
                                                        <p className="text-base leading-relaxed text-neutral-700">
                                                            {aboutSection.description}
                                                        </p>
                                                        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">
                                                            {aboutSection.commitment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            }
                            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="flex items-center gap-2.5 rounded-2xl border border-neutral-200/70 bg-neutral-50/60 p-3.5">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </span>
                                    <span className="text-xs font-bold text-neutral-800">
                                        SETA & OHS Act Aligned
                                    </span>
                                </div>
                                <div className="flex items-center gap-2.5 rounded-2xl border border-neutral-200/70 bg-neutral-50/60 p-3.5">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </span>
                                    <span className="text-xs font-bold text-neutral-800">
                                        Nationwide Delivery
                                    </span>
                                </div>
                                <div className="flex items-center gap-2.5 rounded-2xl border border-neutral-200/70 bg-neutral-50/60 p-3.5">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </span>
                                    <span className="text-xs font-bold text-neutral-800">
                                        Certified Instructors
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderServicesSnapshot = () => {
        // Renders the animated expanding services snapshot carousel, course highlights, and corporate consultation call-to-action block.
        // Parameters: None.
        // Returns: JSX.Element - The rendered services snapshot section element.
        // Example return: <section className="home-surface-dark my-10 w-full bg-neutral-950 py-16 text-white sm:py-12">...</section>.

        return (
            <section
                ref={servicesSectionReference}
                className="home-surface-dark my-10 w-full bg-neutral-950 py-16 text-white sm:py-12"
            >
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="mb-10 flex items-center flex-wrap"
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-0.5 rounded-full bg-red-500"></span>
                                <h2 className="text-red-500 uppercase text-sm font-bold">Services Snapshot</h2>
                            </div>
                            <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl font-bold mb-4 sm:gap-6 text-white">
                                Safety Training & Consulting, <strong className="shimmer-text-red">Tailored to You</strong>
                            </h1>
                        </div>
                        <p className="text-sm min-[360px]:text-base font-medium text-neutral-200 sm:text-sm lg:text-[1.25rem] max-w-5xl">At Redseal, we provide a wide range of safety training and consulting services to help you meet your compliance requirements.</p>
                    </div>
                    <div
                        data-home-reveal=""
                        className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12"
                    >
                        <div className="order-2 flex h-[48rem] w-full flex-col gap-3 overflow-hidden rounded-lg sm:h-[52rem] lg:order-1 lg:col-span-8 lg:h-[30rem] lg:flex-row xl:col-span-9">
                            {
                                servicesSnapshotItems.map((serviceItem, serviceIndex) => {
                                    const isSelected = activeServiceIndex === serviceIndex;

                                    return (
                                        <div
                                            key={serviceItem.title}
                                            onMouseEnter={() => handleServiceMouseEnter(serviceIndex)}
                                            onMouseLeave={handleServiceMouseLeave}
                                            onFocus={() => handleServiceMouseEnter(serviceIndex)}
                                            onBlur={event => {
                                                // Resumes the rotation after focus leaves this service card.
                                                // Parameters: event (React.FocusEvent) - The card's blur event.
                                                // Returns: undefined.
                                                // Example return: undefined.

                                                if(!event.currentTarget.contains(event.relatedTarget)) handleServiceMouseLeave();
                                            }}
                                            className={`home-service-card relative min-w-0 overflow-hidden rounded-xl transition-[flex] duration-700 ease-in-out motion-reduce:transition-none ${isSelected ? "flex-[3.5] sm:flex-[4] lg:flex-[4.5]" : "flex-1"}`}
                                        >
                                            <img
                                                ref={element => {
                                                    servicesImagesReference.current[serviceIndex] = element;
                                                }}
                                                src={serviceItem.imageSource}
                                                alt={serviceItem.imageAltText}
                                                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                                            />
                                            <div className={`absolute inset-0 transition-colors duration-700 ${isSelected ? "bg-gradient-to-t from-black via-black/50 to-black/15" : "bg-black/60"}`} />
                                            <button
                                                type="button"
                                                title={`Show ${serviceItem.shortTitle}`}
                                                aria-pressed={isSelected}
                                                onClick={() => handleServiceMouseEnter(serviceIndex)}
                                                className="absolute inset-0 flex items-center justify-center text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-red-400"
                                            >
                                                <serviceItem.Icon className={`size-5 transition-opacity ${isSelected ? "opacity-0" : "opacity-100"}`} />
                                            </button>
                                            <div
                                                inert={!isSelected}
                                                className={`home-service-content pointer-events-none absolute inset-0 flex min-w-0 flex-col items-start justify-between transition-opacity motion-reduce:transition-none ${
                                                    isSelected ? "opacity-100 delay-150 duration-300" : "opacity-0"
                                                }`}
                                            >
                                                <a
                                                    href="/services"
                                                    title={`Schedule ${serviceItem.shortTitle}`}
                                                    className="home-service-booking pointer-events-auto flex max-w-full items-center self-end rounded-full bg-white font-bold text-neutral-950 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-500"
                                                >
                                                    <serviceItem.Icon className="home-service-booking-icon shrink-0 text-red-600" />
                                                    <span className="min-w-0 truncate">Schedule {serviceItem.shortTitle}</span>
                                                </a>
                                                <div className="w-full min-w-0">
                                                    <a
                                                        href={serviceItem.saqaLink}
                                                        title={`View SAQA unit standard for ${serviceItem.title}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pointer-events-auto block w-fit max-w-full transition-colors hover:text-red-400 focus-visible:outline-2 focus-visible:outline-red-500"
                                                    >
                                                        <h3 className="home-service-title truncate font-extrabold tracking-tight">
                                                            {serviceItem.shortTitle}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-red-300">
                                                            Unit standard {serviceItem.unitStandard}
                                                        </span>
                                                    </a>
                                                    <p className="home-service-description mt-1.5 max-w-lg text-neutral-200">
                                                        {serviceItem.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="relative order-1 flex min-h-[16rem] flex-col justify-between home-surface-dark rounded-xl border border-white/10 bg-neutral-900 p-8 text-white sm:p-8 lg:order-2 lg:col-span-4 lg:min-h-full xl:col-span-3">
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="max-w-sm pr-10 text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl">
                                    Take a look at our full catalogue
                                </h2>
                                <a
                                    href="services"
                                    title="Explore all Redseal safety services"
                                    className="absolute top-6 right-6 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 shadow-md transition-transform hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
                                >
                                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                                </a>
                            </div>
                            <div className="pt-8">
                                <a
                                    href="services"
                                    title="View all Redseal safety training and consulting services"
                                    className="text-xs font-bold uppercase tracking-widest text-white underline underline-offset-8 transition-colors hover:text-red-500 sm:text-sm"
                                >
                                    VIEW ALL SERVICES
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div
                            data-home-reveal=""
                            className="home-surface-dark rounded-2xl border border-white/10 bg-neutral-900 p-6"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-white">
                                Accredited Training
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                                Certified qualifications adhering to the South African Occupational Health and Safety Act and SAQA unit standards.
                            </p>
                        </div>
                        <div
                            data-home-reveal=""
                            className="home-surface-dark rounded-2xl border border-white/10 bg-neutral-900 p-6"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                                <Scale className="h-6 w-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-white">
                                Regulatory Compliance
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                                Mitigation audits, statutory legal compliance advisory, and Department of Employment and Labour alignment.
                            </p>
                        </div>
                        <div
                            data-home-reveal=""
                            className="home-surface-dark rounded-2xl border border-white/10 bg-neutral-900 p-6"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                                <HardHat className="h-6 w-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-white">
                                On-Site & Nationwide
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                                Delivered at your operating facilities, plants, yards, or construction sites across all 9 provinces in South Africa.
                            </p>
                        </div>
                        <div
                            data-home-reveal=""
                            className="home-surface-dark rounded-2xl border border-white/10 bg-neutral-900 p-6"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-white">
                                Digital Verifications
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                                Rapid digital certificate generation and tamper-proof verification for streamlined workplace safety audits.
                            </p>
                        </div>
                    </div>
                    <div
                        data-home-reveal=""
                        className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/15 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-red-950/40 p-6 sm:flex-row sm:p-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                Need a Custom Corporate Safety Plan?
                            </h3>
                            <p className="mt-1 text-sm text-neutral-300">
                                We structure bespoke risk assessments, toolbox talks, and tiered training schedules for enterprise teams.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href="/contact"
                                title="Request a corporate consultation"
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-red-700 active:scale-95"
                            >
                                <span>Request Consultation</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="services"
                                title="Explore full course catalog"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 active:scale-95"
                            >
                                <span>View Course Catalog</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderQualityShowcase = () => {
        // Renders the quality showcase section with feature highlights and video overview preview

        return (
            <section className="w-full bg-white py-16 sm:py-20">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="flex flex-col items-start lg:col-span-7 xl:col-span-6">
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                Quality That Speaks for Itself
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
                                Our craftsmanship and attention to detail are evident in every project, ensuring long-lasting results that reflect our commitment to excellence. We let our work stand as a testament to our dedication to quality.
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:gap-5">
                                {
                                    qualityFeatures.map((featureItem, featureIndex) => (
                                        <div
                                            key={`${featureItem}-${featureIndex}`}
                                            className="flex items-center gap-3.5"
                                        >
                                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </span>
                                            <span className="text-base font-semibold text-neutral-800 sm:text-lg">
                                                {featureItem}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-10">
                                <a
                                    href="about"
                                    title="Learn more about Redseal quality standards"
                                    className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-5 xl:col-span-6">
                            <div className="group relative overflow-hidden rounded-3xl shadow-xl">
                                <img
                                    src="src/assets/quality_showcase.jpg"
                                    alt="Occupational safety engineers reviewing project blueprints and technical reports"
                                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-neutral-950/20 transition-opacity duration-300 group-hover:bg-neutral-950/30" />
                                <button
                                    type="button"
                                    title="Watch quality overview video"
                                    className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-800/85 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 sm:h-20 sm:w-20"
                                >
                                    <Play className="ml-1 h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderTeam = () => {
        // Renders the key leadership and team members section featuring executive showcase and social profiles.
        // Parameters: None.
        // Returns: JSX.Element - The rendered team showcase section element.
        // Example return: <section className="w-full bg-white">...</section>.

        return (
            <section
                ref={teamSectionReference}
                className="w-full bg-white"
            >
                <div className="mx-auto w-full pt-10 px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
                    >
                        <div className="max-w-3xl">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 rounded-full bg-red-500"></span>
                                    <h3 className="text-red-500 uppercase text-sm font-bold">Meet the Team</h3>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                    <strong className="shimmer-text-red">Crafting Excellence</strong> as a Team
                                </h2>
                            </div>
                            <div className="mt-4 flex items-stretch gap-3">
                                <div className="w-1 flex-shrink-0 rounded-full bg-red-600 translate-y-[1px]" />
                                <p className="text-sm text-neutral-600 sm:text-base">
                                    Our success is built on the dedication and expertise of our team who work together to bring innovative ideas and exceptional craftsmanship to every project. Together, we turn visions into reality.
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <a
                                href="/contact"
                                title="Get in touch with the Redseal leadership team"
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                            >
                                <span>Get In Touch</span>
                                <ArrowUpRight className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-end">
                        {
                            teamMembers.map((teamMemberItem, teamMemberIndex) => {
                                return (
                                    <div
                                        key={`${teamMemberItem.name}-${teamMemberIndex}`}
                                        data-home-reveal=""
                                        className={`flex flex-col ${teamMemberItem.isCeo ? "lg:flex-[1.4]" : "lg:flex-1"}`}
                                    >
                                        <div className={`group relative w-full overflow-hidden rounded-xl bg-neutral-100 shadow-md ${teamMemberItem.isCeo ? "h-[19rem] sm:h-[21rem] lg:h-[22rem]" : "h-[16rem] sm:h-[18rem] lg:h-[18rem]"}`}>
                                            <img
                                                ref={element => {
                                                    teamImagesReference.current[teamMemberIndex] = element;
                                                }}
                                                src={teamMemberItem.imageSource}
                                                alt={teamMemberItem.imageAltText}
                                                className="h-full w-full object-cover brightness-75 will-change-transform"
                                            />
                                            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                                                <a
                                                    href="https://facebook.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`Visit ${teamMemberItem.name} on Facebook`}
                                                    aria-label={`${teamMemberItem.name} on Facebook`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-colors hover:bg-red-600 hover:text-white active:scale-95"
                                                >
                                                    <svg
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="-5 0 20 20"
                                                        version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g
                                                            stroke="none"
                                                            strokeWidth="1"
                                                            fill="none"
                                                            fillRule="evenodd"
                                                        >
                                                            <g
                                                                transform="translate(-385.000000, -7399.000000)"
                                                                fill="currentColor"
                                                            >
                                                                <g transform="translate(56.000000, 160.000000)">
                                                                    <path
                                                                        d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                                                                    />
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </a>
                                                <a
                                                    href="https://x.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`Visit ${teamMemberItem.name} on X`}
                                                    aria-label={`${teamMemberItem.name} on X`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md transition-colors hover:bg-red-600 hover:text-white active:scale-95"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 30 30"
                                                        width="16px"
                                                        height="16px"
                                                    >
                                                        <path
                                                            d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </a>
                                                <a
                                                    href="https://instagram.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={`Visit ${teamMemberItem.name} on Instagram`}
                                                    aria-label={`${teamMemberItem.name} on Instagram`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-colors hover:bg-red-700 active:scale-95"
                                                >
                                                    <svg
                                                        width="16px"
                                                        height="16px"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                                                {teamMemberItem.name}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-neutral-500">
                                                {teamMemberItem.position}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        );
    };

    const renderCustomerReviews = () => {
        // Renders the customer reviews section with interactive review carousel, rating stars, and visual cycle progress indicator.
        // Parameters: None.
        // Returns: JSX.Element - The rendered customer reviews section element.
        // Example return: <section className="w-full bg-white pt-24">...</section>.

        return (
            <section className="w-full bg-white pt-24">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div
                            data-home-reveal=""
                            className="flex flex-col items-start lg:col-span-5"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 rounded-full bg-red-500"></span>
                                    <h3 className="text-red-500 uppercase text-sm font-bold">Client Feedback</h3>
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                                    Our Customers <strong className="shimmer-text-red">Love What We Do</strong>
                                </h2>
                            </div>
                            <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
                                Our clients trust our safety programs and compliance consulting! Read their reviews to discover how we help organisations eliminate risks, train workforces, and build incident-free cultures across South Africa.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <a
                                    href="/contact"
                                    title="Book safety training with Redseal"
                                    className="flex items-center gap-3 items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                                >
                                    Book Training
                                    <BookBookmark className="w-5 h-5" />
                                </a>
                                <a
                                    href="services"
                                    title="Explore all Redseal accredited safety services"
                                    className="inline-flex items-center justify-center rounded-xl border border-neutral-400/80 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                                >
                                    Explore Services
                                </a>
                            </div>
                        </div>
                        <div
                            data-home-reveal=""
                            className="flex min-w-0 flex-col lg:col-span-7"
                        >
                            <div className="mb-4 flex justify-end">
                                <div className="relative flex h-12 w-27 items-center justify-center gap-1.5 rounded-full bg-white shadow-sm">
                                    <svg
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0"
                                        width="108"
                                        height="48"
                                        viewBox="0 0 108 48"
                                    >
                                        <path
                                            d="M54 1 H84 A23 23 0 0 1 84 47 H24 A23 23 0 0 1 24 1 Z"
                                            className="stroke-neutral-200"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                        <path
                                            ref={reviewProgressReference}
                                            d="M54 1 H84 A23 23 0 0 1 84 47 H24 A23 23 0 0 1 24 1 Z"
                                            className="stroke-red-600"
                                            strokeWidth="2"
                                            fill="none"
                                            pathLength="100"
                                            strokeDasharray="100"
                                            strokeDashoffset="100"
                                        />
                                    </svg>
                                    <button
                                        type="button"
                                        onClick={handlePreviousReview}
                                        title="Previous customer review"
                                        className="relative flex size-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500 active:scale-95"
                                    >
                                        <ChevronLeft className="size-5" />
                                    </button>
                                    <span
                                        aria-hidden="true"
                                        className="h-5 w-px bg-neutral-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleNextReview}
                                        title="Next customer review"
                                        className="relative flex size-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500 active:scale-95"
                                    >
                                        <ChevronRight className="size-5" />
                                    </button>
                                </div>
                            </div>
                            <div
                                onMouseEnter={handleReviewMouseEnter}
                                onMouseLeave={handleReviewMouseLeave}
                                className="home-surface overflow-hidden rounded-xl bg-neutral-50"
                            >
                                <div
                                    className="flex transition-transform duration-700 ease-in-out motion-reduce:transition-none"
                                    style={{
                                        transform: `translateX(-${currentReviewIndex * 100}%)`
                                    }}
                                >
                                    {
                                        customerReviews.map((reviewItem, reviewIndex) => (
                                            <div
                                                key={`${reviewItem.name}-${reviewIndex}`}
                                                className="w-full flex-shrink-0"
                                            >
                                                <div className="flex min-h-[22rem] flex-col justify-between rounded-xl bg-white/35 p-8 shadow-sm transition-all sm:min-h-[20rem] sm:p-10 lg:p-12">
                                                    <div>
                                                        <Quote className="text-red-500 fill-current" />
                                                        <p className="text-base font-medium leading-relaxed text-neutral-800 sm:text-lg lg:text-xl">
                                                            {reviewItem.reviewText}
                                                        </p>
                                                    </div>
                                                    <div className="mt-8 flex flex-col justify-between gap-4 border-t border-neutral-200/60 pt-6 sm:flex-row sm:items-center">
                                                        <div className="flex items-center gap-4">
                                                            <img
                                                                src={reviewItem.avatarSource}
                                                                alt={reviewItem.avatarAltText}
                                                                className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm sm:h-14 sm:w-14"
                                                            />
                                                            <div>
                                                                <h4 className="text-base font-bold text-neutral-900 sm:text-lg">
                                                                    {reviewItem.name}
                                                                </h4>
                                                                <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                                                                    {reviewItem.position}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 self-start sm:self-center">
                                                            <div className="flex items-center gap-1 text-amber-500">
                                                                {
                                                                    [...Array(reviewItem.rating)].map((_, starIndex) => (
                                                                        <Star
                                                                            key={`star-${reviewIndex}-${starIndex}`}
                                                                            className="h-4 w-4 fill-amber-500 text-amber-500 sm:h-5 sm:w-5"
                                                                        />
                                                                    ))
                                                                }
                                                            </div>
                                                            <span className="ml-1.5 text-sm font-bold text-neutral-800">
                                                                5.0
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-center">
                                {
                                    customerReviews.map((reviewItem, reviewIndex) => {
                                        const isActive = currentReviewIndex === reviewIndex;

                                        return (
                                            <button
                                                key={`review-indicator-${reviewIndex}`}
                                                type="button"
                                                onClick={() => handleSelectReview(reviewIndex)}
                                                title={`Switch to review by ${reviewItem.name}`}
                                                className="group flex items-center focus:outline-none"
                                            >
                                                {
                                                    isActive ?
                                                    (
                                                        <div className="p-2">
                                                            <div className="h-2.5 w-16 overflow-hidden bg-red-500 rounded-full transition-all duration-700"></div>
                                                        </div>
                                                    ) :
                                                    (
                                                        <div className="p-2">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-neutral-400 transition-all duration-700 group-hover:bg-neutral-400 hover:scale-150" />
                                                        </div>
                                                    )
                                                }
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderFaq = () => {
        // Renders the frequently asked questions accordion section and advisor consultation booking card.
        // Parameters: None.
        // Returns: JSX.Element - The rendered FAQ section element.
        // Example return: <section className="w-full bg-white py-14">...</section>.

        const displayedFaqQuestions = selectedFaqCategory === "all" ?
            faqQuestions :
            faqQuestions.filter(faqQuestionItem => faqQuestionItem.category === selectedFaqCategory);

        return (
            <section className="w-full bg-white py-14 sm:py-20 lg:py-24">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                        <div
                            data-home-reveal=""
                            className="flex flex-col items-start lg:col-span-5"
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-red-500 rounded-full"></span>
                                    <h3 className="text-sm font-bold text-red-500 uppercase">General Inquiries</h3>
                                </div>
                            </div>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 min-[360px]:text-3xl sm:text-4xl lg:text-5xl">
                                Frequently Asked Questions
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                                Everything you need to know about our accredited training, compliance certification, and safety auditing.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8">
                                {
                                    faqCategories.map((categoryItem, categoryIndex) => {
                                        const isSelected = selectedFaqCategory === categoryItem.key;

                                        return (
                                            <button
                                                key={`faq-category-${categoryItem.key}-${categoryIndex}`}
                                                type="button"
                                                onClick={() => handleSelectFaqCategory(categoryItem.key)}
                                                title={`Filter FAQs by ${categoryItem.label}`}
                                                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 min-[360px]:text-sm ${
                                                    isSelected ?
                                                    "bg-neutral-950 text-white shadow-sm ring-1 ring-neutral-950" :
                                                    "border border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50"
                                                }`}
                                            >
                                                {categoryItem.label}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                            <div className="home-surface relative mt-8 w-full overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-50 p-6 shadow-xl shadow-neutral-100 min-[360px]:p-8">
                                <div className="relative mb-5 flex items-center">
                                    <div className="absolute w-40 -inset-2 rounded-full bg-red-100/70 blur-md" />
                                    <img
                                        src="src/assets/review_avatar_1.jpg"
                                        alt="Redseal Senior Safety Advisor"
                                        className="relative h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm min-[360px]:h-20 min-[360px]:w-20"
                                    />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-neutral-900 min-[360px]:text-2xl">
                                    Book a 15 min call
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-neutral-600 min-[360px]:text-base">
                                    If you have any questions, just book a 15-minute call with us before subscribing
                                </p>
                                <button
                                    type="button"
                                    title="Book a free 15-minute consultation call with Redseal advisors"
                                    className="mt-6 w-full rounded-full bg-red-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-red-600/40 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 min-[360px]:text-base"
                                >
                                    Book a Free Call!
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:col-span-7">
                            {
                                displayedFaqQuestions.map((faqItem, faqIndex) => {
                                    const isExpanded = expandedFaqIndex === faqIndex;

                                    return (
                                        <div
                                            key={`faq-question-item-${faqItem.category}-${faqIndex}`}
                                            className="overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/70 transition-all duration-300 hover:border-neutral-200"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleToggleFaq(faqIndex)}
                                                title={`Toggle answer for: ${faqItem.question}`}
                                                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors min-[360px]:p-6"
                                            >
                                                <span className="text-base font-semibold text-neutral-900 sm:text-lg">
                                                    {faqItem.question}
                                                </span>
                                                <span
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-transform duration-300 ${
                                                        isExpanded ? "rotate-45 text-red-600" : ""
                                                    }`}
                                                >
                                                    <Plus className="h-5 w-5" />
                                                </span>
                                            </button>
                                            <div
                                                className={`grid transition-all duration-300 ease-in-out ${
                                                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 min-[360px]:px-6 min-[360px]:pb-6 sm:text-base">
                                                        {faqItem.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderContact = () => {
        // Renders the contact section featuring headquarters details, inquiry submission form, and Google Maps location iframe.
        // Parameters: None.
        // Returns: JSX.Element - The rendered contact section element.
        // Example return: <section className="w-full border-t border-neutral-200/60 bg-neutral-50/70 py-14">...</section>.

        return (
            <section
                id="contact"
                className="home-surface w-full border-t border-neutral-200/60 bg-neutral-50 py-14 sm:py-20 lg:py-24"
            >
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="mb-12 max-w-3xl"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-0.5 w-6 rounded-full bg-red-500" />
                            <h3 className="text-sm font-bold uppercase text-red-500">
                                Contact & Headquarters
                            </h3>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                            Visit Our HQ or <strong className="shimmer-text-red">Reach Our Safety Team</strong>
                        </h2>
                        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
                            Have questions about compliance audits or ready to schedule accredited safety training for your workforce? Connect with our safety advisors today.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
                        <div className="flex flex-col justify-between gap-8 lg:col-span-7">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <MapPin className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                            Headquarters Location
                                        </h4>
                                        <p className="mt-1 text-sm font-semibold text-neutral-900">
                                            {redsealContactDetails.address}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            KwaZulu-Natal, South Africa
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <Phone className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                            Phone Consultation
                                        </h4>
                                        <a
                                            href="tel:+27842084966"
                                            title="Call Redseal Headquarters"
                                            className="mt-1 block text-sm font-semibold text-neutral-900 transition-colors hover:text-red-600"
                                        >
                                            {redsealContactDetails.phone}
                                        </a>
                                        <p className="text-xs text-neutral-500">
                                            Direct advisory line
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                            Email Support
                                        </h4>
                                        <a
                                            href="mailto:marketing@redsealsa.com"
                                            title="Email Redseal Headquarters"
                                            className="mt-1 block text-sm font-semibold text-neutral-900 transition-colors hover:text-red-600"
                                        >
                                            {redsealContactDetails.email}
                                        </a>
                                        <p className="text-xs text-neutral-500">
                                            Fast response guaranteed
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-xs">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <Clock className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                            Operating Hours
                                        </h4>
                                        <p className="mt-1 text-sm font-semibold text-neutral-900">
                                            {redsealContactDetails.hours}
                                        </p>
                                        <p className="text-xs text-neutral-500">
                                            Weekend training on request
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ContactForm />
                        </div>
                        <div className="flex flex-col lg:col-span-5">
                            <div className="relative flex h-full min-h-[400px] w-full flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-md">
                                <iframe
                                    src={redsealContactDetails.mapEmbed}
                                    title="Google Map location of Redseal Safety Authority Headquarters in Westville, South Africa"
                                    className="h-full min-h-[380px] w-full flex-1 border-0"
                                    loading="lazy"
                                    allowFullScreen
                                />
                                <div className="border-t border-neutral-200 bg-white p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                                        <MapPin className="h-4 w-4 text-red-600" />
                                        <span>{redsealContactDetails.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    const renderHomeCTA = () => {
        // Renders the call-to-action banner section prompting users to book an appointment or contact Redseal.
        // Parameters: None.
        // Returns: JSX.Element - The rendered CTA banner section.
        // Example return: <section className="w-full bg-white pb-16">...</section>.

        return (
            <section className="w-full bg-white pb-16 sm:pb-24">
                <div className="mx-auto w-full px-3 min-[360px]:px-4 sm:px-6 lg:px-8">
                    <div
                        data-home-reveal=""
                        className="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-12 text-white shadow-2xl sm:px-12 sm:py-16 lg:px-16 lg:py-20"
                    >
                        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-red-800/15 blur-3xl" />
                        <div className="relative z-10 mx-auto max-w-4xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                                Zero Harm Workplace Safety
                            </span>
                            <h2 className="mt-6 text-2xl font-black tracking-tight text-white min-[360px]:text-3xl sm:text-4xl lg:text-5xl leading-tight">
                                Empower Your Teams. Prevent Incidents. Protect Lives.
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-neutral-300 min-[360px]:text-base sm:text-lg">
                                Partner with South Africa's trusted safety training and compliance authority. Ensure statutory compliance, reduce operational risks, and foster an uncompromising culture of safety.
                            </p>
                            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                                <a
                                    href="/contact"
                                    title="Book an appointment for accredited safety training"
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:bg-red-700 hover:shadow-red-600/50 active:scale-95 sm:w-auto min-[360px]:text-base"
                                >
                                    <Calendar className="h-5 w-5" />
                                    <span>Book an Appointment</span>
                                </a>
                                <a
                                    href="/contact"
                                    title="Contact Redseal safety consultants and advisors"
                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-xs transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95 sm:w-auto min-[360px]:text-base"
                                >
                                    <Phone className="h-5 w-5" />
                                    <span>Contact Redseal</span>
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
            <main
                ref={mainReference}
                className="flex-1 overflow-x-hidden"
            >
                {renderHero()}
                {renderStatisticsAndIntro()}
                {renderAbout()}
                {renderServicesSnapshot()}
                {/* {renderQualityShowcase()} */}
                {renderTeam()}
                {renderCustomerReviews()}
                {renderFaq()}
                {renderContact()}
                {renderHomeCTA()}
            </main>
            <Footer />
            <WhatsAppFloatingWidget raised={isPastHero} />
            <ScrollToTopFloatingWidget isVisible={isPastHero} />
        </div>
    );
}

export default Home;
