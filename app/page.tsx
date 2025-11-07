import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { statsData } from "@/data/landing";
import { Stats } from "fs";
import { featuresData, howItWorksData } from "@/data/landing";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="mt-20">
      <Hero/>
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((item, index) => (
  <div key={index} className="text-center">
    <div className="text-4xl font-bold text-blue-600 mb-2">{item.value}</div>
    <div className="text-sm text-gray-600">{item.label}</div>
  </div>
))}
          </div>
        </div>
      </section>

  <section className="py-20 px-10 bg-blue-50">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-10">
      Everything you need to manage your finances
    </h2>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {featuresData.map((feature, index) => {
        const Icon = feature.icon; // store the icon component
        return (
          <Card key={index} className="p-6 shadow-md hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <Icon className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
</section>

<section className="py-20 bg-blue-50 px-10">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {howItWorksData.map((step, index) => {
  const Icon = step.icon;
  return (
    <div key={index} className="text-center p-6 border rounded-lg shadow-md">
      <Icon className="h-8 w-8 text-blue-600 mx-auto mb-4" /> {/* ✅ render properly */}
      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </div>
  );
})}
    </div>
  </div>
</section>

 <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with Welth
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

    </div>   

  );
}
