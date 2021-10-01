import jwt from "jsonwebtoken";

const privateKey = process.env.TOKKEN_SECRET as string;

export function createToken(patientId: string, expiresIn = "1h") {
    return jwt.sign({ _id: patientId }, privateKey, { expiresIn });
}

export function verifyToken(token: string): {
    valid: boolean, expired: boolean, decoded: {
        _id: string, iat: number, exp: number,
    } | null
} {
    try {
        const decoded = jwt.verify(token, privateKey) as {
            _id: string, iat: number, exp: number,
        };

        return { valid: true, expired: false, decoded };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}
