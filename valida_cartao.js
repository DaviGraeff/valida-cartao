function luhnAlgorithm(num) {
    let total = 0;
    const reverseDigits = num.split('').reverse();
    
    for (let i = 0; i < reverseDigits.length; i++) {
        let digit = parseInt(reverseDigits[i], 10);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        total += digit;
    }

    return total % 10 === 0;
}

function getCardIssuer(num) {
    if (/^4\d{12}(\d{3})?$/.test(num)) return "Visa";
    if (/^5[1-5]\d{14}$/.test(num)) return "MasterCard";
    if (/^3[47]\d{13}$/.test(num)) return "American Express";
    if (/^6(?:011|5\d{2})\d{12}$/.test(num)) return "Discover";
    if (/^(?:2131|1800|35\d{3})\d{11}$/.test(num)) return "JCB";
    if (/^3(?:0[0-5]|[68]\d)\d{11}$/.test(num)) return "Diners Club";
    return "Unknown";
}

function validateCreditCard(number) {
    const sanitized = number.replace(/[\s-]/g, '');

    if (!/^\d+$/.test(sanitized)) {
        return { isValid: false, issuer: "Invalid number" };
    }

    if (!luhnAlgorithm(sanitized)) {
        return { isValid: false, issuer: "Invalid number" };
    }

    const issuer = getCardIssuer(sanitized);
    return { isValid: true, issuer };
}