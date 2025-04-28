import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    BarChart,
    Check,
    Search,
    Shield,
    Upload,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container px-4md:px-6 mx-auto">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Intelligent Receipt Scanning
                            </h1>
                            <p className="mx-auto max-w-[700px] text-lg text-gray-500 md:text-xl dark:text-gray-400">
                                Scan, analyze and organize your receipts with
                                IA-powered precision. Save time and gain
                                insights from your expenses.
                            </p>
                        </div>

                        <div className="space-x-4">
                            <Link href="/receipts">
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    Get Started{' '}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button
                                    variant="outline"
                                    className="text-gray-700 hover:bg-gray-100"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* PDF Dropzone */}
                <div className="mt-12 flex justify-center">
                    <div
                        className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden 
                                    dark:border-gray-800 dark:bg-gray-950"
                    >
                        <div className="p-6 md:p-8 relative">
                            PDF Dropzone goes here...
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-16 md:py-20">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Powerful Features
                            </h2>
                            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Our IA-powered platform transforms how you
                                handle receipts and track expenses.
                            </p>
                        </div>

                        <div className="!mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg dark:border-gray-800">
                                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800">
                                    <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Easy Upload
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Drag and drop your PDF receipts for instant
                                    scanning and processing.
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg dark:border-gray-800">
                                <div className="p-3 rounded-full bg-green-100 dark:bg-green-800">
                                    <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    AI Analysis
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Automatically extract and categorize expense
                                    data with intelligent AI.
                                </p>
                            </div>
                            {/* Feature 3 */}
                            <div className="flex flex-col items-center space-y-2 border border-gray-200 p-6 rounded-lg dark:border-gray-800">
                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800">
                                    <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Expense Insights
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-center">
                                    Generate reports and gain valuable insights
                                    from your spending patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="pt-16 md:pt-24 bg-gray-50 dark:bg-gray-800">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Simple Pricing
                            </h2>
                            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Choose a plan that fits your needs. No hidden
                                fees, no surprises.
                            </p>
                        </div>
                    </div>
                    <div className="!mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div
                            className="flex flex-col items-center justify-between p-6 border 
                                        border-gray-200 rounded-lg bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Free</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Free tier for all to try!
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-4xl font-bold">$0.00</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    /month
                                </p>
                            </div>
                            <ul className="mt-6 space-y-2 flex-1">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        2 scans per month
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Basic data extraction
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">7-day history</span>
                                </li>
                            </ul>
                            <div className="mt-6 w-full">
                                <Link href="/manage-plan">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Sign Up Free
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center justify-between p-6 border 
                                        border-gray-200 rounded-lg bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
                        >
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Starter</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    A taste of expensing goodness.
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-4xl font-bold">$4.99</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    /month
                                </p>
                            </div>
                            <ul className="mt-6 space-y-2 flex-1">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        50 scans per month
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Enhanced data extraction
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">30-day history</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Basic export option
                                    </span>
                                </li>
                            </ul>
                            <div className="mt-6 w-full">
                                <Link href="/manage-plan">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Choose Plan
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="relative flex flex-col items-center justify-between p-6 shadow-sm border 
                                        border-blue-200 rounded-lg dark:border-gray-800 bg-blue-50 dark:bg-blue-800"
                        >
                            <div className="absolute bg-blue-600 -top-3 right-4 rounded-full text-white px-4 py-1 text-sm font-medium">
                                Popular
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Pro</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Pro features for Pro users !
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-4xl font-bold">$9.99</p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    /month
                                </p>
                            </div>
                            <ul className="mt-6 space-y-2 flex-1">
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        300 scans per month
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Advanced AI data extraction
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">AI Summaries</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Expense categories & tags
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="ml-2">
                                        Unlimited history
                                    </span>
                                </li>
                            </ul>
                            <div className="mt-6 w-full">
                                <Link href="/manage-plan">
                                    <Button
                                        variant="outline"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-10 md:py-24 bg-gray-50 dark:bg-gray-800">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                Why Choose Us?
                            </h2>
                            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Our platform is designed to make your life
                                easier. With our advanced AI technology, you can
                                focus on what matters most.
                            </p>
                        </div>
                        <div className="!mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800">
                                    <Check className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        User-Friendly Interface
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our platform is designed with you in
                                        mind. Easy to navigate and use.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-green-100 dark:bg-green-800">
                                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Secure and Private
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Your data is safe with us. We prioritize
                                        your privacy and security.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800">
                                    <Check className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        24/7 Customer Support
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our support team is here to help you
                                        anytime, anywhere.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-full bg-red-100 dark:bg-red-800">
                                    <Check className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Regular Updates
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        We are constantly improving our platform
                                        with new features and enhancements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-10 border-t border-gray-200 dark:border-gray-800">
                <div className="container px-4 md:px-6 mx-auto py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-1">
                            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <span className="text-xl font-semibold">
                                Expensio
                            </span>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <p className="text-gray-500 dark:text-gray-400">
                                Expensio. The smarter way to track your money.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
