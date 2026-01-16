const validateEmails = (emailArray) => {
    const emails = emailArray
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

    if (emails.length === 0) return false;

    return emails.every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
}

export default validateEmails;