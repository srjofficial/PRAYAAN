import { ReactNode } from "react";
import { Keyboard, Globe, Sparkles, MessageSquare, Map, Dices, Music, Clapperboard } from "lucide-react";

export type EventData = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    icon: ReactNode;
    date?: string;
    time?: string;
    venue?: string;
    registrationFee?: string;
    ieeeFee?: string;
    nonIeeeFee?: string;
    feeLabel?: string;
    prizePool?: string;
    rules?: ReactNode[];
    minTeamSize?: number;
    maxTeamSize?: number;
    isOnSpot?: boolean;
    qrCode?: string;
};

export const eventsData: Record<string, EventData> = {
    "blind-typing": {
        id: "blind-typing",
        title: "Blind Typing Competition",
        subtitle: "Type without seeing. Focus. Accuracy. Speed.",
        description: "Put your typing skills to the test! The Blind Typing Competition is an individual competition where participants type a given passage without seeing the keyboard. The competition rewards typing accuracy, speed, focus, and independent performance.",
        image: "/images/events/sourcecode.png",
        icon: <Keyboard className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "MCA LAB-2",
        reportingTime: "11:00 AM",
        registrationFee: "40",
        feeLabel: "per participant",
        prizePool: "1500",
        minTeamSize: 1,
        maxTeamSize: 1,
        qrCode: "/images/qr/blind-typing.jpeg",
        rules: [
            <span key="format"><strong>Format:</strong> Individual competition &nbsp;|&nbsp; <strong>Total Time:</strong> 8 Minutes &nbsp;|&nbsp; <strong>Rounds:</strong> 2</span>,
            <span key="round1"><strong>Round 1 — Preliminary (5 minutes):</strong> Participants type the given passage with the keyboard covered. Performance is assessed based on typing accuracy and speed.</span>,
            <span key="round2"><strong>Round 2 — Final (3 minutes):</strong> Qualifying participants compete in the final round, typing a new passage independently with the keyboard covered.</span>,
            <span key="r1"><strong>Keyboard Cover:</strong> The keyboard will be covered with a shield so participants cannot see keys while typing. Lifting, shifting, or adjusting the cover is strictly prohibited.</span>,
            <span key="r2"><strong>Independent Effort:</strong> Participants must type the passage independently without any external assistance or notes.</span>,
            <span key="r3"><strong>Evaluation Criteria:</strong> Evaluated on Typing Speed (amount typed in allotted time), Accuracy (correctness of text), and Rule Compliance.</span>,
            <span key="r4"><strong>Disqualification:</strong> Any attempt to cheat, adjust the cover, or violate competition directives will result in immediate disqualification.</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹40 per participant</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹1,500 total — First: ₹1,000 | Second: ₹500</span>
        ]
    },
    "website-60": {
        id: "website-60",
        title: "Website in 60 Minutes",
        subtitle: "Build Fast, Build Fierce",
        description: "Design and deploy a complete, functional website in just 60 minutes. From layout to logic, every second counts. Show the world what you can build under pressure.",
        image: "/images/events/vision.png",
        icon: <Globe className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "MCA LAB-3",
        reportingTime: "9:30 AM",
        registrationFee: "100",
        feeLabel: "per team (2 members)",
        prizePool: "3750",
        minTeamSize: 2,
        maxTeamSize: 2,
        qrCode: "/images/qr/website-60.jpeg",
        rules: [
            <span key="1"><strong>Team Formation:</strong> Exactly 2 members per team. Both members must participate together throughout the event.</span>,
            <span key="2"><strong>Duration & Topic:</strong> Competition lasts exactly 60 minutes. The website topic will be announced at the start.</span>,
            <span key="3"><strong>Internet Access:</strong> Internet access is available ONLY for the first 15 minutes of the competition.</span>,
            <span key="4"><strong>Permitted Technologies:</strong> HTML, CSS, JavaScript, and either Bootstrap or Tailwind CSS.</span>,
            <span key="5"><strong>Permitted AI Tools:</strong> ChatGPT, Google Gemini, and Claude (subject to organizer guidelines).</span>,
            <span key="6"><strong>Originality:</strong> Each team must create their own website from scratch. Copying or unauthorized assistance is strictly prohibited.</span>,
            <span key="7"><strong>Design Standards:</strong> Website must feature a clean layout, readable content, and a user-friendly, responsive design.</span>,
            <span key="8"><strong>Submission & Demo:</strong> Work must be submitted within the 60-minute limit (no late submissions). Each team must demonstrate their website to the judges.</span>,
            <span key="9"><strong>Regulations:</strong> Technical issues must be reported immediately to coordinators. The judges&apos; decision will be final and binding.</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹100 per team (2 members)</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹3,750 total — First: ₹2,000 | Second: ₹1,000 | Third: ₹750</span>
        ]
    },
    "ai-prompt-engineering": {
        id: "ai-prompt-engineering",
        title: "AI Prompt Engineering",
        subtitle: "Command the Machine",
        description: "Master the art of talking to AI. Craft precise, creative, and effective prompts to guide AI models toward achieving specific goals. The sharpest minds craft the sharpest prompts.",
        image: "/images/events/aiprompt.jpg",
        icon: <Sparkles className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "MCA Lab–1",
        reportingTime: "10:30 AM",
        registrationFee: "50",
        feeLabel: "per participant",
        prizePool: "3500",
        minTeamSize: 1,
        maxTeamSize: 1,
        qrCode: "/images/qr/ai-prompt-engineering.jpeg",
        rules: [
            <span key="1"><strong>Participation:</strong> Individual event. Each participant competes independently and must create their own outputs.</span>,
            <span key="2"><strong>Round 1 — AI Image Generation (10 mins):</strong> Generate an image using Gemini Nano Banana based on the task brief provided by the organizers. Judging will focus on creativity, originality, and alignment with the brief.</span>,
            <span key="3"><strong>Round 2 — Advanced AI Image Creation (15 mins):</strong> Generate a second image using the AI image-generation tool specified by the organizers, based on a new task brief announced at the competition. Judging will focus on prompt effectiveness, creativity, visual quality, and relevance to the brief.</span>,
            <span key="4"><strong>Permitted Tools:</strong> Use only tools and free features permitted by organizers. Paid/pro features are prohibited.</span>,
            <span key="5"><strong>Time Limits & Submission:</strong> Each round must be strictly completed within the allotted time; work must be ready to present/submit when time is called.</span>,
            <span key="6"><strong>Integrity:</strong> Copying another participant&apos;s prompts/work or using unauthorized external assistance will result in disqualification.</span>,
            <span key="7"><strong>Judging Criteria:</strong> Evaluated on Creativity (originality), Prompt Effectiveness (clarity of communication to AI), Quality (finish and clarity), Relevance (brief fidelity), and Time Management.</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹50 per participant</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹3,500 total — First: ₹2,000 | Second: ₹1,000 | Third: ₹500</span>
        ]
    },
    "tech-charades": {
        id: "tech-charades",
        title: "Tech Charades",
        subtitle: "MCA Tech Fest",
        description: "Guess the tech term, algorithm, or gadget from your teammate's acting alone — no speaking allowed! A hilarious, fast-paced fusion of technology and charades.",
        image: "/images/events/quirkquest.jpeg",
        icon: <MessageSquare className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "MCA S1A",
        reportingTime: "10:30 AM",
        registrationFee: "100",
        feeLabel: "per team",
        prizePool: "3500",
        minTeamSize: 2,
        maxTeamSize: 2,
        qrCode: "/images/qr/tech-charades.jpeg",
        rules: [
            <span key="1"><strong>Term Set:</strong> Each team will be given a set of technical terms to guess.</span>,
            <span key="2"><strong>Time Limit:</strong> Each team will be given a maximum of 7 minutes for the entire game session.</span>,
            <span key="3"><strong>Gameplay:</strong> During these 7 minutes, one team member must act out the given technical terms while the other team member guesses the answers.</span>,
            <span key="4"><strong>Role Switch:</strong> Team members may switch roles during the session, if permitted by the event coordinators.</span>,
            <span key="5"><strong>Objective:</strong> Each team must act out and guess as many technical terms as possible within the 7-minute time limit.</span>,
            <span key="6"><strong>Non-Verbal Only:</strong> Speaking, spelling, lip-syncing, or writing letters and words while acting is strictly prohibited.</span>,
            <span key="7"><strong>Allowed Actions:</strong> Participants may use gestures, facial expressions, and body movements to communicate the terms.</span>,
            <span key="8"><strong>Scoring:</strong> Each correctly guessed technical term will count as one point. Incorrect or skipped terms will not receive points.</span>,
            <span key="9"><strong>Skip Rule:</strong> Once a term is skipped, it cannot be attempted again unless permitted by the event coordinators.</span>,
            <span key="10"><strong>Fair Play:</strong> The use of mobile phones, the internet, or any external assistance is prohibited.</span>,
            <span key="11"><strong>Final Authority:</strong> The decisions of the judges and event coordinators will be final.</span>,
            <span key="fee"><strong>Registration Fee:</strong> &#x20B9;100 per team</span>,
            <span key="prize"><strong>Prize Pool:</strong> &#x20B9;3,500 total &#x2014; First: &#x20B9;2,000 | Second: &#x20B9;1,000 | Third: &#x20B9;500</span>
        ]
    },
    "treasure-hunt": {
        id: "treasure-hunt",
        title: "Tech Mystery Hunt",
        subtitle: "Treasure Hunt",
        description: "Navigate the campus following a trail of cryptic clues, technical riddles, ciphers, and physical checkpoints. The sharpest team to crack every puzzle and reach the final destination wins.",
        image: "/images/events/treasurehunt.jpg",
        icon: <Map className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "Campus Premises",
        reportingTime: "9:15 AM",
        registrationFee: "150",
        feeLabel: "per team",
        prizePool: "6000",
        minTeamSize: 2,
        maxTeamSize: 3,
        qrCode: "/images/qr/treasure-hunt.jpeg",
        rules: [
            <span key="1"><strong>Team Formation:</strong> Each team consists of 2–3 members with a unique Team ID. Team members must stay together throughout the hunt.</span>,
            <span key="2"><strong>Team Phone Protocol:</strong> Exactly ONE designated mobile phone is permitted per team (for QR scanning, official event portal, audio/video clues, answer submission, and hint requests).</span>,
            <span key="3"><strong>Phone Deposit:</strong> All other personal mobile phones must be deposited with organizers before the game starts.</span>,
            <span key="4"><strong>AI & Search Prohibition:</strong> Using Google Search, ChatGPT, Gemini, other AI tools, social media, messaging apps, or external help via the Team Phone is strictly prohibited.</span>,
            <span key="5"><strong>Mission Start:</strong> The game and timer begin strictly when organizers announce &ldquo;MISSION START&rdquo;. Collect the Mission File / Starter Kit beforehand.</span>,
            <span key="6"><strong>QR Code Integrity:</strong> QR codes must not be moved, covered, damaged, hidden, copied, or tampered with. Scan only official event codes.</span>,
            <span key="7"><strong>Checkpoint Protocol:</strong> Visit only permitted campus locations; restricted areas are strictly off-limits. Follow volunteer instructions.</span>,
            <span key="8"><strong>Challenge Types:</strong> Ciphers, logic puzzles, audio/image clues, coding/debugging tasks, physical evidence collection, and final code-breaking.</span>,
            <span key="9"><strong>Hint System:</strong> Each team receives 3 Hint Tokens. Each requested hint carries a 5-point penalty. Tokens cannot be transferred.</span>,
            <span key="10"><strong>Safety & Conduct:</strong> No running in crowded areas; climbing walls, roofs, gates, or trees is forbidden; do not disrupt classes, staff, or other college activities.</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹150 per team</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹6,000 total — First: ₹3,000 | Second: ₹2,000 | Third: ₹1,000</span>
        ]
    },
    "fun-games": {
        id: "fun-games",
        title: "Fun Games",
        subtitle: "Endless Games, Endless Madness",
        description: "A vibrant collection of fun games, quirky challenges, and light-hearted competitions. Jump in, play hard, and enjoy the chaos — this one's for everyone!",
        image: "/images/events/fun.png",
        icon: <Dices className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "Smart Class Room",
        reportingTime: "10:00 AM",
        registrationFee: "20",
        feeLabel: "per game (Pay on Spot)",
        prizePool: "3000",
        minTeamSize: 1,
        maxTeamSize: 1,
        isOnSpot: true,
        rules: [
            <span key="fee"><strong>Registration Fee:</strong> ₹20 per game (All 5 Games Pass: ₹100)</span>,
            <span key="1"><strong>Participation:</strong> On-Spot Walk-In Entry — Open to all individuals and teams (no advance online registration needed).</span>,
            <span key="2"><strong>Format:</strong> 5 exciting mini-game stations testing accuracy, balance, coordination, air currents, and speed.</span>,
            <span key="3"><strong>Game Selection:</strong> Play any individual game for ₹20 or grab the All 5 Games Pass for ₹100.</span>,
            <span key="4"><strong>Game 1 — വട്ടം മൂടാം, വട്ടത്തിലാകാം!:</strong> Cover the red circle completely using only 3 black paper pieces without leaving any red visible.</span>,
            <span key="5"><strong>Game 2 — കാറ്റല്ല, പേപ്പറാ!:</strong> Extinguish the candle flame using only the airflow created by waving paper (mouth blowing prohibited).</span>,
            <span key="6"><strong>Game 3 — ബലൂൺ പോയാൽ കപ്പ് പോയി!:</strong> Balance a balloon on one hand while arranging plastic cups in order with the other hand.</span>,
            <span key="7"><strong>Game 4 — പൊട്ടുമോ ഇല്ലയോ?:</strong> Hold a balloon securely under your arm and complete the challenge without using your hands.</span>,
            <span key="8"><strong>Game 5 — പേനയ്ക്ക് കുപ്പിയോട് പ്രണയം:</strong> Hold a pencil under your upper lip using lip grip, bend over an empty bottle, and drop the pencil inside hands-free.</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹3,000 total — Highest aggregate performers across game stations claim prizes!</span>
        ]
    },
    "spot-choreo": {
        id: "spot-choreo",
        title: "Spot Choreo",
        subtitle: "MCA Tech Fest",
        description: "No prep, no rehearsals — just raw talent and rhythm. Get a random song on the spot and choreograph an impromptu performance that wows the judges and crowd.",
        image: "/images/events/spotchoreo.jpg",
        icon: <Music className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "To Be Announced",
        reportingTime: "11:00 AM",
        registrationFee: "50",
        feeLabel: "per head",
        prizePool: "1750",
        minTeamSize: 1,
        maxTeamSize: 1,
        qrCode: "/images/qr/spot-choreo.jpeg",
        rules: [
            <span key="1"><strong>Format:</strong> Solo (individual) event; group performances are not allowed.</span>,
            <span key="2"><strong>Song Allotment:</strong> Songs are randomly selected and allotted by the organizers on the spot; songs cannot be changed or exchanged.</span>,
            <span key="3"><strong>Preparation Time:</strong> Each participant receives exactly 15 minutes of preparation time after the song is announced.</span>,
            <span key="4"><strong>Duration:</strong> Performance duration must be a minimum of 2 minutes and a maximum of 3 minutes. Exceeding 3 minutes may attract penalties.</span>,
            <span key="5"><strong>Style & Spontaneity:</strong> Any dance style or combination is allowed. Choreography must be created entirely during the 15-minute prep time (pre-planned routines are prohibited).</span>,
            <span key="6"><strong>Props:</strong> Basic props may be provided on the spot and can be incorporated creatively into the performance.</span>,
            <span key="7"><strong>Assistance Ban:</strong> Use of mobile phones, internet, or external assistance during preparation is strictly prohibited.</span>,
            <span key="8"><strong>Content Standards:</strong> Vulgar, offensive, or inappropriate moves, lyrics, or gestures are strictly barred.</span>,
            <span key="9"><strong>Judging Criteria (100 Pts):</strong> Choreography & Creativity (30 pts), Technique & Execution (25 pts), Expressions & Stage Presence (20 pts), Rhythm & Musicality (15 pts), Props & Impact (10 pts).</span>,
            <span key="10"><strong>Tie-Breaker:</strong> Tied participants compete in a tie-breaker round with a new song and shorter preparation time.</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹50 per head</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹1,750 total — First: ₹1,000 | Second: ₹500 | Third: ₹250</span>
        ]
    },
    "reel-making": {
        id: "reel-making",
        title: "Reel Making",
        subtitle: "MCA Tech Fest",
        description: "Turn fleeting moments into cinematic gold. Capture the energy, excitement, and atmosphere of PRAYAAN Tech Fest in a punchy, engaging reel. Storytelling, rhythm, and visual artistry meet the lens.",
        image: "/images/events/reelmaking.png",
        icon: <Clapperboard className="w-8 h-8 text-[#E7B878]" />,
        date: "October 30, 2026",
        venue: "College Campus",
        reportingTime: "10:00 AM",
        registrationFee: "100",
        feeLabel: "per team (2 members)",
        prizePool: "1000",
        minTeamSize: 2,
        maxTeamSize: 2,
        qrCode: "/images/qr/reel-making.jpeg",
        rules: [
            <span key="1"><strong>Team Formation:</strong> Exactly 2 members per team. Both members must contribute to creating the reel.</span>,
            <span key="2"><strong>Event Focus:</strong> Capture the highlights, energy, exciting moments, and vibrant atmosphere of PRAYAAN Tech Fest.</span>,
            <span key="3"><strong>Original Footage:</strong> All footage must be recorded on campus during PRAYAAN using mobile phones or cameras. Pre-recorded or internet footage is strictly prohibited.</span>,
            <span key="4"><strong>Video Specifications:</strong> Vertical format (9:16), duration between 30 and 90 seconds, MP4 format, recommended 720p+ resolution.</span>,
            <span key="5"><strong>Creative Editing:</strong> Transitions, visual effects, text overlays, trending music, and creative editing are permitted. Any language allowed if respectful.</span>,
            <span key="6"><strong>Ethics & Permissions:</strong> Obtain consent before filming individuals who do not wish to be recorded; restricted areas are off-limits.</span>,
            <span key="7"><strong>Submission:</strong> Completed, playable MP4 file must be submitted before the announced deadline via the designated submission channel.</span>,
            <span key="8"><strong>Judging Criteria (100 Pts):</strong> Creativity & Originality (25 pts), Cinematography & Visual Quality (20 pts), Editing & Transitions (20 pts), Storytelling & Event Coverage (20 pts), Music Synchronization & Overall Impact (15 pts).</span>,
            <span key="fee"><strong>Registration Fee:</strong> ₹100 per team (2 members)</span>,
            <span key="prize"><strong>Prize Pool:</strong> ₹1,000</span>
        ]
    }
};
