'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase/client';

type UserRole = 'teacher' | 'parent' | 'admin';

interface AuthFormProps {
    mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'teacher' as UserRole,
        agreedToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                            role: formData.role,
                        },
                    },
                });
                if (error) throw error;
                // Show success message or redirect
                router.push('/');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                router.push('/');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left panel - Branding */}
            <div className="hidden w-1/2 flex-col items-center justify-center bg-muted p-12 lg:flex">
                <div className="mb-8">
                    {/* Logo */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <svg
                            className="h-10 w-10 text-primary"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                </div>
                <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
                    Democratizing
                    <br />
                    Education in Africa
                </h1>
                <p className="max-w-md text-center text-muted-foreground">
                    AI-powered tools to help teachers create, evaluate, and personalize learning.
                </p>
                {/* Illustration placeholder */}
                <div className="mt-12 flex items-center gap-4 text-muted-foreground">
                    <div className="h-20 w-16 rounded border-2 border-dashed border-muted-foreground/30" />
                    <div className="h-24 w-16 rounded border-2 border-dashed border-muted-foreground/30" />
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/30" />
                </div>
            </div>

            {/* Right panel - Auth form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
                    <CardHeader className="pb-4">
                        <Tabs defaultValue={mode} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signup" asChild>
                                    <Link href="/signup">Sign Up</Link>
                                </TabsTrigger>
                                <TabsTrigger value="login" asChild>
                                    <Link href="/login">Log In</Link>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardHeader>

                    <CardContent>
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-semibold">
                                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {mode === 'signup'
                                    ? 'Get started with Discourse for free'
                                    : 'Sign in to continue to Discourse'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === 'signup' && (
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="pl-9"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="pl-9 pr-9"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {mode === 'signup' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">I am a...</Label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <option value="teacher">Teacher</option>
                                            <option value="admin">School Admin</option>
                                            <option value="parent">Parent</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="agreedToTerms"
                                            name="agreedToTerms"
                                            checked={formData.agreedToTerms}
                                            onChange={handleChange}
                                            className="h-4 w-4 rounded border-gray-300"
                                            required
                                        />
                                        <Label htmlFor="agreedToTerms" className="text-sm">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-primary hover:underline">
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-primary hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </Label>
                                    </div>
                                </>
                            )}

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading
                                    ? 'Loading...'
                                    : mode === 'signup'
                                        ? 'Create Account'
                                        : 'Sign In'}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            {mode === 'signup' ? (
                                <>
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-medium text-primary hover:underline">
                                        Log in
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Don&apos;t have an account?{' '}
                                    <Link href="/signup" className="font-medium text-primary hover:underline">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
