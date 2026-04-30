import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Authentication Error
          </h1>
          
          <p className="text-muted-foreground mb-6">
            {params?.error
              ? `Error: ${params.error}`
              : 'An unexpected error occurred during authentication.'}
          </p>

          <Link
            href="/auth/login"
            className="inline-block px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
