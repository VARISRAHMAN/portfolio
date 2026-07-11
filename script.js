document.addEventListener('DOMContentLoaded', () => {

    /* --- Data --- */
    const personalData = {
        name: "Varis Rahman",
        title: "Security Researcher | Cybersecurity Student",
        location: "Calicut, Kerala, India",
        experience: "Fresher",
        education: "2025 – Present",
        bio: "Varis Rahman is a cybersecurity student and aspiring security researcher based in Calicut, Kerala, India. He focuses on penetration testing, vulnerability assessment, and web security using tools like Burp Suite, Nmap, Metasploit, and Wireshark. As a fresher, he actively practices on platforms like TryHackMe and Hack The Box while building hands-on skills in Kali Linux and Python. His interests include red teaming, bug bounty hunting, and real-world attack simulation aligned with OWASP Top 10. He is currently preparing for CompTIA Security+ and aiming for OSCP certification.",
        skills: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment", "Web Security", "Network Security", "Bug Bounty", "Red Teaming", "Blue Teaming", "Digital Forensics", "Malware Analysis"],
        tools: ["Burp Suite", "Nmap", "Metasploit", "Wireshark"],
        programming: ["Python"],
        os: ["Kali Linux (Primary)", "Windows 11"],
        frameworks: ["OWASP Top 10"],
        certifications: ["OSCP (Planned)", "CompTIA Security+ (In progress)"],
        github: "https://github.com/VARISRAHMAN",
        email: "varis.rahman.in@gmail.com",
        linkedin: "https://www.linkedin.com/in/varis-rahman-7b3995375"
    };

    /* --- Skill Cards Injection ---
       Scoped to #skills specifically (was previously a generic ".skills-grid"
       query, which is ambiguous because the Tools section reuses the same
       class name — that relied on DOM order by luck). */
    const skillsGrid = document.querySelector('#skills .skills-grid');
    if (skillsGrid) {
        personalData.skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card glass-panel';
            // Determine icon based on skill
            let iconClass = 'fas fa-shield-alt';
            let lowerSkill = skill.toLowerCase();
            if (lowerSkill.includes('web')) iconClass = 'fas fa-globe';
            if (lowerSkill.includes('network')) iconClass = 'fas fa-network-wired';
            if (lowerSkill.includes('bug')) iconClass = 'fas fa-bug';
            if (lowerSkill.includes('malware')) iconClass = 'fas fa-spider';
            if (lowerSkill.includes('forensics')) iconClass = 'fas fa-search';

            card.innerHTML = `
                <i class="${iconClass}"></i>
                <h3>${skill}</h3>
            `;
            skillsGrid.appendChild(card);
        });
    }

    /* --- Typing Effect --- */
    const subtitle = document.getElementById('typing-text');
    const textToType = personalData.title;
    let typeIndex = 0;

    function typeWriter() {
        if (!subtitle) return;
        if (typeIndex < textToType.length) {
            subtitle.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50);
        } else {
            const cursor = document.createElement('span');
            cursor.style.color = 'var(--neon-green)';
            cursor.textContent = '_';
            subtitle.appendChild(cursor);
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 1000);


    /* --- Binary Rain Background (Canvas) --- */
    const canvas = document.getElementById('binary-canvas');
    const ctx = canvas.getContext('2d');

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const chars = '01';
    const fontSize = 16;
    let columns = canvasWidth / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Respect reduced-motion preference: skip the animated rain entirely.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rainInterval = null;

    function drawBinaryRain() {
        ctx.fillStyle = 'rgba(5, 10, 14, 0.05)'; // Fade effect
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = '#00ff41'; // Neon green
        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (!prefersReducedMotion) {
        rainInterval = setInterval(drawBinaryRain, 50);
    }

    window.addEventListener('resize', () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        columns = canvasWidth / fontSize;
        drops.length = 0;
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });


    /* --- Intersection Observer for Scroll Animations --- */
    const hiddenElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));


    /* --- Cursor Glow Effect (skip on touch-only devices, it's mouse-only) --- */
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }


    /* --- Mobile Navigation Toggle --- */
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close the menu after a link is tapped, and when clicking outside it.
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', (e) => {
            const clickedInsideNav = e.target.closest('.glass-nav');
            if (!clickedInsideNav && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }


    /* --- Chatbot Logic --- */
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Escape HTML from user input before inserting it, so a message like
    // "<img src=x onerror=alert(1)>" can't execute as markup (stored/DOM XSS).
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function addMessage(html, isBot = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        const p = document.createElement('p');
        if (isBot) {
            // Bot responses are trusted (authored in knowledgeBase below), so
            // they're allowed to contain the anchor markup used for links.
            p.innerHTML = html;
        } else {
            // User input is untrusted — render as plain text only.
            p.textContent = html;
        }
        msgDiv.appendChild(p);
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function generateBotResponse(userInput) {
        const query = userInput.toLowerCase();

        let response = "I'm sorry, I can only answer questions about Varis's professional profile. You can ask about his skills, experience, contact details, or goals.";

        const knowledgeBase = [
            { keys: ['fresher'], ans: "Yes. Varis Rahman is a fresher building hands-on cybersecurity skills." },
            { keys: ['email'], ans: `<a href="mailto:${personalData.email}" style="color:var(--neon-cyan)">${personalData.email}</a>` },
            { keys: ['connect'], ans: `Yes. LinkedIn: <a href="${personalData.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--neon-cyan)">${personalData.linkedin.replace('https://', '')}</a>` },
            { keys: ['linkedin'], ans: `<a href="${personalData.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--neon-cyan)">${personalData.linkedin.replace('https://', '')}</a>` },
            { keys: ['contact', 'reach'], ans: `Email: <a href="mailto:${personalData.email}" style="color:var(--neon-cyan)">${personalData.email}</a> or LinkedIn: <a href="${personalData.linkedin}" target="_blank" rel="noopener noreferrer" style="color:var(--neon-cyan)">${personalData.linkedin.replace('https://', '')}</a>` },
            { keys: ['where', 'located', 'location'], ans: "Calicut, Kerala, India." },
            { keys: ['looking for', 'looking'], ans: "Entry-level cybersecurity roles, internships, and junior penetration testing opportunities." },
            { keys: ['tools'], ans: "Burp Suite, Nmap, Metasploit, Wireshark, Splunk, and TheHive." },
            { keys: ['operating systems', 'os', 'kali', 'windows'], ans: "Kali Linux (primary) and Windows 11." },
            { keys: ['python', 'programming'], ans: "Yes, Python for security scripting and automation." },
            { keys: ['frameworks', 'owasp'], ans: "OWASP Top 10." },
            { keys: ['certifications', 'prepare', 'preparing', 'comptia', 'oscp'], ans: "CompTIA Security+ and OSCP." },
            { keys: ['platforms', 'practice', 'tryhackme', 'hack the box', 'htb'], ans: "TryHackMe and Hack The Box." },
            { keys: ['internship', 'intern'], ans: "Yes, Varis Rahman is open to cybersecurity internships." },
            { keys: ['collaboration', 'collaborate'], ans: "Yes, open for cybersecurity collaboration and learning opportunities." },
            { keys: ['work', 'github', 'repo'], ans: `GitHub: <a href="${personalData.github}" target="_blank" rel="noopener noreferrer" style="color:var(--neon-cyan)">${personalData.github}</a>` },
            { keys: ['professional experience', 'experience'], ans: "Varis Rahman is a fresher with hands-on lab practice experience." },
            { keys: ['learning', 'learn'], ans: "Advanced penetration testing, OWASP Top 10, and real-world attack simulation." },
            { keys: ['goal'], ans: "To become a professional penetration tester and security researcher." },
            { keys: ['skills', 'skill'], ans: "Ethical hacking, penetration testing, vulnerability assessment, web security, network security, bug bounty, red teaming, blue teaming, malware analysis, and digital forensics." },
            { keys: ['what does', 'do', 'role'], ans: "Varis Rahman specializes in ethical hacking, penetration testing, and vulnerability assessment." },
            { keys: ['who is', 'who', 'bio', 'about'], ans: "Varis Rahman is a cybersecurity student and aspiring security researcher based in Calicut, Kerala, India. He focuses on penetration testing, vulnerability assessment, and web security." },
            { keys: ['ssh', 'brute', 'soc', 'pipeline', 'splunk', 'thehive'], ans: "Varis built an SSH Brute-Force Detection Alert Pipeline — a SOC lab that detects Hydra-based SSH attacks via Splunk and auto-creates cases in TheHive within 2 minutes." },
            { keys: ['project', 'projects', 'vulnerable', 'portfolio'], ans: "Varis has built a Vulnerable Order Portal (an intentionally vulnerable web app mapped to OWASP Top 10) and an SSH Brute-Force Detection Alert Pipeline (an automated SOC detection lab)." },
            { keys: ['hi', 'hello', 'hey'], ans: "Hello! You can ask me about Varis's skills, tools, experience, goals, or contact information." }
        ];

        for (const item of knowledgeBase) {
            if (item.keys.some(key => query.includes(key))) {
                response = item.ans;
                break;
            }
        }

        setTimeout(() => addMessage(response, true), 600);
    }

    function handleChatSend() {
        const text = chatInput.value.trim();
        if (text !== '') {
            addMessage(text, false);
            chatInput.value = '';
            generateBotResponse(text);
        }
    }

    chatSend.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatSend();
        }
    });

});
