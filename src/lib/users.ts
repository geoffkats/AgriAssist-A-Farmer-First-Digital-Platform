

// This is a simulated in-memory user store.
// In a real application, this would be a database.

type User = {
    name: string;
    email: string;
    passwordHash: string; // In a real app, never store plain text passwords
    role: 'user' | 'admin';
    isPro: boolean;
    aiCredits: number;
};

class UserStore {
    private userList: User[] = [];

    constructor() {
        // Add a default admin user
        this.userList.push({
            name: 'Admin User',
            email: 'admin@agriassist.app',
            passwordHash: this.hashPassword('adminpass'),
            role: 'admin',
            isPro: true,
            aiCredits: Infinity,
        });

         // Add a default regular user
        this.userList.push({
            name: 'Regular Farmer',
            email: 'farmer@agriassist.app',
            passwordHash: this.hashPassword('farmerpass'),
            role: 'user',
            isPro: false,
            aiCredits: 15,
        });

        // Add a default regular user who ran out of credits
        this.userList.push({
            name: 'Credit Buyer',
            email: 'buyer@agriassist.app',
            passwordHash: this.hashPassword('buyerpass'),
            role: 'user',
            isPro: false,
            aiCredits: 50,
        });

        // Add a default Google user
        this.userList.push({
            name: 'Google User',
            email: 'google.user@agriassist.app',
            passwordHash: this.hashPassword('googlepass'),
            role: 'user',
            isPro: false,
            aiCredits: 0,
        });
    }

    private hashPassword(password: string): string {
        // In a real app, use a strong hashing algorithm like bcrypt
        return `hashed_${password}`;
    }

    private verifyPassword(password: string, hash: string): boolean {
        return this.hashPassword(password) === hash;
    }

    addUser(name: string, email: string, password: string): User {
        if (this.userList.find(u => u.email === email)) {
            throw new Error('User with this email already exists.');
        }
        const newUser: User = {
            name,
            email,
            passwordHash: this.hashPassword(password),
            role: 'user',
            isPro: false,
            aiCredits: 15,
        };
        this.userList.push(newUser);
        return newUser;
    }
    
    updateUser(email: string, updates: Partial<User>): User | null {
        const userIndex = this.userList.findIndex(u => u.email === email);
        if (userIndex > -1) {
            this.userList[userIndex] = { ...this.userList[userIndex], ...updates };
            return this.userList[userIndex];
        }
        return null;
    }

    findUserByEmail(email: string): User | undefined {
        return this.userList.find(u => u.email === email);
    }

    authenticateUser(email: string, password: string): User | null {
        const user = this.findUserByEmail(email);
        if (user && this.verifyPassword(password, user.passwordHash)) {
            return user;
        }
        return null;
    }

    getUsers(): User[] {
        return this.userList;
    }
}

// Singleton instance
export const users = new UserStore();
