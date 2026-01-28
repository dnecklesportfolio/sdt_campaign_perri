document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-btn');
    const emailBtn = document.getElementById('email-btn');
    const toast = document.getElementById('toast');

    // 1. RECIPIENTS CONFIGURATION
    const RECIPIENTS = [
        'dwayneaneckles@gmail.com'
    ];

    const EMAIL_SUBJECT = 'Campaign';

    // 2. DEMAND LETTER TEXT
    const demandLetterText = `To Attorney General Letitia James and Brooklyn DA Gonzalez: I am writing to demand an immediate investigation into the deed theft of 802 Myrtle Ave. The displacement of black families and the erasure of our community history via predatory speculation must stop. We urge you to use your power to hold these actors accountable and return the property to its rightful owners.`;

    // HELPER: Toast Notification
    const showToast = () => {
        if (!toast) return;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000); // Show for 4 seconds
    };

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
    const mailtoUrl = `mailto:${recipientsString}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

    // Gmail Compose URL for Desktop Fallback
    // view=cm (compose mode), fs=1 (fullscreen/new window style), to=..., su=...
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientsString)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

    if (emailBtn) {
        // Set default href for mobile/standard handling
        emailBtn.href = mailtoUrl;

        emailBtn.addEventListener('click', (e) => {
            // A. UTILITY: Copy email to clipboard & Show Toast
            navigator.clipboard.writeText(recipientsString)
                .then(() => showToast())
                .catch(err => console.error('Failed to copy email:', err));

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
