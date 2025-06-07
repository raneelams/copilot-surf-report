import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome to Next.js with shadcn/ui
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Beautiful, pre-built components that you can copy and paste into
                your apps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get started by exploring the available components and customizing
                them to your needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customizable</CardTitle>
              <CardDescription>
                Fully customizable components built with Radix UI and Tailwind CSS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modify styles, behaviors, and appearance to match your brand and
                requirements.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Customize Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessible</CardTitle>
              <CardDescription>
                All components follow WAI-ARIA guidelines and are keyboard
                accessible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with accessibility in mind to ensure your application works
                for everyone.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="outline">Documentation</Button>
                <Button variant="secondary">Examples</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to get started?
          </h2>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              View on GitHub
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
