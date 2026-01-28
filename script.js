document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const emailBtn = document.getElementById('email-btn');

    // 1. RECIPIENTS CONFIGURATION
    const RECIPIENTS = [
        'dwayneaneckles@gmail.com',
        'salazar@nysenate.gov',
        'DilanE@nyassembly.gov',
        'District36@council.nyc.gov',
        'sdtcampaign@gmail.com',
        'cjc@cjc.ny.gov',
        'public.integrity@ag.ny.gov',
        'CivilRights.Division@usdoj.gov'
    ];

    const EMAIL_SUBJECT = 'Re: Formal Request for Investigation – Procedural Irregularities in Index No. 4687/2012 (Mt. Zion Church of Christ Disciples)';

    // 2. DEMAND LETTER TEXT
    const demandLetterText = `To Whom It May Concern:

We, the undersigned members of Stop Deed Theft Coalition, respectfully request a formal investigation into serious procedural irregularities affecting Index No. 4687/2012, Mt. Zion Church of Christ Disciples, pending in the Kings County Supreme Court, Civil Term.

This matter involves a 2012 court order (Index 4687/2012) that improperly allowed a church to sell estate property belonging to the grandchildren of the late Pastor Rev. Murdaugh, based on a deed from an entirely different parcel—resulting in a 44-unit development built on stolen inheritance.

After initiating e-filing on Nov 6, 2025 and met with extreme incompetence, an Order to Show Cause was filed 12/16/2025 to vacate this void order. The “emergency” Order to Show cause was under unexplained prolonged “review” before the original judge abruptly “retired” on 12/31/2025. The case was then reassigned, and the new judge denied the Emergency OSC while making equity-based suggestions in a matter where jurisdiction is absent. Prioritizing a developer’s financial interests over due process, property rights, and equal protection is a grave miscarriage of justice and demonstrates a fundamental lack of judicial competence.

The coalition submits this letter because the procedural issues in this case reflect a pattern of systemic failures that have harmed multiple deed-theft victims in Kings County. In deed-fraud matters, where time-sensitive relief is critical, these irregularities cause irreversible harm to rightful property owners and heirs.

We respectfully request:
1. Investigation into how the O.S.C for Index No. 4687/2012 was handled Including: (a) Who held it (b) Why it was not presented to judge Wayne P. Saitta before his sudden retirement. (c) Whether proper procedures were followed (d) How the denial decision was made (e) Why the successor judge failed to address the jurisdictional matter
2. Investigation into the pattern of OSC obstruction and mishandling in deed-theft cases
3. A meeting with coalition representatives. To present broader evidence of systemic failures affecting numerous families.

The integrity of the Kings County Supreme Court is at stake. We look forward to your immediate response regarding these urgent matters. At: stopdeedtheftnow40@gmail.com`;

    // 3. COPY BUTTON LOGIC
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(demandLetterText);

            const originalText = copyBtn.textContent;
            copyBtn.textContent = "✅ COPIED!";
            const originalBg = copyBtn.style.backgroundColor;
            copyBtn.style.backgroundColor = "#333";

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = originalBg || "";
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard. Please manually copy the text.');
        }
    });

    // 4. EMAIL BUTTON LOGIC
    const recipientsString = RECIPIENTS.join(',');
    const encodedSubject = encodeURIComponent(EMAIL_SUBJECT);
    const encodedBody = encodeURIComponent(demandLetterText);

    const mailtoUrl = `mailto:${recipientsString}?subject=${encodedSubject}&body=${encodedBody}`;

    // Gmail Compose URL for Desktop Fallback
    // view=cm (compose mode), fs=1 (fullscreen/new window style), to=..., su=...
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientsString)}&su=${encodedSubject}&body=${encodedBody}`;

    if (emailBtn) {
        // Set default href for mobile/standard handling
        emailBtn.href = mailtoUrl;

        emailBtn.addEventListener('click', (e) => {
            // B. DESKTOP CHECK
            // Simple mobile detection check based on user agent
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (!isMobile) {
                // If on Desktop, prevent default mailto and open Gmail
                e.preventDefault();
                window.open(gmailUrl, '_blank');
            }
            // If Mobile, let the default mailto href execute (opening the system app)
        });
    }
});
