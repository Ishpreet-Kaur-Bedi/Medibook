import { User } from '@prisma/client';

// import { SafeUser } from '@/app/types';
export type SafeUser = Omit<
User,
"createdAt" | "updatedAt"| 'emailVerified'


>

&{

createdAt: string;
updatedAt: string;
emailVerified : string| null;

};

